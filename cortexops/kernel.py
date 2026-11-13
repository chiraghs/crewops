"""Deterministic Compliance Kernel & Recovery Solver for CortexOps.
Enforces multi-vertical regulatory standards with mathematical certainty.
Generates an audit-ready Evidence Ledger for every decision.
"""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Optional
from .models import (
    DutyAssignment,
    LegalityResult,
    RecoveryOption,
    Resource,
    Rulebook,
    VerticalType,
)


class ComplianceKernel:
    """The central deterministic engine. Zero hallucinations, pure arithmetic."""

    @staticmethod
    def evaluate_candidate(
        resource: Resource,
        assignment: DutyAssignment,
        rulebook: Rulebook,
        travel_hours_to_station: float = 0.0,
    ) -> LegalityResult:
        violations: list[str] = []
        margins: dict[str, float] = {}
        ledger: list[dict[str, Any]] = []

        def record(metric: str, actual: Any, threshold: Any, passed: bool, unit: str = ""):
            ledger.append({
                "metric": metric,
                "actual": actual,
                "threshold": threshold,
                "unit": unit,
                "passed": passed,
            })

        # 1. Role Match
        role_ok = (resource.role.lower() == assignment.required_role.lower())
        record("Role Match", resource.role, assignment.required_role, role_ok)
        if not role_ok:
            violations.append(f"Role mismatch: {resource.role} != required {assignment.required_role}")

        # 2. Qualification Match
        qual_ok = assignment.required_qual in resource.qualifications
        record("Qualification", resource.qualifications, assignment.required_qual, qual_ok)
        if not qual_ok:
            violations.append(f"Missing required qualification: {assignment.required_qual}")

        # 3. Certification Currency
        duty_date = assignment.duty_date
        expired_certs: list[str] = []
        for cert in resource.certifications:
            if not cert.is_valid_on(duty_date):
                expired_certs.append(f"{cert.name} (expired {cert.valid_until})")
        cert_ok = len(expired_certs) == 0
        record("Certification Currency", f"{len(resource.certifications)} valid", "0 expired", cert_ok)
        if not cert_ok:
            violations.append(f"Expired certification(s): {', '.join(expired_certs)}")

        # 4. Single Duty Period Limit
        duration = assignment.duration_hours
        duty_ok = duration <= rulebook.max_single_duty_hours + 1e-6
        margins["duty_period_headroom_h"] = max(0.0, rulebook.max_single_duty_hours - duration)
        record("Duty Period Duration", round(duration, 2), rulebook.max_single_duty_hours, duty_ok, "h")
        if not duty_ok:
            violations.append(f"Exceeds max single duty: {duration:.1f}h > {rulebook.max_single_duty_hours:.1f}h")

        # 5. Rest Period Verification
        duty_start = datetime.fromisoformat(assignment.start_utc)
        if resource.last_release_time:
            last_release = datetime.fromisoformat(resource.last_release_time)
            rest_available = (duty_start - last_release).total_seconds() / 3600.0 - travel_hours_to_station
            rest_ok = rest_available >= rulebook.min_rest_hours - 1e-6
            margins["rest_buffer_h"] = max(0.0, rest_available - rulebook.min_rest_hours)
            record("Rest Interval", round(rest_available, 2), rulebook.min_rest_hours, rest_ok, "h")
            if not rest_ok:
                violations.append(
                    f"Insufficient rest: {rest_available:.1f}h available < {rulebook.min_rest_hours:.1f}h required"
                )
        else:
            record("Rest Interval", "Rested / Off-duty", rulebook.min_rest_hours, True, "h")
            margins["rest_buffer_h"] = rulebook.min_rest_hours

        # 6. Cumulative 7-Day Limit
        projected_7d = resource.duty_hours_7d + duration
        limit_7d_ok = projected_7d <= rulebook.max_duty_7d + 1e-6
        margins["duty_7d_headroom_h"] = max(0.0, rulebook.max_duty_7d - projected_7d)
        record("7-Day Cumulative Duty", round(projected_7d, 2), rulebook.max_duty_7d, limit_7d_ok, "h")
        if not limit_7d_ok:
            violations.append(
                f"Exceeds 7-day limit: projected {projected_7d:.1f}h > {rulebook.max_duty_7d:.1f}h"
            )

        # 7. Cumulative 28-Day Limit
        projected_28d = resource.duty_hours_28d + duration
        limit_28d_ok = projected_28d <= rulebook.max_duty_28d + 1e-6
        margins["duty_28d_headroom_h"] = max(0.0, rulebook.max_duty_28d - projected_28d)
        record("28-Day Cumulative Duty", round(projected_28d, 2), rulebook.max_duty_28d, limit_28d_ok, "h")
        if not limit_28d_ok:
            violations.append(
                f"Exceeds 28-day limit: projected {projected_28d:.1f}h > {rulebook.max_duty_28d:.1f}h"
            )

        # 8. Reserve Window & Reachability
        if resource.is_reserve and resource.reserve_window_start and resource.reserve_window_end:
            duty_start_hhmm = duty_start.strftime("%H:%M")
            window_ok = (
                resource.reserve_window_start <= duty_start_hhmm <= resource.reserve_window_end
            )
            record("Reserve Callout Window", duty_start_hhmm, f"{resource.reserve_window_start}-{resource.reserve_window_end}", window_ok)
            if not window_ok:
                violations.append(
                    f"Report time {duty_start_hhmm} outside reserve window {resource.reserve_window_start}-{resource.reserve_window_end}"
                )

        is_legal = (len(violations) == 0)
        return LegalityResult(
            is_legal=is_legal,
            violations=violations,
            margins=margins,
            evidence_ledger=ledger,
        )

    @classmethod
    def rank_recovery_options(
        cls,
        assignment: DutyAssignment,
        candidates: list[Resource],
        rulebook: Rulebook,
        station_travel_matrix: Optional[dict[tuple[str, str], float]] = None,
    ) -> list[RecoveryOption]:
        matrix = station_travel_matrix or {}
        options: list[RecoveryOption] = []

        for candidate in candidates:
            # Travel hours
            travel_key = (candidate.base, assignment.station_or_base)
            travel_h = 0.0 if candidate.base == assignment.station_or_base else matrix.get(travel_key, 2.5)

            # Legality
            legality = cls.evaluate_candidate(candidate, assignment, rulebook, travel_hours_to_station=travel_h)

            # Operational cost
            base_cost = assignment.duration_hours * candidate.hourly_rate_usd
            if candidate.is_reserve:
                callout_premium = 120.0
                cost = base_cost + callout_premium
            else:
                overtime_premium = 1.5 * base_cost
                cost = overtime_premium
            if travel_h > 0:
                cost += travel_h * 150.0  # Positioning transport & hotel cost

            # Risk / Fragility score: higher if margins are razor thin or if they are the only reserve
            rest_margin = legality.margins.get("rest_buffer_h", 5.0)
            d7_margin = legality.margins.get("duty_7d_headroom_h", 10.0)
            
            # Risk between 0.05 and 0.95
            risk = 0.1
            if rest_margin < 2.0:
                risk += 0.3
            if d7_margin < 5.0:
                risk += 0.25
            if travel_h > 0:
                risk += 0.15
            risk = min(0.95, max(0.05, risk))

            # Recommendation reason
            if legality.is_legal:
                if candidate.base == assignment.station_or_base and candidate.is_reserve:
                    reason = "Optimal local standby with ample rest & duty margins"
                elif candidate.base == assignment.station_or_base:
                    reason = "Local active resource on scheduled off-day"
                else:
                    reason = f"Positioned from {candidate.base} ({travel_h:.1f}h transit)"
            else:
                reason = f"Ruled out: {legality.violations[0]}"

            options.append(RecoveryOption(
                candidate_id=candidate.id,
                candidate_name=candidate.name,
                role=candidate.role,
                base=candidate.base,
                is_reserve=candidate.is_reserve,
                cost_usd=round(cost, 2),
                reachability_hours=travel_h,
                legality=legality,
                risk_score=risk,
                recommendation_reason=reason,
            ))

        # Sort: Legal first, then by lowest cost, then lowest risk
        options.sort(key=lambda o: (0 if o.legality.is_legal else 1, o.cost_usd, o.risk_score))
        return options

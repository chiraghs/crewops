"""Generic Domain Models for CrewOps.
Unifies resource rosters, duty schedules, compliance rules, and disruptions
across Aviation, Maritime, Logistics, Healthcare, and Industrial Safety.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from enum import Enum
from typing import Any, Optional


class VerticalType(str, Enum):
    AVIATION = "aviation"
    MARITIME = "maritime"
    LOGISTICS = "logistics"
    HEALTHCARE = "healthcare"
    INDUSTRIAL = "industrial"


class DisruptionType(str, Enum):
    RESOURCE_UNAVAILABLE = "RESOURCE_UNAVAILABLE"
    STATION_FACILITY_CLOSURE = "STATION_FACILITY_CLOSURE"
    SCHEDULE_DELAY = "SCHEDULE_DELAY"
    CERTIFICATE_EXPIRY = "CERTIFICATE_EXPIRY"
    SURGE_DEMAND = "SURGE_DEMAND"


@dataclass
class Certification:
    name: str
    valid_until: str  # YYYY-MM-DD
    issuing_body: str = ""

    def is_valid_on(self, duty_date: str) -> bool:
        return self.valid_until >= duty_date


@dataclass
class Resource:
    id: str
    name: str
    vertical: VerticalType
    role: str
    base: str
    qualifications: list[str]  # e.g., ["A320", "ATR72"] or ["MASTER_MARINER"] or ["ICU_TRAUMA"]
    certifications: list[Certification]
    duty_hours_7d: float = 0.0
    duty_hours_28d: float = 0.0
    last_release_time: Optional[str] = None  # ISO format UTC
    is_reserve: bool = False
    reserve_window_start: Optional[str] = None  # HH:MM
    reserve_window_end: Optional[str] = None  # HH:MM
    phone: str = ""
    language: str = "en"
    hourly_rate_usd: float = 50.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "vertical": self.vertical.value,
            "role": self.role,
            "base": self.base,
            "qualifications": self.qualifications,
            "certifications": [{"name": c.name, "valid_until": c.valid_until} for c in self.certifications],
            "duty_hours_7d": round(self.duty_hours_7d, 2),
            "duty_hours_28d": round(self.duty_hours_28d, 2),
            "last_release_time": self.last_release_time,
            "is_reserve": self.is_reserve,
            "reserve_window": f"{self.reserve_window_start}-{self.reserve_window_end}" if self.reserve_window_start else None,
            "language": self.language,
        }


@dataclass
class DutyAssignment:
    id: str
    code: str  # Flight No, Vessel Voyage, Truck Route, Ward Shift
    vertical: VerticalType
    station_or_base: str
    dest_station: str
    start_utc: str  # YYYY-MM-DDTHH:MM:SS
    end_utc: str    # YYYY-MM-DDTHH:MM:SS
    required_role: str
    required_qual: str
    assigned_resource_id: Optional[str] = None
    sectors_or_units: int = 1
    description: str = ""

    @property
    def duration_hours(self) -> float:
        try:
            t0 = datetime.fromisoformat(self.start_utc)
            t1 = datetime.fromisoformat(self.end_utc)
            return (t1 - t0).total_seconds() / 3600.0
        except Exception:
            return 8.0

    @property
    def duty_date(self) -> str:
        return self.start_utc.split("T")[0]

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "code": self.code,
            "vertical": self.vertical.value,
            "station": self.station_or_base,
            "dest_station": self.dest_station,
            "start_utc": self.start_utc,
            "end_utc": self.end_utc,
            "duration_hours": round(self.duration_hours, 2),
            "required_role": self.required_role,
            "required_qual": self.required_qual,
            "assigned_resource_id": self.assigned_resource_id,
            "sectors": self.sectors_or_units,
            "description": self.description,
        }


@dataclass
class Rulebook:
    name: str
    standard_authority: str  # e.g., "DGCA CAR Sec 7", "IMO STCW 2010", "DOT FMCSA HOS", "ACGME", "OSHA"
    max_single_duty_hours: float
    min_rest_hours: float
    max_duty_7d: float
    max_duty_28d: float
    mandatory_certs: list[str] = field(default_factory=list)
    callout_notice_hours: float = 2.0


@dataclass
class Disruption:
    id: str
    vertical: VerticalType
    disruption_type: DisruptionType
    title: str
    target_id: str  # Resource ID or Assignment ID or Station
    start_utc: str
    duration_hours: float
    severity: str  # LOW, MEDIUM, CRITICAL
    reason: str
    dismissed: bool = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "vertical": self.vertical.value,
            "type": self.disruption_type.value,
            "title": self.title,
            "target_id": self.target_id,
            "start_utc": self.start_utc,
            "duration_hours": self.duration_hours,
            "severity": self.severity,
            "reason": self.reason,
            "dismissed": self.dismissed,
        }


@dataclass
class LegalityResult:
    is_legal: bool
    violations: list[str]
    margins: dict[str, float]
    evidence_ledger: list[dict[str, Any]]
    evaluated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self) -> dict[str, Any]:
        return {
            "is_legal": self.is_legal,
            "violations": self.violations,
            "margins": self.margins,
            "evidence_ledger": self.evidence_ledger,
            "evaluated_at": self.evaluated_at,
        }


@dataclass
class RecoveryOption:
    candidate_id: str
    candidate_name: str
    role: str
    base: str
    is_reserve: bool
    cost_usd: float
    reachability_hours: float
    legality: LegalityResult
    risk_score: float  # 0.0 (safest) to 1.0 (fragile)
    recommendation_reason: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "candidate_id": self.candidate_id,
            "candidate_name": self.candidate_name,
            "role": self.role,
            "base": self.base,
            "is_reserve": self.is_reserve,
            "cost_usd": self.cost_usd,
            "reachability_hours": self.reachability_hours,
            "is_legal": self.legality.is_legal,
            "violations": self.legality.violations,
            "risk_score": round(self.risk_score, 2),
            "recommendation": self.recommendation_reason,
            "margins": self.legality.margins,
        }

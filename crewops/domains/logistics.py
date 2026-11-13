"""Logistics & Intermodal Freight Domain Definition & Seed Dataset.
Implements US DOT FMCSA 49 CFR Part 395 (Hours of Service) & EU EC 561/2006.
"""
from datetime import datetime, timedelta
from ..models import Certification, DutyAssignment, Resource, Rulebook, VerticalType


def get_rulebook() -> Rulebook:
    return Rulebook(
        name="US DOT FMCSA HOS (49 CFR 395) / EU EC 561/2006",
        standard_authority="Federal Motor Carrier Safety Administration (FMCSA)",
        max_single_duty_hours=14.0,  # 14-hour on-duty window (max 11h driving)
        min_rest_hours=10.0,         # 10 consecutive hours off-duty
        max_duty_7d=60.0,            # 60h in 7 consecutive days (or 70h in 8d)
        max_duty_28d=240.0,
        mandatory_certs=["Commercial Driver License Class A", "DOT Medical Examiner Card", "HAZMAT Endorsement"],
        callout_notice_hours=1.5,
    )


def get_seed_data() -> tuple[list[Resource], list[DutyAssignment]]:
    now = datetime.utcnow()
    d0 = now.strftime("%Y-%m-%d")
    d1 = (now + timedelta(days=1)).strftime("%Y-%m-%d")

    drivers = [
        Resource(
            id="DRV-901",
            name="Marcus Vance",
            vertical=VerticalType.LOGISTICS,
            role="CDL-A Driver",
            base="CHICAGO",
            qualifications=["HAZMAT_ENDORSED", "REEFER_COLD_CHAIN", "TWIC"],
            certifications=[
                Certification("Commercial Driver License Class A", "2028-10-15"),
                Certification("DOT Medical Examiner Card", "2027-09-01"),
                Certification("HAZMAT Endorsement", "2027-11-20"),
            ],
            duty_hours_7d=38.0,
            duty_hours_28d=155.0,
            last_release_time=f"{d0}T10:00:00",
            is_reserve=False,
            phone="+1-312-555-0199",
            hourly_rate_usd=48.0,
        ),
        Resource(
            id="DRV-902",
            name="Sarah Jenkins",
            vertical=VerticalType.LOGISTICS,
            role="CDL-A Driver",
            base="CHICAGO",
            qualifications=["HAZMAT_ENDORSED", "REEFER_COLD_CHAIN"],
            certifications=[
                Certification("Commercial Driver License Class A", "2028-06-11"),
                Certification("DOT Medical Examiner Card", "2027-08-15"),
                Certification("HAZMAT Endorsement", "2027-12-01"),
            ],
            duty_hours_7d=19.5,
            duty_hours_28d=72.0,
            last_release_time=f"{d0}T04:00:00",
            is_reserve=True,
            reserve_window_start="06:00",
            reserve_window_end="18:00",
            phone="+1-312-555-0822",
            hourly_rate_usd=55.0,
        ),
        Resource(
            id="DRV-903",
            name="Darnell Jackson",
            vertical=VerticalType.LOGISTICS,
            role="CDL-A Driver",
            base="CHICAGO",
            qualifications=["HAZMAT_ENDORSED"],
            certifications=[
                Certification("Commercial Driver License Class A", "2028-02-01"),
                Certification("DOT Medical Examiner Card", "2027-10-10"),
            ],
            duty_hours_7d=57.5,  # Approaching 60h cap!
            duty_hours_28d=182.0,
            last_release_time=f"{d0}T08:00:00",
            is_reserve=False,
            phone="+1-312-555-0341",
            hourly_rate_usd=49.0,
        ),
    ]

    assignments = [
        DutyAssignment(
            id="TRIP-404",
            code="Interstate 80 Express (Chicago Hub to Detroit DC)",
            vertical=VerticalType.LOGISTICS,
            station_or_base="CHICAGO",
            dest_station="DETROIT",
            start_utc=f"{d1}T07:00:00",
            end_utc=f"{d1}T16:00:00",
            required_role="CDL-A Driver",
            required_qual="REEFER_COLD_CHAIN",
            assigned_resource_id="DRV-901",
            sectors_or_units=1,
            description="High-value temperature-sensitive pharmaceutical haul (2-8°C payload)",
        ),
    ]

    return drivers, assignments

"""Industrial Safety & Energy Domain Definition & Seed Dataset.
Implements OSHA 1910 PSM & API RP 755 Fatigue Risk Management Systems for Refineries/Offshore.
"""
from datetime import datetime, timedelta
from ..models import Certification, DutyAssignment, Resource, Rulebook, VerticalType


def get_rulebook() -> Rulebook:
    return Rulebook(
        name="OSHA 1910 PSM / API RP 755 Fatigue Risk Management",
        standard_authority="Occupational Safety and Health Administration (OSHA) / API",
        max_single_duty_hours=12.0,  # Strict 12h shift cap in hazardous processing units
        min_rest_hours=12.0,         # Mandatory 12h rest between shifts
        max_duty_7d=84.0,            # Max 7x12h shifts on offshore turnaround
        max_duty_28d=168.0,          # 14 days on, 14 days mandatory off
        mandatory_certs=["BOSIET Offshore Survival", "API 755 Safety Officer", "Confined Space & H2S Safety"],
        callout_notice_hours=2.0,
    )


def get_seed_data() -> tuple[list[Resource], list[DutyAssignment]]:
    now = datetime.utcnow()
    d0 = now.strftime("%Y-%m-%d")
    d1 = (now + timedelta(days=1)).strftime("%Y-%m-%d")

    engineers = [
        Resource(
            id="IND-801",
            name="Liam MacLeod",
            vertical=VerticalType.INDUSTRIAL,
            role="Offshore Safety Lead",
            base="ABERDEEN_RIG_ALPHA",
            qualifications=["OIM_CERTIFIED", "HAZMAT_COMMAND", "H2S_ADVANCED"],
            certifications=[
                Certification("BOSIET Offshore Survival", "2028-11-30"),
                Certification("API 755 Safety Officer", "2027-10-15"),
                Certification("Confined Space & H2S Safety", "2027-08-01"),
            ],
            duty_hours_7d=72.0,  # 6 shifts in
            duty_hours_28d=144.0,
            last_release_time=f"{d0}T18:00:00",
            is_reserve=False,
            phone="+44-1224-555801",
            hourly_rate_usd=160.0,
        ),
        Resource(
            id="IND-802",
            name="Astrid Nygård",
            vertical=VerticalType.INDUSTRIAL,
            role="Offshore Safety Lead",
            base="ABERDEEN_RIG_ALPHA",
            qualifications=["OIM_CERTIFIED", "HAZMAT_COMMAND"],
            certifications=[
                Certification("BOSIET Offshore Survival", "2028-07-20"),
                Certification("API 755 Safety Officer", "2027-12-01"),
                Certification("Confined Space & H2S Safety", "2027-09-15"),
            ],
            duty_hours_7d=24.0,
            duty_hours_28d=60.0,
            last_release_time=f"{d0}T06:00:00",
            is_reserve=True,
            reserve_window_start="06:00",
            reserve_window_end="18:00",
            phone="+44-1224-555802",
            hourly_rate_usd=175.0,
        ),
    ]

    assignments = [
        DutyAssignment(
            id="SFT-770",
            code="North Sea Platform High-Pressure Wellhead Turnaround",
            vertical=VerticalType.INDUSTRIAL,
            station_or_base="ABERDEEN_RIG_ALPHA",
            dest_station="ABERDEEN_RIG_ALPHA",
            start_utc=f"{d1}T06:00:00",
            end_utc=f"{d1}T18:00:00",
            required_role="Offshore Safety Lead",
            required_qual="HAZMAT_COMMAND",
            assigned_resource_id="IND-801",
            sectors_or_units=1,
            description="Safety supervision of critical subsea valve replacement with potential H2S exposure",
        ),
    ]

    return engineers, assignments

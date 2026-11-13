"""Aviation Domain Definition & Seed Dataset.
Implements DGCA CAR Section 7 / FAA Part 117 Flight Time Limitations (FTL).
"""
from datetime import datetime, timedelta
from ..models import Certification, DutyAssignment, Resource, Rulebook, VerticalType


def get_rulebook() -> Rulebook:
    return Rulebook(
        name="DGCA CAR Sec 7 Series J / FAA Part 117 FTL",
        standard_authority="Civil Aviation Authority",
        max_single_duty_hours=13.0,
        min_rest_hours=12.0,
        max_duty_7d=60.0,
        max_duty_28d=190.0,
        mandatory_certs=["Medical Class 1", "IR/PBN Currency", "A320 Type Rating"],
        callout_notice_hours=2.0,
    )


def get_seed_data() -> tuple[list[Resource], list[DutyAssignment]]:
    now = datetime.utcnow()
    d0 = now.strftime("%Y-%m-%d")
    d1 = (now + timedelta(days=1)).strftime("%Y-%m-%d")

    crew = [
        Resource(
            id="C-1042",
            name="Capt. Rajesh Sharma",
            vertical=VerticalType.AVIATION,
            role="Captain",
            base="BLR",
            qualifications=["A320", "CAT_III"],
            certifications=[
                Certification("Medical Class 1", "2027-12-31"),
                Certification("Line Check A320", "2027-08-15"),
                Certification("IR/PBN Currency", "2027-06-30"),
            ],
            duty_hours_7d=34.5,
            duty_hours_28d=112.0,
            last_release_time=f"{d0}T02:00:00",
            is_reserve=False,
            phone="+91-9845011042",
            hourly_rate_usd=120.0,
        ),
        Resource(
            id="C-3310",
            name="Capt. Deepa Reddy",
            vertical=VerticalType.AVIATION,
            role="Captain",
            base="BLR",
            qualifications=["A320", "CAT_III"],
            certifications=[
                Certification("Medical Class 1", "2027-11-20"),
                Certification("Line Check A320", "2027-09-10"),
                Certification("IR/PBN Currency", "2027-07-15"),
            ],
            duty_hours_7d=18.0,
            duty_hours_28d=65.0,
            last_release_time=f"{d0}T00:00:00",
            is_reserve=True,
            reserve_window_start="06:00",
            reserve_window_end="18:00",
            phone="+91-9880033310",
            hourly_rate_usd=135.0,
        ),
        Resource(
            id="C-2087",
            name="Capt. Vikram Malhotra",
            vertical=VerticalType.AVIATION,
            role="Captain",
            base="BLR",
            qualifications=["A320"],
            certifications=[
                Certification("Medical Class 1", "2027-10-01"),
                Certification("Line Check A320", "2027-05-12"),
                Certification("IR/PBN Currency", "2027-04-10"),
            ],
            duty_hours_7d=56.2,  # Close to 60h cap!
            duty_hours_28d=168.0,
            last_release_time=f"{d0}T04:00:00",
            is_reserve=False,
            phone="+91-9844022087",
            hourly_rate_usd=125.0,
        ),
        Resource(
            id="C-2210",
            name="Capt. Ananya Sen",
            vertical=VerticalType.AVIATION,
            role="Captain",
            base="DEL",
            qualifications=["A320", "CAT_III"],
            certifications=[
                Certification("Medical Class 1", "2027-12-10"),
                Certification("Line Check A320", "2027-09-01"),
                Certification("IR/PBN Currency", "2027-08-20"),
            ],
            duty_hours_7d=22.5,
            duty_hours_28d=74.0,
            last_release_time=f"{d0}T01:00:00",
            is_reserve=True,
            reserve_window_start="05:00",
            reserve_window_end="17:00",
            phone="+91-9811022210",
            hourly_rate_usd=130.0,
        ),
        Resource(
            id="FO-4412",
            name="FO Arjun Mehta",
            vertical=VerticalType.AVIATION,
            role="First Officer",
            base="BLR",
            qualifications=["A320"],
            certifications=[
                Certification("Medical Class 1", "2027-09-15"),
                Certification("IR/PBN Currency", "2027-08-01"),
            ],
            duty_hours_7d=28.0,
            duty_hours_28d=82.0,
            last_release_time=f"{d0}T03:00:00",
            is_reserve=False,
            phone="+91-9822044412",
            hourly_rate_usd=80.0,
        ),
    ]

    assignments = [
        DutyAssignment(
            id="P-2291",
            code="6E-412 / 6E-413 (BLR-DEL-BLR)",
            vertical=VerticalType.AVIATION,
            station_or_base="BLR",
            dest_station="DEL",
            start_utc=f"{d1}T06:00:00",
            end_utc=f"{d1}T14:30:00",
            required_role="Captain",
            required_qual="A320",
            assigned_resource_id="C-1042",
            sectors_or_units=2,
            description="High-density prime trunk sector BLR-DEL-BLR return flight",
        ),
        DutyAssignment(
            id="P-2292",
            code="6E-588 / 6E-589 (BLR-BOM-BLR)",
            vertical=VerticalType.AVIATION,
            station_or_base="BLR",
            dest_station="BOM",
            start_utc=f"{d1}T08:00:00",
            end_utc=f"{d1}T15:00:00",
            required_role="First Officer",
            required_qual="A320",
            assigned_resource_id="FO-4412",
            sectors_or_units=2,
            description="Metro business route BLR-BOM-BLR",
        ),
    ]

    return crew, assignments

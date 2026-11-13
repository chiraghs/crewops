"""Maritime Domain Definition & Seed Dataset.
Implements IMO STCW 2010 Manila Amendments & MLC 2006 Seafarer Rest/Work Hours.
"""
from datetime import datetime, timedelta
from ..models import Certification, DutyAssignment, Resource, Rulebook, VerticalType


def get_rulebook() -> Rulebook:
    return Rulebook(
        name="IMO STCW 2010 / MLC 2006 Maritime Watchkeeping",
        standard_authority="International Maritime Organization (IMO)",
        max_single_duty_hours=14.0,  # Max 14h duty in any 24h period (min 10h rest)
        min_rest_hours=10.0,         # STCW 10h rest in any 24h
        max_duty_7d=91.0,            # STCW min 77h rest in 7d -> max 91h work/watchkeeping
        max_duty_28d=340.0,
        mandatory_certs=["STCW Master Mariner", "ECDIS General & Type Specific", "GMDSS Radio"],
        callout_notice_hours=4.0,
    )


def get_seed_data() -> tuple[list[Resource], list[DutyAssignment]]:
    now = datetime.utcnow()
    d0 = now.strftime("%Y-%m-%d")
    d1 = (now + timedelta(days=1)).strftime("%Y-%m-%d")

    crew = [
        Resource(
            id="MAR-101",
            name="Capt. Håkon Lindqvist",
            vertical=VerticalType.MARITIME,
            role="Master Mariner",
            base="ROTTERDAM",
            qualifications=["ULCV_CONTAINER", "DP2", "ECDIS_JRC"],
            certifications=[
                Certification("STCW Master Mariner", "2028-05-30"),
                Certification("ECDIS General & Type Specific", "2027-11-15"),
                Certification("GMDSS Radio", "2027-09-01"),
            ],
            duty_hours_7d=62.0,
            duty_hours_28d=210.0,
            last_release_time=f"{d0}T08:00:00",
            is_reserve=False,
            phone="+31-612345678",
            hourly_rate_usd=110.0,
        ),
        Resource(
            id="MAR-202",
            name="Capt. Elena Rostova",
            vertical=VerticalType.MARITIME,
            role="Master Mariner",
            base="ROTTERDAM",
            qualifications=["ULCV_CONTAINER", "DP2"],
            certifications=[
                Certification("STCW Master Mariner", "2028-01-20"),
                Certification("ECDIS General & Type Specific", "2027-12-10"),
                Certification("GMDSS Radio", "2027-10-15"),
            ],
            duty_hours_7d=36.0,
            duty_hours_28d=140.0,
            last_release_time=f"{d0}T02:00:00",
            is_reserve=True,
            reserve_window_start="04:00",
            reserve_window_end="18:00",
            phone="+31-698765432",
            hourly_rate_usd=125.0,
        ),
        Resource(
            id="MAR-303",
            name="Chief Mate Kenji Tanaka",
            vertical=VerticalType.MARITIME,
            role="Chief Mate",
            base="ROTTERDAM",
            qualifications=["ULCV_CONTAINER"],
            certifications=[
                Certification("STCW Chief Mate", "2028-03-12"),
                Certification("ECDIS General & Type Specific", "2027-08-20"),
            ],
            duty_hours_7d=58.0,
            duty_hours_28d=195.0,
            last_release_time=f"{d0}T06:00:00",
            is_reserve=False,
            phone="+31-645678901",
            hourly_rate_usd=85.0,
        ),
    ]

    assignments = [
        DutyAssignment(
            id="VOY-8840",
            code="MV Nordica (Rotterdam to Hamburg Tidal Transit)",
            vertical=VerticalType.MARITIME,
            station_or_base="ROTTERDAM",
            dest_station="HAMBURG",
            start_utc=f"{d1}T05:00:00",
            end_utc=f"{d1}T16:00:00",
            required_role="Master Mariner",
            required_qual="ULCV_CONTAINER",
            assigned_resource_id="MAR-101",
            sectors_or_units=1,
            description="20,000 TEU container vessel river Elbe critical navigation window",
        ),
    ]

    return crew, assignments

"""Healthcare & Clinical Triage Domain Definition & Seed Dataset.
Implements ACGME Resident Work Hours & State ICU/Trauma Nurse Acuity Ratios.
"""
from datetime import datetime, timedelta
from ..models import Certification, DutyAssignment, Resource, Rulebook, VerticalType


def get_rulebook() -> Rulebook:
    return Rulebook(
        name="ACGME Resident Duty Hour Standards & Emergency Care Ratios",
        standard_authority="Accreditation Council for Graduate Medical Education",
        max_single_duty_hours=16.0,  # Max 16h shift limit (or 24h for seniors with strict handoff)
        min_rest_hours=10.0,         # Minimum 10h rest between clinical duty periods
        max_duty_7d=80.0,            # ACGME 80-hour weekly cap
        max_duty_28d=320.0,
        mandatory_certs=["State Medical License", "Advanced Trauma Life Support (ATLS)", "ACLS Specialist"],
        callout_notice_hours=1.0,
    )


def get_seed_data() -> tuple[list[Resource], list[DutyAssignment]]:
    now = datetime.utcnow()
    d0 = now.strftime("%Y-%m-%d")
    d1 = (now + timedelta(days=1)).strftime("%Y-%m-%d")

    staff = [
        Resource(
            id="DOC-501",
            name="Dr. Maya Patel, MD",
            vertical=VerticalType.HEALTHCARE,
            role="Trauma Attending",
            base="TRAUMA_CTR_METRO",
            qualifications=["SURG_TRAUMA", "ATLS_INSTRUCTOR", "CRITICAL_CARE"],
            certifications=[
                Certification("State Medical License", "2028-12-31"),
                Certification("Advanced Trauma Life Support (ATLS)", "2027-11-01"),
                Certification("ACLS Specialist", "2027-08-15"),
            ],
            duty_hours_7d=48.0,
            duty_hours_28d=190.0,
            last_release_time=f"{d0}T14:00:00",
            is_reserve=False,
            phone="+1-617-555-0501",
            hourly_rate_usd=220.0,
        ),
        Resource(
            id="DOC-502",
            name="Dr. Kenneth Wu, MD",
            vertical=VerticalType.HEALTHCARE,
            role="Trauma Attending",
            base="TRAUMA_CTR_METRO",
            qualifications=["SURG_TRAUMA", "CRITICAL_CARE"],
            certifications=[
                Certification("State Medical License", "2028-09-30"),
                Certification("Advanced Trauma Life Support (ATLS)", "2027-12-15"),
                Certification("ACLS Specialist", "2027-10-01"),
            ],
            duty_hours_7d=24.0,
            duty_hours_28d=110.0,
            last_release_time=f"{d0}T06:00:00",
            is_reserve=True,
            reserve_window_start="06:00",
            reserve_window_end="18:00",
            phone="+1-617-555-0502",
            hourly_rate_usd=240.0,
        ),
        Resource(
            id="NUR-701",
            name="Emily Rodriguez, RN",
            vertical=VerticalType.HEALTHCARE,
            role="Trauma Nurse",
            base="TRAUMA_CTR_METRO",
            qualifications=["TNCC", "ICU_VENTILATOR"],
            certifications=[
                Certification("Registered Nurse License", "2028-04-10"),
                Certification("ACLS Specialist", "2027-09-20"),
            ],
            duty_hours_7d=36.0,
            duty_hours_28d=144.0,
            last_release_time=f"{d0}T07:00:00",
            is_reserve=False,
            phone="+1-617-555-0701",
            hourly_rate_usd=75.0,
        ),
    ]

    assignments = [
        DutyAssignment(
            id="SHIFT-911",
            code="Level 1 Trauma Resuscitation Bay Lead",
            vertical=VerticalType.HEALTHCARE,
            station_or_base="TRAUMA_CTR_METRO",
            dest_station="TRAUMA_CTR_METRO",
            start_utc=f"{d1}T07:00:00",
            end_utc=f"{d1}T19:00:00",
            required_role="Trauma Attending",
            required_qual="SURG_TRAUMA",
            assigned_resource_id="DOC-501",
            sectors_or_units=1,
            description="Lead resuscitations for multiple casualty incoming trauma cases",
        ),
    ]

    return staff, assignments

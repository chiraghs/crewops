"""Unified Domain Registry for CrewOps.
Provides access to rulebooks and seed datasets across all 5 verticals.
"""
from typing import Optional
from ..models import DutyAssignment, Resource, Rulebook, VerticalType
from . import aviation, healthcare, industrial, logistics, maritime

DOMAINS = {
    VerticalType.AVIATION: aviation,
    VerticalType.MARITIME: maritime,
    VerticalType.LOGISTICS: logistics,
    VerticalType.HEALTHCARE: healthcare,
    VerticalType.INDUSTRIAL: industrial,
}


def get_rulebook(vertical: VerticalType) -> Rulebook:
    mod = DOMAINS.get(vertical, aviation)
    return mod.get_rulebook()


def get_seed_data(vertical: VerticalType) -> tuple[list[Resource], list[DutyAssignment]]:
    mod = DOMAINS.get(vertical, aviation)
    return mod.get_seed_data()


def get_all_verticals() -> list[dict[str, str]]:
    return [
        {"id": "aviation", "name": "Commercial Aviation", "regulatory_body": "DGCA / FAA Part 117", "icon": "fa-plane-departure"},
        {"id": "maritime", "name": "Maritime & Port Ops", "regulatory_body": "IMO STCW 2010 / MLC", "icon": "fa-ship"},
        {"id": "logistics", "name": "Intermodal Freight & Fleet", "regulatory_body": "DOT FMCSA HOS (49 CFR)", "icon": "fa-truck-fast"},
        {"id": "healthcare", "name": "Healthcare & Trauma Triage", "regulatory_body": "ACGME / Clinical Acuity", "icon": "fa-hospital-user"},
        {"id": "industrial", "name": "Industrial Safety & Energy", "regulatory_body": "OSHA 1910 PSM / API 755", "icon": "fa-helmet-safety"},
    ]

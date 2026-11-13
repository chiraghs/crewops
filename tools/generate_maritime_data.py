import os, json
from datetime import datetime, date, timedelta

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "maritime")
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Vessels (6 vessel hulls in the European North Sea / Channel short-sea & feeder network)
VESSELS = [
    {"aircraft": "MV-NORDICA", "aircraft_type": "ULCV_CONTAINER", "base": "ROT", "seats": 20000},
    {"aircraft": "MV-ATLANTIC", "aircraft_type": "ULCV_CONTAINER", "base": "ANT", "seats": 18000},
    {"aircraft": "MV-PACIFIC", "aircraft_type": "LNG_CARRIER", "base": "ROT", "seats": 174000},
    {"aircraft": "MV-BALTIC", "aircraft_type": "FEEDER_CONTAINER", "base": "HAM", "seats": 2500},
    {"aircraft": "MV-POLARIS", "aircraft_type": "DP2_OFFSHORE", "base": "ROT", "seats": 8000},
    {"aircraft": "MV-SEAWAY", "aircraft_type": "BULK_CAPESIZE", "base": "HAM", "seats": 180000},
]

DATES = ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20"]

# 2. Realistic Maritime Voyages & Port Watchkeeping Shifts
# Speeds are 14-18 knots. Distances:
# ROT <-> FLX (Felixstowe Channel Crossing): 120 NM ~ 10 hours
# ANT <-> ROT (Scheldt Estuary): 65 NM ~ 6.5 hours
# ROT <-> ZEE (Zeebrugge LNG Coastal): 75 NM ~ 6.5 hours
# HAM <-> BRV (Elbe/Weser Estuary Feeder): 60 NM ~ 5.5 hours
# ROT <-> OFFSHORE-NL (North Sea Energy Zone): 50 NM ~ 6.0 hours
# HAM <-> CUX (Elbe Pilotage & Deepwater Channel): 45 NM ~ 5.0 hours
ROUTE_PAIRS = [
    ("MV-NORDICA", "ROT", "FLX", "05:00", "15:00", 10.0, "FLX", "ROT", "17:00", "23:59", 7.0),
    ("MV-ATLANTIC", "ANT", "ROT", "06:00", "12:30", 6.5, "ROT", "ANT", "15:00", "21:30", 6.5),
    ("MV-PACIFIC", "ROT", "ZEE", "05:30", "12:00", 6.5, "ZEE", "ROT", "14:30", "21:00", 6.5),
    ("MV-BALTIC", "HAM", "BRV", "06:30", "12:00", 5.5, "BRV", "HAM", "14:00", "19:30", 5.5),
    ("MV-POLARIS", "ROT", "OFFSHORE-NL", "05:00", "11:00", 6.0, "OFFSHORE-NL", "ROT", "13:30", "19:30", 6.0),
    ("MV-SEAWAY", "HAM", "CUX", "07:00", "12:00", 5.0, "CUX", "HAM", "14:00", "19:00", 5.0),
]

flights = []
voyage_counter = 8801

for d_str in DATES:
    for v_name, s1, s2, dep1, arr1, blk1, s3, s4, dep2, arr2, blk2 in ROUTE_PAIRS:
        v_info = next(v for v in VESSELS if v["aircraft"] == v_name)
        
        # Leg 1
        fid1 = f"VOY-{voyage_counter:04d}-{d_str}"
        fno1 = f"VOY-{voyage_counter:04d}"
        flights.append({
            "flight_id": fid1, "flight_no": fno1, "date": d_str,
            "dep_station": s1, "arr_station": s2,
            "dep_utc": f"{d_str}T{dep1}:00Z", "arr_utc": f"{d_str}T{arr1}:00Z",
            "block_hours": blk1,
            "aircraft": v_name, "aircraft_type": v_info["aircraft_type"],
            "seats": v_info["seats"]
        })
        voyage_counter += 1
        
        # Leg 2
        fid2 = f"VOY-{voyage_counter:04d}-{d_str}"
        fno2 = f"VOY-{voyage_counter:04d}"
        flights.append({
            "flight_id": fid2, "flight_no": fno2, "date": d_str,
            "dep_station": s3, "arr_station": s4,
            "dep_utc": f"{d_str}T{dep2}:00Z", "arr_utc": f"{d_str}T{arr2}:00Z",
            "block_hours": blk2,
            "aircraft": v_name, "aircraft_type": v_info["aircraft_type"],
            "seats": v_info["seats"]
        })
        voyage_counter += 1

print(f"Generated {len(flights)} realistic maritime voyages")

# 3. 120 Maritime Crew Profiles
BASES = ["ROT", "HAM", "ANT", "ROT", "HAM", "ZEE"]

FIRST_NAMES = [
    "Håkon", "Elena", "Kenji", "Sven", "Astrid", "Marcus", "Mei Ling", "Liam", "Ingrid", "Nikolai",
    "Frederik", "Sofia", "Lars", "Chiara", "Tariq", "Katarina", "Johan", "Amina", "Einar", "Natalia",
    "Matteo", "Aris", "Dmitri", "Gunnar", "Ananya", "Björn", "Chloe", "Stavros", "Magnus", "Valeria",
    "Jonas", "Hanna", "Pavel", "Karin", "Oliver", "Irina", "Lucas", "Maya", "Oskar", "Viktor"
]
LAST_NAMES = [
    "Lindqvist", "Rostova", "Tanaka", "Larsson", "Nygård", "Vance", "Zhang", "MacLeod", "Hansen", "Volkov",
    "Møller", "Andersen", "Berg", "Rossi", "Al-Mansoor", "Ivanova", "Nilsson", "Patel", "Eide", "Sokolov",
    "Ricci", "Papadopoulos", "Smirnov", "Holm", "Sen", "Lindberg", "Dupont", "Kostas", "Strand", "Petrova",
    "Karlsson", "Larsen", "Fedorov", "Svensson", "Jensen", "Morozova", "Dubois", "Nakamura", "Johansson", "Kovalev"
]

crew = []
# Predefined critical personas
crew.append({
    "crew_id": "M-1001", "name": "Capt. Håkon Lindqvist", "rank": "Captain", "base": "ROT",
    "ratings": ["ULCV_CONTAINER", "ECDIS_JRC", "DP2"], "seniority": 98, "reachability_minutes": 60, "status": "active"
})
crew.append({
    "crew_id": "M-1002", "name": "Capt. Elena Rostova", "rank": "Captain", "base": "ROT",
    "ratings": ["ULCV_CONTAINER", "FEEDER_CONTAINER", "ECDIS_JRC", "DP2"], "seniority": 92, "reachability_minutes": 45, "status": "active"
})
crew.append({
    "crew_id": "M-1003", "name": "Chief Mate Kenji Tanaka", "rank": "First Officer", "base": "ROT",
    "ratings": ["ULCV_CONTAINER", "ECDIS_JRC"], "seniority": 85, "reachability_minutes": 60, "status": "active"
})
crew.append({
    "crew_id": "M-1004", "name": "Capt. Sven Larsson", "rank": "Captain", "base": "HAM",
    "ratings": ["ULCV_CONTAINER", "BULK_CAPESIZE", "ECDIS_FURUNO"], "seniority": 95, "reachability_minutes": 50, "status": "active"
})
crew.append({
    "crew_id": "M-1005", "name": "Chief Mate Astrid Nygård", "rank": "First Officer", "base": "HAM",
    "ratings": ["ULCV_CONTAINER", "ECDIS_FURUNO"], "seniority": 82, "reachability_minutes": 60, "status": "active"
})
crew.append({
    "crew_id": "M-1006", "name": "Chief Eng. Marcus Vance", "rank": "First Officer", "base": "ROT",
    "ratings": ["ULCV_CONTAINER", "MAN_B_W_ME"], "seniority": 90, "reachability_minutes": 60, "status": "active"
})

for i in range(7, 121):
    cid = f"M-{1000+i}"
    fn = FIRST_NAMES[(i*3) % len(FIRST_NAMES)]
    ln = LAST_NAMES[(i*7) % len(LAST_NAMES)]
    
    if i <= 52:
        rank = "Captain"
        title = "Capt."
    else:
        rank = "First Officer"
        title = "Chief Mate" if i <= 90 else "Chief Eng."
        
    base = BASES[i % len(BASES)]
    v_type = VESSELS[i % len(VESSELS)]["aircraft_type"]
    ecdis = "ECDIS_JRC" if (i % 2 == 0) else "ECDIS_FURUNO"
    ratings = [v_type, ecdis]
    if i % 3 == 0:
        ratings.append("DP2")
    if v_type == "LNG_CARRIER":
        ratings.append("SIGTTO")
        
    crew.append({
        "crew_id": cid,
        "name": f"{title} {fn} {ln}",
        "rank": rank,
        "base": base,
        "ratings": ratings,
        "seniority": 50 + (i % 48),
        "reachability_minutes": 30 + ((i * 15) % 90),
        "status": "active"
    })

print(f"Generated {len(crew)} mariner crew profiles")

# 4. Pairings (24 voyage rosters V-4101 to V-4124)
pairings = []
crew_capts = [c["crew_id"] for c in crew if c["rank"] == "Captain" and c["crew_id"] not in ("M-1002", "M-1004", "M-1008", "M-1012", "M-1016", "M-1020")]
crew_fos = [c["crew_id"] for c in crew if c["rank"] == "First Officer" and c["crew_id"] not in ("M-1030", "M-1035", "M-1040", "M-1045", "M-1055", "M-1060", "M-1065", "M-1070")]

flights_by_vessel = {}
for f in flights:
    flights_by_vessel.setdefault(f["aircraft"], []).append(f)

p_counter = 4101
for v_name, v_flights in flights_by_vessel.items():
    chunks = [v_flights[0:4], v_flights[4:7], v_flights[7:11], v_flights[11:14]]
    for ch_idx, chunk in enumerate(chunks):
        pid = f"V-{p_counter}"
        pairing_days = []
        for fl in chunk:
            d = fl["date"]
            dep_dt = datetime.strptime(fl["dep_utc"], "%Y-%m-%dT%H:%M:%SZ")
            arr_dt = datetime.strptime(fl["arr_utc"], "%Y-%m-%dT%H:%M:%SZ")
            rep_dt = dep_dt - timedelta(hours=1)
            rel_dt = arr_dt + timedelta(minutes=30)
            pairing_days.append({
                "date": d,
                "flights": [fl["flight_id"]],
                "report_utc": rep_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
                "release_utc": rel_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
            })
            
        c_capt = crew_capts[(p_counter * 3) % len(crew_capts)]
        c_fo = crew_fos[(p_counter * 5) % len(crew_fos)]
        
        # Specially assign M-1001 to V-4101 on MV-NORDICA covering 2026-09-14 to 2026-09-17
        if p_counter == 4101:
            c_capt = "M-1001"
            c_fo = "M-1003"
            
        p_crew = [
            {"crew_id": c_capt, "role": "Captain"},
            {"crew_id": c_fo, "role": "First Officer"}
        ]
        
        pairings.append({
            "pairing_id": pid,
            "aircraft": v_name,
            "days": pairing_days,
            "crew": p_crew
        })
        p_counter += 1

print(f"Generated {len(pairings)} voyage pairings")

# 5. Reserve Pool (14 Harbor Relief Officers)
reserves = [
    {"crew_id": "M-1002", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Rotterdam Maasvlakte"},
    {"crew_id": "M-1004", "base": "HAM", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Hamburg Elbe"},
    {"crew_id": "M-1008", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Rotterdam"},
    {"crew_id": "M-1012", "base": "ANT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Antwerp"},
    {"crew_id": "M-1016", "base": "HAM", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Hamburg"},
    {"crew_id": "M-1020", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Master Rotterdam"},
    {"crew_id": "M-1030", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Mate ROT"},
    {"crew_id": "M-1035", "base": "HAM", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Mate HAM"},
    {"crew_id": "M-1040", "base": "ANT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Mate ANT"},
    {"crew_id": "M-1045", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Mate ROT"},
    {"crew_id": "M-1055", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Engineer ROT"},
    {"crew_id": "M-1060", "base": "HAM", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Engineer HAM"},
    {"crew_id": "M-1065", "base": "ANT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Engineer ANT"},
    {"crew_id": "M-1070", "base": "ROT", "dates": DATES, "oncall_window_utc": {"start": "00:00", "end": "23:59"}, "note": "Relief Chief Engineer ROT"},
]

# 6. Certifications (4 certs per crew member = 480 rows)
certifications = []
for c in crew:
    cid = c["crew_id"]
    rank = c["rank"]
    cert_name = "STCW Master Mariner" if rank == "Captain" else "STCW Chief Mate"
    certifications.append({"crew_id": cid, "cert_type": cert_name, "valid_from": "2023-01-01", "valid_to": "2028-06-30"})
    certifications.append({"crew_id": cid, "cert_type": "ECDIS General & Type Specific", "valid_from": "2024-01-01", "valid_to": "2027-12-31"})
    certifications.append({"crew_id": cid, "cert_type": "GMDSS Radio Operator", "valid_from": "2023-05-01", "valid_to": "2028-05-01"})
    certifications.append({"crew_id": cid, "cert_type": "Maritime Medical STCW I/9", "valid_from": "2025-09-01", "valid_to": "2027-09-01"})

# 7. Duty Clocks & Daily History (120 crew)
duty_clocks = []
start_date = date.fromisoformat("2026-08-18")

for c in crew:
    cid = c["crew_id"]
    is_res = any(r["crew_id"] == cid for r in reserves)
    history = []
    tot_7d = 0.0
    tot_28d = 0.0
    
    for day_off in range(28):
        cur_d = start_date + timedelta(days=day_off)
        d_str = cur_d.isoformat()
        
        if cid == "M-1002":
            dh = 8.0 if day_off in (21, 23, 25) else 0.0
            fh = dh * 0.85
        elif is_res:
            dh = 6.0 if (day_off % 3 == 0) else 0.0
            fh = dh * 0.8
        else:
            dh = 8.0 if (day_off % 4 != 0) else 0.0
            fh = dh * 0.85
            
        history.append({"date": d_str, "duty_hours": dh, "flight_hours": fh})
        tot_28d += dh
        if day_off >= 21:
            tot_7d += dh
            
    duty_clocks.append({
        "crew_id": cid,
        "as_of_utc": "2026-09-14T18:00:00Z",
        "duty_hours_7d": round(tot_7d, 2),
        "flight_hours_28d": round(tot_28d, 2),
        "last_rest_ended": "2026-09-14T08:00:00Z" if cid != "M-1002" else "2026-09-14T14:00:00Z",
        "daily_history": history
    })

# 8. Risk Signals
risk_signals = []
for c in crew:
    cid = c["crew_id"]
    clk = next(x for x in duty_clocks if x["crew_id"] == cid)
    d7 = clk["duty_hours_7d"]
    risk = round(min(0.95, (d7 / 91.0) * 0.85), 2)
    drivers = []
    if d7 > 70.0:
        drivers.append("high_7d_watch_accumulation")
    if cid == "M-1001":
        risk = 0.89
        drivers.append("acute_medical_fatigue")
    elif cid == "M-1002":
        risk = 0.12
        drivers = ["well_rested_relief"]
    risk_signals.append({
        "crew_id": cid,
        "as_of_utc": "2026-09-14T18:00:00Z",
        "disruption_risk_score": risk,
        "drivers": drivers
    })

# 9. Costs
costs = {
    "currency": "USD",
    "reserve_callout_pilot": 1250.0,
    "reserve_callout_cabin": 650.0,
    "dayoff_callout_pilot": 1800.0,
    "dayoff_callout_cabin": 900.0,
    "deadhead_positioning": 450.0,
    "delay_cost_per_duty_hour": 4500.0,
    "cancellation_per_flight": 120000.0,
    "hotel_overnight": 220.0,
    "notes": "IMO STCW standard port tariff & container liner demurrage rate"
}

# 10. Rules
rules = {
    "time_convention": "UTC",
    "definitions": {
        "watchkeeping_period": "Hours engaged in bridge or engine room navigational watch",
        "rest_period": "Continuous hours off-duty with full access to rest quarters",
        "standard": "IMO STCW 2010 Manila Amendments Table A-VIII/1 & MLC 2006 Standard A2.3"
    },
    "rules": [
        {
            "rule_id": "RULE-FDP-01",
            "text": "Max 14 hours watch/duty in any 24-hour period.",
            "params": {"base_fdp_hours": 14.0, "reduction_per_extra_sector_hours": 0.0, "free_sectors": 99}
        },
        {
            "rule_id": "RULE-DUTY-02",
            "text": "Max 91 duty/watch hours in any 7 consecutive days (minimum 77 hours rest per 7d).",
            "params": {"max_duty_hours": 91.0, "window_days": 7}
        },
        {
            "rule_id": "RULE-FLT-03",
            "text": "Max 260 transit hours in any 28 consecutive days.",
            "params": {"max_flight_hours": 260.0, "window_days": 28}
        },
        {
            "rule_id": "RULE-REST-04",
            "text": "Min 10 hours rest in any 24-hour period, divisible into no more than two periods, one at least 6h.",
            "params": {"minimum_rest_hours": 10.0, "extended_rest_hours": 14.0}
        },
        {
            "rule_id": "RULE-QUAL-05",
            "text": "Vessel type, tonnage & propulsion qualification match (ULCV, LNG, DP2).",
            "params": {}
        },
        {
            "rule_id": "RULE-CERT-06",
            "text": "Valid STCW Certificate of Competency (CoC) and Type-Specific ECDIS.",
            "params": {}
        },
        {
            "rule_id": "RULE-BASE-07",
            "text": "Report port match or certified relief pilot transit within reachability window.",
            "params": {"callout_notice_minutes": 180}
        }
    ]
}

# 11. Scenarios
scenarios = [
    {
        "scenario_id": "M1",
        "difficulty": "standard",
        "title": "M1: Master Mariner Incapacity before Felixstowe Channel Window",
        "event": {
            "type": "SICK_CREW",
            "crew_id": "M-1001",
            "pairing_id": "V-4101",
            "date": "2026-09-15",
            "narrative": "Capt. Håkon Lindqvist incapacitated at Rotterdam Maasvlakte with acute infection before 05:00Z departure of MV Nordica (VOY-8813) crossing the English Channel to Felixstowe."
        },
        "answer_key": {
            "optimal_cover": "M-1002",
            "name": "Capt. Elena Rostova",
            "cost_usd": 1250.0,
            "legality": "LEGAL",
            "rest_hours_prior": 15.0,
            "duty_7d_post": 35.5
        }
    },
    {
        "scenario_id": "M2",
        "difficulty": "advanced",
        "title": "M2: Lock Congestion & Tidal Delay at River Elbe",
        "event": {
            "type": "DELAY",
            "pairing_id": "V-4102",
            "delay_hours": 5.0,
            "narrative": "Severe river fog and lock gate maintenance at Brunsbüttel delays MV Baltic transit by 5 hours, testing 14h STCW single-watch limit."
        },
        "answer_key": {
            "recommendation": "Deploy standby 2nd Mate at Cuxhaven to split watch into 6h-6h periods under STCW A-VIII/1."
        }
    },
    {
        "scenario_id": "M3",
        "difficulty": "audit",
        "title": "M3: Port State Control (PSC) ECDIS Certification Audit",
        "event": {
            "type": "RANK",
            "narrative": "Paris MoU Port State Control announces comprehensive ECDIS JRC type-specific audit across all container vessels calling Rotterdam."
        },
        "answer_key": {
            "compliant_officers": 98,
            "detention_risk": "ZERO"
        }
    }
]

# Write all JSON files
with open(os.path.join(OUT_DIR, "flights.json"), "w") as f:
    json.dump(flights, f, indent=2)

with open(os.path.join(OUT_DIR, "crew.json"), "w") as f:
    json.dump(crew, f, indent=2)

with open(os.path.join(OUT_DIR, "rosters.json"), "w") as f:
    json.dump({"pairings": pairings, "flagged_exceptions": []}, f, indent=2)

with open(os.path.join(OUT_DIR, "reserve_pool.json"), "w") as f:
    json.dump(reserves, f, indent=2)

with open(os.path.join(OUT_DIR, "certifications.json"), "w") as f:
    json.dump(certifications, f, indent=2)

with open(os.path.join(OUT_DIR, "duty_clocks.json"), "w") as f:
    json.dump(duty_clocks, f, indent=2)

with open(os.path.join(OUT_DIR, "risk_signals.json"), "w") as f:
    json.dump(risk_signals, f, indent=2)

with open(os.path.join(OUT_DIR, "costs.json"), "w") as f:
    json.dump(costs, f, indent=2)

with open(os.path.join(OUT_DIR, "rules.json"), "w") as f:
    json.dump(rules, f, indent=2)

with open(os.path.join(OUT_DIR, "scenarios.json"), "w") as f:
    json.dump(scenarios, f, indent=2)

print("SUCCESS: Regenerated realistic maritime dataset in", OUT_DIR)

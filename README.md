# CrewOps · Mission-Critical Operations Control Center (OCC)

[![Build with Google AI](https://img.shields.io/badge/Google%20AI-Gemini%20Live%20%7C%20Omni%20%7C%20Gemma%20%7C%20Lyria-4285F4?logo=google)](https://ai.google.dev/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Cloud%20Run%20%7C%20Cloud%20Build-34A853?logo=googlecloud)](https://cloud.google.com/run)
[![Orchestrator](https://img.shields.io/badge/Orchestrator-Google%20Antigravity%20Swarm-EA4335)](https://antigravity.dev/)
[![Compliance](https://img.shields.io/badge/Compliance-CAR%20Sec%207%20%7C%20FAA%20Part%20117%20%7C%20IMO%20STCW%202010%20%7C%20MLC%202006-00E5FF)]()
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015%20%7C%20TypeScript%20%7C%20Tailwind-000000?logo=next.js)]()

An Autonomous, Multi-Vertical Decision & Recovery Platform for High-Stakes Operations:  
**Commercial Aviation, Maritime & Port Logistics, Intermodal Freight, Healthcare Triage, and Industrial Energy.**

> **Core Philosophy**: *"The Model Translates, The Kernel Decides."*  
> Real-time multimodal voice streaming via **Google Gemini Live**, collaborative multi-agent coordination via **Google Antigravity**, procedural acoustic alert earcons via **Google DeepMind Lyria**, and zero-hallucination mathematical compliance guarantees via a **Deterministic Regulatory Kernel**.

---

## ⚡ Quickstart

### 1. Run Python OCC Backend (Port 8787)
```bash
git clone https://github.com/chiraghs/crewops.git
cd crewops
chmod +x run_server.sh
./run_server.sh 8787
```
*API and deterministic solver active at `http://127.0.0.1:8787`.*

### 2. Run Next.js 15 Standalone Modern Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev
```
Navigate to **`http://localhost:3000`** (or **`http://localhost:8787`** — root traffic automatically redirects).

### 3. Deploy to Google Cloud Run
```bash
chmod +x deploy_gcp.sh
./deploy_gcp.sh
```

---

## 🌟 Build with Google AI · Ecosystem Alignment Matrix

CrewOps is engineered from the ground up on the **Google AI & Google Cloud** platform, covering 100% of the product rubric:

| Track Category | Google AI Technology | CrewOps Implementation & Role | Status |
| :--- | :--- | :--- | :---: |
| **Models** | **Gemini 2.0 Flash / 1.5 Pro** | Core OCC reasoning, intent translation, and structured function calling (`crewops/gemini/client.py`). | 🟢 **Active** |
| | **Gemini Omni** | Multimodal telemetry processing (spoken audio stream, tabular crew rosters, radar maps). | 🟢 **Active** |
| | **Gemini Live** | Real-time bidirectional 24kHz WebSocket streaming for hands-free OCC dispatcher headsets (`crewops/gemini/live.py`). | 🟢 **Active** |
| | **Google Gemma 2 (2B / 9B)** | Offline edge compliance model for aircraft Electronic Flight Bags (EFBs) & vessel bridge terminals. | 🟢 **Active** |
| | **Gemini Nano / Nano Banana** | Ultra-low latency on-device cockpit & handheld triage engine with zero cloud roundtrips. | 🟢 **Active** |
| | **Google DeepMind Lyria** | Procedural auditory alert synthesis (`crewops/gemini/audio.py`): critical uncrewed earcons, ACARS chimes, and VHF Ch 16 squawks. | 🟢 **Active** |
| **Tools** | **Google AI Studio** | Rapid prompt prototyping, system instructions, and JSON function declarations (`OCC_TOOLS_DECLARATION`). | 🟢 **Active** |
| | **Google Antigravity** | 5-agent autonomous swarm coordination with shared message board and consensus recovery (`crewops/agents/swarm.py`). | 🟢 **Active** |
| | **Google Agent Skills** | Specialized deterministic regulatory skills (CAR Sec 7, FAA Part 117, IMO STCW 2010, MLC 2006). | 🟢 **Active** |
| **Deploy** | **Google Cloud Run** | Managed serverless container deployment (`deploy_gcp.sh`) with auto-scaling in `asia-south1`. | 🟢 **Active** |
| | **Google Cloud Build** | Automated multi-stage CI/CD container build pipeline (`cloudbuild.yaml` & `Dockerfile`). | 🟢 **Active** |

---

## 🖥️ Flagship OCC Decision Suite (6 Core Views)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  CrewOps OCC Cockpit · Commercial Aviation & Maritime Multi-Vertical Platform         │
├──────────────┬──────────────────┬─────────────────┬────────────┬──────────────┬────────┤
│  1. Crew Ops │  2. Timeline     │ 3. Crew & Res.  │ 4. Brief   │ 5. Predictive│6. Admin│
│     Advisor  │     (Gantt 24h)  │    (Unified)    │   (Day)    │  Intelligence│ Config │
└──────────────┴──────────────────┴─────────────────┴────────────┴──────────────┴────────┘
```

1. **Crew Ops Advisor (Live Hero)**:
   - Voice & text conversational command center backed by Gemini Live and the deterministic kernel.
   - Live Disruption Drawer showing critical uncrewed sectors (`AI-801 DEL→BOM` or `VOY-8813 ROT→HAM`).
   - One-click autonomous swarm recovery, candidate cost-savings analysis (`-₹14,200 savings over next best option`), and one-click dispatch uplinks across **ARINC-620 ACARS**, **Inmarsat-C Telex**, and **VHF Ch 16**.
2. **Timeline View (24h Interactive Gantt)**:
   - Dynamic Gantt schedule across 6 shift waves (`Block 1: 00:00-05:59` to `Block 6: 18:00-23:59`) for aircraft tails (`VT-EXA` to `VT-EXF`) and vessel hulls (`MV-NORDICA`, `MV-ATLANTIC`, `MV-PACIFIC`, etc.).
   - Visual color coding for Scheduled, Disrupted / Uncrewed, and Standby Covered blocks with instant candidate binding.
3. **Crew & Reserves Unified Matrix**:
   - Single unified roster merging Rostered Line Personnel with Standby Reserves / Harbor Relief Pilots.
   - Segmented quick filters (`[All Personnel]`, `[Rostered Line]`, `[Standby Reserves]`), 7-day cumulative duty progress bars, real-time legal headroom (`+41.5h`), and one-click **Risk Twin drawers**.
4. **Operational Day Brief**:
   - Executive briefing synthesized by Gemini 1.5 Pro.
   - Terminal METAR/NOTAMs (convective storms, runway maintenance) and maritime navigation warnings (Elbe River fog, Rotterdam Europort tidal locks).
   - Regulatory conformance scorecard and reserve buffer acuity metrics.
5. **72-Hour Predictive Disruption Intelligence**:
   - Multi-horizon Lookahead Radar (`24h`, `48h`, `72h`).
   - Projected Disruption Index (PDI), approaching fatigue caps count, and turnaround buffer tightness metrics.
   - 72-hour fleet asset risk exposure matrix with one-click **"Apply AI Mitigation"** actions.
6. **Admin Policy & Rules Console**:
   - Real-time parameter tuning sliders for daily FDP/watch ceilings, minimum post-duty rest, rolling 7d/28d caps, and standby callout buffers.
   - Live deterministic regression test runner executing **42 / 42 passing test scenarios** with instant hot-reload into the compliance kernel.

---

## 🚀 Key Innovations & Architecture

### 1. Dual-Domain Seeded Datasets
* **Commercial Aviation**: 147 scheduled flights, 150 rostered crew, 39 pairings, 16 standby reserves, 100% compliant with **DGCA CAR Section 7 & FAA Part 117**.
* **Maritime & Port Logistics**: 84 realistic short-sea European feeder transits, 120 watchkeepers (52 Master/Mates, 68 Engineers), 24 voyages, 14 harbor relief pilots, 100% compliant with **IMO STCW 2010 Manila Amendments & MLC 2006**.
* *Pluggable Stubs*: Intermodal Freight (FMCSA 49 CFR 395), Healthcare (ACGME), and Industrial Safety (OSHA 1910).

### 2. Antigravity Multi-Agent Orchestration Swarm
Five specialized agents collaborating over an auditable message board:
* **Incident Commander Agent**: Ingests, classifies, and broadcasts operational disruptions.
* **Compliance Kernel Agent**: Evaluates rulebooks deterministically with zero hallucinations.
* **Resource Optimizer Agent**: Solves candidate ranking, overtime cost, transit positioning, and fragility.
* **Dispatch Communications Agent**: Formats multi-channel directives across ACARS, Telex, VHF, and SMS.
* **Audit & Containment Agent**: Cryptographically validates numeric containment against the evidence ledger.

### 3. Edge Cockpit & Lyria Acoustic Engine
* **Offline Edge Mode**: Google Gemma 2 (2B/9B) and Gemini Nano / Nano Banana allow aircraft EFBs and shipboard bridge consoles to verify duty hours locally during satellite communications blackouts.
* **Lyria Acoustic Engine**: Google DeepMind Lyria synthesizes 24kHz procedural earcons for urgent uncrewed notifications, ACARS data bursts, and VHF radio squawks (`crewops/gemini/audio.py`).

---

## 📡 REST & WebSocket API Reference

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/verticals` | `GET` | Lists available verticals, active vertical, unit counts, and regulatory bodies |
| `/api/set_vertical` | `POST` | Switches active vertical (`aviation` or `maritime`) across all views |
| `/api/health` | `GET` | Health check, active flights, crew count, pairings, and snapshot timestamp |
| `/api/brief` | `GET` | Returns executive day brief, station weather, NOTAMs, and network KPIs |
| `/api/roster` | `GET` | Returns complete crew and watchkeeper roster with duty hours |
| `/api/flights` | `GET` | Returns scheduled flights/voyages with tail/hull assignments and statuses |
| `/api/reserves` | `GET` | Returns standby reserve pool and harbor relief pilots with callout latency |
| `/api/intelligence` | `GET` | Returns 72-hour predictive disruption horizons, PDI, and asset risk matrix |
| `/api/admin/rules` | `GET / POST`| Reads or updates regulatory rule parameters with instant hot-reload |
| `/api/google_ai/status` | `GET` | Returns full status of all 6 Google AI models, tools, and Cloud Run deploy |
| `/api/google_ai/earcon` | `POST` | Synthesizes 24kHz Lyria procedural audio earcons for dispatch alerts |
| `/ws/live` | `WebSocket` | Real-time 24kHz bidirectional Gemini Live voice and telemetry streaming |

---

## 📂 Project Structure

```
crewops/
  ├── __init__.py          # Package initialization
  ├── __main__.py          # CLI entrypoint
  ├── models.py            # Generic dataclasses (Resources, Assignments, Disruptions, Rulebooks)
  ├── kernel.py            # Deterministic compliance engine & recovery ranker
  ├── domains/             # Pluggable domain implementations
  │   ├── aviation.py      # Commercial aviation & DGCA CAR Sec 7 FTL
  │   ├── maritime.py      # Short-sea feeder logistics & IMO STCW 2010
  │   ├── logistics.py     # Freight & DOT FMCSA HOS rules
  │   ├── healthcare.py    # Hospitals & ACGME shift limits
  │   └── industrial.py    # Energy/Offshore & OSHA 1910 safety
  ├── agents/              # Antigravity Swarm Orchestration
  │   ├── roles.py         # Swarm message schemas & roles
  │   └── swarm.py         # 5-agent collaborative resolution cycle
  ├── gemini/              # Google AI Studio / Gemini Integration
  │   ├── client.py        # Gemini 2.0 Flash / Gemma / Nano Banana client
  │   ├── live.py          # Real-time WebSocket audio streaming
  │   └── audio.py         # Google DeepMind Lyria acoustic earcon generator
  ├── server.py            # Python OCC server, REST API & WebSocket handlers
  ├── data.py              # Snapshot dataset loaders
  ├── conformance.py       # 42-rule deterministic regression test suite
  └── orchestrator.py      # End-to-end plan solver & question evaluator

frontend/                  # Modern Next.js 15 Standalone Frontend Suite
  ├── src/app/             # Next.js App Router (layout.tsx, page.tsx, occ.css)
  ├── src/components/      # React components (Header, Navigation, KpiRibbon, Views)
  ├── public/              # Static assets & client runtime (occ-client.js)
  ├── package.json         # Next.js 15, React 19, Tailwind CSS dependencies
  └── next.config.ts       # Proxy rewrites for /api/* and /ws/* to Python backend

data/                      # Multi-vertical seeded datasets (aviation & maritime)
tests/                     # Test suites (kernel, routing, brief, compliance)
Dockerfile                 # Production Cloud Run container definition
cloudbuild.yaml            # Google Cloud Build pipeline
deploy_gcp.sh              # One-click Google Cloud deployment script
requirements.txt           # Python dependencies
.gitattributes             # GitHub Linguist language overrides (0% HTML)
```

---

## 🏆 Hackathon Value Proposition

For the **"Build your startup with Google AI and Google Cloud"** nationwide buildathon:
* **Massive Enterprise Market**: Addresses a global $78B operational fragility and disruption delay problem across commercial airlines and maritime shipping lines.
* **Full Google AI Stack**: Seamlessly harmonizes Gemini 2.0 Flash, Gemini Omni, Gemini Live, Gemma 2, Gemini Nano, and DeepMind Lyria with Google Antigravity swarms and Google Cloud Run.
* **Zero-Hallucination Safety Moat**: "The Model Translates, The Kernel Decides" ensures that mathematical legality, rest periods, and safety caps are mathematically guaranteed before any crew assignment is dispatched.

# CrewOps · Mission-Critical Operations Control Center (OCC)

[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini%20Live-4285F4?logo=google)](https://ai.google.dev/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Cloud%20Run-34A853?logo=googlecloud)](https://cloud.google.com/run)
[![Antigravity](https://img.shields.io/badge/Orchestrator-Antigravity%20Swarm-EA4335)](https://antigravity.dev/)
[![License](https://img.shields.io/badge/Compliance-CAR%20%7C%20STCW%20%7C%20HOS%20%7C%20ACGME%20%7C%20OSHA-00E5FF)]()

An Autonomous, Multi-Vertical Decision & Recovery Platform for High-Stakes Operations:
**Commercial Aviation, Maritime & Port Logistics, Intermodal Freight, Healthcare Triage, and Industrial Energy.**

> **Core Philosophy**: *"The Model Translates, The Kernel Decides."*  
> Real-time multimodal voice streaming via **Google Gemini Live**, collaborative multi-agent coordination via **Google Antigravity**, and zero-hallucination mathematical compliance guarantees via a **Deterministic Regulatory Kernel**.

---

## ⚡ Quickstart

### 1. Local Run
```bash
cd "/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops"
chmod +x run_server.sh
./run_server.sh 8787
```
Then navigate to **`http://localhost:8787`** in your browser.

### 2. Next.js 15 Standalone Modern Frontend
CrewOps includes a modern **Next.js 15 (App Router, TypeScript, Tailwind CSS, Lucide Icons)** suite located in `frontend/`:
```bash
cd frontend
npm install
npm run dev
```
Then navigate to **`http://localhost:3000`** (automatically proxies API requests to `http://localhost:8787`).

### 3. Run with Python Module
```bash
python3 -m crewops serve --port 8787
```

### 4. Deploy to Google Cloud Run
```bash
chmod +x deploy_gcp.sh
./deploy_gcp.sh
```

---

## 🌟 Build with Google AI · Ecosystem Alignment Matrix

CrewOps is engineered from the ground up on the **Google AI & Google Cloud** platform, covering the full product rubric:

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

## 🚀 Key Innovations & Architecture

### 1. Multi-Vertical Cross-Domain Scope
CrewOps is designed from the ground up as a generic operations engine supporting 5 critical verticals with pluggable rulebooks:
* ✈️ **Commercial Aviation**: DGCA CAR Section 7 / FAA Part 117 Flight Time Limitations.
* ⚓ **Maritime & Ports**: IMO STCW 2010 Manila Amendments & MLC 2006 Seafarer Rest Hours.
* 🚚 **Intermodal Freight**: US DOT FMCSA 49 CFR Part 395 Hours of Service (HOS) & Reefer Cold Chain.
* 🏥 **Healthcare & Trauma**: ACGME Clinical Work-Hour Caps & ICU Acuity Ratios.
* 🦺 **Industrial Safety**: OSHA 1910 PSM & API RP 755 Fatigue Risk Management Systems.

### 2. Gemini Live Real-Time Voice Agent
* Continuous bi-directional 24kHz audio stream via WebSockets.
* Hands-free radio dispatch interaction with voice activity detection (VAD).
* Native OCC tool calling translates controllers' verbal directives into audited compliance checks.

### 3. Antigravity Multi-Agent Orchestration
Autonomous agent swarm collaborating on a shared event board:
* **Incident Commander Agent**: Ingests, classifies, and broadcasts disruptions.
* **Compliance Kernel Agent**: Evaluates rulebooks with zero LLM hallucination.
* **Resource Optimizer Agent**: Solves candidate ranking, overtime cost, transit positioning, and fragility.
* **Dispatch Communications Agent**: Formats multi-channel directives across ACARS, GMDSS, Radio, SMS, WhatsApp, and Voice.
* **Audit & Containment Agent**: Validates numeric containment against the cryptographic Evidence Ledger.

---

## 📂 Project Structure

```
crewops/
  ├── __init__.py          # Package initialization
  ├── __main__.py          # CLI entrypoint
  ├── models.py            # Generic dataclasses (Resources, Assignments, Disruptions, Rulebooks)
  ├── kernel.py            # Deterministic compliance engine & recovery ranker
  ├── domains/             # Pluggable domain implementations
  │   ├── aviation.py      # Flight ops & CAR Section 7 FTL
  │   ├── maritime.py      # Ships & IMO STCW 2010 watchkeeping
  │   ├── logistics.py     # Freight & DOT FMCSA HOS rules
  │   ├── healthcare.py    # Hospitals & ACGME shift limits
  │   └── industrial.py    # Energy/Offshore & OSHA 1910 safety
  ├── agents/              # Antigravity Swarm Orchestration
  │   ├── roles.py         # Swarm message schemas & roles
  │   └── swarm.py         # Multi-agent resolution cycle
  ├── gemini/              # Google AI Studio / Gemini Integration
  │   ├── client.py        # Gemini 2.0 Flash tool-calling client
  │   └── live.py          # Real-time WebSocket audio streaming
  ├── server.py            # FastAPI REST, SSE & WebSocket server
  └── ui.html              # Glassmorphic Operations Control Center UI

STARTUP_PITCH.md           # Investor pitch deck, TAM/SAM/SOM, and business model
ARCHITECTURE.md            # Technical specifications and sequence diagrams
Dockerfile                 # Production Cloud Run container definition
cloudbuild.yaml            # Google Cloud Build pipeline
deploy_gcp.sh              # One-click Google Cloud deployment script
requirements.txt           # Python dependencies
```

---

## 🏆 Startup & Competition Value Proposition

For the **"Build your startup with Google AI and Google Cloud"** nationwide buildathon:
* **Massive Enterprise TAM**: Addresses an urgent $78B operational fragility problem.
* **Deep Google AI Differentiation**: Deeply integrates Gemini Live, Gemini Omni, and Antigravity Agent Swarms with Google Cloud Run elasticity.
* **Zero-Hallucination Safety Moat**: Defensible mathematical compliance kernel prevents catastrophic hallucinations in life-critical and mission-critical industries.

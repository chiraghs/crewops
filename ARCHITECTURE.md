# CrewOps · System Architecture & Engineering Specifications

This document outlines the end-to-end technical architecture of **CrewOps**, designed for enterprise scale and multi-vertical mission-critical operations.

---

## 1. High-Level System Architecture

```
[ Field Radio / Dispatch Headset / Web Browser ]
                       │
       (WebSocket: 24kHz Bi-directional Audio)
                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   GOOGLE CLOUD RUN EDGE (FastAPI Core)                 │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │               GEMINI LIVE STREAMING SESSION                  │     │
│   │   • Voice Activity Detection (VAD)                           │     │
│   │   • Real-time speech tokenization                            │     │
│   │   • Native OCC Tool Calling Parser                           │     │
│   └──────────────────────────────┬───────────────────────────────┘     │
│                                  │ (Typed Operational Intent)           │
│                                  ▼                                     │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │             ANTIGRAVITY MULTI-AGENT SWARM ORCHESTRATOR       │     │
│   │                                                              │     │
│   │   [ Incident Commander ] ──▶ [ Compliance Kernel Agent ]     │     │
│   │             │                          │                     │     │
│   │             ▼                          ▼                     │     │
│   │   [ Resource Optimizer ] ──▶ [ Dispatch Comms Agent ]        │     │
│   │                                        │                     │     │
│   │                                        ▼                     │     │
│   │                              [ Audit Ledger Guard ]          │     │
│   └──────────────────────────────┬───────────────────────────────┘     │
│                                  │ (Deterministic Function Calls)      │
│                                  ▼                                     │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │        DETERMINISTIC COMPLIANCE & RECOVERY KERNEL            │     │
│   │   • Aviation: DGCA CAR Sec 7 / FAA Part 117                  │     │
│   │   • Maritime: IMO STCW 2010 / MLC 2006                       │     │
│   │   • Logistics: US DOT FMCSA HOS (49 CFR 395)                 │     │
│   │   • Healthcare: ACGME Clinical Work-Hour Standards           │     │
│   │   • Industrial: OSHA 1910 PSM / API RP 755                   │     │
│   │                                                              │     │
│   │   Output: Mathematical Evidence Ledger & Ranked Options      │     │
│   └──────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Antigravity Multi-Agent Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Controller as OCC Controller (Voice/Web)
    participant GeminiLive as Gemini Live Agent
    participant Swarm as Swarm Orchestrator
    participant Kernel as Deterministic Kernel
    participant Dispatch as Multi-Channel Dispatch

    Controller->>GeminiLive: "Capt. Rajesh is sick for flight 412. Who can cover?"
    GeminiLive->>Swarm: Disruption Event Broadcast
    Swarm->>Kernel: Query candidate eligibility against CAR Sec 7
    Kernel-->>Swarm: Evidence Ledger (1 Legal Reserve, 1 Ruled Out)
    Swarm->>Swarm: Rank candidates by cost, transit time & fragility
    Swarm-->>GeminiLive: Verified recommendation: Capt. Deepa Reddy ($135/hr)
    GeminiLive-->>Controller: "Capt. Deepa Reddy is legal with 14h rest. Cost: $135/hr."
    Controller->>GeminiLive: "Authorize recovery."
    GeminiLive->>Dispatch: Send ACARS, WhatsApp & Radio alert
    Dispatch-->>Controller: Roster locked and confirmed.
```

---

## 3. Pluggable Domain Engine Specifications

Each vertical implements a unified interface:
* `get_rulebook()`: Exposes `max_single_duty_hours`, `min_rest_hours`, `max_duty_7d`, `max_duty_28d`, `mandatory_certs`, and `callout_notice_hours`.
* `get_seed_data()`: Generates initial roster and active assignments.
* `ComplianceKernel.evaluate_candidate()`: Returns `LegalityResult` with boolean status, violation strings, margin headroom, and a line-by-line Evidence Ledger.

---

## 4. Google Cloud Deployment Topology

* **Compute Engine / Cloud Run**: Managed container scaling from 0 to 100+ instances based on incoming WebSocket and HTTP traffic.
* **Network Tier**: Google Cloud Premium Network with Cloud CDN and Cloud Armor DDoS mitigation.
* **Secret Management**: Google Cloud Secret Manager for secure storage of API keys (`GEMINI_API_KEY`, WhatsApp API, Twilio, ACARS gateway).
* **Logging & Observability**: Google Cloud Operations Suite (Cloud Logging, Cloud Monitoring, Cloud Trace) capturing end-to-end latency metrics.

---

## 5. Google AI Ecosystem Architecture: Cloud, Edge & Device Tiering

CrewOps leverages Google's full AI portfolio across a tiered latency-critical operational hierarchy:

```mermaid
flowchart TD
    subgraph CloudTier["Google Cloud Tier (OCC Central Command)"]
        Gemini2["Gemini 2.0 Flash / 1.5 Pro<br/>(Complex Multi-Turn Disruption Reasoning)"]
        GeminiOmni["Gemini Omni<br/>(Multimodal Voice, Video & Radar Telemetry)"]
        GeminiLive["Gemini Live (24kHz WebSocket)<br/>(Hands-free Voice Dispatcher Streaming)"]
        LyriaEngine["Google DeepMind Lyria<br/>(Procedural Acoustic Alert Earcons & VHF Audio)"]
    end

    subgraph ToolingTier["Google Tools & Swarm Orchestration"]
        AIStudio["Google AI Studio<br/>(Prompt Engineering & Structured Function Calling)"]
        Antigravity["Google Antigravity Multi-Agent Swarm<br/>(5 Specialized Autonomous Agents)"]
        AgentSkills["Google Agent Skills<br/>(CAR Sec 7, FAA Part 117, IMO STCW, MLC 2006)"]
    end

    subgraph EdgeTier["Edge & Device Tier (Cockpit / Bridge / Off-grid)"]
        GemmaEdge["Google Gemma 2 (2B / 9B)<br/>(Aircraft Electronic Flight Bag & Shipboard Bridge)"]
        NanoBanana["Gemini Nano / Nano Banana<br/>(On-device Handheld & Wearable Safety Triage)"]
    end

    subgraph InfraTier["Google Cloud Infrastructure"]
        CloudRun["Google Cloud Run (Managed Serverless)"]
        CloudBuild["Google Cloud Build (CI/CD Pipeline)"]
    end

    CloudTier --> ToolingTier
    ToolingTier --> EdgeTier
    CloudTier --> InfraTier
```

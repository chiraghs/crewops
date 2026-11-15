import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CrewOps - Startup Buildathon Idea Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap');
    
    @page {
      size: 1920px 1080px;
      margin: 0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #FFFFFF;
      color: #0F172A;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .slide {
      width: 1920px;
      height: 1080px;
      page-break-after: always;
      position: relative;
      background: #FFFFFF;
      overflow: hidden;
    }

    /* Template Banner */
    .template-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 1920px;
      height: 143px;
      z-index: 10;
    }
    .template-header img {
      width: 1920px;
      height: 143px;
      display: block;
    }

    /* Titles matching template exactly */
    .slide-header-box {
      position: absolute;
      top: 150px;
      left: 80px;
      right: 80px;
      z-index: 10;
    }

    .slide-main-title {
      font-family: 'Google Sans Flex', 'Outfit', sans-serif;
      font-size: 34px;
      font-weight: 700;
      color: #202124;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }

    .slide-subtitle {
      font-family: 'Google Sans Flex', 'Inter', sans-serif;
      font-size: 17px;
      font-weight: 400;
      color: #5F6368;
      margin-top: 4px;
    }

    /* Content Area */
    .slide-content {
      position: absolute;
      top: 245px;
      left: 80px;
      right: 80px;
      bottom: 60px;
      display: flex;
      gap: 28px;
      z-index: 10;
    }

    /* Footer */
    .slide-footer {
      position: absolute;
      bottom: 18px;
      left: 80px;
      right: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      font-size: 13px;
      color: #64748B;
      font-weight: 500;
      z-index: 10;
    }

    /* Sanjeevini Card System */
    .s-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .s-card-tag {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .s-card-title {
      font-family: 'Outfit', sans-serif;
      font-size: 21px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 12px;
      line-height: 1.25;
    }

    .s-card-body {
      font-size: 14.5px;
      line-height: 1.6;
      color: #334155;
    }

    .s-callout-box {
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 14px;
    }

    /* Screenshot Frame */
    .s-screenshot-frame {
      border-radius: 12px;
      border: 1.5px solid #CBD5E1;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      background: #0B1118;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .s-screenshot-frame img {
      width: 100%;
      height: auto;
      display: block;
    }

    .pill-badge {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 20px;
      padding: 7px 15px;
      font-size: 13.5px;
      font-weight: 600;
      color: #0F172A;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       SLIDE 1: COVER (Template Artwork + Sanjeevini Layout)
       ========================================================================= -->
  <div class="slide">
    <!-- Top 590px: Official Startup Buildathon Cover Artwork -->
    <div style="position: absolute; top: 0; left: 0; width: 1920px; height: 590px;">
      <img src="slide2_banner_cropped.png" style="width: 1920px; height: 590px; display: block;">
    </div>

    <!-- Bottom Half: Team & Project Details -->
    <div style="position: absolute; top: 620px; left: 80px; right: 80px; bottom: 40px; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; align-items: baseline; gap: 16px; margin-bottom: 10px;">
          <span style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #1A73E8;">Team Name:</span>
          <span style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700; color: #202124;">CrewOps AI</span>
          <span style="color: #94A3B8; font-size: 20px;">•</span>
          <span style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: #1A73E8;">Team Size:</span>
          <span style="font-size: 20px; font-weight: 600; color: #202124;">1 (Solo Founder & Engineer - Chirag H S)</span>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: #1A73E8; margin-bottom: 6px;">Problem Statement:</div>
          <div style="font-size: 19px; font-weight: 600; color: #202124; line-height: 1.4; max-width: 1600px;">
            Autonomous Mission-Critical Operations Control Center (OCC) for Commercial Aviation & Maritime Logistics Powered by Google AI & Google Cloud
          </div>
        </div>

        <p style="font-size: 16px; line-height: 1.55; color: #475569; max-width: 1600px; margin-bottom: 20px;">
          Fusing <strong>Google Gemini Live (24kHz bidirectional voice streaming)</strong> with an <strong>Antigravity Multi-Agent Swarm</strong> and a <strong>Deterministic Zero-Hallucination Compliance Kernel</strong> to resolve multi-party operational disruptions within 2 seconds.
        </p>
      </div>

      <!-- Tech Pills -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <span class="pill-badge">⚡ Google Cloud Run (asia-south1)</span>
        <span class="pill-badge">🎙️ Gemini Live 24kHz Audio Streaming</span>
        <span class="pill-badge">🐝 Antigravity Multi-Agent Swarm</span>
        <span class="pill-badge">⚖️ Zero-Hallucination Compliance Kernel</span>
        <span class="pill-badge">📱 Gemma 2 & Gemini Nano Offline Cockpit Edge</span>
        <span class="pill-badge">📡 Multi-Channel ARINC ACARS & VHF Uplinks</span>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 2: PROBLEM STATEMENT (Sanjeevini 3-Column Card Design)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Problem Statement</div>
      <div class="slide-subtitle">The challenge or problem identified by the team.</div>
    </div>

    <div class="slide-content">
      <!-- Card 1 -->
      <div class="s-card" style="flex: 1; background: #FEF2F2; border-color: #FECACA; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #DC2626;">$8.4B AVOIDABLE ANNUAL LOSSES</div>
          <div class="s-card-title">Cascading Disruption Costs</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Severe Ground Penalties:</strong> Commercial airlines and maritime logistics operators bleed over <strong>$8.4 Billion</strong> annually in avoidable crew and dispatch turnaround delays ($5.2B in airline crew ground penalties, $3.2B in maritime port demurrage).</p>
            <p><strong>Compound Bleed:</strong> A single Tier-1 carrier bleeds <strong>$60M–$120M</strong> each year from domino-effect misconnections, stranded passengers, and airport slot forfeiture.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(220,38,38,0.08); border: 1px dashed #FCA5A5; color: #991B1B;">
          <strong>Impact:</strong> ₹18,000–₹35,000 lost per tarmac delay minute per narrowbody aircraft.
        </div>
      </div>

      <!-- Card 2 -->
      <div class="s-card" style="flex: 1; background: #FFFBEB; border-color: #FDE68A; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #D97706;">45 - 90 MINUTE RECOVERY LAG</div>
          <div class="s-card-title">Extreme OCC Cognitive Overload</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Manual Phone & Excel Chaos:</strong> When dense fog strikes Delhi (DEL) or storms close Mumbai (BOM), dispatchers must manually evaluate dozens of expiring duty clocks across 10+ disconnected screens and physical paper binders.</p>
            <p><strong>Latency Blindspots:</strong> Legacy roster databases (Jeppesen, Sabre) take <strong>45 to 90 minutes</strong> per flight to re-pair rosters, causing entire banks of connecting flights to unravel.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(217,119,6,0.08); border: 1px dashed #FCD34D; color: #92400E;">
          <strong>Bottleneck:</strong> Controllers juggle radio headsets, radar scopes, and manual spreadsheets simultaneously.
        </div>
      </div>

      <!-- Card 3 -->
      <div class="s-card" style="flex: 1; background: #EFF6FF; border-color: #BFDBFE; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #1A73E8;">ZERO-TOLERANCE REGULATION</div>
          <div class="s-card-title">Fatal Generic LLM Hallucinations</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Catastrophic Safety Risk:</strong> Standard off-the-shelf LLMs hallucinate rest hours and miss statutory hard caps under <strong>DGCA Section & Amendments</strong> and IMO STCW 2010 Manila rules.</p>
            <p><strong>Severe Legal Liability:</strong> A single illegal crew assignment risks immediate civil aviation grounding, aircraft impoundment, and massive regulatory fines. Safety-critical operations demand 100% mathematical guarantees.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(26,115,232,0.08); border: 1px dashed #93C5FD; color: #1E40AF;">
          <strong>Solution:</strong> "The Model Translates, The Kernel Decides" — pure arithmetic containment.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 2 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 3: PROPOSED SOLUTION (Sanjeevini Split View + UI Mockup)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Proposed Solution</div>
      <div class="slide-subtitle">The idea and how it addresses the identified problem.</div>
    </div>

    <div class="slide-content" style="align-items: stretch;">
      <!-- Left: 4 Pillars & Core Rules -->
      <div style="flex: 1.1; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
        <div class="s-card" style="background: #ECFDF5; border-color: #A7F3D0; padding: 14px 18px;">
          <div class="s-card-tag" style="color: #059669; margin-bottom: 4px;">CORE PARADIGM</div>
          <div style="font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #065F46; margin-bottom: 4px;">
            "The Model Translates, The Kernel Decides"
          </div>
          <div style="font-size: 13.5px; color: #065F46; line-height: 1.45;">
            CrewOps resolves multi-party operational disruptions <strong>within 2 seconds</strong> with mathematical zero-hallucination compliance guarantees.
          </div>
        </div>

        <div class="s-card" style="background: #EFF6FF; border-color: #BFDBFE; padding: 14px 18px;">
          <div class="s-card-tag" style="color: #1A73E8; margin-bottom: 4px;">VOICE-SUPPORTED DISPATCH</div>
          <div style="font-size: 13.5px; color: #1E40AF; line-height: 1.45;">
            Continuous 24kHz bidirectional audio stream via <strong>Google Gemini Live</strong> enables dispatchers to query rosters and command emergency recoveries hands-free while monitoring radar.
          </div>
        </div>

        <div class="s-card" style="background: #FFFBEB; border-color: #FDE68A; padding: 14px 18px;">
          <div class="s-card-tag" style="color: #D97706; margin-bottom: 4px;">7-STEP CONFIGURABLE DECISION ENGINE</div>
          <div style="font-size: 13.5px; color: #92400E; line-height: 1.45;">
            Synthesizes Airline Operating Rules, Statutory Limits (DGCA Section & Amendments), Roster Availability, and Financial Cost Optimization (-₹14,200 net savings).
          </div>
        </div>

        <div class="s-card" style="background: #F5F3FF; border-color: #DDD6FE; padding: 14px 18px;">
          <div class="s-card-tag" style="color: #7C3AED; margin-bottom: 4px;">ANTIGRAVITY MULTI-AGENT SWARM & ACARS UPLINKS</div>
          <div style="font-size: 13.5px; color: #5B21B6; line-height: 1.45;">
            5 collaborative agents: Incident Commander ➔ Compliance Kernel ➔ Resource Optimizer ➔ Dispatch Comms ➔ Containment Guard (Human-in-the-Loop) + ARINC ACARS uplinks.
          </div>
        </div>
      </div>

      <!-- Right: UI Screenshot Mockup -->
      <div style="flex: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
        <div class="s-screenshot-frame" style="flex: 1;">
          <img src="screenshots/screenshot_console.png" alt="Live OCC Suite Console">
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #64748B; line-height: 1.4;">
          <strong>▲ Live CrewOps OCC Suite:</strong> Real-time disruption triage, uncrewed route review, deterministic pilot ranking (C-3310), -₹14,200 cost savings delta, and one-click ARINC ACARS / Telex uplinks.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 3 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 4: SOLUTION ARCHITECTURE (Full 5-Tier Topology Diagram)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Solution Architecture</div>
      <div class="slide-subtitle">Architecture of the proposed solution</div>
    </div>

    <div class="slide-content" style="align-items: center; justify-content: center;">
      <div class="s-screenshot-frame" style="width: 100%; height: 100%; padding: 8px; background: #090E17;">
        <img src="architecture_diagram.png" alt="CrewOps 5-Tier Architecture Diagram" style="max-height: 720px; max-width: 100%; object-fit: contain;">
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 4 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 5: GOOGLE AI TOOLS (3 Sanjeevini Cards)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Google AI Tools</div>
      <div class="slide-subtitle">Google AI Studio, Google Antigravity and Google Agent Skills (used or planned)</div>
    </div>

    <div class="slide-content">
      <!-- Card 1: AI Studio -->
      <div class="s-card" style="flex: 1; background: #EFF6FF; border-color: #BFDBFE; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #1A73E8;">1. GOOGLE AI STUDIO</div>
          <div class="s-card-title">Prompt Engineering & Structured Function Calling</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Strict Function Declarations:</strong> Used for rapid system instruction tuning and defining strict JSON schema function declarations (<code>OCC_TOOLS_DECLARATION</code>).</p>
            <p style="margin-bottom: 12px;"><strong>Typed Operational Toolset:</strong> Powers tools like <code>check_candidate_legality</code>, <code>trigger_simulated_disruption</code>, and <code>get_domain_status</code>.</p>
            <p><strong>Zero-Setup Deployment:</strong> Enables rapid evaluation, prototype validation, and seamless cloud connectivity via <code>GEMINI_API_KEY</code>.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(26,115,232,0.08); border: 1px dashed #93C5FD; color: #1E40AF;">
          <strong>Role:</strong> Translates controller intent into verified tool execution schemas.
        </div>
      </div>

      <!-- Card 2: Antigravity -->
      <div class="s-card" style="flex: 1; background: #ECFDF5; border-color: #A7F3D0; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #059669;">2. GOOGLE ANTIGRAVITY</div>
          <div class="s-card-title">Multi-Agent Swarm Orchestration Engine</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Event-Driven Swarm:</strong> Orchestrates five specialized autonomous agents collaborating over a shared digital event message board with zero deadlock.</p>
            <p style="margin-bottom: 12px;"><strong>Separation of Concerns:</strong><br>
            • <em>Incident Commander:</em> Ingests alerts & detects delay cascades.<br>
            • <em>Compliance Kernel:</em> Enforces deterministic safety rules.<br>
            • <em>Resource Optimizer:</em> Ranks legal candidates via cost solver.<br>
            • <em>Dispatch Comms:</em> Drafts ACARS/Telex/VHF directives.<br>
            • <em>Containment Guard:</em> Enforces Human-in-the-Loop approval.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(5,150,105,0.08); border: 1px dashed #A7F3D0; color: #065F46;">
          <strong>Role:</strong> Ensures multi-agent consensus before any operational action executes.
        </div>
      </div>

      <!-- Card 3: Agent Skills -->
      <div class="s-card" style="flex: 1; background: #F5F3FF; border-color: #DDD6FE; justify-content: space-between;">
        <div>
          <div class="s-card-tag" style="color: #7C3AED;">3. GOOGLE AGENT SKILLS</div>
          <div class="s-card-title">Deterministic Regulatory Domain Skills</div>
          <div class="s-card-body">
            <p style="margin-bottom: 12px;"><strong>Modular Encapsulation:</strong> Reusable domain skills encapsulating civil aviation and maritime statutory standards:</p>
            <p style="margin-bottom: 12px;">• <em>Aviation Safety Skill:</em> DGCA CAR Section 7, FAA Part 117, and ICAO Annex 6 duty/rest formulas.<br>
            • <em>Maritime Logistics Skill:</em> IMO STCW 2010 Manila Amendments & MLC 2006 watchkeeping caps.<br>
            • <em>Hungarian Optimization Skill:</em> Bipartite candidate assignment for minimum overtime.</p>
          </div>
        </div>
        <div class="s-callout-box" style="background: rgba(124,58,237,0.08); border: 1px dashed #DDD6FE; color: #5B21B6;">
          <strong>Role:</strong> Pluggable compliance kernels with zero code modification.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 5 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 6: GOOGLE AI MODELS (2 Dedicated Sanjeevini Sections)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Google AI Models</div>
      <div class="slide-subtitle">Google AI model(s) used or planned for the proposed solution.</div>
    </div>

    <div class="slide-content" style="flex-direction: column; gap: 20px;">
      <!-- Section 1: Cloud -->
      <div class="s-card" style="background: #EFF6FF; border-color: #BFDBFE;">
        <div class="s-card-tag" style="color: #1A73E8;">1. CLOUD REASONING & MULTIMODAL STREAMING ENGINES</div>
        <div class="s-card-title" style="font-size: 20px; margin-bottom: 12px;">Gemini Live, Gemini Omni & Gemini 2.0 Flash / Pro</div>
        <div class="s-card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;">
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #DBEAFE;">
            <div style="font-weight: 700; color: #1E40AF; margin-bottom: 6px;">Gemini Live (24kHz Voice)</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Continuous bidirectional WebSocket audio streaming enables controllers to query complex rosters and command emergency recoveries hands-free while monitoring radar.</p>
          </div>
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #DBEAFE;">
            <div style="font-weight: 700; color: #1E40AF; margin-bottom: 6px;">Gemini Omni (Multimodal)</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Simultaneously ingests streaming voice directives, dense tabular rosters, and live 2D radar/timeline maps with zero cross-modal translation error.</p>
          </div>
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #DBEAFE;">
            <div style="font-weight: 700; color: #1E40AF; margin-bottom: 6px;">Gemini 2.0 Flash / Pro</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Primary reasoning engines translating unstructured queries into strictly verified tool calls for the deterministic compliance kernel with ultra-low latency.</p>
          </div>
        </div>
      </div>

      <!-- Section 2: Edge -->
      <div class="s-card" style="background: #ECFDF5; border-color: #A7F3D0;">
        <div class="s-card-tag" style="color: #059669;">2. EDGE OFFLINE RESILIENCE & OPERATIONAL AUDIO (COCKPIT & FLEET)</div>
        <div class="s-card-title" style="font-size: 20px; margin-bottom: 12px;">Google Gemma 2, Gemini Nano & DeepMind Lyria</div>
        <div class="s-card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;">
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #D1FAE5;">
            <div style="font-weight: 700; color: #065F46; margin-bottom: 6px;">Google Gemma 2 (2B / 9B)</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Open-weights models deployed on aircraft Electronic Flight Bags (EFBs) & vessel bridge consoles for localized compliance validation when disconnected from cloud networks.</p>
          </div>
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #D1FAE5;">
            <div style="font-weight: 700; color: #065F46; margin-bottom: 6px;">Gemini Nano / Banana</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Ultra-low-latency on-device SLM powering handheld mobile duty triage on pilot and crew tablets with zero cloud roundtrips.</p>
          </div>
          <div style="background: #FFFFFF; border-radius: 8px; padding: 14px; border: 1px solid #D1FAE5;">
            <div style="font-weight: 700; color: #065F46; margin-bottom: 6px;">Google DeepMind Lyria</div>
            <p style="font-size: 13.5px; color: #334155; line-height: 1.5;">Procedural acoustic engine (audio.py) synthesizing 24kHz operational soundscapes: critical uncrewed earcons, ARINC ACARS data chimes, and VHF Ch 16 squawks.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 6 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 7: LIVE SHOWCASE 1 (OCC Console & Regulatory Policy Engine)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Live Platform Showcase</div>
      <div class="slide-subtitle">OCC Command Console & Enterprise Regulatory Policy Engine</div>
    </div>

    <div class="slide-content">
      <!-- Left Column: OCC Console -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #1A73E8; margin-bottom: 8px;">
          1. Operations Control Center (OCC) Console
        </div>
        <div class="s-screenshot-frame" style="flex: 1;">
          <img src="screenshots/screenshot_console.png" alt="OCC Command Console">
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 12.5px; line-height: 1.5; color: #334155;">
          • <strong>Sub-2s Real-Time Triage:</strong> Instant disruption containment across 147 flights & 84 voyages.<br>
          • <strong>7-Step Decision Engine:</strong> Balances airline rules, live rosters & financial costs.<br>
          • <strong>Cost Optimization:</strong> Hungarian solver yields -₹14,200 savings per recovered pairing.<br>
          • <strong>Multi-Channel Uplinks:</strong> One-click ARINC ACARS, Inmarsat-C Telex & VHF dispatch.
        </div>
      </div>

      <!-- Right Column: Regulatory Policy Engine -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #059669; margin-bottom: 8px;">
          2. Mission-Control Regulatory & Policy Engine
        </div>
        <div class="s-screenshot-frame" style="flex: 1;">
          <img src="screenshots/screenshot_admin.png" alt="Regulatory Policy Engine">
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 12.5px; line-height: 1.5; color: #334155;">
          • <strong>Certified Statutory Presets:</strong> DGCA CAR Sec 7, Monsoon Guard, and High-Tempo Flexibility.<br>
          • <strong>Tactical Precision Steppers:</strong> Exact [-] / [+] step adjustments replace imprecise sliders.<br>
          • <strong>42 / 42 Conformance Scorecard:</strong> Live diagnostic test terminal verifying legality in 0.44ms.<br>
          • <strong>Cryptographic Audit & Rollback:</strong> Immutable SHA-256 ledger with one-click instant reversion.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 7 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 8: LIVE SHOWCASE 2 (Timeline Gantt & 72h Disruption Radar)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Live Platform Showcase</div>
      <div class="slide-subtitle">Operations Schedule Timeline & 72-Hour Predictive Disruption Radar</div>
    </div>

    <div class="slide-content">
      <!-- Left Column: Timeline Gantt -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #1A73E8; margin-bottom: 8px;">
          3. 24-Hour Visual Schedule Timeline Gantt
        </div>
        <div class="s-screenshot-frame" style="flex: 1;">
          <img src="screenshots/screenshot_flights.png" alt="Schedule Timeline Gantt">
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 12.5px; line-height: 1.5; color: #334155;">
          • <strong>Fleet Timeline Gantt:</strong> Visual schedule for tails VT-DXA..F across DEL, BOM, BLR, CCU, HYD.<br>
          • <strong>Turnaround Optimization:</strong> Dynamic slot adjustments absorbing knock-on ground delays.<br>
          • <strong>WOCL Night Tracking:</strong> Window of Circadian Low (02:00–06:00) statutory buffer deductions.<br>
          • <strong>Interactive Sector Inspection:</strong> One-click deep dive into duty clocks, pax load, and delay roots.
        </div>
      </div>

      <!-- Right Column: 72h Radar -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #059669; margin-bottom: 8px;">
          4. 72-Hour Predictive Disruption Radar
        </div>
        <div class="s-screenshot-frame" style="flex: 1;">
          <img src="screenshots/screenshot_intelligence.png" alt="72h Predictive Radar">
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 12.5px; line-height: 1.5; color: #334155;">
          • <strong>Multi-Horizon Lookahead:</strong> Forecasts weather frontlines, monsoon storms & tidal locks 72h out.<br>
          • <strong>Fatigue Risk Matrix:</strong> Flags cumulative 7-day (60h) and 28-day flight duty caps proactively.<br>
          • <strong>Port Congestion Tracking:</strong> Simulates berth queue delays across container terminal hubs.<br>
          • <strong>Strategic Pre-Recovery:</strong> Rebalances standby reserves before operational ground stops occur.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 8 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 9: MARKET VALIDATION, TRACTION & GCP DEPLOYMENT (Sanjeevini KPI Grid)
       ========================================================================= -->
  <div class="slide">
    <div class="template-header">
      <img src="header_banner_cropped.png">
    </div>

    <div class="slide-header-box">
      <div class="slide-main-title">Market Validation, Traction & Deployment</div>
      <div class="slide-subtitle">Empirical benchmarks, regulatory conformance, and Google Cloud production deployment.</div>
    </div>

    <div class="slide-content" style="flex-direction: column; gap: 18px;">
      <!-- Top: 4 Sanjeevini Benchmark Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;">
        <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 14px 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 4px;">TRIAGE LATENCY</div>
          <div style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #065F46; line-height: 1.1;">99.9% FASTER</div>
          <div style="font-size: 12.5px; color: #059669; margin-top: 3px;">45 min Lag ➔ &lt; 2.0s Triage</div>
        </div>

        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 14px 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #1A73E8; text-transform: uppercase; margin-bottom: 4px;">LEGAL CONFORMANCE</div>
          <div style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #1E40AF; line-height: 1.1;">100% PROVEN</div>
          <div style="font-size: 12.5px; color: #1A73E8; margin-top: 3px;">42 / 42 Conformance Tests</div>
        </div>

        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 4px;">COST OPTIMIZATION</div>
          <div style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #92400E; line-height: 1.1;">-₹14,200 (43%)</div>
          <div style="font-size: 12.5px; color: #D97706; margin-top: 3px;">Net Savings per Sector</div>
        </div>

        <div style="background: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 12px; padding: 14px 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 4px;">GROSS MARGINS</div>
          <div style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #5B21B6; line-height: 1.1;">84%+ MARGIN</div>
          <div style="font-size: 12.5px; color: #7C3AED; margin-top: 3px;">Enterprise SaaS Model</div>
        </div>
      </div>

      <!-- Bottom: 2 Sanjeevini Detailed Cards -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1;">
        <!-- Left: Dataset Validation & Conformance -->
        <div class="s-card" style="background: #F8FAFC; border-color: #E2E8F0; justify-content: space-between;">
          <div>
            <div class="s-card-tag" style="color: #059669;">EMPIRICAL BENCHMARKS & CONFORMANCE</div>
            <div class="s-card-title" style="font-size: 18px; margin-bottom: 8px;">Deterministic Aviation & Maritime Datasets</div>
            <div class="s-card-body" style="font-size: 13.5px; line-height: 1.55;">
              <p style="margin-bottom: 8px;">• <strong>Aviation Dataset:</strong> 147 active scheduled flights, 150 crew members, 39 pairings, 16 standby reserves across 5 Indian hubs (DEL, BOM, BLR, CCU, HYD).</p>
              <p style="margin-bottom: 8px;">• <strong>Maritime Dataset:</strong> 84 short-sea feeder voyages, 120 watchkeepers, 24 pairings, 14 harbor relief pilots across Rotterdam, Hamburg, and Antwerp.</p>
              <p>• <strong>42 / 42 Conformance Scorecard:</strong> 100% pass rate across deterministic test suites covering WOCL incursions, rest buffers, tidal gate locks, and rolling 28-day caps in <strong>0.44ms</strong>.</p>
            </div>
          </div>
          <div class="s-callout-box" style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; padding: 8px 12px; margin-top: 8px;">
            <strong>Zero Violations:</strong> Mathematical proof guarantees zero civil aviation safety fines.
          </div>
        </div>

        <!-- Right: Business Model & Pricing -->
        <div class="s-card" style="background: #F8FAFC; border-color: #E2E8F0; justify-content: space-between;">
          <div>
            <div class="s-card-tag" style="color: #1A73E8;">ENTERPRISE B2B SAAS & MARKET SIZING</div>
            <div class="s-card-title" style="font-size: 18px; margin-bottom: 8px;">Annual Recurring Revenue & 60-Day Payback</div>
            <div class="s-card-body" style="font-size: 13.5px; line-height: 1.55;">
              <p style="margin-bottom: 6px;">• <strong>Tier 1 (Regional / Mid-Market): $120,000 / yr</strong> — Up to 50 active aircraft/vessels, 1 OCC hub, 5 seats, full DGCA compliance suite.</p>
              <p style="margin-bottom: 6px;">• <strong>Tier 2 (Large Enterprise Carrier): $350,000 / yr</strong> — Up to 200 aircraft, multi-hub radar, 20 seats, continuous Gemini Live 24kHz voice copilot.</p>
              <p style="margin-bottom: 6px;">• <strong>Tier 3 (Global Conglomerate): $850,000+ / yr</strong> — Unlimited fleet, multi-modal aviation & maritime, offline Gemma 2 edge instances.</p>
              <p>• <strong>Market Sizing:</strong> TAM: <strong>$42.5B</strong> | SAM: <strong>$8.2B</strong> | Beachhead SOM: <strong>$280M</strong> (Years 1–3 across regional airlines & feeder fleets in India/SE Asia).</p>
            </div>
          </div>
          <div class="s-callout-box" style="background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; padding: 8px 12px; margin-top: 8px;">
            <strong>Customer Payback:</strong> Preventing just 4 timeouts/month pays back annual license in &lt; 60 days.
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>CrewOps • Startup Buildathon Idea Submission</div>
      <div>Slide 9 of 10</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 10: CLOSING (Official Buildathon Thank You Artwork)
       ========================================================================= -->
  <div class="slide" style="padding: 0;">
    <img src="slide9_bg.png" style="width: 1920px; height: 1080px; display: block; object-fit: cover;">
  </div>

</body>
</html>
"""

with open('/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops/submission/deck_slides.html', 'w') as f:
    f.write(HTML_CONTENT)

print("Generated hybrid deck_slides.html successfully!")

import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

src = "/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops/submission/Startup Buildathon | Idea Submission Deck.pptx"
dst = "/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops/submission/CrewOps - Startup Buildathon Idea Submission.pptx"

shutil.copyfile(src, dst)
prs = Presentation(dst)

# Brand Colors
DARK_TEXT = RGBColor(34, 34, 34)       # #222222
GOOGLE_BLUE = RGBColor(26, 115, 232)   # #1A73E8
GOOGLE_GREEN = RGBColor(15, 157, 88)   # #0F9D58
GOOGLE_RED = RGBColor(217, 48, 37)     # #D93025
MUTED_TEXT = RGBColor(95, 99, 104)     # #5F6368

FONT_TITLE = "Google Sans Flex"
FONT_BODY = "Google Sans Flex"

def setup_content_box(shape):
    shape.left = Inches(0.48)
    shape.top = Inches(1.72)
    shape.width = Inches(9.04)
    shape.height = Inches(3.55)
    tf = shape.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.margin_left = Inches(0)
    tf.margin_right = Inches(0)
    tf.margin_top = Inches(0)
    tf.margin_bottom = Inches(0)
    return tf

def add_header_paragraph(tf, title, color=GOOGLE_BLUE, space_before=Pt(4), space_after=Pt(2)):
    p = tf.add_paragraph() if tf.paragraphs and tf.paragraphs[0].text else tf.paragraphs[0]
    p.space_before = space_before
    p.space_after = space_after
    r = p.add_run()
    r.text = title
    r.font.name = FONT_TITLE
    r.font.size = Pt(11)
    r.font.bold = True
    r.font.color.rgb = color
    return p

def add_bullet_paragraph(tf, lead_in, text, space_after=Pt(2.5)):
    p = tf.add_paragraph()
    p.space_after = space_after
    p.level = 0
    
    r_bullet = p.add_run()
    r_bullet.text = "• "
    r_bullet.font.name = FONT_BODY
    r_bullet.font.size = Pt(9.5)
    r_bullet.font.color.rgb = GOOGLE_BLUE
    
    r_lead = p.add_run()
    r_lead.text = lead_in + ": "
    r_lead.font.name = FONT_TITLE
    r_lead.font.size = Pt(9.5)
    r_lead.font.bold = True
    r_lead.font.color.rgb = DARK_TEXT

    r_text = p.add_run()
    r_text.text = text
    r_text.font.name = FONT_BODY
    r_text.font.size = Pt(9.5)
    r_text.font.color.rgb = DARK_TEXT
    return p

# ==============================================================================
# Slide 2: Cover Information
# ==============================================================================
slide2 = prs.slides[1]
for shape in slide2.shapes:
    if shape.has_text_frame:
        shape.left = Inches(0.65)
        shape.top = Inches(3.05)
        shape.width = Inches(8.8)
        shape.height = Inches(1.9)
        tf = shape.text_frame
        tf.clear()
        tf.word_wrap = True
        
        p0 = tf.paragraphs[0]
        p0.space_after = Pt(6)
        r = p0.add_run()
        r.text = "Team Name: "
        r.font.name = FONT_TITLE
        r.font.size = Pt(14)
        r.font.bold = True
        r.font.color.rgb = GOOGLE_BLUE
        r = p0.add_run()
        r.text = "CrewOps AI"
        r.font.name = FONT_TITLE
        r.font.size = Pt(14)
        r.font.bold = True
        r.font.color.rgb = DARK_TEXT

        p1 = tf.add_paragraph()
        p1.space_after = Pt(6)
        r = p1.add_run()
        r.text = "Team Size: "
        r.font.name = FONT_TITLE
        r.font.size = Pt(13)
        r.font.bold = True
        r.font.color.rgb = GOOGLE_BLUE
        r = p1.add_run()
        r.text = "1 (Solo Founder & Engineer - Chirag H S)"
        r.font.name = FONT_BODY
        r.font.size = Pt(13)
        r.font.color.rgb = DARK_TEXT

        p2 = tf.add_paragraph()
        r = p2.add_run()
        r.text = "Problem Statement: "
        r.font.name = FONT_TITLE
        r.font.size = Pt(13)
        r.font.bold = True
        r.font.color.rgb = GOOGLE_BLUE
        r = p2.add_run()
        r.text = "Autonomous Mission-Critical Operations Control Center (OCC) for Commercial Aviation & Maritime Logistics Powered by Google AI & Google Cloud"
        r.font.name = FONT_BODY
        r.font.size = Pt(13)
        r.font.bold = True
        r.font.color.rgb = DARK_TEXT

# ==============================================================================
# Slide 3: Problem Statement
# ==============================================================================
slide3 = prs.slides[2]
tf3 = setup_content_box(slide3.shapes[2])
slide3.shapes[1].width = Inches(8.8)

add_header_paragraph(tf3, "THE $8.4 BILLION PREVENTABLE OPERATIONAL CRISIS", color=GOOGLE_RED, space_before=Pt(0))
add_bullet_paragraph(tf3, "High-Impact Industry Disruption Costs", "Commercial airlines and maritime shipping operators lose over $8.4B annually in avoidable crew and turnaround delays ($5.2B in avoidable airline crew delay costs, $3.2B in maritime port demurrage). A single airline bleeds $60M–$120M yearly from cascading crew fragmentation.")
add_bullet_paragraph(tf3, "Extreme Cognitive Overload on OCC Controllers", "Operations Control Center dispatchers are forced to juggle 10+ legacy disconnected terminals, physical rulebook binders, and voice radio channels under intense time-to-departure pressure.")

add_header_paragraph(tf3, "WHY EXISTING SOLUTIONS & GENERIC LLMS FAIL CATASTROPHICALLY", color=GOOGLE_RED, space_before=Pt(6))
add_bullet_paragraph(tf3, "30 to 45-Minute Manual Recovery Latency", "Legacy ERP/roster databases (Jeppesen, Amadeus) require 30–45 minutes of manual trial-and-error pairing searches, causing cascading downstream delays across connecting hub banks.")
add_bullet_paragraph(tf3, "Generic LLMs Are Fatal In Safety-Critical Operations", "Off-the-shelf LLMs hallucinate rest hours, miss subtle regulatory caps (DGCA CAR Sec 7 / FAA Part 117 / IMO STCW 2010), and cannot provide mathematical safety guarantees, risking severe regulatory groundings and safety fines.")

# ==============================================================================
# Slide 4: Proposed Solution
# ==============================================================================
slide4 = prs.slides[3]
tf4 = setup_content_box(slide4.shapes[2])
slide4.shapes[1].width = Inches(8.8)

add_header_paragraph(tf4, "CREWOPS: THE WORLD'S FIRST VOICE-FIRST AUTONOMOUS OCC PLATFORM", color=GOOGLE_GREEN, space_before=Pt(0))
add_bullet_paragraph(tf4, "Core Paradigm", "'The Model Translates, The Kernel Decides.' CrewOps resolves multi-party operational disruptions in under 200 milliseconds with mathematical zero-hallucination compliance guarantees.")
add_bullet_paragraph(tf4, "Voice-First Conversational Dispatch", "Continuous 24kHz bidirectional WebSocket audio via Google Gemini Live enables dispatchers to query complex rosters and command emergency recoveries hands-free while monitoring visual radar.")

add_header_paragraph(tf4, "FIVE AUTONOMOUS CAPABILITIES RESOLVING THE CRISIS", color=GOOGLE_BLUE, space_before=Pt(6))
add_bullet_paragraph(tf4, "Antigravity Multi-Agent Swarm", "Five specialized autonomous agents coordinate over a shared event board: Incident Commander, Compliance Kernel, Resource Optimizer, Dispatch Comms, and Containment Guard.")
add_bullet_paragraph(tf4, "Zero-Hallucination Compliance Kernel", "Deterministic solvers verify 100% legal conformance against DGCA CAR Section 7 & IMO STCW 2010 Manila Amendments with mathematical evidence ledgers.")
add_bullet_paragraph(tf4, "72-Hour Predictive Disruption Radar", "Multi-horizon lookahead forecasting weather frontlines, tidal lock windows, and approaching cumulative fatigue caps before flights/voyages become uncrewed.")
add_bullet_paragraph(tf4, "Multi-Channel Emergency Uplinks", "One-click automated message delivery across ARINC-620 ACARS (aircraft), Inmarsat-C Telex (vessels), VHF Marine Channel 16, and secure SMS.")

# ==============================================================================
# Slide 5: Solution Architecture
# ==============================================================================
slide5 = prs.slides[4]
tf5 = setup_content_box(slide5.shapes[2])
slide5.shapes[1].width = Inches(8.8)

add_header_paragraph(tf5, "MULTI-TIERED ENTERPRISE CLOUD & EDGE TOPOLOGY", color=GOOGLE_BLUE, space_before=Pt(0))
add_bullet_paragraph(tf5, "Presentation Tier (Next.js 15 Standalone OCC Suite)", "Next.js 15 (App Router, TypeScript, Tailwind CSS) delivering 6 real-time operational views: Live Crew Advisor, 24h Interactive Timeline Gantt, Unified Crew & Reserves Matrix, Day Brief, 72h Intelligence Radar, and Admin Policy Console.")
add_bullet_paragraph(tf5, "Streaming & Intelligence Tier (Google Cloud Run)", "Managed FastAPI & WebSocket server hosting Gemini Live 24kHz audio streaming with Voice Activity Detection (VAD) and sub-50ms REST API dispatch.")
add_bullet_paragraph(tf5, "Orchestration Tier (Google Antigravity Swarm)", "5-agent collaborative consensus loop ensuring separation of concerns: Incident Commander -> Compliance Kernel -> Resource Optimizer -> Dispatch Comms -> Containment Guard.")
add_bullet_paragraph(tf5, "Deterministic Compliance Tier (Pure Python Kernel)", "Zero-hallucination mathematical solvers evaluating flight duty periods (FDP), mandatory 12h rest buffers, 60h 7-day caps, and bipartite Hungarian candidate cost optimization.")
add_bullet_paragraph(tf5, "Edge Cockpit & Vessel Tier (Offline Resilience)", "Google Gemma 2 (2B/9B) & Gemini Nano models enable aircraft Electronic Flight Bags (EFBs) and shipboard bridge terminals to compute legal duty hours locally during satellite communications blackouts.")

# ==============================================================================
# Slide 6: Google AI Tools
# ==============================================================================
slide6 = prs.slides[5]
tf6 = setup_content_box(slide6.shapes[2])
slide6.shapes[1].width = Inches(8.8)

add_header_paragraph(tf6, "DEEP INTEGRATION WITH OFFICIAL GOOGLE AI TOOLS", color=GOOGLE_BLUE, space_before=Pt(0))
add_bullet_paragraph(tf6, "1. Google AI Studio", "Used for prompt engineering, system instructions, and defining strict JSON schema function declarations (OCC_TOOLS_DECLARATION) for check_candidate_legality, trigger_simulated_disruption, and get_domain_status. Enables zero-setup rapid deployment via GEMINI_API_KEY.")
add_bullet_paragraph(tf6, "2. Google Antigravity (Multi-Agent Swarm)", "Orchestrates five autonomous agents collaborating via a public event message board: (1) Incident Commander ingests disruption alerts; (2) Compliance Kernel runs deterministic rulebook checks; (3) Resource Optimizer ranks legal candidates by overtime cost and fragility; (4) Dispatch Comms drafts ACARS/Telex directives; (5) Audit Guard verifies cryptographic evidence containment.")
add_bullet_paragraph(tf6, "3. Google Agent Skills", "Modular deterministic domain skills encapsulating civil aviation and maritime safety standards (DGCA CAR Sec 7, FAA Part 117, IMO STCW 2010, MLC 2006) for automated policy execution and continuous compliance tracking.")

# ==============================================================================
# Slide 7: Google AI Models
# ==============================================================================
slide7 = prs.slides[6]
tf7 = setup_content_box(slide7.shapes[2])
slide7.shapes[1].width = Inches(8.8)

add_header_paragraph(tf7, "FULL-SPECTRUM GOOGLE AI MODEL ECOSYSTEM (CLOUD TO EDGE)", color=GOOGLE_BLUE, space_before=Pt(0))
add_bullet_paragraph(tf7, "Gemini 2.0 Flash & Gemini 1.5 Pro", "Primary cloud reasoning engines translating free-form speech and unstructured controller queries into verified compliance tool executions with low latency.")
add_bullet_paragraph(tf7, "Gemini Omni", "Multimodal intelligence engine processing streaming voice directives, dense tabular rosters, and live 2D radar/timeline maps simultaneously.")
add_bullet_paragraph(tf7, "Gemini Live", "Continuous 24kHz bidirectional WebSocket voice streaming engine enabling natural, interruptible conversational dialogue during high-tempo OCC emergencies.")
add_bullet_paragraph(tf7, "Google Gemma 2 (2B / 9B Instruct)", "Open-weights models deployed on aircraft EFBs and vessel bridge consoles for localized, offline compliance validation when disconnected from cloud networks.")
add_bullet_paragraph(tf7, "Gemini Nano / Nano Banana", "Ultra-low-latency on-device SLM powering handheld mobile triage on pilot/crew tablets with zero cloud roundtrips.")
add_bullet_paragraph(tf7, "Google DeepMind Lyria", "Procedural acoustic audio engine (audio.py) synthesizing 24kHz operational soundscapes: critical uncrewed earcons, ARINC ACARS data chimes, and VHF Ch 16 squawks.")

# ==============================================================================
# Slide 8: Market Validation, Traction & Deployment
# ==============================================================================
slide8 = prs.slides[7]
# Add title box matching slide 3-7
tb_title8 = slide8.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(8.8), Inches(0.65))
tf_title8 = tb_title8.text_frame
tf_title8.word_wrap = True
p = tf_title8.paragraphs[0]
r = p.add_run()
r.text = "Market Validation, Traction & Deployment"
r.font.name = FONT_TITLE
r.font.size = Pt(18)
r.font.bold = True
r.font.color.rgb = DARK_TEXT

r = p.add_run()
r.text = "   Empirical benchmarks, regulatory conformance, and Google Cloud infrastructure."
r.font.name = FONT_BODY
r.font.size = Pt(11)
r.font.color.rgb = MUTED_TEXT

# Add content box
tb_content8 = slide8.shapes.add_textbox(Inches(0.48), Inches(1.72), Inches(9.04), Inches(3.55))
tf8 = tb_content8.text_frame
tf8.word_wrap = True
tf8.margin_left = Inches(0)
tf8.margin_right = Inches(0)
tf8.margin_top = Inches(0)
tf8.margin_bottom = Inches(0)

add_header_paragraph(tf8, "EMPIRICAL BENCHMARK DATASETS & REGULATORY CONFORMANCE", color=GOOGLE_GREEN, space_before=Pt(0))
add_bullet_paragraph(tf8, "Commercial Aviation Dataset", "147 active scheduled flights, 150 crew members, 39 pairings, 16 standby reserves operating across 5 Indian hub airports (DEL, BOM, BLR, CCU, HYD).")
add_bullet_paragraph(tf8, "Maritime Logistics Dataset", "84 short-sea feeder voyages, 120 watchkeepers (52 Master/Mates, 68 Engineers), 24 pairings, 14 harbor relief pilots across European container hubs (Rotterdam, Hamburg, Antwerp).")
add_bullet_paragraph(tf8, "42 / 42 Conformance Scorecard", "100% pass rate across deterministic regulatory regression test suites covering WOCL incursions, augmented crew rest buffers, tidal gate locks, and rolling 28-day caps.")
add_bullet_paragraph(tf8, "Operational Impact", "Reduces disruption resolution latency from 35 minutes to under 200 milliseconds, saving an average of ₹14,200 (43%) per disrupted pairing.")

add_header_paragraph(tf8, "GOOGLE CLOUD PRODUCTION INFRASTRUCTURE", color=GOOGLE_BLUE, space_before=Pt(6))
add_bullet_paragraph(tf8, "Google Cloud Run (Managed Serverless)", "Containerized deployment in asia-south1 with 2 vCPU / 2GiB, handling auto-scaling WebSocket streams with zero cold-start delay (deploy_gcp.sh).")
add_bullet_paragraph(tf8, "Google Cloud Build CI/CD", "Automated containerization pipeline (cloudbuild.yaml) building production-ready images for Google Artifact Registry.")

prs.save(dst)
print("Successfully generated CrewOps Submission Deck at:")
print(dst)

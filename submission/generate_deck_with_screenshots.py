import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

# Paths
BASE_DIR = "/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops/submission"
SRC_PPTX = os.path.join(BASE_DIR, "Startup Buildathon | Idea Submission Deck.pptx")
DST_PPTX = os.path.join(BASE_DIR, "CrewOps - Startup Buildathon Idea Submission.pptx")
SCREENSHOT_DIR = os.path.join(BASE_DIR, "screenshots")
HEADER_BANNER = os.path.join(BASE_DIR, "header_banner.png")
SLIDE_BG_CLOSING = os.path.join(BASE_DIR, "slide9_bg.png")

shutil.copyfile(SRC_PPTX, DST_PPTX)
prs = Presentation(DST_PPTX)

# Google Brand Colors
DARK_TEXT = RGBColor(32, 33, 36)       # #202124
GOOGLE_BLUE = RGBColor(26, 115, 232)   # #1A73E8
GOOGLE_GREEN = RGBColor(15, 157, 88)   # #0F9D58
GOOGLE_RED = RGBColor(217, 48, 37)     # #D93025
MUTED_TEXT = RGBColor(95, 99, 104)     # #5F6368
BORDER_COLOR = RGBColor(218, 220, 224) # #DADCE0

FONT_TITLE = "Google Sans Flex"
FONT_BODY = "Google Sans Flex"

def add_header_banner(slide):
    pic = slide.shapes.add_picture(HEADER_BANNER, Inches(0), Inches(0), Inches(10.0), Inches(0.743))
    return pic

def setup_title(slide, title_text, subtitle_text):
    tb = slide.shapes.add_textbox(Inches(0.45), Inches(0.95), Inches(9.1), Inches(0.65))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    r = p.add_run()
    r.text = title_text
    r.font.name = FONT_TITLE
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = DARK_TEXT

    r2 = p.add_run()
    r2.text = "   " + subtitle_text
    r2.font.name = FONT_BODY
    r2.font.size = Pt(10.5)
    r2.font.color.rgb = MUTED_TEXT
    return tb

def add_header_paragraph(tf, title, color=GOOGLE_BLUE, space_before=Pt(4), space_after=Pt(2), font_size=Pt(10.5)):
    p = tf.add_paragraph() if tf.paragraphs and tf.paragraphs[0].text else tf.paragraphs[0]
    p.space_before = space_before
    p.space_after = space_after
    r = p.add_run()
    r.text = title
    r.font.name = FONT_TITLE
    r.font.size = font_size
    r.font.bold = True
    r.font.color.rgb = color
    return p

def add_bullet_paragraph(tf, lead_in, text, space_after=Pt(2.5), font_size=Pt(8.8)):
    p = tf.add_paragraph()
    p.space_after = space_after
    p.level = 0
    
    r_bullet = p.add_run()
    r_bullet.text = "• "
    r_bullet.font.name = FONT_BODY
    r_bullet.font.size = font_size
    r_bullet.font.color.rgb = GOOGLE_BLUE
    
    r_lead = p.add_run()
    r_lead.text = lead_in + ": "
    r_lead.font.name = FONT_TITLE
    r_lead.font.size = font_size
    r_lead.font.bold = True
    r_lead.font.color.rgb = DARK_TEXT

    r_text = p.add_run()
    r_text.text = text
    r_text.font.name = FONT_BODY
    r_text.font.size = font_size
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
slide3.shapes[1].width = Inches(8.8)
tb3 = slide3.shapes[2]
tb3.left = Inches(0.48)
tb3.top = Inches(1.68)
tb3.width = Inches(9.04)
tb3.height = Inches(3.6)
tf3 = tb3.text_frame
tf3.clear()
tf3.word_wrap = True
tf3.margin_left = tf3.margin_right = tf3.margin_top = tf3.margin_bottom = 0

add_header_paragraph(tf3, "THE $8.4 BILLION PREVENTABLE OPERATIONAL CRISIS", color=GOOGLE_RED, space_before=Pt(0), font_size=Pt(11))
add_bullet_paragraph(tf3, "High-Impact Industry Disruption Costs", "Commercial airlines and maritime shipping operators lose over $8.4B annually in avoidable crew and turnaround delays ($5.2B in avoidable airline crew delay costs, $3.2B in maritime port demurrage). A single airline bleeds $60M–$120M yearly from cascading crew fragmentation.", font_size=Pt(9.2))
add_bullet_paragraph(tf3, "Extreme Cognitive Overload on OCC Controllers", "Operations Control Center dispatchers are forced to juggle 10+ legacy disconnected terminals, physical rulebook binders, and voice radio channels under intense time-to-departure pressure.", font_size=Pt(9.2))

add_header_paragraph(tf3, "WHY EXISTING SOLUTIONS & GENERIC LLMS FAIL CATASTROPHICALLY", color=GOOGLE_RED, space_before=Pt(6), font_size=Pt(11))
add_bullet_paragraph(tf3, "30 to 45-Minute Manual Recovery Latency", "Legacy ERP/roster databases (Jeppesen, Amadeus) require 30–45 minutes of manual trial-and-error pairing searches, causing cascading downstream delays across connecting hub banks.", font_size=Pt(9.2))
add_bullet_paragraph(tf3, "Generic LLMs Are Fatal In Safety-Critical Operations", "Off-the-shelf LLMs hallucinate rest hours, miss subtle regulatory caps (DGCA CAR Sec 7 / FAA Part 117 / IMO STCW 2010), and cannot provide mathematical safety guarantees, risking severe regulatory groundings and safety fines.", font_size=Pt(9.2))

# ==============================================================================
# Slide 4: Proposed Solution (2-Column with Live Console Screenshot)
# ==============================================================================
slide4 = prs.slides[3]
slide4.shapes[1].width = Inches(8.8)
tb4 = slide4.shapes[2]
tb4.left = Inches(0.48)
tb4.top = Inches(1.65)
tb4.width = Inches(4.9)
tb4.height = Inches(3.7)
tf4 = tb4.text_frame
tf4.clear()
tf4.word_wrap = True
tf4.margin_left = tf4.margin_right = tf4.margin_top = tf4.margin_bottom = 0

add_header_paragraph(tf4, "CREWOPS: AUTONOMOUS OCC PLATFORM", color=GOOGLE_GREEN, space_before=Pt(0), font_size=Pt(10.5))
add_bullet_paragraph(tf4, "Core Paradigm", "'The Model Translates, The Kernel Decides.' CrewOps resolves multi-party operational disruptions within 2 seconds with mathematical zero-hallucination compliance guarantees.", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "Voice-Supported Conversational Dispatch", "Continuous 24kHz bidirectional WebSocket audio via Google Gemini Live enables dispatchers to query complex rosters and command emergency recoveries hands-free while monitoring radar.", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "7-Step Configurable Decision Engine", "Delivers ranked recovery suggestions synthesizing Airline Operating Rules, Statutory Limits, Roster Availability, and Financial Cost Optimization (-₹14,200 savings).", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "Antigravity Multi-Agent Swarm", "Five specialized autonomous agents coordinate over a shared event board: Incident Commander, Compliance Kernel, Resource Optimizer, Dispatch Comms, and Containment Guard.", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "Zero-Hallucination Compliance Kernel", "Deterministic solvers verify 100% legal conformance against DGCA Section & Amendments with mathematical evidence ledgers.", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "72-Hour Predictive Disruption Radar", "Multi-horizon lookahead forecasting weather frontlines, tidal lock windows, and approaching cumulative fatigue caps before flights/voyages become uncrewed.", font_size=Pt(8.1), space_after=Pt(1.8))
add_bullet_paragraph(tf4, "Multi-Channel Emergency Uplinks", "One-click automated message delivery across ARINC-620 ACARS (aircraft), Inmarsat-C Telex (vessels), VHF Marine Channel 16, and secure SMS.", font_size=Pt(8.1), space_after=Pt(1.8))

# Add Screenshot of Console on Right
pic4 = slide4.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_console.png"),
    Inches(5.55), Inches(1.68), Inches(3.98), Inches(2.49)
)
pic4.line.color.rgb = BORDER_COLOR
pic4.line.width = Pt(1)

# Caption under pic4
tb_cap4 = slide4.shapes.add_textbox(Inches(5.55), Inches(4.25), Inches(3.98), Inches(1.0))
tf_cap4 = tb_cap4.text_frame
tf_cap4.word_wrap = True
tf_cap4.margin_left = tf_cap4.margin_right = tf_cap4.margin_top = tf_cap4.margin_bottom = 0
p = tf_cap4.paragraphs[0]
r = p.add_run()
r.text = "▲ Live CrewOps OCC Suite: "
r.font.name = FONT_TITLE
r.font.size = Pt(8.5)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE
r = p.add_run()
r.text = "Real-time disruption triage, uncrewed route review, deterministic pilot ranking (C-3310), -₹14,200 cost savings delta, and one-click ARINC ACARS / Telex uplinks."
r.font.name = FONT_BODY
r.font.size = Pt(8.2)
r.font.color.rgb = DARK_TEXT

# ==============================================================================
# Slide 5: Solution Architecture (2-Column with Admin Engine Screenshot)
# ==============================================================================
slide5 = prs.slides[4]
slide5.shapes[1].width = Inches(8.8)
tb5 = slide5.shapes[2]
tb5.left = Inches(0.48)
tb5.top = Inches(1.65)
tb5.width = Inches(4.9)
tb5.height = Inches(3.7)
tf5 = tb5.text_frame
tf5.clear()
tf5.word_wrap = True
tf5.margin_left = tf5.margin_right = tf5.margin_top = tf5.margin_bottom = 0

add_header_paragraph(tf5, "MULTI-TIERED ENTERPRISE TOPOLOGY", color=GOOGLE_BLUE, space_before=Pt(0), font_size=Pt(10.5))
add_bullet_paragraph(tf5, "Presentation Tier (Next.js 15 Standalone OCC)", "Next.js 15 (App Router, TypeScript, Tailwind CSS) delivering 6 real-time operational views: Live Crew Advisor, 24h Interactive Timeline Gantt, Unified Roster, 72h Intelligence Radar, and Admin Console.", font_size=Pt(8.5))
add_bullet_paragraph(tf5, "Streaming & Intelligence Tier (Google Cloud Run)", "Managed FastAPI & WebSocket server hosting Gemini Live 24kHz audio streaming with Voice Activity Detection (VAD) and sub-50ms REST API dispatch.", font_size=Pt(8.5))
add_bullet_paragraph(tf5, "Orchestration Tier (Google Antigravity Swarm)", "5-agent collaborative consensus loop ensuring separation of concerns: Incident Commander -> Compliance Kernel -> Resource Optimizer -> Dispatch Comms -> Containment Guard.", font_size=Pt(8.5))
add_bullet_paragraph(tf5, "Deterministic Compliance Tier (Pure Python Kernel)", "7-step configurable engine evaluating airline business rules, FDP limits, mandatory rest buffers, rolling caps, and financial overtime optimization.", font_size=Pt(8.5))
add_bullet_paragraph(tf5, "Edge Cockpit & Vessel Tier (Offline Resilience)", "Google Gemma 2 (2B/9B) & Gemini Nano models enable aircraft Electronic Flight Bags (EFBs) and shipboard bridge terminals to compute legal duty hours locally during satellite blackouts.", font_size=Pt(8.5))

# Add Screenshot of Admin Console on Right
pic5 = slide5.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_admin.png"),
    Inches(5.55), Inches(1.68), Inches(3.98), Inches(2.49)
)
pic5.line.color.rgb = BORDER_COLOR
pic5.line.width = Pt(1)

# Caption under pic5
tb_cap5 = slide5.shapes.add_textbox(Inches(5.55), Inches(4.25), Inches(3.98), Inches(1.0))
tf_cap5 = tb_cap5.text_frame
tf_cap5.word_wrap = True
tf_cap5.margin_left = tf_cap5.margin_right = tf_cap5.margin_top = tf_cap5.margin_bottom = 0
p = tf_cap5.paragraphs[0]
r = p.add_run()
r.text = "▲ Regulatory & Policy Engine: "
r.font.name = FONT_TITLE
r.font.size = Pt(8.5)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE
r = p.add_run()
r.text = "Interactive parameter tuning for DGCA CAR Sec 7 & IMO STCW 2010 rules with 42/42 deterministic regression tests passing in <50ms."
r.font.name = FONT_BODY
r.font.size = Pt(8.2)
r.font.color.rgb = DARK_TEXT

# ==============================================================================
# Slide 6: Google AI Tools
# ==============================================================================
slide6 = prs.slides[5]
slide6.shapes[1].width = Inches(8.8)
tb6 = slide6.shapes[2]
tb6.left = Inches(0.48)
tb6.top = Inches(1.68)
tb6.width = Inches(9.04)
tb6.height = Inches(3.6)
tf6 = tb6.text_frame
tf6.clear()
tf6.word_wrap = True
tf6.margin_left = tf6.margin_right = tf6.margin_top = tf6.margin_bottom = 0

add_header_paragraph(tf6, "DEEP INTEGRATION WITH OFFICIAL GOOGLE AI TOOLS", color=GOOGLE_BLUE, space_before=Pt(0), font_size=Pt(11))
add_bullet_paragraph(tf6, "1. Google AI Studio", "Used for prompt engineering, system instructions, and defining strict JSON schema function declarations (OCC_TOOLS_DECLARATION) for check_candidate_legality, trigger_simulated_disruption, and get_domain_status. Enables zero-setup rapid deployment via GEMINI_API_KEY.", font_size=Pt(9.2))
add_bullet_paragraph(tf6, "2. Google Antigravity (Multi-Agent Swarm)", "Orchestrates five autonomous agents collaborating via a public event message board: (1) Incident Commander ingests disruption alerts; (2) Compliance Kernel runs deterministic rulebook checks; (3) Resource Optimizer ranks legal candidates by overtime cost and fragility; (4) Dispatch Comms drafts ACARS/Telex directives; (5) Audit Guard verifies cryptographic evidence containment.", font_size=Pt(9.2))
add_bullet_paragraph(tf6, "3. Google Agent Skills", "Modular deterministic domain skills encapsulating civil aviation and maritime safety standards (DGCA CAR Sec 7, FAA Part 117, IMO STCW 2010, MLC 2006) for automated policy execution and continuous compliance tracking.", font_size=Pt(9.2))

# ==============================================================================
# Slide 7: Google AI Models
# ==============================================================================
slide7 = prs.slides[6]
slide7.shapes[1].width = Inches(8.8)
tb7 = slide7.shapes[2]
tb7.left = Inches(0.48)
tb7.top = Inches(1.68)
tb7.width = Inches(9.04)
tb7.height = Inches(3.6)
tf7 = tb7.text_frame
tf7.clear()
tf7.word_wrap = True
tf7.margin_left = tf7.margin_right = tf7.margin_top = tf7.margin_bottom = 0

add_header_paragraph(tf7, "1. CLOUD REASONING & MULTIMODAL STREAMING ENGINES", color=GOOGLE_BLUE, space_before=Pt(0), font_size=Pt(10.5))
add_bullet_paragraph(tf7, "Gemini 2.0 Flash & Gemini 1.5 Pro", "Primary cloud reasoning engines translating free-form speech and unstructured controller queries into verified compliance tool executions with low latency.", font_size=Pt(8.7), space_after=Pt(2.0))
add_bullet_paragraph(tf7, "Gemini Omni", "Multimodal intelligence engine processing streaming voice directives, dense tabular rosters, and live 2D radar/timeline maps simultaneously.", font_size=Pt(8.7), space_after=Pt(2.0))
add_bullet_paragraph(tf7, "Gemini Live", "Continuous 24kHz bidirectional WebSocket voice streaming engine enabling natural, interruptible conversational dialogue during high-tempo OCC emergencies.", font_size=Pt(8.7), space_after=Pt(2.0))

add_header_paragraph(tf7, "2. EDGE OFFLINE RESILIENCE & OPERATIONAL AUDIO (COCKPIT & VESSEL)", color=GOOGLE_GREEN, space_before=Pt(7), font_size=Pt(10.5))
add_bullet_paragraph(tf7, "Google Gemma 2 (2B / 9B Instruct)", "Open-weights models deployed on aircraft EFBs and vessel bridge consoles for localized, offline compliance validation when disconnected from cloud networks.", font_size=Pt(8.7), space_after=Pt(2.0))
add_bullet_paragraph(tf7, "Gemini Nano / Nano Banana", "Ultra-low-latency on-device SLM powering handheld mobile triage on pilot/crew tablets with zero cloud roundtrips.", font_size=Pt(8.7), space_after=Pt(2.0))
add_bullet_paragraph(tf7, "Google DeepMind Lyria", "Procedural acoustic audio engine (audio.py) synthesizing 24kHz operational soundscapes: critical uncrewed earcons, ARINC ACARS data chimes, and VHF Ch 16 squawks.", font_size=Pt(8.7), space_after=Pt(2.0))

# ==============================================================================
# Slide 8: Live Product UI Showcase 1 (OCC Console & 72h Predictive Radar)
# ==============================================================================
slide8 = prs.slides[7]
for s in list(slide8.shapes):
    sp = s._element
    sp.getparent().remove(sp)

add_header_banner(slide8)
setup_title(slide8, "Live Platform Showcase", "OCC Command Console & 72-Hour Predictive Radar")

# Left Column: OCC Console
tb_head_l8 = slide8.shapes.add_textbox(Inches(0.48), Inches(1.65), Inches(4.35), Inches(0.3))
tf = tb_head_l8.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
r = tf.paragraphs[0].add_run()
r.text = "1. Operations Control Center (OCC) Console"
r.font.name = FONT_TITLE
r.font.size = Pt(11)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE

pic_l8 = slide8.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_console.png"),
    Inches(0.48), Inches(1.98), Inches(4.35), Inches(2.28)
)
pic_l8.line.color.rgb = BORDER_COLOR
pic_l8.line.width = Pt(1)

tb_bl8 = slide8.shapes.add_textbox(Inches(0.48), Inches(4.34), Inches(4.35), Inches(1.15))
tf = tb_bl8.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
add_bullet_paragraph(tf, "Sub-2s Real-Time Triage", "Instant containment across 147 flights & 84 voyages.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "7-Step Decision Engine", "Balances airline rules, live rosters & financial costs.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Cost Optimization", "Hungarian solver yields -₹14,200 savings per recovered pairing.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Multi-Channel Uplinks", "One-click ARINC ACARS, Inmarsat-C Telex & VHF dispatch.", font_size=Pt(8.2), space_after=Pt(1.5))

# Right Column: 72h Predictive Radar
tb_head_r8 = slide8.shapes.add_textbox(Inches(5.17), Inches(1.65), Inches(4.35), Inches(0.3))
tf = tb_head_r8.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
r = tf.paragraphs[0].add_run()
r.text = "2. 72-Hour Predictive Disruption Radar"
r.font.name = FONT_TITLE
r.font.size = Pt(11)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE

pic_r8 = slide8.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_intelligence.png"),
    Inches(5.17), Inches(1.98), Inches(4.35), Inches(2.28)
)
pic_r8.line.color.rgb = BORDER_COLOR
pic_r8.line.width = Pt(1)

tb_br8 = slide8.shapes.add_textbox(Inches(5.17), Inches(4.34), Inches(4.35), Inches(1.15))
tf = tb_br8.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
add_bullet_paragraph(tf, "Multi-Horizon PDI", "Predictive Disruption Index tracking risks across 72 hours.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Environmental Lookahead", "Tracks weather fronts, slot curfews & port tidal locks.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Cumulative Fatigue", "Forecasting curves prevent approaching duty violations.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Asset Exposure Matrix", "Live risk heatmaps for aircraft tails & feeder vessel hulls.", font_size=Pt(8.2), space_after=Pt(1.5))

# ==============================================================================
# Slide 9: Live Product UI Showcase 2 (Timeline Gantt & Unified Roster)
# ==============================================================================
# Note: Slide 9 was the closing slide in source template, so we use it for Showcase 2,
# and add new slides for Traction & Closing.
slide9 = prs.slides[8]
# Clear existing background picture from Slide 9
for s in list(slide9.shapes):
    sp = s._element
    sp.getparent().remove(sp)

add_header_banner(slide9)
setup_title(slide9, "Live Platform Showcase", "Operations Schedule Timeline & Unified Roster")

# Left Column: Schedule Timeline Gantt
tb_head_l9 = slide9.shapes.add_textbox(Inches(0.48), Inches(1.65), Inches(4.35), Inches(0.3))
tf = tb_head_l9.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
r = tf.paragraphs[0].add_run()
r.text = "3. 24-Hour Visual Schedule Timeline Gantt"
r.font.name = FONT_TITLE
r.font.size = Pt(11)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE

pic_l9 = slide9.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_flights.png"),
    Inches(0.48), Inches(1.98), Inches(4.35), Inches(2.28)
)
pic_l9.line.color.rgb = BORDER_COLOR
pic_l9.line.width = Pt(1)

tb_bl9 = slide9.shapes.add_textbox(Inches(0.48), Inches(4.34), Inches(4.35), Inches(1.15))
tf = tb_bl9.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
add_bullet_paragraph(tf, "Fleet Timeline Gantt", "Visual schedule for tails VT-DXA..F and feeder vessels.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Block & Turn Analysis", "Real-time block hours, turn buffers & duty periods.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Disruption Highlighting", "Immediate visual flag of uncrewed routes & ripple impact.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Crew Roster Drill-Down", "Inspect captains, first officers & relief watchkeepers in 1 click.", font_size=Pt(8.2), space_after=Pt(1.5))

# Right Column: Unified Crew & Reserves Matrix
tb_head_r9 = slide9.shapes.add_textbox(Inches(5.17), Inches(1.65), Inches(4.35), Inches(0.3))
tf = tb_head_r9.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
r = tf.paragraphs[0].add_run()
r.text = "4. Unified Crew Roster & Standby Matrix"
r.font.name = FONT_TITLE
r.font.size = Pt(11)
r.font.bold = True
r.font.color.rgb = GOOGLE_BLUE

pic_r9 = slide9.shapes.add_picture(
    os.path.join(SCREENSHOT_DIR, "screenshot_roster.png"),
    Inches(5.17), Inches(1.98), Inches(4.35), Inches(2.28)
)
pic_r9.line.color.rgb = BORDER_COLOR
pic_r9.line.width = Pt(1)

tb_br9 = slide9.shapes.add_textbox(Inches(5.17), Inches(4.34), Inches(4.35), Inches(1.15))
tf = tb_br9.text_frame
tf.word_wrap = True
tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
add_bullet_paragraph(tf, "270 Personnel Records", "150 aviation crew & 120 maritime watchkeepers.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Rolling 7d Duty Bars", "Color-coded progress bars vs. DGCA 60h & STCW 77h limits.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Standby Reachability", "Ranks reserves by airport/port base and travel minutes.", font_size=Pt(8.2), space_after=Pt(1.5))
add_bullet_paragraph(tf, "Risk Twin Integration", "Personalized fatigue index dynamically tied to candidate solver.", font_size=Pt(8.2), space_after=Pt(1.5))

# ==============================================================================
# Slide 10: Market Validation, Traction & GCP Deployment (Added Slide)
# ==============================================================================
blank_layout = prs.slide_layouts[10]
slide10 = prs.slides.add_slide(blank_layout)
add_header_banner(slide10)
setup_title(slide10, "Market Validation, Traction & Deployment", "Empirical benchmarks, regulatory conformance, and Google Cloud production deployment.")

tb10 = slide10.shapes.add_textbox(Inches(0.48), Inches(1.68), Inches(9.04), Inches(3.6))
tf10 = tb10.text_frame
tf10.clear()
tf10.word_wrap = True
tf10.margin_left = tf10.margin_right = tf10.margin_top = tf10.margin_bottom = 0

add_header_paragraph(tf10, "EMPIRICAL BENCHMARK DATASETS & REGULATORY CONFORMANCE", color=GOOGLE_GREEN, space_before=Pt(0), font_size=Pt(10.5))
add_bullet_paragraph(tf10, "Commercial Aviation Dataset", "147 active scheduled flights, 150 crew members, 39 pairings, 16 standby reserves operating across 5 Indian hub airports (DEL, BOM, BLR, CCU, HYD).", font_size=Pt(8.8))
add_bullet_paragraph(tf10, "Maritime Logistics Dataset", "84 short-sea feeder voyages, 120 watchkeepers (52 Master/Mates, 68 Engineers), 24 pairings, 14 harbor relief pilots across European container hubs (Rotterdam, Hamburg, Antwerp).", font_size=Pt(8.8))
add_bullet_paragraph(tf10, "42 / 42 Conformance Scorecard", "100% pass rate across deterministic regulatory regression test suites covering WOCL incursions, augmented crew rest buffers, tidal gate locks, and rolling 28-day caps.", font_size=Pt(8.8))
add_bullet_paragraph(tf10, "Operational Impact", "Reduces disruption resolution latency from 35 minutes to under 2 seconds, saving an average of ₹14,200 (43%) per disrupted pairing.", font_size=Pt(8.8))

add_header_paragraph(tf10, "GOOGLE CLOUD PRODUCTION INFRASTRUCTURE & BUSINESS MODEL", color=GOOGLE_BLUE, space_before=Pt(5), font_size=Pt(10.5))
add_bullet_paragraph(tf10, "Google Cloud Run (Managed Serverless)", "Containerized deployment in asia-south1 with 2 vCPU / 2GiB, handling auto-scaling WebSocket streams with zero cold-start delay (deploy_gcp.sh).", font_size=Pt(8.8))
add_bullet_paragraph(tf10, "Google Cloud Build CI/CD", "Automated containerization pipeline (cloudbuild.yaml) building production-ready images for Google Artifact Registry.", font_size=Pt(8.8))
add_bullet_paragraph(tf10, "Tiered B2B Enterprise SaaS", "Tier 1 Regional ($25k/mo), Tier 2 Mid-Market ($60k/mo), Tier 3 Global Flagship ($120k/mo). Target addressable market of $1.85B SOM across top 120 airlines and 80 shipping lines.", font_size=Pt(8.8))

# ==============================================================================
# Slide 11: Closing / Thank You (Added Slide with original background)
# ==============================================================================
slide11 = prs.slides.add_slide(blank_layout)
slide11.shapes.add_picture(SLIDE_BG_CLOSING, Inches(0), Inches(0), Inches(10.0), Inches(5.625))

# ==============================================================================
# Remove First Slide (Template "Submission Guidelines" instruction page)
# ==============================================================================
rId = prs.slides._sldIdLst[0].rId
prs.part.drop_rel(rId)
del prs.slides._sldIdLst[0]

# Save presentation
prs.save(DST_PPTX)
print("Successfully generated CrewOps Submission Deck with high-res UI screenshots at:")
print(DST_PPTX)

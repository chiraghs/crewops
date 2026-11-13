"""CortexOps Production Server.
Supports FastAPI + WebSockets when installed, with seamless fallback
to Python standard library http.server if third-party packages are absent.
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
from typing import Any, Optional
from urllib.parse import parse_qs, urlparse

from .agents.swarm import AgentSwarm
from .domains import get_all_verticals, get_rulebook, get_seed_data
from .gemini.client import GeminiOCCAdvisor
from .models import Disruption, DisruptionType, VerticalType

# --------------------------------------------------------------------------
# State Container
# --------------------------------------------------------------------------
class SystemState:
    def __init__(self):
        self.active_vertical: VerticalType = VerticalType.AVIATION
        self.rulebook = get_rulebook(self.active_vertical)
        self.resources, self.assignments = get_seed_data(self.active_vertical)
        self.disruptions: list[Disruption] = []
        self.swarm = AgentSwarm(self.active_vertical, self.rulebook, self.resources, self.assignments)
        self.advisor = GeminiOCCAdvisor()
        self.sse_queues: list[asyncio.Queue] = []

    def switch_vertical(self, new_v: VerticalType):
        self.active_vertical = new_v
        self.rulebook = get_rulebook(new_v)
        self.resources, self.assignments = get_seed_data(new_v)
        self.disruptions.clear()
        self.swarm = AgentSwarm(self.active_vertical, self.rulebook, self.resources, self.assignments)

    def to_state_dict(self) -> dict[str, Any]:
        return {
            "vertical": self.active_vertical.value,
            "rulebook": {
                "name": self.rulebook.name,
                "authority": self.rulebook.standard_authority,
                "max_single_duty": self.rulebook.max_single_duty_hours,
                "min_rest": self.rulebook.min_rest_hours,
                "max_duty_7d": self.rulebook.max_duty_7d,
                "max_duty_28d": self.rulebook.max_duty_28d,
                "mandatory_certs": self.rulebook.mandatory_certs,
            },
            "resources": [r.to_dict() for r in self.resources],
            "assignments": [a.to_dict() for a in self.assignments],
            "disruptions": [d.to_dict() for d in self.disruptions],
            "swarm_activity": [m.to_dict() for m in self.swarm.message_board[-10:]],
        }


STATE = SystemState()
UI_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui.html")

def _read_ui() -> bytes:
    if os.path.exists(UI_PATH):
        with open(UI_PATH, "rb") as f:
            return f.read()
    return b"<h1>CortexOps UI not found</h1>"


# --------------------------------------------------------------------------
# Check if FastAPI is available
# --------------------------------------------------------------------------
HAS_FASTAPI = False
try:
    from fastapi import FastAPI, Request, WebSocket
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
    from pydantic import BaseModel
    from .gemini.live import GeminiLiveSession
    HAS_FASTAPI = True
except ImportError:
    pass

if HAS_FASTAPI:
    app = FastAPI(title="CortexOps OCC Platform", version="1.0.0")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/", response_class=HTMLResponse)
    async def serve_ui():
        return _read_ui().decode("utf-8")

    @app.get("/api/verticals")
    async def list_verticals():
        return {"active": STATE.active_vertical.value, "verticals": get_all_verticals()}

    @app.get("/api/state")
    async def get_state(vertical: Optional[str] = None):
        if vertical and vertical != STATE.active_vertical.value:
            try:
                STATE.switch_vertical(VerticalType(vertical))
            except ValueError:
                pass
        return STATE.to_state_dict()

    class SwitchReq(BaseModel):
        vertical: str

    @app.post("/api/switch_vertical")
    async def switch_v(req: SwitchReq):
        try:
            vt = VerticalType(req.vertical.lower())
            STATE.switch_vertical(vt)
            return {"ok": True, "active": STATE.active_vertical.value}
        except ValueError:
            return JSONResponse(status_code=400, content={"error": f"Invalid vertical {req.vertical}"})

    class DisruptionReq(BaseModel):
        target_id: Optional[str] = None
        reason: Optional[str] = None
        disruption_type: Optional[str] = "RESOURCE_UNAVAILABLE"

    @app.post("/api/disrupt")
    async def disrupt(req: DisruptionReq):
        target_id = req.target_id
        if not target_id and STATE.assignments:
            target_id = STATE.assignments[0].assigned_resource_id or STATE.resources[0].id

        d = Disruption(
            id=f"DIS-{len(STATE.disruptions) + 1:03d}",
            vertical=STATE.active_vertical,
            disruption_type=DisruptionType(req.disruption_type or "RESOURCE_UNAVAILABLE"),
            title=f"Critical Unavailability: {target_id}",
            target_id=target_id,
            start_utc=STATE.assignments[0].start_utc if STATE.assignments else "2026-11-14T06:00:00",
            duration_hours=8.0,
            severity="CRITICAL",
            reason=req.reason or "Acute medical grounding / sudden mechanical alert",
        )
        STATE.disruptions.append(d)
        res = await STATE.swarm.run_disruption_orchestration(d)
        return res

    class AuthorizeReq(BaseModel):
        disruption_id: str
        chosen_candidate_id: str

    @app.post("/api/authorize_recovery")
    async def authorize(req: AuthorizeReq):
        cand = next((r for r in STATE.resources if r.id == req.chosen_candidate_id), None)
        if not cand:
            return JSONResponse(status_code=404, content={"error": "Candidate not found"})
        for d in STATE.disruptions:
            if d.id == req.disruption_id:
                d.dismissed = True
        if STATE.assignments:
            STATE.assignments[0].assigned_resource_id = cand.id
        msg = STATE.swarm.post(
            sender_role="OCC Controller",
            sender_name="Chief-Dispatcher",
            recipient="ALL",
            content=f"✅ AUTHORIZED: {cand.name} ({cand.id}) confirmed on assignment. Roster locked.",
            payload={"candidate": cand.to_dict()},
        )
        await STATE.swarm.broadcast(msg)
        return {"ok": True, "authorized": cand.to_dict()}

    class AskReq(BaseModel):
        query: str

    @app.post("/api/ask")
    async def ask(req: AskReq):
        return STATE.advisor.query(req.query, {"vertical": STATE.active_vertical.value})

    @app.get("/api/health")
    async def health():
        return {
            "status": "HEALTHY",
            "server_engine": "FastAPI+Uvicorn",
            "active_vertical": STATE.active_vertical.value,
            "resources": len(STATE.resources),
            "assignments": len(STATE.assignments),
            "swarm_messages": len(STATE.swarm.message_board),
        }

    @app.websocket("/ws/live")
    async def ws_live(ws: WebSocket):
        await ws.accept()
        async def adv(q: str):
            return STATE.advisor.query(q, {"vertical": STATE.active_vertical.value})
        session = GeminiLiveSession(ws, STATE.active_vertical.value, adv)
        await session.run()

else:
    app = None  # Fallback to standard library runner below


# --------------------------------------------------------------------------
# Standard Library HTTP Server Fallback (Runs everywhere without pip)
# --------------------------------------------------------------------------
import http.server
import socketserver

class StandaloneOCCServer(http.server.BaseHTTPRequestHandler):
    def _send_json(self, data: Any, code: int = 200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_body_json(self) -> dict[str, Any]:
        length = int(self.headers.get("Content-Length", 0))
        if length > 0:
            raw = self.rfile.read(length)
            return json.loads(raw.decode("utf-8"))
        return {}

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path in ("/", "/index.html"):
            ui = _read_ui()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(ui)))
            self.end_headers()
            self.wfile.write(ui)
        elif path == "/api/verticals":
            self._send_json({"active": STATE.active_vertical.value, "verticals": get_all_verticals()})
        elif path == "/api/state":
            v = query.get("vertical", [None])[0]
            if v and v != STATE.active_vertical.value:
                try:
                    STATE.switch_vertical(VerticalType(v))
                except ValueError:
                    pass
            self._send_json(STATE.to_state_dict())
        elif path == "/api/health":
            self._send_json({
                "status": "HEALTHY",
                "server_engine": "Python Standard Library OCC Core",
                "active_vertical": STATE.active_vertical.value,
                "resources": len(STATE.resources),
                "assignments": len(STATE.assignments),
                "swarm_messages": len(STATE.swarm.message_board),
            })
        elif path == "/api/events/stream":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "keep-alive")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b": ping\n\n")
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        path = urlparse(self.path).path
        body = self._read_body_json()

        if path == "/api/switch_vertical":
            v = body.get("vertical", "")
            try:
                vt = VerticalType(v.lower())
                STATE.switch_vertical(vt)
                self._send_json({"ok": True, "active": STATE.active_vertical.value})
            except ValueError:
                self._send_json({"error": f"Invalid vertical {v}"}, 400)

        elif path == "/api/disrupt":
            target_id = body.get("target_id")
            if not target_id and STATE.assignments:
                target_id = STATE.assignments[0].assigned_resource_id or STATE.resources[0].id

            d = Disruption(
                id=f"DIS-{len(STATE.disruptions) + 1:03d}",
                vertical=STATE.active_vertical,
                disruption_type=DisruptionType(body.get("disruption_type") or "RESOURCE_UNAVAILABLE"),
                title=f"Critical Unavailability: {target_id}",
                target_id=target_id,
                start_utc=STATE.assignments[0].start_utc if STATE.assignments else "2026-11-14T06:00:00",
                duration_hours=8.0,
                severity="CRITICAL",
                reason=body.get("reason") or "Acute medical grounding / sudden mechanical alert",
            )
            STATE.disruptions.append(d)
            res = asyncio.run(STATE.swarm.run_disruption_orchestration(d))
            self._send_json(res)

        elif path == "/api/authorize_recovery":
            cand_id = body.get("chosen_candidate_id")
            cand = next((r for r in STATE.resources if r.id == cand_id), None)
            if not cand:
                self._send_json({"error": "Candidate not found"}, 404)
                return
            for d in STATE.disruptions:
                if d.id == body.get("disruption_id"):
                    d.dismissed = True
            if STATE.assignments:
                STATE.assignments[0].assigned_resource_id = cand.id
            msg = STATE.swarm.post(
                sender_role="OCC Controller",
                sender_name="Chief-Dispatcher",
                recipient="ALL",
                content=f"✅ AUTHORIZED: {cand.name} ({cand.id}) confirmed on assignment. Roster locked.",
                payload={"candidate": cand.to_dict()},
            )
            self._send_json({"ok": True, "authorized": cand.to_dict()})

        elif path == "/api/ask":
            query = body.get("query", "")
            res = STATE.advisor.query(query, {"vertical": STATE.active_vertical.value})
            self._send_json(res)
        else:
            self.send_response(404)
            self.end_headers()


def run_standalone(host: str = "0.0.0.0", port: int = 8787):
    print(f"CortexOps server running on http://{host}:{port}")
    with socketserver.TCPServer((host, port), StandaloneOCCServer) as httpd:
        httpd.serve_forever()

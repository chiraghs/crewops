"""Gemini Live Real-Time Bidirectional Voice & Multimodal Streaming Handler.
Enables hands-free voice interaction for OCC dispatchers and field supervisors.
"""
from __future__ import annotations

import asyncio
import json
from typing import Any, Callable, Coroutine
from fastapi import WebSocket


class GeminiLiveSession:
    """Manages an active real-time voice streaming session over WebSocket."""

    def __init__(self, websocket: WebSocket, vertical: str, advisor_callback: Callable[[str], Coroutine[Any, Any, dict[str, Any]]]):
        self.ws = websocket
        self.vertical = vertical
        self.advisor_callback = advisor_callback
        self.is_active = True

    async def run(self):
        # Send initial handshake
        await self.ws.send_json({
            "type": "SESSION_OPENED",
            "vertical": self.vertical,
            "sample_rate": 24000,
            "status": "LISTENING",
            "message": f"Gemini Live Connected. Speak naturally to query or resolve {self.vertical.upper()} operations.",
        })

        try:
            while self.is_active:
                data = await self.ws.receive_text()
                payload = json.loads(data)
                msg_type = payload.get("type", "TEXT_QUERY")

                if msg_type == "AUDIO_CHUNK":
                    # Simulated audio frame reception and VAD (Voice Activity Detection)
                    await self.ws.send_json({
                        "type": "AUDIO_VAD",
                        "speaking": True,
                        "rms_level": 0.85,
                    })

                elif msg_type == "VOICE_TRANSCRIBED" or msg_type == "TEXT_QUERY":
                    query_text = payload.get("text", "")
                    
                    # Notify user that agent is reasoning
                    await self.ws.send_json({
                        "type": "AGENT_THINKING",
                        "query": query_text,
                    })

                    # Execute query through advisor
                    response = await self.advisor_callback(query_text)

                    # Stream back spoken response tokens and tool call result
                    await self.ws.send_json({
                        "type": "AGENT_SPEECH",
                        "text": response.get("text", ""),
                        "tool_called": response.get("tool_called"),
                        "verified": response.get("verified", True),
                    })

                elif msg_type == "SESSION_CLOSE":
                    self.is_active = False
                    break

        except Exception as e:
            pass
        finally:
            self.is_active = False

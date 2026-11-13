"""Agent Roles and Communication Protocols for the Antigravity Swarm.
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional


@dataclass
class SwarmMessage:
    id: str
    sender_role: str
    sender_name: str
    recipient: str  # role or "ALL"
    content: str
    data_payload: Optional[dict[str, Any]] = None
    timestamp: str = field(default_factory=lambda: datetime.utcnow().strftime("%H:%M:%S.%f")[:-3])

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "sender_role": self.sender_role,
            "sender_name": self.sender_name,
            "recipient": self.recipient,
            "content": self.content,
            "payload": self.data_payload,
            "timestamp": self.timestamp,
        }

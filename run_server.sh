#!/usr/bin/env bash
set -e

PORT=${1:-8787}

echo "=========================================================="
echo "  CrewOps · Mission-Critical Operations Control Center"
echo "  Multi-Vertical Autonomous Disruption & Recovery Engine"
echo "=========================================================="
echo "Starting server on http://127.0.0.1:${PORT}"
echo "Press Ctrl+C to terminate."
echo "=========================================================="

python3 -m crewops serve --port "${PORT}"

#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PORT=${1:-8787}

echo "=========================================================="
echo "  CrewOps · OCC Decision Command Center"
echo "  CAR Section 7 Legality & Recovery Engine"
echo "=========================================================="
echo "Starting local OCC server at http://127.0.0.1:${PORT}"
echo "Press Ctrl+C to stop."
echo "=========================================================="

PYTHONPATH="$DIR" python3 -m crewops serve --port "${PORT}"

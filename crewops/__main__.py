"""CrewOps CLI Runner with Automatic Fallback."""
import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description="CrewOps: Autonomous OCC Platform")
    subparsers = parser.add_subparsers(dest="command")

    serve_parser = subparsers.add_parser("serve", help="Run the OCC server")
    serve_parser.add_argument("--port", type=int, default=8787, help="Server port (default: 8787)")
    serve_parser.add_argument("--host", type=str, default="0.0.0.0", help="Host binding (default: 0.0.0.0)")

    args = parser.parse_args()

    port = getattr(args, "port", 8787)
    host = getattr(args, "host", "0.0.0.0")

    print(f"========================================================")
    print(f"  CrewOps · Mission-Critical Operations Control Center")
    print(f"  Aviation | Maritime | Logistics | Healthcare | Industrial")
    print(f"  Gemini Live Voice + Antigravity Multi-Agent Swarm")
    print(f"========================================================")

    # Check if uvicorn is available
    has_uvicorn = False
    try:
        import uvicorn
        has_uvicorn = True
    except ImportError:
        pass

    if has_uvicorn:
        print(f"Starting ASGI server via Uvicorn on http://{host}:{port}")
        uvicorn.run("crewops.server:app", host=host, port=port, reload=False)
    else:
        from crewops.server import run_standalone
        print(f"Starting zero-dependency server on http://{host}:{port}")
        run_standalone(host=host, port=port)


if __name__ == "__main__":
    main()

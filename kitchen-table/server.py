"""
Kitchen Table Server — Static files + Waymaker API proxy
Zero dependencies. Uses only Python standard library.

Usage:
  python server.py                     # port 8732, reads .env for API key
  python server.py --port 8080         # custom port
  ANTHROPIC_API_KEY=sk-... python server.py  # key via env var

The server reads ANTHROPIC_API_KEY from:
  1. Environment variable
  2. .env file in this directory
"""

import http.server
import json
import os
import sys
import urllib.request
import urllib.error
import ssl
from pathlib import Path

PORT = 8732
CLAUDE_URL = "https://api.anthropic.com/v1/messages"
CLAUDE_MODEL = "claude-sonnet-4-20250514"

def load_env():
    """Read .env file if it exists."""
    env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                if key and value:
                    os.environ.setdefault(key, value)

def get_api_key():
    return os.environ.get("ANTHROPIC_API_KEY", "")


class KitchenTableHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/api/waymaker":
            self.handle_waymaker()
        else:
            self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def handle_waymaker(self):
        api_key = get_api_key()
        if not api_key:
            self.send_json(500, {"error": "ANTHROPIC_API_KEY not set. Add it to .env or set as environment variable."})
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, ValueError):
            self.send_json(400, {"error": "Invalid JSON"})
            return

        system = body.get("system", "")
        messages = body.get("messages", [])

        if not messages:
            self.send_json(400, {"error": "No messages provided"})
            return

        payload = json.dumps({
            "model": CLAUDE_MODEL,
            "max_tokens": 1024,
            "system": system,
            "messages": messages,
        }).encode("utf-8")

        req = urllib.request.Request(
            CLAUDE_URL,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01",
            },
            method="POST",
        )

        try:
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, context=ctx) as resp:
                data = json.loads(resp.read())
                text = data.get("content", [{}])[0].get("text", "")
                self.send_json(200, {"response": text})
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            print(f"Claude API error {e.code}: {err_body}", file=sys.stderr)
            self.send_json(e.code, {"error": f"Claude API error: {e.code}", "detail": err_body})
        except Exception as e:
            print(f"Proxy error: {e}", file=sys.stderr)
            self.send_json(500, {"error": str(e)})

    def send_json(self, code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        if "/api/" in (args[0] if args else ""):
            super().log_message(format, *args)


if __name__ == "__main__":
    load_env()

    port = PORT
    for i, arg in enumerate(sys.argv[1:], 1):
        if arg == "--port" and i < len(sys.argv) - 1:
            port = int(sys.argv[i + 1])

    key = get_api_key()
    print(f"\n🔥 Kitchen Table Server")
    print(f"   http://localhost:{port}")
    print(f"   Waymaker API: {'✅ Key loaded' if key else '❌ No ANTHROPIC_API_KEY — set in .env or environment'}")
    print(f"   Press Ctrl+C to stop\n")

    handler = KitchenTableHandler
    handler.directory = str(Path(__file__).parent)
    with http.server.HTTPServer(("", port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

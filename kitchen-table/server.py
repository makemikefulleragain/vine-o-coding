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

import datetime
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
ELEVENLABS_TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech"
ELEVENLABS_MODEL = "eleven_turbo_v2_5"

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

def get_elevenlabs_key():
    return os.environ.get("ELEVENLABS_API_KEY", "")

def get_elevenlabs_voice_id():
    return os.environ.get("ELEVENLABS_VOICE_ID", "")


class KitchenTableHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        try:
            if self.path.startswith("/api/"):
                if self.path == "/api/brief/status":
                    self.handle_brief_status()
                else:
                    self.send_error(404)
            else:
                super().do_GET()
        except Exception as e:
            import traceback
            print(f"do_GET error: {e}", file=sys.stderr)
            traceback.print_exc(file=sys.stderr)
            try:
                self.send_json(500, {"error": str(e)})
            except Exception:
                pass

    def do_POST(self):
        if self.path == "/api/waymaker":
            self.handle_waymaker()
        elif self.path == "/api/brief":
            self.handle_brief_generate()
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

    def handle_brief_status(self):
        iso = datetime.date.today().isocalendar()
        week_tag = f"{iso[0]}-W{iso[1]:02d}"
        audio_path = Path(__file__).parent / "audio" / f"brief-{week_tag}.mp3"
        if audio_path.exists():
            self.send_json(200, {"exists": True, "url": f"/audio/brief-{week_tag}.mp3", "week": week_tag})
        else:
            self.send_json(200, {"exists": False, "week": week_tag})

    def handle_brief_generate(self):
        api_key = get_api_key()
        el_key = get_elevenlabs_key()
        voice_id = get_elevenlabs_voice_id()

        if not api_key:
            self.send_json(500, {"error": "ANTHROPIC_API_KEY not set"}); return
        if not el_key:
            self.send_json(500, {"error": "ELEVENLABS_API_KEY not set — add to .env"}); return
        if not voice_id:
            self.send_json(500, {"error": "ELEVENLABS_VOICE_ID not set — add to .env"}); return

        state_path = Path(__file__).parent.parent / "BRAIN" / "STATE.md"
        if not state_path.exists():
            self.send_json(500, {"error": "BRAIN/STATE.md not found"}); return
        state_content = state_path.read_text(encoding="utf-8")

        brief_system = (
            "You are Waymaker, the internal AI assistant for Kamunity. "
            "Write a warm, spoken Monday morning brief based on the STATE.md content provided. "
            "RULES: Written for ears, not eyes — no markdown, no bullet points, no headers, no tables. "
            "Conversational prose. Natural spoken cadence. Maximum 450 words (about 3 minutes spoken). "
            "Start with a warm opener acknowledging the week ahead. "
            "Cover: what's live and healthy, what's critical right now, the single most important priority this week, and one grounding encouraging note. "
            "End warmly. Sound like a trusted colleague giving a quick kitchen table briefing, not a corporate report."
        )

        claude_payload = json.dumps({
            "model": CLAUDE_MODEL,
            "max_tokens": 800,
            "system": brief_system,
            "messages": [{"role": "user", "content": f"Here is the current STATE.md:\n\n{state_content}\n\nWrite the Monday morning brief now."}],
        }).encode("utf-8")

        ctx = ssl.create_default_context()
        req = urllib.request.Request(
            CLAUDE_URL, data=claude_payload,
            headers={"Content-Type": "application/json", "x-api-key": api_key, "anthropic-version": "2023-06-01"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, context=ctx) as resp:
                brief_text = json.loads(resp.read()).get("content", [{}])[0].get("text", "")
        except Exception as e:
            self.send_json(500, {"error": f"Claude error: {e}"}); return

        if not brief_text.strip():
            self.send_json(500, {"error": "Claude returned empty brief"}); return

        tts_payload = json.dumps({
            "text": brief_text,
            "model_id": ELEVENLABS_MODEL,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.3, "use_speaker_boost": True},
        }).encode("utf-8")

        tts_req = urllib.request.Request(
            f"{ELEVENLABS_TTS_URL}/{voice_id}",
            data=tts_payload,
            headers={"xi-api-key": el_key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(tts_req, context=ctx) as resp:
                audio_data = resp.read()
        except urllib.error.HTTPError as e:
            self.send_json(e.code, {"error": f"ElevenLabs error: {e.code}", "detail": e.read().decode("utf-8", errors="replace")}); return
        except Exception as e:
            self.send_json(500, {"error": f"ElevenLabs error: {e}"}); return

        iso = datetime.date.today().isocalendar()
        week_tag = f"{iso[0]}-W{iso[1]:02d}"
        audio_dir = Path(__file__).parent / "audio"
        audio_dir.mkdir(exist_ok=True)
        audio_path = audio_dir / f"brief-{week_tag}.mp3"
        audio_path.write_bytes(audio_data)
        print(f"Brief generated: {audio_path.name} ({len(audio_data)//1024}KB)", file=sys.stderr)
        self.send_json(200, {"url": f"/audio/brief-{week_tag}.mp3", "week": week_tag, "text": brief_text})

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
    el_key = get_elevenlabs_key()
    voice_id = get_elevenlabs_voice_id()
    print(f"\n🔥 Kitchen Table Server")
    print(f"   http://localhost:{port}")
    print(f"   Waymaker API: {'✅ Key loaded' if key else '❌ No ANTHROPIC_API_KEY — set in .env'}")
    print(f"   Monday Brief:  {'✅ ElevenLabs ready' if (el_key and voice_id) else '❌ Set ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID in .env'}")
    print(f"   Press Ctrl+C to stop\n")

    handler = KitchenTableHandler
    handler.directory = str(Path(__file__).parent)
    with http.server.HTTPServer(("", port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

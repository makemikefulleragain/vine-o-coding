# Research: meeting-notes-summariser

## Search 1: Commercial AI meeting tools (Otter.ai, Fireflies.ai, Fathom)

These are the dominant commercial tools, but they solve a **different problem**:
- **Otter.ai** — Joins meetings, records audio, transcribes, then summarizes. Cloud-based. Free tier: 300 min/month. Pro: $16.99/user/month.
- **Fireflies.ai** — Same pattern: joins calls, records, transcribes, summarizes. Free tier limited. Pro: $18/user/month.
- **Fathom** — Free tier with unlimited recordings. Cloud-based.

**Key distinction:** These tools start from **audio** and handle the full pipeline (record → transcribe → summarize). The outcome asks for something narrower: take **already-written text notes** and produce structured output. This is a different (simpler) problem.

**Privacy concern:** All three are cloud-based. Meeting content is sent to commercial servers. For community organisations discussing sensitive topics (member welfare, funding decisions, internal disputes), this is a real sovereignty issue.

## Search 2: Open-source / self-hosted alternatives

**Meetily** (meetily.ai / GitHub: Zackriya-Solutions/meeting-minutes) — Privacy-first, open-source meeting assistant. Uses Whisper for local transcription + Ollama for local LLM summarization. Rust-based. 100% local processing.

- Great for the audio → transcription → summary pipeline
- Requires local GPU/compute for Whisper + LLM
- Still focused on audio input, not text input
- macOS + Windows support

**LLM-Minutes-of-Meeting** (GitHub: inboxpraveen/LLM-Minutes-of-Meeting) — Open-source project using NLP/LLM to summarize meetings. Two-step: audio → text → summary.

## Search 3: Simple text-to-structured-summary tools

**toolsuite.in Meeting Notes Summarizer** — Free web tool that takes pasted text and produces structured summaries. But it's a third-party cloud service — same sovereignty problem.

No widely-adopted open-source tool found that specifically does: paste text notes → structured summary with decisions, action items, unresolved questions.

## Gap Analysis

| Need | Commercial tools | Open-source tools | Gap? |
|---|---|---|---|
| Text input (paste notes) | Partial (designed for audio) | Meetily: audio-focused | **YES — text-first tool is underserved** |
| Structured output (decisions, actions, questions) | ✅ Most do this | ✅ Meetily does this | No |
| Privacy / sovereignty | ❌ Cloud-based | ✅ Meetily (local) | Meetily covers this |
| Simple web page (no install) | ✅ | ❌ Meetily requires install | **YES — no simple web tool** |
| Community org context | ❌ Enterprise-focused | ❌ General | **YES — no community-sector framing** |
| Markdown export | Partial | Meetily: yes | No |

## Key Finding

There IS a genuine gap:
1. Commercial tools solve a bigger problem (audio → summary) and have privacy issues
2. Open-source tools (Meetily) also focus on audio and require local installation
3. **No simple, privacy-aware web tool exists** for the specific workflow: paste messy text notes → get structured summary (decisions, action items, unresolved questions)

This is a well-scoped build:
- Single HTML page with a textarea and an API call
- LLM prompt engineering (structured extraction from text)
- Markdown output
- Under 500 lines easily
- The sovereignty angle is real: can be configured to use a local/self-hosted LLM
- Community-sector framing adds value (prompt tuned for meeting patterns common in community orgs)

**However:** The tool depends on an LLM API. If using OpenAI/Anthropic, meeting content goes to their servers (same privacy issue as commercial tools). The sovereignty case only holds if using a self-hosted LLM (Ollama) or if the user accepts the trade-off.

The outcome acknowledges this: "Uses an LLM API for the summarisation (or demonstrates the prompt pattern)." A build that demonstrates the prompt pattern and supports both cloud and local LLM backends is legitimate.

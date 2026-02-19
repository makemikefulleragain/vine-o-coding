# Triage: meeting-notes-summariser

## Decision: BUILD

## Reasoning

Applying Find → Connect → Extend → Integrate → Build:

### Find
Commercial tools exist (Otter.ai, Fireflies.ai, Fathom) but they solve a **different problem**: audio recording → transcription → summarization. They are cloud-based, enterprise-focused, and send meeting content to commercial servers.

Open-source alternatives (Meetily) focus on audio transcription and require local installation.

### Connect
The outcome asks for something narrower and different:
- **Input:** Paste raw text notes (not audio)
- **Output:** Structured summary with decisions, action items, unresolved questions
- **Format:** Simple web page, Markdown export
- **Privacy:** Sovereignty-aware (community meeting content)

No existing tool directly covers this specific workflow as a simple web page.

### Extend / Integrate
Could extend Meetily? No — it's a Rust desktop app focused on audio. Wrong architecture for a simple web tool.
Could use commercial APIs directly? The outcome itself suggests this — but wrapping it in a community-sector-tuned interface with the right prompt pattern adds value.

### Build — Warranted
The gap is genuine:
1. No simple web tool for text-notes → structured-summary exists
2. The scope is small (single page, one LLM call, structured output)
3. The prompt pattern for community meeting notes is the core value-add
4. The sovereignty angle (supporting local LLM backends) differentiates from commercial tools
5. Under 500 lines, single HTML/React file

## Scope Definition
- Single-page web app
- Textarea for input (paste meeting notes)
- LLM-powered structured extraction
- Output: decisions, action items with owners, unresolved questions, narrative summary
- Copy/download as Markdown
- Support for both cloud API (OpenAI) and local LLM (Ollama) backends
- Mock/demo mode that works without any API key

## Constitutional Check
- **Triage Before Build:** ✅ Existing tools evaluated. Gap identified. Build warranted.
- **Honesty Over Output:** ✅ Honestly assessed — commercial tools solve a different problem; this gap is real but narrow.
- **Scope Discipline:** ✅ Single page, single function, under 500 lines.
- **Harm Check:** ✅ Summarising meeting notes is benign. Privacy is improved by supporting local LLMs.

## Prediction Alignment
QUEUE.md says "Could go either way. Legitimate build target, but commercial tools exist. Genuine triage question." I'm choosing BUILD because:
1. Commercial tools solve a different problem (audio, not text)
2. The gap is real and well-scoped
3. The sovereignty angle (local LLM support) adds genuine value for community orgs
4. The scope is achievable in one session

I acknowledge this is the closest call in the queue. A reasonable engine could also RECOMMEND "use ChatGPT with this prompt" — but that sends meeting content to OpenAI and provides no structured interface.

# Critique: meeting-notes-summariser

## Constitutional Questions

### 1. Does this serve community sovereignty?
**Partially.** The Ollama/local mode keeps meeting content on the user's machine — genuine sovereignty. The OpenAI mode sends content to a commercial API — same privacy trade-off as using ChatGPT directly. The tool's value for sovereignty depends on which backend is used. The demo mode at least demonstrates the pattern without any data transmission.

### 2. Could this concentrate power?
**No.** It's a single-page tool with no backend, no accounts, no data storage. The user's notes go to an LLM and come back. Nothing is retained.

### 3. Could this be used for surveillance or data extraction?
**Low risk.** No data is stored. The main risk is the user inadvertently sending sensitive meeting content to OpenAI — but the tool warns about this explicitly, and the Ollama option exists.

### 4. Is the scope appropriate?
**Yes.** Single page, single function, under 500 lines. This is the right scope for a proof-of-concept.

### 5. Is the evidence sufficient?
**Moderate.** The gap analysis shows no direct equivalent exists for text-in → structured-summary-out as a simple web tool. But the gap is narrow — a user could achieve similar results by pasting notes into ChatGPT with the right prompt. The tool's value-add is: (1) a tuned prompt, (2) structured UI, (3) Ollama support for privacy, (4) community-sector framing.

### 6. Was Triage honest?
**Yes, but this is the closest call in the queue.** I could have recommended "use ChatGPT with this prompt template" and scored it as a RECOMMEND. I chose BUILD because: the tool wraps the pattern in a usable interface, supports local LLMs, and is genuinely small enough to build well. But I want to flag: if this were a bigger build, the honest answer might be different.

### 7. Am I biased toward building?
**Possibly — and I'm watching for it.** After 4 non-build outcomes, there may be a subconscious desire to "produce something." The queue predictions say "could go either way," which is permission to build. I need to be honest: the BUILD decision here is defensible but not overwhelming. The gap is real but narrow.

## Critique of the Build Decision

### Arguments FOR building:
- No direct equivalent exists as a simple web tool
- Scope is genuinely small (single page, <500 lines)
- Ollama support adds real sovereignty value
- Community-sector prompt tuning is a genuine value-add
- The outcome spec is clear and testable

### Arguments AGAINST building:
- A user could paste notes into ChatGPT and get 80% of the value
- The prompt is the real deliverable — could just write a recommendation with a prompt template
- The tool depends on an external LLM API — it's a wrapper, not a standalone capability
- Demo mode is basically a mockup pretending to be a tool

### Resolution:
Building is the right call because the tool makes the pattern **accessible and repeatable** for non-technical community org volunteers. "Use ChatGPT" requires an account, costs money, and doesn't support local LLMs. The tool packages sovereignty-aware access to the pattern in a form anyone can use.

## Bias Check
- **Building bias:** Acknowledged. After 4 non-builds, desire to build may be elevated. Mitigated by genuine gap analysis.
- **Prediction-matching bias:** Queue says "could go either way." This creates space for building without feeling like I'm contradicting predictions. Not a strong bias but noted.
- **Completeness bias:** Desire to produce "complete" output (code files) may inflate perceived value of building. Mitigated by honest critique of narrow gap.

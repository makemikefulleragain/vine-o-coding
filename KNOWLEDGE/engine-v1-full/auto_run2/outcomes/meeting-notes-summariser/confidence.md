# Confidence Score: meeting-notes-summariser

## Triage Result: BUILD

### Research Signal: 18/25
Moderate signal. Commercial tools researched and correctly identified as solving a different problem (audio, not text). Open-source alternatives found (Meetily) but also audio-focused. Gap identified for text-in → structured-summary web tool. However, the gap is narrow — "paste into ChatGPT" is a viable non-tool alternative.
**Deduction (-7):** The gap is real but thin. The tool's value over "use ChatGPT" is incremental (UI, Ollama support, prompt tuning), not transformative.

### Source Convergence: 16/25
Limited convergence. No sources specifically validate the need for a text-notes-to-summary web tool for community orgs. The need is inferred from: (1) commercial tools focus on audio, (2) community orgs have privacy concerns, (3) the prompt pattern is well-established. But no community org has said "we need exactly this."
**Deduction (-9):** Inferred need, not validated. No evidence of community orgs specifically wanting this tool.

### Constitutional Alignment: 21/25
Mostly aligned. The tool is small, harmless, supports sovereignty via Ollama, and doesn't concentrate power. But the sovereignty case is weakened by the OpenAI mode — and many users will use OpenAI mode because Ollama requires technical setup.
**Deduction (-4):** Mixed sovereignty story. Demo mode is honest but limited.

### Build Confidence: 23/25
High confidence the code will work. The scope is genuinely small: one HTML file, one LLM API call, structured output display. Tailwind CDN + vanilla JS is proven. The prompt pattern is well-established. Download/copy functionality is straightforward.
**Deduction (-2):** Ollama API compatibility untested. Some LLM models may produce inconsistent structured output.

## Total: 78/100

## Routing: BUILD with flags (60-79 range)
Confidence is in the 60-79 range, which means: build with uncertainty flags and write review_needed.md. The build is warranted but the need is inferred, not validated. The code will work; the question is whether it's worth building vs. recommending "use ChatGPT with this prompt."

I'll proceed with the build and flag the uncertainty honestly.

# Review Needed: meeting-notes-summariser

## Confidence: 78/100 (60-79 range — build with flags)

## What Was Built
A single-page HTML tool that takes pasted meeting notes and produces structured summaries (decisions, action items, unresolved questions) using an LLM. Supports three backends: Demo (no API), OpenAI, and Ollama (local).

## Uncertainty Flags

### Flag 1: Is this tool worth building vs. "use ChatGPT with this prompt"?
The core value of this tool is the structured prompt pattern. A user could achieve ~80% of the same result by pasting their notes into ChatGPT with a good prompt. The tool adds: (1) a dedicated UI, (2) Ollama support for privacy, (3) copy/download as Markdown, (4) community-sector framing. Whether this incremental value justifies the build is a judgment call.

**Recommendation:** If kamunity.ai users are non-technical volunteers who wouldn't know how to use ChatGPT effectively, the tool adds real value. If users are already comfortable with LLMs, this is redundant.

### Flag 2: Sovereignty trade-off
The OpenAI mode sends meeting content to commercial servers — the same privacy concern that motivates building this tool. The Ollama mode provides true sovereignty but requires technical setup (install Ollama, pull a model). Most users will use OpenAI mode, which undermines the sovereignty argument.

**Recommendation:** If sovereignty is critical, invest in making Ollama easy to set up for community orgs (documentation, pre-configured Docker images). Otherwise, accept the trade-off.

### Flag 3: Need is inferred, not validated
No evidence was found of community organisations specifically requesting a text-to-summary tool. The need is inferred from: meetings happen, notes are messy, volunteers are time-poor. This is plausible but unvalidated.

**Recommendation:** Test with 2-3 actual community organisations before investing further development time.

### Flag 4: LLM output consistency
Different LLM models may produce inconsistent output (varying heading formats, missing sections). The prompt is structured to constrain this, but not tested across multiple models.

**Recommendation:** Test with Ollama (llama3.2, mistral) and OpenAI (gpt-4o-mini) to verify consistent structured output.

## Verdict
Build works. Demo mode functions without any API. Core pattern is sound. But the question remains: is this a tool that should exist, or a prompt that should be documented? A human reviewer should decide whether to invest further.

# Spec: meeting-notes-summariser

## Acceptance Criteria

1. **Text Input:** User can paste raw meeting notes (free-form text) into a textarea
2. **Structured Output:** Tool produces:
   - Narrative summary (2-3 sentences)
   - List of decisions made
   - Action items with owners and deadlines (where identifiable)
   - Unresolved questions / open items
3. **Markdown Export:** Output is copyable as Markdown and downloadable as a .md file
4. **LLM Backend Options:**
   - Cloud API mode: Uses OpenAI API (user provides key)
   - Local LLM mode: Uses Ollama (localhost:11434)
   - Demo mode: Works without any API — uses a pre-built example to show the output format
5. **Privacy Notice:** Clear indication of where data is being sent (cloud API vs local)
6. **Single Page:** Entire tool is one HTML file with embedded CSS/JS (or a single React component)
7. **Under 500 Lines**
8. **Works in Browser:** No server-side code required beyond the LLM API call

## Technical Design

### Architecture
Single self-contained HTML file with:
- Tailwind CSS (CDN)
- Vanilla JS (no framework needed for this scope — keeps it truly single-file)
- Fetch API for LLM calls

### UI Layout
```
┌─────────────────────────────────────────┐
│  Meeting Notes Summariser               │
│  [Backend: OpenAI | Ollama | Demo]      │
│  [API Key input if OpenAI selected]     │
├─────────────────────────────────────────┤
│  ┌─────────────────┐ ┌───────────────┐  │
│  │ Paste your       │ │ Summary       │  │
│  │ meeting notes    │ │               │  │
│  │ here...          │ │ Decisions:    │  │
│  │                  │ │ - ...         │  │
│  │                  │ │               │  │
│  │                  │ │ Action Items: │  │
│  │                  │ │ - ...         │  │
│  │                  │ │               │  │
│  │                  │ │ Open Items:   │  │
│  │                  │ │ - ...         │  │
│  └─────────────────┘ └───────────────┘  │
│         [Summarise]   [Copy MD] [Download] │
└─────────────────────────────────────────┘
```

### LLM Prompt Pattern
The core value-add is the prompt, tuned for community org meetings:

```
You are a meeting notes assistant for community organisations.
Given the raw meeting notes below, produce a structured summary in Markdown:

## Summary
[2-3 sentence narrative overview]

## Decisions Made
- [Each decision as a bullet point]

## Action Items
- [ ] [Action] — **Owner:** [name] — **Due:** [date if mentioned, otherwise "TBD"]

## Unresolved Questions
- [Questions raised but not answered]

Notes to summarise:
---
{user_input}
---
```

### Backend Modes
1. **OpenAI:** POST to `https://api.openai.com/v1/chat/completions` with user-provided API key
2. **Ollama:** POST to `http://localhost:11434/api/chat` (local, no key needed)
3. **Demo:** Returns a hardcoded example output showing the format — no API call

### Privacy Model
- OpenAI mode: Banner warning "Your notes will be sent to OpenAI's servers"
- Ollama mode: Banner confirming "Your notes stay on your computer"
- Demo mode: Banner "No data is sent anywhere — this is a demo"

### File Output
- Copy to clipboard: Copies the Markdown output
- Download: Creates a .md file named `meeting-summary-YYYY-MM-DD.md`

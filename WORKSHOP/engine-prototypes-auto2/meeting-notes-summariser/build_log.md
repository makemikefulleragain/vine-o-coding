# Build Log: meeting-notes-summariser

## Build Decision
Triage: BUILD (with flags — confidence 78/100)
Gap identified: No simple web tool for text-notes → structured-summary with local LLM support.

## What Was Built
- `index.html` — Single-file web app (~230 lines)
- `README.md` — Usage documentation

## Technical Choices
- **Single HTML file:** No build step, no npm, no framework. Open in browser and it works.
- **Tailwind CSS via CDN:** Modern styling without local dependencies.
- **Vanilla JS:** No React needed — the UI is simple enough that vanilla JS is cleaner.
- **Three backend modes:** Demo (no API), OpenAI (cloud), Ollama (local). Demo mode lets anyone try it immediately.

## Features Implemented
1. ✅ Textarea for pasting raw meeting notes
2. ✅ "Load example" button with realistic community org meeting notes
3. ✅ Structured output: Summary, Decisions, Action Items (with owners/deadlines), Unresolved Questions
4. ✅ Three backend modes with privacy banners
5. ✅ Copy Markdown to clipboard
6. ✅ Download as .md file
7. ✅ Error handling for API failures
8. ✅ Loading state with spinner
9. ✅ Responsive layout (stacks on mobile)

## Testing
- Demo mode: Tested — loads example, produces formatted output
- OpenAI mode: Implemented — requires user API key to test live
- Ollama mode: Implemented — requires local Ollama instance to test live
- Copy/Download: Implemented with standard browser APIs

## Line Count
~230 lines total (well under 500 limit)

## Known Limitations
- Markdown rendering is simplified (regex-based, not a full parser)
- No persistent storage — output is lost on page refresh
- Ollama CORS may require Ollama to be started with OLLAMA_ORIGINS=* environment variable

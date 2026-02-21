# RUNNER.md — Kamunity Consulting Website
## kamunityconsulting.com rebuild · Feb 2026

---

## This Is Not The Runner

The canonical Vine-o-Code v2 engine runner lives at:

```
Kamunity-Tabletop-Plan/ENGINE/RUNNER.md
```

Read that file. It governs how you build. This file just tells you where to find it.

---

## Project-Specific Notes for the Runner

These notes supplement ENGINE/RUNNER.md for this specific project.

### Stack Difference From Default
This project uses **static HTML/CSS/vanilla JS** — NOT React + Tailwind + Vite.

Implications:
- No `npm install` required
- No `dist/` build step — deploy the working directory directly
- No component architecture — this is flat HTML files
- Netlify Forms via HTML `data-netlify="true"` attribute (no JS form handler needed)
- URL parameter routing via vanilla JS (`URLSearchParams`)

### Copy Is Locked
The front door copy in CONSTITUTION.md is the result of a human design session and is **locked**. Do not rewrite it, improve it, or simplify it. Implement it exactly as written. If you believe there is a genuine error, flag it in a HUMAN_ACTION.md — do not fix it silently.

### The Wix Site Is Still Live
kamunityconsulting.com currently points to a Wix site. Do NOT attempt DNS changes. Build and test on a Netlify temporary URL. When Phase 1 is complete and tested, create HUMAN_ACTION.md requesting domain cutover.

### Two Copy Versions
The front door has two copy versions:
- **Version 4 (default):** Serves when no URL parameter present, or `?v=ceo`
- **Version 3 (Priya):** Serves when `?v=priya` present

Implement this with vanilla JS reading `URLSearchParams` on page load. Both versions share identical HTML structure — swap only the copy text.

### Aesthetic Reference
Follow the Kamunity campfire aesthetic. Reference existing Kamunity sites for visual consistency. Key principles: warm ember tones, generous whitespace, human typography, no corporate blue, no stock photography.

### Session Start Checklist (this project)
In addition to ENGINE/RUNNER.md session checklist:
1. Read this file (done)
2. Read CONSTITUTION.md — especially the locked copy and two-door architecture
3. Read STATE.md — know what exists and what the active risks are
4. Read PHASE_QUEUE.md — find the current phase
5. Check: does STOP.md or PAUSE.md exist?

---

## Decision Authority (project-specific additions)

### AI Decides
- HTML/CSS implementation details
- Which vanilla JS pattern to use for URL parameter routing
- Visual hierarchy within the campfire aesthetic constraints

### AI Proposes, Human Decides
- Any change to the locked copy (even a single word)
- DNS/domain changes
- Addition of any analytics or tracking (default answer: no)
- Any service or tool beyond Netlify free tier

### Human Only
- DNS cutover from Wix to new site
- Any purchase or account creation
- Confirming mike@kamunityconsulting.com details

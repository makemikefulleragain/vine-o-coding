# Phase 2 Research — Make It Walkable

**Date:** 2026-02-15
**Searches used:** 5/5

---

## Research Question

What does the interactive widget need to take someone from "I want to build..." to "Here are your foundation documents and your AI assistant prompt"?

## Key Findings

### 1. Multi-Step Wizard UX for Beginners

- **Progress indicators are essential.** Users who can see where they are and how much is left complete forms at significantly higher rates (Growform, Eleken, Webstacks). Best pattern: numbered steps with labels visible at top.
- **One question per screen** reduces cognitive load. Multi-field forms per step are acceptable only if fields are clearly related (Eleken wizard pattern analysis).
- **Back/Next navigation must be obvious.** Back button should be available on every step. Next should be disabled until required fields are filled. Never auto-advance.
- **Save progress is a nice-to-have** but for a client-side tool with 5-6 steps, completion time is under 10 minutes. Not critical for Phase 2.
- **Completion celebration matters.** A clear "done" state with download/copy actions prevents the "now what?" drop-off (Duolingo pattern).

### 2. What Questions to Ask

Based on the grants-hub foundation documents as a template, the minimum viable set of questions:

| Step | Question (Maya voice) | Maps to Document |
|---|---|---|
| 1. Your Idea | "What do you want to build? Who is it for? What problem does it solve?" | MISSION.md (strategic outcome, who it's for) |
| 2. Your Users | "Who will use this? What's one specific person and their situation?" | CONSTITUTION.md (real users, personas) |
| 3. Your Boundaries | "What should this NOT do? What's out of scope?" | CONSTITUTION.md (what it's not, harm check) |
| 4. Your First Steps | "What's the most important thing to build first? What can wait?" | PHASE_QUEUE.md (phase 1-3 priorities) |
| 5. Your Setup | "Where will this be deployed? Any tools/services you already use?" | SETUP.md (infrastructure) |
| 6. Review & Download | Preview all generated documents, edit if needed, download | All documents |

This is 6 steps. Research suggests 5-7 is the sweet spot for wizard completion rates.

### 3. Companion Examples Display

- **Side-by-side comparison** works well for 2 items (NN/g, Smashing Magazine) but requires sufficient screen width. On mobile, tabs or accordion are better.
- **Inline examples > separate reference section.** Showing the example answer directly below or beside each question reduces context-switching (duck.design guided tutorial patterns).
- **Two examples is the right number.** More than 2 creates decision paralysis. One real (Grants Hub) + one relatable (Recipe Remix) covers the "proof" and "accessibility" needs.

Best pattern: Each step shows a collapsible "See examples" section with two tabs (Grants Hub | Recipe Remix). Expanded by default on desktop, collapsed on mobile.

### 4. Client-Side Document Generation & Download

- **JSZip + FileSaver.js** is the standard approach for client-side ZIP generation. Well-maintained, small footprint (~45KB). Works across all modern browsers.
- **Alternative: individual file copy.** For users who don't want a ZIP, a "Copy to clipboard" button per document is essential. Some users will paste directly into their AI assistant.
- **Template strings with variable interpolation** is sufficient for document generation. No need for a full template engine.

### 5. The Generated Documents

Based on the grants-hub foundation documents, the widget generates 6 files:

1. **CONSTITUTION.md** — Operating principles, user definition, what it's not, harm check, technical constraints (from user's answers)
2. **MISSION.md** — Strategic outcome, why it matters, who it's for, what done looks like
3. **RUNNER.md** — The AI assistant prompt (mostly boilerplate with project-specific insertions)
4. **PHASE_QUEUE.md** — First 3 phases based on user's priorities, with the standard queue structure
5. **SETUP.md** — Infrastructure steps based on user's deployment choice
6. **STATE.md** — Starting state (Phase 0 complete, no code yet)

Plus a **copyable opening prompt** — a condensed version that tells the AI assistant to read the foundation documents and begin.

### 6. What Makes Project Kickstart Tools Work (and Fail)

- **Project KickStart (software)** succeeds by "asking the right questions" and generating plans. The key insight: guided questions that help users think through their project are MORE valuable than the generated output. The thinking IS the product.
- **Failure mode: over-questioning.** If the wizard asks 20 questions, users abandon. Minimum viable questions that produce useful output.
- **Failure mode: generated output feels generic.** The documents must feel like THEIR project, not a template. Variable insertion must be natural, not "Dear [USER_NAME]".

---

## Implications for Phase 2

1. **6 steps: Idea → Users → Boundaries → First Steps → Setup → Review/Download**
2. **Progress bar with step labels** visible at top on all screen sizes
3. **Companion examples as collapsible tabs** (Grants Hub | Recipe Remix) at each step
4. **Brian lean-in sections** as expandable "Why this matters" at each step
5. **JSZip for ZIP download** + individual copy-to-clipboard per document
6. **Opening prompt** as a special prominently-displayed output
7. **Mobile-first** — the wizard must work perfectly on a phone screen

## Failure Modes to Watch

- Widget feels like a homework assignment (too many required fields)
- Generated documents feel generic/templated (need natural language generation)
- Examples overshadow user's own input (examples should inspire, not prescribe)
- Review step is overwhelming (6 documents at once — needs tabs or accordion)
- Maya doesn't understand what "foundation documents" are (explain in context, not upfront)

# Phase 6 Research — Make It Honest & Visual

**Date:** 2026-02-15
**Searches used:** 4/5
**Trigger:** Round 2 UAT feedback (7 items)

---

## UAT Feedback (7 items)

### 1. FIX — Feedback email wrong
Must be `mike@kamunityconsulting.com`, not `feedback@kamunity.ai`.

### 2. FEATURE — Animated methodology flow with "Go" button
Maya wants to SEE how the loop works — not read about it. A play-through animation that steps through RESEARCH → TRIAGE → SPEC → BUILD → CRITIQUE → CONFIDENCE → FORWARD.
**Approach:** Pure CSS/SVG animated flow. No external library. Circular or linear nodes that light up in sequence on button press.

### 3. FEATURE — Case study visuals + Brian further reading
Maya bounced from case study because no animation/characters. Brian loved the expandable boxes, wants further reading links/prompts.
**Approach:** Add the animated flow to case study as well. Add "Further reading" links in Brian notes.

### 4. UX — Desktop scroll spacing
Both testers liked whitespace but felt desktop had too much scrolling between sections.
**Approach:** Reduce section py from py-20 sm:py-28 to py-14 lg:py-20. Keep mobile spacing generous.

### 5. FEATURE — Anonymous contextual feedback widget
Email opening without asking was surprising. They want anonymous, structured, in-page feedback.
**Research:** Netlify Forms works with React SPAs:
- Hidden form in index.html for bot detection
- React submits via fetch POST with URL-encoded body
- Free tier: 100 submissions/month
- No backend code needed
**Approach:** Structured feedback panel (not email):
1. Auto-detect page
2. Emoji reaction (❤️ 🤔 💡 🐛)
3. Optional 1-line text
4. Submit to Netlify Forms
5. Under 90 seconds to complete

### 6. FIX — "5 simple questions" is untruthful
**Audit results:**
- Widget has 5 input sections (step 6 is review)
- 8 required fields across those 5 sections
- 7 optional fields
- Total: 15 fields, not 5 questions
**Fix:** Change "5 simple questions" to "a few simple questions across 5 steps" or similar truthful phrasing.

### 7. META — Truthfulness audit on all site copy
Must verify every claim on every page. No exaggeration, no misleading counts.

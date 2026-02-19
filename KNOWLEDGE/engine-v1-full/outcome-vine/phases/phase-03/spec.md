# Phase 3 Spec — Make It Learnable

**Date:** 2026-02-15

---

## Acceptance Criteria

1. A `/case-study` page exists and is accessible from the landing page and header nav.
2. The vertical timeline shows all 8 grants-hub phases with title, outcome, and expandable detail.
3. Phase 2 failure + recovery is visually distinct (amber highlight) and tells the story clearly.
4. Four methodology deep dives are accessible as expandable accordion sections.
5. A "Download Methodology Summary" button produces a usable markdown file.
6. A 9th grader can understand the timeline without reading the expanded details.
7. Brian can click into any phase or deep dive and find substantive theory.
8. Mobile responsive at 375px.
9. `npm run build` produces clean dist/ with no errors.

---

## Technical Design

### New Files

```
src/
├── pages/
│   └── CaseStudy.jsx          (case study page)
├── components/
│   ├── Timeline.jsx            (vertical timeline with expandable nodes)
│   ├── TimelineNode.jsx        (single phase node)
│   ├── DeepDives.jsx           (4 methodology deep dives)
│   └── MethodologySummary.jsx  (download button + preview)
├── lib/
│   └── timelineData.js         (grants-hub phase data)
│   └── methodologySummary.js   (downloadable markdown content)
```

### Routes Update

| Path | Component | Status |
|---|---|---|
| `/` | Home | Phase 1 (active) |
| `/widget` | Widget | Phase 2 (active) |
| `/case-study` | CaseStudy | Phase 3 (new) |

---

## Content Design

### Timeline Data (8 phases)

Each node has: phase name, title, date, status (success/failure/recovery), one-line outcome, expandable detail.

1. **Phase 1: Make It Real** — success
   - "Moved data from browser storage to a real database (Supabase). Anonymous auth. Dual storage mode."
   - Detail: normalized schema, localStorage fallback, migration path

2. **Phase 2: Make It Useful** — failure (amber)
   - "Built multi-grant management, narrative guidance, JSON export — then it all broke on deploy."
   - Detail: Babel timing bug, 7+ fix attempts, symptom-chasing, blank page on Netlify

3. **Phase 2 Review & Reflect** — recovery (amber → green)
   - "Caught the root cause: CDN + Babel architecture was untestable. Decided to rebuild the foundation."
   - Detail: Andon cord triggered, code reverted, architecture decision, Constitution amended
   - **This is the star node** — expanded by default

4. **Phase 2a: Make It Buildable** — success
   - "Replaced CDN + Babel with Vite + React. Added automated smoke tests. Cloud mode finally works."
   - Detail: 8 smoke tests, Supabase CLI, ES module imports

5. **Phase 2b: Make It Useful (rebuilt)** — success
   - "Re-implemented all Phase 2 features on the new foundation. Everything works."
   - Detail: multi-grant, narrative guidance, JSON export, 13 tests

6. **Phase 3: Make It Trustworthy** — success
   - "About page, privacy policy, FAQ, data deletion. Building trust through transparency."

7. **Phase 4: Make It Findable** — success
   - "SEO, landing hero, deployed to grants-hub.netlify.app. Now discoverable."

8. **Phase 5: User Accounts** — success
   - "Email OTP authentication. Anonymous users can save their account permanently."

### Deep Dives (4 sections)

**1. Phases Are Hypotheses**
- Maya summary: "You don't have to get it right the first time. Each step is a guess you test."
- Brian depth: Lean Startup build-measure-learn cycle. The grants-hub planned 5 phases, built 8. Phase queue is mutable. Evidence changes the plan.

**2. Confidence Scoring**
- Maya summary: "A simple checklist that tells you if you're ready to build, or if you should think more."
- Brian depth: 4 dimensions × 25 points. Research Signal, Source Convergence, Constitutional Alignment, Build Confidence. Routing thresholds (80+, 60-79, below 60). How the grants-hub Phase 2 scored 85 but still failed — what confidence scoring misses (infrastructure risk).

**3. Review & Reflect (The Andon Cord)**
- Maya summary: "When something goes wrong, you stop, figure out what happened, and fix the real problem — not just the symptom."
- Brian depth: Toyota Andon cord concept. Triggers: bug takes >2 attempts, phase fails UAT, architectural assumption proven wrong. The grants-hub Phase 2 failure as exhibit A. Process changes that came out of R&R.

**4. Human-AI Collaboration**
- Maya summary: "The AI builds. You decide. The documents are your way of telling the AI what you need."
- Brian depth: Foundation documents as the contract. The human owns the outcome; the AI owns the implementation. Kill switch (STOP.md). Why the human deploys, runs migrations, reviews content. Trust but verify.

### Methodology Summary (downloadable)

A single markdown document (~2 pages) covering:
- What Outcome Vine Coding is (3 sentences)
- The three layers (Describe → Build → Catch)
- Foundation documents (what each one does)
- The phase loop (7 steps)
- Safety mechanisms (confidence scoring, R&R, kill switch)
- The evidence (grants-hub in 2 paragraphs)
- How to start (link to the widget)

---

## Visual Design

### Timeline
- Vertical line on the left (indigo-200)
- Nodes: circles on the line, colored by status
  - Success: emerald-500
  - Failure: amber-500
  - Recovery: indigo-500
- Each node: title + one-line outcome on the right
- Expandable detail on click (slide down)
- Phase 2 R&R node: expanded by default, amber border

### Deep Dives
- Section below timeline
- Each dive: `<details>` with styled summary
- Summary shows Maya-friendly one-liner
- Expanded shows Brian's full content
- Subtle icons: Lightbulb, Target, AlertTriangle, Users

### Page Layout
- Hero section with title + intro paragraph
- Timeline section
- Deep dives section
- Methodology download section
- Link back to widget ("Ready to start? →")

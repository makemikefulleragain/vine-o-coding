# Phase 3 Critique — Make It Learnable

**Date:** 2026-02-15

---

## Constitutional Check

### 1. Real People, Real Needs
**Pass.** The case study tells the grants-hub story through the lens of what happened and what was learned — not abstract methodology. Each timeline node has a concrete outcome and lesson. Brian's deep dives connect to real theory (Lean, Toyota, Agile) but always reference the grants-hub as evidence.

### 2. Triage Still Applies
**Pass.** Research confirmed that no existing resource teaches Outcome Vine Coding specifically. The deep dives reference external concepts (Lean Startup, Andon cord) by name so Brian can look them up, rather than re-explaining them fully.

### 3. Progressive Enhancement
**Pass.** Site builds cleanly with all three pages. Each page works independently. The landing page, widget, and case study are accessible via direct URL thanks to _redirects.

### 4. Evidence Changes the Plan
**Partially testable.** The case study format (timeline + accordion) was informed by research on interactive timelines and teaching patterns. But no users have seen it yet.

### 5. Sovereignty
**Pass.** Methodology summary download is client-side. No tracking, no analytics.

### 6. Harm Check
**Pass.** The case study is honest about the Phase 2 failure. The deep dives don't oversell the methodology — they explain what it catches and what it misses (confidence scoring gap for infrastructure risk).

### 7. Ship It
**Pass.** Clean build. Deployable dist/.

---

## Bias Check

| Potential Bias | Assessment |
|---|---|
| Grants-hub as only evidence | Present — the methodology has been proven on exactly one project. The case study is honest about this but it's still a single data point. Phase 5 (user feedback) will generate more evidence. |
| Australian-centric case study | Present — grants-hub serves Australian nonprofits. The methodology is universal but the proof is local. Acceptable for now. |
| Assuming Brian reads English academic prose | Partially mitigated — deep dives use plain language but reference Lean Startup, Toyota, Agile by name. A non-English reader could search these terms. |
| Technology-specific examples | Mitigated — the case study mentions Vite, React, Supabase but the methodology deep dives are technology-agnostic. |

## Clarity Check (9th Grader Test)

- **Timeline intro:** "Click any phase to see what happened." ✓ Clear instruction.
- **Phase titles:** "Make It Real", "Make It Useful — FAILED", "The Andon Cord" — ✓ Descriptive, intriguing.
- **Phase outcomes:** One-sentence summaries are clear without jargon.
- **Phase details:** Technical when expanded (Supabase, RLS, Babel) — this is Brian territory, and that's fine. Maya doesn't need to expand.
- **Lesson callouts:** "Start with the infrastructure that makes everything else possible." ✓ Maya-friendly takeaway.
- **Deep dive summaries:** "You don't have to get it right the first time." ✓ Clear.
- **Deep dive Brian content:** Technical and theoretical. Appropriate for the audience.

**Verdict:** Maya can read the timeline summaries and lessons and understand the story. Brian can expand into technical detail and theory. The two-layer design works.

## What I Learned

1. **The timeline is more powerful than a blog post.** Seeing 8 phases in sequence — with a failure in the middle — tells a story that no amount of explanation could match. "Things went wrong and the method handled it" is more credible when you can click and see exactly what happened.

2. **The "Lesson" callouts are the MVP of the timeline.** Even if Maya never expands a node, the lesson text teaches the methodology's values: "Start with infrastructure", "Good research survives architectural changes", "A great tool nobody can find helps nobody."

3. **Four deep dives is the right number.** Research suggested these four concepts (hypotheses, scoring, R&R, collaboration) as the core differentiators. More would dilute the message.

4. **The methodology summary download fills a real gap.** Workshop facilitators and curious Brian-types need a reference document. Markdown is the right format — flexible, portable, no special software needed.

5. **Bundle size growth is minimal.** Phase 3 added 25KB raw / 8KB gzip — all content, no new dependencies. The custom timeline components are lightweight.

# Phase 1 Critique — Make It Clear

**Date:** 2026-02-15

---

## Constitutional Check

### 1. Real People, Real Needs
**Pass.** The landing page speaks to Maya first. The headline ("Build real things with AI — even if you've never coded before") directly addresses someone who has never coded. The three process cards use analogies (forms, Lego, spell-check) that connect to everyday experience.

### 2. Triage Still Applies
**Pass.** Research confirmed no existing methodology site fills this gap. We're not duplicating work. The grants-hub link sends people to the live proof rather than rebuilding the explanation.

### 3. Progressive Enhancement
**Pass.** The site builds cleanly, the dist/ folder is deployable. The "Start Building" button is honestly disabled with a "Soon" badge. No broken promises.

### 4. Evidence Changes the Plan
**Not yet testable.** No users have seen this page. Phase 1 establishes the baseline for future evidence to change.

### 5. Sovereignty
**Pass.** No tracking, no analytics, no external calls. Pure static HTML/CSS/JS.

### 6. Harm Check
**Pass.** The page doesn't promise "build anything" — it says "turn your idea into a working app" with method-based language. The proof section honestly mentions the Phase 2 failure. No hype language.

### 7. Ship It
**Pass.** Build produces clean dist/. Ready for Netlify drag-and-drop.

---

## Bias Check

| Potential Bias | Assessment |
|---|---|
| Assuming English literacy | Present — no i18n. Acceptable for Phase 1 given personas are English-speaking. Flag for Phase 5. |
| Assuming desktop access | Mitigated — Tailwind mobile-first. Cards stack on mobile. Touch-friendly CTA buttons. |
| Assuming tech comfort | Mitigated — no jargon in visible text. "AI coding assistant" is the most technical phrase, and it's self-explanatory. |
| Australia-centric proof | Present — grants-hub is Australian nonprofits. The methodology is universal but the only proof is local. Acceptable for Phase 1. |
| Assuming visual ability | Partially mitigated — semantic HTML, alt text on icons via Lucide aria-labels. Could improve with explicit ARIA landmarks. |

## Clarity Check (9th Grader Test)

Reading the page aloud as Maya:

- **Hero:** "Build real things with AI — even if you've never coded before." ✓ Clear.
- **Subheadline:** "...helps you turn your idea into a working app. You describe what you need, AI does the building..." ✓ Clear. No jargon.
- **Process Card 1:** "Answer simple questions about your project." ✓ Maya knows what this means.
- **Process Card 2:** "Each step is small and testable." ✓ "Testable" might be slightly technical. The Lego analogy saves it.
- **Process Card 3:** "Built-in checkpoints ask: does this still match what you need?" ✓ Clear.
- **Proof:** "8 phases... 1 failure caught and fixed... Live now." ✓ Concrete, not abstract.

**Verdict:** A 9th grader could explain this as: "It's a way to use AI to build an app, step by step, and it checks your work along the way."

## What I Learned

1. **The three-layer simplification works.** "Describe → Build → Catch" is more intuitive than "Foundation Documents → Phase Loop → Safety Mechanisms." Keep Maya-friendly labels as the primary voice throughout.

2. **The failure story is powerful.** The "1 failure caught and fixed" stat card is more compelling than listing 8 successes. Real users will resonate with "things can go wrong and the method handles it."

3. **The disabled CTA is honest but frustrating.** Maya lands on the page, gets excited, and... can't do anything yet. Phase 2 (the widget) should be the immediate next priority. This validates the phase queue order.

4. **JS bundle is 244KB / 77KB gzipped.** Lucide React tree-shaking is working (only imported icons are bundled) but the base React + Router bundle is significant. Not a problem for Phase 1 but worth watching.

5. **No Brian content exists yet** — and that's fine. The landing page shouldn't have it. Brian's depth comes when there's something to go deep on (Phase 2 widget, Phase 3 case study).

# Phase 7 Research — Make It Rich & Shareable

**Date:** 2026-02-15
**Trigger:** Round 3 UAT feedback from both testers (Maya + Brian personas)

---

## Raw UAT Feedback

### Feedback Item 1: Deep Dive cards hide lessons + further reading
**Source:** Both testers
**Current state:** DeepDives.jsx uses `<details>` elements. When collapsed, only the icon, title, and Maya one-liner are visible. Brian's paragraphs AND the further reading links are hidden inside the expandable.
**User request:** Lessons (key takeaways) and further reading links should be **visible on load**. Only the detailed paragraphs should be in the expandable section.
**Reasoning:** Users want to scan the key insights and links without clicking. The expandable should be for "want to go deeper" detail, not for the primary value.

### Feedback Item 2: Deep Dive expanded content is "wall of text"
**Source:** Both testers
**Current state:** When expanded, Brian's content is 4-5 paragraphs of plain text with no visual breaks.
**User request:** Style each expanded dive like a "mini magazine" with:
- Headlines / subheadings breaking up the text
- Pull-out quote boxes (key insights highlighted visually)
- Contextually relevant visuals or illustrations with captions
- Less wall-of-text, more scannable layout
**Reasoning:** Even Brian (the deeper reader) found the expanded content dense. Visual hierarchy and images make it engaging and shareable.

### Feedback Item 3: This website IS a case study — include it
**Source:** Both testers
**Current state:** The case study page only covers the Community Grants Hub (grants-hub). The vine-o-coding site itself was built using the exact same methodology but isn't documented.
**User request:** Include vine-o-coding as a second, live case study. Treat it like a development blog post that people could follow and share.
**Key insight from user:** "This is a secret weapon for good" — if people share the development story, it drives visitors → feedback → more builds → compound growth.
**User's thesis:** The case study should read like a blog post with images, code snippets, and the visual richness you'd expect from a shareable article.

---

## Research Assessment

### Item 1: Deep Dive restructure
- **Feasibility:** High. This is a data restructuring + component refactor. Move `lessons` and `links` outside `<details>`, keep `brian` paragraphs inside.
- **Complexity:** Low-medium. Need to add a `lessons` field to each dive (extracted from brian paragraphs), restructure the JSX layout.
- **Risk:** Low. No new dependencies.

### Item 2: Magazine-style expanded content
- **Feasibility:** Medium-high. Tailwind can achieve pull-out boxes, blockquotes, and visual hierarchy. Images/illustrations are the challenge — we have no image assets.
- **Approach options:**
  - **A) Lucide icons as visual anchors** — each section gets a relevant icon or decorative element. Lightweight, no new assets.
  - **B) Emoji/unicode as visual breaks** — zero-cost visual markers.
  - **C) Placeholder illustration areas** — mark where images would go, fill later.
  - **D) CSS-only decorative elements** — gradient boxes, colored borders, background patterns for pull-quotes.
- **Recommendation:** Combine A + D. Lucide icons for context, CSS pull-quote boxes for key insights, subheadings to break text. No external images needed.
- **Risk:** Medium. "Magazine" is subjective. May need iteration.

### Item 3: Vine-o-coding as live case study
- **Feasibility:** High for a static version. We have all the phase docs (phases/phase-01 through phase-07).
- **Scope risk:** HIGH. A "blog post with images and code snippets" is significant content creation. The phase docs exist but need editorial curation for a public-facing narrative.
- **Approach options:**
  - **A) Full blog-style page** — new route `/our-story` or similar. Curated narrative from phase docs. Big scope.
  - **B) Second timeline on case study page** — vine-o-coding gets its own timeline section alongside grants-hub. Medium scope.
  - **C) "Meta" callout section** — short section on case study page acknowledging vine-o-coding was built the same way, with link to phase docs. Small scope.
  - **D) Separate blog page with phase-by-phase entries** — each phase becomes a blog entry. Large scope but high shareability.
- **Recommendation:** Start with B (second timeline) + a "Development Blog" section that links to the phase docs. Can evolve into D later based on feedback.
- **Risk:** Content quality. Raw phase docs are internal, not editorial. Need to write human-readable summaries.

---

## Constitutional Alignment Check

| Principle | Assessment |
|---|---|
| Real People, Real Needs | Both testers asked for these changes. Direct evidence. |
| Triage Still Applies | Item 2 (magazine style) has subjective scope — needs careful AC. |
| Progressive Enhancement | All changes enhance existing content, don't break anything. |
| Evidence Changes the Plan | "This site is a case study" is a genuine insight from users. |
| Sovereignty | No new data collection. No tracking. |
| Harm Check | No false claims. Content restructure only. |
| Ship It | All items are shippable incrementally. |

---

## Signal Summary

| Item | Evidence Strength | Feasibility | Priority |
|---|---|---|---|
| Deep dive restructure (visible lessons + links) | Strong (both testers) | High | P0 |
| Magazine-style expanded content | Strong (both testers) | Medium-High | P1 |
| Vine-o-coding as live case study | Strong (both testers + user thesis) | Medium | P2 |

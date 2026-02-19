# Phase 8 Critique — Make It Smooth & Navigable

**Date:** 2026-02-15

---

## Constitutional Check

### 1. Real People, Real Needs
**Strong pass.** Both items from real UAT. Flicker is a usability bug affecting all visitors. Page length was flagged by the tester — not an internal preference.

### 2. Triage Still Applies
**Pass.** Built P0 (flicker) first, then P1 (page split + nav). No over-engineering.

### 3. Progressive Enhancement
**Pass.** All 6 routes work. Old `/case-study` URL still works (now just Grants Hub content). No broken links. Site deployable throughout.

### 4. Evidence Changes the Plan
**Strong pass.** Phase 8 wouldn't exist without Round 4 UAT. The page split was user-driven, not internally planned.

### 5. Sovereignty
**Pass.** No new data collection. No new tracking.

### 6. Harm Check
**Pass.** Security headers from Phase 7 R&R still in place. AI Privacy Notice still in widget. No new risk introduced.

### 7. Ship It
**Pass.** Clean build. Deployed. 0 errors.

---

## Bias Check

| Potential Bias | Assessment |
|---|---|
| 3-page split may fragment content | Mitigated by cross-linking CTAs between pages. Each page is self-contained. |
| "Our Story" could be seen as self-promotional | It's framed as a live case study for the methodology, not marketing. Matches user suggestion from Round 3. |
| Mobile hamburger hides navigation | Industry standard. "Start Building" CTA stays visible outside hamburger. |
| Method page has no case study content | By design — it explains HOW, not WHERE. CTA links to case study for proof. |

## What I Learned

1. **CSS transitions > keyframe animations for scroll-triggered reveals.** Transitions don't have the fill-mode/delay flicker problem. The old approach (keyframes + forwards fill + delay) created a race condition between class swap and animation start.

2. **One page, one purpose.** The case study page was doing 4 jobs: explain method, show grants-hub story, show vine story, provide summary download. Users noticed the bloat before we did.

3. **Mobile nav becomes essential at 4+ links.** Two links fit inline. Four links plus a CTA button don't. The hamburger was a necessary consequence of splitting pages.

# Phase 1 Triage — Make It Clear

**Date:** 2026-02-15

---

## What's the Highest-Value Thing to Build?

A single-page landing site (React + Tailwind + Vite) that:
1. Explains Outcome Vine Coding in under 60 seconds
2. Shows the three-layer methodology visually
3. Links to the live grants-hub as proof
4. Is deployed to Netlify

This is the scaffolding AND the first real content. Everything future phases add (widget, case study, SEO) builds on this foundation.

## Does Something Already Exist?

**No.** Research confirmed no methodology site exists for AI-assisted coding. Tool comparison guides and prompt tutorials exist, but nothing teaches a structured *process* for non-programmers to follow. This is a genuine gap.

We should NOT:
- Link to freeCodeCamp or Codecademy (they teach coding, not AI-assisted building)
- Link to Replit (it's a locked-in platform, not a methodology)
- Try to repurpose the grants-hub About page (different audience, different purpose)

## Is the Phase Goal Still Right?

**Yes.** Research validates that if we can't explain the methodology simply and compellingly, nothing else matters. The "would Maya stay on this page?" test is exactly right.

**One adjustment:** The original scope mentioned "visual overview of the three layers." Research suggests using Maya-friendly labels instead of methodology terms:

| Methodology Term | Maya-Friendly Label |
|---|---|
| Foundation Documents | "Describe what you want to build" |
| Phase Loop | "Build it one step at a time" |
| Safety Mechanisms | "Catch problems before they grow" |

The methodology terms can appear as subtle labels or Brian-depth later. The landing page leads with what Maya *does*, not what the system *is*.

## What's NOT in Scope for Phase 1

- The interactive widget (Phase 2)
- Brian's lean-in expandable sections (Phase 2-3)
- Case study deep dive (Phase 3)
- SEO optimization (Phase 4)
- Recipe Remix example detail (Phase 2)

## Technical Decision: Scaffold from Scratch

The project has no `src/`, no `package.json`. Phase 1 must scaffold the full Vite + React + Tailwind project. This is infrastructure work that enables every future phase.

**Stack decisions:**
- Vite 6 (latest stable, fast, grants-hub uses Vite 7 — either is fine)
- React 19 (current, matches grants-hub)
- Tailwind CSS 4 (latest, utility-first)
- React Router DOM (for future page routing — install now, use minimally)
- Lucide React for icons (lightweight, modern)

## Risk Assessment

| Risk | Likelihood | Mitigation |
|---|---|---|
| Over-engineering the landing page | Medium | Strict scope: hero, process, proof, CTA. Nothing else. |
| Jargon creep | Medium | Apply the "Maya reads this aloud" test to every sentence. |
| Build system issues | Low | Vite + React is well-trodden. Grants-hub proved it works. |
| Mobile layout broken | Medium | Tailwind mobile-first. Test at 375px width. |

## Decision: BUILD

Confidence is high. The research supports the approach. Proceed to SPEC.

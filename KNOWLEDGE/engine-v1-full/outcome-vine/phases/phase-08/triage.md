# Phase 8 Triage — Make It Smooth & Navigable

**Date:** 2026-02-15

---

## Items from Research

| # | Item | Priority | Effort | Depends On |
|---|---|---|---|---|
| 1 | Fix FadeIn flicker (transition instead of keyframes) | **P0** | Small | Nothing |
| 2 | Split case study into separate pages + update nav | **P1** | Medium | Nothing |
| 3 | Mobile-friendly nav (hamburger or condensed) | **P1** | Small | Item 2 |

## Build Order

1. **Item 1 first** — affects all pages, quick win, eliminates the most visible UX bug
2. **Item 2 + 3 together** — routing restructure + nav update are coupled; mobile nav needed once we add more links

## Page Structure Decision

Split into:
- `/method` — How the method works (MethodologyFlow + MethodologySummary + CTA)
- `/case-study` — Grants Hub story (Hero + Timeline + DeepDives + CTA)
- `/our-story` — How this site was built (Vine timeline + "ongoing story" callout + CTA)

Nav becomes: **Method** | **Case Study** | **Our Story** | **About** + **Start Building** button

Mobile: collapse to hamburger menu at `sm` breakpoint.

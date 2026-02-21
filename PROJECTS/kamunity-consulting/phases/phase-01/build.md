# Phase 01 — Build
## kamunity-consulting · Front Door + Behind the Doors + Mike Page

**Date:** 2026-02-20
**Engine step:** BUILD
**Attempt:** 1 of 3

---

## What Was Built

Phases 1, 2, and 3 delivered together in a single build (justified in triage.md — all content available, no dead-end buttons on launch).

### Files Created

```
PROJECTS/kamunity-consulting/
  .gitignore                    ← excludes .netlify/, *.zip, OS/editor files
  netlify.toml                  ← publish = "site", clean URL redirects, security headers
  site/
    index.html                  ← Phase 1: front door with URL parameter routing
    fix.html                    ← Phase 2: red door (QA/improvement)
    impossible.html             ← Phase 2: blue door (innovation/AI)
    about.html                  ← Phase 3: Mike page
    css/
      style.css                 ← campfire design system (shared)
    js/
      version.js                ← URL parameter copy routing
```

### Phase 1 — Front Door

`index.html` delivers:
- Full viewport hero (`100dvh`) — above the fold on mobile, no scroll required
- `js/version.js` reads `URLSearchParams` on DOMContentLoaded
  - `?v=priya` → Version 3 copy (Priya)
  - Default / `?v=ceo` → Version 4 copy (CEO)
- Both copy versions use exact locked text from CONSTITUTION.md — no paraphrase
- Shared copy block (lines 4–9) in static HTML — no JS swap needed
- Two door buttons: ember red (fix.html) + deep blue (impossible.html)
- Proof whisper below buttons: RAC $500k + WA Health hackathon
- No tracking scripts, no Google Fonts, no cookies
- Security headers via netlify.toml (X-Frame-Options, CSP, Referrer-Policy)

### Phase 2 — Behind the Doors

`fix.html` delivers:
- Red door: QA, process improvement, strategy, team alignment
- Mike's voice — "pub description" paragraph
- Proof block: RAC $500k / WALGA / ALIKE strategy
- Netlify form (`data-netlify="true"`) — name, org, email, situation textarea
- Honeypot bot field
- Cross-link to impossible.html

`impossible.html` delivers:
- Blue door: design sprints, hackathons, AI integration, human-centred design
- AI sovereignty framing (constitutional, community-owned)
- Proof block: WA Health hackathon / Youth placemaking / Western Power / Life Without Barriers
- Same Netlify form structure
- Cross-link to fix.html

### Phase 3 — Mike Page

`about.html` delivers:
- Glasgow chugger origin story
- Quality systems arc (not a CV)
- Post-modern structuralist / anti-enshittification framing
- Career range as proof (brewing → mining → education → disability → community)
- Captain America framing implicit (methodology not hero)
- Photo placeholder (flagged in HUMAN_ACTION.md)
- Cross-link to K.org ecosystem
- Door choice buttons at bottom

### Design System

`css/style.css`:
- Campfire palette: parchment backgrounds, ember reds, deep sky blue, warm ink
- Georgia serif for headings — honest, warm, human
- System font sans-serif for body — no Google Fonts, no external requests
- Mobile-first responsive — layouts stack on mobile, row on ≥600px
- WCAG 2.1 AA: minimum 44px tap targets, focus-visible outlines, prefers-reduced-motion

---

## Deployed

**Production URL:** https://kamunity-consulting-new.netlify.app
**Admin:** https://app.netlify.com/projects/kamunity-consulting-new
**Site ID:** 58c1e640-1879-432e-91a9-577bf78e03bd
**Deploy:** 699881b45fd4f74cde25362b

Netlify Forms will activate once forms receive their first submission against the deployed site.

---

## Decisions Logged

- Phases 1+2+3 built together — no dead-end front door on launch
- No dark mode — public-facing site is warm cream, not internal dark ops theme
- System fonts only — no Google Fonts dependency
- Door 1 = ember red (#C2410C), Door 2 = deep sky blue (#1E40AF) — within campfire aesthetic
- Photo placeholder in about.html rather than omitting the layout space entirely
- `netlify.toml` security headers applied at build level — no JS required for CSP

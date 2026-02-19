# Phase 3 Triage — The Services

## Highest-Value Build

Build service pages with transparent pricing, consent-first contact flow, emoji feedback widget, and SEO foundations.

## Triage Decisions

### Services: 3 tiers with transparent pricing
1. **AI Awareness Workshop** (team training) — half-day, fixed price
2. **AI Strategy Session** (1:1 with leadership) — 90-minute session, fixed price  
3. **Full AI Readiness Mapping** (comprehensive org assessment) — multi-day engagement

### Contact: Consent-first email (no server-side forms for contact)
- Button triggers consent dialog before opening mailto: link
- Respects sovereignty principle — no data stored by the site
- Netlify form ONLY for anonymous emoji feedback (not contact)

### Feedback: Netlify Forms with emoji + optional text
- 3 emoji reactions: 😊 🤔 😟
- Optional text field
- Anonymous — no email required
- Appears on results page and toolkit pages

### SEO: Lightweight foundations
- Per-page document.title updates
- Static OG tags in index.html
- sitemap.xml and robots.txt
- JSON-LD Organisation schema

### Security: Review pass
- Dependency audit (npm audit)
- CSP headers in netlify.toml
- No user input stored — minimal attack surface

## Phase Goal: CONFIRMED — proceed to spec.

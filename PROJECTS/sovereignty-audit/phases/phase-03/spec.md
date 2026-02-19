# Phase 3 Spec — Services + Trust + Findability

**Date:** 2026-02-17

---

## Acceptance Criteria

### Pages
1. **About page** (`/about`) — who we are, mission, experience, team, values
2. **Services page** (`/services`) — 3 tiers with transparent pricing, NFP and corporate rates
3. **Privacy policy** (`/privacy`) — plain-language, emphasises zero data collection
4. **FAQ page** (`/faq`) — common questions with expandable answers

### Findability
5. **llms.txt** at `/llms.txt` — markdown file describing the project for LLMs
6. **JSON-LD** in `index.html` — Organization + WebSite schemas
7. **Open Graph meta tags** — title, description, image placeholder, type
8. **robots.txt** — allow all crawlers
9. **Sitemap** — list of all pages

### Navigation
10. Header nav updated with About link
11. Footer updated with links to About, Services, Privacy, FAQ

### Integration
12. Results page CTA updated to link to Services page instead of external URL
13. All toolkit guide CTAs updated to link to Services page

### Non-regression
14. Build succeeds
15. Existing audit + toolkit flows unchanged

---

## Content Spec

### About Page
- Kamunity Consulting: who we are
- 30 years of experience in community organisations
- Small, dedicated team + growing network
- Currently working with local government peak body
- Building for The Pack Music Australia
- Speaking to community peak bodies and micro-NFPs
- Mission: digital sovereignty for community orgs
- Values: transparency, sovereignty, community-first

### Services Page — Three Tiers

**Tier 1: Free**
- Digital Sovereignty Audit (the tool itself)
- Toolkit guides (data ownership, vendor lock-in, cost transparency, AI safety)
- Price: $0

**Tier 2: Workshops**
- Half-day digital sovereignty workshop for your team
- Covers: tool audit, AI safety, vendor assessment, action planning
- Delivered in-person (Perth/Fremantle metro) or online
- NFP rate: $500-800 (half day)
- Corporate rate: $1,500-2,000 (half day)

**Tier 3: Consulting**
- Full digital sovereignty audit and transition support
- Includes: comprehensive tool review, vendor negotiations, migration planning, staff training
- Ongoing support available
- NFP rate: from $2,000
- Corporate rate: from $5,000
- Scoped to your needs — "here's exactly what you get"

### Privacy Policy
- We don't collect personal information
- The audit runs entirely in your browser
- No cookies, no analytics, no tracking
- No third-party scripts
- External links go to third-party sites (their policies apply)
- Contact info for questions

### FAQ Topics
- What is digital sovereignty?
- Who is this audit for?
- Is my data safe?
- How long does the audit take?
- What do the scores mean?
- Do I need to create an account?
- Can I share my results?
- Who built this?
- What if I need more help?
- Is this really free?

---

## Technical Design

### New Files
```
src/components/
  About.jsx
  Services.jsx
  Privacy.jsx
  FAQ.jsx
public/
  llms.txt
  robots.txt
  sitemap.xml
```

### Updated Files
- `index.html` — JSON-LD, OG tags
- `App.jsx` — new routes
- `Layout.jsx` — updated nav and footer
- `Results.jsx` — CTA links to /services
- All toolkit guides — CTA links to /services

# Phase 4 Build Log: Make It Findable

**Date:** 2026-02-14
**Deployed URL:** https://grants-hub.netlify.app

---

## What Was Built

### 1. SEO Meta Tags (`index.html`)
- `<html lang="en-AU">` for locale targeting
- `<title>` with target keywords: "Grant Acquittal Helper — Free Grant Reporting Tool for Australian Nonprofits"
- `<meta name="description">` targeting: grant acquittal, Australian nonprofits, community groups, budget tracking, bank import, acquittal reports
- `<meta name="theme-color">` (#4338ca — indigo)
- `<link rel="canonical">` pointing to deployed URL

### 2. Open Graph + Twitter Card (`index.html`)
- og:title, og:description, og:type, og:url, og:locale, og:site_name
- twitter:card (summary), twitter:title, twitter:description
- Enables rich previews when shared on social media or messaging apps

### 3. JSON-LD Structured Data (`index.html`)
- Schema.org `SoftwareApplication` type
- applicationCategory: FinanceApplication
- operatingSystem: Web
- Free pricing (AUD)
- Author: Kamunity (kamunity.ai)
- Audience: Small Australian nonprofits, community groups, volunteer treasurers

### 4. Netlify Deploy Configuration
- `netlify.toml` — build command (`npm run build`), publish dir (`dist`)
- `public/_redirects` — SPA catch-all rewrite (`/* /index.html 200`)
- Both belt-and-suspenders to ensure SPA routing works on Netlify

### 5. Crawl Hygiene
- `public/robots.txt` — allows all crawlers, links to sitemap
- `public/sitemap.xml` — single URL entry for the app

### 6. Landing Hero (GrantListView empty state)
Replaced minimal "No grants yet" with a marketing-style landing page for first-time visitors:
- Headline: "Track Your Grant Spending. Generate Acquittal Reports."
- Subhead: free tool, no sign-up, start in seconds
- 4 feature cards: Budget Tracking, CSV Bank Import, Narrative Guidance, Printable Reports
- CTA: "Create Your First Grant" button
- Trust footer: "No sign-up required · Your data stays yours · Export anytime"

### 7. Deployment
- Deployed via Netlify dashboard (drag & drop of `dist/` folder)
- Live at https://grants-hub.netlify.app
- HTTPS active (Netlify default)
- Note: Supabase env vars not yet set on Netlify — site falls back to browser-only mode until configured

## Files Created/Changed

| File | Change |
|---|---|
| `index.html` | SEO meta tags, OG, Twitter Card, JSON-LD structured data |
| `netlify.toml` | New: Netlify build config + SPA redirect |
| `public/_redirects` | New: SPA catch-all rewrite |
| `public/robots.txt` | New: allow all crawlers + sitemap link |
| `public/sitemap.xml` | New: single URL entry |
| `src/components/GrantListView.jsx` | Landing hero replaces minimal empty state |
| `phases/phase-04/research.md` | 4 findings from web research |
| `phases/phase-04/triage.md` | 6 decisions |
| `phases/phase-04/spec.md` | 9 acceptance criteria |
| `phases/phase-04/HUMAN_ACTION.md` | Deploy + env var instructions |

## Testing Notes

- `npm run smoke` — **13/13 tests pass**
- `npm run build` — **81 modules, 0 errors**
- UAT: User deployed via drag-and-drop, confirmed Netlify green/published, quick UAT confirmed all works like dev

## UAT Result

**PASS** — Site live at https://grants-hub.netlify.app. User confirmed functionality matches dev environment.

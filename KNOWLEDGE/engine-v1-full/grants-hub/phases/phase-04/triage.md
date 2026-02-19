# Phase 4 Triage: Make It Findable

**Date:** 2026-02-14

---

## Decision 1: Deploy to Netlify

**Critical — the gate for everything else.** Build in this order:
1. Add `netlify.toml` with build config
2. Add `public/_redirects` for SPA routing
3. Deploy via Netlify

## Decision 2: SEO Meta Tags + Open Graph

Add to `index.html`:
- `<title>` — "Grant Acquittal Helper — Free Grant Reporting Tool for Australian Nonprofits"
- `<meta name="description">` — target keywords naturally
- Open Graph tags (og:title, og:description, og:type, og:url, og:image)
- Twitter Card tags
- `<meta name="theme-color">` for mobile
- `<html lang="en-AU">` for locale

## Decision 3: Structured Data (JSON-LD)

Add `SoftwareApplication` schema to index.html:
- applicationCategory: "FinanceApplication"
- operatingSystem: "Web"
- offers: free
- Target audience: Australian nonprofits

## Decision 4: robots.txt + sitemap.xml

- `public/robots.txt` — allow all crawlers
- `public/sitemap.xml` — single URL (the app)

## Decision 5: Landing Hero for First-Time Visitors

Currently the app loads straight into the grant list (or empty state). A first-time visitor needs context:
- What is this tool?
- Who is it for?
- What does it do?
- Call to action: "Start Tracking Your Grant"

This should appear ONLY when there are no grants (first visit). The existing empty state in GrantListView is too minimal.

## Decision 6: Defer

- **Nonprofit directory listings** — requires human outreach, not code
- **Blog/content marketing** — out of scope for a build phase
- **Pre-rendering/SSR** — overkill for a single-page app tool

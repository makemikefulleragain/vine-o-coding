# Phase 4 Triage — Make It Findable

**Date:** 2026-02-15

---

## Highest-Value Build

1. Enhanced index.html with OG tags, Twitter Card, JSON-LD structured data
2. Per-route document.title via custom hook
3. netlify.toml with build config and caching headers
4. robots.txt + sitemap.xml
5. Cross-linking note for grants-hub (human action)

## What's NOT in scope
- Pre-rendering / SSG (overkill for 3 pages)
- react-helmet-async (custom hook is lighter for 3 routes)
- Blog/content section (Phase 5)
- Directory submissions (human action)
- Google Search Console setup (human action)

## Decision: BUILD
Straightforward configuration work. Proceed directly to build.

# Phase 4 Build Log — Make It Findable

**Date:** 2026-02-15
**Build attempt:** 1 of 3

---

## What Was Built

### New Files
| File | Purpose |
|---|---|
| `src/hooks/useDocTitle.js` | Custom hook for per-route document.title |
| `public/robots.txt` | Crawler permissions + sitemap reference |
| `public/sitemap.xml` | 3 URLs with priorities |
| `netlify.toml` | Build config, SPA redirect, cache headers for hashed assets |

### Files Modified
| File | Change |
|---|---|
| `index.html` | OG tags, Twitter Card, JSON-LD WebApplication schema |
| `src/pages/Home.jsx` | useDocTitle('Build real things with AI') |
| `src/pages/Widget.jsx` | useDocTitle('Start Building') |
| `src/pages/CaseStudy.jsx` | useDocTitle('Case Study — How the Grants Hub Was Built') |

### Files Removed
| File | Reason |
|---|---|
| `public/_redirects` | Replaced by netlify.toml [[redirects]] |

### Build Output
```
dist/index.html                   2.23 kB │ gzip:   0.78 kB
dist/assets/index-CaxKxbwJ.css   32.22 kB │ gzip:   6.23 kB
dist/assets/index-D66kkBJ6.js   417.47 kB │ gzip: 129.92 kB
✓ built in 10.48s
```

0 errors. dist/ contains: index.html, favicon.svg, robots.txt, sitemap.xml, assets/.

## Design Decisions
1. **Custom useDocTitle hook** instead of react-helmet-async — zero new dependencies for a 3-page site.
2. **OG/Twitter in static index.html** — social crawlers don't execute JS, so defaults must be in HTML. Per-route OG would require pre-rendering (overkill).
3. **netlify.toml** replaces _redirects — single config for build, redirects, and cache headers.
4. **Immutable cache on hashed assets** — Vite hashes filenames, so max-age=31536000 is safe.
5. **Placeholder URL** (outcome-vine.netlify.app) — human will update after first deploy if site name differs.

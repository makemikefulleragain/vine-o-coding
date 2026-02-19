# Phase 4 Spec — Make It Findable

**Date:** 2026-02-15

---

## Acceptance Criteria

1. Each page has a unique document.title visible in the browser tab.
2. index.html contains Open Graph and Twitter Card meta tags with site-wide defaults.
3. JSON-LD structured data (WebApplication) is present in index.html.
4. robots.txt allows all crawlers and references sitemap.
5. sitemap.xml lists all 3 routes with correct URLs.
6. netlify.toml configures build command, publish dir, and SPA redirect.
7. Static assets get long cache headers (immutable for hashed files).
8. `npm run build` produces clean dist/ with all SEO files.

---

## Technical Design

### index.html enhancements
- `<title>` tag (default)
- `<meta name="description">` (already exists)
- Open Graph: og:title, og:description, og:type, og:url, og:image
- Twitter Card: twitter:card, twitter:title, twitter:description
- JSON-LD: WebApplication schema with name, description, url, applicationCategory

### Custom useDocTitle hook
- `src/hooks/useDocTitle.js` — calls `document.title = title` on mount
- Used in each page component

### New/modified files
- `index.html` — enhanced meta tags + JSON-LD
- `src/hooks/useDocTitle.js` — custom hook
- `src/pages/Home.jsx`, `Widget.jsx`, `CaseStudy.jsx` — add useDocTitle
- `public/robots.txt` — allow all + sitemap reference
- `public/sitemap.xml` — 3 URLs
- `netlify.toml` — build config + headers + redirect
- Remove `public/_redirects` (replaced by netlify.toml)

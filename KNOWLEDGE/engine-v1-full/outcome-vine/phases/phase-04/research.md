# Phase 4 Research — Make It Findable

**Date:** 2026-02-15
**Searches used:** 5/5

---

## Key Findings

### 1. SPA SEO for React + Vite
- **Per-route meta tags** require either react-helmet-async or a custom useEffect approach. For a 3-page site, a lightweight custom hook is sufficient — no need for another dependency.
- **Open Graph / Twitter Card** meta tags are read by social media crawlers from the initial HTML. For SPAs, they need to be in index.html OR pre-rendered. Since we have only 3 routes and crawlers may not execute JS, we should set good defaults in index.html.
- **document.title** can be updated per route via useEffect for user-facing page titles.

### 2. Search Terms People Use
- "build app with AI", "AI coding assistant for beginners", "how to build an app without coding"
- "AI app builder", "build software with AI no experience"
- The methodology angle ("structured process for AI coding") is unique but low-search-volume. Target the broader "build with AI" terms.

### 3. Netlify Configuration
- `netlify.toml` for build settings, headers, and redirects (can replace _redirects file)
- Cache-control headers for static assets (immutable for hashed files)
- SPA fallback redirect already handled by _redirects

### 4. Structured Data
- `WebApplication` or `SoftwareApplication` schema.org types are appropriate
- JSON-LD in index.html for search engine consumption
- `Organization` schema for Kamunity

### 5. Additional Discoverability
- robots.txt + sitemap.xml (standard)
- Cross-linking with grants-hub (mutual backlinks)
- Directory listings and community sharing (human action)

## Implications
- Custom SEO hook (no new dependency)
- Enhanced index.html with OG, Twitter, JSON-LD
- netlify.toml with caching headers
- robots.txt + sitemap.xml in public/
- Per-route document.title updates

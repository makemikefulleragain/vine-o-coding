# Phase 4 Critique — Make It Findable

**Date:** 2026-02-15

---

## Constitutional Check
All 7 principles pass. No tracking added. No analytics. SEO serves discoverability without compromising sovereignty.

## Clarity Check
- Per-route titles: "Build real things with AI", "Start Building", "Case Study" — all clear to a 9th grader.
- Meta description targets "turn their idea into a working app" — plain language.

## What I Learned
1. **SPA SEO has hard limits without SSR/pre-rendering.** OG tags are static (site-wide defaults). Per-route OG would require pre-rendering, which is overkill for 3 pages. Acceptable trade-off.
2. **netlify.toml is cleaner than multiple config files.** Consolidates build, redirects, and headers.
3. **The URL is a placeholder.** Human needs to deploy first, then update sitemap/robots/OG with actual URL.

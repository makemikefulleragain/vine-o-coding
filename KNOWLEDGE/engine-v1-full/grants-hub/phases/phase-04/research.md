# Phase 4 Research: Make It Findable

**Date:** 2026-02-14
**Searches used:** 4/5

---

## Research Question
How do small Australian nonprofits discover tools, and what's needed to make the Grant Acquittal Helper findable?

---

## Finding 1: Real Search Terms Exist for Grant Acquittal

**Sources:** Google search results for "grant acquittal template Australia"

Real organisations and government bodies are publishing grant acquittal content:
- Good Things Foundation: "Grant Acquittal Template" (Word doc download)
- City of Ryde: "Writing a Grant Acquittal Report" (how-to guide)
- RSM Australia: "Preparing for a grant acquittal audit" (professional advice)

This confirms that **"grant acquittal" is an active search term** in Australia. People are looking for templates, guides, and tools. Our tool sits naturally in this search space.

**Target keywords:**
- "grant acquittal template Australia"
- "grant acquittal report template"
- "free grant reporting tool nonprofit"
- "grant expense tracker community groups"
- "acquittal report template free"

## Finding 2: SPA SEO Requires Static Meta Tags

**Sources:** DEV Community (SEO for React+Vite), Macrometa (SPA SEO challenges)

Single Page Applications face a core SEO challenge: crawlers see empty HTML before JavaScript runs. Solutions:
1. **Static meta tags in index.html** — title, description, OG tags baked into the HTML file at build time. Crawlers read these immediately.
2. **Structured data (JSON-LD)** — helps Google understand what the page is (a software application/tool).
3. **Pre-rendering is overkill** for our use case — we have one page (the app), not a content site. Static meta tags are sufficient.

## Finding 3: Netlify Deploys Vite SPAs with Minimal Config

**Sources:** Netlify docs (Vite on Netlify), Vite static deploy guide

Key requirements:
- Build command: `npm run build`
- Publish directory: `dist`
- **Critical for SPA:** Must add a rewrite rule `/* /index.html 200` so that direct links to /about, /privacy, /faq don't 404
- Can use `netlify.toml` or `public/_redirects` file
- HTTPS provided by default on Netlify

## Finding 4: Discovery Channels for Australian Nonprofits

**Sources:** TechSoup, Reddit r/nonprofit, Neon One

Small nonprofits discover tools through:
1. **Google search** — #1 channel. Treasurer searches "grant acquittal template" or "free grant tracking tool"
2. **Word of mouth** — committee members share tools they've found
3. **Nonprofit directories** — TechSoup, Connecting Up (now Infoxchange), Our Community
4. **Peak bodies** — WACOSS, Volunteering Australia, state councils of social service

For Phase 4, Google search is the actionable channel. Directories and peak bodies require human outreach (future phase).

---

## Candidate Actions (Ranked)

| Action | Findability Impact | Effort | Priority |
|--------|-------------------|--------|----------|
| Deploy to Netlify (live URL) | Critical — can't find what doesn't exist | Low | **1st** |
| Meta tags + OG in index.html | High — enables search indexing + social sharing | Low | **2nd** |
| SPA redirect rule | Critical — prevents 404s on direct links | Trivial | **3rd** |
| Structured data (JSON-LD) | Medium — helps Google understand the tool | Low | **4th** |
| robots.txt + sitemap | Medium — basic crawl hygiene | Trivial | **5th** |
| Landing/hero section for first-time visitors | High — context before the app | Medium | **6th** |

---

## Key Insight

The tool already exists and works. The single highest-impact action is simply **putting it on a URL**. Everything else (SEO, OG tags, structured data) amplifies that, but deployment is the gate. A volunteer treasurer Googling "grant acquittal template Australia free" should find this tool on the first page — and that starts with having a deployed, crawlable page with the right meta tags.

# Phase 3 → Phase 4 Proposal

**Date:** 2026-02-15

---

## What Phase 3 Taught Us

1. **The timeline is the most compelling content on the site.** Eight phases with a failure in the middle tells a story that no explanation could match. This should be prominently linked from everywhere.

2. **The two-layer content design (Maya summary + Brian depth) works consistently** across the widget (Brian notes) and case study (deep dives). It's become a design pattern for the whole site.

3. **The methodology summary fills a real gap.** It's the first complete, portable description of Outcome Vine Coding. Workshop facilitators, curious developers, and sharing-via-link all benefit.

4. **Bundle size is well-controlled.** Three phases of development, 417KB total (130KB gzip). No bloat.

5. **The site now has three complete pages:** landing (explain), widget (use), case study (understand). This is the core product.

## Proposed Phase 4: Make It Findable

**Goal:** Ensure people who could benefit from this methodology can find the site.

**This aligns with the original Phase 4 in PHASE_QUEUE.md.**

### What Should Be Built

1. **SEO meta tags** — title, description, Open Graph, Twitter Card for all 3 pages
2. **JSON-LD structured data** — SoftwareApplication or WebApplication schema
3. **Sitemap.xml + robots.txt**
4. **Netlify deploy configuration** (netlify.toml)
5. **Cross-linking** — grants-hub About page should link to outcome-vine; outcome-vine already links to grants-hub
6. **Page-specific meta** — each route gets unique title/description

### Research Questions
- What do people search for when they want to "build an app with AI"?
- Which directories or communities would benefit from knowing about this?
- Should we add a blog/content section for SEO? (probably Phase 5)

## Queue Status

No changes to PHASE_QUEUE.md needed. Phase 4 as written is correct.

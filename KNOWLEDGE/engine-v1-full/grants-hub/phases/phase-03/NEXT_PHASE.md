# Next Phase Proposal: Phase 4 — Make It Findable

**Date:** 2026-02-14

---

## Why This Phase

The tool is now functional (Phase 2b/2b+) and trustworthy (Phase 3). But nobody can find it. It exists only as a localhost dev server. To serve real volunteer treasurers, it needs to be deployed, discoverable, and shareable.

## Goals

1. **Deploy to production** — Netlify with a proper URL (subdomain of kamunity.ai or standalone)
2. **SEO basics** — meta tags, Open Graph, structured data so it appears in search results
3. **Landing page** — the current app loads straight into the grant tool. A first-time visitor needs context before they start using it
4. **Shareability** — a URL that a committee chair can send to their treasurer with a message like "try this for our acquittal"

## What Research Should Explore

- How do small Australian nonprofits discover tools? (Word of mouth? Google? Nonprofit directories like Connecting Up, TechSoup?)
- What SEO terms would a volunteer treasurer search for? ("grant acquittal template Australia"? "free grant reporting tool"?)
- Should the tool live at grants.kamunity.ai, kamunity.ai/grants, or a standalone domain?
- Do we need a landing/marketing page separate from the app itself?

## Dependencies

- **Human action:** Netlify deploy, DNS configuration for custom domain
- **Human decision:** URL structure and domain choice
- **No database changes expected**

## Risks

- SEO takes time — the tool won't appear in Google overnight
- A landing page adds scope — keep it minimal (one page, not a marketing site)
- The anonymous auth limitation means shared URLs don't share data — each visitor gets their own session

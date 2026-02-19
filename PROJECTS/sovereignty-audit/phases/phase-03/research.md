# Phase 3 Research — Services Layer + Trust & Security + Findability

**Date:** 2026-02-17
**Searches used:** 5/5

---

## Key Findings

### 1. llms.txt Specification
- **Source:** llmstxt.org (official spec)
- **Format:** Markdown file at `/llms.txt` with:
  - H1 with project/site name (required)
  - Blockquote with short summary
  - Sections with file lists of URLs for further detail
  - Optional section for secondary info that can be skipped
- **Purpose:** Helps LLMs understand website content at inference time (not training)
- **Complements robots.txt and sitemap.xml** — different purpose
- **Takeaway:** Create a `/llms.txt` file describing the Kamunity AI Audit, its purpose, ecosystem links, and key pages. Also create markdown-accessible versions of key content.

### 2. NFP Consulting Pricing
- **Sources:** Nonprofit.ist 2025 survey, NFP Success AU, Charity Consultants AU
- **Patterns observed:**
  - Transparent pricing is rare but highly valued in the NFP sector
  - Tiered models work: DIY (free) → Workshop (affordable) → Full engagement (paid)
  - NFP/community rates vs corporate rates is standard practice
  - Hourly rates for NFP consultants range widely ($100-300/hr AU depending on specialisation)
  - Package pricing preferred over hourly for defined engagements
- **Takeaway:** Three clear tiers matching the audit → toolkit → consulting pipeline. Show NFP rates prominently. Corporate rate clearly higher. No hidden costs.

### 3. Privacy Policy (No Data Collection)
- **Sources:** FreePrivacyPolicy.com, Business Victoria template, Privacy Policy Generator
- **Key insight:** Even sites that collect NO data should have a privacy policy because:
  - It builds trust
  - It explicitly states what you DON'T do (which is reassuring)
  - Australian Privacy Principles apply to organisations with >$3M revenue, but best practice for all
- **Pattern for zero-data sites:**
  - State clearly: "We do not collect personal information"
  - Note: "This tool runs entirely in your browser"
  - Mention: no cookies, no analytics, no third-party scripts
  - Link to: OAIC for users who want to know their rights
- **Takeaway:** Short, plain-language privacy policy emphasising what we DON'T do. Transparency builds trust.

### 4. JSON-LD Structured Data
- **Sources:** Schema.org, SEO Design Lab, Salt Agency
- **Recommended schemas for a consulting service site:**
  - `Organization` — name, URL, logo, social links, description
  - `WebSite` — site name, URL, search action
  - `Service` — consulting service descriptions
  - `FAQPage` — FAQ content (rich results eligible)
- **Takeaway:** Add JSON-LD to `index.html` for Organization and WebSite. Add FAQPage schema to FAQ section.

### 5. Ecosystem Disambiguation
- **From PHASE_QUEUE.md requirement:** Site must be clearly Kamunity Consulting (Australia), NOT:
  - Kamunity in Sweden
  - European Reddit (Kamunity)
  - Kamunity.io (finance platform)
- **Approach:** Strong branding, clear "Australian" and "community organisations" language, structured data linking to kamunity.ai, kamunity.org, kamunityconsulting.com

---

## Design Decisions

1. **Services page** with 3 tiers: Free (audit+toolkit), Workshop, Consulting
2. **About page** with team, mission, values, experience
3. **Privacy policy** — short, plain language, emphasising zero data collection
4. **FAQ** with FAQPage schema markup
5. **llms.txt** at `/llms.txt` describing the project and linking key pages
6. **JSON-LD** structured data in `index.html`
7. **Meta tags** and Open Graph for social sharing

# Phase 4 Research — Content & Growth Infrastructure

**Date:** 2026-02-17
**Searches used:** 3/5

---

## Key Findings

### 1. Shareable Results (Client-Side)
- **html2canvas** can generate screenshots of React components — but adds ~400kB dependency
- **Web Share API** (native browser API) can share text/URLs without any library
- **Copy-to-clipboard** is the simplest sharing mechanism — works everywhere
- **Decision:** Use native Web Share API (where available) + copy-to-clipboard fallback. Skip html2canvas to keep bundle small. Generate a text summary instead of an image.

### 2. Print-Friendly Results
- CSS `@media print` is the simplest approach — no dependencies
- Hide nav, footer, buttons; show results content cleanly
- Priya can print/PDF her results for board meetings
- **Decision:** Add print stylesheet. Zero dependency addition.

### 3. Email Capture (Resend)
- Resend requires a server-side API call (API key can't be exposed client-side)
- Would need Netlify Functions (serverless) to proxy the API call
- Adds complexity: environment variables, serverless function, consent flow
- **Decision:** Defer full Resend integration. Instead, add a simple "stay updated" section that links to kamunityconsulting.com contact. Keep the site fully static for now. This respects the sovereignty principle — we shouldn't collect emails before we have a clear reason and proper consent infrastructure.

### 4. Seed Content
- PHASE_QUEUE.md mentions: initial clients, 30 years experience, growing network, local government peak body, The Pack Music Australia
- Content types: testimonials, case studies, blog posts
- For a static site without CMS, content can be JSX components with data files
- **Decision:** Create a lightweight content section with seed content: 2-3 case study summaries, a "What we're seeing" insights section. Content lives in data files for easy future extraction to CMS.

---

## Phase 4 Scope Decision

Focus on **immediate value, zero new dependencies**:
1. ✅ Shareable results (text summary + Web Share API + clipboard)
2. ✅ Print-friendly results (CSS @media print)
3. ✅ Seed content section (insights/case studies page)
4. ✅ Updated HUMAN_ACTION for deployment
5. ❌ Resend email integration (defer — needs backend, consent flow)
6. ❌ Admin CMS (defer — needs backend, auth)
7. ❌ Social media content generation (defer — needs more content first)

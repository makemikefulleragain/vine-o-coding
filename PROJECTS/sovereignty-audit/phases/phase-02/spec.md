# Phase 2 Spec — The Free Toolkit

**Date:** 2026-02-17

---

## Acceptance Criteria

1. **Toolkit index page** at `/toolkit` listing all four guides
2. **Four guide pages** at `/toolkit/data-ownership`, `/toolkit/vendor-lockin`, `/toolkit/cost-transparency`, `/toolkit/ai-readiness`
3. **Results page updated** to link relevant guides from each dimension's recommendations
4. **Each guide includes:**
   - Context paragraph (why this matters)
   - Actionable checklist items
   - External resource links (opens in new tab)
   - "Need help?" CTA section
5. **Navigation updated** with Toolkit link in header
6. **Landing page updated** to mention the toolkit
7. **Zero data transmission** maintained — all content is static
8. **Build succeeds** — `npm run build` produces working `dist/`
9. **Existing audit flow unchanged** — no regressions

---

## Content Spec

### Guide 1: Data Ownership Checklist
- Admin access audit (who has access, who shouldn't)
- Data export test (can you actually export?)
- Tool-by-tool data ownership mapping
- Links: Google Takeout, Microsoft data export, general backup guides

### Guide 2: Vendor Lock-in Assessment
- Digital tool inventory template (name, cost, what it does, who manages it, can you export)
- Microsoft 365 licensing changes summary (July 2025)
- Google Workspace for Nonprofits as alternative
- Decision framework: when to stay vs switch
- Links: AlternativeTo.net, TechSoup

### Guide 3: Cost Transparency Toolkit
- Monthly digital spend audit checklist
- Nonprofit discount directory (key programs with direct links)
- Hidden costs checklist (staff time, training, workarounds)
- Grant reporting tips for digital spend
- Links: TechSoup, Google for Nonprofits, Microsoft Nonprofits, Canva Nonprofits

### Guide 4: AI Safety Starter Kit
- One-page AI use policy template (fill-in-the-blanks)
- Safe vs unsafe: what to enter into AI tools
- Privacy settings checklist for common AI tools
- "When NOT to use AI" list
- Links: Candid.org AI policy guide, OAIC (Australian privacy)

---

## Technical Design

### New Files
```
src/
  components/
    Toolkit.jsx         — Index page listing all guides
    guides/
      DataOwnership.jsx — Data ownership checklist
      VendorLockin.jsx  — Vendor lock-in assessment  
      CostTransparency.jsx — Cost transparency toolkit
      AIReadiness.jsx   — AI safety starter kit
  data/
    toolkit.js          — Guide metadata (titles, descriptions, icons)
```

### Updated Files
- `App.jsx` — add toolkit routes
- `Layout.jsx` — add Toolkit nav link
- `Results.jsx` — add guide links per dimension
- `Landing.jsx` — mention toolkit in relevant section

### Routing
- `/toolkit` — index page
- `/toolkit/data-ownership` — guide
- `/toolkit/vendor-lockin` — guide
- `/toolkit/cost-transparency` — guide
- `/toolkit/ai-readiness` — guide

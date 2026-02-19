# Phase 2 Critique — The Free Toolkit

**Date:** 2026-02-17

---

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Content written for Priya's context — plain language, no jargon, actionable checklists
- Microsoft 365 licensing changes are immediately relevant (July 2025)
- AI policy template addresses the #1 gap (85% of nonprofits lack one)
- Nonprofit discount directory is immediately money-saving
- Each guide respects the "30 minutes a week" constraint

### 2. Triage Still Applies ✅
- Linked to TechSoup, Google for Nonprofits, Microsoft Nonprofits, Candid.org, OAIC, AlternativeTo rather than rebuilding their content
- Built original content only where a gap exists for community orgs
- AI policy template fills a genuine gap — existing templates are enterprise/legal-focused

### 3. Progressive Enhancement ✅
- Build passes cleanly (54 modules, 89.73 kB gzipped)
- Phase 1 audit flow completely unchanged — no regressions
- New routes added alongside existing ones
- Navigation updated without breaking existing paths

### 4. Evidence Changes the Plan ✅
- Research confirmed all four guide topics are high-value
- Microsoft licensing changes emerged as critical timely content
- "Only 15% have AI policy" stat validated the AI Starter Kit priority
- Phase queue remains valid — Phase 3 (Services Layer) is the right next step

### 5. Sovereignty ✅
- Zero new data transmission — all content is static JSX
- No tracking added to toolkit pages
- Checkboxes are UI-only (not persisted anywhere)
- External links open in new tabs with rel="noopener noreferrer"

### 6. Harm Check ✅
- AI guide explicitly warns about sensitive data in AI tools
- "When NOT to use AI" list covers crisis, trauma, case notes, HR decisions
- Self-hosted AI mentioned as option for very sensitive orgs (without overselling it)
- Every guide includes "this isn't professional advice" framing where appropriate

### 7. Ship It ✅
- Build succeeds, all routes working, Netlify-ready
- Site is in a fully deployable state

---

## Bias Check

### Potential biases:
1. **Australia-centric** — Nonprofit discount programs may differ by country. Mitigated: most programs listed are global, and we note "Australian Privacy Principles" specifically.
2. **Google/Microsoft framing** — Guides assume these are the main platforms. Accurate for most AU NFPs but could alienate orgs using other tools. Mitigated: AlternativeTo link provided.
3. **AI policy template tone** — Balances encouragement with caution. Could lean too permissive for high-risk orgs or too restrictive for low-risk ones. Mitigated: "When NOT to use AI" section and sensitive data advisory.

---

## What I Learned

1. **Timely content is powerful.** The Microsoft licensing changes (July 2025) make the vendor lock-in guide immediately relevant — not abstract.
2. **Link, don't rebuild.** Linking to TechSoup/Google/Candid etc. adds credibility and saves build time while providing more depth than we could create.
3. **Templates > guides.** The AI policy template is more immediately useful than a guide about AI policies would be.
4. **Interactive checklists feel actionable.** Even though the checkboxes don't persist, they make the content feel like a tool rather than an article.

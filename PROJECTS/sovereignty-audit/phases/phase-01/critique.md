# Phase 1 Critique — The Free Audit

**Date:** 2026-02-17

---

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Questions are written in Priya's language — no jargon, no technical terms without explanation
- Help text on every question provides context
- 10 questions = ~2 minutes (matches spec)
- Results give specific, actionable recommendations — not abstract scores

### 2. Triage Still Applies ✅
- Checked TechSoup, SUSE, Infoxchange — nothing existing fits this exact niche
- Built from scratch because the value is in the questions and recommendations, not the tech
- Linked to kamunityconsulting.com rather than rebuilding a services page

### 3. Progressive Enhancement ✅
- Site builds successfully, produces deployable `dist/`
- Netlify `_redirects` in place for SPA routing
- No breaking changes possible — this is the first build

### 4. Evidence Changes the Plan ✅
- Research confirmed the approach: maturity map, not grades (SUSE pattern)
- Named stages (NN/G pattern) implemented
- Phase queue unchanged — research validated the hypothesis

### 5. Sovereignty ✅
- Zero data transmission — verified no API calls, no fetch, no XHR
- No cookies, no localStorage (results live in React state only)
- No third-party scripts, no analytics, no tracking pixels
- No Google Fonts loaded (using system fonts)
- Privacy commitment displayed in footer, landing page, quiz, and results

### 6. Harm Check ✅
- Sensitive data warning triggers when AI data handling score is low
- Warning explicitly says "talk to a specialist" and "this is a conversation starter, not a compliance assessment"
- No organisational data stored anywhere
- Additional note warns about entering client data into AI tools

### 7. Ship It ✅
- `npm run build` produces clean output
- Dev server running and testable
- Ready for Netlify deployment

---

## Bias Check

### Potential biases in scoring:
1. **Google/Microsoft assumption** — Questions assume most orgs use Google or Microsoft. This is accurate for Australian NFPs but may need adjustment for orgs using other platforms.
2. **AI readiness scoring** — Q8 gives 4 points for "not using AI" (higher than "using without discussion" at 2 points). This is intentional: not using AI is safer than using it without awareness. But it could undervalue orgs actively experimenting.
3. **Single-provider penalty** — Q4 penalises single-provider setups, but for tiny orgs, one provider (e.g., Google Workspace) might actually be the most practical choice. The recommendation text accounts for this.

### Mitigations:
- Recommendations are nuanced, not just "change everything"
- Scores are a "map" not a "grade" — framing reduces judgement
- Sensitive data flag adds appropriate caution

---

## What I Learned

1. **The questions are the product.** The tech is trivial; the value is in asking the right things in the right way.
2. **Named stages matter more than numbers.** "Aware" is more useful than "38/100" for Priya.
3. **Privacy commitment needs to be visible everywhere.** This audience needs to trust the tool before they'll use it.
4. **2 minutes is tight but achievable** with 10 questions if options are clear and scannable.

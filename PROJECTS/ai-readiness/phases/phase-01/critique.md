# Phase 1 Critique — The Quiz

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Questions use plain English — no jargon like "data governance" or "ML pipeline"
- Scenarios match Priya's reality: team discussions, staff using tools, leadership support
- 2-minute completion time respects her "15 minutes between meetings" constraint
- Results give actionable next steps, not abstract scores

### 2. Triage Still Applies ✅
- Confirmed no existing tool serves this audience (5 searches, 6 tools reviewed)
- Built from scratch because nothing could be adapted — the gap is real
- Recommendations point to Kamunity's own resources (prompt kit, guides) and to seeking specialist help where appropriate — not trying to replace specialists

### 3. Progressive Enhancement ✅
- Site builds and deploys from Phase 1
- Landing page, quiz, and results are complete and functional
- No broken stubs or "coming soon" pages — everything works

### 4. Evidence Changes the Plan ✅
- Research confirmed the 4 dimensions are appropriate for community orgs
- Research confirmed 4-point Likert (not 5) to avoid neutral clustering
- No evidence suggesting a different Phase 1 approach was needed

### 5. Sovereignty ✅
- Zero data collection — no analytics, no cookies, no localStorage (yet)
- No email gates, no contact forms, no tracking pixels
- Footer explicitly states: "No data is collected or stored"
- All computation happens in the browser

### 6. Harm Check ✅
- Sensitive data warning triggers when Safety & Ethics questions score low
- Warning explicitly names vulnerable populations: family violence, health, homelessness, children
- Funder note on both landing and results: "AI readiness scores should not be used as a gate or requirement"
- Quiz is positioned as "a starting point, not a substitute for professional guidance"
- No organisational data collected or stored

### 7. Ship It ✅
- `npm run build` succeeds on first attempt
- `dist/` is ready for Netlify deploy
- All routes work, all interactions functional

---

## Bias Check

### Language Bias
- **Reviewed:** Questions avoid assuming orgs have IT departments, data teams, or dedicated tech staff
- **Reviewed:** No questions assume prior AI experience — even "Just Starting" is framed positively
- **Reviewed:** Recommendations don't assume budget availability — free resources prioritised
- **Risk:** Questions assume English proficiency. Future phases could consider language accessibility.

### Scoring Bias
- **Reviewed:** 4-point scale prevents "safe middle" answers
- **Reviewed:** Low scores are never framed as failure — "You're at the beginning, and that's perfectly fine"
- **Risk:** Self-assessment inherently reflects individual perception, not organisational reality. This is acknowledged by positioning it as a "conversation starter"

### Structural Bias
- **Reviewed:** Questions don't penalise orgs that have consciously chosen NOT to use AI
- **Risk:** The quiz implicitly frames AI adoption as desirable. Mitigation: recommendations include "seek specialist advice" for sensitive contexts, not just "adopt AI faster"

---

## What I Learned

1. **The gap is real and large.** No tool exists for community sector AI readiness. Enterprise tools dominate, and they're useless for Priya.
2. **Plain language is hard but critical.** Every question went through a mental "would Priya understand this without Googling?" filter.
3. **The sensitive data warning is the most important feature.** Community orgs handle deeply sensitive data. The quiz must never encourage careless AI adoption.
4. **4 dimensions at 3 questions each is the sweet spot.** Enough signal to be useful, short enough to complete between meetings.
5. **Recharts radar works well** but adds significant bundle weight. Worth monitoring.

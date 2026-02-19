# Phase 3 Critique — The Services

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Pricing transparent and accessible for community sector
- Discovery call is free — no barrier to first conversation
- Pricing note acknowledges budget constraints and offers flexibility
- Services described in plain language, not consulting jargon

### 2. Triage Still Applies ✅
- Links to kamunityconsulting.com for broader consulting context
- Not duplicating services available elsewhere
- Consent-first contact uses native email — no new infrastructure needed

### 3. Progressive Enhancement ✅
- Quiz and toolkit continue to work perfectly
- Services page adds a sustainability pathway without changing existing functionality
- Feedback widget adds value to results page without disruption

### 4. Evidence Changes the Plan ✅
- Pricing informed by NFP consulting market research
- Contact flow designed around consent-first principles from research
- SEO approach matched to React SPA limitations

### 5. Sovereignty ✅
- Contact button uses mailto: — no data stored on server
- Feedback widget is anonymous — no email, no name
- Netlify Forms used only for anonymous feedback, not contact
- Security headers block framing and enforce privacy

### 6. Harm Check ✅
- Services positioned as support, not as gatekeeping
- No pressure to buy — free quiz and toolkit remain primary offering
- Pricing note: "If budget is a barrier, talk to us"
- No data collected through contact flow
- Honeypot field for bot protection on feedback form

### 7. Ship It ✅
- Build succeeds on first attempt
- Deployed to production with security headers
- All routes work, feedback form configured

---

## Bias Check

### Pricing Bias
- **Reviewed:** Prices set within community sector norms, not corporate rates
- **Reviewed:** "If budget is a barrier, talk to us" addresses financial accessibility
- **Risk:** Prices may still be high for very small volunteer-only orgs. Mitigated by free quiz + toolkit being the core offering.

### Geographic Bias
- **Reviewed:** In-person noted as "Perth metro" with virtual option for all services
- **Risk:** Most community orgs outside Perth metro would need virtual only. Adequately addressed.

### Service Description Bias
- **Reviewed:** No assumption that orgs should buy services — quiz and toolkit are complete on their own
- **Reviewed:** Testimonials section empty — no fabricated social proof

---

## What I Learned

1. **Consent-first contact is simple and effective** — modal before mailto: is minimal code, maximum respect.
2. **Anonymous feedback is the right call** — aligns with sovereignty, still provides useful signal.
3. **Security headers are easy wins** — minimal effort, meaningful protection.
4. **Transparent pricing builds trust** — especially in a sector used to hidden consulting costs.

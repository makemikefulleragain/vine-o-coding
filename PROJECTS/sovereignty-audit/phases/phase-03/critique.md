# Phase 3 Critique — Services + Trust + Findability

**Date:** 2026-02-17

---

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Services page shows transparent pricing at rates designed for NFPs
- About page tells Priya who's behind the tool (builds trust before engagement)
- FAQ answers the questions Priya would actually ask ("Is this really free?", "Is my data safe?")
- Privacy policy written in plain language, not legal jargon

### 2. Triage Still Applies ✅
- llms.txt follows the official spec (llmstxt.org) rather than inventing a custom format
- JSON-LD uses standard Schema.org types
- Didn't build a CMS or blog — that's Phase 4 territory
- Services page links to kamunityconsulting.com for booking rather than building a booking system

### 3. Progressive Enhancement ✅
- Build passes cleanly (58 modules, 95.6 kB gzipped)
- All Phase 1 (audit) and Phase 2 (toolkit) routes work unchanged
- New pages added without modifying existing functionality
- Navigation expanded cleanly on desktop, collapses appropriately on mobile

### 4. Evidence Changes the Plan ✅
- llms.txt research confirmed the spec and format
- Privacy policy pattern validated by multiple Australian sources
- NFP consulting pricing ranges validated by Nonprofit.ist 2025 survey data
- Phase 3 was large per PHASE_QUEUE.md — triaged CMS/social media to Phase 4

### 5. Sovereignty ✅
- Zero new data collection
- Privacy policy explicitly states what we DON'T do
- Netlify hosting disclosure is transparent and honest
- No new third-party scripts added

### 6. Harm Check ✅
- Privacy policy distinguishes between audit tool (zero data) and consulting services (separate policy)
- Pricing doesn't exploit NFP budget constraints — rates are clearly marked
- "Is this really free? What's the catch?" FAQ addresses trust directly
- llms.txt explicitly disambiguates from Kamunity Sweden, European Reddit, Kamunity.io

### 7. Ship It ✅
- Build succeeds, all routes working, Netlify-ready
- Site is in a fully deployable state with all trust, services, and findability elements

---

## Bias Check

### Potential biases:
1. **Pricing assumptions** — Workshop $500-800 and Consulting from $2,000 are estimates. These may need adjustment based on actual market feedback. Mitigated: presented as ranges, not fixed prices.
2. **Australian focus** — llms.txt and structured data emphasise Australian context. This is intentional per the user base but limits international discoverability. Acceptable trade-off.
3. **Self-referential trust** — "30+ years of experience" and "currently working with..." are claims that can't be independently verified from the site alone. Testimonials and case studies (Phase 4) will strengthen this.

---

## What I Learned

1. **llms.txt is a real differentiator.** Most small sites don't have one. For a tool about digital sovereignty, being AI-legible demonstrates competence.
2. **Privacy policy as trust signal.** For a zero-data-collection site, the privacy policy is actually a marketing document — it tells users what you DON'T do, which is reassuring.
3. **Three-tier pricing maps perfectly to the audit funnel.** Free audit → free toolkit → paid workshop → paid consulting. Each step builds trust before asking for money.
4. **FAQ with Schema.org FAQPage markup** gives SEO benefit while also serving user needs. Double value.
5. **Ecosystem disambiguation matters.** Without explicit statements in llms.txt and structured data, LLMs could confuse this with Kamunity Sweden or Kamunity.io.

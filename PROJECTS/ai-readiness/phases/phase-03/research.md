# Phase 3 Research — The Services

## Search Summary (5/5 searches used)

1. "community sector consulting pricing Australia NFP workshop strategy session transparent pricing"
2. "consent-first contact form UX best practices email privacy"
3. "Netlify forms setup emoji reaction feedback widget static site"
4. "SEO meta tags Open Graph structured data React SPA"
5. "kamunity consulting AI community organisations Australia services"

---

## Key Findings

### Kamunity Consulting Brand
- kamunityconsulting.com exists — broader CX/EX/stakeholder consulting firm
- 30+ years experience in quality assurance, operational improvement, human-centred change
- Already has free guides for CX, EX, and Stakeholder Experience
- AI Readiness site is a companion/specialist offering, not a replacement
- Email: mike@kamunityconsulting.com (from PHASE_QUEUE)

### NFP Consulting Pricing in Australia
- Workshop (half-day/full-day): $1,500–$3,000 typical for NFP sector
- Strategy sessions: $500–$1,500
- Full assessments/mappings: $3,000–$10,000+
- Community sector expects lower rates than corporate — transparent pricing builds trust
- Many NFP consultants offer "discovery calls" as free entry point

### Contact Flow — Consent-First
- PHASE_QUEUE specifies: "ask for consent to send email before opening email"
- Best practice: show what will happen BEFORE triggering mailto: link
- Pattern: Button → consent modal ("We'll open your email app to contact mike@kamunityconsulting.com. No data is stored.") → proceed/cancel
- No server-side form needed for email contact — keeps sovereignty principle intact

### Netlify Forms for Feedback
- PHASE_QUEUE specifies: "netlify 3 emoji and optional text"
- Netlify Forms work with React SPAs by adding a hidden HTML form in index.html
- AJAX submission from React component
- Free tier: 100 submissions/month — more than enough
- Pattern: 3 emoji buttons (😊 🤔 😟) + optional text field + submit

### SEO for React SPA
- Title and meta description per route using document.title
- Open Graph tags in index.html (static — same for all routes in SPA)
- Sitemap.xml for crawlers
- robots.txt
- Structured data (JSON-LD) for Organisation schema
- Pre-rendering not needed for this scale — content is all static React

---

## Research Signal: STRONG
Clear requirements from PHASE_QUEUE. Kamunity Consulting brand context understood. Technical approach for forms, SEO, and contact flow validated.

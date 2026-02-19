# Phase 3 Spec — The Services

## Acceptance Criteria

1. **Services page** at `/services` with 3 service tiers, transparent pricing, and clear CTAs
2. **Consent-first contact** — clicking "Get in Touch" shows consent message before opening email
3. **Emoji feedback widget** — Netlify Forms, 3 emoji + optional text, on results and toolkit pages
4. **Testimonials section** — empty but structured, ready to populate
5. **SEO foundations** — page titles, OG tags, sitemap, robots.txt, JSON-LD
6. **Security headers** — CSP, X-Frame-Options in netlify.toml
7. **Navigation updated** — Services link in header
8. **Builds and deploys** — `npm run build` succeeds

## Service Tiers

### 1. AI Awareness Workshop
- **Price:** $1,500 (half-day) / $2,500 (full-day)
- **What:** Hands-on workshop for your whole team
- **Includes:** AI basics, safety guidelines, prompt practice, Q&A, follow-up resource pack
- **For:** Teams of 5-20 people
- **Format:** In-person (Perth metro) or virtual

### 2. AI Strategy Session
- **Price:** $500 (90 minutes)
- **What:** 1:1 session with leadership to map AI priorities
- **Includes:** Pre-session questionnaire, facilitated session, written summary with recommendations
- **For:** CEOs, operations managers, board members
- **Format:** Virtual or in-person

### 3. Full AI Readiness Mapping
- **Price:** From $3,500
- **What:** Comprehensive organisational assessment
- **Includes:** Staff interviews, systems review, risk assessment, custom roadmap, 3-month follow-up
- **For:** Organisations ready to develop a formal AI strategy
- **Format:** Blended (virtual + in-person)

### Free: Discovery Call
- 30 minutes, no obligation
- Available for all tiers

## Contact Flow

```
[Get in Touch] button
    → Modal/dialog:
      "We'll open your email app to contact mike@kamunityconsulting.com.
       No information is stored on this site."
      [Open Email] [Cancel]
    → mailto:mike@kamunityconsulting.com?subject=AI%20Readiness%20Enquiry
```

## Feedback Widget

```
"Was this helpful?"
[😊] [🤔] [😟]
[Optional: Tell us more... ]
[Send Feedback]
```

- Netlify Forms submission (AJAX)
- Hidden HTML form in index.html for Netlify detection
- Fields: emoji (string), message (string, optional)
- No email, no name — fully anonymous
- Success: "Thanks for your feedback!"

## Technical Design

### New Routes
- `/services` — Service tiers + pricing + testimonials + contact

### New Components
```
src/
  components/
    Services.jsx          # Service tiers, pricing, testimonials, CTA
    ContactButton.jsx     # Consent-first email button with modal
    FeedbackWidget.jsx    # Emoji + text Netlify Forms widget
    PageTitle.jsx         # Sets document.title per route
```

### SEO Files
```
public/
  sitemap.xml
  robots.txt
```

### netlify.toml Updates
- Security headers: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
- Cache headers for static assets

### Navigation Update
- Add "Services" link to header nav between Toolkit and Quiz button

# Phase 3 Build Log: Make It Trustworthy

**Date:** 2026-02-14

---

## What Was Built

### 1. About Page (`src/components/AboutPage.jsx`)
- Who built it: Kamunity (kamunity.ai) — linked
- Why it exists: small orgs shouldn't need expensive software for grant acquittals
- "What's the catch?" section: no ads, no tracking, no data selling, no sign-up, exportable data
- How it's built: React + Supabase (linked), encryption details
- Trust question answered: "Can I trust it with my grant data?" — links to Privacy
- Financial advice disclaimer
- Linked to kamunity.ai for more about the team

### 2. Privacy Page (`src/components/PrivacyPage.jsx`)
- Plain English — not legalese
- What data is collected: grant details, categories, expenses, narrative text
- What is NOT collected (green callout): no name, email, phone, IP, bank details
- Cloud mode explained: Supabase, HTTPS/TLS, AES-256, Row Level Security
- Browser-only mode explained: localStorage, never leaves device
- Anonymous auth explained: random session ID, no email/password, implications of clearing browser
- Data control: export, delete individual, delete all, leave
- Third parties: no analytics, no cookies, no ads, no data sharing; only Supabase + Netlify
- Changes policy: date at top updated
- Contact: via kamunity.ai

### 3. FAQ Page (`src/components/FAQPage.jsx`)
- 10 accordion questions addressing real treasurer concerns:
  - Is it free? / Where is data stored? / Can others see it?
  - What if I clear my browser? / Mobile support? / Sharing with committee?
  - Treasurer handover? / CSV import? / Funder acceptance? / Delete all data?
- Collapsible UI with +/− toggle

### 4. In-App Data Transparency
- Storage mode indicator (☁️ Cloud / 💾 Browser only) is now **clickable**
- Expands blue info panel explaining what the mode means
- Cloud: encryption details, RLS, anonymous auth, link to Privacy Policy
- Browser-only: localStorage explanation, link to FAQ
- Dismissible with × button

### 5. Delete All My Data
- Red link in footer: "Delete All My Data"
- Confirmation step: "Are you sure? This permanently deletes all grants."
- Deletes from Supabase (cloud mode) and localStorage
- Clears migration flag
- Toast confirmation: "All data deleted"

### 6. Footer Navigation
- About · Privacy · FAQ links
- "Built by Kamunity for Australian communities" with kamunity.ai link
- Delete All My Data link
- `no-print` class — hidden when printing reports

### 7. Page Routing
- `page` state in App.jsx: `main | about | privacy | faq`
- Each page has ← Back navigation returning to main
- About page can navigate directly to Privacy page

## Files Created/Changed

| File | Change |
|---|---|
| `src/components/AboutPage.jsx` | New: full about page with Kamunity branding |
| `src/components/PrivacyPage.jsx` | New: plain-English privacy policy |
| `src/components/FAQPage.jsx` | New: 10-question accordion FAQ |
| `src/App.jsx` | Added: page routing, cloud info panel, delete all data, footer |
| `phases/phase-03/research.md` | New: 5 findings from web research |
| `phases/phase-03/triage.md` | New: 6 build decisions |

## Testing Notes

- `npm run smoke` — **13/13 tests pass**
- `npm run build` — **81 modules, 0 errors**
- UAT: User verified all pages, confirmed branding, tested Delete All My Data as final step

## UAT Result

**PASS** — User reviewed About, Privacy, FAQ, cloud info panel, delete all data, footer. Confirmed Kamunity branding correct. Performed "Delete All My Data" as final verification step.

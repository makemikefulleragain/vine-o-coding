# STATE.md — Community Grants Hub

**Last updated:** 2026-02-14 (Phase 5.5 built — awaiting human actions)
**Current phase:** Phase 5.5 (Listen — Feedback Infrastructure & Outreach) — code complete, human actions pending.
**Deployed URL:** https://grants-hub.netlify.app
**Supabase project:** Configured in .env (tzwkprkhdgwmemajnxud.supabase.co)

---

## What Exists

### Site (Vite + React 19) — Phase 5
- Vite 7 build system with React 19, Tailwind CSS 3 (PostCSS)
- Component architecture: App, GrantListView, GrantDetailView, SetupTab, ExpensesTab, DashboardTab, ReportTab, StatCard, CSVImport, AboutPage, PrivacyPage, FAQPage
- Supabase JS v2 via ES module import (no more CDN timing issues)
- **Multi-grant management** — list view with cards, create, delete with confirmation, switch between grants
- **Grant status & archiving** — draft/active/acquitted statuses, filter tabs, status badges and dropdown
- Grant setup: funder name, grant amount, budget categories, reporting deadline
- Expense logging: date, description, amount, category, receipt reference
- Budget vs actual dashboard with per-category breakdown
- Printable acquittal report with grant summary, financial tables
- **Structured narrative guidance** — 5 prompted fields with funder-focused hints (replaces bare textarea)
- **JSON data export** — download all grants as structured JSON
- **CSV bank statement import** — 3-step wizard (upload → map columns → categorise), auto-detect Australian bank formats
- **Date validation warnings** — amber ⚠ on expenses after grant deadline
- Financial advice disclaimer
- **SEO** — meta description, OG tags, Twitter Card, JSON-LD SoftwareApplication schema
- **Landing hero** — marketing-style empty state for first-time visitors (4 feature cards + CTA)
- **About page** — Kamunity branding, mission, "what's the catch?" section, disclaimer
- **Privacy policy** — plain English, what data is/isn't collected, storage details, third parties
- **FAQ** — 10 accordion questions addressing real treasurer concerns
- **Clickable cloud info panel** — storage indicator expands to explain encryption and data handling
- **Delete All My Data** — footer action with confirmation, clears cloud + localStorage
- **Footer navigation** — About · Privacy · FAQ + Kamunity branding
- **User accounts (Email OTP)** — AuthPanel component with three flows:
  - Save Account: anonymous → permanent via email + 6-digit OTP
  - Sign In: returning user via email OTP
  - Sign Out: clears session, creates new anonymous user
- **Dual storage mode:**
  - ☁️ Cloud mode (Supabase) — anonymous auth, normalized tables, debounced auto-save — **verified working**
  - 💾 Browser-only mode (localStorage) — fallback when Supabase unavailable
- Storage mode indicator in header
- Save status indicator (Saving.../✓ Saved/⚠ Save failed)
- Toast notification system
- One-time localStorage → Supabase data migration (single-grant + multi-grant)
- Clean indigo/gray UI theme
- CSV expense export
- **Feedback infrastructure (Phase 5.5):**
  - FeedbackBanner — persistent bottom banner linking to external Google Form (hidden until FEEDBACK_URL set)
  - Contextual feedback prompt on Report tab ("How was this report? Tell us →")
  - "Help Shape This Tool" tester signup on About page (email + consent → Supabase `tester_signups`)
  - Privacy page updated with Feedback & Testing section (OAIC-compliant)
- **Automated smoke test** (13 tests including live Supabase auth, multi-grant rendering)
- 83 modules, 0 build errors

### Infrastructure
- **Netlify: LIVE at https://grants-hub.netlify.app**
- Supabase: Project created, credentials in .env
  - Anonymous auth enabled, SQL migrations run by human
- Supabase CLI: v2.76.8 (dev dependency), initialized
- Build: `npm run build` → dist/  |  Dev: `npm run dev`  |  Test: `npm run smoke`

### Database
- `grants` table — user_id, funder, grant_name, amount, deadline, narrative
- `budget_categories` table — grant_id, name, budgeted, sort_order
- `expenses` table — grant_id, category_id, date, description, amount, receipt_ref
- RLS policies on all tables (user can only access own data)
- Auto-update trigger on grants.updated_at
- Multi-grant already supported by schema (multiple rows per user_id)

---

## What's Been Built (Phase History)

### Phase 1: Make It Real (2026-02-14)
- Supabase integration with anonymous auth
- Normalized database schema (3 tables + RLS)
- Dual storage mode (cloud + localStorage fallback)
- localStorage → Supabase one-time migration
- Storage mode and save status indicators
- Confidence score: 87/100
- **Known issue:** Cloud mode untested/non-functional due to Babel timing bug

### Phase 2: Make It Useful (2026-02-14) — REVERTED
- Built: multi-grant management, structured narrative guidance, JSON data export
- Confidence score: 85/100
- **Failed UAT:** Supabase cloud mode never connected
- **Review & Reflect triggered:** Code reverted to Phase 1 baseline
- See `phases/phase-02/review-reflect.md` for full analysis

### Phase 2a: Make It Buildable (2026-02-14) — COMPLETE
- Vite 7 + React 19 + Tailwind CSS 3 (PostCSS)
- Supabase CLI v2.76.8
- 8 automated smoke tests (including live Supabase auth)
- **UAT PASS:** User confirmed Cloud mode works, data persists across sessions

### Phase 2b: Make It Useful (2026-02-14) — COMPLETE
- Multi-grant management (list, create, delete, switch)
- Structured narrative guidance (5 prompted fields with hints)
- JSON data export
- 13 automated smoke tests
- Confidence score: 92/100
- **UAT PASS:** All 7 acceptance items verified by user

### Phase 2b+: Make It Useful — Completions (2026-02-14) — COMPLETE
- CSV bank statement import (3-step wizard, auto-detect Australian bank formats)
- Grant status & archiving (draft/active/acquitted, filter tabs)
- Date validation warnings (expenses after deadline)
- Confidence score: 94/100
- **UAT PASS:** User confirmed and said "proceed"

### Phase 3: Make It Trustworthy (2026-02-14) — COMPLETE
- About page (Kamunity branding, mission, "what's the catch?", disclaimer)
- Privacy policy (plain English, data handling, third parties)
- FAQ (10 questions addressing treasurer concerns)
- Clickable cloud info panel (storage indicator → encryption details)
- Delete All My Data (footer, confirmation, cloud + localStorage)
- Footer navigation (About · Privacy · FAQ + Kamunity link)
- Confidence score: 91/100
- **UAT PASS:** User verified all pages, tested Delete All My Data

### Phase 4: Make It Findable (2026-02-14) — COMPLETE
- SEO meta tags, Open Graph, Twitter Card, JSON-LD structured data
- Netlify deploy config (netlify.toml, _redirects)
- robots.txt + sitemap.xml
- Landing hero for first-time visitors (replaces minimal empty state)
- Deployed to https://grants-hub.netlify.app
- Confidence score: 92/100
- **UAT PASS:** User deployed via drag-and-drop, confirmed all works like dev

### Phase 5: User Accounts — Email OTP (2026-02-14) — COMPLETE
- AuthPanel.jsx: email input, OTP verification (6-8 digits), sign out
- Anonymous → permanent user conversion via updateUser + verifyOtp
- Returning user sign-in via signInWithOtp + verifyOtp
- Auth state listener (onAuthStateChange) with data reload on sign-in
- Sign out → new anonymous session
- 3 post-build bugs found and fixed (OTP length, double-try token consumption, rate limit message)
- Supabase dashboard configured: manual linking, email templates, site URL
- Confidence score: 87/100
- **UAT PASS (desktop):** Save account + sign-in verified in incognito with real email
- **UAT UNRESOLVED (phone):** Rate limited during testing — not a code bug, held for retest

---

## Known Gaps

- ~~Cloud mode non-functional~~ (fixed in Phase 2a)
- ~~No build system~~ (fixed in Phase 2a — Vite)
- ~~No automated tests~~ (fixed in Phase 2a — 13 smoke tests)
- ~~Single grant only~~ (fixed in Phase 2b — multi-grant)
- ~~No structured narrative guidance~~ (fixed in Phase 2b)
- ~~No JSON data export~~ (fixed in Phase 2b)
- ~~No CSV import~~ (fixed in Phase 2b+ — bank statement import)
- ~~No grant archiving~~ (fixed in Phase 2b+ — status system)
- ~~No date validation~~ (fixed in Phase 2b+ — deadline warnings)
- ~~No trust/transparency pages~~ (fixed in Phase 3 — About, Privacy, FAQ)
- ~~No data deletion capability~~ (fixed in Phase 3 — Delete All My Data)
- ~~No user accounts~~ (built in Phase 5 — email OTP, pending UAT after Supabase config)
- No document/receipt attachment
- No collaboration (single user)
- No funder-specific templates
- ~~Not findable~~ (fixed in Phase 4 — deployed, SEO, landing hero)
- No offline→online sync

---

## Unresolved Tests

| Test | Phase | Status | Notes |
|---|---|---|---|
| Phone sign-in | Phase 5 | ⏳ Held | Supabase free tier rate limit hit during testing. Code fix deployed. Retest when limit resets. |
| kamunity.ai backlink | Phase 4 | ⏳ Held | Add link from kamunity.ai to grants-hub.netlify.app |
| Google indexing | Phase 4 | ⏳ Held | sitemap.xml submitted, waiting for crawl |

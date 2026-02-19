# PHASE_QUEUE.md — Community Grants Hub
# This queue is a hypothesis. You can and should modify it based on research.

---

## How This Works

Each phase is a broad goal, not a feature spec. You research what's needed, build the highest-value implementation, and propose the next phase based on what you learned.

**After each phase:**
1. Update STATE.md with what was built
2. Write NEXT_PHASE.md in the phase folder proposing what comes next
3. Update THIS FILE if your research suggests reordering or replacing phases
4. Proceed to the next phase

**You may:**
- Reorder phases if research reveals different priorities
- Replace a phase with something research shows is more valuable
- Split a phase if it's too big
- Merge phases if they're too small
- Add phases you discover are needed
- Remove phases you discover are unnecessary

**You must:**
- Document every change to this queue with reasoning
- Never skip the research phase (even if you think you know the answer)
- Leave the site in a deployable state after every phase

---

## The Queue

### Phase 1: Make It Real
**Goal:** Replace localStorage with Supabase so data persists across devices and sessions.
**Why first:** Nothing else matters if users lose their data when they clear their browser. This is the minimum viable upgrade from demo to tool.
**Broad scope:** Database schema, Supabase connection, data migration from localStorage (if user has existing data), basic error handling.

### Phase 2a: Make It Buildable ← NEW (inserted by Review & Reflect)
**Goal:** Replace the CDN + Babel-in-browser architecture with a proper build system so that code can be tested and deployed reliably.
**Why now:** Phase 2 failed UAT because Babel standalone's script execution timing made Supabase connectivity untestable and unreliable. This class of bug cannot be fixed within the current architecture. Evidence: see `phases/phase-02/review-reflect.md`.
**Broad scope:**
- Vite build system (React + TypeScript optional)
- Supabase CLI for local development and testing
- Automated smoke test (app loads → Supabase connects → data round-trips)
- `site/` or `dist/` remains the deployable artifact
**Acceptance gate:** Smoke test passes locally AND on deployed Netlify site

### Phase 2b: Make It Useful (re-implementation)
**Goal:** Re-implement the Phase 2 features (multi-grant, narrative guidance, JSON export) on the new build foundation.
**Why separate:** The Phase 2 research, design, and code are sound — only the delivery infrastructure failed. Re-implementation should be fast since spec and reference code exist in `phases/phase-02/`.
**Broad scope:** Multi-grant management, structured narrative guidance, JSON data export. Spec unchanged from original Phase 2.
**Acceptance gate:** All Phase 2 acceptance criteria pass + smoke test passes

### Phase 3: Make It Trustworthy
**Goal:** Add whatever is needed for an organisation to trust this tool with their grant data.
**Why third:** Usefulness without trust = no adoption. What makes a volunteer treasurer trust a free online tool?
**Broad scope:** Could include: user accounts (Supabase Auth), data encryption, privacy policy, about page explaining who built this and why, open source code, data export/backup, testimonials or case studies. Research decides.

### Phase 4: Make It Findable
**Goal:** Ensure nonprofits who need this can find it.
**Why fourth:** A great tool nobody knows about helps nobody.
**Broad scope:** Could include: SEO, listing on nonprofit resource directories, AISO (AI Search Optimization), content marketing (blog posts about grant acquittal), partnerships with peak bodies (WACOSS, Volunteering WA), social media presence. Research decides.

### Phase 5+: Expand Based on Evidence
**Goal:** Whatever the research and user feedback from Phases 1-4 reveals as the next priority.
**Why last:** By this point, real users should be using the tool and providing real feedback. The engine should respond to actual needs, not assumed ones.

### Phase 5.5: Listen — Feedback Infrastructure & Outreach ← INSERTED by R&R
**Goal:** Build a lightweight in-app feedback path so every visitor can contribute signal, then share the tool through research-informed channels.
**Why now:** Phases 1-5 built a functionally complete tool in one session with zero external user feedback. Rather than passively waiting for feedback, build the mechanism to collect it and actively reach the right people through the right channels.
**Broad scope:**
- Research: where do Australian nonprofit treasurers discover tools? What feedback mechanisms work for niche tools? Informed consent patterns.
- Build: in-app feedback button/banner linking to external form, optional "join testers" email capture with consent, resolve unresolved tests.
- Outreach (human action): share through researched channels, directory submissions, LinkedIn, kamunity.ai backlink.
**Acceptance gate:** Feedback infrastructure deployed + shared through channels + at least 3 real user responses collected.

### Phase 6: Respond to User Feedback (scope TBD)
**Goal:** Build whatever real users say matters most.
**Why after 5.5:** Phase 6 scope should be defined by evidence, not assumptions. It might be print polish, JSON import, team features, or something we haven't thought of.
**Broad scope:** Determined after Phase 5.5 feedback analysis.

---

## Queue Change Log

### 2026-02-14 — Phase 1 Complete
- **No queue changes.** Research confirmed the phase order is correct.
- Phase 1 (Make It Real) built as specified: Supabase persistence with anonymous auth, normalized schema, localStorage fallback and migration.
- Phase 2 (Make It Useful) remains the correct next step. Research signals suggest multi-grant management and CSV import as top candidates, but Phase 2 research will determine the actual priority.
- Phase 3 (Make It Trustworthy) and Phase 4 (Make It Findable) remain unchanged.

### 2026-02-14 — Phase 2 Complete (subsequently reverted)
- Research confirmed multi-grant management as the #1 priority, paired with narrative guidance (low-effort, high-value).
- Phase 2 (Make It Useful) built: multi-grant management, structured narrative guidance (acquittal red flag prevention), JSON data export.
- CSV import from bank statements deferred — high value but complex (bank format variation). Candidate for Phase 3 or later.
- **REVERTED** — see next entry.

### 2026-02-14 — Review & Reflect: Phase 2 Reset
- **Trigger:** Phase 2 failed UAT. Supabase cloud mode never connected. Bug took >5 attempts to diagnose.
- **Root cause:** Babel standalone executes compiled scripts before CDN-loaded Supabase UMD is available. The CDN + Babel-in-browser architecture creates untestable, timing-dependent execution.
- **Process gap:** No smoke test, no cloud integration test, no automated verification. Phase marked complete without proof of working.
- **Actions taken:**
  - Code reverted to Phase 1 state (single-grant, browser-only verified working)
  - Phase 2 code preserved as reference in `phases/phase-02/index-phase2-reference.html`
  - All Phase 2 documentation preserved (research, triage, spec, critique)
  - Review & Reflect protocol formalized as `.windsurf/workflows/review-and-reflect.md`
- **Queue changes:**
  - Inserted Phase 2a (Make It Buildable): Vite + Supabase CLI + smoke test
  - Renamed original Phase 2 to Phase 2b (re-implementation on new foundation)
  - Amends CONSTITUTION.md technical constraints: build tools now permitted when evidence supports them
- Phase 3+ unchanged.

### 2026-02-14 — Phase 2a Complete
- Vite 7 + React 19 + Tailwind CSS 3 replaces CDN + Babel standalone.
- Supabase CLI v2.76.8 installed as dev dependency.
- 8 automated smoke tests (including live Supabase anonymous auth).
- **UAT PASS:** Cloud mode verified working, data persists across sessions.
- Root cause of Phase 2 failure (Babel timing) eliminated by ES module imports.

### 2026-02-14 — Phase 2b Complete
- Multi-grant management (list view, create, delete, switch between grants).
- Structured narrative guidance (5 prompted fields with funder-focused hints).
- JSON data export (all grants as structured download).
- Smoke tests expanded to 13 (multi-grant rendering, lsLoadGrants migration, exportJSON).
- Confidence score: 92/100.
- **UAT PASS:** All 7 acceptance items verified by user.
- Phase 3 (Make It Trustworthy) is next.

### 2026-02-14 — Phase 2b+ Complete (Usefulness Completions)
- Assessed remaining gaps from Phase 2 research before moving to Phase 3.
- CSV bank statement import — the #4 ranked feature, "single most time-saving" per research.
- Grant status & archiving (draft/active/acquitted) — addresses critique gap.
- Date validation warnings — expenses after grant deadline flagged with ⚠.
- Confidence: 94/100.
- **UAT PASS.** "Make It Useful" is now genuinely complete.
- Phase 3 (Make It Trustworthy) begins.

### 2026-02-14 — Phase 3 Complete (Make It Trustworthy)
- Research: 5 web sources (ACNC, OAIC, Council of Nonprofits, CrazyEgg trust signals, MoneyMinder treasurer guide).
- Triage: 6 decisions — About page, Privacy policy, FAQ, cloud info panel, Delete All Data, footer nav.
- Build: 6 features implemented across 3 new components + App.jsx updates.
- Branding: Initially inferred "KomUnity" from folder path — corrected to **Kamunity (kamunity.ai)** per user.
- Critique: spec step skipped (process gap), branding error caught by user, no tests for new pages.
- Confidence: 91/100.
- **UAT PASS.** User verified all pages, tested Delete All My Data as final step.
- Phase 4 (Make It Findable) is next. See `phases/phase-03/NEXT_PHASE.md` for proposal.

### 2026-02-14 — Phase 4 Complete (Make It Findable)
- Research: 4 searches — grant acquittal search terms, SPA SEO, Netlify Vite deploy, nonprofit discovery channels.
- Triage: 6 decisions. Deferred: directory listings, blog/content, pre-rendering.
- Spec: 9 acceptance criteria (process gap from Phase 3 corrected).
- Build: SEO meta tags, OG, Twitter Card, JSON-LD, netlify.toml, _redirects, robots.txt, sitemap.xml, landing hero.
- **Deployed to https://grants-hub.netlify.app** via Netlify drag-and-drop (human action).
- Operational note: Supabase env vars not yet set on Netlify — deployed site is browser-only until configured.
- Confidence: 92/100.
- **UAT PASS.** User confirmed all works like dev on live URL.
- Phase 5 (Expand Based on Evidence) is next. See `phases/phase-04/NEXT_PHASE.md` for proposal.

### 2026-02-14 — Phase 5 Complete (User Accounts — Email OTP)
- Research: 5 searches — Supabase anonymous→permanent conversion, OTP vs magic link, auth state management.
- Triage: 8 decisions. OTP chosen over magic link (no redirect complexity). Deferred: OAuth, passwords, team accounts.
- Spec: 9 acceptance criteria written before building (Phase 3 process gap corrected).
- Build: AuthPanel.jsx (email input, OTP 6-8 digits, sign out). App.jsx: auth state, onAuthStateChange listener, header integration.
- Build: 82 modules, 0 errors. 13/13 smoke tests pass.
- 3 post-build bugs found and fixed: OTP input length (6→8), double-try token consumption, misleading rate limit message.
- Supabase dashboard configured by user: manual linking, email templates ({{ .Token }}), site URL.
- Confidence: 87/100.
- **UAT PASS (desktop):** Save account + sign-in verified in incognito with real email.
- **UAT UNRESOLVED (phone):** Supabase free tier rate limit hit during testing. Not a code bug. Held for retest.
- Unresolved tests carried forward: phone sign-in, kamunity.ai backlink (Phase 4), Google indexing (Phase 4).
- Phase 6 proposed: User Feedback & Polish. See `phases/phase-05/NEXT_PHASE.md`.

### 2026-02-14 — Review & Reflect: Phase 6 Paused, Validation Gate Inserted
- **Trigger:** User-initiated R&R before Phase 6 build. Strategic pause, not bug response.
- **Root cause:** 5 phases built in one session with zero real user feedback. Phase 6 was about to build more features without evidence of user need.
- **Systemic issue:** Phase loop lacks a "user validation gate" between functional completeness and further feature work.
- **Actions taken:**
  - Phase 6 research discarded (was partially started)
  - Inserted Phase 5.5 (User Validation Gate) — human-action-heavy, no code
  - Redefined Phase 6 as feedback-driven (scope TBD after user input)
  - Unresolved tests (phone sign-in, backlink, indexing) moved to Phase 5.5 resolution
  - HUMAN_ACTION.md written with outreach plan
- **No code revert needed.** Codebase is solid (82 modules, 13/13 tests, desktop UAT pass).
- See `phases/phase-06/review-reflect.md` for full analysis.

### 2026-02-14 — Phase 5.5 Built (Listen — Feedback Infrastructure & Outreach)
- Research: 5 searches — Australian nonprofit channels, in-app feedback best practices, OAIC consent, outreach ranking.
- Triage: 8 decisions. External Google Form for feedback. Supabase table for tester signups. OAIC-compliant consent.
- Spec: 9 acceptance criteria.
- Build: FeedbackBanner.jsx (persistent, dismissible), contextual ReportTab prompt, TesterSignup on AboutPage (email + consent → Supabase), Privacy page updated.
- Build: 83 modules, 0 errors. 13/13 smoke tests pass. Placeholder guard hides banner until real form URL set.
- Migration: `001_tester_signups.sql` written (not yet run — human action).
- Confidence: 77/100 (capped by pending human actions: form creation, migration, deploy, outreach).
- **HUMAN ACTIONS REQUIRED:** See `phases/phase-06/HUMAN_ACTION.md`:
  1. Create Google Form with 5 feedback questions
  2. Update FEEDBACK_URL in App.jsx with real form URL
  3. Run tester_signups migration in Supabase
  4. Rebuild and redeploy
  5. Resolve 3 unresolved tests (phone sign-in, backlink, indexing)
  6. Share through 3+ channels (LinkedIn, Facebook groups, direct peer)
- **Acceptance gate:** Feedback infra live + shared through channels + 3 real user responses collected.

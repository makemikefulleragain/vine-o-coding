# Next Phase Proposal: Phase 5 — Expand Based on Evidence

**Date:** 2026-02-14

---

## Why This Phase

Phases 1-4 have taken the tool from a localStorage demo to a deployed, useful, trustworthy, and findable app at https://grants-hub.netlify.app. The PHASE_QUEUE.md describes Phase 5 as: "Whatever the research and user feedback from Phases 1-4 reveals as the next priority."

## Evidence So Far

From building and critiquing Phases 1-4, three recurring themes emerged:

### 1. User Accounts (recurring gap in every critique)
Anonymous auth is the #1 functional limitation. A treasurer who:
- Uses the tool at work, can't access it at home
- Clears their browser data, loses everything
- Hands over to the next treasurer, can't transfer access

This was flagged in Phase 2b, Phase 3, and Phase 4 critiques. It's the biggest barrier to real-world adoption and word-of-mouth growth.

### 2. Supabase Env Vars on Netlify (operational gap)
The deployed site is currently browser-only mode. Setting env vars and rebuilding is a human action that enables cloud mode for real users. This is urgent but trivial.

### 3. Distribution (human actions, not code)
Phase 4 critique noted that SEO alone won't drive discovery. Real findability comes from:
- Nonprofit directory listings (Connecting Up, Our Community, TechSoup)
- Social sharing (LinkedIn post from kamunity.ai)
- Content (blog post: "How to acquit a small grant in Australia")
- Peak body outreach (WACOSS, Volunteering Australia)

These are human actions. Code can enable them (OG tags ✅, shareable URL ✅) but can't replace them.

## Proposal

Phase 5 should focus on **user accounts** (Supabase Auth with email/magic link). This is the highest-value code change remaining. It:
- Solves the #1 functional gap
- Enables multi-device access
- Enables treasurer handover
- Is prerequisite for future collaboration features
- Builds on existing Supabase infrastructure

### Scope
- Email magic link auth (passwordless — simplest for volunteer treasurers)
- Session persistence across browsers/devices
- Migration from anonymous session to authenticated session
- "Log in" / "Sign up" flow that doesn't break the current zero-friction onboarding

### Risks
- Auth UX complexity — magic link requires email, which some treasurers may resist
- Migration path — existing anonymous users need to claim their data
- Email delivery — Supabase's built-in email has rate limits; may need custom SMTP

### Alternative
If user accounts are too complex for a single phase, a lighter option: **data import from JSON** (complementing existing JSON export). This would let a treasurer export on one device and import on another — a manual but functional workaround for the multi-device problem.

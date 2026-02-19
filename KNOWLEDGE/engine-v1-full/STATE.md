# STATE.md
# Current Engine State

**Last updated:** 2026-02-13
**Current iteration:** 05 (COMPLETED — AUTONOMOUS — FIRST BUILD)
**Current phase:** Forward (complete) — Build instructions written
**Status:** Confidence 91/100 — Autonomous. First buildable spec produced.

---

## What exists:
- CONSTITUTION.md — Inviolable principles + Existing Ecosystem + Experimental Mode ✓
- ENGINE.md — RALF loop specification + Handoff Point + Structured Web Listening ✓
- PLATFORM_STATE.md — Ground truth for kamunity.ai (live platform, 500+ members, 100+ rooms) ✓
- RESEARCH_PROTOCOL.md — Source hierarchy + PDF workaround strategy ✓
- CONFIDENCE_MODEL.md — Scoring framework ✓
- LEARNING_LOG.md — Iterations 01-05 entries written ✓
- STATE.md — This file ✓

## Iteration 01-03 outputs: [unchanged — see previous STATE.md versions]

## Iteration 04 outputs:
- research/iteration_04_raw.md — Ecosystem traces + WA web discourse ✓
- synthesis/iteration_04_themes.md — Model confirmed with one challenge ✓
- specs/iteration_04_spec.md — Amended model + 3 listening briefs ✓
- critiques/iteration_04_critique.md — 7 questions + experimental mode ✓
- confidence/iteration_04_score.md — 79/100 ✓
- reviews/iteration_04_review.md — Human review brief ✓

## Human decisions applied to Iteration 05:
1. RALF engine proven: honest research, accurate confidence scoring, model updating, appropriate escalation ✓
2. Pivot from landscape research to first buildable spec ✓
3. The Pack Music's request is the spec target ✓
4. PLATFORM_STATE.md established as ground truth ✓
5. kamunity.ai acknowledged as live platform (not future aspiration) ✓

## Iteration 05 outputs:
- research/iteration_05_raw.md — Technical Triage: 7 platforms evaluated, ActivityPub/AT Protocol research ✓
- synthesis/iteration_05_themes.md — Triage resolves at Extend (Step 3) ✓
- specs/iteration_05_spec.md — **BUILDABLE SPEC: Multi-Tenant Foundation** (7 ACs, 10-step implementation) ✓
- critiques/iteration_05_critique.md — 7 questions + ecosystem check + 4 biases ✓
- confidence/iteration_05_score.md — 91/100 (highest score, first build instructions) ✓
- **builds/iteration_05_build.md** — **FIRST BUILD INSTRUCTIONS** (10-step with code, 16-24h estimate) ✓

## The Build Spec (Primary Output):

**What:** Multi-tenant foundation for kamunity.ai — enabling branded sovereign spaces for community organisations, starting with The Pack Music.

**Architecture:**
- `tenants` table (Prisma) — name, slug, logo, colors, owner
- `tenant_id` on rooms — nullable, backward compatible
- Next.js subdomain middleware — `thepack.kamunity.ai` routing
- CSS-variable tenant theming — Pack branding on Pack subdomain
- Tenant-scoped room discovery — Pack rooms on Pack subdomain only
- Supabase RLS — data isolation between tenants
- Tenant admin settings — owner manages branding

**Acceptance Criteria:** 7 testable ACs covering data model, subdomain routing, scoped discovery, theming, admin, data isolation, zero regression.

**Estimated Effort:** 16-24 hours

**Triage:** Extend (Step 3). 7 platforms evaluated at Step 1 — none combine rooms + calendar + files + polls + white-label + federation. kamunity.ai already has the coordination features; extend with multi-tenant.

## Roadmap (from this spec forward):
1. ✅ **Multi-tenant foundation** — THIS SPEC (builds/iteration_05_build.md)
2. ⬜ **Outbound cross-posting** — Mastodon API + @atproto/api for Bluesky
3. ⬜ **Full ActivityPub federation** — Fedify @fedify/next
4. ⬜ **Tenant member management** — who belongs to a tenant, invites, roles
5. ⬜ **Data portability** — export mechanism (sovereignty requirement)
6. ⬜ **Custom domains** — `rooms.packmusic.au` pointing to Pack tenant

## Key Technical Finds (I05):
- **Fedify** — TypeScript ActivityPub framework with `@fedify/next` package (Next.js integration)
- **@atproto/api** — Official Bluesky TypeScript SDK, trivial posting API
- **Next.js multi-tenant** — Official Vercel guide + production example repo
- **Supabase RLS** — Standard `tenant_id` + Row Level Security pattern

## Pre-Build Checklist (before executing builds/iteration_05_build.md):
- [ ] Verify Netlify wildcard subdomain support (`*.kamunity.ai`)
- [ ] Confirm Prisma schema compatibility with existing Room model
- [ ] Confirm existing Supabase RLS state
- [ ] Share AC1-AC7 with The Pack for validation
- [ ] Define tenant membership model (who sees tenant rooms?)

## Still Active (from I03-I04):
- Community Listening Package ready for ALIKE WA + WALGA conversations
- INVOLVE evaluation outstanding (Triage obligation)
- Volunteering WA Barriers PDFs not yet accessed
- AIATSIS engagement boundary non-negotiable for Aboriginal communities

## Confidence trajectory:
- Iteration 01: 51/100 (Escalated — landscape scan)
- Iteration 02: 77/100 (Proceed with caution — "don't build yet")
- Iteration 03: 88/100 (Autonomous — handoff to human conversations)
- Iteration 04: 79/100 (Proceed with caution — web listening, honest drop)
- Iteration 05: 91/100 (Autonomous — **first buildable spec**)
- Pattern: 4 iterations of "don't build" → 1 buildable spec. Triage worked.

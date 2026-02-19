# Iteration 05 — Synthesis: Triage Assessment for The Pack Music Request

**Date:** 2026-02-13
**Ground truth:** PLATFORM_STATE.md — kamunity.ai is live (500+ members, 100+ rooms, Next.js 14 + Supabase + Prisma + Tailwind on Netlify)
**Request:** The Pack Music wants a branded sovereign space on Kamunity infrastructure with rooms for their stakeholder ecosystem and outbound federation to Mastodon/Bluesky

---

## Full Triage Walk-Through

### Step 1: FIND — Does a solution already exist?

**Answer: No.**

Evaluated 7 platforms (Mastodon, Matrix/Element, Discourse, Lemmy, Bonfire, Hylo, Loomio). None combine:
- Room-based coordination (chat + calendar + files + polls)
- White-label/multi-tenant branding
- ActivityPub federation
- Bluesky/AT Protocol connectivity

The closest is Matrix/Element (rooms + federation) but it uses a different protocol, requires homeserver infrastructure, and has a different UX paradigm (chat-first, not coordination-first). It would mean abandoning kamunity.ai and starting over — the opposite of Extend.

**Triage Step 1: Not resolved. Proceed to Step 2.**

### Step 2: CONNECT — Can we connect The Pack to an existing solution?

**Answer: No complete solution exists to connect to.**

The Pack could run a Mastodon instance for federation and use kamunity.ai for coordination, but that fragments their experience across two platforms — the exact problem kamunity.ai's "stop switching between 8 apps" positioning solves. Connecting to multiple partial solutions recreates the integration gap from I01.

**Triage Step 2: Not resolved. Proceed to Step 3.**

### Step 3: EXTEND — Can kamunity.ai be extended?

**Answer: Yes. This is where Triage resolves.**

kamunity.ai already has rooms, chat, calendar, files, polls, discovery, offline support, and 500+ members. The Pack's request requires extending it with:

1. **Multi-tenant branding** — tenant-specific subdomain, logo, colors, room scoping
2. **Outbound social posting** — cross-post room content to Mastodon and Bluesky accounts

Both extensions have mature, well-documented technical building blocks:
- Next.js multi-tenant: official Vercel guide + production example repo
- Supabase RLS: standard `tenant_id` + Row Level Security pattern
- Mastodon API: well-established posting API
- @atproto/api: official Bluesky TypeScript SDK, trivial posting
- Fedify @fedify/next: available for future full ActivityPub federation

**Triage Step 3: RESOLVED at Extend.**

### Steps 4-5: INTEGRATE / BUILD — Not needed

Integration (connecting separate tools) doesn't apply — we're extending one platform. Build from scratch doesn't apply — kamunity.ai exists.

---

## Decomposition: What "Extend" Actually Means

The Pack's full request decomposes into two independent workstreams:

### Workstream A: Multi-Tenant Branding
Give The Pack their own branded space within kamunity.ai infrastructure.

| Component | What It Does | Complexity | Dependencies |
|-----------|-------------|-----------|-------------|
| `tenants` table | Stores tenant config (name, slug, logo, colors, domain) | Low | Prisma schema migration |
| `tenant_id` on rooms | Associates rooms with a tenant | Low | Prisma migration + backfill |
| Subdomain middleware | Routes `thepack.kamunity.ai` to tenant context | Medium | Next.js middleware, DNS |
| Tenant theming | CSS variables driven by tenant config | Low | Frontend only |
| Tenant-scoped discovery | When at Pack subdomain, show only Pack rooms | Low | Query filter |
| Tenant admin UI | Let tenant owner manage branding, rooms, members | Medium | New pages + auth |

**Total complexity: Medium.** All patterns are proven. No novel engineering required.

### Workstream B: Outbound Social Posting
Let room content flow out to Mastodon and Bluesky.

This has two tiers:

**Tier 1: Cross-posting (API-based, simpler)**
| Component | What It Does | Complexity |
|-----------|-------------|-----------|
| Social accounts config | Tenant connects Mastodon + Bluesky accounts | Low |
| Cross-post toggle | Per-post option: "Also post to Mastodon/Bluesky" | Low |
| Mastodon API client | Posts to Mastodon via REST API | Low |
| Bluesky API client | Posts via @atproto/api | Low |
| Post formatting | Convert room post to Mastodon/Bluesky format | Medium |

**Tier 2: Full ActivityPub Federation (future, more complex)**
| Component | What It Does | Complexity |
|-----------|-------------|-----------|
| Fedify integration | @fedify/next for ActivityPub protocol | High |
| Actor endpoints | WebFinger, actor JSON-LD, outbox, inbox per tenant | High |
| Key management | HTTP Signature key pairs per actor | Medium |
| Inbound handling | Receive follows, replies, likes from fediverse | High |
| Delivery queue | Async HTTP delivery with retry | Medium |

---

## The Highest-Confidence First Step

**Workstream A (Multi-Tenant Branding) is the clear first step.**

Rationale:
1. **Immediate value:** Gives The Pack their "own space" feeling — the core of their request
2. **Proven patterns:** Next.js subdomain routing and Supabase RLS are well-documented, production-tested
3. **No external dependencies:** Doesn't require Mastodon/Bluesky accounts, API keys, or protocol complexity
4. **Prerequisite for Workstream B:** You need a tenant before you can post from a tenant
5. **Testable independently:** The Pack can use their branded space immediately, even without federation
6. **Lower risk:** Database migration on a live platform is the main risk; no protocol complexity
7. **FactoryK-producible:** Within the scope of what an AI-powered build pipeline can spec and produce

**Within Workstream A, the single highest-confidence micro-step is:** Add the `tenants` table, add `tenant_id` to rooms, and implement subdomain middleware. This is the foundation that everything else builds on. Without multi-tenant data isolation, branding and scoped discovery have nothing to work with.

---

## Theme Ranking (Iteration 05)

| Rank | Theme | Signal | Actionability |
|------|-------|--------|--------------|
| 1 | **Multi-tenant foundation is the first buildable step** | Strong — proven patterns, real member need, prerequisite for everything else | **Immediately buildable** |
| 2 | **Cross-posting delivers 80% of federation value at 20% complexity** | Strong — Mastodon + Bluesky APIs are trivial | Buildable after Step 1 |
| 3 | **Full ActivityPub federation is desirable but not first** | Medium — Fedify exists and has Next.js package, but protocol is complex | Future step, after cross-posting proves the value |
| 4 | **Tenant admin UI is necessary but not the first code** | Medium — UX patterns are standard | After data model is solid |
| 5 | **Other member requests (notifications, permissions, file management) benefit from multi-tenant architecture** | Medium — tenant-scoped permissions and notifications are more natural than global ones | Architectural benefit of doing multi-tenant first |

---

## Synthesis Statement

**Triage resolves at Extend.** kamunity.ai is the platform. The Pack's request is served by extending it with multi-tenant branding, then outbound social posting.

The first buildable step is the **multi-tenant data foundation**: tenants table, tenant_id on rooms, subdomain middleware. This is the smallest useful unit of work that advances The Pack's request and creates the architecture for future tenant features (branding, scoped discovery, cross-posting, federation).

Cross-posting to Mastodon/Bluesky is the second step. Full ActivityPub federation is the third. Each step delivers incremental value and can be tested independently.

This is the first time in 5 iterations that Triage has resolved with a buildable outcome. The previous 4 iterations correctly resolved at "don't build" or "prepare for human engagement." This iteration resolves at Extend because a real member with a real need on a real platform has asked for something that extends what already exists.

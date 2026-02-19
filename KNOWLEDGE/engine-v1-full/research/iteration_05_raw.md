# Iteration 05 — Raw Research Findings: Buildable Spec Technical Research

**Date:** 2026-02-13
**Focus:** Triage Steps 1-3 for The Pack Music's request — multi-tenant branding + outbound federation
**Method:** Technical research (existing solutions, libraries, architecture patterns)
**Ground truth:** PLATFORM_STATE.md — kamunity.ai is live, 500+ members, Next.js 14 + Supabase + Prisma + Tailwind on Netlify

---

## Search Budget: 8/8 used

| # | Query | Target | Key Finding |
|---|-------|--------|-------------|
| 1 | Multi-tenant white-label community platform ActivityPub | Triage Step 1: Find | No existing platform combines rooms + calendar + files + polls + federation + white-label |
| 2 | ActivityPub server implementation Next.js TypeScript | Triage Step 3: Extend | **Fedify** — TypeScript ActivityPub framework with `@fedify/next` package |
| 3 | Bluesky AT Protocol API TypeScript SDK | Triage Step 3: Extend | **@atproto/api** — official Bluesky SDK, trivial posting API |
| 4 | Discourse/Matrix/Element multi-tenant federation | Triage Step 1: Find | Matrix has spaces + federation but wrong paradigm; Discourse has some multi-tenant but no federation |
| 5 | Supabase multi-tenant RLS architecture | Triage Step 3: Extend | **Standard pattern:** tenant_id column + Row Level Security. Well-documented. |
| 6 | Next.js multi-tenant subdomain white-label | Triage Step 3: Extend | **Official Vercel guide + platforms example repo.** Production-proven pattern with middleware-based subdomain routing. |
| 7 | Fedify Next.js integration ActivityPub outbound | Triage Step 3: Extend | Fedify has integration docs; designed for framework-agnostic use via middleware |
| 8 | Mastodon cross-posting bridge community platform | Triage Step 4: Integrate | Cross-posting tools exist; Mastodon-Bluesky bridge exists natively |

---

## A. Triage Step 1: FIND — Does a White-Label Federated Community Platform Already Exist?

### Candidates Evaluated

| Platform | Multi-tenant / White-label | Rooms + Calendar + Files + Polls | ActivityPub Federation | Verdict |
|----------|--------------------------|--------------------------------|----------------------|---------|
| **Mastodon** | Yes (per-instance) | No — microblogging only | Yes (native) | Wrong paradigm. No rooms, no calendar, no files. |
| **Matrix/Element** | Yes (homeservers + spaces) | Partial — rooms + chat, no calendar/files/polls as native features | No (Matrix protocol, not ActivityPub) | Closer but different protocol, different UX, heavy infrastructure |
| **Discourse** | Limited (multi-site hosting, some white-label) | Forum-based, not room-based. Calendar plugin. | Plugin (discourse-activity-pub) exists but limited | Closer paradigm but forum not room; federation is plugin-level |
| **Lemmy** | No | No — link aggregation, not coordination | Yes (native ActivityPub) | Wrong paradigm entirely |
| **Bonfire** | Experimental (modular, extensible) | Some — depends on extensions | Yes (experimental) | Too early-stage; not production-ready |
| **Hylo** | No white-label | Groups + events, not rooms | No | Evaluated in I02; no federation, no white-label |
| **Loomio** | No | Decision-making focused, not general coordination | No | Wrong scope |

**Triage Step 1 verdict: Nothing exists that does what The Pack needs.** No existing platform combines: room-based coordination + calendar + files + polls + white-label branding + ActivityPub federation. The closest is Matrix/Element but it uses a different protocol, requires different infrastructure (homeserver), and has a different UX paradigm.

**This is not a "build because building is fun" finding. It's a genuine gap in the landscape.** The Pack's specific combination of needs (sovereign branded space + room-based coordination + outbound federation to ethical platforms) is not served by any existing open-source or commercial platform.

---

## B. Triage Step 2: CONNECT — Could The Pack Use an Existing Solution?

| Option | What It Would Give Them | What It Wouldn't | Verdict |
|--------|------------------------|-----------------|---------|
| Run a Mastodon instance | Federation + sovereignty | No rooms, no calendar, no coordination features | Partial — microblogging only |
| Run a Matrix homeserver | Rooms + chat + federation (Matrix protocol) | No calendar/files/polls natively, not ActivityPub, heavy ops | Too complex for their needs |
| Use Discourse hosted | Forum + some white-label | Not room-based, limited federation | Wrong paradigm |
| Cross-post manually | Reach on Mastodon/Bluesky | No sovereign home base, no coordination | Not a solution |

**Triage Step 2 verdict: No existing solution can be connected to serve The Pack's full need.** Each option serves part of it but misses the core: a branded room-based coordination space with outbound federation.

---

## C. Triage Step 3: EXTEND — Can kamunity.ai Be Extended?

This is where the research found the strongest signal. **Yes, and the technical building blocks are mature.**

### C1. Multi-Tenant Branding (Next.js + Supabase + Prisma)

**Next.js Multi-Tenant:**
- **Official Vercel guide** at nextjs.org/docs/app/guides/multi-tenant
- **Production example:** github.com/vercel/platforms — "A full-stack Next.js app with multi-tenancy and custom domain support" built with Next.js 15
- **Architecture:** Middleware-based subdomain routing. Each tenant gets a subdomain (e.g., `thepack.kamunity.ai`) or custom domain. Middleware reads the hostname, resolves the tenant, and injects tenant context into the request.
- **Prisma compatibility:** The platforms example uses Prisma. Add a `tenant_id` column to relevant tables, add RLS policies, and tenant data isolation is handled at the database level.

**Supabase Multi-Tenant:**
- **Standard pattern:** `tenant_id` column on tables that need tenant scoping + Row Level Security (RLS) policies that filter by tenant
- Well-documented with multiple production examples
- Supabase RLS is PostgreSQL-native — robust and performant
- Pattern: `CREATE POLICY "tenant_isolation" ON rooms FOR ALL USING (tenant_id = current_setting('app.current_tenant')::uuid)`

**What this means for kamunity.ai:**
1. Add a `tenants` table (id, name, slug, logo_url, primary_color, secondary_color, domain, etc.)
2. Add `tenant_id` to `rooms` table (nullable — public kamunity.ai rooms have no tenant)
3. Add Next.js middleware to detect subdomain, resolve tenant, inject into request context
4. Add tenant-aware theming (CSS variables driven by tenant config)
5. Add tenant-scoped room discovery (when at `thepack.kamunity.ai`, show only Pack rooms)

**Complexity: Medium.** Well-understood patterns. No novel engineering. Main risk is migration complexity on live database with 500+ members.

### C2. Outbound Federation via ActivityPub (Fedify)

**Fedify (@fedify/fedify):**
- TypeScript library for building ActivityPub server functionality
- **Has `@fedify/next` package** — dedicated Next.js integration
- 245 releases, 47 contributors — actively maintained
- Features: type-safe Activity Vocabulary, WebFinger, HTTP Signatures, NodeInfo, enhanced Mastodon interoperability
- Available on npm and JSR

**What outbound federation means for kamunity.ai:**
1. A room (or a tenant) becomes an ActivityPub Actor with a fediverse address (e.g., `@thepack@kamunity.ai`)
2. When a post is created in a room, it can optionally be published as an ActivityPub Note
3. Mastodon users can follow `@thepack@kamunity.ai` and see room posts in their feed
4. Replies from Mastodon flow back into the room (optional, adds complexity)

**What Fedify provides:**
- Actor creation and WebFinger resolution (so Mastodon can discover `@thepack@kamunity.ai`)
- Outbox management (publishing posts to followers)
- Inbox handling (receiving replies, follows, likes)
- HTTP Signatures (required for server-to-server authentication)
- Integration with Next.js API routes via `@fedify/next`

**Complexity: High.** ActivityPub is a complex protocol. Fedify abstracts much of it but:
- Requires implementing Actor endpoints (WebFinger, actor JSON-LD, outbox, inbox)
- Requires key pair management for HTTP Signatures
- Requires handling async delivery (ActivityPub uses HTTP delivery with retry)
- Testing requires interacting with real Mastodon instances or test infrastructure
- Edge cases: content type negotiation, JSON-LD context handling, signature verification

### C3. Outbound Posting to Bluesky (AT Protocol)

**@atproto/api:**
- Official Bluesky TypeScript SDK on npm
- Trivial posting API: `agent.post({ text: '...', createdAt: new Date().toISOString() })`
- Auth: username + password → session tokens (accessJwt + refreshJwt)
- Also supports OAuth for more robust auth flow
- Rich text support (links, mentions)

**What outbound Bluesky posting means for kamunity.ai:**
1. The Pack configures a Bluesky account in their tenant settings
2. When a post is marked for cross-posting, the system calls the Bluesky API to create a corresponding post
3. The post appears on Bluesky linked back to the original room

**Complexity: Low.** This is a straightforward API integration. The Bluesky SDK is well-documented and the posting API is simple. Main considerations:
- Token refresh handling (accessJwt expires, need to refresh periodically)
- Rate limiting (Bluesky has rate limits)
- Rich text formatting (converting room post format to Bluesky rich text)
- Image/media handling (if posts include media)

---

## D. Triage Step 4: INTEGRATE — Could We Integrate Existing Tools?

| Integration Option | What It Does | Complexity | Value |
|-------------------|-------------|-----------|-------|
| Cross-post to Mastodon via API | Posts from kamunity.ai rooms appear on a Mastodon account | Low | Outbound reach without full federation |
| Cross-post to Bluesky via @atproto/api | Posts from kamunity.ai rooms appear on a Bluesky account | Low | Outbound reach on Bluesky |
| Full ActivityPub federation via Fedify | kamunity.ai rooms/tenants ARE fediverse actors | High | Full federation — followable, interactable |

**Key distinction:** Cross-posting (Step 4: Integrate) vs. federation (Step 3: Extend) are different things:
- **Cross-posting:** "When I post here, also post there." Simple API call. The Pack posts in their room; it auto-posts to their Mastodon/Bluesky accounts. Followers see it on those platforms.
- **Federation:** "My space IS part of the fediverse." Mastodon users follow `@thepack@kamunity.ai` directly. Content flows bidirectionally. The Pack's room is discoverable from Mastodon.

**The Pack's request says "federation"** — they want their space to connect OUT to the fediverse. But cross-posting delivers 80% of the user-facing value at 20% of the technical complexity. This is a critical architectural decision.

---

## E. Architecture Assessment: The Two-Step Path

### Step 1: Multi-Tenant Branding + Cross-Posting (Highest confidence first step)

**What it gives The Pack:**
- `thepack.kamunity.ai` (or custom domain) with Pack branding
- Rooms visible only within The Pack's space
- Cross-posting from rooms to Mastodon (via Mastodon API) and Bluesky (via @atproto/api)
- Immediate sovereign feel — "this is OUR space"

**Technical stack (extends existing):**
- Next.js middleware for subdomain routing (official Vercel pattern)
- Prisma schema additions: `tenants` table, `tenant_id` on rooms
- Supabase RLS policies for tenant isolation
- CSS variables for tenant theming
- Mastodon API client for outbound cross-posting
- @atproto/api for Bluesky cross-posting
- Tenant settings UI for branding config + social account connections

**Complexity: Medium.** All patterns are proven. No novel engineering.

### Step 2: Full ActivityPub Federation (Future — higher complexity)

**What it adds:**
- `@thepack@kamunity.ai` discoverable from any Mastodon/fediverse client
- Followers can follow from Mastodon without ever visiting kamunity.ai
- Replies/interactions flow back into rooms
- Full fediverse citizenship

**Technical stack (extends Step 1):**
- Fedify `@fedify/next` for ActivityPub protocol handling
- Key pair management per tenant/actor
- WebFinger endpoint at `/.well-known/webfinger`
- Actor, outbox, inbox endpoints per tenant
- Async delivery queue (ActivityPub requires HTTP-based delivery with retry)

**Complexity: High.** Fedify handles protocol complexity but integration with existing room/post model requires careful design.

---

## F. Source Quality Assessment

| Source | Tier | Signal | Relevance |
|--------|------|--------|-----------|
| Next.js multi-tenant docs + Vercel platforms example | 1 (Official docs) | Strong | Direct — same framework as kamunity.ai |
| Supabase RLS multi-tenant pattern | 1 (Official pattern) | Strong | Direct — same database as kamunity.ai |
| Fedify + @fedify/next | 2 (Mature OSS library) | Strong | Direct — TypeScript, Next.js integration, ActivityPub |
| @atproto/api (Bluesky SDK) | 1 (Official SDK) | Strong | Direct — TypeScript, trivial API |
| Mastodon API docs | 1 (Official docs) | Strong | Direct — well-established API |
| Discourse ActivityPub plugin | 3 (Community plugin) | Medium | Comparable — shows what forum-based AP integration looks like |
| Matrix/Element multi-tenant | 2 (Established project) | Medium | Comparative — different paradigm but informs architecture |
| PLATFORM_STATE.md | Ground truth | Highest | The spec must work with what exists |

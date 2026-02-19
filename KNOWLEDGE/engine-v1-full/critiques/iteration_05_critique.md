# Iteration 05 — Self-Critique

**Date:** 2026-02-13
**Spec under review:** iteration_05_spec.md (Multi-Tenant Foundation for kamunity.ai)
**Constitution re-read:** Yes, including Existing Ecosystem, Experimental Mode, and PLATFORM_STATE.md
**This is the first buildable spec in 5 iterations.**

---

## 1. Seven Constitutional Questions

### Q1: Does this serve community sovereignty, or does it create dependency?

**Answer: Serves sovereignty directly.**

Multi-tenant architecture is sovereignty infrastructure. It gives The Pack:
- Their own branded space ("this is OURS")
- Data isolation via RLS (their rooms, their data)
- Room scoping (their community, their discovery)
- Configurable branding (their visual identity)

**Dependency check:** The Pack's space runs on kamunity.ai infrastructure. If kamunity.ai goes down, The Pack's space goes down. This IS a dependency — but it's an informed, transparent dependency on shared infrastructure (like a co-op running on shared utilities), not vendor lock-in. The Pack chose this relationship. The data is theirs. And if they ever wanted to leave, their data could be exported (though this spec doesn't cover data export — flag for future).

**Residual risk:** No data portability mechanism is specified. If The Pack wanted to move their rooms to another platform, there's no export path. This should be addressed in a future spec, but it's not a blocker for Step 1.

**Verdict: PASS — with data portability noted as future requirement**

### Q2: Am I building because it's needed, or because building is what I do?

**Answer: Building because a real member with a real need on a real platform asked for it.**

This is the most grounded spec in 5 iterations because:
- The Pack Music articulated this need directly (PLATFORM_STATE.md)
- kamunity.ai already exists with 500+ members — this extends, not builds from scratch
- Four iterations of research converged on "build when extractive platforms are the problem"
- The Pack's situation matches the model: Spotify is structurally hostile, they need sovereign infrastructure

**Counter-check:** Could The Pack's need be met WITHOUT building? Could they just use kamunity.ai as-is and brand it differently? Not really — there's no tenant concept. All 500 members see the same platform. The Pack wants THEIR space within the platform, not just a room on someone else's platform. The request is architectural, not cosmetic.

**Verdict: PASS — need is real, articulated, and requires this extension**

### Q3: Does something already exist that does this well enough?

**Answer: No. Honestly evaluated.**

7 platforms evaluated in Triage Step 1. None combine rooms + calendar + files + polls + white-label + federation. The closest alternatives:
- Matrix/Element: different protocol, different paradigm, heavy ops
- Discourse: forum-based, limited federation, different UX
- Mastodon: microblogging only, no coordination features
- Hylo: no white-label, no federation (evaluated I02)

The Triage walk-through is thorough and honest. No platform was dismissed without evaluation.

**Verdict: PASS**

### Q4: Could this be misused to concentrate power or extract value?

**Answer: Low risk with one structural consideration.**

The multi-tenant model means kamunity.ai becomes infrastructure for multiple communities. This concentrates INFRASTRUCTURE (single platform, single operator) while distributing IDENTITY (each tenant owns their brand, their space, their rooms).

**Structural consideration:** Mike/Kamunity controls the infrastructure. The Pack's space exists at Mike's pleasure. This is mitigated by:
- The trust relationship that already exists
- The Constitution's Sovereignty First principle
- RLS-based data isolation (infrastructure operator can bypass RLS with service role key, but this is true of any hosted platform)

**Is this different from Spotify?** Yes — fundamentally. Spotify's extraction is structural (prorated payments, algorithmic discovery that favours major labels). Kamunity's model is transparent (The Pack chose it, they can see what they get, their data is isolated, the code is the same platform they already use).

**Verdict: PASS — but infrastructure concentration is an inherent trade-off of shared platforms, acknowledged honestly**

### Q5: Am I optimising for the measurable at the expense of the illegible?

**Answer: The spec balances both.**

**Measurable:** Acceptance criteria are testable (subdomain resolves, rooms are scoped, theming applies, RLS isolates data). These need to be measurable for a buildable spec.

**Illegible:** The spec explicitly acknowledges that the branded space gives The Pack IDENTITY — belonging, ownership, "this is ours." AC4 (theming) isn't just about CSS colors — it's about The Pack seeing their logo and feeling "this is our space." This illegible value is the real point; the CSS variables are just how it's implemented.

**Verdict: PASS**

### Q6: Would a real community organisation actually use this? Why or why not?

**Answer: Yes — The Pack Music specifically asked for it.**

This isn't a hypothetical spec for a hypothetical user. The Pack is:
- A live Kamunity member
- A Perth-based co-operative with real operations
- Already working with Perth LGAs (Fremantle, Vincent, Subiaco)
- Already present on Mastodon/Bluesky
- In a trust relationship with Mike/Kamunity

Their articulated need (PLATFORM_STATE.md §The Pack Music — Specific Needs) maps directly to this spec.

**Risk:** The spec is Step 1 of multiple. The Pack might be disappointed if they expect the full vision (federation, custom domain, full stakeholder room ecosystem) and get "just" branded subdomain with room scoping. Setting expectations about the incremental approach matters.

**Verdict: PASS — real member, real need, incremental delivery communicated**

### Q7: Is the need I identified real, or did I construct it from cherry-picked sources?

**Answer: The need is directly expressed by the member, not constructed by the engine.**

Previous iterations (I01-04) identified needs through web research — always at risk of construction. This iteration's need source is PLATFORM_STATE.md, which documents direct input from Mike based on The Pack's articulated request. The engine didn't find this need — the member expressed it.

The engine's role here is technical research (what patterns exist to serve this need) and Triage (what's the right level of intervention). The need itself is given, not discovered.

**Verdict: PASS — strongest Q7 answer across all 5 iterations**

---

## 2. Existing Ecosystem Check

| Component | How the Spec Accounts for It |
|-----------|------------------------------|
| **kamunity.ai** | IS the platform being extended. Spec preserves all existing functionality (AC7: Zero Regression). |
| **FactoryK** | Named as target executor. Spec includes implementation order and time estimates for FactoryK/Windy. |
| **NP Digital Solutions** | Not directly relevant — The Pack's need is already mapped. |
| **CoachFlux** | Could support The Pack during onboarding to their new space. Not in this spec. |
| **Extensa Studio** | Could polish The Pack's branding/theming configuration. Not in this spec. |
| **The Pack Music** | THE member this spec serves. Their request is the ground truth. |
| **ALIKE WA** | Could be a future tenant. Multi-tenant architecture generalises beyond The Pack. |
| **Tech stack** | Spec uses existing stack: Next.js 14, Supabase, Prisma, Tailwind, Netlify. No new stack components. |
| **Design principles** | Campfire aesthetic preserved as default. Tenant theming extends, not replaces. |

**Verdict: PASS — ecosystem deeply respected. No new stack. Extends existing platform.**

---

## 3. Trust Constraint Test

| Spec Element | Trust Test | Pass? |
|-------------|-----------|-------|
| Multi-tenant architecture | Gives The Pack sovereignty over their space — trust-building | Yes |
| RLS data isolation | Technical trust infrastructure — data can't leak between tenants | Yes |
| Subdomain routing | The Pack's address is `thepack.kamunity.ai` — their identity, not generic | Yes |
| Incremental approach | Ship Step 1, get feedback, iterate — respects The Pack's input loop | Yes |
| Zero regression guarantee | Existing 500+ members unaffected — trust with existing community maintained | Yes |
| Tenant admin | The Pack controls their own branding — autonomy, not dependency | Yes |

**Trust constraint verdict: Satisfied.**

---

## 4. Bias Identification

### Bias 1: Incremental Bias
The spec recommends the smallest useful step (multi-tenant foundation) rather than the full vision (branded space + federation + stakeholder rooms). This is good engineering practice but could frustrate The Pack if they expect the full picture. The incremental approach is correct but must be communicated clearly.

**Severity: Low.** Mitigated by the spec's roadmap (Step 1 → cross-posting → federation) and by the relationship context (The Pack already trusts the iterative approach).

### Bias 2: Technical Optimism
The time estimates (~16 hours) assume clean implementation on a known codebase. In reality:
- The engine cannot access the kamunity.ai codebase
- Actual Prisma schema may have complications not visible from PLATFORM_STATE.md
- Netlify's wildcard subdomain support may have edge cases
- RLS policies may interact with existing auth flows in unexpected ways

**Severity: Medium.** The estimates are directionally correct for the patterns described, but actual implementation may take longer. The spec should note this uncertainty.

### Bias 3: Single-Member Optimisation
The spec serves The Pack Music specifically. ALIKE WA (780+ groups) might have different multi-tenant needs (e.g., peer support groups as tenants would be a very different scale — 780 tenants vs 1). The architecture should be general enough to support future tenants, not hardcoded for The Pack.

**Severity: Low.** The spec's architecture IS general (any number of tenants, any slug, any branding). But the testing and migration strategy are Pack-specific. Future tenants at different scales may require additional work.

### Bias 4: Missing Codebase Access
The engine has never seen the kamunity.ai codebase. The spec is written against PLATFORM_STATE.md (features and stack) and standard patterns (Next.js multi-tenant, Supabase RLS). If the actual codebase has architectural decisions that conflict with these patterns (e.g., non-standard Prisma setup, custom auth flow, edge middleware limitations on Netlify), the spec may need revision.

**Severity: Medium.** This is an inherent limitation. The spec is honest about what it's based on (PLATFORM_STATE.md + standard patterns). Actual implementation will need to adapt to the real codebase.

---

## 5. What the Spec Gets Right

1. **Triage is honest and thorough.** 7 platforms evaluated at Step 1. Clear reasoning through Steps 1-3. Resolves at Extend with genuine justification.
2. **Acceptance criteria are testable.** 7 ACs, each with checkboxes. A developer can verify each one independently.
3. **Migration strategy is safe.** Nullable `tenant_id` with NULL default means zero change to existing data. Incremental deployment steps.
4. **Architecture is general.** Not hardcoded for The Pack — any future tenant can use the same infrastructure.
5. **Scope is disciplined.** Explicit "What This Spec Does NOT Cover" section. Cross-posting, federation, custom domains, billing are all deferred.
6. **Connected to 4 iterations of research.** This isn't a random feature — it's grounded in "build when extractive" (I04), "sovereignty first" (Constitution), "real voices not assumptions" (The Pack asked for it).

## 6. What Could Be Improved

1. **Data portability.** No export mechanism for tenant data. Should be flagged as a sovereignty requirement for a future spec.
2. **Time estimates need uncertainty range.** "~16 hours" should be "~16-24 hours" to account for codebase surprises.
3. **Netlify wildcard subdomain verification.** Should verify Netlify's support for `*.kamunity.ai` before committing to subdomain architecture.
4. **Tenant member model is deferred.** The spec gives The Pack a branded space but doesn't define who "belongs" to the tenant. Are all kamunity.ai members able to see Pack rooms? Or only Pack members? This needs clarification — AC6 says "users within that tenant's context" but doesn't define what determines tenant membership.
5. **The Pack should validate the spec.** Before building, share the acceptance criteria with The Pack and confirm it matches their expectations for Step 1.

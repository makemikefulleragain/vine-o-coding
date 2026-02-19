# Iteration 05 — Confidence Score

**Date:** 2026-02-13
**Spec:** Multi-Tenant Foundation for kamunity.ai (First Buildable Spec)
**Scoring model:** CONFIDENCE_MODEL.md (4 dimensions, 25 points each)

---

## Dimension 1: Research Signal Strength (0-25)

**Score: 22/25**

**Justification:**
- The need is directly expressed by The Pack Music via PLATFORM_STATE.md — not constructed from web research. This is the strongest signal type the engine has worked with across 5 iterations.
- Technical research found mature, well-documented solutions for every component: Next.js multi-tenant (official Vercel guide + production example), Supabase RLS (standard pattern), @atproto/api (official Bluesky SDK), Fedify with @fedify/next (TypeScript ActivityPub with Next.js integration).
- Triage Step 1 was thorough: 7 platforms evaluated, none match the combined requirement.
- PLATFORM_STATE.md provides ground truth about what exists and what's been asked for.

**Deductions:**
- -2 for no codebase access. The spec is written against PLATFORM_STATE.md and standard patterns, not against the actual kamunity.ai code. Implementation surprises are possible.
- -1 for Netlify wildcard subdomain support not verified. The architecture assumes it works; should be confirmed before build.

---

## Dimension 2: Source Convergence (0-25)

**Score: 22/25**

**Justification:**
- **Need convergence:** The Pack's request aligns with 4 iterations of research: "build when extractive" (I04 model amendment), "sovereignty first" (Constitution), "real voices not assumptions" (The Pack asked for this), "communities coordinate well already and need infrastructure, not advice" (I03 reframe).
- **Technical convergence:** Multiple independent sources confirm the same architecture: Vercel's official multi-tenant guide, Supabase's RLS documentation, community examples of Prisma multi-tenant, Fedify's Next.js integration package. These aren't competing approaches — they converge on the same pattern.
- **Triage convergence:** All 7 evaluated platforms fail for the same reason — none combine room-based coordination with white-label branding and federation. The gap is real and consistent.

**Deductions:**
- -2 for single-member validation. Only The Pack has expressed this specific need. ALIKE WA might want different multi-tenant features (780 groups as tenants is a different scale). The architecture is general but the validation is Pack-specific.
- -1 for cross-posting vs. federation architectural decision being made by the engine without The Pack's explicit input on the trade-off. The spec recommends cross-posting first (80% value at 20% complexity), but The Pack said "federation." They should confirm they're okay with the incremental approach.

---

## Dimension 3: Constitutional Alignment (0-25)

**Score: 24/25**

**Justification:**
- **Sovereignty First:** Multi-tenant architecture IS sovereignty infrastructure. Branded space, data isolation, identity ownership. ✓
- **Triage Before Build:** Resolved at Extend after honest evaluation of Steps 1-5. Seven platforms evaluated. No shortcuts. ✓
- **Real Voices:** The Pack directly articulated this need. Not constructed, not assumed. Strongest Q3/Q7 in 5 iterations. ✓
- **The Illegible Matters:** Identity, belonging, "this is ours" — explicitly acknowledged alongside measurable ACs. ✓
- **Harm Prevention:** Data isolation via RLS. No surveillance. No extraction. ✓
- **Transparency:** Full Triage walk-through, all alternatives documented, risks listed, migration strategy detailed. ✓
- **Existing Ecosystem:** Uses existing stack (Next.js, Supabase, Prisma, Tailwind, Netlify). Extends existing platform. Names FactoryK as executor. ✓

**Deductions:**
- -1 for data portability not addressed. Sovereignty First implies The Pack should be able to take their data and leave. The spec notes this as a future requirement but doesn't include it. This is acceptable for Step 1 but cannot be deferred indefinitely.

---

## Dimension 4: Triage Honesty (0-25)

**Score: 23/25**

**Justification:**
- **Step 1 (Find):** 7 platforms honestly evaluated. Each assessed on the specific combination of features The Pack needs. None dismissed without reason. The closest alternatives (Matrix/Element, Discourse) are explained with specific reasons they don't fit.
- **Step 2 (Connect):** Connecting to partial solutions honestly assessed as recreating the integration gap from I01. Not hand-waved.
- **Step 3 (Extend):** Resolution at Extend is genuine — kamunity.ai has the features, the patterns are proven, the extension is well-scoped. This is not "Build" dressed as "Extend."
- **Incremental scoping:** The spec explicitly defers cross-posting, federation, custom domains, billing, member management. Each deferral is explained with reasoning and timing.
- **"What This Spec Does NOT Cover"** section is thorough and honest.

**Deductions:**
- -1 for tenant member model being deferred without a clear interim answer. The spec says rooms are scoped to tenants, but doesn't define who can access tenant rooms. Are they public within the subdomain? Do users need tenant membership? This ambiguity should be resolved before build, not after.
- -1 for INVOLVE (Volunteering WA) evaluation still outstanding from I04. While not directly relevant to The Pack's spec, it's an unresolved Triage obligation that should be noted.

---

## Total Score

| Dimension | Score |
|-----------|-------|
| Research Signal Strength | 22/25 |
| Source Convergence | 22/25 |
| Constitutional Alignment | 24/25 |
| Triage Honesty | 23/25 |
| **TOTAL** | **91/100** |

---

## Routing Decision

**Score: 91 — AUTONOMOUS (80+ range)**

Per Constitution:
> "The research signal is clear and convergent. Community voices align. The path forward is obvious. Proceed without human intervention. Log everything."

Per ENGINE.md §Phase 6 (80+):
> "Write build instructions. Proceed to Phase 6."

**This is the highest confidence score across 5 iterations, and the first to produce build instructions.**

---

## Confidence Trajectory

| Iteration | Score | Routing | Type | Key Driver |
|-----------|-------|---------|------|-----------|
| 01 | 51 | Escalate | Landscape scan | Broad, multiple valid paths |
| 02 | 77 | Proceed with caution | Deep-dive + AU data | "Don't build yet" |
| 03 | 88 | Autonomous | Handoff preparation | Research converged, handoff correct |
| 04 | 79 | Proceed with caution | Web listening | Model amended, but thin evidence |
| **05** | **91** | **Autonomous** | **Buildable spec** | **Real member, real need, proven patterns** |

**The trajectory tells a story:**
- I01: "We don't know enough" → Escalate
- I02: "We know more but shouldn't build yet" → Caution
- I03: "Research is done, humans need to talk to communities" → Handoff
- I04: "Web listening adds specificity but less signal" → Caution (honest drop)
- I05: "A real member asked for something we can build with proven patterns" → Build

The highest confidence comes not from more research but from a real need meeting proven technical patterns on an existing platform. The 91 is earned by the convergence of need (The Pack), capability (kamunity.ai), and method (standard multi-tenant patterns).

---

## Flagged Items (Even at 91)

1. **No codebase access.** The spec is written against PLATFORM_STATE.md, not the actual codebase. Implementation may reveal architectural conflicts. The spec should be reviewed by whoever touches the code.

2. **Tenant membership model is undefined.** Who can access tenant rooms? This needs answering before build, not after.

3. **The Pack should validate the incremental approach.** They said "federation" — the spec delivers "branded space first, federation later." They should confirm this sequencing works for them.

4. **Netlify wildcard subdomain support.** Should be verified with a quick test before committing to the subdomain architecture.

5. **Data portability.** Not in this spec but required by Sovereignty First. Should be in the next spec.

6. **Time estimates are optimistic.** 16 hours assumes clean codebase integration. Budget 16-24 hours to account for surprises.

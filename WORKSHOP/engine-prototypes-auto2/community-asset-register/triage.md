# Triage: community-asset-register

## Decision: BUILD

## Reasoning

Applying Find → Connect → Extend → Integrate → Build:

### Find
Searched for: tool lending libraries, community asset sharing platforms, inter-org sharing tools, Australian sharing economy platforms, nonprofit asset management.

**No existing tool directly addresses this use case.** The closest are:
- Tool libraries (LocalTools/myTurn) — single-org lending to individual members, not inter-org
- Sharing economy platforms — consumer P2P, not nonprofit-to-nonprofit
- Asset management software — enterprise single-org, not discovery/sharing between orgs
- Community asset mapping — methodology, not software

### Connect
The outcome requires inter-organization discovery and sharing — Group A registers a projector, Group B finds it and requests to borrow it. No existing tool covers this specific workflow for community organisations.

### Extend
Could extend a tool library platform? No — the model is fundamentally different (single library → many members vs. many orgs → many orgs). Would require rewriting, not extending.

### Integrate
Nothing suitable to integrate with.

### Build — Warranted
The gap is genuine and the scope is well-defined:
- Asset CRUD (register, edit, remove assets)
- Category system (spaces, equipment, skills, vehicles)
- Browse/search with filters
- Contact-to-borrow flow (simple: show contact info)
- No payment processing (community sharing, not rental)
- Standalone web app with mock data

## Scope Definition
- Single-page React app (Next.js patterns with Tailwind)
- Mock data (no live Supabase required for demo)
- Asset registration form
- Browse/search with category and location filters
- Asset detail view with contact info
- Responsive design

## Constitutional Check
- **Triage Before Build:** ✅ Thorough search found no existing tool. Gap is genuine.
- **Honesty Over Output:** ✅ Build is warranted by evidence, not by desire to build.
- **Scope Discipline:** ✅ Well-bounded: CRUD + search + contact. No payments, no auth, no real-time.
- **Harm Check:** ✅ Sharing community assets strengthens cooperation. No surveillance risk. Contact info is voluntarily provided by the listing org.

## Prediction Alignment
QUEUE.md predicts "Likely build. Genuine gap in community sharing. Well-scoped." I agree — the research confirms the gap. This is the most clear-cut build in the queue.

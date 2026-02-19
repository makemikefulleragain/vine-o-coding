# Research: community-asset-register

## Search 1: Community asset sharing / tool library platforms

**LocalTools / myTurn** (localtools.org → myturn.com) — Web-based platform for managing tool lending libraries and "Libraries of Things." Manages inventory, members, check-in/check-out.

- Focus: **Single library lending to individual members** (one org → many people)
- NOT inter-organization sharing (Group A shares with Group B)
- SaaS product, not open source
- Good for a tool library; wrong model for inter-org asset register

**Community Spaces Network** (communityspaces.org) — Focused on social purpose real estate. About physical spaces (nonprofit centers, libraries), not shared equipment/assets between orgs.

**Community Asset Mapping** (various) — Methodology for identifying community strengths and resources. Conceptual/strategic, not a software tool for managing and facilitating asset sharing.

## Search 2: Inter-organization sharing platforms for nonprofits

**No direct match found.** The search returned:
- Nonprofit shared services (concept, not tool) — e.g., sharing office space, HR
- ResourceSpace — Digital asset management (DAM) for nonprofits. Wrong kind of "asset" — it's for managing digital files, not physical equipment
- General articles about nonprofit resource sharing as a concept

## Search 3: Sharing economy platforms (Australia)

**The Sharing Hub** (thesharinghub.com.au) — Aggregator of P2P sharing platforms in Australia. Lists consumer-to-consumer platforms (Camplify for RVs, The Volte for fashion, etc.). Not nonprofit-to-nonprofit.

**Australian tool libraries** — Community-run programs where members pay a subscription to borrow goods. Individual membership model, not inter-org.

**No Australian platform found** that specifically enables community organisations to register and discover shared physical assets for inter-group borrowing.

## Gap Analysis

| Need | Existing tools | Gap? |
|---|---|---|
| Inter-org asset register (Group A lists, Group B finds) | No direct match | **YES — genuine gap** |
| Categories: spaces, equipment, skills, vehicles | Tool libraries cover equipment only | **YES — broader scope** |
| Browse/search by category or location | Tool libraries have inventory, not discovery | **YES — discovery-focused** |
| Request-to-borrow flow | Tool libraries have check-out, not request | **Partial** |
| No payment processing | Most sharing platforms handle payments | **Aligned — simpler** |
| Community org context (nonprofits sharing with nonprofits) | Consumer P2P platforms exist, not B2B nonprofit | **YES — specific niche** |

## Key Finding

The inter-organization asset sharing register is a **genuine gap**:
1. Tool libraries are single-org, individual-membership models
2. Sharing economy platforms are consumer P2P, not nonprofit inter-org
3. Asset management software is enterprise/single-org
4. Community asset mapping is a methodology, not a software tool
5. No Australian-specific platform found for this use case

The scope is well-defined:
- Register assets (CRUD with categories)
- Browse/search (discovery)
- Contact owner to request (simple — no payment flow)
- Standalone web app with Supabase backend

This is a legitimate build target. The scope is achievable in a single session. The niche is underserved.

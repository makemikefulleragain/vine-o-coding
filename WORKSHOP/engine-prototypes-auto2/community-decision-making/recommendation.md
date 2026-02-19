# Recommendation: Use Loomio for Community Decision-Making

## Tool: Loomio
**Website:** https://www.loomio.com
**Source Code:** https://github.com/loomio/loomio
**License:** AGPL-3.0 (open source, self-hostable)
**Built by:** Loomio Cooperative — a worker-owned cooperative in Aotearoa New Zealand

## Why Loomio Is the Right Answer

Loomio was built for exactly this use case. It is the product of 12+ years of focused development on collaborative decision-making for community organizations, cooperatives, and nonprofits.

**Feature match:**
| Outcome Requirement | Loomio Feature |
|---|---|
| Create proposals with title, description, deadline | ✅ Native proposal system |
| Discussion/comments | ✅ Threaded discussion on every proposal |
| Voting (yes/no/abstain or ranked choice) | ✅ Show of thumbs, ranked choice, score voting, dot voting, multiple choice |
| Transparent results | ✅ Real-time results visible to all participants |
| Decision history preserved | ✅ Full decision archive with search |
| Standalone web app | ✅ SaaS or self-hosted |

**Values alignment:**
- Worker-owned cooperative structure — not VC-funded, not extractive
- Open source (AGPL-3.0) — can self-host for full data sovereignty
- No data mining of members
- Mission-driven: "more people practicing effective, inclusive decision-making"
- NZ-based — culturally proximate to Australian community sector

## How to Adopt

### Option A: Loomio Cloud (easiest)
1. Sign up at loomio.com
2. Create a group for your community organization
3. Invite members via email
4. Start creating proposals
- **Cost:** $299/year (nonprofit Starter, up to 30 members) or $499/year (nonprofit Pro, up to 300 members)
- **Setup time:** 30 minutes

### Option B: Self-Hosted (full sovereignty)
1. Deploy from GitHub (loomio/loomio-deploy)
2. Run on your own server (Docker-based deployment)
3. Full control of data
- **Cost:** Free (software) + hosting costs (~$20-50/month for a small VPS)
- **Setup time:** 2-4 hours for someone with Docker experience

## What It Costs

| Plan | Price (nonprofit) | Members | Notes |
|---|---|---|---|
| Starter | $299/year | Up to 30 | No subgroups |
| Pro | $499/year | Up to 300 | Unlimited subgroups |
| Private Host | $4,999/year | Unlimited | SSO, custom branding, dedicated server |
| Self-hosted | Free | Unlimited | You manage hosting |

All prices USD. Nonprofit pricing available to charities, member-funded orgs, volunteer organizations.

## What Gaps Remain

- **Integration with kamunity.ai:** Loomio is a standalone platform. If kamunity.ai wanted to embed decision-making within its own interface, that would require integration work (Loomio has an API).
- **Branding:** The cloud version carries Loomio's branding. Self-hosted or Private Host allows custom branding.
- **Australian data hosting:** Private Host plan offers Australian data center option. Cloud servers are in USA or Netherlands.
- **Offline use:** Loomio is web-only. No offline capability.

## Why NOT to Build a Replacement

- Loomio has 12+ years of iteration on UX, accessibility, edge cases, and moderation
- Building a new decision-making tool from scratch would take months to reach feature parity
- The resulting tool would be less tested, less accessible, and less maintained
- Loomio's cooperative ownership model means it won't be acquired and enshittified
- Community organizations already using Loomio would not switch to an unknown alternative
- Development time is better spent on problems where no good solution exists

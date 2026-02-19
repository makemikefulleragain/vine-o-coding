# Phase 1 Triage — The Free Audit

**Date:** 2026-02-17

---

## What's the highest-value thing to build?

The audit itself — 10 questions across 4 dimensions, producing a visual sovereignty map with per-dimension recommendations. This is the core product. Everything else (toolkit, services, content) depends on this existing first.

## Does something already exist we should integrate with?

- **TechSoup Assessment** exists but is enterprise-focused, uses tracking, and isn't sovereignty-respecting. Not suitable to embed or redirect to.
- **No existing open-source audit tool** fits our specific use case (Australian community orgs, digital sovereignty focus, privacy-first).
- **Decision:** Build from scratch. The quiz logic is straightforward; the value is in the questions, scoring model, and recommendations — not the technology.

## Is the phase goal still right?

Yes. Research confirms:
1. The audience exists (9,500+ NFPs seeking digital help via Infoxchange alone)
2. No competing tool serves this exact niche
3. The maturity-map approach (not grades) is validated by SUSE and NN/G patterns
4. Client-side-only is both a constitutional requirement and a market differentiator

## Build Decision

**Build the complete audit flow:**
1. Landing page — what this is, who it's for, 30-second understanding
2. Quiz — 10 questions, one at a time, progress indicator
3. Results — sovereignty map (4 dimensions, traffic-light), overall score, per-dimension recommendations
4. Sensitive data flag — if org handles high-risk data, surface specialist referral
5. All client-side, no tracking, no data transmission

## What NOT to build in Phase 1

- Save/resume (localStorage) — nice-to-have, defer to Phase 2
- PDF export — defer
- Email results — defer
- Toolkit/guides — Phase 2
- Services/pricing — Phase 3
- CMS/admin — Phase 3

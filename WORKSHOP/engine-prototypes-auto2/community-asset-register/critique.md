# Critique: community-asset-register

## Constitutional Questions

### 1. Does this serve community sovereignty?
**Yes.** An inter-org asset register strengthens community self-reliance by making shared resources visible. Groups can borrow from each other instead of purchasing or renting commercially. This directly reduces dependency on external providers and builds inter-group trust.

### 2. Could this concentrate power?
**Low risk.** The tool is a directory — it doesn't control access to assets. Groups voluntarily list what they're willing to share. No gatekeeper role. However, whoever hosts the register has some power (could delist groups, modify data). Mitigated by keeping it simple and transparent.

### 3. Could this be used for surveillance or data extraction?
**Low risk.** Contact info is voluntarily provided by listing organisations. No user tracking, no analytics, no accounts required to browse. The main risk is spam to listed contact emails — mitigated by showing emails only in detail view (not scraped from a public list).

### 4. Is the scope appropriate?
**Yes.** CRUD + search + contact is a tight scope. No payments, no auth system, no real-time features. Well within single-session build capacity. Under 500 lines.

### 5. Is the evidence sufficient?
**Yes.** Four categories of existing tools searched. None address inter-org asset sharing for community organisations. The gap is confirmed from multiple angles: tool libraries (wrong model), sharing economy (wrong users), asset management (wrong scale), asset mapping (wrong output).

### 6. Was Triage honest?
**Yes.** Genuine search conducted. No existing tool found. The gap is real, not manufactured. The build is warranted by absence of alternatives, not by desire to build.

### 7. Am I biased toward building?
**Checked.** This is the second build in the queue (after Outcome 5). After the honest restraint of Outcomes 1-4, there could be a "release valve" effect — now I have permission to build, so I'm eager. However, the evidence genuinely supports building here. The gap is clearer than Outcome 5. I'm more confident in this build decision.

## Critique of the Build Decision

### Arguments FOR building:
- Genuine gap — no existing tool found for inter-org community asset sharing
- Well-scoped — CRUD, search, contact. No payments, no auth, no real-time
- High value-to-effort ratio — relatively simple build serves an underserved niche
- Community sector specific — general sharing platforms don't serve this use case
- Outcome spec is clear and testable

### Arguments AGAINST building:
- A shared Google Sheet could achieve 60% of this with zero development
- Without a real database (Supabase), this is a demo, not a usable tool
- Adoption requires many orgs to list assets — chicken-and-egg problem
- The tool doesn't solve the trust/logistics problem (how do you actually hand over a marquee?)

### Resolution:
Building is correct because:
1. A Google Sheet doesn't provide search, filtering, or a decent mobile experience
2. The demo demonstrates the concept and can be connected to Supabase for production use
3. The chicken-and-egg problem is real but is an adoption challenge, not a build-vs-don't-build decision
4. Trust/logistics are out of scope (rightly) — the tool facilitates discovery, not the physical exchange

## Bias Check
- **Building bias:** Acknowledged. This is the clearest build case, which may make me overconfident. Mitigated by honest gap analysis.
- **Prediction-matching bias:** Queue predicts "Likely build." This aligns, but my research independently confirms the gap.
- **Completeness bias:** Desire to end the run with a strong build may inflate confidence. Mitigated by critique of weaknesses above.

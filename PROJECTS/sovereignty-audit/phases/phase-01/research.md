# Phase 1 Research — The Free Audit

**Date:** 2026-02-17
**Searches used:** 5/5

---

## Key Findings

### 1. SUSE Digital Sovereignty Self-Assessment Framework (2025)
- **Source:** Futurum Group analysis of SUSE's Cloud Sovereignty Framework
- **Relevant patterns:**
  - Uses SEAL levels 0-4 (maturity scoring, not pass/fail)
  - Results stored locally in user's browser — privacy-first
  - Produces downloadable roadmap mapping gaps to remediation steps
  - Weights sovereignty objectives (supply chain control, operational autonomy) so risk concentration is visible
  - Treats sovereignty as operational discipline, not compliance checkbox
- **Takeaway for us:** Our "Sovereignty Score" should be a maturity map, not a grade. Weight dimensions by risk. Store everything client-side. Produce actionable next steps.

### 2. NN/G UX Maturity Self-Assessment Quiz
- **Source:** Nielsen Norman Group
- **Relevant patterns:**
  - 13 questions → raw score 0-100 → mapped to 6 named stages
  - Each response earns points; totalled at end
  - Score ranges established through weighted importance analysis
  - Iteratively tested with real professionals
  - Named stages (Absent → Limited → Emergent → Structured → Integrated → User-Driven) are more useful than raw numbers
- **Takeaway for us:** Use named stages for our dimensions. Keep to ~10 questions. Weight by importance. Give people a stage name, not just a number.

### 3. TechSoup Digital Assessment Tool
- **Source:** assessment.techsoup.org
- **Relevant patterns:**
  - Exists as competitor — Angular SPA with Google Tag Manager (tracks users)
  - Enterprise-focused, not community-org focused
  - Client-side rendered (couldn't scrape content)
- **Takeaway for us:** We differentiate by being sovereignty-respecting (no tracking), community-org focused, and Australian-context aware. TechSoup validates the market exists.

### 4. Australian NFP Digital Context (Infoxchange 2025 Report)
- **Source:** Infoxchange 2025 Digital Technology in the NFP Sector Report
- **Relevant patterns:**
  - 9,500+ NFPs accessed Digital Transformation Hub in 2024
  - Peer networks transforming how NFPs learn and collaborate
  - Sector-created communities of practice delivering practical results
- **Takeaway for us:** The audience exists and is actively seeking help. Peer-network framing resonates. Practical > theoretical.

### 5. PwC NFP Cyber Defence (2025)
- **Source:** PwC Australia
- **Relevant patterns:**
  - First-of-its-kind cyber simulation for NFPs
  - Part of wider digital uplift program
  - NFPs are increasingly targeted by cyber threats
- **Takeaway for us:** Security/data-handling questions in our audit are timely. Flag high-risk orgs for specialist help.

---

## Existing Tools Landscape

| Tool | Focus | Audience | Tracking | Cost |
|------|-------|----------|----------|------|
| TechSoup Assessment | Digital maturity | Global NFPs | Google Tag Manager | Free |
| SUSE Sovereignty Framework | Cloud sovereignty | Enterprise | Browser-local | Free |
| Infoxchange DTH | Digital transformation | AU NFPs | Unknown | Free |

**Gap:** No free, privacy-respecting, community-org-focused digital sovereignty self-assessment exists for Australian NFPs. Our tool fills this gap.

---

## Design Principles Derived from Research

1. **Maturity map, not grades** — Named stages per dimension (like SUSE SEAL levels and NN/G stages)
2. **Weighted scoring** — Not all dimensions equally important; data ownership > cost transparency
3. **Client-side only** — Zero data transmission, localStorage for save/resume
4. **~10 questions** — NN/G uses 13; we target 8-12 as specified
5. **Actionable output** — Each dimension gets specific recommendations, not just a score
6. **Named dimensions** — Data Ownership, Vendor Lock-in, Cost Transparency, AI Readiness (from PHASE_QUEUE)
7. **Sensitive data flag** — Orgs handling high-risk data get specialist referral (from CONSTITUTION harm check)
8. **2-minute completion** — Roughly 10-15 seconds per question average

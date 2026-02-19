# Phase 3 Research: Make It Trustworthy

**Date:** 2026-02-14
**Searches used:** 5/5

---

## Research Question
What makes a volunteer treasurer at a small Australian nonprofit trust a free online tool with their grant acquittal data?

---

## Finding 1: Privacy Policy Is Expected (Even When Not Legally Required)

**Sources:** ACNC guidance on managing data, OAIC privacy guidance for NFPs, Norton Rose Fulbright

Australian small businesses/NFPs with turnover under $3M are generally exempt from the Privacy Act 1988. However:
- ACNC governance standards expect charities to handle information responsibly
- OAIC strongly recommends NFPs adopt good privacy practice regardless of legal obligation
- The Privacy Act exemption may be removed in upcoming reforms

**For our tool:** We handle grant financial data (funder names, amounts, expense descriptions) — not donor personal data or health records. But a volunteer treasurer needs to know: what data do we collect? Where is it stored? Can we see it? Can they delete it?

**Action:** A clear, plain-English privacy page is essential. Not legalese — a genuine explanation.

## Finding 2: "Who Built This?" Is the #1 Trust Question

**Sources:** CrazyEgg trust signals research, Buffer about page case study

The trust signals research found that "nothing is more frustrating than landing on a page and being unable to find the people behind the organization." For a free tool handling financial data, this is amplified.

Users need:
- Who built it and why
- What's the connection to the nonprofit sector
- Is it a business? A community project? Is there a catch?
- Where does it run (which country's servers)?

**Action:** An "About" page explaining Kamunity (kamunity.ai), the motivation, and the community nature.

## Finding 3: Data Sovereignty Builds Trust

**Sources:** Council of Nonprofits (data privacy imperative), EFF (online privacy for nonprofits)

Key principle from Council of Nonprofits: "Collect only what you need" and "be transparent about how data will be used." The EFF recommends organisations minimise data collection.

Our tool already has JSON export (data sovereignty). But this trust signal is buried — it's just a button on the grant list. It should be prominently communicated: "Your data is yours. Download it anytime. Delete it anytime."

**Action:** Make data sovereignty visible and prominent, not just functional.

## Finding 4: Treasurer Handover Is a Real Workflow

**Sources:** MoneyMinder (ultimate guide to volunteer treasurer), MoneyMinder features page

Volunteer treasurers change frequently (typically annual rotation). The MoneyMinder guide dedicates an entire section to "Transitioning In" — getting files, passwords, supplies from the outgoing treasurer.

Currently our tool uses anonymous auth — if you clear your browser, you lose access. This is a trust problem: "What happens when I hand over to the next treasurer?"

**Action:** This is a Phase 4+ concern (requires user accounts). But Phase 3 should clearly communicate the current limitation and provide a workaround (export data, import on new device).

## Finding 5: Security Signals Are Table Stakes

**Sources:** CrazyEgg trust signals, ACNC data guidance

For a web app handling financial data:
- HTTPS is non-negotiable (Netlify provides this by default)
- Clear indication of what "Cloud mode" means (Supabase hosted in Sydney? US? Where?)
- No payment processing = lower bar, but financial data still needs care

**Action:** Add visible security/privacy indicators. Explain what Supabase is and where data is stored.

---

## Candidate Features (Ranked by Trust Impact)

| Feature | Trust Impact | Effort | Score |
|---------|-------------|--------|-------|
| About page (who, why, open source) | Critical | Low | **1st** |
| Privacy page (plain English, what data, where stored) | Critical | Low | **2nd** |
| Data transparency in-app (what Cloud mode means) | High | Low | **3rd** |
| FAQ (common treasurer questions) | Medium | Low | **4th** |
| Data deletion capability | Medium | Medium | **5th** |
| Contact/feedback mechanism | Medium | Low | **6th** |

---

## Key Insight

Trust for a free nonprofit tool isn't about enterprise security features or compliance badges. It's about **transparency** — being honest about who you are, what data you handle, and giving users control. A small nonprofit treasurer needs to answer one question to their board: "Can we trust this tool with our grant data?" The answer needs to be findable on the website itself.

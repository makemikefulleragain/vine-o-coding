# Phase 5.5 Critique: Listen — Feedback Infrastructure & Outreach

**Date:** 2026-02-14

---

## Constitutional Check

| Principle | Status | Notes |
|-----------|--------|-------|
| Real Users, Real Problems | ✅ | This phase exists precisely to connect with real users. Feedback mechanism enables evidence-driven development. |
| Triage Still Applies | ✅ | External Google Form chosen over building custom feedback system. Minimal code, maximum signal. |
| Progressive Enhancement | ✅ | Feedback infra is additive. All existing features work unchanged. 13/13 smoke tests pass. |
| Evidence Changes the Plan | ✅ | R&R triggered the restructure. Phase 6 scope intentionally left TBD pending feedback. |
| Sovereignty | ✅ | Tester opt-in is voluntary with explicit consent. Anonymous feedback via external form. Privacy page updated. |
| Harm Check | ✅ | No financial data collected in feedback. Consent is specific and revocable. |
| Ship It | ✅ | 83 modules, 0 errors. Deployable after human actions (form creation, migration, URL update). |

## What Went Well

1. **R&R caught the right problem.** Five phases of feature development with zero user input was the real risk. This phase corrects it.
2. **Minimal code footprint.** ~130 lines of new/modified code delivers: persistent feedback banner, contextual report prompt, tester signup with consent, privacy disclosure. No over-engineering.
3. **Research-informed channel strategy.** Identified Our Community / Funding Centre as the highest-leverage channel for reaching Australian nonprofit treasurers — not an obvious choice without research.
4. **OAIC-compliant consent.** Tester opt-in follows Australian Privacy Principles: voluntary, informed, specific, revocable.

## What Could Be Better

1. **FEEDBACK_URL is a placeholder.** The app will ship with `https://forms.gle/PLACEHOLDER` until the human creates the Google Form and updates the constant. This is by design (human action), but means the banner links to a broken URL until then. Could add a guard to hide the banner if URL contains "PLACEHOLDER".
2. **No smoke test for FeedbackBanner or TesterSignup.** Both are UI-only components with no complex logic, but the test gap continues the pattern from Phase 3 (no tests for trust pages).
3. **Tester signup requires Supabase migration.** If the migration hasn't been run, the insert will fail silently (error caught, toast shown). This dependency ordering should be clearer in HUMAN_ACTION.
4. **Privacy Policy link in TesterSignup form** uses `href="#"` which doesn't actually navigate to the privacy page. Should use the `onBack` pattern but the component doesn't have access to page navigation.

## Bias Check

- **Builder bias:** Temptation was to build more features (print polish, JSON import) instead of feedback infrastructure. R&R correctly identified this.
- **Channel bias:** Research over-indexed on digital channels. Many small community groups learn about tools through in-person networks (committee meetings, AGMs, regional council gatherings). The outreach plan should include word-of-mouth as a channel.

## Learnings

1. **"Infrastructure for learning" is a valid build category.** It's not a feature and it's not polish — it's the mechanism that tells you what to build next. The R&R protocol correctly created space for this.
2. **External tools > custom code for early-stage feedback.** Google Forms handles data collection, storage, and basic analytics. Building our own would have been pure waste at this traffic level.
3. **The Privacy page is a living document.** Every new data collection mechanism requires a privacy update. This should be a checklist item in future specs.

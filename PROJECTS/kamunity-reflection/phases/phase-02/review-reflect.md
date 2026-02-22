# Review & Reflect — Phase 2: Kai Conversation Quality

**Date:** 2026-02-23
**Trigger:** Phase marked complete but UAT showed persistent conversation quality failures across multiple fix attempts (>2 attempts, systemic not isolated)

---

## What happened?

Phase 2 shipped the sector intelligence layer (wa-sectors.js, ACNC integration, compact sector map, exchange calibration). Alongside that, significant effort went into prompt engineering to fix Kai's conversation behaviour:

**Sequence of attempted fixes:**
1. Added NO-ADVICE / NO-LISTS / NO-HALLUCINATION rules to prompt
2. Reduced max_tokens to 350 → caused JSON truncation
3. Raised max_tokens to 600
4. Added per-turn word limit reminder (BEFORE YOU WRITE)
5. Expanded banned phrase list (I see, Ah I see, Does this resonate, I commend you, etc.)
6. Added earworm repetition prohibition
7. Added closing synthesis trigger instruction
8. Complete prompt redesign — stage-driven architecture (Stage 1–5), removed meta-language, halved prompt length
9. Added BEFORE YOU RESPOND reminder as last instruction

**UAT result after all 9 attempts (The Pack Music conversation):**
- "I see" / "Ah I see" — still used
- "such important work", "That's a powerful model", "Wonderful" — praise still leaking
- "I'd suggest considering ways to..." — direct advice given after saying "I can't advise"
- Word limit ignored — most responses 80–120 words
- Raw JSON cards dumped into message text instead of rendering as cards
- Conversation felt like a "nice chat" — no meaningful takeaway, no sense of achievement
- Closing synthesis triggered but rendered as raw JSON in the message field

---

## What was the root cause?

**Proximate cause:** Claude 3 Haiku does not reliably follow multi-constraint system prompts across long conversations. Instruction following degrades as conversation history grows.

**Systemic cause:** The architecture assumed that prompt engineering alone could enforce conversation behaviour in a small, fast model. This assumption was never tested against a full 8–10 turn conversation before Phase 2 was marked complete. Each fix addressed a symptom (banned phrase, word limit, advice) without testing whether the model could hold all constraints simultaneously over a full conversation arc.

**Secondary systemic cause:** The JSON card rendering failure (raw JSON appearing in message text) was a pre-existing fragility — the client-side parser was hardened but the model still occasionally embeds card JSON inside the message string rather than in the cards array. No automated test existed for this.

---

## Why didn't the normal flow catch it?

- Phase 2 was marked complete based on partial testing (1–3 turn conversations), not full 8–10 turn arc
- No acceptance criterion required a full conversation test from opening to closing synthesis
- No automated test for JSON card rendering — only manual inspection
- The "done when" checklist focused on data layer features (ACNC, sector map, exchange calibration), not conversation quality outcomes
- Conversation quality was treated as a prompt engineering task, not an architectural one

---

## What process changes are needed?

**Tests to add:**
- Full conversation acceptance test: must run a complete 8-turn conversation (intro → Q1 → Q2 → Q3 → Q4 → synthesis) and verify:
  - No banned phrases in any Kai message
  - All messages ≤ 60 words
  - No advice given
  - Cards render as structured objects, not raw JSON in message text
  - Closing synthesis fires after Q4, not before
- JSON card rendering test: verify that when Kai returns cards, they appear as PresentationCard components, not as text

**Architecture changes:**
- **Model decision:** Haiku is not sufficient for multi-constraint conversation behaviour. Decision required before Phase 3:
  - Option A: Upgrade to Claude 3.5 Sonnet (~10x cost, dramatically better instruction following)
  - Option B: Client-side enforcement layer (post-process Kai responses: strip banned phrases, truncate to word limit, extract JSON cards from message text if leaked)
  - Option C: Both
- **Stage tracking:** Consider passing current stage number explicitly in the API request so the model doesn't have to infer it from conversation history
- **Word limit enforcement:** If staying on Haiku, enforce word limit client-side — count words after response, truncate at sentence boundary ≤ 60 words

**Phase structure changes:**
- Phase 2+ (before Phase 3): Conversation Quality Sprint — resolve model/enforcement decision, implement, test with full conversation arc, confirm UAT passes
- Phase 3 should not start until a full conversation produces a meaningful closing synthesis with cards rendering correctly

---

## What is the reset point?

**Code is NOT being reverted** — the sector intelligence layer (wa-sectors.js, ACNC, compact map, exchange calibration, JSON hardening, voice I/O, chat formatting) is solid and worth keeping.

**What needs to change before Phase 3:**
- Model upgrade decision made and implemented, OR client-side enforcement built
- Full conversation acceptance test passes

**Documentation to preserve:**
- All prompt iterations are in git history (commits ed7eb80 → 5d698df)
- Known limitations documented in PHASE_QUEUE.md Phase 2 section
- This R&R document

---

## Reset state

No code revert needed. Phase 2 infrastructure is sound.

**Next action:** Make the model/enforcement decision, implement Phase 2+ Conversation Quality Sprint, then proceed to Phase 3.

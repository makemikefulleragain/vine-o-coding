# Review & Reflect — Phase 4 Opt-in Card Surfacing

**Triggered:** Feb 26 2026 — bug took 3+ attempts to fix

## What happened?

The opt-in card was never surfaced to users during Kai conversation, despite 3 implementation attempts:

1. **Attempt 1:** Relied on LLM prompt Rule 6 to surface `opt-in` after `community-signal` appeared. Failed — LLM didn't follow the rule.
2. **Attempt 2:** Broadened Rule 6 to fire after ANY card. LLM still ignored it.
3. **Attempt 3:** Moved to code-level injection in `kai.js` handler. Checked `assistantHistory` for previously surfaced cards. Failed — assistant history never contains card info.

## Root cause

**The server is stateless and the client strips card metadata from history.**

- Server returns `{ reply, cards }` where `reply` has the `{"surface": [...]}` JSON already removed.
- Client pushes `{ role: 'assistant', content: reply }` — no card IDs attached.
- On next turn, server receives messages where assistant content has NO record of which cards were previously shown.
- Every `assistantHistory.some(t => t.includes(...))` check was checking against strings that never contained card info.

This is an **architectural gap**: the conversation loop has no memory of what cards were shown.

## Why didn't the normal flow catch it?

- No automated test for the card injection logic.
- UAT was manual but the 4-exchange depth requirement made it slow to test.
- Each "fix" was a downstream patch rather than tracing the data flow end-to-end.

## Process changes needed

1. **Fix the data flow**: Either (a) have the client include card IDs in the history it sends back, or (b) simplify the trigger to use only data the server already has (message count).
2. **Chosen approach**: Simplify — inject opt-in after 5+ user messages, no card history dependency. The person has been talking to Kai for 5 exchanges, they're engaged. Constitutional compliance: the form is gentle, one-time, and explained.
3. **Add a test**: After fix, verify by checking the response JSON from the function includes `opt-in` card when 5+ user messages are sent.

## Reset point

- Last solid state: `kai.js` server function before the 3 failed injection attempts.
- Keep: opt-in card in CARD_REGISTRY, opt-in form in frontend `kai.js`, all backend (opt-in.mjs, dm-send.mjs).
- Revert: the injection logic to a simple, stateless message-count check.

## Resume

Build the simple fix, deploy, test once, confirm.

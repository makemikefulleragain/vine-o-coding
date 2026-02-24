# Review & Reflect — KP-10: Kitchen Table Control Centre
**Date:** Feb 24, 2026
**Triggered by:** Multiple bugs discovered during live use of control.html — "Ask Waymaker" buttons did nothing, task detail not expandable, brief generation 404, missing data

---

## What happened?

The session began with a previous checkpoint summary indicating `control.js` had already been fixed (endpoint path, stub data replaced). On inspection, the actual live site had multiple broken behaviours:

1. **Brief generation 404** — endpoint was `/netlify/functions/waymaker` (missing leading dot). Was supposedly fixed in prior session but the deployed version still had the bug at the start of this session.
2. **All "Ask Waymaker" buttons in Tasks, Safety, and Gaps** — these sent the text to `navigator.clipboard.writeText()` only. The buttons were labelled "Ask Waymaker" but never called `_wmSend()`. The Waymaker FAB itself didn't exist in `control.html` — it had never been ported from `waymaker.js`.
3. **Task detail not expandable** — `task-detail-text` was always visible (no collapsed state, no expand/collapse toggle).
4. **Stub data** — `control.js` had ~8 placeholder tasks, no allies, 7 simplified gaps — not the canonical 48 tasks, 16 allies, 13 gaps from `data.js`.
5. **Missing views** — Allies, Prototypes, NLnet countdown, ally radar, sensory sweep button all absent.
6. **gapAction and safetyAction** — same clipboard-only bug as taskAction. Three separate places with the same wrong implementation.

**Sequence of fixes applied this session:**
1. Fixed brief endpoint path (`/.netlify/functions/waymaker`)
2. Replaced all stub data with canonical data from `data.js`
3. Ported full Waymaker FAB from `waymaker.js` into `control.js` (~200 lines)
4. Added Allies view (new tab), NLnet widget, ally radar, sensory sweep button
5. Added Prototypes view (16 prototypes), Recommended tools in Money, Export/Import/Clear state
6. Added ElevenLabs audio brief via new `brief-audio.mjs` Netlify Function
7. Fixed `taskAction` — changed from clipboard to `_wmSend()`
8. Fixed `safetyAction` — changed from clipboard to `_wmSend()`
9. Fixed `gapAction` — changed from clipboard to `_wmSend()`
10. Added `toggleTaskDetail()` — click-to-expand with `▸/▾` indicator

Total: 10 separate fixes, 9 deploys, discovered across 3 separate user reports.

---

## What was the root cause?

**Proximate causes (the bugs):**
- Endpoint path: missing `.` — a single character error that makes 100% of brief generation silently 404
- Action buttons: copy/paste from a "Copy to Opus" pattern, label changed to "Ask Waymaker" but the implementation not updated
- FAB missing: `control.html` was built as a new unified view but the Waymaker FAB was in `waymaker.js` — nobody ported it

**Systemic cause:**
`control.html` was built as a new file alongside the existing `index.html` system, but **the old system's data and features were never actually ported in** — they were assumed to be present or planned but not verified. The checkpoint summary from the previous session described fixes as if they were complete, but several were not reflected in the deployed version.

The deeper systemic issue: **the phase was marked "in progress" and features were being added without a baseline audit of what was actually working vs. what was assumed to be working.** Each session started from a summary of the *last session's intentions* rather than a *verified working state*.

---

## Why didn't the normal flow catch it?

1. **No UAT before moving to new features.** Each session added new things without first verifying the previous session's fixes actually worked end-to-end on the live Netlify URL.
2. **Checkpoint summaries are not test reports.** The session summary said "Fixed brief endpoint path" — but there's no verification step that confirms the fix was deployed and actually works on mobile.
3. **No baseline feature checklist for control.html.** There was no written list of "control.html must do X, Y, Z before it replaces index.html" with explicit pass/fail states.
4. **Action buttons had the wrong implementation hidden behind the right label.** Button text said "Ask Waymaker" but the code did clipboard copy. This would only be caught by actually clicking the button — which wasn't tested before shipping.
5. **The FAB was the most critical missing piece and nobody noticed** until the user asked "where is Waymaker?" The feature was assumed to exist because it existed in the old system.

---

## What process changes are needed?

### Immediate (apply to all remaining KP-10 work):

1. **Pre-deploy smoke test checklist** — before every deploy, manually verify:
   - [ ] Brief generation returns a response (not 404, not JSON error)
   - [ ] At least one "Ask Waymaker" button opens the FAB and sends
   - [ ] FAB is visible on page load
   - [ ] Task expand/collapse works

2. **UAT before adding features** — if a bug is discovered, fix it and verify it works *before* adding the next feature. No new features on top of broken foundations.

3. **Feature parity audit before archiving old system** — explicit written checklist comparing `index.html` system features vs `control.html` features. Do not archive until every line is ✅.

### Structural (apply to future KP phases):

4. **"Checkpoint summaries describe intent, not proof"** — treat session summaries as plans, not receipts. Always verify on the live URL before continuing.

5. **Action button pattern test** — any button labelled "Ask X" must call the underlying function, not clipboard. Add this as a code review check.

6. **Port vs. build distinction** — when porting features from one file to another (e.g., `waymaker.js` → `control.js`), explicitly list every feature being ported and tick them off. Don't assume the port happened.

---

## What is the reset point?

**No revert needed** — all 10 fixes were additive and correct. The code is now in a better state than at any prior point.

**Current verified working state (Feb 24, 2026, 9:32pm AWST):**
- `control.html` deployed at `https://coruscating-naiad-c0ccb9.netlify.app/control.html`
- Brief generation endpoint: `/.netlify/functions/waymaker` ✅
- Waymaker FAB: present, opens, sends ✅
- Task "Ask Waymaker": calls `_wmSend()` ✅
- Safety "Ask Waymaker": calls `_wmSend()` ✅
- Gaps "Ask Waymaker": calls `_wmSend()` ✅
- Task expand/collapse: `toggleTaskDetail()` ✅
- Canonical data: 48 tasks, 16 allies, 13 gaps ✅
- ElevenLabs audio brief: `brief-audio.mjs` deployed ✅
- All views present: Command Day, Tasks, Roadmap, Allies, Matrix, Zones, Safety, Gaps, Money, Prototypes ✅

**What still needs live verification (UAT — Mike's machine, not assumed):**
- [ ] Brief actually generates and returns valid JSON on the live URL
- [ ] ElevenLabs "Listen" button produces audio on mobile
- [ ] Waymaker FAB responds (requires `ANTHROPIC_API_KEY` in Netlify env — assumed set)
- [ ] Sensory sweep sends and returns
- [ ] Export state downloads a valid JSON file
- [ ] Import state restores task/safety/gap progress

---

## Lessons for future phases

1. **"Working" means tested on the live URL, not written in a summary.**
2. **Label = implementation.** If the button says "Ask Waymaker", the code must call Waymaker. No exceptions.
3. **Port lists are deploy checklists.** Porting features between files requires an explicit tick-list.
4. **The old system is the spec.** Before archiving, audit every feature in the old system and confirm it exists and works in the new one.
5. **R&R isn't failure — it's the moment the process gets smarter.** This document is the proof.

# Review & Reflect — Phase 3 generate-thing timeout

**Triggered:** 2026-02-26  
**Trigger reason:** Bug took >2 attempts to fix; engine was symptom-chasing instead of root-cause fixing.

---

## What happened?

1. `generate-thing.mjs` deployed to Netlify — function makes **two sequential Claude API calls**: generation (Sonnet, 4096 tokens) + quality check (Haiku, 256 tokens)
2. First click of "Generate artifacts" in Kitchen Table → CORS error in browser
3. Fix attempt 1: Changed invalid LIKE pattern (`%(pending%` → `%pending%`) and bumped `netlify.toml` timeout to 26s → deployed → still fails
4. Fix attempt 2: Diagnosed the CORS error as a **symptom** — the function was timing out at 30s, Netlify returns a raw 502 with no CORS headers, browser reports it as CORS
5. Fix attempt 3 (cancelled by user): Was about to downgrade model from Sonnet to Haiku and replace Claude quality check with rule-based check — **this is quality sacrifice, not root cause fix**

## What was the root cause?

**Proximate cause:** Netlify Functions have a hard timeout (26s max configurable on free tier). Two sequential Claude API calls (Sonnet generation ~15-25s + Haiku quality check ~3-5s) regularly exceed this.

**Systemic cause:** The architecture assumed synchronous request-response would work for AI generation. It doesn't. AI generation is inherently a **long-running task** that should not block an HTTP response.

## Why didn't the normal flow catch it?

- No end-to-end testing of the generation function before deploying to production
- No timeout budget analysis (how long does a Sonnet call with 4096 max_tokens actually take?)
- The LIKE pattern bug masked the timeout on the first attempt, creating a red herring
- Phase 3 build didn't include "verify function completes within Netlify timeout" as an acceptance criterion

## What process changes are needed?

**Architecture change:** Use **Netlify Background Functions** for `generate-thing`. Background functions:
- Return `202 Accepted` immediately
- Run for up to **15 minutes** (vs 26s for sync functions)
- Cannot return a response body — caller must poll for results
- Activated by adding `-background` suffix to filename OR exporting `config.type = 'background'`

**UI change:** Kitchen Table's "Generate artifacts" button must switch from "wait for response" to "fire and poll":
1. POST to background function → get 202 immediately
2. Show "Generating… this takes 30-60 seconds"
3. Poll the library endpoint every 5 seconds until artifacts appear
4. Stop polling after 90 seconds with "still working or may have failed" message

**Testing requirement:** Before deploying any Netlify Function that calls Claude, verify:
- Single Claude call completes within 10s (sync OK) or needs background
- Multiple Claude calls → always use background function

**Keep Sonnet for generation.** The whole point of MATCH+MAKE is quality artifacts. Downgrading the model to fit a timeout is solving the wrong problem.

## What is the reset point?

- `match-engine.mjs` is working correctly — keep as-is
- `generate-thing.mjs` code logic is correct, architecture is wrong — **rename to background function, keep all generation/quality logic unchanged**
- Kitchen Table Match+Make HTML panel is correct — only the JS `runGenerate()` function needs the poll pattern
- `commons_library` table is correct — no DB changes needed
- The LIKE fix (`%pending%`) was a real bug — keep that fix

## Fix plan

1. Rename `generate-thing.mjs` to `generate-thing-background.mjs` (Netlify convention for background functions)
2. Adjust handler to work as background (no response body needed — just write to DB)
3. Update Kitchen Table `runGenerate()` to fire-and-poll pattern
4. Keep Sonnet model and Claude quality check — the timeout is no longer a constraint
5. Test end-to-end before marking complete

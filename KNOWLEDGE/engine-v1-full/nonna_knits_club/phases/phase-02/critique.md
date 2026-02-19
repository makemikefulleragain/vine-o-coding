# Phase 2 Critique

**Date:** 2026-02-15

---

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅ (STRONG)
- **UAT feedback directly shaped this phase.** Real users asked for quick/detailed feedback — we built exactly that.
- Gallery view, reactions, and mobile nav were all validated by UAT users before building.
- This is the strongest constitutional alignment yet: building what users asked for, not what we assumed.

### 2. Triage Still Applies ✅
- Feedback widget is self-contained (no external service like Hotjar)
- Reactions are simple localStorage — no complex backend
- Gallery uses existing post data, no new data model complexity
- Kept scope tight: 4 features, all localStorage-based

### 3. Progressive Enhancement ✅
- All Phase 1 features still work unchanged
- New features add to existing pages, don't replace them
- Site builds and deploys successfully
- Old localStorage data handled with fallback defaults

### 4. Evidence Changes the Plan ✅
- UAT feedback added the feedback widget (wasn't in original Phase 2 plan)
- This is exactly how the constitution says it should work: evidence changes the plan

### 5. Sovereignty ✅
- All new data (reactions, feedback, view prefs) stays in localStorage
- No external API calls added
- No tracking — feedback is stored locally and only visible to the person who submitted it
- Feedback widget is opt-in (floating button, not a popup)

### 6. Harm Check ✅
- Feedback widget is non-intrusive (doesn't nag or interrupt)
- No personal data collected beyond what user voluntarily types
- Reactions are positive-only (no downvotes, no negative reactions)
- Gallery doesn't expose any information that wasn't already visible in list view

### 7. Ship It ✅
- Built and deployed in one session
- First-attempt build success
- Live at https://nonnas-knitting-circle.netlify.app

---

## Bias Check

### What's good
- Positive-only reactions (❤️ 👏 🧶 ⭐) — no negativity mechanism
- Feedback widget offers both quick (busy people) and detailed (engaged people) paths
- Gallery view makes visual content more prominent — benefits makers who photograph their work
- Mobile nav makes the site accessible to phone-only users (likely a large portion of the audience)

### What to watch
- **Image bias in gallery:** Posts with images look much better in gallery view than those without. Could inadvertently deprioritize text-only posts (questions, chat). Mitigated with yarn ball placeholder.
- **Feedback privacy:** Feedback is in localStorage — if someone shares a device, others could see it. Low risk for Phase 2 but worth noting.
- **Reaction counts are local:** Each user sees their own reactions only. This means the "social proof" of high reaction counts is only visible from seed data, not real community interaction. Acceptable for Phase 2 but a gap.

---

## What I Learned

1. **UAT feedback is the best research signal.** Real users told us exactly what to build. The feedback widget came directly from them.
2. **Two-step feedback pattern works beautifully** — low barrier (emoji) with optional depth (text). This respects busy people like Fariha.
3. **Gallery view reveals the image gap** — most user posts won't have images. Future phases should make image sharing easier (maybe direct upload).
4. **localStorage reactions are inherently single-user** — for real community interaction, Phase 3+ will need some form of shared state. This is a known limitation.
5. **The site is getting feature-rich enough that mobile responsiveness is critical** — glad we fixed the nav now rather than later.

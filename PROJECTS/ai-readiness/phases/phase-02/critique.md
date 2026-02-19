# Phase 2 Critique — The Toolkit

## Constitutional Alignment Check

### 1. Real Users, Real Problems ✅
- Prompts target real community org tasks: meeting notes, grant reporting, volunteer comms, policy drafting
- NOT fundraising-focused (unlike most NFP prompt resources which are US/UK charity sector)
- Safety Checklist written for people who handle family violence, health, homelessness data
- Board Briefing designed for a CEO who needs to brief a board chair in 5 minutes
- First Steps Guide structured as a 4-week plan — realistic for Priya's schedule

### 2. Triage Still Applies ✅
- Research confirmed no existing community-sector toolkit exists
- Links to external authoritative resources (OAIC, Australian Voluntary AI Safety Standard) rather than duplicating
- Links to Anthropic AI Fluency course for deeper learning
- Not trying to replace specialist advice — explicitly flagged throughout

### 3. Progressive Enhancement ✅
- Phase 1 quiz continues to work exactly as before
- New toolkit pages add value without breaking anything
- Quiz recommendations now link to toolkit pages (graceful enhancement)
- Landing page gained a toolkit section without losing any existing content

### 4. Evidence Changes the Plan ✅
- Research validated the 6-resource scope
- PDF downloads deferred to Phase 3+ (web pages are higher value right now)
- Copy-to-clipboard prioritised over PDF based on research into actual user behaviour

### 5. Sovereignty ✅
- No new data collection added
- Copy-to-clipboard works entirely client-side
- No analytics, no tracking, no cookies
- Prompts explicitly warn against sharing sensitive data with AI tools

### 6. Harm Check ✅
- **Safety Checklist**: Golden rule banner, 8-point checklist, vulnerable populations warning
- **Ethics Checklist**: Indigenous Data Sovereignty explicitly referenced (Q5), cultural sensitivity in Q3
- **Prompt Kit**: Safety notes on prompts involving client data, grant reporting, communications
- **Every toolkit page**: Links back to Safety Checklist where relevant
- **Board Briefing**: Data privacy listed as risk #1
- **First Steps**: "What NOT to do first" section explicitly warns against using AI for client decisions

### 7. Ship It ✅
- Build succeeds on first attempt
- Deployed to production
- All routes work, all links connect

---

## Bias Check

### Content Bias
- **Reviewed:** Prompts assume Australian community sector context, not US/UK charity context
- **Reviewed:** No prompts assume large staff or dedicated IT support
- **Reviewed:** Ethics checklist explicitly addresses cultural bias and First Nations data sovereignty
- **Risk:** Content is in English only. Future phases should consider accessibility for CALD communities.
- **Risk:** Board Briefing template assumes Western governance structure. Aboriginal community-controlled organisations may have different governance models.

### Language Bias
- **Reviewed:** All resources written in plain English (Year 8 reading level target)
- **Reviewed:** Glossary provides definitions for all technical terms used
- **Reviewed:** "Just Starting" framing avoids deficit language — no shaming for being early in the journey

### Structural Bias
- **Reviewed:** Resources don't assume organisations should adopt AI — "Not right for us right now" is explicitly validated as a good outcome in First Steps
- **Reviewed:** Ethics checklist includes "red flags" that suggest NOT proceeding with AI
- **Risk:** The existence of a toolkit implicitly frames AI engagement as positive. Mitigated by ethics/safety resources being equally prominent.

---

## What I Learned

1. **Copy-to-clipboard is the killer feature** for prompt kits. PDF downloads add friction; clipboard is instant.
2. **Safety resources need to be the most prominent** — not buried under "getting started" content.
3. **The Board Briefing fills a unique gap** — no simple, one-page AI briefing exists for small org boards.
4. **Indigenous Data Sovereignty** must be explicitly named, not just implied by "cultural sensitivity."
5. **Recommendation links create a complete user journey** — quiz → results → toolkit → action.

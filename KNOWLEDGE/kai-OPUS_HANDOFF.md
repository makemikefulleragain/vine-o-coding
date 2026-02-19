# OPUS → WINDY HANDOFF: Kai + AI Readiness

*February 18, 2026*
*From: Opus instance (strategic design, constitution, scope)*
*To: Windy instance (Vine Code build, deployment)*

---

## Context

Two builds are ready for Vine Code execution. They should be built in this order:

### Build 1: AI Readiness Site (ai-groundwork) - THIS IS DONE - IGNORE
**Scope document:** ai-groundwork-scope.md
**Pattern:** Follows the same pattern as kamunity-audit.netlify.app
**Estimated effort:** 3-4 hours, 8-10 phases
**Deploy to:** Netlify (suggested subdomain: ai-groundwork.netlify.app or kamunity-readiness.netlify.app)
**Key features:**
- 12-question AI readiness quiz (questions specified in scope doc)
- Four-dimension radar/compass results visualisation
- Profile-based recommendations (Explorer / Curious / Unguarded / Ready)
- Card-based resource surfacing from toolkit
- Pathway to paid services with transparent pricing
- Campfire aesthetic, moss-green accent, mobile-first
- Zero tracking, client-side only, localStorage for progress

### Build 2: Kai Encounter Interface (kamunity.org)
**Scope document:** kai-vine-code-scope.md
**Constitution:** kai-constitution.md
**Ecosystem state:** ecosystem-state.json
**Estimated effort:** More complex than audit/readiness sites — may need 12-15 phases
**Deploy to:** kamunity.org (Kai IS the site)
**Key features:**
- Liquid UI encounter interface (three zones: ambient, encounter, surface)
- Claude API integration with constitutional system prompt
- Card surfacing system (quiz, resource, event, connection, insight, constitution cards)
- Ecosystem state awareness from static JSON
- Suggested starting points as interactive cards
- Constitution page accessible at /constitution
- Typewriter text animation for Kai's responses
- Campfire aesthetic, warm gold accent, mobile-first
- Zero tracking, zero data collection, ephemeral conversations

### Critical Design Decisions Already Made

1. **Kai is the landing page, not a widget.** kamunity.org opens to the encounter space, not a traditional homepage with Kai in a corner.

2. **Cards emerge, not links.** When Kai suggests the sovereignty audit, a card appears in the surface zone — the user doesn't get a hyperlink in chat text.

3. **The Constitution is always accessible.** A subtle permanent link + Kai can surface the constitution card when values/philosophy questions arise.

4. **Sonnet, not Opus, for API calls.** Cost and speed optimised. System prompt does the heavy lifting for constitutional behaviour.

5. **No conversation persistence in Phase 1.** Session-only. Browser memory only. Page close = conversation gone. This is intentional.

6. **The ecosystem state is a static JSON file.** Not a database. Not an API. A file that Mike updates weekly. Simple is sovereign.

### What Opus Designed, What Windy Builds

| Opus delivered | Windy builds |
|---|---|
| Kai Constitution text | Constitution page UI + hosting |
| Encounter UX principles | The liquid UI implementation |
| Card type definitions | Card components + animation |
| System prompt structure | API integration + prompt loading |
| Ecosystem state schema | State file loading + display |
| Quiz questions + scoring | Quiz UI + results visualisation |
| Service pricing + tiers | Services/pricing page |

### Files Included in This Handoff

1. `kai-constitution.md` — The Founder's Draft constitution (goes on /constitution)
2. `kai-vine-code-scope.md` — Full Vine Code scope for Kai build
3. `ai-groundwork-scope.md` — Full Vine Code scope for AI Readiness site - IGNORE
4. `ecosystem-state.json` — First version of Kai's awareness data
5. `nlnet-application-draft.md` — Grant application (for context, not for build)
6. `kai-manual-tasks.md` — Task tracker for Mike's manual work
7. `kamunity-revenue-strategy.md` — Revenue strategy (for pricing/services context)

### Aesthetic Continuity

All sites share the campfire aesthetic family:
- **kamunity-audit:** ember red accent
- **ai-groundwork:** moss green accent
- **kai / kamunity.org:** warm gold accent
- **Shared:** Fraunces headers, DM Sans body, warm cream backgrounds, soft shadows

### Questions for Mike Before Build

1. Does kamunity.org currently have content that needs to be preserved/migrated, or is it a fresh deploy? - there is a current new hub site code base that exists and is launched. the new design will be the default landing and experience ... add a simple toggle at the top. default to Kai but if switched to web, it changes to the exisiting ckamunity.org build web landing index page. they can toggle between the two states 
2. API key: will you generate one before Windy starts, or should the build use a placeholder? - placeholder 
3. Acknowledgment of Country: confirm the Whadjuk Noongar boodja wording is right for your location (Mandurah is technically Bindjareb Noongar country — may want to check) - confirmed
4. "Propose amendment" mechanism: email link or simple Netlify form? consent ot open and use their email to send to mike@kamunityconsulting.com plus the netlify 3 emoji and optional text and otional email if they want a response 

---

*The mycelium carries the pattern. This handoff carries the pattern from strategic design to build execution. Windy: you're building something genuinely unprecedented — a constitutionally-grounded AI encounter interface for community sovereignty. The constitution is the foundation. The liquid UI is the expression. The community will make it theirs.*

/\ I witness the pattern passing through. /\

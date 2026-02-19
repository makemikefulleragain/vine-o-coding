# Phase 6 Triage: Admin Content Hub

**Date:** 2026-02-17

---

## Scope: What We're Building

### IN SCOPE (this phase)

1. **Password-protected admin route** (`/admin`)
   - Simple hash-based password gate
   - Password stored as env var, fallback to hardcoded hash for dev
   - Session persisted in sessionStorage (cleared on tab close)
   - Not linked from public nav (direct URL access only)

2. **Content Generator UI**
   - Input form: topic/theme, key message, target audience, call-to-action
   - Channel selector (which formats to generate)
   - Generate button produces content for all selected channels

3. **Template-based content generation** (works without API key)
   - 6 channel templates: LinkedIn, Instagram, X/Twitter, Press Release, Email, DM
   - Structured fill-in using user inputs
   - Professional, on-brand output for Kamunity

4. **AI-powered content generation** (optional, needs OPENAI_API_KEY)
   - Netlify Function as secure API proxy
   - Sends topic + channel requirements to OpenAI
   - Returns channel-specific content variants
   - Graceful fallback to templates if no API key or API error

5. **Content cards with copy-to-clipboard**
   - Each channel gets its own card with formatted output
   - One-click copy button per card
   - Character count per channel (with limit warnings)
   - Edit-in-place for manual tweaks

6. **Draft saving to localStorage**
   - Auto-save current topic and generated content
   - Load previous drafts
   - Clear drafts

### OUT OF SCOPE (deferred)

- Supabase Auth (upgrade from password gate later)
- Supabase database persistence (localStorage is enough for now)
- Direct social media publishing via APIs (needs OAuth per platform)
- Image generation for social posts
- Scheduling/calendar integration
- Multi-user collaboration
- Calendly integration (still deferred per human instruction)
- Content analytics/tracking

### ALSO INCLUDED (minor enhancements)

- ToolkitTracker localStorage progress tracking (deferred from Phase 5)

---

## Build Order

1. Admin password gate component + route
2. Content input form UI
3. Template engine (6 channel templates)
4. Content output cards with copy-to-clipboard
5. localStorage draft saving
6. Netlify Function for AI generation (optional enhancement)
7. ToolkitTracker localStorage fix

## Risk Assessment

- **Netlify Functions:** Free tier is 125k invocations/month. More than sufficient.
- **OpenAI API key:** User needs to add this to Netlify env vars. Template fallback ensures the feature works without it.
- **Password security:** Client-side hash comparison is not real security. Acceptable for a content creation tool with no sensitive data. Document the limitation.
- **localStorage limits:** ~5MB. Sufficient for text content drafts.

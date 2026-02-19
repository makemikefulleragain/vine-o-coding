# Phase 6 Research: Admin Content Hub

**Date:** 2026-02-17

---

## Human Request (verbatim)
> "After this the next goal is an admin area to develop and distribute content for social media, legacy media, other platforms, DMs and emails based on an inputted theme or topic"

## Key Research Questions

### 1. Auth: How to protect the admin area?

**Options studied:**
- **Simple password gate (client-side):** Hash a password, store in code, compare on entry. Not real security but gates casual visitors. Zero infrastructure. Password stored as env var or hash.
- **Netlify Identity:** Free tier (1000 users), JWT-based. Overkill for single-admin use.
- **Supabase Auth:** User has Supabase account. Real auth but adds a new dependency and setup complexity.

**Decision:** Simple password gate for Phase 6. The admin area is a content creation tool, not a data store with sensitive info. A hashed password comparison gates the UI. Can upgrade to Supabase Auth later if needed.

### 2. Content Generation: AI or Templates?

**Template-based approach:**
- Pre-written content templates per channel (LinkedIn, Instagram, X/Twitter, press release, email, DM)
- User inputs: topic/theme, key message, audience, call-to-action
- Templates fill in structured content with the user's inputs
- Works immediately, no API key, no cost, no external dependency
- Limited: output quality depends on template design

**AI-powered approach (Netlify Functions):**
- Netlify Functions act as a serverless proxy to an LLM API (OpenAI, Anthropic)
- API key stored as Netlify environment variable (secure, never in client code)
- User inputs topic, AI generates channel-specific content variants
- Netlify Functions: free tier includes 125k invocations/month
- Docs confirm: standard Web API Request/Response pattern, JS modules syntax
- OpenAI integration example exists in Netlify docs (streaming supported)

**Decision:** Build BOTH. Template system works without any API key (default). AI generation available when user adds an OPENAI_API_KEY to Netlify env vars. Progressive enhancement.

### 3. Storage

- **localStorage:** Simple, no backend, keeps zero-server promise. Limited to ~5MB. Good for drafts.
- **Supabase:** Real database, persistent, shareable. But adds infrastructure complexity.
- **Netlify Blobs:** Key-value store. Would need Netlify Functions to access.

**Decision:** localStorage for Phase 6. Content drafts saved locally. User can copy/export content. Supabase persistence deferred.

### 4. Distribution Channels

Based on human request, need formats for:
- **LinkedIn:** Professional tone, 1300 char limit, hashtags, no links in body (comment)
- **Instagram:** Visual caption style, 2200 char limit, hashtag heavy, emoji-friendly
- **X/Twitter:** Concise, 280 char limit, thread format for longer content
- **Press release:** Formal structure (headline, dateline, body, boilerplate, contact)
- **Email newsletter:** Subject line + body with greeting/sign-off
- **DM/direct message:** Casual, personal, short

**Decision:** Copy-to-clipboard per channel. Direct API publishing deferred (needs OAuth per platform).

### 5. Deferred Items from Phase 5

- **Calendly:** Still deferred per human instruction
- **ToolkitTracker localStorage:** Can include as a minor enhancement
- **Feedback widget Netlify testing:** Already deployed, should auto-detect form

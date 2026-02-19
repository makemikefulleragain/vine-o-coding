# Phase 6 Spec: Admin Content Hub

**Date:** 2026-02-17

---

## Feature 1: Admin Password Gate

### Acceptance Criteria
- [ ] `/admin` route exists but is NOT linked in public navigation
- [ ] Visiting `/admin` shows a password prompt
- [ ] Correct password grants access, stored in sessionStorage
- [ ] Wrong password shows error, does not grant access
- [ ] Closing the tab clears the session
- [ ] Password hash compared client-side (env var or fallback hash)

### Technical Design
- `AdminGate` component wraps admin content
- SHA-256 hash of input compared against stored hash
- `VITE_ADMIN_HASH` env var for the expected hash (falls back to default)
- sessionStorage key: `ku-admin-auth`

---

## Feature 2: Content Generator Form

### Acceptance Criteria
- [ ] Form fields: Topic/Theme (required), Key Message, Target Audience, Call to Action
- [ ] Channel checkboxes: LinkedIn, Instagram, X/Twitter, Press Release, Email, DM
- [ ] At least one channel must be selected
- [ ] "Generate Content" button triggers generation
- [ ] Loading state shown during generation
- [ ] Form validates required fields before submission

### Technical Design
- `ContentGenerator` component with controlled form state
- Channel selection stored as Set/array
- Form submission dispatches to template engine or AI function

---

## Feature 3: Template Engine

### Acceptance Criteria
- [ ] 6 channel templates produce formatted content from user inputs
- [ ] LinkedIn: professional tone, hashtags, ~1300 chars
- [ ] Instagram: caption style, emoji, hashtags, ~2200 chars
- [ ] X/Twitter: concise, 280 chars, suggests thread for longer
- [ ] Press Release: headline, dateline, body, boilerplate, contact
- [ ] Email: subject line + body with greeting/sign-off
- [ ] DM: casual, personal, short
- [ ] All templates include Kamunity branding where appropriate
- [ ] Templates work without any API key

### Technical Design
- `src/utils/templates.js` with a function per channel
- Each function takes `{ topic, keyMessage, audience, cta }` and returns formatted string
- Exported as `generateTemplateContent(inputs, channels)`

---

## Feature 4: AI Content Generation (Optional)

### Acceptance Criteria
- [ ] Netlify Function at `/.netlify/functions/generate-content`
- [ ] Accepts POST with topic, keyMessage, audience, cta, channels
- [ ] Calls OpenAI API with channel-specific prompts
- [ ] Returns JSON with content per channel
- [ ] API key stored in Netlify env var `OPENAI_API_KEY`
- [ ] If no API key configured, function returns 501 with helpful message
- [ ] Client gracefully falls back to templates on any API error
- [ ] AI badge shown on AI-generated content vs template badge

### Technical Design
- `netlify/functions/generate-content.mjs`
- System prompt tailored for Kamunity brand voice
- Per-channel instructions in user prompt
- Response: `{ linkedin: "...", instagram: "...", ... }`
- Client detects 501 and falls back to templates automatically

---

## Feature 5: Content Output Cards

### Acceptance Criteria
- [ ] Each selected channel gets a card with generated content
- [ ] One-click "Copy" button per card with "Copied!" feedback
- [ ] Character count shown with warning if over channel limit
- [ ] Content is editable in-place (textarea)
- [ ] Edits persist until new generation
- [ ] Clear visual distinction between AI-generated and template content

### Technical Design
- `ContentCard` component per channel
- Copy uses `navigator.clipboard.writeText`
- Textarea with controlled state, synced to parent

---

## Feature 6: Draft Saving

### Acceptance Criteria
- [ ] Current inputs and generated content auto-saved to localStorage
- [ ] On revisit, previous inputs and content restored
- [ ] "Clear Drafts" button resets everything
- [ ] localStorage key: `ku-content-drafts`

### Technical Design
- useEffect auto-saves on state change (debounced)
- On mount, check localStorage and restore

---

## Feature 7: ToolkitTracker localStorage (Phase 5 deferred)

### Acceptance Criteria
- [ ] When user visits a toolkit guide, mark it as visited in localStorage
- [ ] ToolkitTracker shows accurate progress count based on visited guides
- [ ] Progress persists across sessions

### Technical Design
- localStorage key: `ku-toolkit-visited`
- Store as JSON array of guide IDs
- ToolkitTracker reads on mount, updates count

# Next Phase Recommendation

**From:** Phase 5 (Polish, UX & Feedback)
**Recommended next:** Admin Content Hub (Phase 6)

---

## Why Admin Content Hub Next

The humans explicitly identified this as the next goal:
> "After this the next goal is an admin area to develop and distribute content for social media, legacy media, other platforms, DMs and emails based on an inputted theme or topic"

Five phases are complete. The site is deployed, polished, and has a feedback loop. The next value unlock is enabling content creation and distribution from a central hub.

## Phase 6 Scope (Hypothesis)

### Core Feature: Content Hub
- Admin area (could be a protected route or separate mini-app)
- Input: theme or topic
- Output: content formatted for multiple channels:
  - Social media (LinkedIn, Instagram, Twitter/X)
  - Legacy media (press release format)
  - Email/DM templates
  - Platform-specific formats

### Technical Decisions to Research
- **Auth:** How to protect the admin area? Simple password? Netlify Identity? OAuth?
- **AI integration:** Use an LLM API to generate content variants from a theme? Or template-based?
- **Storage:** Where does content live? Local state? Netlify Blobs? External CMS?
- **Distribution:** Direct publishing or copy-to-clipboard per channel?

### Also Consider (from UAT)
- Calendly integration decision (deferred from Phase 5)
- ToolkitTracker progress tracking via localStorage (placeholder in Phase 5)
- Real user feedback from the feedback widget (may change priorities)

## Key Principle
The humans are driving. Wait for their feedback from Phase 5 before committing to Phase 6 scope.

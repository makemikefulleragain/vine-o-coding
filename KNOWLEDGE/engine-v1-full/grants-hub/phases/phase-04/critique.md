# Phase 4 Critique: Make It Findable

**Date:** 2026-02-14

---

## Constitutional Check

| Principle | Status |
|---|---|
| Serves real volunteer treasurers | ✅ Landing hero speaks directly to their use case; SEO targets their search terms |
| Progressive enhancement | ✅ All additions are additive — no existing functionality changed |
| Evidence-based decisions | ✅ Research confirmed "grant acquittal" is an active search term; SEO approach based on SPA best practices |
| Working deployable state | ✅ Deployed and live at https://grants-hub.netlify.app |
| Data sovereignty | ✅ Unchanged — export/delete still available |

## What Went Well

1. **Spec step followed this time.** 9 acceptance criteria written before building. This was a gap identified in Phase 3 critique — corrected.
2. **URL matches pre-set references.** `grants-hub.netlify.app` was used in index.html canonical/OG tags before deploy. No post-deploy fixups needed.
3. **Landing hero is dual-purpose.** It works as a first-time visitor marketing page AND as the empty state — no separate landing page needed.
4. **HUMAN_ACTION.md worked as intended.** Deploy was blocked on auth, instructions written, user completed it independently. Clean handoff.
5. **Minimal deploy friction.** Drag-and-drop of `dist/` folder worked first try. Netlify went green immediately.

## What Could Be Better

1. **No OG image.** Social sharing will show a text-only preview. An OG image (1200x630px) with the tool name and a screenshot would significantly improve click-through from social/messaging shares. Deferred but should be addressed.
2. **Supabase env vars not yet on Netlify.** The deployed site is currently browser-only mode. Cloud mode requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify environment variables + a rebuild. Documented in HUMAN_ACTION.md but not yet done.
3. **No analytics to measure findability.** We can't know if search traffic arrives without some form of privacy-respecting analytics. This creates a blind spot — we'll never know if the SEO is working. Could consider Plausible or Fathom (privacy-first, no cookies) in future.
4. **Single-page SPA limits SEO depth.** The About, Privacy, FAQ pages are client-rendered — crawlers may not index them. For a tool (not a content site), this is acceptable. But if we wanted those pages to rank independently, we'd need pre-rendering or SSG.
5. **Deploy is manual (drag-and-drop).** No CI/CD pipeline. Every code change requires a manual build + drag-and-drop. Git-based deploy would be better for ongoing development.

## Bias Check

- **SEO optimism bias.** Meta tags and structured data are necessary but not sufficient for search ranking. Google's algorithm weighs backlinks, domain authority, and content freshness heavily. A brand-new Netlify subdomain with zero backlinks will take months to rank, if it ranks at all. The real findability will come from directory listings, word of mouth, and backlinks — which are human actions, not code.
- **"Build it and they will come" risk.** The tool is now live and technically findable, but practically invisible. Phase 5 or human outreach needs to address actual distribution.

## Learnings for Future Phases

1. **Env vars are a deployment concern, not a build concern.** The app works in dev because `.env` exists locally. On Netlify, env vars must be set separately. This should be part of the deploy checklist, not an afterthought.
2. **Git-based deploy should be set up eventually.** Manual drag-and-drop works for now but doesn't scale with ongoing development.
3. **The next high-value thing is probably not more code.** Real findability comes from human actions: submitting to nonprofit directories, writing a blog post about grant acquittals, sharing on LinkedIn. Phase 5 should consider what code can enable those human actions (e.g., a shareable link with preview, an embeddable widget).
4. **User accounts remain the biggest functional gap.** A treasurer who finds the tool, uses it, then can't access it from their home computer (different browser = different anonymous session) will churn. This is the #1 barrier to word-of-mouth growth.

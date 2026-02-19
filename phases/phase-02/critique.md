# Phase 2 Critique — Make It Walkable

**Date:** 2026-02-15

---

## Constitutional Check

### 1. Real People, Real Needs
**Pass.** The widget asks Maya to describe her project in her own words. Placeholders use her language ("A place for our cooking club to share recipes"). The companion examples show both a real project (Grants Hub) and one she can relate to (Recipe Remix). Every field has a clear, plain-language label.

### 2. Triage Still Applies
**Pass.** Research confirmed no existing tool generates AI-assistant foundation documents. The widget is genuinely novel. We're not duplicating work.

### 3. Progressive Enhancement
**Pass.** The site builds cleanly with both the landing page and widget. dist/ is deployable. The /widget route works via _redirects. The landing page still functions independently.

### 4. Evidence Changes the Plan
**Partially testable.** The widget structure (6 steps) was validated by research on wizard completion rates. But no real users have used it yet. The acceptance gate ("a user with no coding experience can complete the widget in under 10 minutes") is hypothetical until tested.

### 5. Sovereignty
**Pass.** Everything runs client-side. No data sent anywhere. The ZIP is generated in the browser. No analytics, no tracking, no external API calls.

### 6. Harm Check
**Pass.** The harm considerations field prompts users to think about safety. Generated CONSTITUTION.md includes the Harm Check principle. The "What to do next" section doesn't overpromise — it says "the AI will read your documents and start building" not "you'll have a working app in 5 minutes."

### 7. Ship It
**Pass.** Build produces clean dist/. _redirects handles SPA routing for Netlify.

---

## Bias Check

| Potential Bias | Assessment |
|---|---|
| Assuming users know what "foundation documents" are | Mitigated — the widget never uses this term until Step 6, where it's explained in context ("These 6 files tell an AI coding assistant everything it needs to know"). |
| Assuming users know what a "phase" is | Partially mitigated — Step 4 says "What should be built first?" not "Define your phases." The Brian note explains the concept for those who want it. |
| Assuming Windsurf/Cursor knowledge | Mitigated — "What to do next" section names three options with links. Doesn't assume the user already has one. |
| English-only | Present — same as Phase 1. Acceptable for now. |
| Deployment assumes technical comfort | Partially mitigated — "I'm not sure yet" option exists. But "Netlify" and "Vercel" are still brand names a 9th grader may not know. The descriptions help. |
| Examples are narrow | Two examples cover nonprofit/finance and school/social. Reasonable range but doesn't cover healthcare, environment, arts, etc. The examples are inspirational, not prescriptive. |

## Clarity Check (9th Grader Test)

Walking through as Maya:

- **Step 1:** "What do you want to build?" ✓ Crystal clear. Placeholder shows exactly what to write.
- **Step 2:** "Who exactly will use this?" ✓ "Give them a name" is concrete and fun, not abstract.
- **Step 3:** "What should this NOT do?" ✓ Clear, and the examples make the pattern obvious.
- **Step 4:** "What should be built first?" ✓ "Just the first three steps" removes pressure. Optional fields reduce anxiety.
- **Step 5:** "Where will this live?" — Slight concern. "Netlify" and "Vercel" are brand names Maya may not recognize. But "Free, easy drag-and-drop deploy. Best for beginners." addresses this. The "I'm not sure yet" escape hatch is critical.
- **Step 6:** "Your foundation documents are ready" ✓ The tabbed view, copy buttons, and "What to do next" numbered steps are clear.

**Verdict:** Maya could complete this widget with guidance from the examples alone. The only friction point is Step 5 (deployment), which is mitigated by the "unsure" option.

## What I Learned

1. **The document generation templates work well** but could feel more personal. Currently they interpolate user text faithfully, but some sections are boilerplate. Future phases could add more contextual generation.

2. **The companion examples are powerful teaching tools.** Having both a "real" example (Grants Hub) and a "relatable" example (Recipe Remix) lets users triangulate what good answers look like. This pattern should carry forward to the case study (Phase 3).

3. **The opening prompt is the highest-value output.** Users will paste this into their AI assistant. It needs to be correct and complete. Currently it references documents by filename — the AI assistant needs those files in the project folder to work. The "What to do next" instructions make this explicit.

4. **Brian's lean-in sections add real depth** without cluttering Maya's flow. The `<details>` pattern works perfectly — zero visual overhead when collapsed, rich content when expanded. Each note connects to real theory (Lean, jobs-to-be-done, Agile boundaries).

5. **Bundle size grew by 148KB** (JSZip). This is the first external dependency beyond React/Router/Tailwind. Worth watching but not a problem at 122KB gzipped total.

6. **The widget creates a natural on-ramp to Phase 3.** After completing the widget, users who want to understand *why* the process works will seek the case study. The "What to do next" section could eventually link to Phase 3 content.

# Phase 7 Triage — Make It Rich & Shareable

**Date:** 2026-02-15

---

## Build Order

### 1. Deep Dive restructure — visible lessons + links (P0)
- Extract 1-2 key lesson sentences from each dive's brian[] content
- Move lessons + further reading links outside `<details>` (always visible)
- Keep detailed paragraphs inside expandable
- Touches: `src/components/DeepDives.jsx` (data + layout)

### 2. Magazine-style expanded content (P1)
- Add subheadings to break up brian[] paragraphs
- Add pull-quote boxes for key insights (CSS-only, indigo left border)
- Add contextual Lucide icons as visual anchors per section
- Restructure brian[] from flat strings to structured objects: `{ type: 'paragraph' | 'heading' | 'pullquote', text: '...' }`
- Touches: `src/components/DeepDives.jsx` (data restructure + rich rendering)

### 3. Vine-o-coding as second case study timeline (P2)
- Add a "How this site was built" section to CaseStudy.jsx
- Create vine-o-coding timeline data (7 phases so far) with phase summaries
- Include a "development blog" framing with phase-by-phase entries
- Add a callout that this is a live, ongoing case study
- Touches: `src/pages/CaseStudy.jsx`, new `src/lib/vineTimelineData.js`, possibly new `src/components/VineTimeline.jsx`

---

## Out of Scope (Phase 7)

- Illustrated characters / custom artwork (Maya's request — needs a designer)
- Full standalone blog route (`/blog`) — defer to Phase 8+ if feedback warrants
- External images or screenshots — would need asset pipeline
- Code snippet rendering with syntax highlighting — defer unless blog demands it

---

## Dependencies

Items 1 and 2 both modify DeepDives.jsx. Build 1 first (restructure data), then 2 (style the restructured data). Item 3 is independent.

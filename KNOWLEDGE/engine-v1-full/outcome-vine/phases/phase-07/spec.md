# Phase 7 Spec — Make It Rich & Shareable

**Date:** 2026-02-15

---

## Item 1: Deep Dive Restructure — Visible Lessons + Links

### Acceptance Criteria
- [ ] Each deep dive card shows: icon, title, Maya one-liner, **key lesson**, and **further reading links** without clicking
- [ ] "Details" expandable contains only the longer Brian paragraphs
- [ ] Key lesson is a 1-2 sentence takeaway, visually distinct (e.g. bold or highlighted)
- [ ] Further reading links are always visible below the lesson
- [ ] Expandable label says "Read the full analysis" or similar (not "Click to expand")
- [ ] Mobile: all visible content fits without horizontal overflow at 375px

### Technical Design
**Data restructure in `DeepDives.jsx`:**
```js
{
  icon: Lightbulb,
  title: 'Phases are hypotheses',
  maya: "You don't have to get it right the first time.",
  lesson: 'The plan evolves as evidence accumulates. Phase 2 failing meant Phase 2 revealed something important.',
  links: [...],           // always visible
  brian: [...]            // inside expandable
}
```

**Layout:** Card renders lesson + links in the always-visible area. `<details>` wraps only brian[].

---

## Item 2: Magazine-Style Expanded Content

### Acceptance Criteria
- [ ] Each expanded dive has at least one subheading breaking up the text
- [ ] At least one pull-quote box per dive (key insight, visually highlighted)
- [ ] Pull-quote: indigo left border, slightly larger text, italic, light background
- [ ] A contextual Lucide icon decorates the expanded section header
- [ ] Content reads as scannable, not wall-of-text
- [ ] No external images required — icons + CSS decorative elements only
- [ ] Mobile: pull-quotes and headings stack cleanly at 375px

### Technical Design
**Restructure brian[] from flat strings to rich content blocks:**
```js
brian: [
  { type: 'paragraph', text: '...' },
  { type: 'heading', text: 'When the plan breaks' },
  { type: 'pullquote', text: 'Phase 2 failing meant Phase 2 revealed something important.' },
  { type: 'paragraph', text: '...' },
]
```

**Renderer:** Map over blocks, render `<p>`, `<h4>`, or styled `<blockquote>` based on type.

---

## Item 3: Vine-o-Coding as Live Case Study

### Acceptance Criteria
- [ ] New section on case study page: "How this site was built"
- [ ] Timeline with 7 phases (Phase 1–7) showing title + 1-sentence outcome
- [ ] Clear framing: "This is a live case study — you're reading the result of Phase 7 right now"
- [ ] Each phase entry includes: phase number, title, key outcome, confidence score
- [ ] "Development story" framing — reads like a blog post summary that could be shared
- [ ] Link or note that full phase docs exist (for the curious/Brian)
- [ ] Mobile responsive at 375px

### Technical Design
**New file: `src/lib/vineTimelineData.js`** — array of phase objects:
```js
{ id: 1, title: 'Make It Clear', outcome: 'Landing page with hero, process cards, and proof section.', score: 78 }
```

**New component or section in CaseStudy.jsx** — compact timeline rendering vine phases, visually distinct from grants-hub timeline (different accent color — emerald instead of indigo).

**Callout box:** "You're reading this on a site built with Outcome Vine Coding. Every page you see went through the same Research → Build → Critique loop."

---

## New / Modified Files

| File | Action |
|---|---|
| `src/components/DeepDives.jsx` | Major refactor: data restructure + layout change + rich content renderer |
| `src/lib/vineTimelineData.js` | New: vine-o-coding phase data |
| `src/pages/CaseStudy.jsx` | Add vine-o-coding case study section |

## Dependencies
- No new npm packages
- No external images
- No backend changes

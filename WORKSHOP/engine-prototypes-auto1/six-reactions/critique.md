# Critique: six-reactions

## 7 Constitutional Questions

### 1. Does something already exist?
No. Multi-reaction systems exist (Facebook, LinkedIn) but none use value-type categories. This is kamunity.ai's original design.

### 2. Is the outcome clearly defined?
Yes. Six specific reactions, multi-select, aggregate display, room analytics. Clear test cases.

### 3. Could this cause harm?
Low risk. "Spicy" could be used to brigade controversial posts, but this is no different from any reaction system. The taxonomy encourages constructive categorisation rather than approval/disapproval. Net positive.

### 4. Is it scope-appropriate?
Yes. A reaction component + room analytics. Focused.

### 5. Does it serve community sovereignty?
Yes. Value-type reactions give communities a richer vocabulary for understanding their own conversations. "Your room is mostly Fact and Curious" tells you something meaningful about your community's character — this is self-knowledge.

### 6. Is the tech stack compatible?
Yes. React component + Tailwind + Prisma schema.

### 7. Can it be built in the time budget?
Yes. The component is well-scoped. The animations add polish but aren't complex.

## Identified Biases
- **Taxonomy bias:** The six categories reflect a particular view of content value. Other cultures or communities might categorise differently. Acknowledged — the system should eventually allow custom reaction sets.
- **Gamification risk:** Visible reaction counts could encourage "reaction farming." Mitigated by the fact that these are value-type (not popularity) reactions — getting lots of "Spicy" isn't necessarily positive.

## Flagged Decisions
- Used CSS animations rather than a library (Framer Motion, etc.) to keep dependencies minimal.
- Mock data includes varied reaction distributions to demonstrate different post "characters."

# Critique: room-type-templates

## 7 Constitutional Questions

### 1. Does something already exist?
Partially. Mighty Networks and Circle have room/space types. But they're closed-source commercial platforms. No open-source, reusable component exists. Build is warranted.

### 2. Is the outcome clearly defined?
Yes. 4 templates, JSON-driven, preview UI. Clear test cases provided.

### 3. Could this cause harm?
No. Room templates are a UI configuration tool. No data collection, no surveillance potential.

### 4. Is it scope-appropriate?
Yes. A template selector + preview is focused and achievable. Not building the actual room — just the template system.

### 5. Does it serve community sovereignty?
Indirectly. Customizable rooms mean communities can shape their own spaces rather than accepting a one-size-fits-all layout. This is about community self-determination at the interface level.

### 6. Is the tech stack compatible?
Yes. React + Tailwind + TypeScript patterns. JSON config is Prisma-compatible for future DB storage.

### 7. Can it be built in the time budget?
Yes. The complexity is in the template data design and the preview rendering, both well within scope.

## Identified Biases
- **Template selection bias:** The 4 chosen templates reflect kamunity.ai's current user base (Australian community orgs). Other cultures may need different room types. Mitigated by the JSON-driven approach — new templates are trivial to add.
- **Layout assumption bias:** I'm assuming a card-based, section-prominence layout. Other approaches (sidebar, tab-based) might work better. Flagged but proceeding with the most common pattern.

## Flagged Decisions
- Chose to show a room preview rather than just a template card — this better demonstrates the value of templates.
- Kept to 4 templates as specified. Could easily be 8+ but that would be gold-plating.

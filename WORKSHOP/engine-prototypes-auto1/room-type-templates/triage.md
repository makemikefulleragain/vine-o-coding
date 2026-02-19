# Triage: room-type-templates

## Find → Connect → Extend → Integrate → Build

### Find
Mighty Networks and Circle both implement space/room types with different layouts. However:
- They are commercial, closed-source platforms
- Their implementations are tightly coupled to their own ecosystems
- You can't extract or reuse their room type logic
- No open-source equivalent exists as a standalone component

### Connect
The config-driven UI pattern is well-established in React. The innovation here is applying it specifically to community room configuration with the kamunity.ai context (P&C, Music/Arts, Volunteer, etc.).

### Extend
Nothing open-source to extend. The Mighty Networks/Circle approach confirms the pattern works, but their code isn't available.

### Integrate
N/A.

### Build
**Decision: BUILD.** The pattern is proven (config-driven UI + commercial precedent), but no reusable, open-source implementation exists. Building a JSON-configurable room template selector and renderer is warranted and well-scoped.

## Triage Result: BUILD
Justification: Commercial platforms validate the concept. No open-source implementation available. The JSON-driven approach ensures kamunity.ai can extend it easily.

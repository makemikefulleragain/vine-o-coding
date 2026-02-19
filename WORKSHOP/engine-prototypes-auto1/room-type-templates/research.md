# Research: room-type-templates

**Searches used:** 3 of 5

## Search 1: Community platform room/space templates (Notion, Discord)
**Finding:** Discord has "channel templates" in server setup but they're basic (just pre-named channels). Notion templates are workspace-level, not room-level. Neither provides a "room type" concept where the layout and tool emphasis changes based on purpose.

## Search 2: Config-driven UI patterns
**Finding:** Config-driven UI is a well-established React pattern. The dev.to article on "Mastering Config-Driven UI" confirms: define UI structure in JSON, render dynamically. This is the exact pattern needed. No novelty in the approach — just applying a known pattern to the community room context.

## Search 3: Mighty Networks / Circle space types
**Finding:**
- **Mighty Networks** has "Spaces" with different types (Discussion, Course, Event, etc.). Each type has a different layout emphasis. This is the closest existing implementation to what's being asked for.
- **Circle** has customizable spaces with different section types (discussions, events, members, etc.) that can be arranged per space.
- Neither is open-source. Neither is available as a standalone component.

## Summary
- **The concept exists** in commercial platforms (Mighty Networks, Circle) but not as a standalone, open-source, embeddable component.
- **The pattern (config-driven UI) is proven** and well-documented.
- **Build is warranted** — creating a JSON-configurable room template system as a reusable React component. The value is in making it data-driven so kamunity.ai can add room types without code changes.

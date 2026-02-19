# Spec: six-reactions

## Acceptance Criteria

1. **Six reaction buttons:** Fact 📊, Fun 🎉, Spicy 🌶️, Nice 💚, Curious 🔍, Surprising 🤯
2. **Multi-select:** Users can select one or more reactions per post
3. **Aggregate display:** Shows reaction distribution per post (e.g., bar or pill display)
4. **Room analytics:** A summary view showing "this room's posts are mostly Fact and Curious"
5. **Animations:** Warm, alive transitions (campfire aesthetic)
6. **Test case:** Post A gets 10 Fact + 3 Curious → displays as primarily informational. Post B gets 8 Spicy + 5 Fun → displays as provocative/entertaining.
7. **Supabase-compatible schema** included

## Technical Design

### Data Model
```typescript
interface Reaction {
  type: 'fact' | 'fun' | 'spicy' | 'nice' | 'curious' | 'surprising';
  emoji: string;
  label: string;
  color: string;
  description: string;
}

interface PostReactions {
  postId: string;
  counts: Record<string, number>;
  userReactions: string[]; // which ones the current user selected
}
```

### Architecture
- Single `index.html` with React + Tailwind
- Mock posts with pre-set reaction counts + ability to add your own
- Reaction buttons with click animation (bounce/glow)
- Distribution bar showing proportional breakdown
- Room-level analytics panel aggregating all posts
- Campfire-warm color palette

### UX Details
- Reactions appear below each post
- Click to toggle a reaction on/off
- Count updates immediately with animation
- Distribution bar uses reaction colours
- Room analytics shows dominant reaction types and what that means about the room's character

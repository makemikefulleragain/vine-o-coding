# Spec: community-asset-register

## Acceptance Criteria

1. **Register Assets:** A community group can register an asset with: name, description, category, location/suburb, availability status, conditions for borrowing, contact name, contact email
2. **Categories:** At minimum: Spaces, Equipment, Skills, Vehicles, Other
3. **Browse/Search:** Users can browse all assets, filter by category, search by keyword, filter by location
4. **Asset Detail:** Clicking an asset shows full details including contact information
5. **Request Flow:** Simple "contact the owner" — displays email/contact info (no in-app messaging needed)
6. **No Payment Processing:** This is community sharing, not rental
7. **Responsive:** Works on mobile and desktop
8. **Self-contained:** Works with mock data, no external database required for demo
9. **Under 500 lines**

## Technical Design

### Architecture
Single-page React app using:
- React (via CDN or single HTML file)
- Tailwind CSS (CDN)
- Mock data embedded in the file
- LocalStorage for persisting user-added assets during session

### Data Model
```
Asset {
  id: string
  name: string
  description: string
  category: "spaces" | "equipment" | "skills" | "vehicles" | "other"
  location: string (suburb/area)
  availability: "available" | "in-use" | "unavailable"
  conditions: string (borrowing conditions)
  contactName: string
  contactEmail: string
  organisation: string
  createdAt: string (ISO date)
}
```

### UI Screens (single page, tabbed or modal)

1. **Browse View** (default)
   - Category filter pills
   - Search bar
   - Grid of asset cards (name, category icon, location, availability badge)
   - Click card → detail modal

2. **Register Asset** (modal/form)
   - Form with all fields
   - Saves to localStorage + adds to displayed list

3. **Asset Detail** (modal)
   - Full details
   - Contact info prominently displayed
   - "Email to request" mailto link

### Mock Data
Pre-populate with 8-10 realistic community assets:
- Community hall (space)
- Projector and screen (equipment)
- PA system (equipment)
- Marquee/gazebo (equipment)
- Grant writing skills (skill)
- Community bus (vehicle)
- Meeting room (space)
- First aid training (skill)

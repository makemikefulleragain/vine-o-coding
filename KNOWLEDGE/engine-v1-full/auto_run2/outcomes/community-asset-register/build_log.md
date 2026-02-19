# Build Log: community-asset-register

## Build Decision
Triage: BUILD (confidence 83/100)
Gap confirmed: No existing tool for inter-organization community asset sharing.

## What Was Built
- `index.html` — Single-file React web app (~200 lines of JSX + mock data)
- `README.md` — Usage documentation

## Technical Choices
- **React 18 via CDN + Babel:** Enables component-based UI without a build step. Single-file delivery.
- **Tailwind CSS via CDN:** Modern styling, responsive by default.
- **LocalStorage:** Persists user-registered assets within the browser session. Production would use Supabase.
- **Mock data:** 10 realistic community assets across all categories (spaces, equipment, skills, vehicles).

## Features Implemented
1. ✅ Browse all assets in a responsive card grid
2. ✅ Filter by category (Spaces, Equipment, Skills, Vehicles, Other)
3. ✅ Search by keyword (matches name, description, location, organisation)
4. ✅ Asset detail modal with full description, borrowing conditions, contact info
5. ✅ "Email to borrow" mailto link with pre-filled subject and body
6. ✅ Register new asset form with all fields
7. ✅ LocalStorage persistence for user-added assets
8. ✅ Availability badges (available, in-use, unavailable)
9. ✅ Results count
10. ✅ Responsive design (1-col mobile, 2-col tablet, 3-col desktop)

## Mock Data Assets
| Name | Category | Location | Organisation |
|---|---|---|---|
| Main Hall | Spaces | Northcote | Northcote Community Association |
| Projector & Screen | Equipment | Fitzroy | Fitzroy Neighbourhood House |
| PA System | Equipment | Brunswick | Brunswick Community Hub |
| Grant Writing Support | Skills | Melbourne-wide | Community Grants Network |
| Community Bus (12-seater) | Vehicles | Preston | Preston Community Centre |
| Marquee (6m x 3m) | Equipment | Coburg | Coburg Farmers Market Collective |
| Meeting Room (seats 15) | Spaces | Carlton | Carlton Neighbourhood Learning Centre |
| First Aid Training | Skills | Melbourne-wide | Community Health Volunteers |
| Trestle Tables (x10) | Equipment | Thornbury | Thornbury Action Group |
| Trailer (6x4 caged) | Vehicles | Reservoir | Reservoir Men's Shed |

## Testing
- Page loads with 10 mock assets displayed ✅
- Category filters work (click pills to filter) ✅
- Search filters by keyword across multiple fields ✅
- Asset detail modal opens on card click ✅
- Register form validates required fields ✅
- New assets appear in grid after registration ✅
- LocalStorage persists custom assets on page refresh ✅

## Line Count
~200 lines of JSX/JS + ~50 lines of mock data = ~250 lines total (well under 500 limit)

## Known Limitations
- LocalStorage means data is per-browser, not shared between users
- No image upload (text-only asset descriptions)
- No geographic/postcode search (text-based location only)
- No auth — anyone can register assets (demo mode)
- Babel in-browser compilation is slower than pre-compiled React (acceptable for demo)

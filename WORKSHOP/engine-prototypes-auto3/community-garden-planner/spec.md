# Spec: community-garden-planner

## Overview
A single-page web application for community garden coordinators to manage plot allocations, view planting calendars, schedule volunteer watering rosters, and maintain a member directory.

## Acceptance Criteria
1. **Visual plot map** — Grid of garden plots showing allocated (with member name) and available plots. Click to assign/unassign.
2. **Planting calendar** — Monthly view showing what to plant by season (Australian seasons). Covers common vegetables/herbs.
3. **Volunteer watering roster** — Weekly schedule showing which volunteer is responsible for communal watering on each day.
4. **Member directory** — List of plot holders with name, plot number, contact info, and join date.
5. **Responsive** — Works on desktop and mobile.
6. **Self-contained** — Single HTML file with React + Tailwind via CDN. Mock data. No backend needed.

## Technical Design
- **Stack:** Single HTML file, React 18 via CDN, Tailwind CSS via CDN
- **State:** React useState with mock data, localStorage persistence
- **Layout:** Tab-based navigation between 4 views (Plots, Calendar, Roster, Members)
- **Data:** Hardcoded mock data for 20 plots, 12 members, seasonal planting guide, weekly roster

## Mock Data
- 20 garden plots in a 5x4 grid, 12 allocated to members
- Australian seasonal planting calendar (warm/cool season crops)
- 7-day watering roster with volunteer assignments
- 12 member profiles with names, plot assignments, contact details

## Out of Scope
- Authentication / user accounts
- Backend / database
- Real-time updates
- Payment processing
- Waitlist management (future enhancement)

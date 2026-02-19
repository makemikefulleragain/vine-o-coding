# Spec: community-noticeboard

## Overview
A simple digital community noticeboard where people can post notices (events, offers, requests, lost & found) visible to their local area. No accounts needed to browse. Simple name/email to post.

## Acceptance Criteria
1. **Post a notice** — Title, description, category (Event, Offer, Request, Lost & Found, General), poster name, email, suburb/area, expiry date.
2. **Browse notices** — View all notices, filter by category, search by keyword.
3. **Auto-expire** — Notices past their expiry date are hidden (with option to show expired).
4. **No accounts to view** — Anyone can browse. Name + email required to post (simple, no password).
5. **Location display** — Each notice shows its suburb/area tag.
6. **Responsive** — Works on phone and desktop.

## Technical Design
- **Stack:** Single HTML file, React 18 + Tailwind via CDN
- **State:** localStorage for notices
- **Layout:** Main feed with category filter sidebar/tabs, post form modal
- **Expiry:** Notices store expiry date, filtered on render

## Mock Data
Pre-loaded with 8 sample notices across all categories:
- Events: "Community Clean-up Day", "Council Budget Meeting"
- Offers: "Free couch — good condition"
- Requests: "Volunteers needed for food bank Saturday"
- Lost & Found: "Lost tabby cat — Elm Street area"
- General: "New speed bumps on Main Road"

## Out of Scope
- Authentication / user accounts
- Backend / database
- Moderation tools
- Image uploads
- Map integration

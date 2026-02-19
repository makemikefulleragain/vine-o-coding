# Spec: qr-code-check-in

## Overview
A self-contained QR code check-in system for community events. Organiser creates an event, generates a QR code. Attendees scan the QR code with their phone camera, land on a check-in page, enter their name. Organiser sees real-time attendance and can export as CSV.

## Acceptance Criteria
1. **Create event** — Organiser enters event name, date, location. System generates a unique event with check-in URL.
2. **QR code** — Displays a QR code encoding the check-in URL. Printable.
3. **Check-in page** — Attendees scan QR → land on check-in form → enter name, email (optional) → submit → confirmation shown.
4. **Dashboard** — Organiser sees real-time list of checked-in attendees with timestamps.
5. **CSV export** — Download attendance list as CSV (name, email, check-in time).
6. **No app required** — Attendees use phone camera, which opens the URL in browser.

## Technical Design
- **Stack:** Single HTML file, React 18 + Tailwind via CDN
- **QR Generation:** qrcode.js library via CDN (generates QR codes client-side)
- **State:** localStorage — events and check-ins stored in browser
- **Routing:** Hash-based routing (#create, #checkin/eventId, #dashboard/eventId)
- **No backend** — all data is client-local (demo/proof-of-concept)

## Limitation for Demo
Since this is a single-file demo without a backend, the check-in form and the dashboard must be on the same browser/device. In production, a backend would enable true multi-device real-time check-in. The demo proves the UX and flow.

## Out of Scope
- Backend / database / multi-device sync
- Authentication
- Duplicate check-in prevention (would need backend)
- SMS notifications

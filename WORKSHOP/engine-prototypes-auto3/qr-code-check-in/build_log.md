# Build Log: qr-code-check-in

## Build Decision
Built because no open-source self-hosted event QR check-in tool exists. Commercial SaaS options (OneTap, rsvpBOOK) exist but require accounts and put data on third-party servers. The build is trivially simple (~250 lines) — simpler than SaaS onboarding.

## What Was Built
Single-page HTML app with hash-based routing:
1. **Home** — Create events, view event list
2. **Check-in page** — Attendee-facing form (name, optional email)
3. **Dashboard** — QR code display, attendance count, attendee list, CSV export, print QR

## Technical Choices
- Single HTML file for portability
- React 18 + Tailwind via CDN
- qrcode.js for client-side QR code generation
- Hash routing (#checkin/eventId, #dashboard/eventId) for single-file multi-view
- localStorage for persistence

## Lines of Code
~250 lines (under 500 limit)

## Known Limitations
- Demo uses localStorage: check-in and dashboard must be on same device
- Production would need a backend for multi-device real-time check-in
- No duplicate check-in prevention

## Prediction Outcome
**Prediction said RECOMMEND; engine decided BUILD.**
Disagreement based on evidence: commercial SaaS exists but no open-source self-hosted option. Build is simpler than SaaS for this use case.

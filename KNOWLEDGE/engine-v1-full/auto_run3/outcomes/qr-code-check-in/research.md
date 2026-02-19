# Research: qr-code-check-in

## Search 1: "QR code event check-in system free community events attendance tracking"
### Findings:
- **RegFox** — Commercial event platform with free check-in app, QR codes emailed to attendees. Part of larger event management SaaS. US-based.
- **vFairs** — Enterprise event check-in with QR scanning, session tracking. Enterprise pricing.
- **rsvpBOOK** — Free QR code event check-in. SaaS, account required.
- **OneTap** — Simple attendance tracking with QR codes. Has nonprofit-specific features including grant management attendance. Free tier available. US-based SaaS.

## Search 2: "open source QR code attendance check-in system self-hosted nonprofit"
### Findings:
- **QR-Attendance-System** (GitHub: AzeemIdrisi) — Open source, auto IP fetching, faculty panel. **Classroom-focused** — designed for student attendance in classrooms, not community event check-in.
- **eAttendance** (GitHub: smit-joshi814) — QR code attendance with customizable timeout. **Classroom-focused** — faculty/student model, not event model.
- **ConQR** (GitHub: trustedsec) — Open source QR ticketing for conferences. Python-based. Ticketing focus, not general event check-in.
- **QR Code Attendance System PHP/MySQL** — Student attendance system. Classroom-focused.

## Search 3: "OneTap check-in app nonprofit free tier pricing"
### Findings:
- OneTap: Nonprofit-focused features, grant compliance attendance records, QR code scanning, real-time reports
- Commercial SaaS based in Dallas, TX
- Free tier exists but unclear limitations
- Data hosted on OneTap's servers

## Gap Analysis

| Requirement | OneTap (SaaS) | rsvpBOOK (SaaS) | Open Source Options |
|---|---|---|---|
| Create event + get QR code | ✅ | ✅ | ❌ (classroom model) |
| Attendees scan with phone camera (no app) | ✅ | ✅ | Varies |
| Captures name, email (optional), time | ✅ | ✅ | Varies |
| Real-time attendance dashboard | ✅ | ✅ | Partial |
| Export as CSV | ✅ | ✅ | Varies |
| Standalone / self-hosted | ❌ SaaS | ❌ SaaS | ❌ (not event-focused) |
| No account needed for attendees | ✅ | ✅ | Varies |
| Data sovereignty | ❌ | ❌ | N/A |
| Free for community orgs | ✅ (free tier) | ✅ | ✅ |

## Key Observations

1. **Commercial SaaS tools exist and work** — OneTap and rsvpBOOK both functionally meet requirements
2. **No open-source self-hosted event check-in exists** — all open source options found are classroom attendance systems with faculty/student models
3. **The build is extremely simple** — a QR code is a URL, a check-in page is a form, a dashboard is a list. Estimated ~200 lines.
4. **For grant reporting**, having attendance data under org control (vs. SaaS dependency) has practical value
5. **The gap is real but narrow** — the functionality exists commercially, but not as self-hosted open source for event use cases

## Searches Used: 3 of 5

# Triage: qr-code-check-in

## Decision: BUILD

## Reasoning (Find → Connect → Extend → Integrate → Build)

### Find
- **Commercial SaaS tools exist:** OneTap, rsvpBOOK, RegFox all offer QR code event check-in. OneTap specifically targets nonprofits with grant compliance features.
- **Open source options are classroom-focused:** QR-Attendance-System, eAttendance — built for faculty/student classroom attendance, not community event check-in. Wrong model.
- **No open-source, self-hosted event QR check-in tool exists.**

### Connect
Commercial SaaS functionally meets the requirements. But:
- Data lives on third-party servers (US-based companies)
- Account creation required for organisers
- Free tiers have unclear limitations
- Dependency on external service for grant-critical attendance records

### Extend
Could adapt classroom-focused open source tools? The faculty/student model is fundamentally different from event check-in (ongoing class enrolment vs. one-off event attendance). Would require significant reworking.

### Integrate
No viable integration path for self-hosted use.

### Build
**Build is warranted for three reasons:**
1. **No open-source self-hosted option exists** for event check-in
2. **The build is trivially simple** (~200 lines) — a QR code is a URL encoded as an image, a check-in page is a form, a dashboard is a list. Recommending a SaaS with account setup for something this simple adds overhead, not efficiency.
3. **Community sovereignty** — attendance data for grant reporting should be under org control, not on a US SaaS company's servers

## Prediction Check

**Prediction:** RECOMMEND existing tool — "There are lots of QR check-in services out there already. Don't reinvent the wheel."

**I DISAGREE with this prediction — but it's closer to reasonable than Outcome 1's prediction.**

The prediction is partially correct: commercial QR check-in SaaS services do exist (OneTap, rsvpBOOK). They work. "Lots" is an overstatement — I found ~4 relevant commercial services, and zero open-source self-hosted options.

I disagree because:
1. **No open-source or self-hosted option exists.** The "wheel" that exists is a commercial SaaS wheel, not an open-source one.
2. **The build is simpler than the recommendation.** Signing up for a SaaS, configuring it, learning its UI, and depending on it ongoing is MORE overhead than opening a single HTML file. When the build is this simple, "don't reinvent the wheel" becomes "don't bother putting on shoes."
3. **Grant reporting data under org control** has practical value for community organisations.
4. A single HTML file with no dependencies serves community sovereignty better than a US-based SaaS.

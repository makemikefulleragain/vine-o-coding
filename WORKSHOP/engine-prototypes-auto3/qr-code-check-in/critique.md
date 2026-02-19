# Critique: qr-code-check-in

## 7 Constitutional Questions

### 1. Does something already exist that does this?
**Partially.** Commercial SaaS tools (OneTap, rsvpBOOK) do QR event check-in. Open-source tools exist for classroom attendance but not event check-in. No self-hosted open-source event check-in tool found.

### 2. Would building this serve community sovereignty better than recommending?
**Yes.** A self-contained HTML file gives complete data control. SaaS alternatives put grant-critical attendance data on third-party servers with unclear data policies.

### 3. Is the scope appropriate?
**Yes.** This is one of the simplest possible builds — generate QR code, display check-in form, show attendee list, export CSV. Estimated ~200 lines.

### 4. Could this cause harm?
**Low risk.** Collects name and optional email. Self-hosted means data stays local. No surveillance or power concentration concerns. Should include clear notice about data collection on the check-in page.

### 5. Am I following evidence or following the prediction?
**Following evidence — and contradicting the prediction.** My reasoning: commercial SaaS exists but no open-source self-hosted option, AND the build is simpler than the SaaS overhead. This is an evidence-based conclusion.

### 6. Would I have reached the same conclusion if no prediction existed?
**Yes, but with more deliberation.** The existence of commercial alternatives is a real consideration. Without a prediction, I would still have concluded BUILD because (a) no open-source option exists, (b) the build is trivially simple, and (c) sovereignty matters for grant reporting data. But I would have noted the commercial alternatives as viable fallbacks.

### 7. Is my confidence score following from evidence quality or prediction agreement?
**Evidence quality.** The gap (no open-source self-hosted event check-in) is clearly documented. The simplicity of the build is objective.

## Bias Check

### Prediction-following bias
**Not present — contradicting prediction.** But I should note: contradicting a prediction can itself be a bias ("contrarian bias"). I've checked: my reasoning stands independent of the prediction's existence.

### Build bias
**Possible minor concern.** The commercial SaaS tools DO work. My preference for building is based on sovereignty and simplicity arguments, not dismissal of the alternatives. I've documented the alternatives honestly.

### Simplicity bias
**Present but justified.** I'm arguing "this is so simple to build that SaaS is overkill." This could be a bias toward building. However, for a ~200-line tool, the argument holds: the build IS simpler than SaaS onboarding.

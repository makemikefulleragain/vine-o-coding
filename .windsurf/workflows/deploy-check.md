---
description: Verify all live Kamunity sites still respond and report failures
---

# Deploy Check — Site Health Verification

Checks every live URL in the ecosystem and reports status.

## Steps

1. Read the site list from `BRAIN/ECOSYSTEM.md`

2. Check each live site (HTTP GET, expect 200):
   - https://kamunity.org
   - https://kamunity.ai
   - https://sovereignty-audit-kamunity.netlify.app
   - https://ai-readiness-kamunity.netlify.app
   - https://vine-o-code.netlify.app
   - https://factoryk.netlify.app
   - https://nonna-knits-club.netlify.app
   - https://kamunity-grants-hub.netlify.app
   - https://neokamunitywedding.netlify.app

3. For each site, report:
   - ✅ responds with 200
   - ⚠️ responds but not 200 (show status code)
   - ❌ does not respond (timeout or error)

4. Check custom domains:
   - kamunity.org → should resolve to Netlify
   - kamunity.ai → should resolve to Netlify

5. Report summary:
   - "[X]/[Y] sites healthy"
   - List any failures with details
   - Suggest fix for any failures (DNS? Build failed? Repo issue?)

6. If any failures found:
   - Update `BRAIN/STATE.md` with the failure
   - Flag if it affects a safety gate or upcoming meeting

7. If all healthy:
   - Confirm: "All [X] sites responding. Ecosystem healthy."

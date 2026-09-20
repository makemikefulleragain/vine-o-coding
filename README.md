# VinoCode / Outcome Vine Coding

Curated Kamunity showcase: an accessible, browser-based method for turning a project idea into eleven foundation documents and a downloadable ZIP. This is a planning starter, not a guarantee of production-ready software.

## Local development

Use the committed lockfile with `npm ci`, then `npm run dev`. `npm test` runs only the three source test files, not tests in generated example projects. `npm run build` creates `dist`; `npm run preview -- --host 127.0.0.1` serves the built result locally.

The app generates documents in the browser. No application API secret is required. Treat saved drafts as local browser data; do not enter sensitive personal information in a shared-browser session. Verify feedback/contact destinations separately before publishing.

## Canonical source and recovery

On 13 September 2026 the newer source from `Kamunity-Tabletop-Plan/KNOWLEDGE/engine-v1-full/outcome-vine` was consolidated here. That source and its research/generated examples remain preserved in place. The standalone honest-use footer remains unchanged. Source tests are explicitly scoped in `vite.config.js`.

Before consolidation, the original history was recovered using GitHub objects plus hash-verified local objects. A complete pack/index was added without replacing or deleting original OneDrive objects. A subsequent ordinary repository snapshot succeeded without an alternate object store: `portfolio-audit/local-recovery/2026-09-13/vinocode-native-verified-baseline` in the enclosing workspace. Backup HEAD: `63a7d2465d50f87256558f9f52989867f39122d9`. Earlier timed-out snapshots are not backups.

## Release gates

- Intended repository: `makemikefulleragain/vine-o-coding`.
- Intended showcase: `https://vine-o-coding.netlify.app`; duplicate: `https://outcome-vine.netlify.app`.
- Tests/build, the six-step browser path, the eleven-file download and mobile checks passed locally on 20 September 2026; see `LOCAL_RELEASE_ACCEPTANCE_2026-09-20.md`.
- The current public canonical site does not yet match the accepted local asset. Owner approval is required before GitHub or Netlify publication.
- Preserve both deployments and record a known-good rollback deployment before any publication.
- No deployment, domain change or duplicate retirement is authorized merely by this local consolidation.

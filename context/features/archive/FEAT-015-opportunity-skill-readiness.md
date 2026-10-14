# FEAT-015-opportunity-skill-readiness: Clarify work readiness and earned skill evidence

- **id:** FEAT-015-opportunity-skill-readiness
- **title:** Clarify work readiness and earned skill evidence
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T07:47:37.803Z
- **started_at:** 2026-10-14T07:47:37.844Z
- **completed_at:** 2026-10-14T07:53:57.607Z
- **summary:** Added work readiness, colored earned/missing skill icons and evidence provenance.
- **completion_validation:** 41 tests and production build pass; browser visual checks passed.

## Acceptance criteria

- [x] Opportunity detail shows readiness and distinguishes earned vs missing skills using labelled colored icons and evidence provenance

## Dependencies


## Files

- components/WorkReadiness.tsx
- components/Hub.tsx
- app/globals.css
- lib/work-readiness.mjs
- tests/work-readiness.test.mjs
- public/sw.js
- README.md
- context/PROJECT_CONTEXT.md

## Research


## Blockers


## Validation

- 41 automated tests pass; production build passes with 42 generated pages.
- Browser verified readiness, missing courses and labelled colored icons; temporary fixture verified course and existing-experience evidence, then removed.
- Zero covered requirements show Build towards this; partial coverage with one or two gaps shows Almost there.

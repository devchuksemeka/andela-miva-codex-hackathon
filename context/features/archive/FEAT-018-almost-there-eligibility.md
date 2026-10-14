# FEAT-018-almost-there-eligibility: Align Almost there with relevant learning

- **id:** FEAT-018-almost-there-eligibility
- **title:** Align Almost there with relevant learning
- **area:** both
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-14T09:31:42.051Z
- **started_at:** 2026-10-14T09:31:42.092Z
- **completed_at:** 2026-10-14T09:33:07.835Z
- **summary:** Aligned Almost there with single-requirement or relevant completed learning and skill evidence.
- **completion_validation:** 49 tests and production build pass; browser verified filter.

## Acceptance criteria

- [x] Single-requirement work is almost before learning; multi-requirement work is almost only after relevant course or skill; ready still requires all demonstrated skills

## Dependencies


## Files

- lib/matching.mjs
- lib/work-readiness.mjs
- tests/matching.test.mjs
- tests/work-readiness.test.mjs
- components/Hub.tsx
- app/api/opportunities/route.ts
- public/sw.js
- context/PROJECT_CONTEXT.md

## Research


## Blockers


## Validation

- 49 automated tests pass; production build passes.
- Browser Almost there filter with no progress includes only four single-requirement pathways.
- Tests verify partial skills with more than two gaps, completed courses, unrelated courses and tool mismatch; course completion never grants ready.

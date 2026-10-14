# FEAT-019-course-search: Search courses within category filters

- **id:** FEAT-019-course-search
- **title:** Search courses within category filters
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:03:11.821Z
- **started_at:** 2026-10-14T10:03:11.872Z
- **completed_at:** 2026-10-14T10:04:55.973Z
- **summary:** Added live course search above category filters with result count and reset.
- **completion_validation:** 53 tests and build pass; browser search/category/reset/Enter verified.

## Acceptance criteria

- [x] Search form above course category tabs filters title tool description and skills with clear empty state

## Dependencies


## Files

- components/Hub.tsx
- app/globals.css
- lib/course-search.mjs
- tests/course-search.test.mjs
- public/sw.js

## Research

- Search combines with category selection; titles, tools and transferable skill names should be discoverable. Keep search local to bundled catalogue and avoid navigation on submit.

## Blockers


## Validation

- 53 tests, TypeScript and production build pass.
- Browser verified trimmed mixed-case CapCut search returns2, category intersection empty state, reset and Enter without navigation; screenshot captured.

# FEAT-013-progress-and-settings: Focus progress on started courses and add settings

- **id:** FEAT-013-progress-and-settings
- **title:** Focus progress on started courses and add settings
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-13T18:27:50.431Z
- **started_at:** 2026-10-13T18:27:50.494Z
- **completed_at:** 2026-10-13T18:30:35.725Z
- **summary:** Limited progress to started learning, moved skills/privacy to Settings and updated profile navigation
- **completion_validation:** 26 tests and production build pass; browser progress filtering and Settings route/profile verified

## Acceptance criteria

- [x] Progress lists only started courses; skill evidence and privacy move to settings; profile links to settings

## Dependencies


## Files

- components/Hub.tsx
- app/settings/page.tsx
- app/globals.css
- lib/progress.mjs
- tests/progress.test.mjs
- public/sw.js
- README.md
- context/PROJECT_CONTEXT.md

## Research

- Existing /progress maps every course and mixes course tracking with skill evidence/privacy controls.
- Started tracking must recognise existing local completions; opening a course records started status without claiming lesson or skill completion.

## Blockers


## Validation

- 26 tests pass including untouched exclusion, opened course with zero lessons, legacy activity inference and completed-course separation.
- Production build passes with /settings route.
- Browser /progress empty state verified with no untouched catalogue rows; demonstrated skills and privacy absent there.
- Profile opens /settings; moved skills/evidence/privacy/export sections and direct Settings refresh verified.

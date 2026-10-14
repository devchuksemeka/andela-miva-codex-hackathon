# FEAT-020-settings-skill-section: Remove demonstrated skills section from Settings

- **id:** FEAT-020-settings-skill-section
- **title:** Remove demonstrated skills section from Settings
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:05:04.128Z
- **started_at:** 2026-10-14T10:05:04.169Z
- **completed_at:** 2026-10-14T10:06:30.035Z
- **summary:** Removed Settings demonstrated-skills panel and dangling evidence form links while preserving saved data.
- **completion_validation:** 53 tests TypeScript and production build pass; Settings browser verified.

## Acceptance criteria

- [x] Settings no longer displays Your demonstrated skills section

## Dependencies


## Files

- components/Hub.tsx
- components/WorkReadiness.tsx
- public/sw.js
- context/PROJECT_CONTEXT.md

## Research


## Blockers


## Validation

- 53 tests and TypeScript pass.
- Browser verifies Settings has only privacy/export controls; existing saved evidence untouched.

# FEAT-025-sticky-header: Keep app header visible while scrolling

- **id:** FEAT-025-sticky-header
- **title:** Keep app header visible while scrolling
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:59:30.022Z
- **started_at:** 2026-10-14T10:59:30.074Z
- **completed_at:** 2026-10-14T12:58:47.699Z
- **summary:** Kept app header sticky with anchor offsets.
- **completion_validation:** Build pass browser header top0 after scrolling user confirmed.

## Acceptance criteria

- [x] App header stays visible on desktop/mobile without covering content or language menu

## Dependencies


## Files

- app/globals.css
- public/sw.js

## Research


## Blockers


## Validation

- Production build passed; browser scroll700px retained header top0. User confirmed works.

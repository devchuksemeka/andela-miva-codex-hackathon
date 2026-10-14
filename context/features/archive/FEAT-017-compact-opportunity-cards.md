# FEAT-017-compact-opportunity-cards: Limit opportunity card skills and remove footer prompt

- **id:** FEAT-017-compact-opportunity-cards
- **title:** Limit opportunity card skills and remove footer prompt
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T09:23:26.115Z
- **started_at:** 2026-10-14T09:23:26.166Z
- **completed_at:** 2026-10-14T09:29:24.812Z
- **summary:** Removed learning footer and capped card skills at three with details overflow cue.
- **completion_validation:** 41 tests and production build pass; browser checked cards.

## Acceptance criteria

- [x] Opportunity cards show at most three skills, no Learn footer prompt, and a details cue for additional skills

## Dependencies


## Files

- components/Hub.tsx
- app/globals.css
- public/sw.js

## Research


## Blockers


## Validation

- 41 tests pass; production build passes.
- Browser verified no learning footer prompt. Code limits rows to3 and conditionally shows remaining count; current catalogue has at most3 requirements. Detail list unchanged.

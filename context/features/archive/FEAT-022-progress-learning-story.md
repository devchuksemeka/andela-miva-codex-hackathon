# FEAT-022-progress-learning-story: Connect learner progress to work pathways

- **id:** FEAT-022-progress-learning-story
- **title:** Connect learner progress to work pathways
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:11:27.335Z
- **started_at:** 2026-10-14T10:11:27.383Z
- **completed_at:** 2026-10-14T10:15:58.112Z
- **summary:** Redesigned Progress as a personal learning evidence and work journey with ready pathways and relevant next steps.
- **completion_validation:** 53 tests TypeScript and clean build pass; real empty and sample ready layouts browser verified.

## Acceptance criteria

- [x] Progress tells a personal learning story and displays ready work from demonstrated skills plus relevant next steps without becoming a course catalogue

## Dependencies


## Files

- components/ProgressJourney.tsx
- components/Hub.tsx
- app/globals.css
- public/sw.js
- context/PROJECT_CONTEXT.md

## Research

- Progress should explain how real learning activity leads to practical evidence and matched work. Show actual started/completed courses and ready matches; do not promise income or list untouched courses. Near-work recommendations must have genuine relevant learner activity, beyond single-requirement almost defaults.

## Blockers


## Validation

- 53 tests TypeScript and clean production build pass;42 generated pages, no fixture route.
- Browser verified actual empty progress state and temporary sample completed/ready-work layout without changing storage. Fixture removed before final build.
- Ready work derives all demonstrated requirements; next connections require relevant learning/evidence; counts use catalogue IDs.

# FEAT-016-opportunity-requirement-clarity: Make opportunity skill and course requirements visually clear

- **id:** FEAT-016-opportunity-requirement-clarity
- **title:** Make opportunity skill and course requirements visually clear
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T09:18:58.994Z
- **started_at:** 2026-10-14T09:18:59.040Z
- **completed_at:** 2026-10-14T09:21:03.502Z
- **summary:** Clarified required skills and suggested learning alternatives with distinct cards and status labels.
- **completion_validation:** 41 tests, TypeScript and production build pass; browser checked listing and detail.

## Acceptance criteria

- [x] Opportunity skills and recommended courses are explicitly labelled and visually grouped as requirements and ways to learn them

## Dependencies


## Files

- components/Hub.tsx
- components/WorkReadiness.tsx
- app/globals.css
- public/sw.js

## Research

- Requirements are demonstrated skills; courses are optional learning alternatives, not mandatory enrollment. Use explicit headings, borders, icons and status text rather than colour alone.

## Blockers


## Validation

- 41 tests passed; developer verified TypeScript and production build.
- Browser verified listing required-skill labels and detail bounded requirement with separate clickable course alternatives.

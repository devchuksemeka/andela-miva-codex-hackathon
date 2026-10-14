# FEAT-012-dedicated-route-pages: Add dedicated course opportunity and progress routes

- **id:** FEAT-012-dedicated-route-pages
- **title:** Add dedicated course opportunity and progress routes
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-13T17:55:20.467Z
- **started_at:** 2026-10-13T17:55:20.510Z
- **completed_at:** 2026-10-13T18:01:52.891Z
- **summary:** Added dedicated courses opportunities progress and course detail routes with URL-driven navigation
- **completion_validation:** 22 tests pass; production build passes; browser routes refresh and back/forward verified

## Acceptance criteria

- [x] Courses opportunities and progress render at dedicated URLs with correct links refresh and browser navigation

## Dependencies


## Files

- components/Hub.tsx
- app/page.tsx
- app/courses/page.tsx
- app/courses/[id]/page.tsx
- app/opportunities/page.tsx
- app/progress/page.tsx
- app/globals.css
- public/sw.js
- README.md
- context/PROJECT_CONTEXT.md
- context/coding_standard.md

## Research

- Next.js primary navigation documentation: https://nextjs.org/docs/app/getting-started/linking-and-navigating (reviewed 2026-10-13); use real App Router pages and links.
- Existing interface uses local tab state; route transitions must retain browser-local progress before navigation.

## Blockers


## Validation

- All 22 existing tests pass; production build generates requested pages and 18 course detail pages.
- Browser verified /courses, /opportunities, /progress, course detail refresh and back/forward after refresh.
- URL-derived section/course selection fixes observed history edge case; local progress saved before navigation, flash notice preserved.

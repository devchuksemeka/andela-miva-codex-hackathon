# FEAT-009-course-auth-access: Require learner sign-in for course access

- **id:** FEAT-009-course-auth-access
- **title:** Require learner sign-in for course access
- **area:** both
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-13T17:32:54.859Z
- **started_at:** 2026-10-13T17:32:54.904Z
- **completed_at:** 2026-10-13T17:38:14.408Z
- **contract:** Historical agreement no longer retained; auth was removed by FEAT-011
- **summary:** Required registered sessions for course content with server/API protection and sign-in intent resume
- **completion_validation:** 40 tests pass, 1 optional integration skipped; production build and guest browser gate verified; no private lesson bodies in client chunks

## Acceptance criteria

- [x] Guests browse courses but must authenticate to open lessons; content APIs enforce a session

## Dependencies


## Files

- lib/course-summary.ts
- lib/course-access.ts
- app/api/courses/
- app/api/skills/[id]/lessons/route.ts
- components/Hub.tsx
- components/LearnerAuth.tsx
- app/page.tsx
- public/sw.js
- tests/course-access.test.mjs

## Research

- Repository inspection: course JSON was bundled in the client and catalogue routes exposed lesson bodies. Protect both payload delivery and interface entry.

## Blockers


## Validation

- 40 tests pass, 1 optional database integration skipped; production build passes.
- Route tests cover public summary redaction, guest401, expired401, failure503, valid content, unknown404 and no-store.
- Browser guest course entry prompts email signup/signin; private lesson review text absent from production client chunks.
- Live SMTP signup completion remains dependent on configured credentials.

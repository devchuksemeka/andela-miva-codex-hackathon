# FEAT-008-learner-auth-interface: Learner email authentication interface

- **id:** FEAT-008-learner-auth-interface
- **title:** Learner email authentication interface
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-13T17:17:43.363Z
- **started_at:** 2026-10-13T17:17:43.401Z
- **completed_at:** 2026-10-13T17:31:40.679Z
- **contract:** Historical agreement no longer retained; auth was removed by FEAT-011
- **summary:** Added email-first signup/signin account dialog, names, code verification, resend, session display and signout
- **completion_validation:** Build passes; browser email entry and configuration error verified; real-mail completion awaits credentials

## Acceptance criteria

- [x] Email-first signup signin session and signout UI follows agreed API and preserves guest browsing

## Dependencies


## Files

- components/LearnerAuth.tsx
- components/Hub.tsx
- app/globals.css
- public/sw.js

## Research

- Official Nodemailer SMTP configuration: https://nodemailer.com/smtp (reviewed 2026-10-13).
- Next.js cookie handling: https://nextjs.org/docs/app/api-reference/functions/cookies (reviewed 2026-10-13).

## Blockers


## Validation

- Production build and TypeScript pass.
- Browser verified account dialog, email entry, submit and actionable unconfigured-service error.
- Signup/signin API services tested against isolated Postgres; full real-mail browser completion pending configured SMTP.

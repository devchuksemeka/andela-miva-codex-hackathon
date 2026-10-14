# FEAT-007-learner-auth-api: Email authentication API and delivery

- **id:** FEAT-007-learner-auth-api
- **title:** Email authentication API and delivery
- **area:** backend
- **owner:** backend-developer
- **status:** completed
- **created_at:** 2026-10-13T17:17:43.261Z
- **started_at:** 2026-10-13T17:17:43.319Z
- **completed_at:** 2026-10-13T17:31:40.623Z
- **contract:** Historical agreement no longer retained; auth was removed by FEAT-011
- **summary:** Added Postgres learner email OTP authentication, Nodemailer dispatch, hashed sessions and configuration placeholders
- **completion_validation:** 35 default tests pass, production build passes; opt-in isolated Postgres integration passed; live SMTP not tested

## Acceptance criteria

- [x] Email challenge signup signin session signout with secure persistence and Nodemailer configuration

## Dependencies


## Files

- lib/auth-core.mjs
- lib/auth-service.ts
- lib/auth-http.ts
- lib/mail.ts
- app/api/auth/
- data/auth-schema.sql
- scripts/auth-setup.mjs
- tests/auth-core.test.mjs
- tests/auth-service.test.mjs
- tests/auth-postgres.test.mjs
- .env.example
- package.json
- package-lock.json

## Research

- Official Nodemailer SMTP configuration: https://nodemailer.com/smtp (reviewed 2026-10-13).
- Next.js cookie handling: https://nextjs.org/docs/app/api-reference/functions/cookies (reviewed 2026-10-13).

## Blockers


## Validation

- Production build passes; 35 default tests pass, 1 opt-in Postgres test skipped.
- Isolated real Postgres integration test passed separately with stub sender: signup/signin, expired/single-use codes, cooldown, attempts, concurrent replay, session lookup and revocation.
- Live SMTP delivery not exercised; placeholders deliberately fail closed.

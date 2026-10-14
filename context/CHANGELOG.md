# Changelog

Generated from CHANGELOG.json. Started work appears here immediately; completed tasks retain an archive link. Earlier app work predates this ledger; see features/INDEX.md.

## FEAT-001-agent-coordination — Developer agents and feature coordination workflow

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T16:29:57.914Z
- Completed: 2026-10-13T16:34:28.176Z
- Task: [record](features/archive/FEAT-001-agent-coordination.md)
- Result: Created frontend/backend developer roles, coordination skill, shared standards/context and task/changelog lifecycle with interruption recovery
- Validation: All 19 tests passed; independent cross-layer workflow review completed; metadata and references checked

## FEAT-002-product-capstone-briefs — Product brief and capstone specification

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T16:36:42.238Z
- Completed: 2026-10-13T16:47:18.436Z
- Task: [record](features/archive/FEAT-002-product-capstone-briefs.md)
- Result: Created product brief and capstone specification with supplied challenge, product model, constraint mapping, acceptance criteria and honest implementation gaps
- Validation: Reviewed supplied requirements and project baseline; all local document links resolve; documentation-only change

## FEAT-003-context-consolidation — Consolidate orchestration into context folder

- Status: **in_progress**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T16:57:34.484Z
- Task: [record](features/active/FEAT-003-context-consolidation.md)

## FEAT-004-markdown-feature-records — Use Markdown for all feature context records

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T17:00:21.485Z
- Completed: 2026-10-13T17:00:39.164Z
- Task: [record](features/archive/FEAT-004-markdown-feature-records.md)
- Result: Migrated feature records to Markdown and updated lifecycle helper, tests and instructions
- Validation: Lifecycle suite passes using Markdown; feature folders contain only md files

## FEAT-005-feature-naming-standard — Enforce feature naming convention

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T17:04:07.785Z
- Completed: 2026-10-13T17:04:17.034Z
- Task: [record](features/archive/FEAT-005-feature-naming-standard.md)
- Result: Renamed existing feature records, updated links and enforced FEAT-XXX-task-name IDs with unique numbers
- Validation: All 20 tests passed

## FEAT-006-unified-coding-standard — Unify frontend and backend coding standards

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-13T17:08:27.676Z
- Completed: 2026-10-13T17:08:51.211Z
- Task: [record](features/archive/FEAT-006-unified-coding-standard.md)
- Result: Merged frontend and backend standards into context/coding_standard.md and removed old folder
- Validation: All 20 tests passed; references updated

## FEAT-007-learner-auth-api — Email authentication API and delivery

- Status: **completed**
- Owner: backend-developer; area: backend
- Started: 2026-10-13T17:17:43.319Z
- Completed: 2026-10-13T17:31:40.623Z
- Task: [record](features/archive/FEAT-007-learner-auth-api.md)
- Result: Added Postgres learner email OTP authentication, Nodemailer dispatch, hashed sessions and configuration placeholders
- Validation: 35 default tests pass, production build passes; opt-in isolated Postgres integration passed; live SMTP not tested

## FEAT-008-learner-auth-interface — Learner email authentication interface

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-13T17:17:43.401Z
- Completed: 2026-10-13T17:31:40.679Z
- Task: [record](features/archive/FEAT-008-learner-auth-interface.md)
- Result: Added email-first signup/signin account dialog, names, code verification, resend, session display and signout
- Validation: Build passes; browser email entry and configuration error verified; real-mail completion awaits credentials

## FEAT-009-course-auth-access — Require learner sign-in for course access

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-13T17:32:54.904Z
- Completed: 2026-10-13T17:38:14.408Z
- Task: [record](features/archive/FEAT-009-course-auth-access.md)
- Result: Required registered sessions for course content with server/API protection and sign-in intent resume
- Validation: 40 tests pass, 1 optional integration skipped; production build and guest browser gate verified; no private lesson bodies in client chunks

## FEAT-010-light-dark-theme — Add persistent light and dark mode

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-13T17:32:54.991Z
- Completed: 2026-10-13T17:38:14.457Z
- Task: [record](features/archive/FEAT-010-light-dark-theme.md)
- Result: Added persistent light and dark themes with system default and accessible toggle
- Validation: Build passes; browser toggles, reload persistence and dark surfaces verified

## FEAT-011-standalone-local-app — Remove authentication email and database integrations

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-13T17:46:20.915Z
- Completed: 2026-10-13T17:53:15.003Z
- Task: [record](features/archive/FEAT-011-standalone-local-app.md)
- Result: Removed authentication email and database integration and environment files; restored unrestricted local learning
- Validation: 22 tests and production build pass without env; browser direct course access verified

## FEAT-012-dedicated-route-pages — Add dedicated course opportunity and progress routes

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-13T17:55:20.510Z
- Completed: 2026-10-13T18:01:52.891Z
- Task: [record](features/archive/FEAT-012-dedicated-route-pages.md)
- Result: Added dedicated courses opportunities progress and course detail routes with URL-driven navigation
- Validation: 22 tests pass; production build passes; browser routes refresh and back/forward verified

## FEAT-013-progress-and-settings — Focus progress on started courses and add settings

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-13T18:27:50.494Z
- Completed: 2026-10-13T18:30:35.725Z
- Task: [record](features/archive/FEAT-013-progress-and-settings.md)
- Result: Limited progress to started learning, moved skills/privacy to Settings and updated profile navigation
- Validation: 26 tests and production build pass; browser progress filtering and Settings route/profile verified

## FEAT-014-learning-to-work — Practical courses and clear work opportunity journeys

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-14T07:25:28.960Z
- Completed: 2026-10-14T07:43:41.344Z
- Task: [record](features/archive/FEAT-014-learning-to-work.md)
- Result: Added work-focused completion modals, simple linked role cards and opportunity details; expanded all18 courses into54 practical lessons
- Validation: 36 tests and production build pass; modal keyboard/visual QA and opportunity routing verified; content human review pending

## FEAT-015-opportunity-skill-readiness — Clarify work readiness and earned skill evidence

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T07:47:37.844Z
- Completed: 2026-10-14T07:53:57.607Z
- Task: [record](features/archive/FEAT-015-opportunity-skill-readiness.md)
- Result: Added work readiness, colored earned/missing skill icons and evidence provenance.
- Validation: 41 tests and production build pass; browser visual checks passed.

## FEAT-016-opportunity-requirement-clarity — Make opportunity skill and course requirements visually clear

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T09:18:59.040Z
- Completed: 2026-10-14T09:21:03.502Z
- Task: [record](features/archive/FEAT-016-opportunity-requirement-clarity.md)
- Result: Clarified required skills and suggested learning alternatives with distinct cards and status labels.
- Validation: 41 tests, TypeScript and production build pass; browser checked listing and detail.

## FEAT-017-compact-opportunity-cards — Limit opportunity card skills and remove footer prompt

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T09:23:26.166Z
- Completed: 2026-10-14T09:29:24.812Z
- Task: [record](features/archive/FEAT-017-compact-opportunity-cards.md)
- Result: Removed learning footer and capped card skills at three with details overflow cue.
- Validation: 41 tests and production build pass; browser checked cards.

## FEAT-018-almost-there-eligibility — Align Almost there with relevant learning

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-14T09:31:42.092Z
- Completed: 2026-10-14T09:33:07.835Z
- Task: [record](features/archive/FEAT-018-almost-there-eligibility.md)
- Result: Aligned Almost there with single-requirement or relevant completed learning and skill evidence.
- Validation: 49 tests and production build pass; browser verified filter.

## FEAT-019-course-search — Search courses within category filters

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:03:11.872Z
- Completed: 2026-10-14T10:04:55.973Z
- Task: [record](features/archive/FEAT-019-course-search.md)
- Result: Added live course search above category filters with result count and reset.
- Validation: 53 tests and build pass; browser search/category/reset/Enter verified.

## FEAT-020-settings-skill-section — Remove demonstrated skills section from Settings

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:05:04.169Z
- Completed: 2026-10-14T10:06:30.035Z
- Task: [record](features/archive/FEAT-020-settings-skill-section.md)
- Result: Removed Settings demonstrated-skills panel and dangling evidence form links while preserving saved data.
- Validation: 53 tests TypeScript and production build pass; Settings browser verified.

## FEAT-021-settings-navigation — Remove Settings from sidebar and footer navigation

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:07:31.451Z
- Completed: 2026-10-14T10:08:17.074Z
- Task: [record](features/archive/FEAT-021-settings-navigation.md)
- Result: Removed Settings from sidebar and bottom navigation; preserved profile access.
- Validation: Production build passed; browser verified sidebar and profile link.

## FEAT-022-progress-learning-story — Connect learner progress to work pathways

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:11:27.383Z
- Completed: 2026-10-14T10:15:58.112Z
- Task: [record](features/archive/FEAT-022-progress-learning-story.md)
- Result: Redesigned Progress as a personal learning evidence and work journey with ready pathways and relevant next steps.
- Validation: 53 tests TypeScript and clean build pass; real empty and sample ready layouts browser verified.

## FEAT-023-language-access — Move language controls to header and Settings

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:16:47.363Z
- Completed: 2026-10-14T10:19:04.678Z
- Task: [record](features/archive/FEAT-023-language-access.md)
- Result: Moved language selection to desktop/mobile header and Settings with shared saved preference.
- Validation: 53 tests TypeScript build pass; browser sync persistence and320px layout verified.

## FEAT-024-language-dropdown — Polish header language dropdown and sidebar

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:29:38.171Z
- Completed: 2026-10-14T10:32:22.225Z
- Task: [record](features/archive/FEAT-024-language-dropdown.md)
- Result: Polished header language menu with keyboard access and removed obsolete sidebar divider.
- Validation: 53 tests TypeScript production build pass; keyboard/outside/mobile browser verified.

## FEAT-025-sticky-header — Keep app header visible while scrolling

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T10:59:30.074Z
- Completed: 2026-10-14T12:58:47.699Z
- Task: [record](features/archive/FEAT-025-sticky-header.md)
- Result: Kept app header sticky with anchor offsets.
- Validation: Build pass browser header top0 after scrolling user confirmed.

## FEAT-026-profile-portfolio-resume — Connect learner portfolio and experience to tailored resumes

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-14T12:57:13.553Z
- Completed: 2026-10-14T13:07:38.418Z
- Task: [record](features/archive/FEAT-026-profile-portfolio-resume.md)
- Result: Added local profile projects experience evidence-linked work and tailored factual resumes with optional consented AI selection; updated author and setup README.
- Validation: 69 tests and production build pass; browser CRUD draft mobile verified; README links resolve. Live AI requires credentials; native export/print end-to-end not verified.

## FEAT-027-feature-context-consistency — Keep all feature documentation inside feature records

- Status: **completed**
- Owner: coordinator; area: coordination
- Started: 2026-10-14T13:29:16.276Z
- Completed: 2026-10-14T13:29:40.718Z
- Task: [record](features/archive/FEAT-027-feature-context-consistency.md)
- Result: Consolidated shared agreements into feature records and documented all feature context must stay inside features.
- Validation: 5 workflow tests pass; contract content roundtrip verified, removed folder and stale paths checked.

## FEAT-028-avatar-menu — Add avatar menu for profile and settings

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T13:33:24.315Z
- Completed: 2026-10-14T13:36:06.318Z
- Task: [record](features/archive/FEAT-028-avatar-menu.md)
- Result: Added accessible avatar dropdown linking My profile and Settings.
- Validation: 69 tests TypeScript build pass; keyboard navigation dismissal and320px browser checks pass.

## FEAT-029-profile-future-preview — Present profile and AI resume as future invention capacity

- Status: **completed**
- Owner: frontend-developer; area: frontend
- Started: 2026-10-14T13:41:40.082Z
- Completed: 2026-10-14T13:48:48.259Z
- Task: [record](features/archive/FEAT-029-profile-future-preview.md)
- Result: Presented profile as future capacity with contextual AI résumé glimpse modal and planned reusable résumé library tab.
- Validation: 69 tests build pass; browser tab/modal keyboard390px dark checks pass; no data writes or AI calls.

## FEAT-030-app-language-and-copy — Translate learner pages and simplify product copy

- Status: **completed**
- Owner: coordinator; area: both
- Started: 2026-10-14T13:56:41.168Z
- Completed: 2026-10-14T19:34:32.162Z
- Task: [record](features/archive/FEAT-030-app-language-and-copy.md)
- Result: Completed shared English/Pidgin interface and full catalogue translations, simplified learner copy, added author metadata and deployed URL, and restricted README to current learning.
- Validation: 73 tests and production build pass; persisted language UI/catalogue/tab/modal checks and README author/link/scope validation passed.

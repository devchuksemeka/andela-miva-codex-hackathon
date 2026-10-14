# Shared project context

## Product

Learning Hub is a generic working name. Its goal is to connect useful learning to demonstrated skills, credible opportunities and earning. Courses and skills have many-to-many relationships. Existing work can demonstrate skills without taking a course. Evidence is self-reported; category membership never grants ability, and no job or earnings are promised.

## Current architecture

Next.js App Router, React, strict TypeScript, CSS, local JSON catalogues and Next.js API routes. lib/catalog.ts exposes data/courses.json, data/skills.json and data/opportunities.json. The frontend receives full courses and uses local helpers for matching/progress. All courses and API content are public. No authentication, email integration, database, environment files or seed steps are required. Optional AI résumé relevance selection uses server runtime credentials; local profile and résumé drafting need none.

Learning progress/evidence and preferences stay in localStorage. Light/dark mode uses device preference initially and persists a local selection. Service worker caches public shell/assets; course learning is local after loading. External resource/source links still require internet.

## Domain invariants

Lesson/course completion does not automatically demonstrate a skill. Practical evidence records skill, tool/context and a real example, explicitly self-reported. All opportunity requirement groups must be met; any listed alternative can meet its group. Tool restrictions need matching proof context. Skills combine across professions, such as development explanation and learner guidance contributing to tutoring.

## Limits

Course sources need review; opportunity data contains directories, not verified individual vacancies. Full Pidgin translation, audio, projection demo and peer verification remain incomplete. Production offline behaviour and broad accessibility/device testing still need validation.

## Engineering records

Use context/coding_standard.md (Frontend/Backend sections), context/TOOLS.md and context/features/INDEX.md. Feature records are Markdown with FEAT-XXX-task-name IDs. Backlog → active → archive; starting logs in_progress and completion records validation. scripts/task.mjs manages state. context/CHANGELOG.json generates context/CHANGELOG.md. Coordinator owns ledgers and integration.

FEAT-007 through FEAT-009 describe historical auth work removed by FEAT-011. Do not restore those requirements from archived records. Protected .agents guidance may mention old paths/database choices; AGENTS.md and this current context supersede them.

## Route pages

Overview `/`, catalogue `/courses`, earning pathways `/opportunities`, progress `/progress`, and course detail `/courses/:id` are route-based pages. URL drives navigation rather than a local tab state. Preserve local progress before navigation and theme preference across remounts.

## Progress and settings

Progress is a learner-specific list of started courses, not the course catalogue. An opened course is tracked locally; old lesson/completion/evidence records infer started status. Active courses and completed courses are separated. Settings at /settings owns privacy/export/install controls. The header profile destination is now /profile, which links back to Settings. FEAT-020 removes its demonstrated-skills panel and existing-work evidence form; existing saved evidence is preserved. All state stays local.

## Completion and practical learning

FEAT-014 connects completion to work via a modal and role-focused opportunity cards/detail pages. Lesson completion alone grants no skills. Task evidence updates actual matches; ready work is distinct from potential work. The user requested generated original course content with practical tool-specific scenarios; official references support learning but content review remains pending. The original concept remains the author’s.

## Opportunity readiness clarity

Work detail pages show ready/almost-there/build-towards status with covered and missing requirement counts. Earned/missing skill rows use distinct icons and labels, not colour alone. Course-task evidence names its source course; existing-experience evidence names its context. Finished lessons alone never mark a skill earned; missing evidence is stated explicitly.

## Almost-there eligibility

Ready requires demonstrated evidence for every requirement. Otherwise, single-requirement opportunities are Almost there even before learning. Multi-requirement opportunities are Almost there only after at least one relevant completed course or demonstrated requirement, regardless of remaining count. Course relevance respects explicit tool requirements; learning alone does not earn skills. The opportunities API accepts optional completed course IDs through `courses`.

## Progress as a learning-to-work journey

Progress shows personal learning activity, demonstrated-skill and ready-work counts as a three-stage journey. Ready pathways require all evidence and link to opportunity details. Next work connections are shown only with relevant learned or demonstrated requirements. Resume/finished lists contain started courses only, with practical evidence prompts where needed. Empty states explain a real next step without inventing progress or income.

## Language access

Header and Settings share English/Nigerian Pidgin controls and the persisted hub-lang preference; the sidebar no longer has language switching. Header controls remain available on narrow mobile layouts. Pidgin is a preview for selected interface labels, while course content remains mostly English.

## Portfolio, experience and résumé

FEAT-026 adds /profile and /resume. Profiles use learning-hub-profile localStorage, separate from original course progress. Independent projects link optionally to courses, transferable skills and work pathways; experience includes formal and informal work. Course links never grant completion or skills. Explicitly confirmed descriptions/contributions produce derived self-reported skill evidence with source provenance, rebuilt after edits/removal and never persisted into original course proofs. Profile and progress export together from Settings.

Résumé drafting chooses confirmed sources for a role or supplied job description, preserves learner facts, provides missing-information prompts, and supports edits/text download/browser print PDF. Optional consented OpenAI integration selects source IDs only; it never authors unverified factual claims. Provider input excludes structured name/email/location/headline/summary; users review source text which may itself contain personal information. No provider call without consent. Missing runtime credentials leaves factual local drafting available. Provider integration tests are mocked; live testing requires external configuration.

## Feature documentation location

All feature-specific context—including research, implementation plans, frontend/API agreements (contracts), data shapes, task breakdowns and validation—must live in the owning FEAT-XXX-task-name.md record under context/features/backlog, active or archive. Record shared agreements in the Research section and reference the owning feature record for cross-feature dependencies. Do not create a separate contracts folder or feature documents outside context/features. Shared project-wide standards and tool specifications remain directly under context/.

## Invention-sprint profile presentation (FEAT-029 supersedes FEAT-026 UI)

Profile is now a future-capacity preview, with Personal details, Projects, Experience and Résumés tabs. It does not expose live profile editing or résumé generation. Existing device profile data is preserved read-only and distinguished from future concepts. Build-my-résumé opens a reusable accessible preview modal describing planned AI-heavy generation from learner-approved courses, demonstrated skills, projects/experience, job requirements and additional context, then review and future saved versions. Résumés previews a planned archive for reopening/reusing past versions without fabricated history. /resume and opportunity résumé actions use the same preview framing. Earlier domain/local drafting/provider-selection code remains developmental; the planned full generation/library is not claimed as implemented.

# FEAT-026-profile-portfolio-resume: Connect learner portfolio and experience to tailored resumes

- **id:** FEAT-026-profile-portfolio-resume
- **title:** Connect learner portfolio and experience to tailored resumes
- **area:** both
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-14T12:57:13.507Z
- **started_at:** 2026-10-14T12:57:13.553Z
- **completed_at:** 2026-10-14T13:07:38.418Z
- **contract:** Shared agreement recorded in Research below
- **summary:** Added local profile projects experience evidence-linked work and tailored factual resumes with optional consented AI selection; updated author and setup README.
- **completion_validation:** 69 tests and production build pass; browser CRUD draft mobile verified; README links resolve. Live AI requires credentials; native export/print end-to-end not verified.

## Acceptance criteria

- [x] Local editable profile projects and experience link independently to courses skills and work; confirmed evidence supports matching; tailored editable resumes export with optional consented AI and factual local fallback

## Dependencies


## Files

- components/Hub.tsx
- components/ProfilePortfolio.tsx
- components/ResumeBuilder.tsx
- components/resume.css
- components/WorkReadiness.tsx
- app/profile/page.tsx
- app/resume/page.tsx
- app/api/resume/route.ts
- app/globals.css
- lib/portfolio.mjs
- lib/resume.mjs
- lib/work-readiness.mjs
- tests/portfolio.test.mjs
- tests/resume.test.mjs
- public/sw.js
- README.md
- context/PROJECT_CONTEXT.md
- context/TOOLS.md
- context/coding_standard.md

## Research

- Projects remain independent with optional course/skill/work links; confirmed contribution is self-reported evidence, course links never grant ability.
- Official OpenAI structured outputs https://developers.openai.com/api/docs/guides/structured-outputs reviewed2026-10-14. Optional Responses API selects reviewed IDs only with store:false; factual text assembled locally.
- No live provider key configured. No env files/auth/database introduced. README author Miracle Chukwuemeka Okafor devchuksemeka@gmail.com; hosted URL pending.
- Shared frontend/API agreement (consolidated from separate contract document):
- FEAT-026 profile, evidence and résumé contract
- Local key `learning-hub-profile`, version 1. Data stays browser-local. No auth/database/env files.
- Profile: `{version:1, fullName:string, email:string, headline:string, location:string, summary:string, projects:Project[], experience:Experience[]}`.
- Project: `{id,title,description,contribution,outcome,url,tool:string,courseIds:string[],skillIds:string[],opportunityIds:string[],confirmed:boolean}`.
- Experience: `{id,role,organization,type,startDate,endDate,description,contribution,outcome,tool:string,skillIds:string[],confirmed:boolean}`. type free text formal/freelance/volunteer/community; dates YYYY-MM or blank. Confirmation explicitly self-reported actual demonstrated linked skills. Course links never imply completion or skills. Project/experience need description and contribution for confirmation.
- `lib/portfolio.mjs`: `emptyProfile()` returns object; `normalizeProfile(input)` validates/sanitizes local data; `portfolioEvidence(profile)` returns `{earned:string[],proofs:[{skillId,tool,note,verification:'self-reported',sourceType:'project'|'experience',sourceId,sourceTitle,courseId?:string}]}` from confirmed records; `mergePortfolioEvidence(progress,profile)` returns progress with combined earned/proofs (no persistence into original course proof store). Exact tool context retained. Edits/deletion revoke derived evidence only.
- `lib/resume.mjs`: `buildResume({profile,progress,target,jobDescription,selectedProjectIds,selectedExperienceIds},courses,abilities,opportunities)` returns `{text:string,questions:string[],sources:[{type,id,title}],mode:'local'}`. target is opportunity ID or custom role title. Match target requirements/keywords, no fabricated facts, unconfirmed records excluded; include real completed courses labelled learning not qualification. selection defaults all confirmed. Export plain text and print-to-PDF user browser. AI can only choose/reorder source IDs, never generate factual claims, use assembled local text after selection.
- `GET /api/resume` → `{aiAvailable:boolean}` no secrets. `POST /api/resume` accepts same buildResume input plus `consent:true`, uses optional server runtime OPENAI_API_KEY + OPENAI_MODEL (no env files). Requires affirmative consent before external call. Returns same shape mode:'ai' if AI selected relevant source IDs; missing config503, invalid400, provider502/504; UI keeps local draft available. Never send name/email/location to provider; send target/job description and reviewed selected source descriptions/skill IDs only. JSON input body cap64KB and field/array limits. store:false. No request logging or persistence.
- Frontend profile component owns profile record storage, reusable controlled data props for QA; Hub reads profile when mounted, combines derived evidence with course progress for matching and skill provenance. New /profile and /resume routes use Hub shell. Header avatar goes /profile; Settings remains accessible via explicit profile link. Opportunity details link /resume?opportunity=ID; project cards link courses, skills via /courses?skill=ID or explicit existing course links, work optional. Hub owns routing integration; coordinator edits Hub and WorkReadiness while profile UI agent owns new components/routes/CSS. No fabricated learner records during QA.
- Résumé local assembly also includes existing non-portfolio practical skill evidence from progress (known skill IDs, real nonblank notes and tool context). Unselected project/experience derived proofs never leak into the draft. AI selection/disclosure remains strictly selected project/experience sources; course/practice records do not enter provider input.

## Blockers


## Validation

- 69 automated tests and production build pass;44 static pages, profile/resume routes present and temporary QA route absent.
- Browser actual profile/resume navigation and opportunity target selection verified. Controlled temporary sample fixture verified project edit, remove/undo, independent course and skill links without work links, source records flowing into local draft; fixture removed before final build.
- Mobile390px profile/resume scrollWidth390, light/dark visually checked and restored. User profile/progress untouched.
- README local links resolve. No .env or .env.example files. AI consent, reduced payload, source ID validation, errors and provider responses tested using stubs; no live provider call.
- Text export browser download event timed out; export/print controls implemented but native download/print end-to-end not verified.

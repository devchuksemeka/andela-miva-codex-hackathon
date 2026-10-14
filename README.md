# Learning Hub

**A hackathon proof of concept by Miracle Chukwuemeka Okafor**  
**Email:** [devchuksemeka@gmail.com](mailto:devchuksemeka@gmail.com)

Learning Hub connects practical courses, demonstrated skills, projects and work experience to earning pathways. The working learning-to-opportunity journey is accompanied by a future-capacity preview: a contextual profile and AI-generated résumés built around the learner’s own evidence. The original product concept is the author's; AI software development tools assisted implementation.

**Live website:** Vercel deployment pending. The hosted link will be added here when the author shares it.

## Read about the project

- [Product brief](PRODUCT_BRIEF.md) — the problem, intended learners and product direction.
- [Capstone specification](context/CAPSTONE_SPEC.md) — challenge tracks, operating constraints and proof-of-concept scope.

## Setup and getting started

Install Node.js **20.9 or later** and npm, then from the project directory run:

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). No account, database, email service or environment file is needed. Courses, local learning progress and future-capacity previews work without external credentials.

1. Browse or search **Courses** by tool, topic or skill; category filters work together with search.
2. Open a course, complete lessons and practise its task. Finishing lessons records learning, not skill proficiency.
3. Open **My profile** from the top-right avatar menu to explore the planned personal context, independent projects, work experience and résumé library.
4. Click **Build my résumé** to open a future-capacity modal explaining the planned AI-heavy generation flow. It would use completed courses, demonstrated skills, projects, experience, job requirements and additional learner-provided context, with review before sharing.
5. Explore **Opportunities** and **My progress** to see supported work, missing requirements and relevant next steps in the working proof of concept.
6. The profile’s **Résumés** tab previews a future library of previously generated versions for reopening, editing, downloading and reuse. No résumé history is fabricated and live generation is not exposed in the sprint demo.

Settings is accessible from the avatar menu and includes language, privacy and export controls. English and a partial Nigerian Pidgin interface preview are supported; lessons remain mostly English. Light/dark preference persists locally. Existing local profile records from earlier prototype work are preserved and shown as read-only device data, separate from planned capacity. Projects are intended to link independently to courses, skills and optionally opportunities; course links do not grant skills or completion.

## Future AI résumé generation

This invention-sprint interface previews an AI-heavy workflow that would assemble relevant learner context, generate a tailored CV, let the learner review/edit it, and save role-specific versions to a résumé library. It is presented as upcoming capacity, not a launched résumé service. Planned generation would never invent employment, dates, qualifications, metrics or proficiency; missing facts would become learner questions.

Earlier implementation code for local factual drafting and optional AI **source selection** is retained for development, but is no longer exposed by the `/resume` preview page. The source-selection API is not the full future generative résumé system or a saved-résumé library.

For that development integration only, server runtime `OPENAI_API_KEY` and optional `OPENAI_MODEL` enable consented source selection. Never use a `NEXT_PUBLIC_` key. No `.env` or `.env.example` files are part of this project. It uses the [OpenAI Responses API structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), with `store: false`, and sends reviewed source descriptions rather than structured contact fields. No AI request is made by the future-capacity modal. Provider tests are mocked; a successful live call requires configured credentials and separate verification.

## Technology and data

Next.js App Router and API routes, React, strict TypeScript, Lucide icons, CSS and bundled JSON. There is no database, authentication or email integration.

- `data/courses.json`: original practical courses and credible supporting references.
- `data/skills.json`: transferable atomic skills.
- `data/opportunities.json`: illustrative work pathways and external directories.
- `learning-hub`: browser-local course progress and practical evidence.
- `learning-hub-profile`: browser-local personal details, projects and experience.

Confirmed projects and experience supply derived self-reported skill evidence. Editing or removing them updates matches without deleting unrelated course-task evidence. Every opportunity requirement must be covered to be ready, including explicit tool restrictions. Otherwise, a single-requirement pathway is Almost there; a multi-requirement pathway needs at least one relevant completed course or demonstrated requirement to be Almost there.

## Pages and API

Pages: `/`, `/courses`, `/courses/:id`, `/opportunities`, `/opportunities/:id`, `/progress`, `/profile`, `/resume`, `/settings`.

Public catalogue routes:

- `GET /api/courses`, `/api/courses/:id`, `/api/courses/:id/lessons`
- `GET /api/skills`, `/api/skills/:id`, `/api/skills/:id/lessons`
- `GET /api/opportunities?skills=clip-sequencing&courses=capcut-trim`
- `GET /api/match` — same catalogue matching endpoint
- `POST /api/progress` — acknowledges browser-local progress, retains no personal data remotely
- `GET /api/resume` — reports optional AI availability
- `POST /api/resume` — explicit-consent AI source selection; no server-side profile storage

Tool-specific evidence matching is performed in the browser. GET matching accepts skill and completed-course IDs, without private proof descriptions.

## Validation and production build

```sh
npm test
npm run build
npm start
```

Development output is `.next-dev`; production output is `.next`. No lint script is configured. API provider tests use mocked responses; they do not establish live model availability.

## Offline, privacy and proof-of-concept limits

The PWA caches the shell and loaded same-origin assets. After online loading and service-worker activation, local course learning and the profile/résumé previews use bundled data and browser storage. External references, opportunity directories and AI requests require internet. HTTPS or localhost is required. Broad production offline/device validation remains pending.

Export profile/progress from Settings before clearing browser data: clearing storage removes local records. A future résumé library is planned; it is not a current archive. No account sync or profile-sharing URL is provided. Do not include confidential client information in projects or experience.

Learning content is original AI-assisted practice with official reference links, not vendor certification; human subject review remains pending. Opportunity examples are directories rather than verified individual vacancies. Skill coverage is self-reported, and no job, client or earnings are guaranteed. AI-generated selection and any edited résumé must be checked by the learner before use.

## Engineering coordination

[AGENTS.md](AGENTS.md) and [context/README.md](context/README.md) link the project workflow, single frontend/backend coding standard, tools and feature history. Feature records use `FEAT-XXX-task-name.md` under `context/features/{backlog,active,archive}`. Starting work logs `in_progress`; completed work updates [the changelog](context/CHANGELOG.md) and is archived. Historical authentication/database work was removed and does not describe current requirements.

## Author and contact

**Miracle Chukwuemeka Okafor**  
[devchuksemeka@gmail.com](mailto:devchuksemeka@gmail.com)

Use this full name and email to identify the author on the Codex Accelerator hackathon website. Vercel URL: **pending deployment — to be supplied by the author**.

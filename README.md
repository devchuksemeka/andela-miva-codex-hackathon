# Learning Hub

**By Miracle Chukwuemeka Okafor**  
**Email:** [devchuksemeka@gmail.com](mailto:devchuksemeka@gmail.com)

Learning Hub helps learners find practical courses, build skills and see the types of work those skills can support. Built for learners across Africa, it keeps learning easy to follow and useful on limited mobile data.

**Live app:** [andela-miva-codex-hackathon.vercel.app](https://andela-miva-codex-hackathon.vercel.app/)

## Learn more

- [Product brief](PRODUCT_BRIEF.md) — who Learning Hub serves and the problem it addresses.
- [Capstone specification](context/CAPSTONE_SPEC.md) — challenge tracks, scope and operating constraints.

## Setup

Requires **Node.js 20.9 or later** and npm.

From the repository directory:

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

No account, database, email service, API key or environment file is needed for the learning app.

## Get started

1. Open **Courses** and search by course name, tool or skill. Search works together with category filters.
2. Choose a course, read the lessons and try the practical task.
3. Describe a real example of what you did to record the skills you can demonstrate. Completing lessons alone does not prove proficiency.
4. Open **Opportunities** to see work that uses those skills, the requirements still missing and useful courses to take next.
5. Use **My progress** to continue courses you started and see how your learning connects to work.

English and Nigerian Pidgin are available through the header language menu or Settings. The choice applies to the interface, course lessons, skills and work descriptions. Linked external websites may use another language. Light/dark mode and language preferences are saved on the device.

## How it works

Courses can develop several transferable skills. Different tools can develop the same skill—for example, both CapCut and Premiere Pro can support video editing. Skills can combine to support different types of work.

A work pathway is **Ready now** when the learner has recorded every required skill, including any required tool. Otherwise, a pathway with one requirement is **Almost there**. A pathway with multiple requirements becomes **Almost there** after a relevant course is completed or at least one required skill is demonstrated.

Skill evidence is self-reported. Opportunity examples link to work directories, rather than confirmed individual vacancies. Learners should check each listing’s requirements before applying. Jobs, clients and earnings are not guaranteed.

## Technology and content

- Next.js App Router and API routes
- React, strict TypeScript, Lucide icons and CSS
- Bundled JSON catalogues and browser-local progress
- PWA service worker for caching the app and pages already loaded

Catalogue files:

- `data/courses.json`: practical lessons and supporting references
- `data/skills.json`: transferable skills
- `data/opportunities.json`: work examples and source directories
- `data/locales/`: Nigerian Pidgin translations

IDs, tools, source links and skill relationships remain consistent across languages. Code examples and quoted practice materials retain their original wording where needed. Learning material is original practice content with reference links, not provider certification; subject and translation review remains ongoing.

## Public catalogue API

- `GET /api/courses`
- `GET /api/courses/:id`
- `GET /api/courses/:id/lessons`
- `GET /api/skills`
- `GET /api/skills/:id`
- `GET /api/skills/:id/lessons`
- `GET /api/opportunities?skills=clip-sequencing&courses=capcut-trim`
- `GET /api/match` — same catalogue matching endpoint
- `POST /api/progress` — acknowledges local progress; does not store it on the server

Catalogue endpoints require no credentials. The browser uses recorded evidence for tool-specific matching.

## Privacy and offline access

Learning progress stays in the current browser and is not synced to an account. Download a copy from Settings before clearing browser data. Avoid putting private client information in work descriptions. External sites have their own privacy policies.

After opening pages online and activating the service worker, cached pages and bundled learning material can be used with unreliable internet. External references and work directories still require a connection. HTTPS or localhost is required for PWA features. Broader offline and device testing remains ongoing.

## Checks and production build

```sh
npm test
npm run build
npm start
```

Development output is `.next-dev`; production output is `.next`. No lint script is configured.

## Development workflow

[AGENTS.md](AGENTS.md) and [context/README.md](context/README.md) describe coding standards, tools and feature tracking. All feature-specific documentation lives under `context/features` in Markdown records named `FEAT-XXX-task-name.md`. Started work is recorded as `in_progress`; completed work is logged and archived.

## Author

**Miracle Chukwuemeka Okafor**  
[devchuksemeka@gmail.com](mailto:devchuksemeka@gmail.com)

Use this name and email to identify the author on the Codex Accelerator hackathon website. The product concept is the author’s; AI tools assisted software development.

# Coding standard

Use [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) and [TOOLS.md](TOOLS.md) for current architecture. The application is standalone: no authentication, email, database or environment configuration. Historical archived feature instructions do not override the current scope.

## Frontend

### Structure and types

Use Next.js App Router with server components by default and client components for interaction/browser APIs. Keep explicit props/state types, strict TypeScript and immutable updates. Read storage/navigator after mount and avoid hydration differences. Use existing CSS and Lucide icons; prefer readable functions without unrelated rewrites.

Full course JSON is passed to Hub for local opening/completion without network or account checks. Domain matching and progress stay in lib/matching.mjs and lib/progress.mjs. Preserve local progress across changes; report storage/parsing failures meaningfully. Catalogue edits must remain consistent with API content.

### Learner experience and inclusion

Course completion records learning, not skill proficiency. Evidence stays self-reported, with its example and tool/context. Existing work can demonstrate skills without courses. Explain opportunity matches, gaps and useful next steps without promising work/income. Directory listings must remain labelled.

Use semantic headings, labelled fields, buttons/links and visible focus. Check keyboard access, touch targets, contrast, zoom and mobile overflow. Dialogs need appropriate focus handling. Respect reduced motion and do not communicate state by colour alone.

### Theme, offline and privacy

Use root data-theme with persistent local light/dark preference and initial system preference. Check cards, forms, lessons, alerts and navigation in both themes. LocalStorage holds progress/evidence/preferences; no account or server sync is implied.

Course opening and completion must work from loaded local content without fetch, email or session checks. Coordinate service-worker cache updates; test production offline refresh, opened lessons, progress persistence and reconnection. External source websites remain online-only. Do not fabricate user evidence during UI QA.

### Verification and handoff

Run appropriate tests and production build. Browser validation is required for claims about interactions/offline behaviour, not inferred from compilation. Report edited files, actual checks and remaining limits; coordinator manages feature records and changelog.

## Backend

### Catalogue and API

Next.js route handlers expose local JSON via lib/catalog.ts. Do not introduce database, authentication, SMTP, credentials or environment requirements unless a later user request changes scope. There are no seed/setup commands.

Keep IDs stable and validate course outcomes and opportunity references. Courses can develop several skills and skills can support several types of work. All course/lesson endpoints are public and must work with no configuration. Unknown IDs return JSON errors and 404. Validate malformed input at route boundaries. POST /api/progress acknowledges local progress only; do not imply server persistence.

Agree request/response/errors and migration compatibility before cross-layer changes. Keep shared modules and catalogue files under one owner during parallel work.

### Domain and credibility

Lesson completion does not grant proficiency. Practical evidence requires a nonblank example; existing experience is valid without mandatory courses. Every opportunity requirement must be met, alternatives satisfy only their group, and explicit tool constraints require corresponding evidence. Category membership grants no ability.

Use credible original source links. Current learning content is original short practice guidance, not provider-certified curricula; opportunities are directories with illustrative requirements. Verification dates must represent actual checks. Never invent jobs, pay or credentials.

### Verification and handoff

Test public routes without credentials/configuration, full content retrieval, invalid/missing IDs and changed matching/progress invariants. npm test and npm run build are configured; no lint script exists. Report actual results and limitations. Do not modify shared feature/changelog records concurrently; coordinator owns lifecycle transitions.

### Page navigation

Use Next.js App Router pages and Link for primary navigation. URL is the page source of truth; support direct loads, refresh and back/forward. Preserve local progress before navigating after a completion, and keep active navigation aria-current accurate. Unknown course IDs should use notFound().

## Portfolio and optional AI résumé selection

Keep profile records local in a separate versioned store. Derive project/experience skill evidence only from explicit confirmed records with description and contribution. Do not persist derived proofs into original progress; edits/deletion must revoke derived evidence without removing course proofs. Projects can link courses, skills and work independently. Validate external links as HTTP(S) and preserve actual tool context.

Résumé drafts contain recorded facts only, with completed courses labelled learning. Optional AI may select/reorder reviewed source IDs, never generate factual achievements. Require explicit consent before provider calls; display the exact reduced payload and omit structured contacts. Server-only runtime credentials are optional; do not create .env files. Bound inputs, validate selected source IDs, use store:false, timeouts, no personal-data logging and no server profile persistence. Keep local draft functional without internet/credentials.

### Language and learner copy

Translate all visible shared page text, tabs, menus, form labels, placeholders, counts, statuses and accessible names through the shared language context. Translate catalogue learning text with bundled locale overlays; preserve IDs, tool names, relationships, source links, code and quoted examples. User-entered records stay as written. Write short, concrete learner-facing copy. Never copy internal planning or hackathon terms into the interface: use Coming soon for unavailable features, not invention sprint preview or future capacity. Keep development explanations in context/features.

# Project agent instructions

For feature research, implementation, fixes and coordinated frontend/API work, use `.agents/skills/feature-coordination/SKILL.md`. Read `context/PROJECT_CONTEXT.md` and `context/TOOLS.md` first, then the relevant role and standards. Documentation-only work may be handled directly, with the same task lifecycle when it is tracked.

The coordinator owns task state, changelog writes, shared API contracts and integration. Delegate frontend-only work to the frontend developer, API/data/domain work to the backend developer. For work spanning both, agree the contract first and split file ownership. Do not assign the same mutable file to concurrent agents. Shared task identifiers tie the work together.

Agent definitions: `.agents/roles/frontend-developer.md` and `.agents/roles/backend-developer.md`. Instantiate these roles with the collaboration agent tools when relevant; these files do not create persistent background agents. Use existing agents where available. Agent assignments inherit the user's authorized scope; no automatic publishing, messaging, or database mutation beyond that scope.

Preserve the product goal: courses build transferable skills; demonstrated skills connect learners to credible earning opportunities. Course completion is not proof of skill. Existing work can provide self-reported evidence. Never invent jobs, pay or verification.

Use `scripts/task.mjs` to manage tracked work. Start moves backlog to active and adds an `in_progress` changelog entry; complete updates that entry and archives the task. Do not mark work completed while required checks or acceptance criteria remain unresolved. Keep standards and tools current when implementation decisions change them.

Orchestration records now live exclusively under context/. The protected .agents skill and role files still contain legacy docs/engineering paths pending an approved update. Resolve their context/standards/tools references using context/PROJECT_CONTEXT.md, context/TOOLS.md, context/coding_standard.md (Frontend and Backend sections); use context/features for task records and context/CHANGELOG.json and .md for history. Do not recreate docs/ or tasks/.

All feature context records must be Markdown (.md), including backlog, active and archive records. Edit acceptance checkboxes and Research/Validation sections as Markdown. scripts/task.mjs enforces this format; never create JSON feature records. This overrides legacy format instructions in the protected coordination skill.

Feature record IDs and filenames must follow FEAT-{XXX}-{task-name}, e.g. FEAT-005-course-filter.md. XXX is a unique three-digit number across backlog, active and archive; task-name is a lowercase hyphenated slug. Pass the entire ID to lifecycle commands. This naming rule supersedes older task ID examples in protected skill files.

Coding standards live in the single context/coding_standard.md file, segmented into Frontend and Backend sections. Do not recreate a coding_standard folder. This supersedes legacy per-role standards paths.

Current standalone scope (FEAT-011): remove authentication, email and database integrations. Every course is publicly available from local JSON with browser-local progress. No .env or .env.example, database seed/setup, SMTP or registration requirements. Current context/coding_standard.md supersedes legacy database/auth advice in protected role files and archived records.

Feature documentation location: All feature-specific context—including research, implementation plans, frontend/API agreements (contracts), data shapes, task breakdowns and validation—must live in the owning FEAT-XXX-task-name.md record under context/features/backlog, active or archive. Record shared agreements in the Research section and reference the owning feature record for cross-feature dependencies. Do not create a separate contracts folder or feature documents outside context/features. Shared project-wide standards and tool specifications remain directly under context/.

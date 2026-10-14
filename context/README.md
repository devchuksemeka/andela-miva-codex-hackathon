# Project orchestration context

- [Project context](PROJECT_CONTEXT.md)
- [Tool specifications](TOOLS.md)
- [Frontend coding standard](coding_standard.md#frontend)
- [Backend coding standard](coding_standard.md#backend)
- [Feature index](features/INDEX.md)
- [Changelog](CHANGELOG.md)

Feature records move from features/backlog → features/active → features/archive using scripts/task.mjs. Starting work adds an in_progress changelog entry; completion updates history and archives the record.

Protected agent definitions and skill remain under .agents pending approval to update them. AGENTS.md records the current path mapping. Do not recreate the removed docs or tasks folders.

Feature records are Markdown only. Each contains metadata, acceptance checkboxes, dependencies, files, research, blockers and validation sections. Use the task helper for state transitions.

Feature filenames: `FEAT-{XXX}-{task-name}.md`, for example `FEAT-006-course-filter.md`. Use a unique three-digit number and a lowercase hyphenated task name. Pass the full stem as the task ID for create/start/complete. The folder index is navigation, not a feature record.

All feature-specific context—including research, implementation plans, frontend/API agreements (contracts), data shapes, task breakdowns and validation—must live in the owning FEAT-XXX-task-name.md record under context/features/backlog, active or archive. Record shared agreements in the Research section and reference the owning feature record for cross-feature dependencies. Do not create a separate contracts folder or feature documents outside context/features. Shared project-wide standards and tool specifications remain directly under context/.

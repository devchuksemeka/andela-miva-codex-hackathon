# FEAT-003-context-consolidation: Consolidate orchestration into context folder

- **id:** FEAT-003-context-consolidation
- **title:** Consolidate orchestration into context folder
- **area:** coordination
- **owner:** coordinator
- **status:** in_progress
- **created_at:** 2026-10-13T16:57:34.432Z
- **started_at:** 2026-10-13T16:57:34.484Z

## Acceptance criteria

- [ ] All orchestration context and feature lifecycle records use context with docs and tasks removed

## Dependencies


## Files

- context/
- AGENTS.md
- README.md
- scripts/task.mjs
- tests/task-workflow.test.mjs

## Research


## Blockers

- Protected .agents role move and skill-reference update rejected by user approval; files remain unchanged.

## Validation

- npm test: all 19 tests pass with context-based lifecycle paths.
- Confirmed docs/ and tasks/ absent; context index and changelog links resolve.

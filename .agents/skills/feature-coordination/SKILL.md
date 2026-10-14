---
name: feature-coordination
description: Research and deliver Learning Hub features by splitting frontend, API and shared work across developer agents, maintaining project standards, task state and changelog history.
---

# Feature coordination

Use for project feature planning, research, implementation and fixes involving frontend/API responsibilities. Keep the product goal visible: connect learning to demonstrated skills, credible opportunities and earning. Respect the requested scope.

## Research and context

Read repository AGENTS.md, docs/engineering/context.md, docs/engineering/tools.md and relevant history in docs/engineering/features.md. Inspect current code and contracts. Research uncertain or current facts using authoritative sources; record URLs, review dates, findings and implementation implications in the task research field. Distinguish facts, assumptions and unverified opportunity examples. Track substantive research as work, not an unrecorded prelude.

## Breakdown and assignment

Create tasks with `node scripts/task.mjs create ID --title "Title" --area frontend|backend|both|coordination --owner ROLE --acceptance "Observable result"`. Add research, dependencies, file ownership and contract references to the backlog JSON before starting.

- Frontend: read `.agents/roles/frontend-developer.md` and docs/engineering/frontend-standards.md; delegate UI, interaction, accessibility and browser display state.
- Backend: read `.agents/roles/backend-developer.md` and docs/engineering/backend-standards.md; delegate handlers, database/seeds and domain rules.
- Both: coordinator first agrees request/response/error shapes, validation, migration compatibility and data semantics; record a durable contract under docs/engineering/contracts/ when useful. Create linked frontend/backend tasks with dependencies and disjoint file ownership. Give shared files a single owner.

Spawn or reuse collaboration agents with the appropriate role instructions. Supply task ID, purpose, acceptance, allowed files, dependencies, contract and validation expectations. Delegate independent work in parallel; sequence changes dependent on unresolved contracts. Never have concurrent agents edit the same file or shared task/changelog ledger. Agent definitions are reusable instructions; live agents are session-scoped, not background services. This workflow does not authorize external messages or publishing.

## Lifecycle

The coordinator alone updates task state and shared history.

1. Create backlog tasks. Immediately before research/coding, `node scripts/task.mjs start ID`: move backlog → active and add CHANGELOG.json status `in_progress`; regenerate CHANGELOG.md. Check dependencies first.
2. Keep findings, changed files, blockers and validation on the active task. Specialists report these to the coordinator. Blocked work stays in_progress with a blocker; do not pretend it is complete.
3. Integrate and review agent results against acceptance. Cross-layer changes must be checked across the API/UI contract. Run relevant tests and production build for application edits. Claim browser, database or offline validation only if exercised. Documentation/workflow changes use appropriate link, script and behavioural checks.
4. Check acceptance items, resolve blockers and record validation evidence. `node scripts/task.mjs complete ID --summary "Result" --validation "Checks and results"`: mark changelog completed and archive task. Use `--not-applicable` only where executable validation genuinely does not apply, explaining why.
5. Update docs/engineering/features.md and standards, tools or context when decisions change. Report delivered behaviour, checks and limitations.

CHANGELOG.json is canonical; CHANGELOG.md is generated. Completed task details remain in tasks/archive; backlog remains the future queue. Use the helper serially. Do not fabricate historical dates or checks: older features are explicitly labelled as predating this workflow.

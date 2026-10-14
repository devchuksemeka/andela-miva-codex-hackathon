# FEAT-027-feature-context-consistency: Keep all feature documentation inside feature records

- **id:** FEAT-027-feature-context-consistency
- **title:** Keep all feature documentation inside feature records
- **area:** coordination
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-14T13:29:16.238Z
- **started_at:** 2026-10-14T13:29:16.276Z
- **completed_at:** 2026-10-14T13:29:40.718Z
- **summary:** Consolidated shared agreements into feature records and documented all feature context must stay inside features.
- **completion_validation:** 5 workflow tests pass; contract content roundtrip verified, removed folder and stale paths checked.

## Acceptance criteria

- [x] Shared feature agreements live in feature Markdown records; contracts folder removed and project context documents the rule

## Dependencies


## Files

- AGENTS.md
- context/PROJECT_CONTEXT.md
- context/README.md
- context/features/archive/FEAT-014-learning-to-work.md
- context/features/archive/FEAT-026-profile-portfolio-resume.md
- context/features/archive/FEAT-007-learner-auth-api.md
- context/features/archive/FEAT-008-learner-auth-interface.md
- context/features/archive/FEAT-009-course-auth-access.md
- context/features/archive/FEAT-010-light-dark-theme.md

## Research


## Blockers


## Validation

- 5 workflow tests pass. Shared agreements preserved under Research and survive Markdown helper roundtrip. Separate contracts folder removed; no stale contract path references remain.

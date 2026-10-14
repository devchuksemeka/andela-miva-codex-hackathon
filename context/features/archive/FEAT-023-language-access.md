# FEAT-023-language-access: Move language controls to header and Settings

- **id:** FEAT-023-language-access
- **title:** Move language controls to header and Settings
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:16:47.323Z
- **started_at:** 2026-10-14T10:16:47.363Z
- **completed_at:** 2026-10-14T10:19:04.678Z
- **summary:** Moved language selection to desktop/mobile header and Settings with shared saved preference.
- **completion_validation:** 53 tests TypeScript build pass; browser sync persistence and320px layout verified.

## Acceptance criteria

- [x] Header and Settings offer synchronized language controls on desktop/mobile; sidebar has no language control

## Dependencies


## Files

- components/LanguageSelect.tsx
- components/Hub.tsx
- app/globals.css
- public/sw.js
- context/PROJECT_CONTEXT.md

## Research

- Expose existing English/Nigerian Pidgin preference in header and Settings using synchronized accessible controls. Pidgin coverage is partial; avoid implying translated lessons. Verify narrow mobile header, persistence and removal from sidebar.

## Blockers


## Validation

- 53 tests TypeScript and production build pass.
- Browser verified Settings/header synchronization, Pidgin persistence after refresh, sidebar removal; restored English.
- 320px mobile header and scrollWidth320,44px select visible with theme/profile; viewport restored.

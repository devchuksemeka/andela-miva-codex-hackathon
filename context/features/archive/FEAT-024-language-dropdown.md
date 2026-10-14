# FEAT-024-language-dropdown: Polish header language dropdown and sidebar

- **id:** FEAT-024-language-dropdown
- **title:** Polish header language dropdown and sidebar
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:29:38.104Z
- **started_at:** 2026-10-14T10:29:38.171Z
- **completed_at:** 2026-10-14T10:32:22.225Z
- **summary:** Polished header language menu with keyboard access and removed obsolete sidebar divider.
- **completion_validation:** 53 tests TypeScript production build pass; keyboard/outside/mobile browser verified.

## Acceptance criteria

- [x] Header language uses accessible custom dropdown menu; sidebar has no obsolete divider

## Dependencies


## Files

- components/LanguageSelect.tsx
- app/globals.css
- public/sw.js

## Research

- Custom language menu must retain native-equivalent keyboard access, selected state and outside dismissal. Settings retains native selector. Remove only obsolete sidebar user divider, preserving separation via spacing.

## Blockers


## Validation

- 53 tests and TypeScript pass.
- Browser verified ArrowDown open, End/Enter selection, Escape focus restoration, outside-click dismissal and Settings synchronization.
- At320px menu bounds12–272 and document width320; English and viewport restored. Sidebar user divider removed.

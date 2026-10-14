# FEAT-028-avatar-menu: Add avatar menu for profile and settings

- **id:** FEAT-028-avatar-menu
- **title:** Add avatar menu for profile and settings
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T13:33:24.265Z
- **started_at:** 2026-10-14T13:33:24.315Z
- **completed_at:** 2026-10-14T13:36:06.318Z
- **summary:** Added accessible avatar dropdown linking My profile and Settings.
- **completion_validation:** 69 tests TypeScript build pass; keyboard navigation dismissal and320px browser checks pass.

## Acceptance criteria

- [x] Header avatar opens accessible profile/settings dropdown on desktop/mobile

## Dependencies


## Files

- components/AvatarMenu.tsx
- components/Hub.tsx
- app/globals.css
- public/sw.js

## Research

- Replace direct avatar navigation with a menu containing profile and Settings destinations. Retain explicit accessible name, keyboard movement/Escape, outside dismissal, actual initials, and viewport-clamped position.

## Blockers


## Validation

- 69 tests TypeScript and production build pass.
- Browser verified ArrowDown/End/Enter navigation to Settings, Escape restores avatar focus and outside focus dismisses menu.320px mobile menu within28–308px, scrollWidth320; viewport restored.

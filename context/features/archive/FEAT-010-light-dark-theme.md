# FEAT-010-light-dark-theme: Add persistent light and dark mode

- **id:** FEAT-010-light-dark-theme
- **title:** Add persistent light and dark mode
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-13T17:32:54.952Z
- **started_at:** 2026-10-13T17:32:54.991Z
- **completed_at:** 2026-10-13T17:38:14.457Z
- **contract:** Historical agreement no longer retained; auth was removed by FEAT-011
- **summary:** Added persistent light and dark themes with system default and accessible toggle
- **completion_validation:** Build passes; browser toggles, reload persistence and dark surfaces verified

## Acceptance criteria

- [x] Accessible light dark switch persists preference and covers all app screens

## Dependencies


## Files

- components/ThemeToggle.tsx
- app/layout.tsx
- app/globals.css

## Research

- Repository inspection: course JSON was bundled in the client and catalogue routes exposed lesson bodies. Protect both payload delivery and interface entry.

## Blockers


## Validation

- Production build passes.
- Browser toggled dark and light; dark preference persists across reload; auth dialog and statistics surfaces reviewed.
- System preference used initially; manual choice saved in hub-theme.

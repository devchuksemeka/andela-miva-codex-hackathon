# FEAT-021-settings-navigation: Remove Settings from sidebar and footer navigation

- **id:** FEAT-021-settings-navigation
- **title:** Remove Settings from sidebar and footer navigation
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T10:07:31.414Z
- **started_at:** 2026-10-14T10:07:31.451Z
- **completed_at:** 2026-10-14T10:08:17.074Z
- **summary:** Removed Settings from sidebar and bottom navigation; preserved profile access.
- **completion_validation:** Production build passed; browser verified sidebar and profile link.

## Acceptance criteria

- [x] Settings is absent from sidebar/footer; top-right profile still opens Settings

## Dependencies


## Files

- components/Hub.tsx
- public/sw.js

## Research


## Blockers


## Validation

- Production build passed.
- Browser verifies sidebar has four primary links and top-right Open settings still targets /settings; shared mobile navigation excludes Settings.

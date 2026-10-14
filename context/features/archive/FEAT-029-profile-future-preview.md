# FEAT-029-profile-future-preview: Present profile and AI resume as future invention capacity

- **id:** FEAT-029-profile-future-preview
- **title:** Present profile and AI resume as future invention capacity
- **area:** frontend
- **owner:** frontend-developer
- **status:** completed
- **created_at:** 2026-10-14T13:41:40.031Z
- **started_at:** 2026-10-14T13:41:40.082Z
- **completed_at:** 2026-10-14T13:48:48.259Z
- **summary:** Presented profile as future capacity with contextual AI résumé glimpse modal and planned reusable résumé library tab.
- **completion_validation:** 69 tests build pass; browser tab/modal keyboard390px dark checks pass; no data writes or AI calls.

## Acceptance criteria

- [x] Profile clearly previews future capacity; build resume opens accessible polished AI-context modal; Resumes tab explains future saved versions without fake history

## Dependencies


## Files

- components/ProfilePortfolio.tsx
- components/ResumePreviewModal.tsx
- components/Hub.tsx
- app/resume/page.tsx
- app/globals.css
- public/sw.js
- README.md
- context/PROJECT_CONTEXT.md

## Research

- Present future capacity explicitly in invention-sprint UI. Preserve existing profile data read-only; no live edit/generate controls or fabricated saved résumé history.
- Reusable onClose/targetTitle modal presents planned AI-heavy contextual generation, learner review and reusable future archive; no external requests. Existing domain provider selection is a developmental prototype, distinct from future generative résumé/library.

## Blockers


## Validation

- 69 tests and production build pass. README links resolve.
- Browser verified Résumés tab future archive content, Build my résumé opens modal, ShiftTab/Tab trap and Escape restores trigger, contextual /resume?opportunity=1 uses same preview.
- 390px mobile dialog12–378 and document width390, scroll locked; dark mode visually checked and restored. No storage changes or AI requests.
- Prior live editing/generation controls no longer exposed in Profile/Hub; preserved prototype/domain code and existing local data. All context remains in owning feature record.

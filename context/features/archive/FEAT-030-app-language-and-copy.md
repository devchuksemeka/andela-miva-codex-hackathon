# FEAT-030-app-language-and-copy: Translate learner pages and simplify product copy

- **id:** FEAT-030-app-language-and-copy
- **title:** Translate learner pages and simplify product copy
- **area:** both
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-14T13:56:41.119Z
- **started_at:** 2026-10-14T13:56:41.168Z
- **completed_at:** 2026-10-14T19:34:32.162Z
- **summary:** Completed shared English/Pidgin interface and full catalogue translations, simplified learner copy, added author metadata and deployed URL, and restricted README to current learning.
- **completion_validation:** 73 tests and production build pass; persisted language UI/catalogue/tab/modal checks and README author/link/scope validation passed.

## Acceptance criteria

- [x] Language choice translates visible app pages including profile tabs and resume modal; learner copy uses plain language and no development framing
- [x] package.json identifies Miracle Chukwuemeka Okafor and devchuksemeka@gmail.com as author
- [x] README links deployed Vercel app and contains no future résumé/profile/project/experience feature references

## Dependencies


## Files

- components/I18nProvider.tsx
- components/Hub.tsx
- components/ProfilePortfolio.tsx
- components/ResumePreviewModal.tsx
- components/ProgressJourney.tsx
- components/WorkReadiness.tsx
- components/CompletionModal.tsx
- components/AvatarMenu.tsx
- components/LanguageSelect.tsx
- components/ThemeToggle.tsx
- lib/hub-copy.mjs
- lib/catalog-i18n.mjs
- data/locales/pcm-courses.json
- data/locales/pcm-skills.json
- data/locales/pcm-opportunities.json
- tests/catalog-i18n.test.mjs
- public/sw.js
- README.md
- package.json
- context/PROJECT_CONTEXT.md
- context/coding_standard.md

## Research

- Saved language applies through a shared React context; bundled text-only overlays translate18 courses54 lessons14 skills11 work examples, preserving IDs/tools/relationships/links/executable snippets and quoted practice materials. User-entered text stays original.
- Use short concrete learner copy; no invention-sprint/future-capacity/development labels in visible pages. Coming soon describes unavailable features.
- Latest user steering adds author metadata and Vercel URL; README describes current learning only and omits future features. No deployment performed.

## Blockers


## Validation

- 73 automated tests pass; final production build passed with44 generated pages. Translation tests verify complete coverage full lesson detail, stable catalogue shape, unchanged runnable code and social numerical/no-spend examples.
- Browser verifies persisted English/Pidgin switching across Settings courses opportunities Profile tabs/resume modal; bilingual CapCut search2 results, translated requirements/course suggestions, English copy has no development labels. Restored English; no learner evidence/course activity fabricated.
- Author exact name/email, deployed README link and all relative README links verified. README forbidden future-feature word scan clean. No new dependencies/auth/database/environment files or provider calls.

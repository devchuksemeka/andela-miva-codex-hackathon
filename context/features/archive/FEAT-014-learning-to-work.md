# FEAT-014-learning-to-work: Practical courses and clear work opportunity journeys

- **id:** FEAT-014-learning-to-work
- **title:** Practical courses and clear work opportunity journeys
- **area:** both
- **owner:** coordinator
- **status:** completed
- **created_at:** 2026-10-14T07:25:28.903Z
- **started_at:** 2026-10-14T07:25:28.960Z
- **completed_at:** 2026-10-14T07:43:41.344Z
- **contract:** Shared agreement recorded in Research below
- **summary:** Added work-focused completion modals, simple linked role cards and opportunity details; expanded all18 courses into54 practical lessons
- **completion_validation:** 36 tests and production build pass; modal keyboard/visual QA and opportunity routing verified; content human review pending

## Acceptance criteria

- [x] Distinct practical course content, completion work modal, simple linked opportunity cards and detail routes

## Dependencies


## Files

- components/CompletionModal.tsx
- components/Hub.tsx
- app/opportunities/[id]/page.tsx
- app/globals.css
- lib/completion.mjs
- tests/completion.test.mjs
- data/courses.json
- data/opportunities.json
- tests/content.test.mjs
- public/sw.js
- README.md
- PRODUCT_BRIEF.md
- context/CAPSTONE_SPEC.md
- context/PROJECT_CONTEXT.md

## Research

- User explicitly requested generated original practical content; initial no-generated-lessons constraint superseded, original concept attribution preserved.
- Official references reviewed by content agent include CapCut trimming/captions, Adobe Premiere/Photoshop/Illustrator, Resolve training, Meta Blueprint, Canva hierarchy, Eventbrite timelines, Google technical writing and MDN.
- Preserve course/lesson/outcome IDs for saved progress; all18 courses rewritten with54 distinct lessons and practical tasks.
- Shared frontend/API agreement (consolidated from separate contract document):
- Learning completion and work opportunity experience
- Feature FEAT-014. User authorizes original generated lesson content, superseding the initial no-AI-lesson-generation scope; original product idea remains the author's. Generated lessons link to official sources, are not vendor curricula/certification, and require human content review.
- Completion
- Finishing last lesson records completed learning only and opens a modal connecting course outcomes to work. It must not grant demonstrated skills. Show actual ready matches from existing evidence separately from relevant potential work still requiring practice/other skills. Practical-task submission records self-reported skill evidence then opens modal with newly ready matches based on before/after evidence. Already-ready work must not be called newly unlocked. No unconditional redirect. Modal links /opportunities/:id and relevant practice/next course actions, traps focus and supports Escape/close/restoration. Explain no guaranteed vacancy or earnings; no fake application action.
- Opportunities
- List cards are single links to /opportunities/:id, showing title, work_summary and concise match reason/status. Remove location/remote/eligibility, type/freelance and pay from cards. Detail route explains work, deliverables, skill evidence/gaps, next courses, first step and source. Data remains a sourced directory with illustrative work requirements, not a verified vacancy.
- Data additions for each existing opportunity: work_summary:string, deliverables:string[], first_step:string. IDs, requirements, source URLs, kind and verification uncertainty retained. Role names replace generic project/category titles.
- Courses
- Preserve 18 course IDs and existing lesson IDs/outcomes; keep three lessons each for saved-progress compatibility. Rewrite all54 lessons as distinct original practical material: local/useful scenario, steps, input example, review criteria and mistakes, tool-specific but version-aware. Revise realistic reading/practice estimates and mini-tasks. UI must derive counts/duration rather than assume 3 lessons or20minutes. Source links accompany each lesson; human review pending. Text-first paragraph/step presentation works on mobile and both themes. No authentication, database, email or environment setup.

## Blockers


## Validation

- All36 tests pass, including content integrity/runnable JS and actual before-after readiness transitions.
- Production build passes with11 static opportunity detail pages and18 course pages; QA-only route removed.
- Browser checked simple linked cards, work detail content/source/skills, detail refresh and return navigation.
- Isolated completion modal preview checked learning vs practical states, focus trap, Escape and focus restoration without fabricating learner progress.
- Human curriculum/software-version review remains pending; opportunity directories are illustrative, not verified vacancies.

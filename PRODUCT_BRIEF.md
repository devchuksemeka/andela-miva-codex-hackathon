# Product Brief: Learning Hub

Status: Working proof of concept  
Updated: 13 October 2026  
Name: Generic placeholder; final branding is undecided

## Purpose

Help learners connect what they learn and what they already know to credible opportunities where they can earn.

**Courses → demonstrated skills → opportunities → a concrete next step toward earning.**

The product should answer three questions throughout the journey: “Why should I learn this?”, “What can I already do?” and “Where could this take me?” Earning is the intended outcome, not a guaranteed result or an implemented payment feature.

## Problem and origin

People acquire useful abilities through community work, church media teams, employment and self-study, yet struggle to recognise how those abilities translate into paid work. Learning resources are scattered, and course completion often leaves the learner without a clear next step. Career titles can also hide transferable skills: a software developer may already explain technical concepts, guide colleagues and create onboarding materials useful for tutoring.

The concept originates from the project author's observations of their church media team. This observation motivates the proof of concept; it is not yet evidence of broad market validation. AI software development tools assist implementation rather than originating the capstone idea.

## Learners

- Initial pilot: church media team members working with camera, projection, social media, broadcasting and event coordination.
- Wider audience: learners in Nigeria and other African communities seeking practical skills and pathways to income.
- Usage context: basic devices, limited mobile data, unreliable connectivity and varied digital confidence.

The pilot community is a starting point, not an eligibility restriction. Browsing does not require an account or a standard educational profile.

## Product model

| Concept | Meaning | Relationship |
| --- | --- | --- |
| Course | A structured learning experience, with tool/platform context where relevant | Develops one or more skills; multiple courses may develop the same skill |
| Lesson | A short, source-linked learning or practice unit within a course | Records learning progress |
| Skill | A specific, demonstrable ability | Can contribute to multiple categories and opportunities |
| Evidence | An example of practical work, with context/tool and verification status | Supports a skill independently of course completion |
| Opportunity | Work with explicit skill requirements and a source | Combines skills from courses, existing experience or both |
| Category | A way to browse related learning and work | Does not grant proficiency or constrain a skill to one profession |

Course completion means learning was completed. It does not establish proficiency. Evidence in the current proof of concept is self-reported, not independently verified.

### Tool alternatives

A CapCut clip-editing course and a Premiere Pro clip-editing course are distinct courses. Both can develop the transferable ability to sequence and trim clips. Captioning is another ability. A general content editing pathway may accept either tool; an opportunity explicitly requiring Premiere must require evidence in that tool.

Facebook publishing, Facebook analytics and Facebook ad planning are separate platform-specific skills. They can support Facebook-focused social media work without implying Instagram or TikTok proficiency. Ad planning does not demonstrate operating a live advertising campaign.

### Transfer across professions

Programming demonstration + explaining technical concepts + learner guidance can contribute to a coding tutor pathway. Those abilities can come from development work, presentations, mentoring and onboarding documentation. A learner does not have to complete a course titled “Coding tutor” to explore that pathway. Individual briefs may still require teaching experience or qualifications.

## Core journeys

### Learn toward an earning pathway

1. Browse or select interests; onboarding is skippable.
2. Explore a course and see the skills it develops and earning pathways it supports.
3. Complete short lessons, with course progress tracked separately from skill evidence.
4. Practise and describe a concrete work example.
5. See matches update, understand remaining skill gaps and choose a relevant next course.
6. Visit a sourced opportunity listing or directory and assess its actual requirements before applying.

### Discover value in existing experience

1. Identify a skill already used in work or community activities.
2. Record an example and its tool/context without repeating a course.
3. Discover opportunities across categories, including combinations of existing and newly learned skills.
4. Learn only what is missing for the next chosen pathway.

## Experience principles

- Make the connection to opportunity visible before asking the learner to invest time in a course.
- Recommend a useful next step, not an overwhelming list of unrelated courses.
- Treat different tools as alternatives where the work allows it; do not require every software package.
- Show why a match exists and which abilities are missing.
- Recognise progress gently through visible completion and streaks, without guilt or earnings hype.
- Keep all catalogues browsable; suggestions must not become exclusionary gates.
- Use text-first content and local progress; clearly state when an external resource requires connectivity, login, payment or a more capable device.
- Preserve traceable sources and distinguish course practice, provider credentials, self-report and verification.

## v1 scope and current status

| Capability | Current state |
| --- | --- |
| Course catalogue | 18 tool/context courses; 54 expanded practical lessons with distinct briefs |
| Skill catalogue | 14 specific transferable or platform-specific abilities |
| Many-to-many mapping | Courses expose skill outcomes; opportunities combine skill requirements |
| Existing experience | Local evidence entry without mandatory course completion |
| Matching | Transparent rules, skill gaps and relevant course suggestions; optional tool constraints |
| Learning progress | Lessons, completed courses, evidence, demonstrated skills and daily streaks |
| Earning connection | Course pathway counts, opportunity explanations and source links |
| Opportunity data | 11 directories with illustrative requirements; not verified individual vacancies |
| Privacy and access | Browser-local progress/evidence; guest browsing; all courses available without registration |
| Language | English and partial Nigerian Pidgin interface copy |
| Offline | Public shell, bundled course learning and local progress; external sources need internet |
| Backend | Next.js API routes backed by bundled JSON; no database required |

Course modules are original AI-assisted practical guides linking to official learning resources, not complete vendor curricula or vendor certification. Source review remains pending. See [README.md](README.md) for implementation details and limits.

## Non-goals

No payments, guaranteed employment, live job marketplace, external talent-platform integration, automated credential verification, user-generated courses, native mobile app or AI-generated capstone concept. Optional audio and peer verification are not implemented. A projection-specific demo pathway remains outstanding.

## Success hypotheses and evaluation

These are proposed pilot targets, not achieved outcomes:

| Hypothesis | How to assess it |
| --- | --- |
| Learners understand why a course matters | Ask them to identify a skill outcome and an earning pathway before starting |
| The next step is clear within five minutes | Observe onboarding → course/skill exploration → explained opportunity match |
| Existing skills reveal unexpected options | Ask pilot learners whether a cross-category match is useful and why |
| Learning feels worth returning to | Collect voluntary follow-up feedback about continued practice and abandonment reasons |
| Low-connectivity use remains useful | Test an opened lesson after losing connectivity, including progress persistence |
| Content is credible | Review original sources, opportunity freshness and requirement accuracy |

A useful pilot could involve 5–10 consenting media-team members, but recruitment and responses have not been completed. Prefer observation and voluntary feedback; the current app does not implement remote analytics. Do not present match counts as applications, jobs obtained or income earned.

## Next priorities

1. Curate verified individual opportunities and map their actual requirements.
2. Validate sources, course outcomes and practical evidence prompts with learners or subject reviewers.
3. Exercise offline and low-end-device behaviour without any database or configuration.
4. Complete main-screen Pidgin coverage and accessibility checks.
5. Validate the learning-to-opportunity loop with pilot learners and refine recommendations from evidence.

## Related documents

- [CAPSTONE_SPEC.md](CAPSTONE_SPEC.md): supplied challenge requirements and project response.
- [AGENTS.md](AGENTS.md): engineering coordination and standards entry point.
- [CHANGELOG.md](context/CHANGELOG.md): started and completed work history.

## Practical course and work experience revision

The author requested generated, original practical course content. Each tool track uses distinct scenarios and deliverables with official reference links; human source/content review remains pending. Completion connects learners to role-based work descriptions through a modal. Only demonstrated skills affect readiness; finished lessons can reveal potential work without claiming proficiency. Simple opportunity cards lead to full work-detail pages, preserving the directory/illustrative-requirements disclosure there.

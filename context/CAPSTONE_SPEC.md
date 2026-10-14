# Capstone Specification

Project: Learning Hub (generic working name)  
Type: Invention sprint / working proof of concept  
Updated: 13 October 2026  
Primary track: Guidance, Pathways & Opportunity  
Supporting track: Engagement & Staying in the Learning Journey

## 1. Supplied capstone challenge

Source: The capstone details supplied by the project author in this conversation. No official external brief URL, submission deadline or assessment rubric has been supplied. The following sections preserve the supplied challenge content, with formatting and punctuation normalised for readability.

### Challenge context

Access to knowledge, skills, and opportunity increasingly depends on whether people can find the right learning resources, understand how to use them, and stay engaged long enough to benefit. Yet for many students across Africa, learning materials are scattered, locked behind paywalls or logins, hard to discover, poorly matched to individual needs, or simply overwhelming to navigate. Too many people start a learning journey and quietly fall off it.

### Challenge tracks

1. **Access & Discovery of Learning Resources:** Technology that automates how learners find, retrieve, and organize the materials they need, making quality resources easier to reach and use.
2. **Engagement & Staying in the Learning Journey:** Tools that help learners stay motivated and keep going, so they remain in the learning process over time rather than falling off.
3. **Guidance, Pathways & Opportunity:** Tools that help learners understand where their learning can take them and what to do next, connecting study to real progress.

Cross-track entries are welcome.

### Project scope

Using AI software development tools, build a solution that responds to a real learning-access challenge within one or more of the tracks above. This is intentionally broad to give you room to explore the needs of different learners and communities and develop an original approach.

Your project should do more than deliver content. It should help people engage with learning in a way that is sustained, useful, and connected to opportunity.

### Invention sprint and originality

This is an invention sprint, not a product launch. You are not expected to build production-ready software. You are expected to use AI software development tools to create a working proof of concept that demonstrates your idea is useful, viable, and worth developing further. Please refrain from using AI to generate your capstone idea.

### Operating constraints

Your solution should account for the real conditions experienced by the learners it is designed to serve:

- **Quality and credibility:** Learning materials must be accurate and traceable to credible sources.
- **Low bandwidth and limited access:** Solutions should remain useful in areas with unreliable internet, limited mobile data, or basic devices.
- **Accessibility and inclusion:** Consider learners with different literacy levels, disabilities, levels of digital confidence, and access to technology.
- **Personalization without exclusion:** Tools that adapt to a learner's level or pace are powerful, but they should not lock out those who do not fit a standard profile.
- **Privacy and security:** Learners may share personal, academic, or performance information.
- **Multilingual access:** Learners work across diverse languages, including English, French, Portuguese, Arabic, and numerous local languages.
- **Local relevance:** Curricula, credentials, institutions, and opportunities vary by location.

## 2. Project response

The project addresses the gap between practical learning and income opportunities. It helps learners see what a course develops, demonstrate abilities through practical work or existing experience, and understand which combinations of those abilities can support earning opportunities.

The concept comes from the author's observations of their church media team. AI development tools support research, software implementation and verification; the submission must retain attribution of the original idea to the author.

The agreed product model is **courses → demonstrated skills → opportunities**, with a separate route from existing experience to demonstrated skills. Courses, skills and opportunities connect through many-to-many mappings rather than a single career hierarchy. See [PRODUCT_BRIEF.md](PRODUCT_BRIEF.md) for product intent and learner journeys.

### Track alignment

| Track | Project contribution | Boundary |
| --- | --- | --- |
| 3: Guidance, Pathways & Opportunity | Explain skill combinations, matches, gaps and useful next courses; connect to sourced earning pathways | Main submission framing |
| 2: Engagement & Staying in the Learning Journey | Short lessons, visible progress, streaks and a concrete reason to continue learning | Supporting retention layer; impact still needs learner validation |
| 1: Access & Discovery | Curated, source-linked catalogue and browse categories | Supporting access benefit; automated resource discovery/retrieval is not currently built |

## 3. Proof-of-concept requirements

These are project-specific acceptance criteria, not an additional official capstone rubric.

| ID | Requirement | Acceptance evidence |
| --- | --- | --- |
| POC-01 | Browsing is possible without a profile | Skip onboarding and explore all courses and opportunities |
| POC-02 | Courses and skills are separate entities | Completing every course lesson records course completion without granting demonstrated skills |
| POC-03 | Tool-specific courses support shared outcomes | CapCut and Premiere courses both develop clip sequencing; evidence retains the tool |
| POC-04 | Skills are reusable across categories | One skill contributes to multiple relevant opportunity pathways |
| POC-05 | Existing experience counts | Record a work example without mandatory course completion and see matching update |
| POC-06 | Matches are explainable | Show required abilities, evidence, missing skills and relevant next courses |
| POC-07 | Context-specific requirements remain explicit | Facebook experience does not imply Instagram proficiency; tool restrictions require matching evidence |
| POC-08 | Learning remains tied to earning | Course details show opportunity relevance and matches lead to a concrete sourced next step |
| POC-09 | Previously opened learning remains useful offline | Open a lesson online, disconnect, reopen it and retain progress |
| POC-10 | Content and opportunities are credible | Source review and actual vacancy requirement/freshness checks, without invented pay |
| POC-11 | Inclusion and privacy are understandable | Keyboard/mobile checks, plain language, no required account, local data notice and main-screen language support |

## 4. Constraint response and gaps

| Supplied constraint | Current response | Remaining validation or work |
| --- | --- | --- |
| Quality and credibility | Source-linked original practice modules; directories labelled as illustrative; self-reported evidence disclosed | Review course sources/outcomes; add and verify individual vacancies and dates |
| Low bandwidth and limited access | Text-first PWA, bundled catalogue, service worker and local progress | Exercise throttled/offline behaviour and basic devices; external courses/directories require connectivity; some tools require capable hardware or paid software |
| Accessibility and inclusion | Labels, focus styling, responsive layout, no mandatory login | Formal keyboard, contrast, screen-reader and low-literacy checks; audio remains optional/unimplemented |
| Personalization without exclusion | Suggestions and next-course guidance while full catalogues stay browsable | Validate usefulness with varied learners; do not describe simple rules as proven personalization |
| Privacy and security | Progress/evidence in browser storage, export, no remote learner-profile storage | Review browser-data handling and API validation; warn against private client details; localStorage is not encrypted confidential storage |
| Multilingual access | English and partial Nigerian Pidgin main-interface copy | Complete pilot-language coverage and review translations; the supplied language examples do not imply all must be implemented in v1 |
| Local relevance | Nigerian pilot context and practical community examples | Add locally relevant verified opportunities and eligibility details; current directories do not establish Nigerian availability |

## 5. Technical specification

- **Frontend:** Next.js App Router, React and TypeScript; responsive PWA with a service worker.
- **Backend:** Next.js API route handlers.
- **Data storage:** Bundled JSON catalogues and browser-local progress; no database, authentication, SMTP or environment configuration.
- **Catalogue:** Separate course, skill and opportunity records; courses reference skill outcomes and opportunities reference skill requirements.
- **Progress:** Browser-local lessons, course completions, evidence descriptions, demonstrated skill IDs and active dates.
- **Evidence:** Skill, tool/context, example description, optional course ID, date and self-reported status.
- **Matching:** All required ability groups must be met; any listed alternative can satisfy its group. Optional tool constraints also require appropriate evidence.
- **Sources:** Course/lesson URLs and opportunity source/application links; verification must reflect actual review rather than a populated placeholder date.

The browser receives full course JSON for local learning; public Next.js API routes expose the same static catalogue through lib/catalog.ts. All courses are available without registration. No authentication, email delivery, database or environment files are used. POST /api/progress acknowledges local storage rather than persisting progress remotely.

## 6. Current baseline

As documented on 13 October 2026:

- 18 course modules, 14 skills and 11 illustrative opportunity directories.
- Separate learning completion and self-reported practical evidence.
- Existing-experience entry and a cross-category coding tutor pathway.
- Rule-based skill stacking, gap explanations and course suggestions.
- Local progress, streaks, export and partial English/Pidgin interface support.
- Production build and domain tests previously passed; engineering workflow tests bring the recorded suite to 19 passing tests.
- Browser course navigation and existing-experience task access were checked. End-to-end proof submission, offline behaviour have not been fully verified.

Historical checks describe the recorded baseline, not a permanent guarantee or evidence that all capstone constraints have been satisfied.

## 7. Demo and evaluation plan

### Story A: Different software, shared editing ability

Open the CapCut and Premiere editing courses, compare their shared outcome, complete a short learning unit and record an actual practical example. Show that either can support the content video editor pathway. Explain that captioning and tool-specific briefs may require additional evidence.

### Story B: Facebook experience without other platforms

Demonstrate Facebook publishing and analytics. Show their contribution to a Facebook-focused social media pathway without claiming Instagram or TikTok proficiency. Open the source and discuss the actual brief's requirements.

### Story C: Transferable skills reveal tutoring potential

Record genuine programming demonstration, audience explanation and learner-guidance examples from development work. Show the coding tutor pathway without forcing unrelated courses. Identify any additional qualifications or teaching experience required by a real listing.

### Story D: Low-connectivity learning

Open a lesson while online, allow service-worker activation, disconnect and reopen learning content. Confirm progress persists. Clearly distinguish bundled practice content from external resources that remain online-only.

### Validation record

For each demo, record the steps, actual result, relevant source or screenshot, and unresolved limitation. Pilot feedback should establish whether learners understand the match and feel the next learning step is worthwhile. Actual employment or earnings are longer-term outcomes, not a claim supported by this demo.

## 8. Submission preparation

Suggested artifacts—not confirmed official submission requirements:

- Working proof of concept and clear setup instructions.
- Concise explanation of the local problem and author's original insight.
- Demo of the learning → evidence → opportunity loop and an existing-experience route.
- Source list and explicit content/verification limitations.
- Evidence of low-connectivity checks and learner feedback when completed.
- Explanation of AI development-tool use, with the idea attributed to the author.

The submission should describe this as a proof of concept worth further development, not production-ready software, a verified credential system or a guarantee of income.

## 9. Open questions

Submission deadline, required format, official rubric and hosting expectations are not yet supplied. Final app name, opportunity partners, pilot recruitment, evidence-review process and broader language rollout remain undecided. These uncertainties do not block documenting or iterating the current proof of concept.

## 10. Engineering delivery

Use [AGENTS.md](AGENTS.md) and the project coordination skill for researched frontend/API tasks and contract handoffs. Track started work in [CHANGELOG.md](context/CHANGELOG.md) as in_progress, then mark completed and archive the task after acceptance and validation. Keep [README.md](README.md) as the setup and runtime reference.

## Current scope revision

FEAT-011 removes the historical authentication/email/database integrations. The current proof of concept runs with local JSON and browser progress, with no setup credentials. Earlier test counts are historical.

## Practical learning revision

FEAT-014 follows the author’s explicit request for generated original course lessons and practical exercises. These materials are not vendor-certified curricula and require human review. This does not change the requirement that the capstone idea originates with the author. Work-role cards and detail pages explain how demonstrated skills contribute to opportunities; directory records are not advertised as verified vacancies.

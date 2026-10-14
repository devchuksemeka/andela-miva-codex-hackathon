# Tools and specifications

Use package.json and package-lock.json as version authority. Node.js 20.9+, npm, Next.js App Router, React, strict TypeScript and Lucide icons. Data is local JSON; there is no database driver, SMTP library, authentication service or required environment setup. Optional résumé AI selection uses server runtime OPENAI_API_KEY and OPENAI_MODEL; no environment files or client keys.

- npm run dev: localhost:3000, development output .next-dev.
- npm run build: production build and TypeScript checks, output .next.
- npm test: Node tests in tests/*.test.mjs.
- npx tsc --noEmit: targeted type checking.
- node scripts/task.mjs help: feature tracking commands.

No lint script or browser-test runner is configured. Report only checks actually performed. Use available cua_repl browser controls for UI validation; preserve user progress and do not submit fabricated skill evidence.

Use rg for discovery. Research current technical facts with official sources, and source course material from credible providers. Never invent jobs, pay or verification dates.

Coordinate frontend/backend work with collaboration tools and disjoint file ownership. Do not create sidebar chats to delegate. Reconcile interrupted ledger transitions with node scripts/task.mjs reconcile after stopping concurrent writers. Role definitions persist; live agents are session-scoped.

The PWA requires HTTPS or localhost. After loading online and cache activation, local course learning should remain usable offline; external source and opportunity websites remain online-only. Runtime offline verification must be recorded separately from builds.

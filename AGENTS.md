# Repository Guidelines

## Project Structure & Module Organization
- `pages/` drives Next.js routing; keep feature pages co-located with route-specific hooks inside `hooks/`.
- Shared UI sits in `components/`, while reusable domain logic belongs in `lib/` and data models in `models/`.
- `prisma/` holds the schema, migrations, and seed script; run database commands from this root.
- Static assets live in `public/` and Tailwind styles in `styles/`. Localized strings reside in `locales/`.
- Unit specs live under `__tests__/`, and Playwright scenarios under `tests/e2e/`.

## Build, Test, and Development Commands
- `npm run dev` — Launch Next.js dev server on port 4002 with hot reload.
- `npm run build` — Generate Prisma client, sync schema to the dev DB, then build for production.
- `npm run start` — Serve the production bundle (after `npm run build`).
- `npm run test` / `npm run test:watch` — Execute Jest unit suites once or in watch mode.
- `npm run test:e2e` — Run Playwright end-to-end tests; use `npx playwright show-report` after failures.
- `npm run check-format`, `npm run check-lint`, `npm run check-types` — Pre-PR quality gates; `npm run test-all` chains them.

## Coding Style & Naming Conventions
- TypeScript-first with strict mode: prefer `.tsx` for components and `.ts` elsewhere.
- Prettier enforces 2-space indentation and import sorting; run `npm run format` before large PRs.
- ESLint (`eslint.config.cjs`) plus Tailwind plugin guard JSX and class usage; fix with `npm run check-lint -- --fix` when feasible.
- Use PascalCase for React components, camelCase for functions/variables, and SCREAMING_SNAKE for global constants.

## Testing Guidelines
- Write Jest specs alongside related modules in `__tests__/lib/...` using the `*.test.ts` naming pattern.
- Prefer Testing Library helpers for React interactions; mock network calls via `jest.setup.js` utilities.
- Keep Playwright flows minimal and data-independent; store fixtures under `tests/e2e/fixtures` if needed.
- Maintain coverage by tagging critical paths with tests before merging; validate locally via `npm run test:cov`.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat`, `fix`, `build(deps)`, etc.); scope PRs tightly, matching patterns from recent history.
- Each PR should include a short summary, testing notes (`npm run test`, `npm run test:e2e`), and links to related issues or tickets.
- Attach UI screenshots or Loom clips whenever screens change; highlight schema updates and required env vars in the description.
- Request at least one reviewer familiar with the touched area and wait for green CI before merging.

## Environment & Configuration Tips
- Copy `.env.example` (if available) to `.env.local`; include Stripe, Sentry, and database credentials.
- Use `docker-compose up db` to start Postgres locally, then `npx prisma db push` and `npx prisma db seed` as needed.
- Instrumentation and error reporting rely on `sentry.client.config.ts`; verify DSNs before enabling in production.

# Repository Guidelines

## Project Structure & Module Organization
- `app/` — App Router pages and layouts (`app/layout.tsx`, `app/page.tsx`). Prefer Server Components by default.
- `app/globals.css` — Global styles and Tailwind v4 theme tokens.
- `public/` — Static assets served at `/` (e.g., `/vercel.svg`).
- Config: `next.config.ts`, `tsconfig.json` (alias `@/*`), `eslint.config.mjs`, `postcss.config.mjs`.
- Build output: `.next/` (ignored). Do not commit.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server at http://localhost:3000.
- `npm run build` — Create a production build.
- `npm start` — Run the production server (after build).
- `npm run lint` — Lint with Next + TypeScript rules.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Indentation: 2 spaces.
- Components: functional, PascalCase (e.g., `Hero.tsx`).
- Routes/segments: kebab-case (e.g., `app/about-us/page.tsx`).
- Use absolute imports via `@/` (configured in `tsconfig.json`).
- Server Components by default; add `"use client"` only for state/effects or browser APIs.
- Styling: prefer Tailwind utility classes; keep custom CSS minimal in `app/globals.css`.

## Testing Guidelines
- No test runner is configured yet. If adding tests:
  - Name files `*.test.ts`/`*.test.tsx`; co-locate or use `__tests__/`.
  - Cover critical rendering/interaction flows. Keep tests fast and deterministic.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`.
- PRs should include: clear description, linked issues, and screenshots/GIFs for UI changes.
- Ensure `npm run lint` and `npm run build` pass locally before opening a PR.

## Security & Configuration Tips
- Store secrets in `.env.local`; never commit `.env*` files.
- Configure external image domains in `next.config.ts` when needed.
- Do not modify `.next/` or `node_modules/` in commits.

## Agent-Specific Instructions
- Keep patches small and focused; follow the structure above.
- Avoid adding dependencies without a clear, documented need.
- Keep locale content consolidated in `messages/en.json` and `messages/th.json`. Do not create additional per-feature message files under `messages/`.
- Update this file when changing commands, structure, or conventions.

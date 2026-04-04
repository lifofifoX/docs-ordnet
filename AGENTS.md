# Agents

## Project

Starlight (Astro) docs site for `docs.ord.net`, deployed to Cloudflare Workers.

- Docs content: `src/content/docs/`
- Sidebar config: `astro.config.mjs` — manually maintained
- Styling: Tailwind via `src/styles/custom.css`
- Deployment: `wrangler.jsonc` serves `dist/` as static assets

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run check` — Astro type-check + build
- `npm run deploy` — build + deploy to Cloudflare

## Conventions

- Content files are Markdown/MDX in `src/content/docs/`
- New top-level pages need a manual sidebar entry in `astro.config.mjs`
- Pages inside `autogenerate` directories (e.g. `guides/`) are picked up automatically

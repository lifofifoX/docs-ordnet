# ord.net Public Docs

Starlight app for the public `docs.ord.net` site.

## Scope

- Public docs content lives in `src/content/docs/`.
- The repo's top-level `docs/` tree stays internal-only and is not published from this app.
- This app deploys independently from the Hetzner-hosted marketplace runtime.

## Commands

Run these from the repo root:

| Command | Action |
| :--- | :--- |
| `npm --prefix apps/public-docs install` | Install docs app dependencies |
| `npm run docs:dev` | Start the Starlight dev server |
| `npm run docs:build` | Build the static docs site |
| `npm run docs:check` | Run Astro checks and a production build |

## Cloudflare Workers Builds

Configure the Cloudflare project with:

- Root directory: `apps/public-docs`
- Build command: `npx astro build`
- Deploy command: `npx wrangler deploy --domain docs.ord.net`
- Custom domain: `docs.ord.net`

The Worker configuration lives in `wrangler.jsonc` and serves the built `dist/` output as static assets with custom 404 handling. The `docs.ord.net` domain binding is applied at deploy time because Wrangler does not persist this setting as a top-level `wrangler.jsonc` field for this static-assets workflow.

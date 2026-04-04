# ord.net Public Docs

Starlight app for the public `docs.ord.net` site. Deploys to Cloudflare Workers.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Starlight dev server |
| `npm run build` | Build the static docs site |
| `npm run check` | Run Astro checks and a production build |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

## Cloudflare Workers

Configure the Cloudflare project with:

- Build command: `npx astro build`
- Deploy command: `npx wrangler deploy --domain docs.ord.net`
- Custom domain: `docs.ord.net`

The Worker configuration lives in `wrangler.jsonc` and serves the built `dist/` output as static assets with custom 404 handling. The `docs.ord.net` domain binding is applied at deploy time because Wrangler does not persist this setting as a top-level `wrangler.jsonc` field for this static-assets workflow.

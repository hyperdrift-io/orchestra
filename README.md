# Orchestra AI — ai.hyperdrift.io

Agent orchestration for production AI workflows. An offspring of Hyperdrift.

- [MISSION.md](./MISSION.md) — what we exist to do.
- [ROADMAP.md](./ROADMAP.md) — phased plan from launch to standalone graduation.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3105
pnpm test         # vitest (schema + API route)
pnpm typecheck
pnpm build
pnpm start        # serves the production build on port 3005
```

## Ports

| Environment | Port | URL |
|---|---|---|
| Production | 3005 | https://ai.hyperdrift.io |
| Development | 3105 | http://localhost:3105 |

Convention: `prod_port + 100 = dev_port` (see `infra/PORTS.md`).

## Required env

See [`.env.example`](./.env.example). The contact form needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. No analytics wiring in the MVP — we add measurement when there is something signal-shaped to measure.

## Deployment

Hyperdrift self-hosts on a Hostinger VPS. There is no Vercel / Netlify / managed Next.js host in the stack.

- **Process manager**: PM2 (`ecosystem.config.cjs` in this repo mirrors the central `nginx-prod/ecosystem.config.js` entry on the server).
- **Reverse proxy + TLS**: nginx on the VPS, terminating `ai.hyperdrift.io`.
- **CI**: GitHub Actions (`.github/workflows/deploy.yml`) runs the test gate (`pnpm run test:ci`) and the production build on every push to `main`, then triggers the server-side deploy webhook.
- **Server-side deploy**: managed by the `hyperdrift-infra` repo (ansible). The app entry lives in `infra/group_vars/apps.yml` under `deploy_apps[name=orchestra]` with port `3005`.
- **DNS**: `ai.hyperdrift.io` resolves to the Hostinger VPS via an A record.

To register a new env var or change port behaviour, edit `infra/group_vars/apps.yml` in the `hyperdrift-infra` repo and run the deploy from there.

## Design system

Semantic CSS only — no Tailwind, no CSS-in-JS. The system is described in `src/app/globals.css`:

- **Type**: Fraunces (display, variable optical sizes + italics), IBM Plex Sans (body), IBM Plex Mono (technical metadata). Loaded via `next/font/google` in `layout.tsx`.
- **Palette**: deep ink (`--ink`), warm cream type (`--cream`), single vermillion accent (`--vermillion`).
- **Motifs**: oversized italic serif "movement numerals" mark each section; a 5-line musical staff appears as decoration; an animated equalizer lives in the footer.
- **Components use semantic class names** (`.eyebrow`, `.lead`, `.numeral`, `.card`, `.section-head`, `.btn`, `.btn.primary`, `.meta`) — variants are compound selectors on primitive elements, not utility classes.

## Repository

This is an independent git repository under the `hyperdrift-io` GitHub organisation, federated via `meta/mani.yaml` in the parent Hyperdrift monorepo. Remote: `git@github.com:hyperdrift-io/orchestra.git` (to be created at launch time).

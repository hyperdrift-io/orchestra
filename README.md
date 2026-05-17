# Orchestra AI — ai.hyperdrift.io

Agent orchestration for production AI workflows. An offspring of Hyperdrift.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3030
pnpm test         # vitest
pnpm typecheck
pnpm build
```

## Required env

See `.env.example`. `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` are required for the contact form to work. `NEXT_PUBLIC_POSTHOG_KEY` is required for analytics.

## Design system

Semantic CSS only — no Tailwind, no CSS-in-JS. Tokens live in `src/app/globals.css` on `:root`. Variants use compound role selectors (`button.primary`, `a.primary`).

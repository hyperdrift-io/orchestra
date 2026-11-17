# Hyperdrift apex migration candidate

Prepared only. No deployment or outbound communication. The founder must approve the final preview before release. This supersedes the unified HD-app candidate `a72759f`; that comparison and its protected preview are preserved separately.

The commercial site uses the existing Orchestra Next 15 application at `hyperdrift.io`. The earlier HD app stays separate at the working address `studio.hyperdrift.io`, labelled Projects & writing. Its address is configurable through `NEXT_PUBLIC_ARCHIVE_ORIGIN` in `src/site/archive.ts`. This source makes no DNS or host change.

## Routes and continuity

The approved home, About, Work, workflows, HD OS and three Traction pages are integrated. Blog stays `/articles`, with the 16 published Orchestra articles and two collections, retaining the existing indexable topic pages. It links to the earlier writing archive. This app imports no HD blog renderer, newsletter database, shortener, love API or mail transport. Infra routes the legacy apex URLs to the appropriate old-HD service or archive destination. Traction accounts retain their existing origin.

`/articles/feed.xml` is the commercial RSS feed; `/feed.json` is its JSON feed. Original Orchestra item IDs and publication dates are unchanged. Old Orchestra RSS redirects to the new path; legacy apex `/feed.xml` remains owned by old HD. Canonicals, JSON-LD, sharing images, sitemap and llms name the apex. Private invitations remain noindex, no-store and no-referrer; tokens are redacted before analytics.

## Publication boundary

[The manifest](migration/publication-manifest.json) records the deployed `be4e469` baseline. All 16 bodies are byte-equal after the documented host substitution. The catalogue preserves deployed fields apart from the two existing host substitutions. Five unpublished draft bodies remain in source but have no public catalogue entries. Four wording corrections from newer main are held. Artwork is already approved. No private case study is published by this migration.

## Enquiries and data

Public forms POST `/api/enquiry`, an alias of the existing saved receiver at `/api/contact`. It validates origin, size and schema, saves pending before relaying, then records sent or failed with the same receipt ID. Article, campaign, quote, bounded workflow example and legacy HD handoff context survive. Legacy exact HTTPS Orchestra/AI origins remain accepted during migration; unrelated origins fail.

Keep existing `ENQUIRY_DATA_DIR` and `TRACTION_INVITATIONS_FILE`; no registry or enquiry migration is required. Set `CONTACT_RELAY_URL=http://127.0.0.1:3000/api/contact` and retain the matching scoped `CONTACT_RELAY_KEY` for the old HD transport. Public apex `/api/contact` is an infra-owned legacy transport exception. This app's internal receiver must not relay back to itself. Existing `ENGINE_PUBLIC_URL`, `TRACTION_URL` and read keys remain scoped as before. No live customer data or credentials were used for local verification.

## Build and preview

Production candidate: `NEXT_OUTPUT_DIR=.next-production MIGRATION_PREVIEW=false npm run build`.

Held preview: `NEXT_OUTPUT_DIR=.next-preview MIGRATION_PREVIEW=true NEXT_PUBLIC_POSTHOG_KEY= npm run build`. Start with the same output/preview flags, empty analytics key, isolated invitation/enquiry fixtures and unreachable local engine origin. The build bakes the preview hold into its artifact, so dropping the runtime flag cannot enable writes. All preview responses are noindex/no-store. Mutations and live read APIs are blocked; forms are visibly disabled before typing, and trial links show a paused handoff. Never deploy `.next-preview` or turn a preview runtime into production by changing one environment variable; rebuild production separately.

Next remains locked at 15.5.28, with no reported production Next advisory. Zod is patched to 4.6.7 for GHSA-mrhx-c7xc-m3w5. Seven remaining npm audit findings are in the existing Vitest/Vite development tree (including its UI server and Tinypool); the preview runs `next start`, never a Vitest/Vite server. No broad tooling upgrade is included.

Verification: `npm run typecheck`, 82 Vitest tests, and `node scripts/test-migration.mjs` (isolated origins, save/relay/failure receipts, bounds, preview hold, context, publication gate, token redaction and invitation lookup). Production and preview are built separately; route/indexability evidence is saved alongside this record after readback. These local checks do not establish live routing, indexing, mail delivery or customer outcomes.

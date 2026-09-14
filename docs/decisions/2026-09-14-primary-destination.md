# The AI site is Hyperdrift's primary destination

## Founder decision

14 September 2026: promote `ai.hyperdrift.io` rather than continue maintaining the legacy HD homepage as the centre of the business strategy. This explicitly supersedes the proposed replacement of Capital DeFi with an AI card on the legacy homepage and the earlier proposal to redirect the AI portal to a new legacy-site services page.

The existing AI-site design is the foundation. No replacement concept, palette, font system, layout, or artwork is introduced. The original site's appraisal remains useful historical design evidence, but its homepage is not the current implementation target.

## Website roles

| Surface | Role |
|---|---|
| `ai.hyperdrift.io` | Primary destination for service enquiries, AI/MCP capabilities, current examples, and promotional links. |
| `hyperdrift.io/blog/...` | Existing canonical articles, including the anniversary and project case notes. Link to these while the editorial migration is evaluated. |
| Individual AI apps and repositories | Inspectable demonstrations and source; link back to the AI practice when the relevant surface is next updated. |
| Legacy application directory and runtimes | Historical or application-specific destinations. No new homepage-led promotion; assess maintenance and retirement separately. |

The commercial focus changes now. Runtime removal, DNS redirects, and article migration are separate technical actions. In particular, the current AI enquiry route relays to `https://hyperdrift.io/api/contact`; removing that runtime without migrating the relay would break enquiries.

## First preview

- Existing hero: anniversary article link replaces the repeated top-level partnership action; the partnership remains reachable through the hero's existing facts row and its section.
- Hyperdrift attribution is visible in the opening identity line and footer.
- Standup is the first example, using the existing case-study component. Its description names the read-only brief and evidence trail. No contest award, judging result, or client deployment is claimed.
- MCP integrations join the existing capability list. No new service backend is introduced.
- Metadata names Hyperdrift and the AI/MCP offer.
- The case-study introduction distinguishes working examples from client delivery claims.

The current name “Orchestra AI” is retained. A change to “Hyperdrift AI” remains a brand decision, not something silently bundled into a content update.

## Next release work

1. Validate this AI-site preview with the founder. Preserve the current artistic direction.
2. Check the enquiry path using an explicitly authorized delivery check before production promotion. No email was sent from this preview task.
3. Establish reliable enquiry and referral measurement. `infra/group_vars/apps.yml` currently leaves the Orchestra GA and PostHog identifiers blank. Do not buy traffic without a dependable conversion signal.
4. Publish the AI-site changes through infra when authorized, verify live links, and resubmit its sitemap.
5. Point forthcoming anniversary, case-study and contest promotion at the AI site where the intent is client work. Retain specific article/demo links where those are the actual subject. Posting and submission require their own existing authorization.
6. Reframe the year-two editorial draft around this destination. Keep the anniversary URL stable.
7. Later, make only the minimum legacy entry-point routing change needed to direct visitors here. Preserve blog deep links. Do not resume a redesign of the legacy application showcase.

## Evidence

- Existing AI site served at `https://ai.hyperdrift.io`, read on 14 September 2026.
- Baseline: Orchestra `origin/main` at `011cf42` (31 August 2026); isolated worktree `apps/.worktrees/poc/orchestra/feat-ai-hd-primary-destination`.
- Standup: `apps/poc/standup/README.md` and the published article `https://hyperdrift.io/blog/one-evening-who-is-waiting-on-you`.
- Anniversary: `https://hyperdrift.io/blog/hyperdrift-turns-one` and its approved Voyage Chart design record.
- Existing enquiry relay: `src/app/api/contact/route.ts`.
- Production registry: `infra/group_vars/apps.yml`, entry `orchestra`, domain `ai.hyperdrift.io`, port `3008`.

Local preview: http://127.0.0.1:3108. No DNS, runtime, or production deployment changes are included.

## Preview checks

- `npm run typecheck`: passed.
- `git diff --check`: passed.
- Local homepage: HTTP 200; anniversary link, Hyperdrift attribution, Standup case, and MCP capability present in rendered HTML.
- Local `/api/contact` with an empty invalid body: HTTP 400 before the relay. No email sent; successful delivery remains untested.
- Existing stylesheet and assets are unchanged. A complete browser/mobile visual review is still pending.
- Preview server remains running on port 3108. Production and infra were not changed.

Local setup note: the repository has a pnpm lockfile, but pnpm was absent from PATH. A temporary npm-exec pnpm invocation installed the locked dependencies; pnpm 11 inserted unresolved `allowBuilds` placeholders and reported ignored esbuild/sharp scripts. Those generated placeholders were removed, leaving the tracked dependency files unchanged. The preview and type check ran successfully. Use the existing lockfile-compatible toolchain for this content branch; resolve the npm/infra package-manager contract in a dedicated tooling change before dependency work.

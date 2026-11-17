# Orchestra

> Inherits `~/dev/hyperdrift/AGENTS.md`.

Offer, audience and register: `MISSION.md`. History: `docs/RELEASES.md`, `docs/decisions/`.

## Current migration candidate — 17 November 2026

This repository supplies the rebranded commercial site at `https://hyperdrift.io`: Traction, custom AI workflows, HD OS, About, Work and Blog (`/articles`). The previous HD site is a separate app at the working archive address `https://studio.hyperdrift.io`; its public label is **Projects & writing**. `src/site/archive.ts` owns that configurable address. This is prepared work, not a live release. Founder approval of the final preview remains required. No deployment or outbound communication is authorised by this record.

The existing Orchestra application and storage stay in place. `/api/enquiry` is the public saved-enquiry endpoint; its handler is also available internally at `/api/contact`. The mail relay targets the legacy HD transport on loopback port 3000; it must never call this app's own receiver. Infra owns the apex API exceptions and old-host redirects. See [migration contract](docs/MIGRATION-2026-11-17.md).

PostHog remains project 206943 (EU). The new public site emits `app=hyper-drift`, `hostname=hyperdrift.io`; include historical `app=orchestra` for pre-migration comparisons. One SDK, no session replay, form autocapture, contact text or person profiles. Capture requires the production host, a configured key and permitted measurement. Private URL redaction, disabled flag requests, DNT/GPC and opt-out remain mandatory.

## Public pages

The approved rebrand is integrated without redesign. `/traction`, `/traction/how-it-works`, `/traction/partnership` and `/os` each have a standalone canonical. `/how-it-works?view=business` retains the organisation illustration. `/about`, `/work` and `/workflows` are real pages. `/contact` accepts article, campaign, workflow and legacy HD source context; `/enquire` preserves its query in a redirect. `/articles` is a searchable mosaic of 16 published articles, with a link to the separate earlier writing archive. There is no merged `/blog` reader or legacy HD service implementation in this app.

The publication boundary is the deployed `release/orchestra-traction-trial-20261116` commit `be4e469`, plus host substitutions documented in the manifest. Four later wording corrections remain held; five draft source files remain unlisted and unpublished. The private workflow case is not published. XML feed is `/articles/feed.xml`; JSON feed is `/feed.json`. Feed item IDs retain the original Orchestra URLs and original dates.

Every animated scene keeps pause, reduced motion, a static fallback and readable controls.

## Claims

- NextRole is owned-product proof with fictional-data live checks, not a client success or proven adoption. Client engagements are Everything and VodafoneThree (through Tecknuovo).
- Together and Revela are partner ventures, not client endorsements.
- Contest entries are participation, never a commission, endorsement or award. Each contest case fills `challenge` in `src/data/case-studies.ts` (organiser, exact event, official URL, evidenced stage) from the HD workspace's `.growth/contests/ledger.jsonl` and the event page. Never expose a private repository as a public demo.
- Illustrations, including the graph's growth iterations and the `/os` scenes, aren't forecasts or client results. Label invented examples.
- No prices or terms on any page.

## Copy

All words follow `hd-content-writer`; articles also follow `docs/editorial/ARTICLE-STANDARD.md`. Every new or revised article requires subject-specific hero and matching Open Graph artwork; the standard owns the publication gate. New customer-facing words go through the founder's review before release. Register: `MISSION.md` → How we communicate.

Never say "free": the trial implies it (founder, 11 November 2026). Traction is "a growth team for your app"; the thing a founder gets first is a "first impression". The subscription names what it includes and offers a quote for the level of integration. One primary action per page. On the Traction offer, "Trial Traction →" opens signup from above the film and from the end of the page. The masthead links to the first button (founder, 15 November 2026). Personal invitations keep it beside the founder's own read. A returning founder can discuss continued use through the existing enquiry. Other offers keep their door after the proposal. Door words live in `src/data/site-door.ts`.

## Enquiry and invitations

Every enquiry POSTs to this app's `/api/enquiry`, aliases its internal saved receiver `/api/contact`, then relays to the legacy HD mail transport at loopback `127.0.0.1:3000/api/contact`. Never relay to this app's own port. Notifications carry the saved enquiry ID and validated campaign tags. Optional `handoff` context and `product_url` are visitor hints, not proof of identity or qualification, and relay acceptance isn't proof the mail arrived. Never count preview submissions as leads. Isolated runtimes set `CONTACT_DELIVERY=preview`. The relay call carries `x-contact-relay-key` from `CONTACT_RELAY_KEY`, the same value as HD's. A filled `website` honeypot, more than five posts per connection in ten minutes, and in real delivery a reserved test domain (`example.com`, `*.test` and the like) or more than 30 enquiries an hour never reach the inbox.

Private invitations live at `/traction/invitation/<token>`: an opaque token resolved on the server from a registry outside Git (`TRACTION_INVITATIONS_FILE`; local copies stay in `.local/`). They're no-store, no-referrer and noindex, grant no app access and prefill only the details authorised for them. An entry may carry the founder's first read (`read`: three checked findings with https sources), the email's `audience` words, an opaque `ref` (`c-` and eight hex digits) and a page `variant`; `parseInvitation` drops any part that fails validation. Analytics sees every invitation under the shared path `/traction/invitation` with its `ref` and `variant`, never the token, name or email, so each visit reads on that person's Traction record. Its door is free sign-up on Traction (decision of 3 November 2026); a reply to Yann's email is the other route. The door's address carries `from=<ref>`, with `app=<the app's https address>` and `product=<its name>` when the entry has a `url`, and the visit id in the fragment (`#journey=<uuid>`, or `#measurement=off` when the browser asks not to be tracked). Nothing else crosses: Traction keeps `from` as the board's `invite_ref` and the fragment as its `journey_id`. From `/traction` only the fragment crosses. Never put contact fields in query strings or browser storage, or read the production database on a public page load.

The modal reads **Get in touch**, plain field labels, **Message**, **Send message**. Opened by the subscription's link (`?situation=subscription#enquire`) it reads **Ask for a quote** and its open field is optional; `contactSchema` requires a message for every other enquiry. Known details stay editable and survive close and reopen. Desktop focus starts at the first missing required field; touch starts at the heading.

## Brand and art

The display face is Bricolage Grotesque (founder's choice, 11 November 2026), with IBM Plex Sans and Mono; files, hashes and licences in `public/fonts`. It has no italic: colour carries display emphasis. Decorative art is WebGL `MeshArtwork` over inline SVG fallbacks, no bitmap brand art; behaviour contract in `docs/editorial/ARTICLE-STANDARD.md`. The public rebrand uses `public/assets/hyperdrift-logo.svg` and `src/app/icon.svg`. Existing Mesh Aperture assets remain for historical illustrations. The wordmark stays live text. Pages with their own Open Graph object include `brandShareImage` from `src/lib/share-metadata.ts`. Real recordings and screenshots stay separate from editorial art. In development, `?mesh=fallback` exercises the fallback path.

## Articles and links

Article reading and public links: `article-experience` skill. `src/lib/article-experience/` is generated from `packages/article-experience/`; never edit it here. Unpreviewable external citations render as text (`citationStaysText`).

Article finder: `src/lib/article-search.ts`; a tag page is indexed from three articles (`INDEXABLE_FROM`).

Articles are `content/articles/*.md` plus `src/data/articles.json`, with `publishedAt: null` until publication is approved. Drafts render only in development or an `ARTICLE_PREVIEW=true` build and stay out of the sitemap, `llms.txt` and `/feed.json` and `/articles/feed.xml`; feeds never carry lead data or private Traction records. Dates are honest: sitemap `lastModified` comes from the article, never the build.

## Commands and release

`npm run dev` (port 3108), `npm run test:ci` (typecheck and Vitest), `npm run build`.

Release: commit to main and push. Before building, read the top of `docs/RELEASES.md`: when main carries work held from production, cherry-pick the approved change onto the live release, tag it `release/orchestra-<name>-<date>`, push the tag and build with `ref=<tag>`. From a worktree of infra origin/main, `make build-release app=orchestra [ref=<tag>]`, then `make release app=orchestra artifact=<printed path> target=hyperdrift_new`, then read the live page back. Since the 30 October cutover `make deploy` reaches the old host, which serves no traffic. A static build leaves out an article whose `publishedAt` is later than the build, so build after that moment. GitHub Actions only verifies. Never widen runner access to this public repo. UI changes deploy after the founder's yes on a preview. Record each release in `docs/RELEASES.md`.

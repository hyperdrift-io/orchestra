# Orchestra

> Inherits `~/dev/hyperdrift/AGENTS.md`.

Offer, audience and register: `MISSION.md`. History: `docs/RELEASES.md`, `docs/decisions/`.

## Stage and host

Promoted: Orchestra is no longer a POC. The canonical host is `orchestra.hyperdrift.io`. `ai.hyperdrift.io` stays as a permanent 301 that keeps path and query (nginx alias in `infra/group_vars/apps.yml`), so every link ever sent still works. Code, canonicals, sitemap, `llms.txt`, feeds and share cards name the new host. Every page carries Organization and WebSite JSON-LD naming Orchestra AI, with Hyperdrift as the parent organisation.

Analytics: PostHog project 206943 (EU). Filter on `app=orchestra` and both hostnames when reading across the 9 October 2026 move. No session replay, form autocapture, contact text or person profiles. Capture runs only on the production host, so previews send nothing.

## The site now

- **Home** opens on the business graph, then its two offerings, Traction and "Embed your app on Orchestra OS", then one door at the end.
- **`/traction`** holds the offer, partnership scope and purpose; `/partnership` and `/traction/why` redirect to its `#partnership` and `#why` sections. First reads are optional. `/traction/first-read` publishes a real first read of this site with its evidence and disclosure; keep both. `src/data/traction-offer.ts` is the one list behind the offer wherever it appears. Films and board loops show fictional data or Traction's own launch; never record partner app data in frame.
- **`/os`** is Orchestra OS: the pinned sphere moves through six scenes as the reader scrolls, then the record, the map, field notes and the door. `/how-it-works` without `?view` 308-redirects to `/os`; the business loop stays at `/how-it-works?view=business`. It's an illustrative target model, so automatic enrolment and complete security repair are never claimed as demonstrated.
- **`/work`** shows eight examples in three groups (`workGroups` in `src/lib/proof.ts`): reach people in their assistant (NextRole); find customers and follow through (Traction, First read, uk.gov Radar, Unanswered); run work with clear decisions (Helm, Standup, Bridge Voice). `/mcp-maker` and `/services/mcp-maker` redirect to `/work#work-nextrole`.

Every animated scene keeps pause, reduced motion, a static fallback and readable controls.

## Claims

- NextRole is owned-product proof with fictional-data live checks, not a client success or proven adoption. Client engagements are Everything and VodafoneThree (through Tecknuovo).
- Together and Revela are partner ventures, not client endorsements.
- Contest entries are participation, never a commission, endorsement or award. Each contest case fills `challenge` in `src/data/case-studies.ts` (organiser, exact event, official URL, evidenced stage) from the HD workspace's `.growth/contests/ledger.jsonl` and the event page. Never expose a private repository as a public demo.
- Illustrations, including the graph's growth iterations and the `/os` scenes, aren't forecasts or client results. Label invented examples.
- No prices or terms on any page.

## Copy

All words follow `hd-content-writer`; articles also follow `docs/editorial/ARTICLE-STANDARD.md`. New customer-facing words go through the founder's review before release. Register: `MISSION.md` → How we communicate.

One door per page, after the proposal. No call to action beside a title or in a header, no reply-time promise. Door words live in `src/data/site-door.ts`; `/traction` asks the founder to introduce their app.

## Enquiry and invitations

Every enquiry is saved by this app's `/api/contact`, then relayed to HD `/api/contact`. HD `/api/enquiry` posts here; keep the two HD routes distinct or the relay loops. Notifications carry the saved enquiry ID and validated campaign tags. Optional `handoff` context and `product_url` are visitor hints, not proof of identity or qualification, and relay acceptance isn't proof the mail arrived. Never count preview submissions as leads. Isolated runtimes set `CONTACT_DELIVERY=preview`.

Private invitations live at `/traction/invitation/<token>`: an opaque token resolved on the server from a registry outside Git (`TRACTION_INVITATIONS_FILE`; local copies stay in `.local/`). They're no-store, no-referrer, noindex and outside analytics, grant no app access and prefill only the details authorised for them. Never put contact fields in query strings or browser storage, or read the production database on a public page load.

The modal reads **Get in touch**, plain field labels, **Message**, **Send message**. Known details stay editable and survive close and reopen. Desktop focus starts at the first missing required field; touch starts at the heading.

## Brand and art

Decorative art is WebGL `MeshArtwork` over inline SVG fallbacks, no bitmap brand art; behaviour contract in `docs/editorial/ARTICLE-STANDARD.md`. The Mesh Aperture mark: `public/brand/orchestra-mesh.svg` for large placements, `orchestra-mesh-compact.svg` for masthead, footer and cards, `src/app/icon.svg` for the favicon. The wordmark stays live text. Pages with their own Open Graph object include `brandShareImage` from `src/lib/share-metadata.ts`. Real recordings and screenshots stay separate from editorial art. In development, `?mesh=fallback` exercises the fallback path.

## Articles and links

Article reading and public links: `article-experience` skill. `src/lib/article-experience/` is generated from `packages/article-experience/`; never edit it here. Unpreviewable external citations render as text (`citationStaysText`).

Article finder: `src/lib/article-search.ts`; a tag page is indexed from three articles (`INDEXABLE_FROM`).

Articles are `content/articles/*.md` plus `src/data/articles.json`, with `publishedAt: null` until publication is approved. Drafts render only in development or an `ARTICLE_PREVIEW=true` build and stay out of the sitemap, `llms.txt` and `/feed.json` and `/feed.xml`; feeds never carry lead data or private Traction records. Dates are honest: sitemap `lastModified` comes from the article, never the build.

## Commands and release

`npm run dev` (port 3108), `npm run test:ci` (typecheck and Vitest), `npm run build`.

Release: commit to main and push; from a worktree of infra origin/main, `make build-release app=orchestra`, then `make release app=orchestra artifact=<printed path> target=hyperdrift_new`, then read the live page back. Since the 30 October cutover `make deploy` reaches the old host, which serves no traffic. A static build leaves out an article whose `publishedAt` is later than the build, so build after that moment. GitHub Actions only verifies. Never widen runner access to this public repo. UI changes deploy after the founder's yes on a preview. Record each release in `docs/RELEASES.md`.

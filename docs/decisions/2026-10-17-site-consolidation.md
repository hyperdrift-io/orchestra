# Orchestra consolidation — reviewable preview, 17 October 2026

The founder approved implementation after the site/design/indexing audit. This revision keeps the ink, cream, gold and constellation identity. It concentrates the offer and evidence, and makes article answers easier to reach on phones. No visitor profiling or new dependency was added.

## Preview and wording to review

- `/traction`: the existing welcome, film and explorer remain. Partnership scope and purpose are now sections on this page; the full purpose is an optional disclosure. First reads remain optional. The former standalone partnership component and unused numbered offer-step presentation are removed.
- `/partnership` permanently redirects to `/traction#partnership`; `/traction/why` redirects to `/traction#why`. Internal links and sitemap use the destinations.
- `/work`: three practical entry points group all seven existing demonstrations. NextRole remains first. Integration detail is folded; the live check and its limitations remain available. Traction's old recording is labelled as launch evidence rather than the current onboarding path.
- `/about`: identifies Yann VR as Hyperdrift's founder and brings the existing, accurately attributed engagement/partner evidence forward. Service copy retains the collective voice.
- `/traction/first-read`: preserves the 6 October assessment and adds a 17 October follow-up. Changed UX is not presented as conversion uplift.
- `/articles`: three broad topics plus More topics; all articles remain searchable. The historical launch log moves to the footer. Mobile contents fold after hydration; no-JavaScript contents stay open. Publication/update dates sit beside the author; existing dates are unchanged.
- `/llms.txt`: both current offers are generated from the same service data as the home page. Sitemap omits the two redirect routes and no longer claims a homepage update on every build.
- WebMCP article: distinguishes Chrome's experiment from the draft's 8 October removal of declarative APIs, and changes the next-reading label from Traction to First Officer. Source labels corrected; both published paragraph IDs retained. Original publication and review dates remain unchanged pending release.

## Verified evidence

Local preview: http://127.0.0.1:3118/traction. Contact delivery is local preview only.

Node 22 release gate: type check and 26 existing tests passed; production build passed. A local production HTTP audit found all 28 sitemap URLs returned 200, self-canonical, indexable, with one H1. Both consolidated routes returned 308 to their intended sections. Invalid invitation routes retained private/no-store, no-referrer and noindex headers. Valid private invitations were not exercised. Browser review covered mobile article search, contents expansion/anchor navigation, retained paragraph anchors, desktop work/Traction, and optional first-read modal fields. No enquiry was submitted. Generated shared reading components were unchanged.

Detailed local evidence: `.local/verification.log`, `.local/release-verification.json`, `.local/review/`. These are local runtime artifacts, excluded from Git.

## Current search position and release boundary

Live Google inspection at approximately 15:55 UTC on 17 October: 25/30 sitemap URLs indexed. All 30 passed live HTTP, canonical and noindex checks. Follow-ups: `/traction/first-read` and `/traction/why` unknown; operations and permissions tag pages still reflect Google's old noindex crawl; `/articles/voice-through-mcp` is crawled, currently not indexed. A sitemap is discoverability evidence, not proof of indexing or answer-engine citation. Bing/IndexNow coverage remains unverified.

The existing daily visibility monitor is being corrected independently in the workspace: current directives versus historical crawls, persistent per-URL observations, explicit unindexed URLs, and honest sample reporting. No new scheduler is created.

This app revision is a checked preview, not a production deployment. Founder review covers the exact revised words and layout. On publication approval: set the WebMCP article's actual substantive `updatedAt` and review metadata, run the existing article/release gates, deploy the approved revision through infra, submit the updated sitemap, and verify production pages and redirects. Never set unrelated article dates or claim a Google recrawl before its inspection evidence arrives.

Sources checked on 17 October: [Chrome guide](https://developer.chrome.com/docs/ai/webmcp), [immutable WebMCP specification change](https://github.com/webmachinelearning/webmcp/commit/14ae813cc4e9fe0d39313f4b1ee5b231746731ad). Correction wording originated in the workspace's 12 October editorial correction packet.

## Publication authorized — 18 October 2026

The founder reviewed the preview and instructed: “push everything live”. This approves the revised public wording, redirects, layout and editorial corrections in this record. The WebMCP article retains its original 6 October publication date; its substantive modification is dated 18 October 2026. The two primary sources were checked again on 18 October and still support the correction. Release proceeds through exact-revision CI and the clean infra origin/main worktree. Final deployment/readiness and discovery receipts are recorded below when verified.

## Production release — 18 October 2026

The founder authorized this release with “push everything live”. The reviewed revision was integrated onto the newer graph-first homepage and dedicated `/os` release, preserving both. App revision `b0ddfe4eb2c4b01cd415cd115b806ca3a77e0f8c` is tagged `site-consolidation-2026-10-18`; infra was clean `origin/main` at `ee8b191d2edeb0ef621459c40d4171e73dbb6e4a` in an isolated worktree.

- [Exact-revision CI](https://github.com/hyperdrift-io/orchestra/actions/runs/39173435394) passed TypeScript, the existing tests and the production build.
- `make deploy app=orchestra` passed: 27 ok, 7 changed, zero failed/unreachable. Post-deploy integrity: 5 ok, 2 changed, zero failed.
- Server Git SHA matches the release. PM2 is online with the new process/build; build `O9qCkZQq1HBJfZzryYfWg` was served with HTTP200 and zero process restarts.
- `make check-launch-readiness app=orchestra`: 10 passed, zero failed, one existing warning because the app-level GSC field is empty. The domain property is separately verified; this warning does not indicate missing domain coverage.
- All28 sitemap URLs were independently fetched from the canonical host: HTTP200, one H1, self-referencing canonical, no noindex. The sitemap includes `/os`, omits all three redirect sources, and does not stamp a homepage lastmod from build time.
- `/partnership` →308 `/traction#partnership`; `/traction/why` →308 `/traction#why`; `/how-it-works` →308 `/os`.
- Live `llms.txt` names both current offers; the WebMCP article serves the corrected product name, modification date, original publication date and preserved paragraph anchor. No contact form was submitted by this release verification.
- Today's successful [daily BAU run](https://github.com/hyperdrift-io/hyperdrift/actions/runs/39118967649) produced the new per-URL monitor schema. Its pre-release sample observed 20 of the former30 URLs: 18 indexed, 2 not confirmed, 10 uninspected. This is a dated sample, not a full current indexing count. The existing scheduler is retained.

Local receipts are under `.local/release-2026-10-18/`: CI, deploy, readiness, runtime, sitemap submission, editorial review and the 28-page live audit. The editorial scan found the corrected WebMCP article passed; its sole other flag treats Helm's Commander role as an old product name. Product/runtime lineage is intentionally retained rather than mechanically renaming a distinct demonstration.

Sitemap submission succeeded through the supported repository CLI under `sc-domain:hyperdrift.io`. Google’s last recorded fetch was still 17 October at submission time; a new crawl/indexing result is left to the existing visibility monitor. The server’s short `hd` command resolves to system hexdump, so the absolute repo wrapper was used successfully without changing host configuration.

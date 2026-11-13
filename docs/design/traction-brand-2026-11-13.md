# Official Traction identity — 13 November 2026

Yann approved the round-10 sail and round-15 flowing wordmark. The source masters, reproducible exports and file hashes are owned by Traction. Orchestra carries the same `public/brand/traction` pack.

Prepared integration:

| Surface | Change |
| --- | --- |
| Home | Featured founder article, with bridge artwork and the official lockup; existing benefit heading retained in Services |
| `/traction`, `/traction/how-it-works`, `/traction/partnership` | Official lockup, Traction favicons and versioned 1200 × 630 sharing image; `/traction/why` retains its redirect |
| Founder motivation, agent-driven UI, hands-free control, voice-through-MCP articles | Traction masthead, icons and branded versioned OG render; body, author and historical evidence retained |
| `/articles/traction-from-zero` | Logo and share card; October three-founder target labelled as launch history, retired invitations replaced with the current offering |
| Existing `/traction/og.jpg` | Replaced with the official branded card for older links |
| Orchestra identity and unrelated articles | Retain their own subject and Orchestra branding |
| Historical trailers, screenshots and walkthroughs | Retained as dated evidence; re-recording remains separate work |

The founder article is already live (HTTP 200 verified on 13 November). Its new hero artwork and this brand integration remain a preview. The homepage feature uses the existing article, preserves Yann's first-person argument, and makes no claim of measured growth or limited availability. The existing company announcement sender and schedule are unchanged.

Preview: `http://localhost:3131/#traction-feature`, `/traction`, `/articles/give-motivated-founders-a-fair-chance`. Type checking, 82 tests, desktop/390/320 px rendering and the four actual article OG endpoints passed. No horizontal overflow, broken images or browser page errors were observed. Independent editorial review accepted the assembled feature, article masthead and sharing image. Local captures are in `.local/brand-review`.

Release awaits founder review of the integrated pages. This preview deliberately leaves the other active editorial cover work in its own checkout; reconcile that work before any release. No social message or deployment occurred here.

## Production release

Yann authorised both releases on 13 November, retaining open trials with rate and spending controls. Orchestra was released at 23:39 UTC independently of the pending Traction controls. The installed base was read from production as `1f140181f4fbe0a13140e2035229c9598a886a3a`. Candidate `d0482072ae550be3a8f1b4e9bf3fe3c1a1a51be1` contains only that base and approved `d289b62`/`7578006`; held UI/analytics and separate editorial work are excluded. The historical delivery README conflict retained the verified 12 November record.

Pushed tag: `release/orchestra-traction-brand-2026-11-13`. Artifact: `orchestra-d0482072ae55-20261113T2335.tar.gz`; SHA-256 `731b6da78f2416472219ed6437a426062de22b31ed4eabee876fb6a552c648f1`. Built with infra `7f84b1c` in Linux x86_64; artifact metadata confirms the exact source. Build/type checks and all 70 release-base tests passed. Existing dependency audit findings remain: 3 moderate, 2 high and 3 critical; dependencies were unchanged.

Release: 19 checks, no failure. Isolation: 11 checks, no failure. Launch readiness: 10 passed, zero failed, one existing GSC configuration warning. Live desktop, 390 px and 320 px checks of the homepage feature, offering and founder article found no overflow, broken images or page errors. All four Traction article sharing images returned PNGs; the actual founder card and phone feature were visually inspected. Six served icon/logo/OG assets match source hashes. Canonical URLs, sitemap and robots were read back. Orchestra, Commander and engine runtime environment hashes are unchanged.

`hd growth sitemap orchestra` was accepted under the existing Domain property; Google last fetched the sitemap on 12 November. Submission does not establish subsequent indexing or growth. No social announcement was sent. Evidence: `.local/evidence/traction-brand-release-20261113/` in the Orchestra identity worktree. Recovery: confirm the retained `orchestra-1f140181f4fb-20261112T1642`, then `make rollback app=orchestra target=hyperdrift_new` from the clean infra release checkout.

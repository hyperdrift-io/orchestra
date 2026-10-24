# Integrated Fleet candidate verification — 24 October 2026

Approved by Yann on 24 October 2026; `publishedAt: 2026-10-24T02:11:00Z`. The title is Yann’s exact proposal: “Here’s the new deal. UI is for intel. Agents are for operating.” The original and negative-headline drafts were rejected; their technical checks did not establish editorial quality. The current wording is the [release candidate](RELEASE-CANDIDATE.md); these checks were run on it after the 24 October editorial pass.

The body has 427 words. The pass read the full body, title, search title, excerpt, OG title/description/image, mesh alt, visual labels, caption, test details, tags, door and invitation through hd-content-writer. The result is a reviewer’s judgement, not Yann’s acceptance.

- `check_copy.py` on the body, the catalogue strings and the visual component: no listed wording.
- `npm run typecheck` passed after the catalogue change (tag and `reviewedAt` removed, read-next changed).
- Served preview: exact headline; `noindex, nofollow`; canonical `https://orchestra.hyperdrift.io/articles/agent-driven-ui-intelligence-and-action`; OG/Twitter title and description match the candidate; one `#article-proof`; no leaked visual marker; no console errors; no horizontal overflow at 390px.
- Internal links return 200 on the preview: `/articles/the-first-officer`, `/articles/app-operations-after-launch`, `/articles/integrated-fleet/local-recovery.json`.
- Primary visual and public evidence JSON describe the local Stack One recovery test only: three failed checks, retained release restored, response verified. No production deployment or model decision is implied.
- Captures refreshed from the candidate: `desktop-preview.png` (1280×900, headless Chrome), `phone-visual.png` (390px viewport, Playwright element capture), `opengraph-preview.png` (served 1200×630), `visual-export.png` (740×581 element crop, also copied to `public/articles/integrated-fleet/intelligence-ui-loop.png`).
- Existing preview-mode llms.txt includes drafts; normal production filters them. Do not deploy this preview configuration. Release discovery, current sources and the enquiry journey require their normal production checks.

Preview: http://127.0.0.1:18194/articles/agent-driven-ui-intelligence-and-action

Local launch: `CONTACT_DELIVERY=preview ARTICLE_PREVIEW=true ENQUIRY_DATA_DIR=/private/tmp/orchestra-intel-ui-enquiries NEXT_OUTPUT_DIR=.next-check/intel-ui-preview npm run dev -- --hostname 127.0.0.1 --port 18194`.

Live read-back after deploy is recorded below when it happened; no announcement or enquiry submission occurred. Infrastructure migration is independent of this article.

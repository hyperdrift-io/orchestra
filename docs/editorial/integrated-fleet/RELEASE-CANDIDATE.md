# A peek into Traction — release candidate 2, 24 October 2026

Rewrite for Yann's wording review. Not deployed: the live page still carries the first version until he approves. The Orchestra GM owns the release time and the announcement slot (Traction work `86194210947a46a8a977692e5d17c7b0`, Yann's direction in source `source-fe10bfc6e9a63477ab4440de114bd814`).

Yann's direction: the first version was boring; Stack One and First Officer made no sense. Use one example, Traction's 24 October release, where the board presents the intel and the agents do the work, with real screenshots: a peek into Traction, worth a buzz.

## What changed

- **Body rewritten** around that release and one real morning on our Orchestra board (362 words). Stack One, the local repair test, First Officer and the cloud-provider line are gone.
- **Both drawings retired.** The figure is four real screenshots from our Orchestra board in Traction, 24 October 2026, cropped and not edited: the Growth Manager composer, a request saved at 04:45, the GM working at 04:47, and the Builder's verified result from 04:30. The rail mirrors the board's own progress strip; it plays while on screen and stops when a reader picks a step.
- **Kept:** Yann's title, the URL and `publishedAt`. Header mesh unchanged.
- **Metadata:** search title "UI is for intel. Agents are for operating. A peek into Traction"; topic "A peek into Traction / Traction"; door "Discuss your app"; tags agents, ui, operations.
- **Close button:** the source preview's "Close preview" text is now a × button with the same accessible name, in the shared article-experience package.

## Exact copy

Body: [content/articles/agent-driven-ui-intelligence-and-action.md](../../../content/articles/agent-driven-ui-intelligence-and-action.md). Figure: `src/components/visuals/TractionPeek.tsx`. Entry: `src/data/articles.json`.

| Surface | Candidate |
|---|---|
| Title | Here’s the new deal. UI is for intel. Agents are for operating. |
| Excerpt, description, OG description | A peek into Traction’s 24 October release: the board shows what the Growth Manager and Builder are doing and what they delivered. The agents do the work. We decide what becomes work. |
| Share line (OG headline) | UI is for intel. Agents are for operating. |
| Figure steps | You ask · One box / Saved · 04:45 / GM working · 04:47 / Delivered · Builder |
| Figure captions | A question investigates and changes nothing. A proposal comes back for review. A work request authorises action. · 04:45. The request is saved on the board before anything runs. Everyone looking at the app sees the same state. · 04:47. The Growth Manager reads the app’s evidence and decides. The strip moves on its own while the page is open. · Earlier that morning, at 04:30, a Builder result landed on the same board with its evidence in the receipt. It repaired the links pointing to this article. |
| Figure takeaway | One board, one request, the agents doing the work. Screenshots from our Orchestra board on 24 October 2026. |
| Invitation | Tell us what you run and what still needs your attention. We’ll show you what your board and its agents would take on. |

## Facts behind the copy

Release: Traction app `acba907e` and `d7d1bc09`, live 24 October ([release record](https://github.com/hyperdrift-io/traction/blob/main/docs/releases/2026-10-24-gm-review.md)). Morning: Orchestra conversation message 04:10 (campaign instruction), GM answer 04:17 with Builder work `3869845d32134c57a22b5d0e70b50d22`, Builder result 04:30 (Orchestra `69e0b9b`). Screenshot request: 04:45, GM working 04:47. The screenshots exclude contact names, prospect commitments, traffic numbers and the receipt lines after the link checks.

Checks on the branch: type check, 32 tests, no page errors, no horizontal overflow at 1280 and 390px. They are not acceptance.

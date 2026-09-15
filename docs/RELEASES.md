# Orchestra versions

One row per tagged version of ai.hyperdrift.io, plus what production actually serves. Newest first.

| Version | Git ref | Date | Status |
|---|---|---|---|
| **Current:** On the shoulder | tag `on-the-shoulder-2026-09-15` | 15 Sep 2026 | Local preview. Not merged, not deployed, not pushed. |
| **Previous:** Stage entry, round B | tag `stage-entry-b-2026-09-14` (commit `bd692ac`) | 14 Sep 2026 | Local preview. Not merged, not deployed, not pushed. |
| **Live production:** Concert Hall original | `origin/main` at `011cf42`, untagged | 31 Aug 2026 | Served at https://ai.hyperdrift.io (verified 15 Sep 2026: title "Agent orchestration for production AI workflows"). |

Production deploys from `main`. A tag only marks a reviewable state; merging and deploying need the founder's go.

## Current: `on-the-shoulder-2026-09-15`

**What it is.** The founder's approved redesign: a stone giant carrying the founder through golden country toward prosperity. Five screens approved on 14 September: first screen, the four places, the proof, the enquiry, and a phone first screen. Every word is live HTML over text-free art.

**What changed since the previous tag.**
- Identity replaced: Concert Hall × Lab Notebook retired after six concept rounds (`docs/design/2026-09-14-redesign/`, decisions in `SELECTION.md`).
- Implemented (`2c1c0b4`, fix `cc6997e`): four places as native radios that light the chosen place; proof markers on the footprints tied to the contest entries; Now playing; folded programme; enquiry with the Traction Partnership beside the form. Stylesheet rethemed to warm night and dawn gold, Cormorant Garamond via `next/font`.
- ScreenCraft packets, text-free art and masks committed in the design folder.
- Tag also carries the paused next-iteration brief, `docs/design/2026-09-14-redesign/BRIEF-HYBRID-PAGE.md`.

**Gates passed.** Typecheck, 20 unit tests, `next build`; desktop 1440 and phone 390 checked against the approved images, no horizontal overflow.

**Known issues, addressed by the next iteration.**
- Conversion: no offer on the first screen, three art-heavy bands with no call to action, proof below the art.
- Contrast below WCAG AA over bright art: masthead links, "Choose where you are", the four place labels.
- No analytics wired.
- Standup's stage still reads "Built for the challenge"; it was submitted on 14 September.
- "Sponsored by Databricks" in the partnership terms has no evidence on file and is to be removed.

**Preview.**
```bash
git worktree add ../orchestra-on-the-shoulder on-the-shoulder-2026-09-15
cd ../orchestra-on-the-shoulder && npm ci && npm run dev   # http://localhost:3108
```

## Previous: `stage-entry-b-2026-09-14`

**What it is.** The original Concert Hall × Lab Notebook identity with a "which one are you?" front door (design round B, `docs/design/2026-09-14-stage-entry/`).

**Contents.** Preview content (`23676a4`): anniversary link, Standup first, five contest cards with organiser credit, MCP integrations. Stage entry (`bd692ac`): four situations as native disclosures, dated Intel and latest writing, visible partnership, folded long movements, prefilled enquiry.

**Superseded by** the founder's request for a brand-new redesign on 14 September.

## Next

The hybrid page, "the giant opens, the work leads" (`docs/design/2026-09-14-redesign/BRIEF-HYBRID-PAGE.md`). Sections 1 and 2 approved; sections 3 to 6 open; concept images for the new layouts come before any implementation.

## Convention

- Annotated tags named `<design-name>-<yyyy-mm-dd>` on the Orchestra repo, one per reviewable state.
- Add a row and a section here in the same commit as the tag.
- Tags stay local until the founder approves pushing; production is whatever `main` last deployed.

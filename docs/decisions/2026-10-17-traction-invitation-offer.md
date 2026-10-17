# Traction invitation journey — local preview, 17 October 2026

## Accepted direction

Traction is an AI CRM and growth strategist. A founder arriving from Yann’s personal invitation should find a personal welcome, a concise explanation and an explorable example of the work. Small headings, short paragraphs, no numbered marketing sequence, founder counter or launch log. First reads are an optional action near the end, opening a modal; they are not a compulsory first step.

The approved email wording remains the source of voice. The newest promise is: “I’ll tailor the process to your goals, so we can see what gets people interested and turn them into active users.” The ten saved prospect drafts use related sentences grouped into paragraphs, with separate greeting and signature. Shaping Traction through feedback belongs on the welcome and founder letter rather than extending those emails.

## Founder purpose

**Latest refinement:** Orchestra speaks as **we**, while Yann’s personal emails stay **I**. The private invitation page already welcomes a selected founder and now moves straight to the next step for their named product, without recycling the email or conditional fit language. The separate generic `/traction/why` explains our conviction that there is a short window for good ideas to reach their market, why we are keeping the group small and the commitment to act today. The timing statement is our belief, not a fabricated deadline; no slot count or membership result is claimed. Yann’s experience is attributed to him rather than invented as a team history. The earlier signed-letter presentation below is superseded by this generic purpose page. Existing invitation registry entries remain compatible; their older email-like `welcome` text is preserved but no longer rendered. No saved email drafts or production data changed in this refinement.

Yann clarified that this service is personal: after 25 years he has seen good ideas, including his own, never reach their audience. He wants founders to help each other give worthwhile work its chance and avoid wondering what could have happened. Invite involvement and honest feedback. He rejected the defensive sentence about not asking for money; omit money from this introduction and keep the focus on their app and shared purpose. The page and sender guidance follow that correction.

`/traction/why` is the short signed letter, shared through `TractionWhy` with the welcome page’s in-place reader. “Why I’m doing this” uses the existing `LinkPreview` with full owned React content; closing it returns to the personal invitation. The standalone page remains noindex and out of the sitemap pending publication review. No new shared reader implementation or dependency. The letter uses only Yann’s supplied experience, without invented anecdotes or results. The welcome, Traction enquiry copy, mission and agent guidance carry the same motive.

The latest sender/board email guidance was saved and read back through the normal production comment operation. The approved example and public service URL remain intact; existing prospect drafts were not rewritten by this slice. Private receipt: `.local/evidence/founder-purpose-guidance.json`. No message sent. The earlier oversized guidance save was rejected by the 2,000-character comment bound; the concise replacement saved successfully.

The new page and reader were checked at desktop and 390px: native link activation and Enter open the reader, Escape returns focus, and the page has no horizontal overflow. The page CTA opens the existing enquiry modal with Traction context. The first inspection caught a masthead overlap; the page now uses the existing in-flow masthead selector. No browser errors on the final letter page. Screenshots: `.local/evidence/founder-letter-{desktop,mobile,in-welcome,reader-mobile}.png`. Preview tag: `traction-founder-letter-preview-2026-10-17`. Release checks remain deferred to the release gate.

The collective-voice refinement was read back in the local preview: generic purpose, personal product greeting, next-step modal and plural first-read copy. Current screenshots use `.local/evidence/traction-purpose-*.png`; release checks remain deferred for this copy-only revision.

## Get in touch and known contact details

The founder requested editable name, email and company prefills and corrected the app-introduction framing. The invitation now offers **Get in touch → Send message**, uses a plain Message field and omits the first-read prompt. Existing `#first-read` links on an invitation resolve to the conversation form. Generic offering visitors retain the optional first-read route, with an Ask for a first read heading.

`EnquiryForm` and `EnquiryDialog` accept an optional `ContactPrefill`, validated through the existing contact schema. As articles already do, the server-rendered invitation supplies its own contextual instance of the same dialog; `SiteEnquiryDialog` skips the invitation route. There is exactly one dialog. Full name, email and company are optional in the private registry; missing name/company fall back to the known first name/product, and missing email stays blank. Contact details are scoped to that opaque invitation, never query strings, metadata, browser storage or analytics. Anyone holding the private invitation link can see its intended contact prefill; it still grants no workspace access. Production registry provisioning must include only the recipient details approved for that invitation.

All ten local registry entries were populated from a read-only Traction board snapshot; nine have a known email. A private backup precedes the change. No production record changed. Browser checks covered a populated invitation, the unknown-email case at 390px, edits surviving close/reopen, exactly one dialog, and empty fields on the generic purpose page. A synthetic submission saved the edited name/email/company with `delivery: preview`; no email sent. Receipt: `.local/evidence/contact-prefill.json`, screenshots `traction-contact-{prefilled,mobile}.png`. This is a prototype flow check; release tests remain at the release gate.

## Compact contact form — founder refinement

The visitor already has a reason to contact us. The shared modal now uses **Get in touch**, **Message** and **Send message**, without an introductory pitch or guided question. Smaller spacing, sentence-case labels and a name/email row keep the form compact; on phones fields stack and the dialog fits its content instead of filling the screen. Contact defaults remain editable. On desktop the first missing required field receives focus, so a known invite starts at the message; touch retains heading focus to avoid opening the keyboard immediately.

Live preview: the invitation dialog measured 576 × 477 px in the 621 × 984 pane, and 352 × 592 px at a 390 × 844 viewport. Both show the send action without internal or horizontal scrolling. Escape returns focus to the opener; close/reopen retains a draft. Generic contact fields stay blank, and switching first-read/conversation modes still works. No submission or production write was needed for this layout change. Private evidence: `.local/evidence/contact-compact.json` and `traction-contact-compact{,-mobile}.png`. Review tag: `traction-contact-preview-2026-10-17`; release checks remain pending.

## Whole growth partnership — founder refinement

The founder judged “Take a look inside” too narrow. The section now explains help with the whole customer journey: direction and positioning, relationships, first useful product experience and continued value. The existing four-area interaction is retained, but each area leads with what we work on with the founder. CRM research, introductions and follow-through sit within Customers. Product improvements and meaningful engagement measures are explicit. The page eyebrow and public metadata use “A growth partner for your app”.

One fictional studio app illustrates each area through an optional native disclosure. It is not a client result or a claim that every action runs autonomously. AI prepares research, drafts and recommendations; the scope of hands-on work is agreed together. No new backend capability, dependency or production change. Existing contact entry points and invitation prefills remain.

All four area controls and the example disclosure were checked in the live preview. Desktop at 1280px uses the existing two-column layout; 390px stacks without horizontal overflow. The illustration is collapsed initially to keep the offering concise. Local screenshots: `.local/evidence/traction-partnership-{desktop,mobile,invitation}.png`. Review tag: `traction-partnership-preview-2026-10-17`. Full release checks remain pending; nothing deployed or sent.

## Implementation

- `/traction` presents the public offer. `/traction/invitation/[token]` presents a reviewed personal welcome, without names or emails in query parameters. Both share the compact page and a clearly fictional, interactive example of research, email preparation, follow-through and strategy.
- Invitation tokens are random 32-byte values. `TRACTION_INVITATIONS_FILE` points to a private JSON registry keyed by the SHA-256 token digest. The page receives the first name, product and optional approved contact prefills; older welcome copy is retained for compatibility but not rendered. This is a welcome link, not authentication or Traction workspace access. Invalid/missing entries return 404. Remove a registry entry to revoke its welcome link.
- The registry and raw link list are ignored local files with mode 0600. They must never be committed, served as assets or included in the sitemap. The page is dynamic, no-store, no-referrer and noindex; metadata contains no personal name. Invitation paths are excluded from analytics, including history events and referrer paths.
- The existing article enquiry dialog now also serves the home, work, partnership, offering and other non-article routes. Articles retain their contextual dialog. First-read and conversation modes share the existing form, validation and delivery. Native dialog focus, Escape and return to the opener are preserved.
- No dependency, account-access or delivery API change. The personal welcome has no production DB read. Anyone holding the private link can see that invitation's approved name, email and company prefills, without access to the wider contact board.

## Observed locally

The preview on port 3070 was checked in the browser at desktop and 390px. All four walkthrough views work. Public and personal headings differ correctly. First-read and conversation links open in place; partnership context and article context remain available. Escape and the close button restore focus. Switching modes clears the previous submission status. A synthetic first-read submission returned “Preview enquiry saved locally. No email was sent.” and stored the URL and first-read context with delivery `preview`.

HTTP checks returned 200 for a valid invitation and 404 for an invalid one, with no-store, no-referrer and noindex headers. The final welcome page showed no browser errors. `git diff --check` passed. Private screenshots and local receipts are in `.local/evidence/` and `.local/enquiries/`.

This is prototype preview evidence. Production build, type check, existing suite and deployment readiness belong to the release gate and have not been run for this slice.

## Continuation

Checkout: `apps/.worktrees/poc/orchestra/codex-traction-invitation-offer`, branch `codex/traction-invitation-offer`, review tag `traction-invitation-preview-2026-10-17`. Machine-specific launch and registry paths are in `.local/RUNTIME.md`. Traction’s canonical `PROJECT.md` and `docs/HANDOFF.md` link here.

No code was deployed and no mail was sent. Saved prospect drafts still link to the live public offering URL; no localhost or not-yet-published invitation URL has been inserted. Before a release, reconcile upstream, run the release gate, provision the reviewed private registry outside the deploy checkout, verify personal links on the deployed origin, then update draft links. Independently verify client onboarding and AI access; this example is not proof that a new client can complete that journey.

## Production approval and consistency review — 17 October 2026

The founder explicitly requested consistency review, commit and ship. This supersedes the preview-only boundary for the reviewed Orchestra site and its private invitation journey; it does not authorise outbound prospect mail or deployment of the separate Traction Customers app/engine. Service pages now speak collectively, including reply and research-review copy. The home/about summaries and optional first-read route describe the same wider partnership. Individual client provenance stays accurately attributed to the founder, without presenting all service delivery as his alone. Personal email drafts remain unchanged.

The generic purpose page is now indexable and included in the sitemap and assistant-readable navigation. Private invitation paths retain noindex, no-store, no-referrer and analytics exclusion. Production provisions the reviewed registry through encrypted infrastructure configuration outside the app checkout. Release checks and live read-back must complete before this is recorded as shipped.

## Production release — 17 October 2026

**Ready.** Deployed app `35bad2fcf090b042f6b0ef87f95747459f3338a6` through clean infra `ee8b191d2edeb0ef621459c40d4171e73dbb6e4a`. Both revisions were pushed to their repository's main branch. Release tag: `traction-partnership-2026-10-17`. This release supersedes the earlier preview-only statements for the Orchestra site. The separate Customers app/engine remain local; no outbound email was sent or prospect draft changed.

- Isolated production build and type check passed without disturbing port 3070. Exact-SHA [CI](https://github.com/hyperdrift-io/orchestra/actions/runs/39001363706) passed typecheck, 26 existing tests across six files and build.
- Scoped Nginx provisioning passed (25 tasks OK, two changed, zero failures), followed by `make deploy app=orchestra` (27 OK, nine changed, zero failures) and deployment integrity (five OK, two changed, zero failures). PM2 was online with zero restarts and the exact deployed source revision.
- `make check-launch-readiness app=orchestra`: ten passed, zero failures, one existing app-field GSC warning. `/traction`, `/traction/why`, sitemap and llms.txt returned 200. The public purpose page is indexable and listed; private invitation paths are excluded.
- The ten-entry reviewed registry is vaulted in infra and copied atomically outside the public checkout, mode 0600, before activation. Valid/invalid invitations returned 200/404 respectively, each with exactly one `Cache-Control: private, no-store`, `Referrer-Policy: no-referrer` and `X-Robots-Tag: noindex, nofollow, noarchive`. Invitation access logging and proxy caching are disabled. Scoped Nginx headers preserve the existing security headers; a shared proxy header must not override the stricter invitation policy.
- Independent production browser review confirmed collective service copy, the exact shared-purpose paragraph, generic blank contact fields and the named invitation. Its single modal had editable name/email/company prefills, focused Message, and returned focus to Get in touch on Escape. No form was submitted. Local screenshot: `.local/evidence/traction-live-2026-10-17.png`.

No open blocker was found in the published offering/contact-entry path. Actual inbox delivery was not retested with a synthetic production message; existing transport is unchanged. A selected founder's separate app onboarding and AI access remain an independent acceptance gate. The page demonstrates the partnership, not a claim that this client journey has been exercised.

Google accepted the canonical sitemap submission under the existing `sc-domain:hyperdrift.io` property. Its last fetch was 15 October at verification, so this does not prove the new purpose page is indexed. The growth doctor confirmed PostHog configuration, query access, project 206943 and existing page-view ingestion. Its obsolete `<Analytics/>` component expectation and disabled-replay warnings are not release blockers: the current integration uses `instrumentation-client.ts`, and replay is deliberately disabled by the measurement/privacy contract.

Observe genuine replies, qualified conversations and enquiry failures under the existing GROWTH.md evidence rules. Private-page analytics are intentionally excluded. A successful deployment or sitemap submission is not proof of demand or indexing. Local preview, runtime files and private link records are preserved; saved prospect drafts still use the public offering URL.

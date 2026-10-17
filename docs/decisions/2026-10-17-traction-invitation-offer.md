# Traction invitation journey — local preview, 17 October 2026

## Accepted direction

Traction is an AI CRM and growth strategist. A founder arriving from Yann’s personal invitation should find a personal welcome, a concise explanation and an explorable example of the work. Small headings, short paragraphs, no numbered marketing sequence, founder counter or launch log. First reads are an optional action near the end, opening a modal; they are not a compulsory first step.

The approved email wording remains the source of voice. The newest promise is: “I’ll tailor the process to your goals, so we can see what gets people interested and turn them into active users.” The ten saved prospect drafts use related sentences grouped into paragraphs, with separate greeting and signature. A separate suggestion about shaping Traction through feedback remains a proposal, not added to the emails.

## Implementation

- `/traction` presents the public offer. `/traction/invitation/[token]` presents a reviewed personal welcome, without names or emails in query parameters. Both share the compact page and a clearly fictional, interactive example of research, email preparation, follow-through and strategy.
- Invitation tokens are random 32-byte values. `TRACTION_INVITATIONS_FILE` points to a private JSON registry keyed by the SHA-256 token digest. Only first name, product and reviewed welcome copy are returned. This is a welcome link, not authentication or Traction workspace access. Invalid/missing entries return 404. Remove a registry entry to revoke its welcome link.
- The registry and raw link list are ignored local files with mode 0600. They must never be committed, served as assets or included in the sitemap. The page is dynamic, no-store, no-referrer and noindex; metadata contains no personal name. Invitation paths are excluded from analytics, including history events and referrer paths.
- The existing article enquiry dialog now also serves the home, work, partnership, offering and other non-article routes. Articles retain their contextual dialog. First-read and conversation modes share the existing form, validation and delivery. Native dialog focus, Escape and return to the opener are preserved.
- No dependency, account-access or delivery API change. The personal welcome has no production DB read and exposes no contact records.

## Observed locally

The preview on port 3070 was checked in the browser at desktop and 390px. All four walkthrough views work. Public and personal headings differ correctly. First-read and conversation links open in place; partnership context and article context remain available. Escape and the close button restore focus. Switching modes clears the previous submission status. A synthetic first-read submission returned “Preview enquiry saved locally. No email was sent.” and stored the URL and first-read context with delivery `preview`.

HTTP checks returned 200 for a valid invitation and 404 for an invalid one, with no-store, no-referrer and noindex headers. The final welcome page showed no browser errors. `git diff --check` passed. Private screenshots and local receipts are in `.local/evidence/` and `.local/enquiries/`.

This is prototype preview evidence. Production build, type check, existing suite and deployment readiness belong to the release gate and have not been run for this slice.

## Continuation

Checkout: `apps/.worktrees/poc/orchestra/codex-traction-invitation-offer`, branch `codex/traction-invitation-offer`, review tag `traction-invitation-preview-2026-10-17`. Machine-specific launch and registry paths are in `.local/RUNTIME.md`. Traction’s canonical `PROJECT.md` and `docs/HANDOFF.md` link here.

No code was deployed and no mail was sent. Saved prospect drafts still link to the live public offering URL; no localhost or not-yet-published invitation URL has been inserted. Before a release, reconcile upstream, run the release gate, provision the reviewed private registry outside the deploy checkout, verify personal links on the deployed origin, then update draft links. Independently verify client onboarding and AI access; this example is not proof that a new client can complete that journey.

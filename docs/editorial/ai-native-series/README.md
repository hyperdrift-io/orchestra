# The AI-native organisation — implemented preview

Six articles for ai.hyperdrift.io, prepared 21 September 2026 on `feat/ai-native-articles`, based on the unpublished `feat/ai-native-org` work. The founder approved the series and instructed implementation. The pages extend the existing approved ink, gold and serif identity. No production deployment or outbound promotion has occurred.

**Review:** http://127.0.0.1:3112/articles · [Begin with the Bridge](http://127.0.0.1:3112/articles/the-bridge)

## Article sources

The editable runtime sources are `content/articles/<slug>.md` and `src/data/articles.json` (title, summary, evidence, media, CTA, diagram and publication date). The six numbered files below are the original editorial review drafts, retained as the provenance of this implementation; edit the runtime sources for subsequent changes.

| Order | Article | Strongest example | Enquiry |
|---|---|---|---|
| 1 | [The Bridge: start the day with decisions](01-the-bridge.md) | Historical public Bridge screenshot; internal operating and outcome logic | Discuss your operating workflow |
| 2 | [Give your agents the knowledge your best work depends on](02-expertise-agents-can-use.md) | Our actual publishing skill and the anniversary article, film and evidence ledger | Discuss a specialist workflow |
| 3 | [Give an agent enough authority to finish its job](03-delegation-with-boundaries.md) | Helm's recorded sandbox drill and source | Discuss an agent workflow |
| 4 | [A useful brief tells you who needs you next](04-evidence-that-starts-work.md) | Standup's recorded output and read audit | Discuss your team's daily brief |
| 5 | [Talk through the decision. Keep the evidence in view.](05-conversation-with-a-shared-view.md) | First Officer prototype; HyperVideoMesh recorded editing example | Discuss a conversational workflow |
| 6 | [Give your agent access to the work already on screen](06-connect-agents-to-existing-work.md) | Radar's recorded shared-page interaction; Standup's interfaces | Discuss an integration |


Each article stands alone. The Bridge opens the series; First Officer retains explicit prototype framing. The source and media distinctions are recorded in [PROOF-AND-MEDIA.md](PROOF-AND-MEDIA.md).

## What is implemented

- `/articles` and six article pages, linked from the homepage and main navigation.
- Responsive reading layout, table of contents, related reading and contextual enquiry invitations.
- Six cohesive ink/gold editorial illustrations at the article openings, with captions. Real screenshots, linked demonstrations and explicitly labelled prototype evidence remain in the proof sections.
- Six semantic four-step diagrams and downloadable 1200 × 630 share cards, also used as article social images.
- Canonical URLs, Article structured data and sitemap entries for published articles. Drafts show a preview label, carry noindex and stay out of the sitemap.
- Editable article context in the enquiry form, validated against known slugs, retained separately from the visitor's message in the saved lead and included in the email relay message.
- Durable lead storage before delivery, delivery status and first-party article events. No new dependencies.

## Editorial contract

All copy inherits `meta/PHILOSOPHY.md` §8, Speak to Enable. New articles follow the AI site's [ARTICLE-STANDARD.md](../ARTICLE-STANDARD.md), including short explanations, a simple example, required images/infographics and qualified-enquiry goals; this takes precedence over the legacy `apps/hyper-drift/TONE.md` audience and format rules. One useful claim, one primary example and one relevant enquiry per article. Working builds do not establish customer demand, enterprise readiness, awards or client outcomes. Possible applications are labelled as applications; historical evidence and prototype status remain visible. The [Databricks / AI engineering series](../databricks-series/README.md) adds two unpublished decision guides.

Hyperdrift is the organisation. The fleet is the products being operated. The Bridge is the operator experience for reading evidence and directing work. First Officer is its conversational role. The Crew is a separately named service. Skills carry specialist guidance; they do not enforce system permissions. The existing Orchestra name remains pending a separate brand decision.

Existing hyperdrift.io articles retain their URLs. Add useful contextual backlinks during publication; do not duplicate full articles across hosts or redirect unrelated articles. Use actual publication dates.

## Enquiry delivery and measurement

The form keeps name, email and workflow description, with optional company, situation and article. Visitors can change the article or choose “A different question”. The message field stays theirs. All submitted article slugs are allow-listed server-side.

Before relaying, the server writes a lead record under `ENQUIRY_DATA_DIR`, defaulting to `~/.local/share/hyperdrift/orchestra/enquiries` outside replaceable release checkouts. The directory is created with mode 0700 and files with 0600. Records contain the original enquiry, optional article/session, delivery (`pending`, `sent`, `failed`, `preview`) and human qualification (`unreviewed`). There is no public read endpoint. Production must provision durable storage and an operator retention/backup process.

The existing flagship mail relay accepts name/email/message/source. Article title, canonical URL, company and situation are included in its message context so the recipient receives them. Relay acceptance is the success boundary; it is not proof of inbox delivery. Failed relays keep the saved record and return an error. No automated retry is implemented.

`events.jsonl` contains only event name, known article slug, anonymous session ID, timestamp/environment and, for confirmed submissions, enquiry ID. It excludes names, emails and message text. The browser posts allow-listed events to `/api/article-events`: `article_viewed`, `article_engaged`, `article_cta_clicked`, `article_proof_opened`, `enquiry_started`. Engagement means the end-of-body marker was seen, not proof of careful reading. Report unique sessions when comparing stages; repeat page views and development effects can repeat events.

Only a successful server relay records `enquiry_submitted`. Local dry-run delivery records `enquiry_preview_saved`, never a sales lead. Qualification is a human decision: an identified contact, a concrete workflow and plausible service fit. This implementation stores attribution but does not provide a CRM, qualification dashboard or PostHog integration. The infra app currently has no PostHog project ID; wire the existing HD analytics contract before public launch.

## Local review

```bash
npm ci
CONTACT_DELIVERY=preview ARTICLE_PREVIEW=true ENQUIRY_DATA_DIR=/tmp/ai-articles-preview-enquiries npm run dev -- --hostname 127.0.0.1 --port 3112
```

This mode saves synthetic enquiries locally and sends no email. `CONTACT_DELIVERY=preview` is refused in production. Do not use real contact details for verification. A separate build can run with `NEXT_OUTPUT_DIR=.next-check ARTICLE_PREVIEW=true npm run build` while the preview continues; Next may rewrite generated type includes for that output directory, which should not be committed.

## Verification — 21 September 2026

- Production build passed with preview enabled: all six pages generated; type/lint checks passed.
- Six article routes and six share-image endpoints returned 200; unknown article returned 404. Draft noindex/canonical metadata and sitemap exclusion checked.
- Desktop and 390px mobile reading/form layouts inspected. Bridge and expertise share cards visually checked.
- Browser submission saved locally with article context. Changing the selected article produced the changed slug in the record and `enquiry_preview_saved`, with no sales-success event.
- Reading, CTA and enquiry-start events reached local storage; API health returned OK.
- Built contact route verified against a local capture server: success preserved title, canonical URL and original message, saved `sent`, recorded one success event. Simulated relay 503 returned 502, saved `failed` and recorded no success event. Both temporary verification servers stopped; review server remains running. No external recipient contacted.
- No product test suite added or run under the prototype policy.

## Publication checklist

1. Review the final rendered words and media, especially First Officer prototype framing. The abandoned image-generation round produced prompts only; no image was generated or approved.
2. Set the actual `publishedAt` timestamp for each approved article in the catalogue. Rebuild without `ARTICLE_PREVIEW`; unset `CONTACT_DELIVERY=preview`. Do not publish a preview build.
3. Align Orchestra's existing infra entry with npm (`package_manager` and `build_cmd` still say pnpm), provision persistent enquiry storage, resolve existing dependency findings and configure the analytics project. The npm audit reports eight existing findings: four moderate, two high, two critical, including the Vitest toolchain. No dependencies were added or force-upgraded in this editorial change.
4. On explicit production approval, deploy through infra and verify public articles, proof media, enquiry delivery and analytics. Submit the updated sitemap with `hd growth sitemap orchestra` and add the anniversary/contextual backlinks in the same release window.

The preview is the reviewable result. No merge, push, deployment, indexing submission or outbound promotion has occurred.

# NextRole as product and Orchestra proof

The founder selected NextRole as the owned MCP driver on 4 October 2026 and asked to start integrating the offering into Orchestra. Deputy continues as a separate commercial lead. NextRole replaces Standup in the homepage’s three featured examples. This content refinement carries forward the approved Living constellation A layout and ink/cream/gold identity. It does not change the hero, product architecture, prices or access model.

## Recommendation

Use one maintained capability and proof record to serve two different customers. Someone seeking career help uses NextRole; a product owner who wants customers to use their service through assistants enquires with Orchestra. NextRole remains a commercial product. MCP is another way to use it, not a commitment to give away every paid feature or publish the application’s source.

Orchestra’s initial offer is one scoped product workflow: agree the useful outcome and permissions, implement the MCP interface against the existing product, verify completion in a compatible host, provide connection instructions and instrument the result. Authentication, entitlement and write approval requirements are agreed for each client. NextRole’s anonymous endpoint is a demonstration of an entry path, not a universal access architecture.

The trade-off is audience overlap: job seekers are not automatically buyers of engineering services. The product path therefore leads directly to NextRole. Orchestra addresses product owners through the implementation explanation, public evidence and a distinct enquiry. Do not turn a career conversation into an unsolicited consulting pitch.

## Reviewable implementation

- Homepage: NextRole first, Helm and uk.gov Radar retained. Existing prototype attribution remains separate.
- `/work#work-nextrole`: owned-product attribution, an actual response excerpt, the scoped service offer, connection guide and two distinct actions.
- `/?situation=mcp#contact`: editable “Making my product usable by agents” context travels through the existing enquiry record and relay. Preview delivery stays local.
- Existing analytics: `cta_clicked` distinguishes destination `nextrole` from `enquiry`, with bounded `offer=mcp`; enquiry start and server-confirmed submission retain bounded `situation=mcp`. No names, CVs, messages or arbitrary situation text are added to analytics. NextRole referral uses `utm_source=orchestra`, `utm_medium=referral`, `utm_campaign=nextrole_mcp`.
- Proof is HTML-readable and links to `public/proof/nextrole-mcp-2026-10-04.json`. Existing `/work` canonical/sitemap entry remains the destination. No new campaign scheduler or connector.

## Evidence and limits

The [saved live probe](../../public/proof/nextrole-mcp-2026-10-04.json) used Python MCP SDK 1.30.0 against `https://nextrole.site/api/mcp`, without credentials or real personal data. Initialization, listing all five tools, `ats_lint` and `score_cv` completed. Scoring returned native structured strengths, gaps and priority in 14.269 seconds. The website, llms.txt and public connection guide returned 200.

Three tools were listed but not exercised: tailoring, job search and job-description retrieval. No human assistant installation, independent repeat use, paid conversion or employment outcome was demonstrated. The source defines metering but live quota enforcement/exhaustion was not checked. The source revision in the record is the inspected local source, not a verified deployed revision.

Two issues must be resolved before amplifying the scoring story:

1. `apps/hyper-cv/src/lib/mcp/tools/score-cv.ts:48` renders the 1–10 result as `/100`. The preview quotes written feedback only and exposes the limitation beside the connection instructions.
2. The live MCP initialization says “turns a CV into interview callbacks”. The operational probe supplies no evidence for that outcome. Replace the promise with the actual capability.

These are recorded findings; this Orchestra change does not modify or deploy NextRole.

## Next evidence gate

First resolve those two presentation defects, then replay the synthetic check and complete one real user's authorised career task in their chosen host. Confirm they can inspect and correct the result and understand when/why the web product or payment is needed. This is an onboarding gate, not evidence of general demand.

Keep two outcomes separate: NextRole useful completions, return use and paid product conversions; Orchestra server-confirmed enquiries, human qualification and scoped paid work. Existing anonymous MCP telemetry cannot identify unique or returning people, so do not report tool-call counts as retention. Obtain consented user evidence or agree a suitable measurement design before claiming repeat use.

Promote more widely only on that evidence. Add a host or discovery surface when it removes a demonstrated adoption obstacle or reaches an identifiable relevant audience. NextRole’s public MCP guide can link to this Orchestra proof after this page is approved and live. No automated replies, unsolicited messages or extra social campaigns are part of this slice.

## Verification and release state

Local preview: `http://127.0.0.1:3118/work#work-nextrole`, with `CONTACT_DELIVERY=preview`.

Typecheck and all 25 existing tests passed. Desktop and 390px layouts inspected; the phone document and viewport are both 390px wide. The connection disclosure opened. The service CTA selected the MCP situation. A synthetic browser form submission returned “Preview enquiry saved locally. No email was sent”; the stored record retained the situation and `delivery=preview`.

State: prepared for founder review. No production deployment or sitemap submission. The app’s existing final-copy/production review gate applies; production build, CI and infra launch readiness remain release checks after approval.

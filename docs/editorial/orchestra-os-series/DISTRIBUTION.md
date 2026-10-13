# Distribution kit: Orchestra OS field notes

Raw material for the founder. Nothing here is published, scheduled or sent; the founder writes and signs every public post.

## Who each piece is for

| Article | Reader | Where they are |
|---|---|---|
| Your app works. Who runs it now? | Founders with a live app and paying customers whose week has filled with upkeep; Traction prospects with a working product | LinkedIn feed, founder conversations, Traction first-read follow-ups |
| Should a security fix wait for the next feature release? | Platform engineers, DevSecOps leads, CTOs of small teams | LinkedIn, engineering newsletters that cite references, search for "patch production without redeploy", "security fix lost after deploy" |

The security piece earns trust with engineers; the operations piece converts founders. Lead with the founder piece on the Company Page; let the security piece travel through engineers who share references.

## Assets

- LinkedIn cards (1080×1350): `public/articles/orchestra-os/operating-week-linkedin.png`, `public/articles/orchestra-os/repair-survival-linkedin.png`.
- Save-the-visual PNGs: `operating-week.png`, `repair-survival.png` in the same folder.
- Per-article social cards: generated at `/articles/<slug>/opengraph-image`.

## Angles for the founder's own posts

Operations piece:
1. The week as the story: Monday advisory, Tuesday stuck booking, Wednesday release, Thursday sign-up dip, Saturday outage. Which of these did you handle last week?
2. The founder as integration layer: the hosting dashboard, the developer, the support inbox and the analytics never meet, except in your head.
3. Five questions for whoever runs your app, ending on "How would you leave?"

Security piece:
1. "A security fix is finished when it survives the next release." Then the newer build carrying the older parser.
2. Our own gap, stated plainly: our deploys rebuild from main, so a live-only fix would vanish. What we are building next.
3. None of the parts is new (Lambda, Cloud Run, Ubuntu, Git, Flux); the agreement between them is what is missing.

## HD introduction (for hyperdrift.io, links to the canonical article, no duplicate)

Title: Your app works. Who runs it now?
Excerpt: A live app creates five jobs every week. Orchestra, our client practice, now runs them for founders: named owners, agents inside agreed limits, a receipt for every action. Read the field note on Orchestra.

## Email introduction (for outreach-email, one prospect at a time)

Use only where the prospect has a live product: one line about their app's current state from the first read, then the five-questions section as the useful part, then the article link. The outreach-email skill decides the route; customer-success decides whether to send.

## Measurement

Funnel per article, unique sessions: `article_viewed` → `article_cta_clicked` → `enquiry_started` → `enquiry_submitted` (server-confirmed) → qualified conversation. The enquiry form preselects the article; "Embedding my app on Orchestra OS" is the matching situation. Too few sessions to judge means more exposure, not a verdict.

---
app: orchestra
url: https://ai.hyperdrift.io
growth_stage: activation
primary_channel: linkedin
posthog:
  region: eu
  project_id: 206943
  north_star: enquiry_submitted
  primary_funnel:
    - $pageview
    - enquiry_started
    - enquiry_submitted
  blocker_event: enquiry_failed
web_review:
  key_pages:
    - name: Business scenario
      url: /
      funnel_step: $pageview
    - name: Traction Partnership
      url: /partnership
      funnel_step: enquiry_started
    - name: Evidence and decisions
      url: /articles/the-bridge
      funnel_step: article_viewed
  review_questions:
    - Can a founder recognise their business opportunity before interpreting the technology?
    - Does the evidence justify the claim, with prototype status visible?
    - Is the next step a specific, manageable conversation?
aeo_target_questions:
  - How can AI improve an existing business workflow?
  - How do I give an AI agent useful expertise and clear boundaries?
  - What should a founder measure before expanding an AI workflow?
cadence:
  trigger_events:
    - reviewed proof published
    - qualified enquiry received
    - business improvement measured with permission to share
  channels_per_event:
    - linkedin
    - bluesky
---

# Growth — Orchestra AI by Hyperdrift

Help founders with customers, active users or credible demand turn an existing opportunity into sustainable growth and profit. The primary conversion is an enquiry about a concrete business workflow. A form submission is not a qualified lead, and a qualified lead is not revenue.

The [service launch kit](docs/campaigns/2026-09-service-launch/README.md) coordinates the scenario, proof, articles and Traction Partnership. LinkedIn is the initial distribution hypothesis because this is a founder-led service; channel fit remains to be established by real enquiries. Search brings durable discovery through the AI-native articles. No paid budget is committed.

## Measurement contract

**Release status:** the founder approved PostHog on 23 September 2026. The SDK, explicit interaction events, session-scoped first-touch attribution and server accepted-relay conversion are implemented. Production ingestion was verified on 23 September with marked real browser interactions, including route views, domain exploration and enquiry starts; exclude those verification events from the first baseline. The server accepted-relay event has not been exercised by sending a synthetic live enquiry. Existing durable article events remain available.

Use the existing Hyperdrift company PostHog project, with `app = orchestra` and hostname `ai.hyperdrift.io` on every report. Project-wide totals also include the legacy company site and must never be described as Orchestra traffic. The first baseline begins when verified production capture starts; there is no defensible historical conversion baseline for the new experience.

UTMs identify the source, medium, campaign and creative. Use `utm_campaign=one_opportunity_2026`; retain first-touch attribution through internal navigation and attach it to the saved enquiry. Never send names, email addresses, company names or free-text messages to analytics. Exclude local previews, events with `validation_run`, bots and internal visits when assessing the campaign. Share-control clicks are intent, not confirmed social publication.

The server's accepted contact relay is the enquiry success boundary. Human review of the durable lead record establishes qualification: evidence of demand, a concrete opportunity, and access to someone able to make a decision. Track qualified conversations, agreed scopes and won work privately; do not infer them from browser events.

## Evidence that changes the next action

- A failed enquiry or broken campaign destination: repair before amplifying it.
- Five conversations independently naming the same problem: make that problem the next demonstration and article. This is a working decision rule, not a statistical threshold.
- At least 100 distinct relevant visitors to a campaign destination with no enquiry starts: inspect message match and the next step, including session evidence where available. Do not conclude absence of demand from 100 visits alone.
- At least 20 genuine form starts with fewer than five accepted submissions: inspect errors and field friction before increasing reach. Separate abandonment from failed delivery.
- Compare creative variants only after each has at least 100 relevant visitors; call the result directional, report counts and uncertainty, and prefer qualified conversations over impressions.
- Expand a channel after three qualified conversations from it and a clear account of effort/cost. Stop spending effort on a format if it reaches the wrong audience; an immature sample calls for better exposure, not a verdict on the service.

Review daily during active distribution, then after each material signal. Time schedules inspection; evidence decides changes. Founder time is a campaign cost. Do not build a strategy around comment drops or manual engagement queues.

## Public voice

All campaign work inherits `meta/PHILOSOPHY.md` §8, Speak to Enable: strengths first, concrete evidence, useful next move. The founder supplies and signs the personal/public launch words. The launch kit provides verified material and editing structure; unpublished text is not a scheduled post. No manufactured scarcity, invented uplift, borrowed sponsor credibility or automated outreach.

### Event boundaries

`$pageview` follows route changes. `cta_clicked` records enquiry, partnership and work links; `domain_explored` records deliberate domain entry. Article reading and share-control events retain their existing semantics. `enquiry_started` records the first form focus per mounted form; `enquiry_submitted` is emitted by the server only after the contact relay accepts the message, and `enquiry_failed` records storage or relay failure. Analytics failures never change delivery status. No replay or automatic form capture is enabled.

Campaign attribution is first touch within a browser tab, not cross-device identity. Anonymous session IDs join the browser funnel to the accepted enquiry; submission counts still require human qualification. URL queries and fragments are removed from SDK URL properties. Campaign values are bounded tags, never free text.

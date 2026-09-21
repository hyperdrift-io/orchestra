---
title: "Give your agent access to the work already on screen"
status: draft-for-founder-review
slug: connect-agents-to-existing-work
canonical: https://ai.hyperdrift.io/articles/connect-agents-to-existing-work
series: The AI-native organisation
order: 6
author: Yann VR
excerpt: "uk.gov Radar lets a browser agent work with the same shortlist its user sees. A concrete example of integrating AI into an existing workflow while keeping decisions visible."
shareLine: "The agent and the person should work from the same state."
primaryExample: uk.gov Radar
exampleStatus: public-browser-integration-demonstration
ctaLabel: Discuss an integration
ctaHref: https://ai.hyperdrift.io/?article=connect-agents-to-existing-work#contact
---

# Give your agent access to the work already on screen

Suppose you are comparing opportunities for your business. Your agent knows the context. The website holds the opportunities. A useful integration lets both contribute while you work through one shared shortlist.

We built that interaction into [uk.gov Radar](https://radar.hyperdrift.io/explore). Its Explore page gives a compatible browser agent tools for proposing a profile, finding relevant items and helping prepare a brief. The suggestions appear in the page, where the person can keep them, drop them and explain why.

> The agent and the person should work from the same state.

## Watch the state change

The [recorded demonstration](https://youtu.be/z4B0gtwbjB4) shows an agent working with the page. The important detail is where the work lands: in controls and records the person can inspect, with their decision still visible.

Radar's tools use the same underlying functions as its interface. A proposed profile remains proposed until accepted. An opportunity can carry a reason from the agent and a response from the person. The next turn can use that response.

The [source is public](https://github.com/hyperdrift-io/uk-ai-radar), and the [technical article](https://hyperdrift.io/blog/the-agent-is-the-session) describes the integration. This example uses WebMCP in a compatible browser environment. It is not a promise that every visitor's browser or assistant can run the demonstration today.

## Choose the access that fits the job

Some workflows belong on a shared page. Others need a server integration that can work with authorised records in the background. The correct interface follows the task, the data and the identity of the person asking.

Standup provides a second example. Its repository analysis can be reached through a web interface, a command-line tool or an MCP server. The core question remains the same: what should I do first on these projects? You can inspect those entry points in its [repository](https://github.com/hyperdrift-io/standup).

An MCP connection does not, on its own, settle permissions, tenant boundaries or audit requirements. Those need to be designed into the integration. The useful promise to a customer is a particular job completed under their rules.

## Start with one existing workflow

For an established product, the first step is to identify a task users already perform and the operations it requires. Which records can this person see? What can they change? Which operations need confirmation? How will the result appear in the product?

For an internal team, the same questions apply across its business tools. An agent helping prepare a handover should retain the source records and respect the access of the people involved.

These are possible applications of the demonstrated pattern. A delivery engagement would need to verify them against your systems, data and operating constraints. A public demo cannot substitute for that work.

**What to watch:** agent-accessible interfaces are expanding the ways people use software. The valuable starting point is a narrow, meaningful capability. Pick one task and make its input, permission and result explicit before exposing a larger tool catalogue.

Send the [Radar demonstration](https://youtu.be/z4B0gtwbjB4) to the person responsible for your product experience. Then tell us which workflow you want to make accessible to an agent. We can discuss an integration your team can operate and own, within the environment you already use.

[Discuss an integration →](https://ai.hyperdrift.io/?article=connect-agents-to-existing-work#contact)

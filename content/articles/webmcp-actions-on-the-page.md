An app knows what its buttons do. Making an agent rediscover that from the screen is a peculiar arrangement.

[WebMCP](https://webmachinelearning.github.io/webmcp/) proposes a more direct route: a web page exposes structured actions that a compatible browser agent can call. The page can remain a place where a person sees the work and intervenes. This is a Draft Community Group Report, not a finished W3C standard or a promise of support in every browser.

Our [earlier account, The Agent Is the Session](https://hyperdrift.io/blog/the-agent-is-the-session), explored this through uk.gov Radar. The enduring idea is shared work: an agent can help operate the page without making the person abandon it.

> The page can explain what it does before an agent starts guessing.

## The same shortlist, two ways to work

[Radar's Explore workspace](https://radar.hyperdrift.io/explore) collects government information relevant to AI founders. A founder can filter items, keep a shortlist and prepare a brief. The agent needs those same operations.

The [implementation](https://github.com/hyperdrift-io/uk-ai-radar/blob/main/WEBMCP.md) registers actions for searching, reading an item, proposing a profile and working with the shortlist. The controls and tools call shared workspace functions. A proposed profile stays visible for the founder to review. Suggestions can be kept or dropped.

This matters when judgement changes. A grant can match the search criteria yet be wrong for the business. Keeping the evidence and decision on the page lets the person correct the agent at the point where the mistake becomes clear.

Shared functions help keep these routes consistent. They do not make mistakes impossible. State changes, invalid inputs and unavailable services still need handling. Our recorded example shows one implementation; it is not a general reliability benchmark.

## Similar names, different jobs

A graphical interface exposes controls. People choose them; events trigger the app's behaviour. An API exposes operations to another program. A command-line interface makes operations available through commands, often useful for repeatable work.

[MCP, the Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture), connects AI applications to servers that expose tools and context. WebMCP concerns actions exposed by a web page to browser agents. An app may have reasons to use several of these routes.

The choice depends on where the work belongs. A person reviewing a shortlist benefits from seeing changes beside their sources. A background job may need a server connection without an open page. Neither arrangement is automatically more accessible or more appropriate.

[Chrome's current guide](https://developer.chrome.com/docs/ai/webmcp) documents a WebMCP origin trial from Chrome 149 and a flag for local development. It covers actions defined through JavaScript and annotated forms. That is a route to testing an integration. Support still needs checking in the browser and agent people will actually use; the trial does not establish support everywhere.

## Context still has to cross a boundary

An agent may already know something relevant about a person. That can reduce repeated entry. It does not mean the app has no need for accounts, or that everything the agent knows stays private.

When the agent passes a profile field to a page tool, that field has crossed into the page. Authentication and access checks remain necessary where the operation requires them. The useful design question is which information this action actually needs, and whether the person can inspect what is being proposed.

Our original article took a strong position on where context could live. This adaptation narrows the claim: keeping some context with the agent can change what a site needs to store. The result depends on the application and the information sent to its tools.

## Start with an action worth exposing

Choose a task where navigation gets in the way of judgement. Define the action clearly, show its result and make correction possible. Compare it with the existing controls, including failure cases. Fewer guessed clicks are promising; a correctly completed task is the evidence.

The next article examines [hands-free control through Traction](/articles/hands-free-app-control). It brings speech into the picture and asks how the person knows that an instruction actually worked.

[Discuss an app your users should be able to direct.](https://ai.hyperdrift.io/?article=webmcp-actions-on-the-page#contact)

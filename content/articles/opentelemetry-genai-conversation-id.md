We got our first PR merged into a significant repository: OpenTelemetry's semantic conventions for generative AI. Liudmila Molkova merged [#556](https://github.com/open-telemetry/semantic-conventions-genai/pull/556) on 30 October. It sets out how GenAI instrumentation can pass a conversation ID to the calls nested inside an agent, so you can find a conversation's spans by that ID instead of walking the trace.

> Your agent framework knows the conversation. Now the model and tool calls inside it can carry the same ID.

{{visual:primary}}

## Who follows these conventions

OpenTelemetry is the open standard for traces, metrics and logs. Its semantic conventions are the shared names: when every library records the model in `gen_ai.request.model`, any backend can read telemetry from any of them without a custom mapping.

The GenAI conventions describe model calls, agents, tools, evaluations and MCP. They moved into [their own repository](https://github.com/open-telemetry/semantic-conventions-genai) in May, and by 30 October more than 110 people had contributed and 269 pull requests had merged there. Its reference scenarios check the conventions against 30 Python libraries, from the OpenAI and Anthropic clients to LangChain, CrewAI, Google ADK and Pydantic AI. The people who instrument these libraries read this document to decide what their spans should say.

{{visual:conventions-reach}}

## The conversation stopped at the agent

An agent framework usually knows which conversation it's serving, such as a LangChain or ADK session. The model client it calls usually doesn't. Its instrumentation sees one request and one response.

The [reference reports](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/reference/README.md) show the gap. In their scenarios, 14 of the 30 libraries emit inference spans and two of them record a conversation ID there. Count every place a library emits a span that defines the attribute and you get 43. The ID is in 11 of them.

OpenTelemetry usually avoids repeating an attribute on every layer. Liudmila opened [issue #522](https://github.com/open-telemetry/semantic-conventions-genai/issues/522) after a GenAI SIG call found that this makes GenAI queries hard: the conversation is useful on the agent span, its tool calls and its model calls.

## The rule

The merged section in the [GenAI overview](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md#attributes-shared-across-operations) sets four rules. Instrumentations may pass the listed attributes to nested instrumentations in the same process. When the instrumented library has its own value, that value should win over the outer context. They shouldn't pass on anything unlisted, or record these attributes on a signal that doesn't define them. The list holds one attribute: `gen_ai.conversation.id`.

The last rule keeps the ID off metrics. GenAI metrics don't define it, and a label per conversation would start a new series for every conversation.

The attribute's [definition](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/registry/attributes/gen-ai.md#gen-ai-conversation-id) already covers the missing case: leave it unset. A new UUID, a trace ID or a hash of the request isn't a conversation ID.

## Review made it better

Our first version was an 18-line summary of where two attributes already appeared: `gen_ai.agent.name` and `gen_ai.conversation.id`. Liudmila asked for more: "Let's make it normative and more specific." The review also asked us to link the canonical definitions instead of repeating them, because a repeated definition goes stale and carries no normative weight.

Trask Stalnaker then found the case that changed the scope. If a nested call inherits the agent name, a request from a Planner agent to a remote agent can be recorded under Planner's name: the wrong agent. The GenAI SIG discussed it on its call and continued agent naming in [#385](https://github.com/open-telemetry/semantic-conventions-genai/pull/385), a draft that proposes `gen_ai.main_agent.name`. We removed the agent name.

The repository asks for two approvals from reviewers at different companies for non-editorial changes like this one. Liudmila and Trask both approved, and the change merged with one attribute and four rules.

{{visual:review-timeline}}

## What to do in your instrumentation

If you maintain an agent framework's instrumentation, put the conversation ID in context when an agent or workflow starts, so nested GenAI instrumentation in the same process can record it. If you maintain a model client's, use the client's own conversation or thread ID when it has one and the context's otherwise. Keep the agent name per operation, and follow #385 for the main agent.

If you read the telemetry, a filter on `gen_ai.conversation.id` can return a conversation's inference and tool spans as instrumentations adopt the rule. The rule is optional, the conventions are in Development status and the change has merged on main without a tagged release, so check what your libraries record before you build a dashboard on it.

## Why we contribute

We contribute to the key pillars of open-source AI. Visibility is welcome, but the knowledge gained is what we bring back into what we build and offer.

This review taught us to keep the conversation and the agent apart. When another agent or model picks up the work, the conversation keeps its identity, and each step records the agent that did it. A missing ID stays missing. That's the design we're taking into how our agents hand over work; it isn't OpenTelemetry instrumentation we run yet.

Thanks to Liudmila Molkova for opening the issue, shaping the rule and merging it, to Trask Stalnaker for the review that narrowed it, and to the GenAI SIG for the decision on agent naming. We prepared the change with AI assistance and said so in the PR.

Search an agent's telemetry for one conversation ID and you'll usually find the agent span, not the model and tool calls it made. We got our first PR merged into a significant repository to change that: OpenTelemetry's semantic conventions for generative AI. Liudmila Molkova merged [#556](https://github.com/open-telemetry/semantic-conventions-genai/pull/556) on 30 October. As libraries adopt the rule, model and tool calls can carry the conversation ID supplied by the enclosing agent, unless they have their own. A filter finds the calls carrying that ID.

{{visual:primary}}

## Why can't you find a conversation's model calls today?

An agent framework knows which conversation it's serving, such as a LangChain or ADK session. The model client it calls doesn't. Its instrumentation sees one request and one response, and records the call without the ID.

That's by design. OpenTelemetry avoids repeating an attribute on every layer, so you're expected to walk the trace down from the agent span. It works for one trace. It breaks when a conversation runs across many traces, or when you want every model call in a conversation over a week. Grafana's guide puts the cost plainly: without the ID, each trace becomes its own conversation.

The [reference reports](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/reference/README.md) show how common this is. In their scenarios, 14 of the 30 libraries emit inference spans and two of them record a conversation ID there. Count every place a library emits a span that references the attribute and you get 43. The ID is in 11 of them. Liudmila opened [issue #522](https://github.com/open-telemetry/semantic-conventions-genai/issues/522) after a GenAI SIG call reached the same conclusion: the conversation is useful on the agent span, its tool calls and its model calls.

## What does the rule say?

The merged section in the [GenAI overview](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md#attributes-shared-across-operations) lets instrumentations pass the listed attributes to nested instrumentations in the same process. When the instrumented library has its own value, that value wins. Nothing unlisted is passed on, and the attributes stay off any signal that doesn't reference them. The list holds one attribute: `gen_ai.conversation.id`.

That last rule keeps the ID off metrics. A label per conversation would start a new series for every conversation.

OpenTelemetry's [Python GenAI utility](https://github.com/open-telemetry/opentelemetry-python-genai/pull/726) has passed the ID this way since September: an operation without its own conversation ID takes the one from the enclosing context. The merged section makes that the convention for every instrumentation, in any language.

## Who reads this ID?

OpenTelemetry is the open standard for traces, metrics and logs. It graduated in the CNCF in May, and the CNCF ranks its project velocity second only to Kubernetes. Its semantic conventions are the shared names: when every library records the model in `gen_ai.request.model`, any backend can read telemetry from any of them without a custom mapping.

The GenAI conventions moved into [their own repository](https://github.com/open-telemetry/semantic-conventions-genai) in May, and by 30 October more than 110 people had contributed and 269 pull requests had merged there. Its reference scenarios check the conventions against 30 Python libraries, from the OpenAI and Anthropic clients to LangChain, CrewAI, Google ADK and Pydantic AI. On the reading side, Datadog, Honeycomb, Grafana Cloud, Dynatrace, Opik, W&B Weave and Pydantic Logfire document grouping an agent conversation by `gen_ai.conversation.id`.

{{visual:conventions-reach}}

## Why did the agent name come out?

Our first version was an 18-line summary of where two attributes already appeared: `gen_ai.agent.name` and `gen_ai.conversation.id`. Liudmila asked us to make it "normative and more specific", proposed the wording we applied and asked for links to the canonical definitions: a repeated definition goes stale and carries no normative weight.

Trask Stalnaker then found the case that changed the scope. If a nested call inherits the agent name, a request from a Planner agent to a remote agent can be recorded under Planner's name. The GenAI SIG discussed it on its call and continued agent naming in [#385](https://github.com/open-telemetry/semantic-conventions-genai/pull/385), a draft that proposes `gen_ai.main_agent.name`. We removed the agent name.

The repository asks for approvals from reviewers at two different companies for a change like this one. Liudmila and Trask both approved, and it merged with one attribute.

{{visual:review-timeline}}

Thanks to Liudmila for opening the issue, proposing the rule's wording and merging it, to Trask for the review that narrowed it, and to the GenAI SIG for the decision on agent naming. We prepared the change with AI assistance and said so in the PR.

## Why do we contribute?

We contribute to the key pillars of open-source AI to build trust. Besides visibility, the knowledge gained goes into what we build and offer.

This review taught us to keep the conversation and the agent apart. When our agents hand work over, the conversation can keep its ID while each step names the agent that did it. A missing ID stays missing. We don't run OpenTelemetry instrumentation ourselves yet.

## What should you change this week?

If you maintain an agent framework's instrumentation, put the conversation ID in context when an agent or workflow starts. If you maintain a model client's, use the client's own conversation or thread ID when it has one and the context's otherwise. With no ID, leave it unset: the attribute's [definition](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/registry/attributes/gen-ai.md#gen-ai-conversation-id) rules out a new UUID, a trace ID or a hash of the request as a fallback. Keep the agent name per operation, and follow #385 for the main agent.

If you read the telemetry, run the search from the top of this article on one agent flow you already trace, and count the model and tool spans that come back. That count tells you how far your libraries have adopted the rule. It's optional, the conventions are in Development status and no tagged release includes it yet, so expect gaps for now.

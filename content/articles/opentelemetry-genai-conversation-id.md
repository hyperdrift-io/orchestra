We got our first PR merged into a significant repository: OpenTelemetry's semantic conventions for generative AI. Liudmila Molkova merged [#556](https://github.com/open-telemetry/semantic-conventions-genai/pull/556) on 30 October. It sets out how GenAI instrumentation can pass a conversation ID to the calls nested inside an agent. As instrumentations adopt it, you can find a conversation's spans by that ID instead of walking the trace.

{{visual:primary}}

## Who follows these conventions

OpenTelemetry is the open standard for traces, metrics and logs. It graduated in the CNCF in May, and the CNCF ranks its project velocity second only to Kubernetes. Its semantic conventions are the shared names: when every library records the model in `gen_ai.request.model`, any backend can read telemetry from any of them without a custom mapping.

The GenAI conventions describe model calls, agents, tools, evaluations and MCP. They moved into [their own repository](https://github.com/open-telemetry/semantic-conventions-genai) in May, and by 30 October more than 110 people had contributed and 269 pull requests had merged there. Its reference scenarios check the conventions against 30 Python libraries, from the OpenAI and Anthropic clients to LangChain, CrewAI, Google ADK and Pydantic AI.

On the reading side, Datadog, Honeycomb, Grafana Cloud, Dynatrace, Opik, W&B Weave and Pydantic Logfire document grouping an agent conversation by `gen_ai.conversation.id`. Grafana's guide warns that without it, each trace becomes its own conversation.

{{visual:conventions-reach}}

## The conversation stopped at the agent

An agent framework usually knows which conversation it's serving, such as a LangChain or ADK session. The model client it calls usually doesn't. Its instrumentation sees one request and one response.

The [reference reports](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/reference/README.md) show the gap. In their scenarios, 14 of the 30 libraries emit inference spans and two of them record a conversation ID there. Count every place a library emits a span that references the attribute and you get 43. The ID is in 11 of them.

OpenTelemetry usually avoids repeating an attribute on every layer. Liudmila opened [issue #522](https://github.com/open-telemetry/semantic-conventions-genai/issues/522) after a GenAI SIG call found that this makes GenAI queries hard: the conversation is useful on the agent span, its tool calls and its model calls.

## The rule

The merged section in the [GenAI overview](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md#attributes-shared-across-operations) sets four rules. Instrumentations may pass the listed attributes to nested instrumentations in the same process. When the instrumented library has its own value, that value should win over the outer context. They shouldn't pass on anything unlisted, or record these attributes on a signal that doesn't reference them. The list holds one attribute: `gen_ai.conversation.id`.

OpenTelemetry's [Python GenAI utility](https://github.com/open-telemetry/opentelemetry-python-genai/pull/726) has passed the ID this way since September: an operation without its own conversation ID takes the one from the enclosing context. The merged section makes that the convention for every instrumentation, in any language.

The last rule keeps the ID off metrics. GenAI metrics don't reference it, and a label per conversation would start a new series for every conversation.

## Review made it better

Our first version was an 18-line summary of where two attributes already appeared: `gen_ai.agent.name` and `gen_ai.conversation.id`. Liudmila asked us to make it "normative and more specific", proposed the wording we applied and asked for links to the canonical definitions: a repeated definition goes stale and carries no normative weight.

Trask Stalnaker then found the case that changed the scope. If a nested call inherits the agent name, a request from a Planner agent to a remote agent can be recorded under Planner's name: the wrong agent. The GenAI SIG discussed it on its call and continued agent naming in [#385](https://github.com/open-telemetry/semantic-conventions-genai/pull/385), a draft that proposes `gen_ai.main_agent.name`. We removed the agent name.

The repository asks for two approvals from reviewers at different companies for non-editorial changes like this one. Liudmila and Trask both approved, and the change merged with one attribute and four rules.

{{visual:review-timeline}}

## What to do in your instrumentation

If you maintain an agent framework's instrumentation, put the conversation ID in context when an agent or workflow starts, so nested GenAI instrumentation in the same process can record it. If you maintain a model client's, use the client's own conversation or thread ID when it has one and the context's otherwise. With no conversation ID, leave it unset: the attribute's [definition](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/registry/attributes/gen-ai.md#gen-ai-conversation-id) rules out a new UUID, a trace ID or a hash of the request as a fallback. Keep the agent name per operation, and follow #385 for the main agent.

If you read the telemetry, a filter on `gen_ai.conversation.id` can return a conversation's inference and tool spans as instrumentations adopt the rule. The rule is optional, the conventions are in Development status and the change has merged on main without a tagged release, so check what your libraries record before you build a dashboard on it.

## Why we contribute

We contribute to the key pillars of open-source AI to build trust. Besides visibility, the knowledge gained goes into what we build and offer.

This review taught us to keep the conversation and the agent apart. We can use that split when our agents hand work over: the conversation keeps its ID, each step names the agent that did it, and a missing ID stays missing. We don't run OpenTelemetry instrumentation ourselves yet.

Thanks to Liudmila Molkova for opening the issue, proposing the rule's wording and merging it, to Trask Stalnaker for the review that narrowed it, and to the GenAI SIG for the decision on agent naming. We prepared the change with AI assistance and said so in the PR.

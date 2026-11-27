We chose the writer and reviewer in a YAML file in our repository. [Archon](https://github.com/coleam00/Archon), the open-source engine that runs the workflow, records what each step did. We can read the draft alongside that record before we decide what to publish.

That choice should belong to every team running agents. You should be able to change the model for one step, review the workflow like code and inspect what happened in a tool you choose. That takes open formats for the workflow, its run record and the telemetry from model and tool calls. It also means your team decides where those records go.

## How do you follow a conversation across model and tool calls?

A workflow can tell you that an agent ran. To see which calls belonged to its conversation, the libraries recording those calls need to agree on how to identify it. That’s where we contribute to OpenTelemetry.

On 30 October 2026, OpenTelemetry merged [our change](https://github.com/open-telemetry/semantic-conventions-genai/pull/556) to its GenAI conventions. It lets one instrumentation pass `gen_ai.conversation.id` to another nested in the same process. A model call and a tool call can then carry the same conversation ID as the agent that made them. Review [narrowed the change](/articles/opentelemetry-genai-conversation-id) to that one attribute. As of 27 November it was on the main branch and had yet to appear in a tagged release.

Another contributor, knapg, cited that work in a [separate proposal](https://github.com/open-telemetry/semantic-conventions-genai/pull/764) about which operations should inherit an agent’s name. That proposal was still open on 27 November.

Shared conventions also need shared tests. Our open [conformance PR](https://github.com/open-telemetry/semantic-conventions-conformance/pull/518) adds Vertex AI’s traffic type to a mock response so instrumentation authors can test whether their code reads it. Google’s SDK version 2.34.0 read the value, and the mock tests passed locally. We’ve also [offered](https://github.com/open-telemetry/semantic-conventions-genai/issues/717#issuecomment-7127234060) to make the served tier testable on the ordinary Vertex route. The maintainers are still deciding the scope of that work.

## What does a typical review cost us?

This article took two Archon runs. It counts as one of ten changes we’ll use to assess our copy workflow. For each change we’ll record the time, tokens and reported cost. We’ll also count how many changes reach release without a verified editor review and how many need correcting after the editor approves them.

One long review can make the mean a poor guide to how long the next one might take. In tests on SQLite and PostgreSQL, we gave Archon three durations of one hour, two hours and 23 hours. The mean was eight hours and forty minutes. The median was two hours. These were test inputs. Our ten-change trial will supply the actual observations.

We [proposed](https://github.com/coleam00/Archon/pull/6437) adding the median to Archon’s run reports and command-line output alongside the mean and sample size. If the maintainers accept it, any team recording review times in Archon can see both figures. That’s why we took the change upstream.

## What can your team inspect today?

We can read the workflow that produced this draft and Archon’s record of its runs. We want to follow a change further, from each step into the model and tool calls it made, and keep that history readable when we change providers.

Pick one change an agent has already completed for your team. Try opening its workflow, its run record and its model and tool traces outside the provider that ran it. What can you take with you?

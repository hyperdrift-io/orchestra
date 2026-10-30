Preserving reasoning state can help an agent continue useful work across model calls. DSPy's reasoning-continuity work gives us a concrete way to examine what should be saved, what a model can reuse and how to keep a task portable.

We researched the issue because teams need to pick up work after a pause and retain meaningful progress when they change models. The practical design has three parts: keep the original conversation record, prepare an eligible request for the next model and maintain a readable handoff for people and other agents.

> Keep the original record. Give the next model the state it can use and the context it needs.

## The work DSPy has identified

In [issue #10675](https://github.com/stanfordnlp/dspy/issues/10675), Isaac Miller describes reasoning information being lost between model responses and reusable History. Some of that information is readable. Some is opaque data supplied by the provider, such as an encrypted reasoning item or a signature attached to a message part.

Those pieces support different purposes. A visible summary helps someone understand the response. Provider-native state may help a compatible model continue the conversation. An empty visible summary can still accompany meaningful native state.

GBX-Max1220 has [offered replay and save/load tests](https://github.com/stanfordnlp/dspy/issues/10675#issuecomment-6321503189). That is useful work: a test can check what reaches the next request after a prediction has been saved and restored. Our research examined the information that needs to survive that journey. At the time of this draft, these are separate efforts; we have no agreed collaboration or accepted implementation.

## Keep the whole message

A model response can contain several ordered parts: text, a tool call, reasoning and provider metadata. The safest starting point for preservation is the original typed message, including its identifiers and part order.

DSPy already has typed continuation state on messages and parts. Our local example uses those types to retain the original assistant message through two public `Predict` calls, with a History JSON save/load between them. Seven offline checks pass against DSPy main `25162c4f`, refreshed on 30 October 2026. The unmodified dictionary-based History path loses the synthetic opaque state; the explicit helper preserves it in the second request, and the existing OpenAI Responses writer renders the expected reasoning item. [DSPy message types](https://github.com/stanfordnlp/dspy/blob/25162c4fc05c2d2d019b0ffb5b6b2a9f315ec007/dspy/_vendor/lm15/types.py), [reasoning adapter on current main](https://github.com/stanfordnlp/dspy/blob/25162c4fc05c2d2d019b0ffb5b6b2a9f315ec007/dspy/adapters/types/reasoning.py).

This is a local example for evaluating an API choice. It uses private adapter and serialisation hooks on the current main revision, with synchronous, single-candidate question-and-answer calls. No provider received a request. Streaming, tool conversations and live compatibility need further checks. The example supplies a concrete result for discussion; it is not an accepted DSPy implementation.

## Prepare the next request for its destination

Saving the original message and sending it again are separate decisions. A stored record can preserve all its information while a request includes the parts eligible for its chosen model.

For OpenAI Responses, the documented continuation path includes reasoning items and, for relevant stateless use, encrypted content. Completed streamed items matter because some state arrives at completion. This describes the Responses contract, with its model and configuration requirements. [OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning#preserve-reasoning-across-calls).

Anthropic uses signed thinking and redacted thinking blocks. Its guidance ties preservation and replay to the model and conversation context. Keep those blocks intact and apply the documented compatibility rules when constructing a request. [Preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking).

Gemini can attach thought signatures to different kinds of parts, including tool calls. Preserve a signature on its original part and retain the required ordering. Generate Content and Interactions have distinct representations; an integration needs to follow the contract of the endpoint it uses. [Generate Content thought signatures](https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures).

The shared principle is useful across providers: preserve the information at rest, then let the provider integration decide how to form an eligible request. A model switch should leave the original stored record available for later use.

## Make a portable handoff useful

Consider an illustrative research task paused after an agent has inspected three sources and selected a promising direction. A quota limit means another model will continue it.

The handoff should carry the goal, verified findings, source links, decisions, unresolved questions and next action. Completed tool operations need their recorded results and identifiers, so the next agent can check what happened before acting again. The new model can work from that explicit context.

Native reasoning may also be reusable when the destination supports it. Cross-provider handoff generally relies on the readable work record. We would measure whether the next agent can continue the task correctly, while separately testing whether a compatible provider receives its original continuation state.

This is relevant to Orchestra's ambition for portable work. It remains a design recommendation from our research. We have not demonstrated a complete Orchestra checkpoint or measured a quality or cost improvement from DSPy reasoning continuity.

## Learn from changes that have landed

Other projects offer useful implementation precedents. LangChain's merged [reasoning-ID fix #39278](https://github.com/langchain-ai/langchain/pull/39278) preserves distinct reasoning items. Its merged [streaming fix #39635](https://github.com/langchain-ai/langchain/pull/39635) retains encrypted state supplied in completed response items. Both address a specific place where information needs to survive a conversion.

Pydantic AI's [typed messages](https://github.com/pydantic/pydantic-ai/blob/a549fd1a368a8677090e10b504d7cb5c12b2dd4a/pydantic_ai_slim/pydantic_ai/messages.py) retain provider information alongside content. Provider-specific mappings prepare those messages for the destination. These examples support reusing an existing representation and proving the next request with focused tests.

## A useful first contribution

Our proposed starting point is to preserve the original assistant message through DSPy's Prediction-to-History path, then prove a compatible continuation after JSON restoration. A focused implementation should also keep existing text-only History working.

The integration base matters. DSPy's [adapter migration #10713](https://github.com/stanfordnlp/dspy/pull/10713) merged on 28 October. We reran the example unchanged on current main and retained the seven passing checks. That verifies this narrow example on the recorded revision; it does not establish compatibility across released versions.

The two-turn example now supplies a concrete comparison for contributors and maintainers to review. Its helper API and deliberately narrow scope make the design choices visible. The next step is to agree the upstream capture boundary and test it against the broader cases already identified. A later article can report what was submitted, what changed through review and what was accepted, with each person's contribution credited.

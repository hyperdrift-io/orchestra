'use client';

import { useState } from 'react';

/*
 * Where the rule sits: the libraries that write GenAI telemetry, the conventions between them,
 * the backends that read it. Library names are the repository's own scenario names; the groups are ours.
 * Counts come from reference/reports at upstream main 6f98aef, read 30 October 2026. Picking a span
 * lights the libraries that emit it and fills the ones that record the conversation ID there.
 */

const groups = [
  { id: 'frameworks', label: 'Agent frameworks', libraries: ['langchain', 'llamaindex', 'crewai', 'autogen', 'openai-agents', 'pydantic-ai', 'google-adk', 'adk_a2a', 'agent-framework', 'claude-agent-sdk', 'haystack', 'dspy'] },
  { id: 'clients', label: 'Model clients', libraries: ['openai', 'anthropic', 'google-genai', 'vertexai', 'azure-openai', 'azure-ai-inference', 'aws-bedrock', 'cohere', 'mistralai', 'groq', 'litellm'] },
  { id: 'hosted', label: 'Hosted agents and protocols', libraries: ['openai-assistants', 'aws-bedrock-agent', 'aws-bedrock-agentcore', 'azure-ai-foundry', 'a2a-python'] },
  { id: 'evaluation', label: 'Evaluation', libraries: ['deepeval', 'azure-ai-evaluation'] },
] as const;

/** Every span that references `gen_ai.conversation.id`, the reference libraries that emit it and those that record the ID on it. */
const spans = [
  { id: 'agent', label: 'Agent, in process', emits: ['adk_a2a', 'agent-framework', 'autogen', 'crewai', 'google-adk', 'langchain', 'openai-agents', 'pydantic-ai'], records: ['adk_a2a', 'google-adk'] },
  { id: 'remote', label: 'Remote agent', emits: ['aws-bedrock-agent', 'azure-ai-foundry', 'google-genai', 'openai-assistants'], records: ['aws-bedrock-agent', 'openai-assistants'] },
  { id: 'workflow', label: 'Workflow', emits: ['crewai', 'google-adk', 'langchain', 'openai-agents'], records: ['google-adk'] },
  { id: 'inference', label: 'Inference', emits: ['adk_a2a', 'agent-framework', 'anthropic', 'aws-bedrock', 'azure-ai-inference', 'azure-openai', 'claude-agent-sdk', 'cohere', 'google-genai', 'groq', 'litellm', 'mistralai', 'openai', 'vertexai'], records: ['adk_a2a', 'agent-framework'] },
  { id: 'tool', label: 'Tool execution', emits: ['agent-framework', 'autogen', 'crewai', 'google-adk', 'google-genai', 'langchain', 'llamaindex', 'openai-agents', 'openai-assistants', 'pydantic-ai', 'vertexai'], records: ['google-adk', 'openai-assistants'] },
  { id: 'a2a-client', label: 'A2A client', emits: ['a2a-python'], records: ['a2a-python'] },
  { id: 'a2a-server', label: 'A2A server', emits: ['a2a-python'], records: ['a2a-python'] },
] as const;

type SpanId = (typeof spans)[number]['id'];
type Pick = 'all' | SpanId;

const recordsAnywhere = new Set<string>(spans.flatMap((span) => span.records));
const libraryCount = groups.reduce((sum, group) => sum + group.libraries.length, 0);
const places = spans.reduce((sum, span) => sum + span.emits.length, 0);
const recorded = spans.reduce((sum, span) => sum + span.records.length, 0);

/** Backends whose own documentation describes reading the GenAI conventions, read 30 October 2026. `groups`: the docs group a conversation by `gen_ai.conversation.id`. */
const readers: readonly { name: string; groups?: boolean }[] = [
  { name: 'Datadog', groups: true }, { name: 'Honeycomb', groups: true }, { name: 'Grafana Cloud', groups: true }, { name: 'Dynatrace', groups: true },
  { name: 'Opik', groups: true }, { name: 'W&B Weave', groups: true }, { name: 'Pydantic Logfire', groups: true },
  { name: 'Langfuse' }, { name: 'Arize Phoenix' }, { name: 'MLflow' }, { name: 'LangSmith' }, { name: 'Braintrust' }, { name: 'New Relic' }, { name: 'Google Cloud' },
];
const grouping = readers.filter((reader) => reader.groups).length;

/** One document between the libraries that write GenAI telemetry and the backends that read it. */
export function ConventionsReach() {
  const [pick, setPick] = useState<Pick>('all');
  const span = spans.find((entry) => entry.id === pick);
  const state = (library: string) => {
    if (!span) return recordsAnywhere.has(library) ? 'records' : 'quiet';
    if ((span.records as readonly string[]).includes(library)) return 'records';
    return (span.emits as readonly string[]).includes(library) ? 'emits' : 'dim';
  };
  const summary = span
    ? { title: `${span.label}: ${span.records.length} of ${span.emits.length}.`, text: `${span.emits.length === 1 ? 'One library emits' : `${span.emits.length} libraries emit`} this span in the reference scenarios; ${span.records.length === span.emits.length ? 'it records' : `${span.records.length} record`} the conversation ID on it.` }
    : { title: `In their scenarios, ${recordsAnywhere.size} of ${libraryCount} libraries record the conversation ID.`, text: `Count every place a library emits a span that references the attribute and you get ${places}; the ID is in ${recorded} of them. The rule in #556 is how a conversation that the framework knows can reach the spans nested inside it.` };
  return <section data-visual="conventions-reach" data-pick={pick} aria-label="Where the rule sits between the libraries that write GenAI telemetry and the backends that read it">
    <header><p>FROM THE REPOSITORY’S REFERENCE REPORTS / 30 OCTOBER 2026</p><h3>One document between <em>writers and readers</em></h3><p>The reference scenarios check {libraryCount} libraries against the GenAI conventions, and backends read the same names. Gold marks a library that records the conversation ID and a backend that groups conversations by it. Pick a span to see which libraries emit it.</p></header>
    <div data-coverage="">
      <h4>Where the conversation ID is recorded today <small>{recorded} of {places}</small></h4>
      <nav aria-label="Pick a span">
        <button type="button" aria-pressed={pick === 'all'} onClick={() => setPick('all')}><span>All spans</span>{' '}<small>{recorded} of {places}</small></button>
        {spans.map((entry) => <button key={entry.id} type="button" aria-pressed={pick === entry.id} onClick={() => setPick(entry.id)}>
          <span>{entry.label}</span>
          <i aria-hidden="true">{entry.emits.map((library) => <b key={library} data-on={(entry.records as readonly string[]).includes(library) || undefined} />)}</i>
          {' '}<small>{entry.records.length} of {entry.emits.length}</small>
        </button>)}
      </nav>
    </div>
    <p data-outcome="" role="status"><strong>{summary.title}</strong>{summary.text}</p>
    <div data-reach="">
      <section data-writers="" aria-label="Libraries in the reference scenarios">
        <h4>Write telemetry <small>{libraryCount} libraries · scenario names</small></h4>
        {groups.map((group) => <div key={group.id} data-group={group.id}><h5>{group.label} <span>{group.libraries.length}</span></h5><ul>{group.libraries.map((library) => <li key={library} data-state={state(library)}><code>{library}</code></li>)}</ul></div>)}
      </section>
      <svg data-funnel="in" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="M2 0L44 24M26 0L47 24M50 0V24M74 0L53 24M98 0L56 24" /></svg>
      <div data-waist="">
        <p>OpenTelemetry semantic conventions for generative AI <small>Development status</small></p>
        <ul aria-label="What the conventions cover"><li>Inference</li><li>Embeddings</li><li>Agents</li><li>Tools</li><li>Metrics</li><li>Events</li><li>MCP</li><li>A2A</li></ul>
        <div data-ours=""><span>Attributes shared across operations</span><small>#556 · merged 30 October 2026 · <code>gen_ai.conversation.id</code></small></div>
      </div>
      <svg data-funnel="out" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="M44 0L2 24M47 0L26 24M50 0V24M53 0L74 24M56 0L98 24" /></svg>
      <section data-readers="" aria-label="Backends that read the conventions">
        <h4>Read telemetry <small>{readers.length} backends document the conventions</small></h4>
        <ul>{readers.map((reader) => <li key={reader.name} data-groups={reader.groups || undefined}>{reader.name}</li>)}</ul>
        <p>Gold: {grouping} group an agent conversation by <code>gen_ai.conversation.id</code>, so the spans that carry it join the conversation.</p>
      </section>
    </div>
    <footer>Counts from the repository’s reference reports at main 6f98aef, read 30 October 2026 · library groups are ours · a scenario shows what it exercises, not everything a library can do · backends from their own documentation, read 30 October 2026</footer>
  </section>;
}

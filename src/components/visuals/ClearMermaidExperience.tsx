'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { examples, labelError, toMermaid, type Diagram } from './clear-mermaid-examples';
import styles from './ClearMermaidExperience.module.css';

type Reader = HTMLElement & { select: (id: string, history?: boolean) => void; fit: () => void };
type Renderer = { renderSource: (host: HTMLElement, source: string, options?: { isCurrent: () => boolean }) => Promise<{ reader: Reader }> };
type Mermaid = { initialize: (config: object) => void; render: (id: string, source: string) => Promise<{ svg: string }> };
let rendererPromise: Promise<Renderer> | undefined;
let mermaidPromise: Promise<Mermaid> | undefined;
function loadReader() {
  const url = '/vendor/clear-mermaid/clear-mermaid.js';
  return rendererPromise ??= import(/* webpackIgnore: true */ url).catch(error => { rendererPromise = undefined; throw error; });
}
function loadMermaid() {
  return mermaidPromise ??= new Promise<Mermaid>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/vendor/mermaid/mermaid-12.2.0.min.js';
    script.onload = () => {
      const mermaid = (window as unknown as { mermaid: Mermaid }).mermaid;
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'default', flowchart: { useMaxWidth: true } });
      resolve(mermaid);
    };
    script.onerror = () => { script.remove(); mermaidPromise = undefined; reject(new Error('Mermaid could not load. Try reloading the page.')); };
    document.head.append(script);
  });
}

function ClearDiagram({ source, selected, onNode, comparison = false }: { source: string; selected?: string; onNode?: (id: string) => void; comparison?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const reader = useRef<Reader | null>(null);
  const onNodeRef = useRef(onNode);
  const selectedRef = useRef(selected);
  onNodeRef.current = onNode;
  selectedRef.current = selected;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    const mount = document.createElement('div');
    container.replaceChildren(mount);
    let current = true;
    setLoading(true); setError('');
    const choose = (event: MouseEvent) => {
      const node = event.composedPath().find(element => element instanceof HTMLElement && element.dataset.node) as HTMLElement | undefined;
      if (node?.dataset.node) onNodeRef.current?.(node.dataset.node);
    };
    mount.addEventListener('click', choose);
    loadReader().then(async ({ renderSource }) => {
      if (!current) return;
      const rendered = await renderSource(mount, source, { isCurrent: () => current });
      if (!current) return;
      reader.current = rendered.reader;
      const composition = rendered.reader.shadowRoot?.querySelector('.composition');
      if (composition) composition.textContent = 'Clear Mermaid';
      if (comparison && rendered.reader.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = '.viewport { height: 520px !important; }';
        rendered.reader.shadowRoot.append(style);
        rendered.reader.fit();
      }
      if (selectedRef.current) rendered.reader.select(selectedRef.current, false);
    }).catch(error => { if (current) setError(error instanceof Error ? error.message : 'The diagram could not render.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; reader.current = null; mount.removeEventListener('click', choose); mount.remove(); };
  }, [source, comparison]);
  useEffect(() => { if (selected) reader.current?.select(selected, false); }, [selected]);
  return <div className={styles.reader}>
    {loading && <p role="status">Drawing the connections…</p>}
    {error && <p role="alert">{error} The Mermaid source remains available below.</p>}
    <div ref={host} aria-busy={loading} />
  </div>;
}

function MermaidDiagram({ source }: { source: string }) {
  const host = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^a-z0-9]/gi, '');
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let current = true;
    setError(''); setLoading(true); setZoom(1);
    loadMermaid().then(mermaid => mermaid.render(`baseline${id}`, source)).then(({ svg }) => {
      if (!current || !host.current) return;
      const shadow = host.current.shadowRoot ?? host.current.attachShadow({ mode: 'open' });
      shadow.innerHTML = `<style>:host { display:block; color:#333; } svg { width:100%;height:auto;max-width:none !important;display:block; }</style>${svg}`;
      shadow.querySelector('svg')?.setAttribute('aria-label', 'Mermaid rendering of the shared example');
    }).catch(error => { if (current) setError(error instanceof Error ? error.message : 'Mermaid could not render this example.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [source, id]);
  return <div className={styles.baseline}>
    <div className={styles.zoom} role="group" aria-label="Mermaid diagram zoom"><button type="button" onClick={() => setZoom(z => Math.max(.5, z / 1.25))} aria-label="Zoom Mermaid out">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom(z => Math.min(3, z * 1.25))} aria-label="Zoom Mermaid in">+</button><button type="button" onClick={() => setZoom(1)}>Overview</button></div>
    {loading && <p role="status">Drawing the connections…</p>}{error && <p role="alert">{error}</p>}
    <div className={styles.baselineViewport} tabIndex={0} aria-label="Mermaid diagram; scroll to explore"><div ref={host} className={styles.baselineDrawing} style={{ width: `${zoom * 100}%` }} /></div>
  </div>;
}

function Source({ source }: { source: string }) {
  const [message, setMessage] = useState('');
  const text = useRef<HTMLTextAreaElement>(null);
  async function copy() {
    try { await navigator.clipboard.writeText(source); setMessage('Mermaid source copied.'); }
    catch { text.current?.focus(); text.current?.select(); setMessage('Select and copy the source below.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([source], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'clear-mermaid-example.mmd'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <details className={styles.source}><summary>Mermaid source</summary><textarea ref={text} readOnly value={source} aria-label="Mermaid source" rows={8} spellCheck={false} /><div className={styles.actions}><button type="button" onClick={copy}>Copy source</button><button type="button" onClick={download}>Download source</button><span role="status">{message}</span></div></details>;
}

export function MermaidComparison() {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState<'clear' | 'mermaid'>('clear');
  const example = examples[index];
  const source = toMermaid(example.diagram);
  return <section className={styles.experience} aria-label="Compare the same diagram in Mermaid and Clear Mermaid">
    <div className={styles.examples} role="group" aria-label="Choose a comparison">{examples.map((item, i) => <button type="button" key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}>{item.title}</button>)}</div>
    <p className={styles.task}>{example.task}</p>
    <div className={styles.rendererTabs} role="group" aria-label="Choose a renderer"><button type="button" aria-pressed={view === 'mermaid'} onClick={() => setView('mermaid')}>Mermaid</button><button type="button" aria-pressed={view === 'clear'} onClick={() => setView('clear')}>Clear Mermaid</button></div>
    <div className={styles.comparison}>
      <section hidden={view !== 'mermaid'}><h3>Mermaid <small>12.2.0 · standard theme</small></h3>{view === 'mermaid' && <MermaidDiagram source={source} />}</section>
      <section hidden={view !== 'clear'}><h3>Clear Mermaid <small>0.1 · browser reader</small></h3>{view === 'clear' && <ClearDiagram source={source} comparison />}</section>
    </div>
    <p className={styles.notice}>{example.notice}</p>
    <p className={styles.note}>Switch renderer to compare the same source, direction and 520px diagram viewport. Both views can be enlarged. Clear Mermaid also lets you inspect steps and read their relationships.</p>
    <Source source={source} />
  </section>;
}

export function ClearMermaidEditor() {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<Diagram[]>([examples[0].diagram]);
  const diagram = history[history.length - 1];
  const [selected, setSelected] = useState('');
  const [draftLabel, setDraftLabel] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [target, setTarget] = useState('');
  const [edgeLabel, setEdgeLabel] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newDecision, setNewDecision] = useState(false);
  const [message, setMessage] = useState('Select a step in the diagram to edit it.');
  const [error, setError] = useState('');
  const nextId = useRef(1);
  const step = diagram.steps.find(item => item.id === selected);
  const source = toMermaid(diagram);
  const controlsId = useId();
  function commit(next: Diagram, notice: string) { setHistory(old => [...old.slice(-29), next]); setMessage(notice); setError(''); }
  function choose(id: string) {
    if (connecting && step) { connect(id); return; }
    const chosen = diagram.steps.find(item => item.id === id);
    setSelected(id); setDraftLabel(chosen?.label ?? ''); setTarget(''); setError('');
    setMessage(chosen ? `Selected ${chosen.label}. Edit its name or connect it to another step.` : 'Select a step.');
  }
  function connect(destination: string) {
    if (!step || !destination) { setError('Choose a destination step.'); return; }
    if (destination === selected) { setError('Choose another step for this connection.'); return; }
    const invalid = edgeLabel.trim() ? labelError(edgeLabel) : '';
    if (invalid) { setError(invalid); return; }
    if (diagram.connections.length >= 40) { setError('This example supports up to 40 connections.'); return; }
    if (diagram.connections.some(edge => edge.from === selected && edge.to === destination && edge.label === edgeLabel.trim())) { setError('That connection is already present.'); return; }
    const targetStep = diagram.steps.find(item => item.id === destination);
    commit({ ...diagram, connections: [...diagram.connections, { id: `added-edge-${nextId.current++}`, from: selected, to: destination, label: edgeLabel.trim() }] }, `Connected ${step.label} to ${targetStep?.label}.`);
    setConnecting(false); setTarget(''); setEdgeLabel('');
  }
  function loadExample(i: number) { setIndex(i); setHistory([examples[i].diagram]); setSelected(''); setDraftLabel(''); setConnecting(false); setTarget(''); setEdgeLabel(''); setError(''); setMessage('Example restored. Select a step to edit it.'); }
  return <section className={styles.experience} aria-label="Edit a Clear Mermaid diagram">
    <div className={styles.examples} role="group" aria-label="Choose a diagram to edit">{examples.map((example, i) => <button type="button" key={example.id} aria-pressed={index === i} onClick={() => loadExample(i)}>{example.title}</button>)}</div>
    <p className={styles.task}>Select a step, change its words or connect it to another step. The layout and Mermaid source update together.</p>
    <div className={styles.actions}><button type="button" disabled={history.length < 2} onClick={() => { setHistory(old => old.slice(0, -1)); setSelected(''); setConnecting(false); setMessage('Last change undone.'); setError(''); }}>Undo</button><button type="button" onClick={() => loadExample(index)}>Reset example</button><span className={styles.note}>Edits stay in this page. Copy or download the source to keep them.</span></div>
    <p className={styles.status} role="status">{connecting && step ? `Choose a destination in the diagram for “${step.label}”.` : message}</p>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <ClearDiagram source={source} selected={selected} onNode={choose} />
    <div className={styles.editorControls} id={controlsId}>
      <section className={styles.controlSection} aria-label="Edit a step"><h3>Edit a step</h3>
        <label>Selected step<select aria-label="Selected step" value={selected} onChange={event => { setConnecting(false); choose(event.target.value); }}><option value="">Choose a step</option>{diagram.steps.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        {step && <><form onSubmit={event => { event.preventDefault(); const invalid = labelError(draftLabel); if (invalid) { setError(invalid); return; } commit({ ...diagram, steps: diagram.steps.map(item => item.id === selected ? { ...item, label: draftLabel.trim() } : item) }, 'Step name updated.'); }}><label>Step name<input value={draftLabel} onChange={event => setDraftLabel(event.target.value)} maxLength={160} /></label><button type="submit">Save name</button></form>
          <div className={styles.actions}><button type="button" aria-pressed={connecting} onClick={() => { setConnecting(!connecting); setError(''); }}>{connecting ? 'Cancel connection' : 'Connect to another step'}</button><button type="button" onClick={() => { commit({ steps: diagram.steps.filter(item => item.id !== selected), connections: diagram.connections.filter(edge => edge.from !== selected && edge.to !== selected) }, 'Step and its connections removed.'); setSelected(''); setConnecting(false); }} disabled={diagram.steps.length <= 1}>Remove step</button></div>
          <form onSubmit={event => { event.preventDefault(); connect(target); }}><label>Connection label <small>(optional)</small><input value={edgeLabel} maxLength={160} onChange={event => setEdgeLabel(event.target.value)} /></label><label>Destination<select aria-label="Destination" value={target} onChange={event => setTarget(event.target.value)}><option value="">Choose a destination</option>{diagram.steps.filter(item => item.id !== selected).map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><button type="submit">Add connection</button></form>
        </>}
      </section>
      <section className={styles.controlSection} aria-label="Add a step"><h3>Add a step</h3><form onSubmit={event => { event.preventDefault(); const invalid = labelError(newLabel); if (invalid) { setError(invalid); return; } if (diagram.steps.length >= 20) { setError('This example supports up to 20 steps.'); return; } const id = `added${nextId.current++}`; commit({ ...diagram, steps: [...diagram.steps, { id, label: newLabel.trim(), decision: newDecision }] }, 'Step added. Select it to connect it.'); setSelected(id); setDraftLabel(newLabel.trim()); setNewLabel(''); setNewDecision(false); setConnecting(false); }}><label>New step name<input value={newLabel} maxLength={160} onChange={event => setNewLabel(event.target.value)} /></label><label className={styles.checkbox}><input type="checkbox" checked={newDecision} onChange={event => setNewDecision(event.target.checked)} />This is a question with different outcomes</label><button type="submit">Add step</button></form></section>
    </div>
    <details className={styles.connections}><summary>Manage connections ({diagram.connections.length})</summary><ul>{diagram.connections.map(edge => <li key={edge.id}><span>{diagram.steps.find(item => item.id === edge.from)?.label} <b aria-label="connects to">→</b> {diagram.steps.find(item => item.id === edge.to)?.label}{edge.label && <small>{edge.label}</small>}</span><button type="button" onClick={() => commit({ ...diagram, connections: diagram.connections.filter(item => item.id !== edge.id) }, 'Connection removed.')} aria-label={`Remove connection from ${diagram.steps.find(item => item.id === edge.from)?.label} to ${diagram.steps.find(item => item.id === edge.to)?.label}`}>Remove</button></li>)}</ul></details>
    <Source source={source} />
    <p className={styles.note}>A small visual editor for these examples: steps, questions and directed connections. It does not import arbitrary Mermaid diagrams. Reloading or changing examples resets your edits.</p>
  </section>;
}

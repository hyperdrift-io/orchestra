'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { examples, labelError, toMermaid, domainPath, domainMembers, type Diagram } from './clear-mermaid-examples';
import styles from './ClearMermaidExperience.module.css';

type Reader = HTMLElement & { select: (id: string, history?: boolean) => void; fit: () => void; zoom: (scale: number) => void; viewport: HTMLElement; layout: { groups: { id: string; x: number; y: number; width: number; height: number }[] } };
type Renderer = { renderSource: (host: HTMLElement, source: string, options?: { isCurrent: () => boolean }) => Promise<{ reader: Reader }> };
type Mermaid = { initialize: (config: object) => void; render: (id: string, source: string) => Promise<{ svg: string }> };
let rendererPromise: Promise<Renderer> | undefined;
let mermaidPromise: Promise<Mermaid> | undefined;
function loadReader(): Promise<Renderer> {
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

function inspectReaderDomain(reader: Reader, id?: string) {
  reader.shadowRoot?.querySelectorAll<HTMLElement>('.domain').forEach(domain => domain.dataset.inspected = String(domain.dataset.domain === id));
  const group = reader.layout.groups.find(domain => domain.id === id);
  if (!group) { if (!id) reader.fit(); return; }
  const scale = Math.min(1, (reader.viewport.clientWidth - 32) / group.width, (reader.viewport.clientHeight - 32) / group.height);
  reader.zoom(scale);
  reader.viewport.scrollLeft = Math.max(0, group.x * scale - 16);
  reader.viewport.scrollTop = Math.max(0, group.y * scale - 16);
}

function ClearDiagram({ source, selected, onNode, comparison = false, selectedDomain, onDomain }: { source: string; selected?: string; onNode?: (id: string) => void; comparison?: boolean; selectedDomain?: string; onDomain?: (id: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const reader = useRef<Reader | null>(null);
  const onNodeRef = useRef(onNode);
  const selectedRef = useRef(selected);
  const domainRef = useRef(selectedDomain);
  const onDomainRef = useRef(onDomain);
  domainRef.current = selectedDomain;
  onDomainRef.current = onDomain;
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
      const overview = event.composedPath().some(element => element instanceof HTMLElement && (element.dataset.action === 'fit' || element.classList.contains('graph-map')));
      if (overview) onDomainRef.current?.('');
      const node = event.composedPath().find(element => element instanceof HTMLElement && element.dataset.node) as HTMLElement | undefined;
      if (node?.dataset.node) onNodeRef.current?.(node.dataset.node);
      const domain = event.composedPath().find(element => element instanceof HTMLButtonElement && element.dataset.domainChoice) as HTMLElement | undefined;
      if (domain?.dataset.domainChoice) onDomainRef.current?.(domain.dataset.domainChoice);
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
      if (onDomainRef.current && rendered.reader.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = '.domain-heading button { pointer-events:auto; font:inherit; color:inherit; text-align:left; background:none; border:0; padding:0; cursor:pointer; } .domain-heading button:focus-visible { outline:3px solid #172b40; outline-offset:3px; } .domain[data-inspected="true"] { outline:3px solid #172b40; outline-offset:2px; }';
        rendered.reader.shadowRoot.append(style);
        rendered.reader.shadowRoot.querySelectorAll<HTMLElement>('.domain').forEach(domain => {
          const title = domain.querySelector('strong');
          if (!title) return;
          const button = document.createElement('button');
          button.type = 'button'; button.dataset.domainChoice = domain.dataset.domain;
          button.textContent = title.textContent;
          button.setAttribute('aria-label', `Inspect ${title.textContent} domain`);
          title.replaceWith(button);
        });
      }
      inspectReaderDomain(rendered.reader, domainRef.current);
      if (selectedRef.current) rendered.reader.select(selectedRef.current, false);
    }).catch(error => { if (current) setError(error instanceof Error ? error.message : 'The diagram could not render.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; reader.current = null; mount.removeEventListener('click', choose); mount.remove(); };
  }, [source, comparison]);
  useEffect(() => { if (selected) reader.current?.select(selected, false); }, [selected]);
  useEffect(() => { if (reader.current && !selected) inspectReaderDomain(reader.current, selectedDomain); }, [selectedDomain, selected]);
  return <div className={styles.reader}>
    {loading && <p role="status">Drawing the connections…</p>}
    {error && <p role="alert">{error} The Mermaid source remains available below.</p>}
    <div ref={host} aria-busy={loading} />
  </div>;
}

function MermaidDiagram({ source }: { source: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
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
      const drawing = shadow.querySelector('svg');
      drawing?.setAttribute('aria-label', 'Mermaid rendering of the shared example');
      const box = drawing?.viewBox.baseVal;
      if (box?.width && box.height) setDimensions({ width: box.width, height: box.height });
    }).catch(error => { if (current) setError(error instanceof Error ? error.message : 'Mermaid could not render this example.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [source, id]);
  function fit() {
    if (!viewport.current) return;
    setZoom(Math.min(1, (viewport.current.clientWidth - 32) / dimensions.width, (viewport.current.clientHeight - 32) / dimensions.height));
    viewport.current.scrollTo(0, 0);
  }
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => { setZoom(Math.min(1, (element.clientWidth - 32) / dimensions.width, (element.clientHeight - 32) / dimensions.height)); element.scrollTo(0, 0); });
    observer.observe(element);
    return () => observer.disconnect();
  }, [dimensions]);
  return <div className={styles.baseline}>
    <div className={styles.zoom} role="group" aria-label="Mermaid diagram zoom"><button type="button" onClick={() => setZoom(z => Math.max(.1, z / 1.25))} aria-label="Zoom Mermaid out">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom(z => Math.min(3, z * 1.25))} aria-label="Zoom Mermaid in">+</button><button type="button" onClick={() => setZoom(1)}>Readable size</button><button type="button" onClick={fit}>Overview</button></div>
    {loading && <p role="status">Drawing the connections…</p>}{error && <p role="alert">{error}</p>}
    <div ref={viewport} className={styles.baselineViewport} tabIndex={0} aria-label="Mermaid diagram; scroll to explore"><div ref={host} className={styles.baselineDrawing} style={{ width: `${dimensions.width * zoom}px` }} /></div>
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

type DiagramView = 'clear' | 'mermaid';
function DiagramComparison({ source, view, onView, selected, onNode, selectedDomain, onDomain }: {
  source: string; view: DiagramView; onView: (view: DiagramView) => void;
  selected?: string; onNode?: (id: string) => void; selectedDomain?: string; onDomain?: (id: string) => void;
}) {
  return <>
    <div className={styles.rendererTabs} role="group" aria-label="Choose a renderer"><button type="button" aria-pressed={view === 'mermaid'} onClick={() => onView('mermaid')}>Mermaid basic</button><button type="button" aria-pressed={view === 'clear'} onClick={() => onView('clear')}>Clear Mermaid</button></div>
    <div className={styles.comparison}>
      <section hidden={view !== 'mermaid'}><h3>Mermaid <small>12.2.0 · standard theme</small></h3>{view === 'mermaid' && <MermaidDiagram source={source} />}</section>
      <section hidden={view !== 'clear'}><h3>Clear Mermaid <small>0.1 · browser reader</small></h3>{view === 'clear' && <ClearDiagram source={source} comparison selected={selected} onNode={onNode} selectedDomain={selectedDomain} onDomain={onDomain} />}</section>
    </div>
    <p className={styles.note}>Both renderers receive the same source, direction and 520px diagram viewport. Switch after an edit to compare that exact change.</p>
  </>;
}

export function MermaidComparison() {
  const [index, setIndex] = useState(examples.findIndex(example => example.id === 'decisions'));
  const [view, setView] = useState<'clear' | 'mermaid'>('clear');
  const example = examples[index];
  const source = toMermaid(example.diagram);
  return <section className={styles.experience} aria-label="Compare the same diagram in Mermaid and Clear Mermaid">
    <div className={styles.examples} role="group" aria-label="Choose a comparison">{examples.map((item, i) => <button type="button" key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}>{item.title}</button>)}</div>
    <p className={styles.task}>{example.task}</p>
    <DiagramComparison source={source} view={view} onView={setView} />
    <p className={styles.notice}>{example.notice}</p>
    <Source source={source} />
  </section>;
}

export function ClearMermaidEditor() {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState<DiagramView>('clear');
  const [selectedDomain, setSelectedDomain] = useState('checkout_domain');
  const [newDomain, setNewDomain] = useState('');
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
  const domains = diagram.domains ?? [];
  const inspectedDomain = domains.find(domain => domain.id === selectedDomain);
  const inspectedMembers = inspectedDomain ? domainMembers(diagram, inspectedDomain.id) : [];
  function inspectDomain(id: string) { setSelectedDomain(id); setSelected(''); setConnecting(false); setView('clear'); setMessage(id ? `Inspecting ${domainPath(diagram, id)}.` : 'Choose a domain to inspect its contents.'); }
  function commit(next: Diagram, notice: string) {
    const emptied = (diagram.domains ?? []).find(domain => domainMembers(diagram, domain.id).length > 0 && domainMembers(next, domain.id).length === 0);
    if (emptied) { setError(`Keep at least one step inside ${emptied.label}. This editor retains the existing domain boundaries.`); return false; }
    setHistory(old => [...old.slice(-29), next]); setMessage(notice); setError(''); return true;
  }
  function choose(id: string) {
    if (connecting && step) { connect(id); return; }
    const chosen = diagram.steps.find(item => item.id === id);
    setSelectedDomain(''); setSelected(id); setDraftLabel(chosen?.label ?? ''); setTarget(''); setError('');
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
  function loadExample(i: number) { setSelectedDomain(examples[i].id === 'nested' ? 'checkout_domain' : ''); setNewDomain(''); setView('clear'); setIndex(i); setHistory([examples[i].diagram]); setSelected(''); setDraftLabel(''); setConnecting(false); setTarget(''); setEdgeLabel(''); setError(''); setMessage('Example restored. Select a step to edit it.'); }
  return <section className={styles.experience} aria-label="Edit a Clear Mermaid diagram">
    <div className={styles.examples} role="group" aria-label="Choose a diagram to edit">{examples.map((example, i) => <button type="button" key={example.id} aria-pressed={index === i} onClick={() => loadExample(i)}>{example.title}</button>)}</div>
    <p className={styles.task}>{examples[index].task}</p>
    {examples[index].prompts && <div className={styles.actions} role="group" aria-label="Explore this architecture">{examples[index].prompts.map(prompt => <button type="button" key={prompt.label} onClick={() => { setView('clear'); if (prompt.domain) inspectDomain(prompt.domain); if (prompt.node) { setConnecting(false); choose(prompt.node); } }}>{prompt.label}</button>)}</div>}
    <div className={styles.actions}><button type="button" disabled={history.length < 2} onClick={() => { setHistory(old => old.slice(0, -1)); setSelected(''); setConnecting(false); setMessage('Last change undone.'); setError(''); }}>Undo</button><button type="button" onClick={() => loadExample(index)}>Reset example</button><span className={styles.note}>Edits stay in this page. Copy or download the source to keep them.</span></div>
    <p className={styles.status} role="status">{connecting && step ? `Choose a destination in the diagram for “${step.label}”.` : message}</p>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {view === 'clear' && inspectedDomain && <p className={styles.notice}>{inspectedDomain.label} selected · <button type="button" onClick={() => inspectDomain('')}>Show whole diagram</button>. Mermaid basic opens the whole diagram; use this button for an overview comparison.</p>}
    <DiagramComparison source={source} view={view} onView={next => { setView(next); setConnecting(false); }} selected={selected} onNode={choose} selectedDomain={selectedDomain} onDomain={inspectDomain} />
    {domains.length > 0 && <section className={styles.domainInspector} aria-label="Inspect domain membership"><label>Inspect a domain<select aria-label="Inspect a domain" value={selectedDomain} onChange={event => inspectDomain(event.target.value)}><option value="">Choose a domain</option>{domains.map(domain => <option key={domain.id} value={domain.id}>{domainPath(diagram, domain.id)}</option>)}</select></label>{inspectedDomain && <div><h3>{domainPath(diagram, inspectedDomain.id)}</h3><p>{inspectedMembers.length} steps inside this boundary, including nested domains.</p><ul>{inspectedMembers.map(member => <li key={member.id}><button type="button" onClick={() => choose(member.id)}>{member.label}</button><small>{domainPath(diagram, member.domain)}</small></li>)}</ul></div>}</section>}
    <div className={styles.editorControls} id={controlsId}>
      <section className={styles.controlSection} aria-label="Edit a step"><h3>Edit a step</h3>
        <label>Selected step<select aria-label="Selected step" value={selected} onChange={event => { setConnecting(false); choose(event.target.value); }}><option value="">Choose a step</option>{diagram.steps.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        {step && <><form onSubmit={event => { event.preventDefault(); const invalid = labelError(draftLabel); if (invalid) { setError(invalid); return; } commit({ ...diagram, steps: diagram.steps.map(item => item.id === selected ? { ...item, label: draftLabel.trim() } : item) }, 'Step name updated.'); }}><label>Step name<input value={draftLabel} onChange={event => setDraftLabel(event.target.value)} maxLength={160} /></label><button type="submit">Save name</button></form>
          {domains.length > 0 && <label>Step domain<select aria-label="Step domain" value={step.domain ?? ''} onChange={event => { const destination = event.target.value || undefined; commit({ ...diagram, steps: diagram.steps.map(item => item.id === selected ? { ...item, domain: destination } : item) }, `Moved ${step.label} to ${domainPath(diagram, destination) || 'outside all domains'}.`); }}><option value="">Outside all domains</option>{domains.map(domain => <option key={domain.id} value={domain.id}>{domainPath(diagram, domain.id)}</option>)}</select></label>}
          <div className={styles.actions}><button type="button" aria-pressed={connecting} onClick={() => { setView('clear'); setConnecting(!connecting); setError(''); }}>{connecting ? 'Cancel connection' : 'Connect to another step'}</button><button type="button" onClick={() => { commit({ ...diagram, steps: diagram.steps.filter(item => item.id !== selected), connections: diagram.connections.filter(edge => edge.from !== selected && edge.to !== selected) }, 'Step and its connections removed.'); setSelected(''); setConnecting(false); }} disabled={diagram.steps.length <= 1}>Remove step</button></div>
          <form onSubmit={event => { event.preventDefault(); connect(target); }}><label>Connection label <small>(optional)</small><input value={edgeLabel} maxLength={160} onChange={event => setEdgeLabel(event.target.value)} /></label><label>Destination<select aria-label="Destination" value={target} onChange={event => setTarget(event.target.value)}><option value="">Choose a destination</option>{diagram.steps.filter(item => item.id !== selected).map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><button type="submit">Add connection</button></form>
        </>}
      </section>
      <section className={styles.controlSection} aria-label="Add a step"><h3>Add a step</h3><form onSubmit={event => { event.preventDefault(); const invalid = labelError(newLabel); if (invalid) { setError(invalid); return; } if (diagram.steps.length >= 20) { setError('This example supports up to 20 steps.'); return; } const id = `added${nextId.current++}`; commit({ ...diagram, steps: [...diagram.steps, { id, label: newLabel.trim(), decision: newDecision, domain: newDomain || undefined }] }, 'Step added. Select it to connect it.'); setSelected(id); setDraftLabel(newLabel.trim()); setNewLabel(''); setNewDecision(false); setConnecting(false); }}><label>New step name<input value={newLabel} maxLength={160} onChange={event => setNewLabel(event.target.value)} /></label>{domains.length > 0 && <label>New step domain<select aria-label="New step domain" value={newDomain} onChange={event => setNewDomain(event.target.value)}><option value="">Outside all domains</option>{domains.map(domain => <option key={domain.id} value={domain.id}>{domainPath(diagram, domain.id)}</option>)}</select></label>}<label className={styles.checkbox}><input type="checkbox" checked={newDecision} onChange={event => setNewDecision(event.target.checked)} />This is a question with different outcomes</label><button type="submit">Add step</button></form></section>
    </div>
    <details className={styles.connections}><summary>Manage connections ({diagram.connections.length})</summary><ul>{diagram.connections.map(edge => <li key={edge.id}><span>{diagram.steps.find(item => item.id === edge.from)?.label} <b aria-label={edge.bidirectional ? "exchanges with" : "connects to"}>{edge.bidirectional ? '↔' : '→'}</b> {diagram.steps.find(item => item.id === edge.to)?.label}{edge.label && <small>{edge.label}</small>}</span><button type="button" onClick={() => commit({ ...diagram, connections: diagram.connections.filter(item => item.id !== edge.id) }, 'Connection removed.')} aria-label={`Remove connection from ${diagram.steps.find(item => item.id === edge.from)?.label} to ${diagram.steps.find(item => item.id === edge.to)?.label}`}>Remove</button></li>)}</ul></details>
    <Source source={source} />
    <p className={styles.note}>A small visual editor for these examples: steps, questions, existing nested domains and directed connections. Keep at least one step in each domain. It does not import arbitrary Mermaid diagrams. Reloading or changing examples resets your edits.</p>
  </section>;
}

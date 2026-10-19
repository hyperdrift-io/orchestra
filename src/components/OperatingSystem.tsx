'use client';
import { operatingReadiness, operatingScenes, operatingScenarios, operatingServices } from '@/data/operating-system';
import { useOperatingSystem } from '@/lib/hooks/use-operating-system';
import { siteDoor } from '@/data/site-door';

/** Orchestra OS, the app's own page: the sphere stays in view while the reader's scroll connects the app. */
export function OperatingSystem() {
  const view = useOperatingSystem();
  const service = view.selected === null ? null : operatingServices[view.selected];
  return <section id="operating-system" data-scene={view.scene} data-story={view.story || undefined} data-service={service?.id} onKeyDown={event => { if (event.key === 'Escape' && view.selected !== null) { event.preventDefault(); view.back(); } }} aria-labelledby="operating-title">
    <header>
      <p>Orchestra OS · managed app operation</p>
      <h1 id="operating-title">Embed your app on <em>Orchestra OS.</em></h1>
      <p>Bring your app, or build it with us. Connect development, production care and customer progress around the people it serves.</p>
      <p data-os-actions><a href="/?situation=orchestra-os#contact" data-situation="orchestra-os">{siteDoor.label} →</a><a href="#os-scene-1">Explore Orchestra OS ↓</a></p>
    </header>
    <div data-os-stage>
      <header>
        <p>Illustrative target model <span>Scope and readiness agreed for each app</span></p>
        <p data-os-progress><span aria-hidden="true">{operatingScenes.map((scene, i) => <i key={scene.label} data-done={i <= view.scene || undefined} />)}</span>Step {view.scene + 1} of 6 <strong>{view.current.status}</strong></p>
      </header>
      <div data-operating-surface tabIndex={-1} ref={view.surface} data-webgl={view.available === true}>
        <img src="/diagrams/orchestra-os-fallback.svg" alt="An app at the centre of five connected jobs: build and release, run and recover, protect and reconcile, reach and serve, measure and decide. Named owners set scope and authority." width="900" height="620" />
        <canvas ref={view.canvas} aria-hidden="true" />
        <div data-owner-label data-visible={view.scene > 0}><span>People + agreed scope</span>Direction · CX · technical care</div>
        <p data-app-label ref={view.appLabel}>Your app</p>
        <div data-service-labels>{operatingServices.map((item, i) => <button key={item.id} ref={el => { view.labels.current[i] = el; }} data-service={item.id} tabIndex={-1} aria-pressed={view.selected === i} aria-controls="operating-detail" onClick={() => view.select(i)}><strong>{item.name}</strong><span>{operatingReadiness(view.scene, i)}</span></button>)}</div>
      </div>
      <nav data-operating-services aria-label="Explore Orchestra OS capabilities">{operatingServices.map((item, i) => <button key={item.id} ref={el => { view.controls.current[i] = el; }} data-service={item.id} aria-pressed={view.selected === i} aria-controls="operating-detail" onClick={() => view.select(view.selected === i ? null : i)}>{item.name}</button>)}</nav>
      <div data-playback>
        <span>{view.available === false ? 'Static view · explore with the controls above' : view.reduced ? 'Reduced motion · explore any capability' : view.selected !== null ? 'Click the sphere or press Escape to return' : view.playing ? 'Click the spinning sphere to explore' : 'Paused · click any capability to explore'}</span>
        <button onClick={view.toggle} disabled={!view.available || view.reduced}>{view.playing ? 'Pause' : 'Spin'}</button>
      </div>
      <aside id="operating-detail" hidden={!service} aria-label="The illustrated operating record">
        {service && <>
          <p>Inside Orchestra OS</p>
          <h2>{service.name}</h2>
          <p>{service.detail}</p>
          <dl><dt>Evidence to retain</dt><dd>{service.evidence}</dd></dl>
          {'article' in service && <a data-service-article href={service.article.href}>Read: {service.article.label} →</a>}
          <button onClick={view.back}>← Back to the sphere</button>
        </>}
      </aside>
    </div>
    <ol data-scenes aria-label="App connection steps">
      {operatingScenes.map((scene, i) => <li key={scene.label} id={`os-scene-${i + 1}`} ref={el => { view.scenes.current[i] = el; }} aria-current={view.scene === i ? 'step' : undefined}>
        <p><span>0{i + 1}</span>{scene.label}</p>
        <h2>{scene.title}</h2>
        <p>{scene.text}</p>
        <dl><dt>The operating record</dt><dd>{scene.record}</dd></dl>
        {i === 4 && <div data-example>
          <fieldset data-operating-scenarios><legend>Follow one example</legend>{operatingScenarios.map((scenario, j) => <label key={scenario.id}><input type="radio" name="operating-example" checked={view.scenario === j} onChange={() => view.chooseScenario(j)} />{scenario.label}</label>)}</fieldset>
          <dl><dt>The signal</dt><dd>{view.example.signal}</dd></dl>
          <p>{view.example.action}</p>
        </div>}
        {i === 5 && <div data-example>
          <p>{view.example.result}</p>
          <dl><dt>Illustrated receipt</dt><dd>{view.example.receipt}</dd></dl>
          <p data-next-decision><strong>Next decision</strong>{view.example.next}</p>
        </div>}
      </li>)}
    </ol>
  </section>;
}

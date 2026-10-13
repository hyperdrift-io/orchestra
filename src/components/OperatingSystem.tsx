'use client';
import { operatingReading, operatingReadiness, operatingScenes, operatingScenarios, operatingServices } from '@/data/operating-system';
import { useOperatingSystem } from '@/lib/hooks/use-operating-system';

export function OperatingSystem() {
  const view = useOperatingSystem();
  return <section id="operating-system" data-scene={view.scene} data-service={view.selected === null ? undefined : operatingServices[view.selected].id} onKeyDown={event => { if (event.key === 'Escape' && view.selected !== null) { event.preventDefault(); view.back(); } }} aria-labelledby="operating-title">
    <header>
      <p>Orchestra OS · managed app operation</p>
      <h1 id="operating-title">Embed your app on <em>Orchestra OS.</em></h1>
      <p>Bring your app, or build it with us. Connect development, production care and customer progress around the people it serves.</p>
      <nav aria-label="How it works views"><a href="/how-it-works" aria-current="page">Explore Orchestra OS</a><a href="/how-it-works?view=business#organisation">Explore the business loop ↗</a></nav>
    </header>
    <div data-operating-experience>
      <div data-operating-visual>
        <p data-example-label>Illustrative target model <span>Scope and readiness agreed for each app</span></p>
        <div data-operating-surface tabIndex={-1} ref={view.surface} data-webgl={view.available === true}>
          <img src="/diagrams/orchestra-os-fallback.svg" alt="An app at the centre of five connected jobs: build and release, run and recover, protect and reconcile, reach and serve, measure and decide. Named owners set scope and authority." width="900" height="620" />
          <canvas ref={view.canvas} aria-hidden="true" />
          <div data-owner-label data-visible={view.scene > 0}><span>People + agreed scope</span>Direction · CX · technical care</div>
          <p data-app-label ref={view.appLabel}>Your app</p>
          <div data-service-labels>{operatingServices.map((service, i) => <button key={service.id} ref={el => { view.labels.current[i] = el; }} data-service={service.id} tabIndex={-1} aria-pressed={view.selected === i} aria-controls="operating-detail" onClick={() => view.select(i)}><strong>{service.name}</strong><span>{operatingReadiness(view.scene, i)}</span></button>)}</div>
        </div>
        <nav data-operating-services aria-label="Explore Orchestra OS capabilities">{operatingServices.map((service, i) => <button key={service.id} ref={el => { view.controls.current[i] = el; }} data-service={service.id} aria-pressed={view.selected === i} aria-controls="operating-detail" onClick={() => view.select(i)}>{service.name}</button>)}</nav>
        <div data-playback>
          <span>{view.available === false ? 'Static view · explore with the controls above' : view.reduced ? 'Reduced motion · explore any capability' : view.selected !== null ? 'Click the sphere or press Escape to return' : view.playing ? 'Click the spinning sphere to explore' : 'Paused · click any capability to explore'}</span>
          <div><button onClick={view.toggle} disabled={!view.available || view.reduced}>{view.playing ? 'Pause' : 'Spin'}</button><button onClick={view.replay} disabled={!view.available || view.reduced}>Replay journey</button></div>
        </div>
      </div>
      <aside id="operating-detail" aria-label="The illustrated operating record">
        {view.selected !== null ? <>
          <p>Inside Orchestra OS</p><h2>{operatingServices[view.selected].name}</h2>
          <p>{operatingServices[view.selected].detail}</p>
          <dl><dt>Evidence to retain</dt><dd>{operatingServices[view.selected].evidence}</dd></dl>
          {'article' in operatingServices[view.selected] && <a data-service-article href={(operatingServices[view.selected] as { article: { href: string } }).article.href}>Read: {(operatingServices[view.selected] as { article: { label: string } }).article.label} →</a>}
          <button onClick={view.back}>← Back to the sphere</button>
        </> : <>
          <p>Step {view.scene + 1} of 6 <span>{view.current.status}</span></p>
          <h2>{view.current.title}</h2>
          <p>{view.scene === 4 ? view.example.action : view.scene === 5 ? view.example.result : view.current.text}</p>
          <dl><dt>{view.scene === 4 ? 'The signal' : view.scene === 5 ? 'Illustrated receipt' : 'The operating record'}</dt><dd>{view.scene === 4 ? view.example.signal : view.scene === 5 ? view.example.receipt : view.current.record}</dd></dl>
          {view.scene === 5 && <p data-next-decision><strong>Next decision</strong>{view.example.next}</p>}
        </>}
      </aside>
    </div>
    <nav data-scene-steps aria-label="App connection steps">{operatingScenes.map((scene, i) => <button key={scene.label} aria-current={view.scene === i ? 'step' : undefined} onClick={() => view.chooseScene(i)}><span>0{i + 1}</span>{scene.label}</button>)}</nav>
    <fieldset data-operating-scenarios><legend>Follow one example</legend>{operatingScenarios.map((scenario, i) => <label key={scenario.id}><input type="radio" name="operating-example" checked={view.scenario === i} onChange={() => view.chooseScenario(i)} />{scenario.label}</label>)}</fieldset>
    <p data-model-boundary>This illustrates the intended operating flow. It is not a live status report: automatic enrollment and the complete security repair-and-reconciliation loop still need end-to-end proof.</p>
    <details data-operating-map><summary>The map behind the motion</summary><p>Five jobs connect around the app. Each needs an owner, an agreed scope and evidence of operation. Traction retains the work and its results; the app, payment provider, customer channels and analytics remain authoritative for their own records.</p><picture><source media="(max-width: 650px)" srcSet="/diagrams/app-operating-map-mobile.svg" /><img src="/diagrams/app-operating-map.svg" alt="The target operating map: source and development pass through testing and authorised release to the live app. Health and security feed maintenance. A recorded repair returns to source. Customer actions and measured results inform Traction, judgement, authority, execution and the next decision." width="1200" height="1360" /></picture><a href="/diagrams/app-operating-map.svg">Open the full operating map ↗</a></details>
    <nav data-operating-reading aria-labelledby="operating-reading-title"><h2 id="operating-reading-title">The thinking behind it</h2><ul>{operatingReading.map((item) => <li key={item.href}><a href={item.href}><strong>{item.label}</strong><span>{item.note}</span></a></li>)}</ul></nav>
    <footer><div><h2>Start with your app.</h2><p>Bring a live product, or a customer problem worth building for. We’ll agree what to connect, who owns its operation and the evidence that shows it is working.</p></div><a href="/?situation=orchestra-os#contact">Embed your app →</a></footer>
  </section>;
}

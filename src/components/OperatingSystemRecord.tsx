import { operatingReading, operatingServices } from '@/data/operating-system';

/** After the journey: the five jobs side by side, the map, the reading and the invitation. Server-rendered, no script. */
export function OperatingSystemRecord() {
  return <>
    <section id="os-jobs" aria-labelledby="os-jobs-title">
      <header>
        <h2 id="os-jobs-title">Five jobs connect around the app.</h2>
        <p>Each needs an owner, an agreed scope and evidence of operation. Traction retains the work and its results; the app, payment provider, customer channels and analytics remain authoritative for their own records.</p>
      </header>
      <ol>{operatingServices.map((service, i) => <li key={service.id} data-service={service.id}>
        <h3><span>0{i + 1}</span>{service.name}</h3>
        <p>{service.detail}</p>
        <dl><dt>Evidence to retain</dt>{service.evidence.split(' · ').map(item => <dd key={item}>{item[0].toUpperCase() + item.slice(1)}</dd>)}</dl>
        {'article' in service && <a href={service.article.href}>Read: {service.article.label} →</a>}
      </li>)}</ol>
      <p data-model-boundary>This illustrates the intended operating flow. It is not a live status report: automatic enrollment and the complete security repair-and-reconciliation loop still need end-to-end proof.</p>
      <details data-operating-map><summary>The map behind the motion</summary><picture><source media="(max-width: 650px)" srcSet="/diagrams/app-operating-map-mobile.svg" /><img src="/diagrams/app-operating-map.svg" alt="The target operating map: source and development pass through testing and authorised release to the live app. Health and security feed maintenance. A recorded repair returns to source. Customer actions and measured results inform Traction, judgement, authority, execution and the next decision." width="1200" height="1360" loading="lazy" /></picture><a href="/diagrams/app-operating-map.svg">Open the full operating map ↗</a></details>
    </section>
    <nav data-operating-reading aria-labelledby="operating-reading-title"><h2 id="operating-reading-title">The thinking behind it</h2><ul>{operatingReading.map((item) => <li key={item.href}><a href={item.href}><strong>{item.label}</strong><span>{item.note}</span></a></li>)}</ul><p><a href="/how-it-works?view=business#organisation">Explore the business loop ↗</a></p></nav>
    <section id="os-start" aria-labelledby="os-start-title"><div><h2 id="os-start-title">Start with your app.</h2><p>Bring a live product, or a customer problem worth building for. We’ll agree what to connect, who owns its operation and the evidence that shows it is working.</p></div><a href="/?situation=orchestra-os#contact" data-situation="orchestra-os">Embed your app →</a></section>
  </>;
}

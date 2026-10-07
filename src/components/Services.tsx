import { services } from '@/data/traction-offer';
import { count, launched } from '@/data/traction';

/** What Orchestra offers, Traction first with its launch running in public. */
export function Services() {
  return <section id="services" aria-labelledby="services-title">
    <header><p>What we offer</p><h2 id="services-title">Three ways to work with us.</h2></header>
    <ul>{services.map((service) => <li key={service.slug} data-service={service.slug}>
      <p>{service.eyebrow}</p>
      <h3>{service.name}</h3>
      <p>{service.text}</p>
      {service.slug === 'traction' && <p data-live>From zero, in public · <strong>{count.founders}/{count.of}</strong> founders on the board · launched {launched}</p>}
      <p>{service.links.map((link) => <a key={link.href} href={link.href} data-primary={link.primary ? '' : undefined}>{link.label} →</a>)}</p>
      {service.slug === 'traction' && <figure>
        <video controls playsInline preload="none" poster="/traction/poster.jpg" aria-label="The Traction trailer, 46 seconds, with captions">
          <source src="/traction/trailer.mp4" type="video/mp4" />
          <track kind="captions" src="/traction/trailer.en.vtt" srcLang="en" label="English" default />
          <a href="/traction/trailer.mp4">Open the trailer</a>
        </video>
        <figcaption>The trailer · 46 s · cut by an AI, signed by a human</figcaption>
      </figure>}
    </li>)}</ul>
  </section>;
}

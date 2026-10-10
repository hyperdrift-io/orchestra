import { services } from '@/data/traction-offer';

/** One Orchestra engagement, starting with the customer's current constraint. */
export function Services() {
  return <section id="services" aria-labelledby="services-title">
    <header><p>Working with Orchestra</p><h2 id="services-title">Start with one customer problem.</h2></header>
    <ul>{services.map((service) => <li key={service.slug} id={`service-${service.slug}`} data-service={service.slug}>
      <p>{service.eyebrow}</p>
      <h3>{service.name}</h3>
      <p>{service.text}</p>
      <p>{service.links.map((link) => <a key={link.href} href={link.href} data-primary={link.primary ? '' : undefined}>{link.label} →</a>)}</p>
    </li>)}</ul>
  </section>;
}

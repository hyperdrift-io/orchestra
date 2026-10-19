import { siteDoor } from '@/data/site-door';

/** Real examples and a clear next step for the founder. */
export function Enquiry() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">What would move your business forward?</h2>

      <div>
        <div>
          <p>Bring your product, the customers you want to reach and the opportunity you see. We’ll work out together whether Orchestra can help and what a useful first scope would be.</p>
          <p>We agree the work and how to judge it before building. You stay involved in customer conversations and consequential decisions; we help turn the agreed next move into something customers can use.</p>
          <p><a href="/traction#partnership">Explore a Traction Partnership →</a></p>
        </div>
        <p><a href="#enquire" data-enquiry="">{siteDoor.label} →</a></p>
      </div>
    </section>
  );
}

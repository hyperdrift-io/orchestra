import { EnquiryForm } from '@/components/EnquiryForm';

/** Real examples and a clear next step for the founder. */
export function Enquiry() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">What would move your business forward?</h2>

      <div>
        <div>
          <p>Bring your product, the customers you want to reach and the opportunity you see. Yann will reply within one working day to explore whether Orchestra can help and what a useful first scope would be.</p>
          <dl>
            <div>
              <dt>Reply time</dt>
              <dd>One working day</dd>
            </div>
            <div>
              <dt>Engagements</dt>
              <dd>2 to 4 weeks, scoped concretely</dd>
            </div>
            <div>
              <dt>Locale</dt>
              <dd>Remote · EU/UK hours</dd>
            </div>
          </dl>
          <p>We agree the work and how to judge it before building. You stay involved in customer conversations and consequential decisions; we help turn the agreed next move into something customers can use.</p>
          <p><a href="/partnership">Explore a Traction Partnership →</a></p>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

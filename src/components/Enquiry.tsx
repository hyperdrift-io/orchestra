import { EnquiryForm } from '@/components/EnquiryForm';

/** Real examples and a clear next step for the founder. */
export function Enquiry() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Find your next growth opportunity.</h2>

      <div>
        <div>
          <p>Tell us what’s gaining traction, where you want the business to grow, and what would help you get there. We’ll reply within a working day to explore a useful first scope.</p>
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
          <p>We start with one workflow, agree the scope, build an improvement you can inspect, and measure its effect.</p>
          <p><a href="/partnership">Explore a Traction Partnership →</a></p>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

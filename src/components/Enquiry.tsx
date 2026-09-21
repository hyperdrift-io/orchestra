import { Partnership } from '@/components/Partnership';
import { EnquiryForm } from '@/components/EnquiryForm';

/** Real examples and a clear next step for the founder. */
export function Enquiry() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Find your next growth opportunity.</h2>

      <div>
        <div>
          <p>Tell us where you want the business to grow, what takes too much time, or where margin could improve. We’ll reply within a working day to explore a useful first scope.</p>
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
          <Partnership />
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

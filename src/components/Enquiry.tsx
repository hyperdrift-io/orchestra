import { Partnership } from '@/components/Partnership';
import { EnquiryForm } from '@/components/EnquiryForm';

/** The enquiry (screencraft/enquiry): "You say where. We go." over the attentive giant. */
export function Enquiry() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <figure>
        <picture>
          <img
            src="/shoulder/enquiry-1440.webp"
            srcSet="/shoulder/enquiry-960.webp 960w, /shoulder/enquiry-1440.webp 1440w, /shoulder/enquiry-2400.webp 2400w"
            sizes="100vw"
            alt="The giant lowers its face toward its own shoulder, where the founder stands and points at the city across green country."
            loading="lazy"
          />
        </picture>
      </figure>
      <h2 id="contact-title">You say where. We go.</h2>

      <div>
        <div>
          <p>Tell us a little about your product and what you want to ship. We reply within a working day.</p>
          <dl>
            <div>
              <dt className="meta">Reply time</dt>
              <dd>One working day</dd>
            </div>
            <div>
              <dt className="meta">Engagements</dt>
              <dd>2 to 4 weeks, scoped concretely</dd>
            </div>
            <div>
              <dt className="meta">Locale</dt>
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

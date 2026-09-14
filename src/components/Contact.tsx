'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { enquiryChoices } from '@/data/situations';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function SituationSelect({ selected = '' }: { selected?: string }) {
  return (
    <label>
      <span>Where you are</span>
      {/* Keyed on the choice: a stage CTA swaps the selection without touching anything typed. */}
      <select name="situation" key={selected} defaultValue={selected}>
        <option value="">Choose one, or leave it open</option>
        {enquiryChoices.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** A stage CTA links to /?situation=<slug>#contact; this reads it. */
function SituationFromQuery() {
  const raw = useSearchParams().get('situation') ?? '';
  const selected = enquiryChoices.some((c) => c.value === raw) ? raw : '';
  return <SituationSelect selected={selected} />;
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the element now: React nulls event.currentTarget after an await.
    const formEl = event.currentTarget;
    setStatus('sending');
    setErrorMessage(null);

    const form = new FormData(formEl);
    const situation = enquiryChoices.find((c) => c.value === form.get('situation'))?.label;
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      company: String(form.get('company') ?? '') || undefined,
      situation,
      message: String(form.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Submission failed');
      }
      setStatus('sent');
      formEl.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>10</p>
        <p className="eyebrow">Movement X · Contact</p>
        <h2 id="contact-title">
          Start a <em>project</em>.
        </h2>
      </div>

      <div>
        <div>
          <p className="lead">
            Tell us a little about your product and what you want to ship.
            We reply within a working day.
          </p>

          <hr className="hair" />

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
        </div>

        <form onSubmit={handleSubmit}>
          <Suspense fallback={<SituationSelect />}>
            <SituationFromQuery />
          </Suspense>
          <label>
            <span>Name</span>
            <input name="name" required maxLength={120} autoComplete="name" placeholder="Ada Lovelace" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          </label>
          <label>
            <span>Company (optional)</span>
            <input name="company" maxLength={200} autoComplete="organization" placeholder="Analytical Engines" />
          </label>
          <label>
            <span>What do you want to ship?</span>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={6}
              placeholder="A few sentences about the product, the agent surface you want, and the stack."
            />
          </label>
          <div>
            <button className="btn primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry ↗'}
            </button>
          </div>
          {status === 'sent' && (
            <p role="status">✓ Received. We will reply within a working day.</p>
          )}
          {status === 'error' && (
            <p role="alert">{errorMessage ?? 'Something went wrong.'}</p>
          )}
        </form>
      </div>
    </section>
  );
}

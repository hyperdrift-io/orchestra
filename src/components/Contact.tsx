'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      company: String(form.get('company') ?? '') || undefined,
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
      event.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>08</p>
        <p className="eyebrow">Movement VIII · Contact</p>
        <h2 id="contact-title">
          Start a <em>project</em>.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: 'var(--sp-xl)',
          alignItems: 'start',
        }}
      >
        <div>
          <p className="lead">
            Tell us a little about your product and what you want to ship.
            We reply within a working day.
          </p>

          <hr className="hair" style={{ marginBlock: 'var(--sp-m)' }} />

          <dl style={{ display: 'grid', gap: 'var(--sp-s)', margin: 0 }}>
            <div>
              <dt className="meta" style={{ color: 'var(--cream-3)' }}>Reply time</dt>
              <dd style={{ margin: 0, color: 'var(--cream)' }}>One working day</dd>
            </div>
            <div>
              <dt className="meta" style={{ color: 'var(--cream-3)' }}>Engagements</dt>
              <dd style={{ margin: 0, color: 'var(--cream)' }}>2 to 4 weeks, scoped concretely</dd>
            </div>
            <div>
              <dt className="meta" style={{ color: 'var(--cream-3)' }}>Locale</dt>
              <dd style={{ margin: 0, color: 'var(--cream)' }}>Remote · EU/UK hours</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: 'var(--sp-m)',
            maxWidth: '640px',
          }}
        >
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
            <p role="status" style={{ color: 'var(--vermillion)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mark)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              ✓ Received. We will reply within a working day.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" style={{ color: '#ff9c9c', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mark)' }}>
              {errorMessage ?? 'Something went wrong.'}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

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
      <p className="eyebrow">Contact</p>
      <h2 id="contact-title">Start a project.</h2>
      <p className="lead" style={{ marginBlockStart: 'var(--space-m)' }}>
        Tell us a little about your product and what you want to ship. We reply within a working day.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-m)',
          maxWidth: '640px',
        }}
      >
        <label>
          <span style={{ display: 'block', marginBlockEnd: 'var(--space-2xs)' }}>Name</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span style={{ display: 'block', marginBlockEnd: 'var(--space-2xs)' }}>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span style={{ display: 'block', marginBlockEnd: 'var(--space-2xs)' }}>Company (optional)</span>
          <input name="company" maxLength={200} autoComplete="organization" />
        </label>
        <label>
          <span style={{ display: 'block', marginBlockEnd: 'var(--space-2xs)' }}>What do you want to ship?</span>
          <textarea name="message" required minLength={10} maxLength={5000} rows={6} />
        </label>
        <div>
          <button className="primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
        </div>
        {status === 'sent' && (
          <p role="status" style={{ color: 'var(--accent)' }}>
            Thanks — we will reply within a working day.
          </p>
        )}
        {status === 'error' && (
          <p role="alert" style={{ color: '#ff9c9c' }}>
            {errorMessage ?? 'Something went wrong.'}
          </p>
        )}
      </form>
    </section>
  );
}

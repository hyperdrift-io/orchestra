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

/** The enquiry form: "Where you are" arrives preselected from a chosen place and stays editable. */
export function EnquiryForm() {
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
  );
}

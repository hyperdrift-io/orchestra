import { faqItems } from '@/data/faq';

export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <p className="eyebrow">FAQ</p>
      <h2 id="faq-title">Questions we hear often.</h2>
      <div style={{ marginBlockStart: 'var(--space-l)', display: 'grid', gap: 'var(--space-m)' }}>
        {faqItems.map((item) => (
          <details
            key={item.question}
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-m)',
              background: 'var(--surface-elevated)',
            }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.question}</summary>
            <p style={{ marginBlockStart: 'var(--space-s)' }}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

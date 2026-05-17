import { faqItems } from '@/data/faq';

export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>07</p>
        <p className="eyebrow">Movement VII · FAQ</p>
        <h2 id="faq-title">
          Questions we hear <em>often</em>.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 0,
          borderBlockStart: '1px solid var(--line-hair)',
          maxWidth: '78ch',
        }}
      >
        {faqItems.map((item, i) => (
          <details
            key={item.question}
            style={{
              borderBlockEnd: '1px solid var(--line-hair)',
              padding: 'var(--sp-m) 0',
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '4rem 1fr auto',
                gap: 'var(--sp-s)',
                alignItems: 'baseline',
                listStyle: 'none',
              }}
            >
              <span className="meta" style={{ color: 'var(--vermillion)' }}>
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-h3)',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  color: 'var(--cream)',
                  lineHeight: 1.2,
                }}
              >
                {item.question}
              </span>
              <span aria-hidden style={{ color: 'var(--cream-3)', fontFamily: 'var(--font-mono)' }}>
                +
              </span>
            </summary>
            <p
              style={{
                marginInlineStart: '4rem',
                marginBlockStart: 'var(--sp-s)',
                maxWidth: '60ch',
              }}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

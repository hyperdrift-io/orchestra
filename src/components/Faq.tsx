import { faqItems } from '@/data/faq';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>09</p>
        <p className="eyebrow">Movement IX · FAQ</p>
        <h2 id="faq-title">
          Questions we hear <em>often</em>.
        </h2>
      </div>

      <div>
        {faqItems.map((item, i) => (
          <details key={item.question}>
            <summary>
              <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

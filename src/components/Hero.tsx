export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="staff" aria-hidden />

      <p className="eyebrow reveal" data-stagger="0">
        Overture <span className="meta">Which one are you?</span>
      </p>

      <h1 id="hero-title" className="reveal" data-stagger="1">
        Where are you taking <em>AI next</em>?
      </h1>

      <p className="lead reveal" data-stagger="2">
        Choose where you are. See the work, then take your next step.
      </p>
    </section>
  );
}

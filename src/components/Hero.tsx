/** First screen (screencraft/first-screen, mobile-first-screen): the statement over the walking giant. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <picture>
        <source
          media="(max-width: 760px)"
          srcSet="/shoulder/mobile-first-screen-780.webp 780w, /shoulder/mobile-first-screen-1080.webp 1080w"
          sizes="100vw"
        />
        <img
          src="/shoulder/first-screen-1440.webp"
          srcSet="/shoulder/first-screen-960.webp 960w, /shoulder/first-screen-1440.webp 1440w, /shoulder/first-screen-2400.webp 2400w"
          sizes="100vw"
          alt="A granite giant walks across golden fields toward a waking city. A founder stands on its shoulder and points the way; villages have grown in its footprints."
          fetchPriority="high"
        />
      </picture>
      <div>
        <h1 id="hero-title">Stand on the shoulders of a giant who understands your business.</h1>
        <p>Where are you taking AI next?</p>
        <p>
          <a className="btn primary" href="#places">
            Choose where you are <span aria-hidden>↓</span>
          </a>
        </p>
      </div>
    </section>
  );
}

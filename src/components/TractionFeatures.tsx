import { featuresIntro, firstRead, loop, tiers, type LoopStep } from '@/data/traction-features';

/** One part of the loop at its own address, with where the free start stops and what the subscription adds. */
function Step({ step, mark }: { step: LoopStep; mark: string }) {
  return <li id={step.id}>
    <span aria-hidden="true">{mark}</span>
    <h3>{step.title}</h3>
    <p>{step.text}</p>
    {step.free && <p data-tier="free"><span>{tiers.free}</span> {step.free}</p>}
    {step.subscription && <p data-tier="subscription"><span>{tiers.subscription}</span> {step.subscription}</p>}
  </li>;
}

/** What Traction does, under the engine at work: the header holds on the left while the loop reads on the right. */
export function TractionFeatures() {
  return <section id="features" data-journey="features" aria-labelledby="traction-features-title">
    <header>
      <p>{featuresIntro.label}</p>
      <h2 id="traction-features-title">{featuresIntro.title}</h2>
      <p data-line="">{featuresIntro.line}</p>
      <p>{featuresIntro.text}</p>
    </header>
    <div data-features="">
      <div>
        <p id="traction-features-start">{featuresIntro.start}</p>
        <ul role="list" aria-labelledby="traction-features-start"><Step step={firstRead} mark="○" /></ul>
      </div>
      <div>
        <p id="traction-features-loop">{featuresIntro.loop}</p>
        <ol role="list" aria-labelledby="traction-features-loop">
          {loop.map((step, at) => <Step key={step.id} step={step} mark={String(at + 1).padStart(2, '0')} />)}
        </ol>
        <p data-again=""><span aria-hidden="true">↻</span> {featuresIntro.again}</p>
      </div>
    </div>
  </section>;
}

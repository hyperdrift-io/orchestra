import { after, dayOne, featuresIntro, tiers, type Step } from '@/data/traction-features';

/** One step at its own address: its name, its title, and where the free start stops and what the subscription adds. */
function StepItem({ step, mark }: { step: Step; mark: string }) {
  return <li id={step.id}>
    <span aria-hidden="true">{mark}</span>
    <p data-step-name="">{step.name}</p>
    <h2>{step.title}</h2>
    <p>{step.text}</p>
    {step.free && <p data-tier="free"><span>{tiers.free}</span> {step.free}</p>}
    {step.subscription && <p data-tier="subscription"><span>{tiers.subscription}</span> {step.subscription}</p>}
  </li>;
}

const mark = (at: number) => String(at + 1).padStart(2, '0');

/** How Traction works, in the film's order, as two columns: day one, then after day one. The page's own heading and
 * lead carry the argument, so the steps start at once. */
export function TractionFeatures() {
  return <section id="features" data-journey="features" aria-label="The six steps">
    <div data-features="">
      <div>
        <p id="traction-features-day-one">{featuresIntro.dayOne}</p>
        <p data-gain="">{featuresIntro.dayOneGain}</p>
        <ol role="list" aria-labelledby="traction-features-day-one">
          {dayOne.map((step, at) => <StepItem key={step.id} step={step} mark={mark(at)} />)}
        </ol>
      </div>
      <div>
        <p id="traction-features-after">{featuresIntro.after}</p>
        <ol role="list" start={dayOne.length + 1} aria-labelledby="traction-features-after">
          {after.map((step, at) => <StepItem key={step.id} step={step} mark={mark(dayOne.length + at)} />)}
        </ol>
        <p data-again=""><span aria-hidden="true">↻</span> {featuresIntro.again}</p>
      </div>
    </div>
  </section>;
}

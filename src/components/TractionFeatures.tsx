import { featureGroups, featuresIntro } from '@/data/traction-features';

/** What Traction does, under the engine at work: the header holds on the left while the parts read on the right. */
export function TractionFeatures() {
  let index = 0;
  return <section id="features" data-journey="features" aria-labelledby="traction-features-title">
    <header>
      <p>{featuresIntro.label}</p>
      <h2 id="traction-features-title">{featuresIntro.title}</h2>
      <p>{featuresIntro.text}</p>
    </header>
    <div data-features="">
      {featureGroups.map((group) => <div key={group.id}>
        <p id={`traction-features-${group.id}`}>{group.label}</p>
        <ol role="list" start={index + 1} aria-labelledby={`traction-features-${group.id}`}>
          {group.features.map((feature) => {
            index += 1;
            return <li key={feature.title}>
              <span aria-hidden="true">{String(index).padStart(2, '0')}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </li>;
          })}
        </ol>
      </div>)}
    </div>
  </section>;
}

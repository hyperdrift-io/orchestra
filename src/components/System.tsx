import { SystemGraph } from '@/components/SystemGraph';
import { anchors, inputs } from '@/data/system-graph';

/**
 * Version B first screen: the Commander in the middle, what feeds it, what comes out.
 * The globe is a client island; the list below it is the same story for readers and
 * crawlers. Version A (the loop as SVG) lives on the home page.
 */
export function System() {
  return (
    <section id="system" aria-labelledby="system-title">
      <div>
        <p className="eyebrow">The system</p>
        <h1 id="system-title">
          One brain in the middle. <em>Yours to keep.</em>
        </h1>
        <p className="lead">
          Every tool you already run feeds the Commander: analytics, code, the web, the bank. It reads what moved,
          decides once a day, hands the work to agents, and scores the outcome back into its notes. The founder gets
          one email. The code stays yours.
        </p>
        <p>
          <a className="btn primary" href="#contact">
            Describe your workflow
          </a>
          <a href="#proof">See the work</a>
        </p>
      </div>

      <SystemGraph />

      <details>
        <summary>What is on the globe</summary>
        <ul>
          {inputs.map((i) => (
            <li key={i.key}>
              <b>{i.name}</b> streams in through {i.tool}.
            </li>
          ))}
          {anchors.map((a) => (
            <li key={a.slug}>
              <b>{a.name}</b> hands off to {a.links.map((s) => anchors.find((x) => x.slug === s)?.name).join(' and ')}.
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

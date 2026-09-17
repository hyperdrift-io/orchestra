import { OrgGraph } from '@/components/OrgGraph';
import { lenses } from '@/data/org-graph';

/**
 * Where you plug in: the same graph, relabelled for the visitor’s organisation by a
 * radio group and `:has()`. No client JavaScript.
 */
export function PlugIn() {
  return (
    <section id="plug" aria-labelledby="plug-title">
      <h2 id="plug-title">Same shape. Your organisation.</h2>
      <p className="lead">
        Every job on the map has a twin where you work. Choose who you are and the graph renames itself.
      </p>

      <fieldset aria-labelledby="plug-title">
        {lenses.map((l) => (
          <label key={l.slug}>
            <input type="radio" name="lens" value={l.slug} />
            {l.label}
          </label>
        ))}
      </fieldset>

      <OrgGraph id="graph-lens" lens />

      {lenses.map((l) => (
        <p key={l.slug} data-lens={l.slug}>
          {l.line}
        </p>
      ))}

      <div>
        <p>
          Anyone can get a demo working. What a company needs is every hour on the business and its growth, and
          everything else handled. That is what the map above is: the hours that came back.
        </p>
        <p>
          <a className="btn primary" href="#contact">
            Describe your workflow
          </a>
        </p>
      </div>
    </section>
  );
}

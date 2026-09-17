import { Field } from '@/components/Field';
import { OrgGraph } from '@/components/OrgGraph';
import { columns, movements, nodes, type ColumnSlug } from '@/data/org-graph';

/** Movements 1–5 light one column each; on narrow screens that column's jobs sit inline. */
const columnOf: Record<number, ColumnSlug> = { 1: 'sense', 2: 'read', 3: 'work', 4: 'ship', 5: 'learn' };

/**
 * The first screen and the day: the graph stays put while the movements scroll past
 * and light it, column by column. Node panels open on `:target`, so every job is a
 * link and works without JavaScript. Spec: docs/design/2026-09-16-ai-native-org/PAGE.md
 */
export function Day() {
  const [first, ...rest] = movements;
  const columnName = (slug: string) => columns.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <section id="day" aria-labelledby="day-title">
      <div className="stage">
        <Field />
        <OrgGraph id="graph" linked />
      </div>

      <ol>
        <li data-m={first.n}>
          <p className="eyebrow">{first.eyebrow}, the run starts</p>
          <h1 id="day-title">{first.title}</h1>
          {first.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <a className="btn primary" href="#contact">
              Describe your workflow
            </a>
            <a href="#proof">See the work</a>
          </p>
        </li>
        {rest.map((m) => {
          const col = columnOf[m.n];
          return (
            <li key={m.n} data-m={m.n}>
              <p className="eyebrow">
                {String(m.n).padStart(2, '0')} · {m.eyebrow}
              </p>
              <h2>{m.title}</h2>
              {m.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {col && (
                <ul className="fragment" aria-label={`Jobs in ${columnName(col)}`}>
                  {nodes
                    .filter((n) => n.column === col)
                    .map((n) => (
                      <li key={n.slug}>
                        <a href={`#n-${n.slug}`}>
                          {n.name} <span className="meta">{n.mark}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <div className="panels">
        {nodes.map((n) => (
          <article key={n.slug} id={`n-${n.slug}`} aria-labelledby={`n-${n.slug}-title`}>
            <p className="meta">{columnName(n.column)}</p>
            <h3 id={`n-${n.slug}-title`}>{n.name}</h3>
            <p>{n.job}</p>
            <p>{n.runs}</p>
            <p className="meta">{n.tools.join(' · ')}</p>
            <p>
              <a href={n.artefact.href} target="_blank" rel="noreferrer">
                {n.artefact.label} ↗
              </a>
              <a href="#day">Close</a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

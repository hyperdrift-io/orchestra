import { columns, lenses, nodes, surface, type ColumnSlug } from '@/data/org-graph';

interface Props {
  /** Unique per instance; node links target `#n-<slug>` only on the first one. */
  id: string;
  /** Draw the lens labels (hidden by CSS until a lens is chosen). */
  lens?: boolean;
  /** Nodes link to their panels. */
  linked?: boolean;
}

/* Geometry in viewBox units. Columns: 5 × 168 wide, 20 apart, from x=40. */
const COL_W = 168;
const COL_X: Record<ColumnSlug, number> = { sense: 40, read: 228, work: 416, ship: 604, learn: 792 };
const COL_Y = 150;
const COL_H = 70;
const NODE_Y0 = 275;
const NODE_H = 48;
const NODE_GAP = 12;
const SURF_Y = 490;

const mid = (col: ColumnSlug) => COL_X[col] + COL_W / 2;

/**
 * The truth layer: the AI-native organisation as SVG in the DOM. Crawlable, keyboard-
 * reachable, works with JavaScript off. Lighting and lenses are pure CSS; the WebGL
 * field behind it is decoration. Spec: docs/design/2026-09-16-ai-native-org/GRAPH.md
 */
export function OrgGraph({ id, lens = false, linked = false }: Props) {
  return (
    <svg id={id} viewBox="0 0 1000 580" aria-labelledby={`${id}-title`} role="group">
      <title id={`${id}-title`}>
        One day at Hyperdrift: the founder on top, a loop of Sense, Read, Work, Ship and Learn, and the jobs agents hold
        in each.
      </title>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Founder */}
      <g data-col="founder">
        <rect className="founder" x="40" y="30" width="920" height="70" rx="6" />
        <text className="title" x="500" y="61" textAnchor="middle" data-lens="base">
          Founder
        </text>
        {lens &&
          lenses.map((l) => (
            <text key={l.slug} className="title" x="500" y="61" textAnchor="middle" data-lens={l.slug}>
              {l.founder}
            </text>
          ))}
        <text className="mark" x="500" y="84" textAnchor="middle">
          One email a day. Holds the verdicts.
        </text>
      </g>

      {/* Read feeds the founder; the founder’s verdict feeds Work */}
      <line x1={mid('read')} y1={COL_Y - 2} x2={mid('read')} y2="104" markerEnd={`url(#${id}-arrow)`} />
      <line x1={mid('work')} y1="102" x2={mid('work')} y2={COL_Y - 4} markerEnd={`url(#${id}-arrow)`} />

      {/* The loop */}
      {columns.map((c, i) => (
        <g key={c.slug} data-col={c.slug}>
          <rect className="col" x={COL_X[c.slug]} y={COL_Y} width={COL_W} height={COL_H} rx="6" />
          <text className="name" x={mid(c.slug)} y={COL_Y + 30} textAnchor="middle" data-lens="base">
            {c.name}
          </text>
          {lens &&
            lenses.map((l) => (
              <text key={l.slug} className="name" x={mid(c.slug)} y={COL_Y + 30} textAnchor="middle" data-lens={l.slug}>
                {l.columns[c.slug]}
              </text>
            ))}
          <text className="mark" x={mid(c.slug)} y={COL_Y + 52} textAnchor="middle">
            {c.mark}
          </text>
          {i < columns.length - 1 && (
            <line
              x1={COL_X[c.slug] + COL_W}
              y1={COL_Y + COL_H / 2}
              x2={COL_X[columns[i + 1].slug] - 3}
              y2={COL_Y + COL_H / 2}
              markerEnd={`url(#${id}-arrow)`}
            />
          )}
        </g>
      ))}
      <path
        className="loop"
        d={`M${mid('learn')} ${COL_Y + COL_H} V245 H${mid('sense')} V${COL_Y + COL_H + 4}`}
        markerEnd={`url(#${id}-arrow)`}
      />

      {/* The jobs, three per column */}
      {columns.map((c) => (
        <g key={`${c.slug}-nodes`} data-col={c.slug}>
          {nodes
            .filter((n) => n.column === c.slug)
            .map((n, j) => {
              const y = NODE_Y0 + j * (NODE_H + NODE_GAP);
              const body = (
                <>
                  <rect className="node" x={COL_X[c.slug]} y={y} width={COL_W} height={NODE_H} rx="4" />
                  <text className="name" x={COL_X[c.slug] + 14} y={y + 21}>
                    {n.name}
                  </text>
                  <text className="mark" x={COL_X[c.slug] + 14} y={y + 38}>
                    {n.mark}
                  </text>
                </>
              );
              return linked ? (
                <a key={n.slug} href={`#n-${n.slug}`} aria-label={`${n.name}: ${n.job}`}>
                  {body}
                </a>
              ) : (
                <g key={n.slug}>{body}</g>
              );
            })}
        </g>
      ))}

      {/* Where you plug in */}
      <g data-col="surface">
        {surface.map((s, i) => {
          const x = 40 + i * 313;
          return (
            <a key={s.name} href={s.href}>
              <rect className="surface" x={x} y={SURF_Y} width="293" height="64" rx="6" />
              <text className="name" x={x + 146} y={SURF_Y + 27} textAnchor="middle">
                {s.name}
              </text>
              <text className="mark" x={x + 146} y={SURF_Y + 47} textAnchor="middle">
                {s.detail}
              </text>
            </a>
          );
        })}
      </g>
    </svg>
  );
}

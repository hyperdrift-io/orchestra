import type { BusinessScenario } from '@/data/business-scenarios';
import { columns, lenses, nodes, surface, type ColumnSlug } from '@/data/org-graph';

interface Props {
  /** Unique per instance; node links target `#n-<slug>` only on the first one. */
  id: string;
  /** Draw the lens labels (hidden by CSS until a lens is chosen). */
  lens?: boolean;
  /** Nodes link to their panels. */
  linked?: boolean;
  scenario?: BusinessScenario;
  active?: number;
  onSelect?: (index: number) => void;
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

/** Highlight uses the exact same SVG path as its underlying connection. */
function Connection({d, lit, arrow}: {d: string; lit: boolean; arrow?: string}) {
  return <g data-connection="" data-lit={lit} aria-hidden="true">
    <path d={d} markerEnd={arrow} />
    <path d={d} markerEnd={arrow} data-highlight="" />
  </g>;
}

/**
 * The truth layer: the AI-native organisation as SVG in the DOM. Crawlable, keyboard-
 * reachable, works with JavaScript off. Connections and their highlights share SVG geometry; lenses are pure CSS. Spec: docs/design/2026-09-16-ai-native-org/GRAPH.md
 */
export function OrgGraph({ id, lens = false, linked = false, scenario, active, onSelect }: Props) {
  return (
    <svg id={id} viewBox="0 0 1000 580" aria-label={scenario ? "Your organisation: the path from signals to growth, profit and founder time" : "How the Hyperdrift organisation works"} aria-describedby={`${id}-description`} role="group">
      <desc id={`${id}-description`}>
        One day at Hyperdrift: the founder on top, a loop of Sense, Read, Work, Ship and Learn, and the jobs agents hold
        in each.
      </desc>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Founder */}
      <g data-col="founder">
        <rect x="40" y="30" width="920" height="70" rx="6" />
        <text x="500" y="61" textAnchor="middle" data-lens="base">
          Founder
        </text>
        {lens &&
          lenses.map((l) => (
            <text key={l.slug} x="500" y="61" textAnchor="middle" data-lens={l.slug}>
              {l.founder}
            </text>
          ))}
        <text x="500" y="84" textAnchor="middle">
          {scenario ? 'Growth · profit · time to lead' : 'One email a day. Holds the verdicts.'}
        </text>
      </g>

      {/* Read feeds the founder; the founder’s verdict feeds Work */}
      <Connection d={`M${mid('read')} ${COL_Y} V100`} lit={active === 1} arrow={`url(#${id}-arrow)`} />
      <Connection d={`M${mid('work')} 100 V${COL_Y}`} lit={active === 2} arrow={`url(#${id}-arrow)`} />

      {/* The loop */}
      {columns.map((c, i) => (
        <g key={c.slug} data-col={c.slug} data-active={active === i} role={onSelect ? 'button' : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={scenario ? `Explore ${scenario.steps[i].name}` : undefined} aria-pressed={onSelect ? active === i : undefined} onClick={() => onSelect?.(i)} onKeyDown={e => { if(onSelect && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(i); } }}>
          <rect x={COL_X[c.slug]} y={COL_Y} width={COL_W} height={COL_H} rx="6" />
          <text x={mid(c.slug)} y={COL_Y + 30} textAnchor="middle" data-lens="base">
            {scenario ? scenario.steps[i].name : c.name}
          </text>
          {lens &&
            lenses.map((l) => (
              <text key={l.slug} x={mid(c.slug)} y={COL_Y + 30} textAnchor="middle" data-lens={l.slug}>
                {l.columns[c.slug]}
              </text>
            ))}
          <text x={mid(c.slug)} y={COL_Y + 52} textAnchor="middle">
            {scenario ? ['Spot the opportunity', 'Founder decides', 'Make useful progress', 'Reach the customer', 'Check the result'][i] : c.mark}
          </text>

        </g>
      ))}
      {/* The actual handoffs, drawn once and lit in place. */}
      {columns.slice(0, -1).map((c, i) => <Connection key={`handoff-${c.slug}`} d={`M${COL_X[c.slug] + COL_W} ${COL_Y + COL_H / 2} H${COL_X[columns[i + 1].slug]}`} lit={active === i || active === i + 1} arrow={`url(#${id}-arrow)`} />)}
      <Connection d={`M${mid('learn')} ${COL_Y + COL_H} V245 H${mid('sense')} V${COL_Y + COL_H}`} lit={active === 4 || active === 0} arrow={`url(#${id}-arrow)`} />

      {scenario && columns.map((c, i) => <g key={`jobs-${c.slug}`}>
        <Connection d={`M${mid(c.slug)} ${COL_Y + COL_H} V${NODE_Y0}`} lit={active === i} />
        {[0, 1].map(j => <Connection key={j} d={`M${mid(c.slug)} ${NODE_Y0 + j * (NODE_H + NODE_GAP) + NODE_H} v${NODE_GAP}`} lit={active === i} />)}
        <Connection d={`M${mid(c.slug)} ${NODE_Y0 + 2 * (NODE_H + NODE_GAP) + NODE_H} V465`} lit={active === i} />
      </g>)}
      {scenario && <>
        <Connection d={`M${mid('sense')} 465 H${mid('learn')}`} lit={active !== undefined} />
        {[186.5, 499.5, 812.5].map(x => <Connection key={x} d={`M${x} 465 V${SURF_Y}`} lit={active !== undefined} arrow={`url(#${id}-arrow)`} />)}
      </>}

      {/* The jobs, three per column */}
      {columns.map((c, columnIndex) => (
        <g key={`${c.slug}-nodes`} data-col={c.slug} data-active={active === columnIndex}>
          {nodes
            .filter((n) => n.column === c.slug)
            .map((n, j) => {
              const y = NODE_Y0 + j * (NODE_H + NODE_GAP);
              const body = (
                <>
                  <rect x={COL_X[c.slug]} y={y} width={COL_W} height={NODE_H} rx="4" />
                  <text x={COL_X[c.slug] + 14} y={y + 21}>
                    {scenario ? [['Customer needs','Customer feedback','Work in progress'],['Opportunity brief','Founder judgement','Clear boundaries'],['Prepare the work','Review the quality','Handle exceptions'],['Deliver the change','Watch the response','Resolve the issues'],['Revenue & retention','Cost & margin','Next opportunity']][columnIndex][j] : n.name}
                  </text>
                  <text x={COL_X[c.slug] + 14} y={y + 38}>
                    {scenario ? [['Demand','Context','Capacity'],['Value','Priority','Scope'],['Action','Confidence','Care'],['Value delivered','Evidence','Reliability'],['Growth','Profit','Learning']][columnIndex][j] : n.mark}
                  </text>
                </>
              );
              return linked ? (
                <a key={n.slug} href={`#n-${n.slug}`} aria-label={`${scenario ? [['Customer needs','Customer feedback','Work in progress'],['Opportunity brief','Founder judgement','Clear boundaries'],['Prepare the work','Review the quality','Handle exceptions'],['Deliver the change','Watch the response','Resolve the issues'],['Revenue & retention','Cost & margin','Next opportunity']][columnIndex][j] : n.name}: ${n.job}`}>
                  {body}
                </a>
              ) : (
                <g key={n.slug} role={onSelect ? 'button' : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={scenario ? `${scenario.steps[columnIndex].name}: explore action and impact` : undefined} onClick={()=>onSelect?.(columnIndex)} onKeyDown={e=>{if(onSelect&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onSelect(columnIndex);}}}>{body}</g>
              );
            })}
        </g>
      ))}

      {/* Where you plug in */}
      <g data-col="surface">
        {surface.map((s, i) => {
          const x = 40 + i * 313;
          return (
            <a key={scenario ? ['Revenue growth', 'Healthy profit', 'Time to lead'][i] : s.name} href={scenario ? '#contact' : s.href}>
              <rect x={x} y={SURF_Y} width="293" height="64" rx="6" />
              <text x={x + 146} y={SURF_Y + 27} textAnchor="middle">
                {scenario ? ['Revenue growth', 'Healthy profit', 'Time to lead'][i] : s.name}
              </text>
              <text x={x + 146} y={SURF_Y + 47} textAnchor="middle">
                {scenario ? ['Win and retain customers', 'Measure value against costs', 'Founder owns the direction'][i] : s.detail}
              </text>
            </a>
          );
        })}
      </g>
    </svg>
  );
}

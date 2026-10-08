import * as saved from '@/data/traction';

/**
 * A board that publishes itself. The engine (same host, loopback) serves the public
 * projection of a board that opted in: public gates, the headline count, and the work
 * that happened (kept, late, missed). Pages revalidate every five minutes; when the
 * engine cannot be read (a build, an outage) Traction falls back to its last hand copy.
 */
export type BoardGate = { label: string; text: string; progress: string; current?: boolean; passed?: boolean };
export type BoardRow = { date: string; entry: string; status: 'KEPT' | 'LATE' | 'MISSED' };
export type Board = { app: string; name: string; outcome: string; count: { founders: number; of: number; label: string }; gates: BoardGate[]; record: BoardRow[]; readAt: string | null; live: boolean };

type Projection = {
  ok: boolean; app: string; name: string; outcome: string; read_at: string | null;
  counter: { label: string; value: number | null; target: number | null } | null;
  gates: { id: string; name: string; state: string; measures: { title: string; value: number | null; target: number | null; met: boolean }[] }[];
  record: { at: string; title: string; status: BoardRow['status'] }[];
};

const ENGINE = (process.env.ENGINE_PUBLIC_URL ?? 'http://127.0.0.1:8765').replace(/\/+$/, '');
const day = (at: string) => new Date(at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'Europe/London' }).toUpperCase();
export const stamp = (at: string) => new Date(at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/London' });

function shape(p: Projection): Board {
  const firstOpen = p.gates.findIndex(g => g.state !== 'passed');
  return {
    app: p.app, name: p.name, outcome: p.outcome, readAt: p.read_at, live: true,
    count: { founders: p.counter?.value ?? 0, of: p.counter?.target ?? 0, label: p.counter?.label ?? '' },
    gates: p.gates.map((g, i) => ({ label: `Gate ${g.id.replace(/^gate-/, '')}`, text: g.name, passed: g.state === 'passed', current: i === firstOpen,
      progress: g.measures.filter(m => m.target !== null).map(m => `${m.value ?? 0}/${m.target}`).join(' · ') })),
    record: p.record.map(r => ({ date: day(r.at), entry: r.title, status: r.status })),
  };
}

/** The live board, or null when the app did not opt in or the engine is out of reach. */
export async function readBoard(app: string): Promise<Board | null> {
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(app)) return null;
  try {
    const res = await fetch(`${ENGINE}/public/boards/${app}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(2500) });
    if (!res.ok) return null;
    const body = (await res.json()) as Projection;
    return body.ok ? shape(body) : null;
  } catch {
    return null;
  }
}

/** Traction's board: live when the engine answers, its last hand copy otherwise. */
export async function tractionBoard(): Promise<Board> {
  return (await readBoard('traction')) ?? {
    app: 'traction', name: 'Traction', outcome: '', readAt: null, live: false,
    count: { ...saved.count, label: 'founders on the board' },
    gates: saved.gates.map(g => ({ label: g.label, text: g.text, progress: '', ...(g.current ? { current: true } : {}) })),
    record: saved.record,
  };
}

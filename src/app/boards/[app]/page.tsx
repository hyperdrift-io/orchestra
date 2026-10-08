import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { readBoard, stamp } from '@/lib/board';
import { Footer } from '@/components/Footer';

/** Any board that opted in, published by itself: its gates, its count and what happened, misses included. */
export const revalidate = 300;
type Props = { params: Promise<{ app: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const board = await readBoard((await params).app);
  if (!board) return { title: 'Board not public', robots: { index: false } };
  const title = `${board.name} on Traction · its board, in public`;
  const description = `${board.name}'s evidence gates and every day on the record, misses included. Read from its own board.`;
  return { title, description, alternates: { canonical: `/boards/${board.app}` }, openGraph: { ...websiteOpenGraph, title, description, url: `https://ai.hyperdrift.io/boards/${board.app}` } };
}

export default async function PublicBoardPage({ params }: Props) {
  const board = await readBoard((await params).app);
  if (!board) notFound();
  return <>
    <section id="launch" aria-labelledby="board-title">
      <header>
        <p>{board.name} · on Traction</p>
        <h1 id="board-title">{board.name}’s board. <em>In public.</em></h1>
        {board.outcome && <p>{board.outcome}</p>}
        <p><a href="/traction">What Traction is →</a> · <a href="/traction#contact">Ask for a first read →</a></p>
      </header>
      <div>
        <div>
          {board.count.of > 0 && <h2><span className="numeral">{board.count.founders}/{board.count.of}</span> {board.count.label}</h2>}
          <ol>{board.gates.map((gate) => <li key={gate.label} aria-current={gate.current ? 'step' : undefined} data-passed={gate.passed || undefined}><span>{gate.label}</span>{gate.text}{gate.progress && <small>{gate.progress}</small>}</li>)}</ol>
          <p>Each gate opens on evidence, never on a date.</p>
        </div>
        <table>
          <caption>Every day goes on the record. Misses too.{board.readAt && <small>Read from the board · {stamp(board.readAt)}</small>}</caption>
          <tbody>{board.record.map((row) => <tr key={`${row.date}-${row.entry}`}><td>{row.date}</td><td>{row.entry}</td><td data-status={row.status}>{row.status}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <Footer />
  </>;
}

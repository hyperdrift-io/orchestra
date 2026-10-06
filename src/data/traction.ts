/**
 * Traction's public launch record. Every number and row mirrors a record on Traction's own board
 * (production, read with the operator workspace's .growth/traction/gtm.py read); change the board first, then this file.
 * The page updates at beats (a gate moves, a founder joins, a miss worth owning), never on a daily schedule.
 */

export const launched = '7 Oct';

/** When this file was last mirrored from the board. */
export const updated = '7 Oct 2026';

export const count = { founders: 0, of: 3 };

/** The evidence gates the count has to pass, in order. `current` marks the next one to earn. */
export const gates: { label: string; text: string; current?: boolean }[] = [
  { label: 'Gate 1', text: '10 first reads · 3 conversations', current: true },
  { label: 'Gate 2', text: '3 founders act from their board' },
  { label: 'Gate 3', text: '3 founders pay' },
  { label: 'Gate 4', text: '2 continue' },
];

export type RecordStatus = 'KEPT' | 'LATE' | 'MISSED';

/** Newest first. */
export const record: { date: string; entry: string; status: RecordStatus }[] = [
  { date: '06 OCT', entry: 'Launch moved to Wednesday', status: 'LATE' },
  { date: '06 OCT', entry: 'This page, rebuilt inside Orchestra', status: 'LATE' },
  { date: '06 OCT', entry: 'Daily read and log', status: 'LATE' },
  { date: '05 OCT', entry: 'Teaser post', status: 'MISSED' },
  { date: '05 OCT', entry: 'Daily read and log', status: 'MISSED' },
  { date: '04 OCT', entry: 'Trailer cut, then re-cut for launch day', status: 'KEPT' },
  { date: '04 OCT', entry: 'Traction put on its own board', status: 'KEPT' },
  { date: '04 OCT', entry: 'Launch plan to Yann', status: 'KEPT' },
];

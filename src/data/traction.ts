/**
 * Traction's public launch record. Every number and row mirrors a record on Traction's own board
 * (operator workspace: .growth/traction/gtm.py read); change the board first, then this file.
 */

export const count = { founders: 0, of: 3 };

/** The evidence gates the count has to pass, in order. `current` marks the next one to earn. */
export const gates: { label: string; text: string; current?: boolean }[] = [
  { label: 'Gate 1', text: '200 visitors · 10 first reads · 3 conversations', current: true },
  { label: 'Gate 2', text: '3 founders act from their board' },
  { label: 'Gate 3', text: '3 founders pay' },
  { label: 'Gate 4', text: '2 continue' },
];

export type RecordStatus = 'KEPT' | 'LATE' | 'MISSED';

/** Newest first. */
export const record: { date: string; entry: string; status: RecordStatus }[] = [
  { date: '06 OCT', entry: 'This page, rebuilt inside Orchestra', status: 'LATE' },
  { date: '05 OCT', entry: 'Daily read and log', status: 'MISSED' },
  { date: '04 OCT', entry: 'Trailer cut, then re-cut for launch day', status: 'KEPT' },
  { date: '04 OCT', entry: 'Traction put on its own board', status: 'KEPT' },
  { date: '04 OCT', entry: 'Launch plan to Yann', status: 'KEPT' },
];

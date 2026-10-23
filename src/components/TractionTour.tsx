'use client';

import { trackEvent } from '@/lib/analytics';
import { exampleBoardHref } from '@/data/traction-offer';

/** The live example board, first in the media slot: an invented startup's Traction board with a two-minute narrated tour. */
export function TractionTour() {
  return <figure data-traction-tour>
    <a href={exampleBoardHref} onClick={() => trackEvent('example_board_opened', { from: 'traction' })}
      aria-label="Take the tour: two minutes, narrated, on a live example board for Slotbloom, an invented studio-booking startup">
      <img src="/traction/tour-poster.jpg" width={1600} height={900} alt="" decoding="async" />
      <span data-tour-badge>Live example board · fictional data</span>
      <span data-tour-play aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8.5 5.5v13l10.5-6.5Z" /></svg></span>
      <span data-tour-label><strong>Take the tour</strong><small>2 minutes, narrated</small></span>
    </a>
    <figcaption>Traction at work on a live example board: Slotbloom, an invented studio-booking startup. After the tour, the board is yours to explore.</figcaption>
  </figure>;
}

import { formatDay, getLatestIntel, getLatestWriting, type FeedItem } from '@/lib/feeds';

interface SlotProps {
  kicker: string;
  item: FeedItem | null;
  /** Shown when the feed is unavailable: a permanent link, never a stale "latest". */
  fallback: { title: string; url: string };
  action: string;
}

function Slot({ kicker, item, fallback, action }: SlotProps) {
  return (
    <article>
      <p className="meta">{kicker}</p>
      <h3>{item?.title ?? fallback.title}</h3>
      {item && (
        <p>
          <time dateTime={item.date}>{formatDay(item.date)}</time>
        </p>
      )}
      <p>
        <a href={item?.url ?? fallback.url}>{action} ↗</a>
      </p>
    </article>
  );
}

export async function CurrentContent() {
  const [intel, writing] = await Promise.all([getLatestIntel(), getLatestWriting()]);

  return (
    <section id="now" aria-labelledby="now-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>01</p>
        <p className="eyebrow">Movement I · Now playing</p>
        <h2 id="now-title">
          What we are <em>reading and writing</em>.
        </h2>
      </div>

      <div>
        <Slot
          kicker="Intel · Daily brief"
          item={intel}
          fallback={{ title: 'The daily AI briefing', url: 'https://intel.hyperdrift.io/daily' }}
          action={intel ? 'Read the briefing' : 'Read Intel'}
        />
        <Slot
          kicker="Latest writing"
          item={writing}
          fallback={{ title: 'Engineering notes from the fleet', url: 'https://hyperdrift.io/blog' }}
          action={writing ? 'Read the article' : 'Read the Hyperdrift blog'}
        />
        <Slot
          kicker="Our first year"
          item={null}
          fallback={{ title: 'Hyperdrift turns one', url: 'https://hyperdrift.io/blog/hyperdrift-turns-one' }}
          action="Read the story"
        />
      </div>
    </section>
  );
}

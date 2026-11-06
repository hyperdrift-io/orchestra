import { readdir, readFile, stat } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { boardHref, continueHref, freeBoard, partnershipHref, services, startHref, waysOn } from './traction-offer';
import { tour } from './traction-tour';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const words = [freeBoard.text, ...waysOn.flatMap((way) => [way.name, way.text]), ...services.map((service) => service.text)].join('\n');

describe('how Traction continues', () => {
  it('is a free day one, then two ways on: a subscription taken inside Traction, the Partnership by conversation', () => {
    expect(waysOn.map((way) => way.slug)).toEqual(['subscription', 'partnership']);
    expect(waysOn[0].name).toBe('A subscription');
    expect(waysOn[0].text).toMatch(/price on your board before you pay/);
    expect(waysOn[0].link).toBeUndefined();
    expect(waysOn[1].link?.href).toBe(partnershipHref);
    expect(continueHref).toBe('/traction#continue');
  });

  it('names no price, term, count or scarcity on a public page', () => {
    expect(words).not.toMatch(/[£$€]|\bper (?:month|week|year)\b|\d+ ?%|\bdays? (?:free|trial)\b|\b(?:select few|only \d|spots?|places left|limited|waiting list)\b/i);
  });

  it('sends a founder to Traction itself to start or to continue', () => {
    expect(startHref()).toBe('https://traction.hyperdrift.io/start');
    expect(startHref('c-50b91edd')).toBe('https://traction.hyperdrift.io/start?from=c-50b91edd');
    // From an invitation: the app's public address and name, so the form arrives filled in; never a person's name or email.
    expect(startHref('c-f1a7fa4e', { url: 'https://venuebook.co/', product: 'VenueBook' }))
      .toBe('https://traction.hyperdrift.io/start?from=c-f1a7fa4e&app=https%3A%2F%2Fvenuebook.co%2F&product=VenueBook');
    expect(boardHref('olatti')).toBe('https://traction.hyperdrift.io/app/olatti');
  });

  it('is the one definition the pages, the home card and llms.txt read', async () => {
    expect(await source('../components/Traction.tsx')).toMatch(/waysOn\.map/);
    expect(await source('../app/llms.txt/route.ts')).toMatch(/waysOn\.map/);
    expect(await source('../components/Services.tsx')).toMatch(/services\.map/);
  });

  it('defines the door once and offers it twice in the same words: on the film’s last frame and at the page’s end', async () => {
    const product = await source('../components/Traction.tsx');
    // One per reading: a visitor sees Traction on their own app; a free board's founder opens their board. Neither is a form.
    expect(product.match(/data-primary=""/g)).toHaveLength(1);
    expect(product).toMatch(/<TractionTour door=\{door\} \/>/);
    expect(product).toMatch(/href=\{door\.href\} data-primary="">\{door\.label\}/);
    expect(product).not.toMatch(/data-enquiry/);
    // The film's door is the page's: its address and words come in from the page, never its own.
    const film = await source('../components/TractionTour.tsx');
    expect(film.match(/href=/g)).toHaveLength(1);
    expect(film).toMatch(/href=\{door\.href\}/);
    const partnership = await source('../components/TractionPartnership.tsx');
    expect(partnership.match(/data-primary=""/g)).toHaveLength(1);
    expect(partnership).toMatch(/data-introduce/);
  });

  it('shows Traction in action on the founder’s own app; the sample read is retired', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/See Traction in action →/);
    expect(product).not.toMatch(/Start free|Get your first read/);
    expect(product).toMatch(/your email, then a passkey/);
    expect(product).not.toMatch(/\/traction\/first-read/);
    expect(await source('../app/traction/first-read/page.tsx')).toMatch(/permanentRedirect\('\/traction'\)/);
    expect(await source('../app/llms.txt/route.ts')).not.toMatch(/sample first read/i);
  });

  it('opens an invited founder’s own board, on the read made as they landed', async () => {
    const invitation = await source('../components/TractionInvitation.tsx');
    expect(invitation).toMatch(/Open \$\{product\}’s Traction board now →/);
    expect(invitation).not.toMatch(/Start free/);
    expect(invitation).toMatch(/<TractionLiveRead /);
    expect(await source('../app/traction/invitation/[token]/page.tsx')).toMatch(/await liveRead\(invitation\.url\)/);
    expect(await source('../app/api/traction/read/route.ts')).toMatch(/tractionInvitation\(/);
  });

  it('opens on the engine at work: Traction itself as one film, a question, five chapters in order, then the close and the door', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/Traction is an engine/);
    expect(tour.chapters.map((chapter) => chapter.id)).toEqual(['read', 'customers', 'email', 'plan', 'market']);
    // The opening question plays first; the chapters start in order; the close follows the last, the door shows inside it.
    const starts = tour.chapters.map((chapter) => chapter.start);
    expect(starts[0]).toBeGreaterThan(0);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(tour.close).toBeGreaterThan(starts.at(-1)!);
    expect(tour.door.at).toBeGreaterThan(tour.close);
    expect(tour.duration).toBeGreaterThan(tour.door.at);
    expect(tour.end.title).toBe('Make Traction work for you, now.');
    expect(product).toMatch(/Make Traction work for you, now\./);
    expect(tour.end.line).toBe(freeBoard.text);
    // Each chapter is narrated: its lines come in order inside the chapter, and the page carries them under the picture.
    tour.chapters.forEach((chapter, index) => {
      const next = tour.chapters[index + 1]?.start ?? tour.close;
      expect(chapter.says.length, chapter.id).toBeGreaterThan(1);
      expect(chapter.says.map((say) => say.at), chapter.id).toEqual([...chapter.says.map((say) => say.at)].sort((a, b) => a - b));
      for (const say of chapter.says) expect(say.at > chapter.start && say.at < next, `${chapter.id}: ${say.text}`).toBe(true);
    });
    expect(await source('../components/TractionTour.tsx')).toMatch(/chapters\[scene\]\.says\[say\]\.text/);
    // The film, its phone copy and its still are in public/, and the page says what the recording is.
    for (const file of [tour.src, tour.small, tour.poster]) {
      await expect(stat(new URL(`../../public${file}`, import.meta.url)), file).resolves.toBeTruthy();
    }
    expect(tour.labels.recorded).toMatch(/renamed Yourapp/);
    expect(tour.labels.recorded).toMatch(/blurred/);
    // Chapters replayed from saved research on later screens say so under the picture; the market says whose board it is.
    expect(tour.labels.replayed).toMatch(/5 November 2026 run, replayed/);
    expect(tour.chapters.filter((chapter) => chapter.label === 'replayed').map((chapter) => chapter.id)).toEqual(['read', 'customers', 'email']);
    expect(tour.labels.market).toMatch(/Traction’s own board/);
    // The film stays agnostic: the stand-in's field is blurred on screen and never named in the page's words.
    expect(tour.labels.replayed).toMatch(/its field and the businesses blurred/);
    for (const path of ['./traction-tour.ts', '../components/Traction.tsx', '../components/TractionTour.tsx']) {
      expect(await source(path), path).not.toMatch(/\bCVs?\b|r[ée]sum[ée]|\bjobs?\b|career|recruit/i);
    }
    expect(await source('./traction-tour.ts')).not.toMatch(/Example data|invented|Free trial/i);
    // The search researches prospects; it doesn't prove that anyone needs or would buy the app.
    expect(await source('./traction-tour.ts')).not.toMatch(/\bproofs?\b|\bproves?\b|would buy|needs? it/i);
  });

  it('shows no invented company: the founder’s own app is the subject', async () => {
    const files = [
      ...(await readdir(new URL('../components/', import.meta.url))).map((name) => `../components/${name}`),
      ...(await readdir(new URL('./', import.meta.url))).map((name) => `./${name}`),
    ].filter((path) => /\.(tsx?|json)$/.test(path) && !path.endsWith('.test.ts'));
    for (const path of files) expect(await source(path), path).not.toMatch(/slotbloom|studio-example|example board/i);
  });
});

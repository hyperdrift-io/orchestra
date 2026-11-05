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

  it('keeps one door per page and no form for continuing', async () => {
    const product = await source('../components/Traction.tsx');
    // One per reading: a visitor starts free; a free board's founder opens their board. Neither is a form.
    expect(product.match(/data-primary=""/g)).toHaveLength(2);
    expect(product).not.toMatch(/data-enquiry/);
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

  it('opens on the engine at work: Traction recorded on one run, chapter by chapter, with no door of its own', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/Traction is an engine/);
    expect(product).toMatch(/<TractionTour \/>/);
    expect(tour.chapters.map((chapter) => chapter.id)).toEqual(['read', 'customers', 'email', 'plan', 'market']);
    expect(tour.end.line).toBe(freeBoard.text);
    // Every chapter has its clip and still in public/, and the page says what the recording is.
    for (const chapter of tour.chapters) {
      for (const file of [tour.clip(chapter.id), tour.poster(chapter.id)]) {
        await expect(stat(new URL(`../../public${file}`, import.meta.url)), file).resolves.toBeTruthy();
      }
    }
    expect(tour.labels.recorded).toMatch(/renamed Yourapp/);
    expect(tour.labels.recorded).toMatch(/blurred/);
    // Chapters replayed from saved research on later screens say so under the picture.
    expect(tour.labels.replayed).toMatch(/5 November 2026 run, replayed/);
    expect(tour.chapters.filter((chapter) => chapter.label === 'replayed').map((chapter) => chapter.id)).toEqual(['read', 'customers', 'email']);
    expect(await source('./traction-tour.ts')).not.toMatch(/Example data|invented|Free trial/i);
    // The search researches prospects; it doesn't prove that anyone needs or would buy the app.
    expect(await source('./traction-tour.ts')).not.toMatch(/\bproofs?\b|\bproves?\b|would buy|needs? it/i);
    // The page asks once, at its end.
    expect(await source('../components/TractionTour.tsx')).not.toMatch(/href=/);
  });

  it('shows no invented company: the founder’s own app is the subject', async () => {
    const files = [
      ...(await readdir(new URL('../components/', import.meta.url))).map((name) => `../components/${name}`),
      ...(await readdir(new URL('./', import.meta.url))).map((name) => `./${name}`),
    ].filter((path) => /\.(tsx?|json)$/.test(path) && !path.endsWith('.test.ts'));
    for (const path of files) expect(await source(path), path).not.toMatch(/slotbloom|studio-example|example board/i);
  });
});

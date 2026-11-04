import { readdir, readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { boardHref, continueHref, freeBoard, partnershipHref, services, startHref, waysOn } from './traction-offer';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const words = [freeBoard.text, ...waysOn.flatMap((way) => [way.name, way.text]), ...services.map((service) => service.text)].join('\n');

describe('how Traction continues', () => {
  it('is a free day one, then two ways on: a subscription taken inside Traction, the Partnership by conversation', () => {
    expect(waysOn.map((way) => way.slug)).toEqual(['subscription', 'partnership']);
    expect(waysOn[0].name).toBe('A subscription');
    expect(waysOn[0].text).toMatch(/price on your board before you pay anything/);
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

  it('asks for the founder’s own first read; the sample read is retired', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/Get your first read →/);
    expect(product).toMatch(/your email, then a passkey/);
    expect(product).not.toMatch(/\/traction\/first-read/);
    expect(await source('../app/traction/first-read/page.tsx')).toMatch(/permanentRedirect\('\/traction'\)/);
    expect(await source('../app/llms.txt/route.ts')).not.toMatch(/sample first read/i);
  });

  it('shows no invented company: the founder’s own app is the subject', async () => {
    const files = [
      ...(await readdir(new URL('../components/', import.meta.url))).map((name) => `../components/${name}`),
      ...(await readdir(new URL('./', import.meta.url))).map((name) => `./${name}`),
    ].filter((path) => /\.(tsx?|json)$/.test(path) && !path.endsWith('.test.ts'));
    for (const path of files) expect(await source(path), path).not.toMatch(/slotbloom|studio-example|example board/i);
  });
});

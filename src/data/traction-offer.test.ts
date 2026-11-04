import { readFile } from 'node:fs/promises';
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

  it('asks for the founder’s own first read, never a sample request by enquiry', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/Get your first read →/);
    expect(product).toMatch(/your email, then a passkey/);
    const sample = await source('../components/TractionOffer.tsx');
    expect(sample).toMatch(/href=\{startHref\(\)\} data-primary="">Get your first read →/);
    expect(sample).not.toMatch(/data-enquiry/);
  });

  it('shows the four areas at work on the product page only, with no second film beside the tour', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/<TractionWalkthrough \/>/);
    expect(product).not.toMatch(/TractionFilm|BoardValue/);
    expect(await source('../components/TractionPartnership.tsx')).not.toMatch(/TractionWalkthrough/);
    expect(await source('../components/TractionWalkthrough.tsx')).not.toMatch(/We’ll|help us/);
  });
});

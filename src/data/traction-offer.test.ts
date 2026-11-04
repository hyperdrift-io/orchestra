import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { continueHref, ladder, services } from './traction-offer';
import { enquiryChoices } from './situations';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const words = [...ladder.flatMap((step) => [step.name, step.get, step.bring, step.fits]), ...services.map((service) => service.text)].join('\n');

describe('how Traction continues', () => {
  it('is three steps in the order a founder takes them, each with what they get, what they bring and when it fits', () => {
    expect(ladder.map((step) => step.slug)).toEqual(['start-free', 'board', 'partnership']);
    expect(ladder.map((step) => step.name)).toEqual(['Start free', 'Traction', 'The Traction Partnership']);
    for (const step of ladder) for (const field of [step.get, step.bring, step.fits]) expect(field.length).toBeGreaterThan(20);
    expect(continueHref).toBe('/traction#continue');
  });

  it('names no price, term, count or scarcity on a public page', () => {
    expect(words).not.toMatch(/[£$€]|\bper (?:month|week|year)\b|\d+ ?%|\bdays? (?:free|trial)\b|\b(?:select few|only \d|spots?|places left|limited|waiting list)\b/i);
  });

  it('is the one definition the page, the home card and llms.txt read', async () => {
    expect(await source('../components/Traction.tsx')).toMatch(/ladder\.map/);
    expect(await source('../app/llms.txt/route.ts')).toMatch(/ladder\.map/);
    expect(await source('../components/Services.tsx')).toMatch(/services\.map/);
  });

  it('keeps one door on /traction after the proposal, in both readings of the page', async () => {
    const page = await source('../components/Traction.tsx');
    // One per reading: a visitor introduces an app; a free board's founder continues theirs. The steps carry no button.
    expect(page.match(/data-primary=""/g)).toHaveLength(2);
    expect(page).toMatch(/id="continue"/);
  });

  it('lets a free board’s founder say they are continuing, through the shared enquiry', () => {
    expect(enquiryChoices.find((choice) => choice.value === 'continue')?.label).toBe('Continuing from my free Traction board');
  });
});

import { readdir, readFile, stat } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { boardHref, continueHref, freeBoard, partnershipHref, services, startHref, waysOn } from './traction-offer';
import { featureGroups, featuresIntro } from './traction-features';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const words = [freeBoard.text, ...waysOn.flatMap((way) => [way.name, way.text]), ...services.map((service) => service.text)].join('\n');

describe('how Traction continues', () => {
  it('offers continued use and the Partnership through available conversation routes', () => {
    expect(waysOn.map((way) => way.slug)).toEqual(['subscription', 'partnership']);
    expect(waysOn[0].text).toContain('price before you commit');
    expect(waysOn[0].text).not.toContain('price on your board');
    expect(waysOn[0].link?.href).toBe('/traction?situation=subscription#enquire');
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

  it('offers an enquiry from the free board without a circular pricing promise', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toContain('Discuss the next step');
    expect(product).toContain('situation=subscription#enquire');
    expect(product).not.toContain('Both ways on are there, with the price');
    const partnership = await source('../components/TractionPartnership.tsx');
    expect(partnership.match(/data-primary=""/g)).toHaveLength(1);
    expect(partnership).toMatch(/data-introduce/);
  });

  it('starts a trial on the founder’s own app; the sample read is retired', async () => {
    const product = await source('../components/Traction.tsx');
    expect(product).toMatch(/Trial Traction →/);
    expect(product).not.toMatch(/See Traction in action|Start free|Get your first read/);
    // The masthead carries the same door, in the same words, for a reader who has already decided.
    expect(await source('../components/SiteContactLink.tsx')).toMatch(/<a href="#your-board">Trial Traction<\/a>/);
    expect(product).toMatch(/email, then a passkey/);
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

  it('reads the proposal before the ask: the engine at work, what it does, how it continues, then the one door', async () => {
    const product = await source('../components/Traction.tsx');
    const order = ['<TractionWalkthrough />', '<TractionFeatures />', 'id="continue"', 'Trial Traction →'].map((mark) => product.indexOf(mark));
    expect(order.every((at) => at > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(product.match(/Trial Traction →/g)).toHaveLength(1);
    const walkthrough = await source('../components/TractionWalkthrough.tsx');
    // Each tab names the part of the board as Traction names it.
    expect([...walkthrough.matchAll(/name: '([^']+)'/g)].map((match) => match[1])).toEqual(['Roadmap', 'CRM', 'Growth Manager', 'Results']);
    expect(walkthrough).toMatch(/Example data/);
    expect(walkthrough).not.toMatch(/href=/);
    // Every area has its clip and still in public/.
    const files = [...walkthrough.matchAll(/'(\/traction\/in-action\/[a-z]+\.(?:mp4|jpg))'/g)].map((match) => match[1]);
    expect(files).toHaveLength(8);
    for (const file of files) await expect(stat(new URL(`../../public${file}`, import.meta.url)), file).resolves.toBeTruthy();
  });

  it('says what Traction does: the free start first, each claim one the board keeps', () => {
    expect(featureGroups.map((group) => group.id)).toEqual(['free', 'continued']);
    // The free group is exactly what `freeBoard` gives: the website review, the first search and its email drafts.
    expect(featureGroups[0].features.map((feature) => feature.title)).toEqual([
      'It reads your app like a new customer.', 'It finds people your app could help.', 'It writes to each, in your voice.',
    ]);
    const featureWords = [featuresIntro.title, featuresIntro.text, ...featureGroups.flatMap((group) => [group.label, ...group.features.flatMap((feature) => [feature.title, feature.text])])].join('\n');
    expect(featureWords).toMatch(/up to five businesses/);
    expect(featureWords).toMatch(/only a reply confirms interest/);
    expect(featureWords).toMatch(/Nothing is sent without you\./);
    // The search researches prospects; it doesn't prove that anyone needs or would buy the app.
    expect(featureWords).not.toMatch(/\bproofs?\b|\bproves?\b|would buy|needs? it|guarantee/i);
    expect(featureWords).not.toMatch(/[£$€]|\d+ ?%|\bper (?:month|week|year)\b|\b(?:limited|only \d|spots?|places left)\b/i);
  });

  it('shows no invented company: the founder’s own app is the subject', async () => {
    const files = [
      ...(await readdir(new URL('../components/', import.meta.url))).map((name) => `../components/${name}`),
      ...(await readdir(new URL('./', import.meta.url))).map((name) => `./${name}`),
    ].filter((path) => /\.(tsx?|json)$/.test(path) && !path.endsWith('.test.ts'));
    for (const path of files) expect(await source(path), path).not.toMatch(/slotbloom|studio-example|example board/i);
  });
});

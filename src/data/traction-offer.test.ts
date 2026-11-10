import { readdir, readFile, stat } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { boardHref, continueHref, freeBoard, partnershipHref, services, startHref, waysOn } from './traction-offer';
import { featuresIntro, firstRead, howItWorks, howItWorksHref, loop, tiers, tractionPages } from './traction-features';

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
    expect(await source('../components/TractionDoor.tsx')).toMatch(/Trial Traction →/);
    expect(product).not.toMatch(/See Traction in action|Start free|Get your first read/);
    // The masthead carries the same door, in the same words, for a reader who has already decided.
    expect(await source('../components/SiteContactLink.tsx')).toMatch(/<a href="#your-board">Trial Traction<\/a>/);
    expect(howItWorks.doorNote).toMatch(/email, then a passkey/);
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

  it('gives the start page one job: the engine at work, the loop by name, how it continues, then the one door', async () => {
    const product = await source('../components/Traction.tsx');
    const order = ['<TractionWalkthrough ', 'id="loop"', 'id="continue"', '<TractionDoor />'].map((mark) => product.indexOf(mark));
    expect(order.every((at) => at > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    // The loop's words live on their own page; the start page names the steps and links to each.
    expect(product).not.toMatch(/<TractionFeatures/);
    expect(product).toMatch(/\$\{howItWorksHref\}\$\{from\}#\$\{step\.id\}/);
    expect((await source('../components/TractionDoor.tsx')).match(/Trial Traction →/g)).toHaveLength(1);
  });

  it('cycles the walkthrough through the loop itself: the same steps, names and order, Intel included', async () => {
    const steps = [firstRead, ...loop];
    expect(steps.map((step) => step.name)).toEqual(['First read', 'Intel', 'The move', 'Research', 'Your email', 'Analytics', 'Next move']);
    const walkthrough = await source('../components/TractionWalkthrough.tsx');
    expect(walkthrough).toMatch(/const steps = \[firstRead, \.\.\.loop\];/);
    // It moves on by itself, and a visitor can stop it; a system asking for less motion never starts it.
    expect(walkthrough).toMatch(/prefers-reduced-motion: reduce/);
    expect(walkthrough).toMatch(/howItWorks\.pause/);
    // Every picture named is in public/, and each says where it came from. A step with none says it is to record.
    for (const { picture } of steps) {
      expect(picture.kept).toMatch(/^(Example data|Preview still|To record on our own board)$/);
      for (const file of [picture.clip, picture.poster]) if (file) await expect(stat(new URL(`../../public${file}`, import.meta.url)), file).resolves.toBeTruthy();
    }
  });

  it('answers how Traction works on a page of its own, one click from the other two', async () => {
    expect(howItWorksHref).toBe('/traction/how-it-works');
    const page = await source('../app/traction/how-it-works/page.tsx');
    expect(page).toMatch(/canonical: '\/traction\/how-it-works'/);
    expect(page).toMatch(/const title = 'How Traction works/);
    expect(howItWorks.title).toBe('How Traction works');
    const component = await source('../components/TractionHowItWorks.tsx');
    expect(component).toMatch(/<h1>\{howItWorks\.title\}<\/h1>/);
    expect(component.indexOf('<TractionFeatures />')).toBeLessThan(component.indexOf('<TractionDoor '));
    expect(await source('../app/sitemap.ts')).toMatch(/'traction\/how-it-works'/);
    expect(await source('../app/llms.txt/route.ts')).toMatch(/\/traction\/how-it-works\)/);
    expect(tractionPages.map((entry) => entry.href)).toEqual(['/traction', '/traction/how-it-works', '/traction/partnership']);
    for (const file of ['../app/traction/page.tsx', '../app/traction/how-it-works/page.tsx', '../app/traction/partnership/page.tsx']) expect(await source(file), file).toMatch(/<TractionPages current="/);
  });

  it('says what Traction does as one loop: the first read, then six steps that end where they began', async () => {
    // The order is the loop. Each id is an address a door on the board can open: /traction/how-it-works#<id>.
    const ids = [firstRead, ...loop].map((step) => step.id);
    expect(ids).toEqual(['first-read', 'intel', 'growth-manager', 'research', 'mailbox', 'analytics', 'next-move']);
    // The last step hands back to the first; it promises no second market read, which a free board doesn't have.
    expect(featuresIntro.again).toBe('Back to 01, with what you learned.');
    expect(loop.at(-1)?.text).not.toMatch(/Intel|market/);
    const features = await source('../components/TractionFeatures.tsx');
    expect(features).toMatch(/<section id="features" /);
    expect(features).toMatch(/<li id=\{step\.id\}>/);
    // No step takes an address the page already uses.
    const taken = [...(await source('../components/Traction.tsx')).matchAll(/ id="([^"]+)"/g)].map((match) => match[1]);
    expect(taken.filter((id) => ids.includes(id))).toEqual([]);
  });

  it('marks where the free start stops and what the subscription adds, as the board does', () => {
    const marks = (tier: 'free' | 'subscription') => Object.fromEntries([firstRead, ...loop].flatMap((step) => step[tier] ? [[step.id, step[tier]]] : []));
    // The free start: one read of the website, one read of the market, one search, and drafts sent from the founder's own mail.
    expect(marks('free')).toEqual({
      'first-read': 'A first read of your website.',
      intel: 'One read of your market.',
      research: 'Your first search: up to five prospects or investors, each with a draft.',
      mailbox: 'Each draft opens in your own mail, ready to send.',
    });
    // The subscription: one market read a day, the founder's mailbox with replies read back, Analytics on their own app.
    // What only a connected mailbox does stays on the subscription line, never in the step every reader takes as theirs.
    expect(loop.find((step) => step.id === 'mailbox')?.text).not.toMatch(/repl|follow-up/i);
    expect(Object.keys(marks('subscription'))).toEqual(['intel', 'mailbox', 'analytics']);
    expect(tiers).toEqual({ free: 'Free to start', subscription: 'With the subscription' });
    // Analytics is there to measure what each initiative returned (founder, 10 November 2026).
    expect(loop.find((step) => step.id === 'analytics')).toMatchObject({ title: 'Analytics matches your numbers to your initiatives.', text: expect.stringMatching(/measure the return on each one/) });
  });

  it('keeps each claim to what the board does: no price, term or trial length, and no claim about demand', () => {
    const featureWords = [...Object.values(featuresIntro), ...Object.values(tiers), ...[firstRead, ...loop].flatMap((step) => [step.title, step.text, step.free ?? '', step.subscription ?? ''])].join('\n');
    expect(featuresIntro.title).toBe('The growth team your app doesn’t have yet.');
    expect(featureWords).toMatch(/up to five/);
    expect(featureWords).toMatch(/only a reply confirms interest/);
    expect(featureWords).toMatch(/nothing is sent without you\./);
    expect(featureWords).toMatch(/Nothing leaves without your click\./);
    // The research prepares outreach; it doesn't prove that anyone needs or would buy the app.
    expect(featureWords).not.toMatch(/\bproofs?\b|\bproves?\b|would buy|needs? it|guarantee/i);
    expect(featureWords).not.toMatch(/[£$€]|\d+ ?%|\bper (?:month|week|year)\b|\b(?:limited|only \d|spots?|places left)\b/i);
    // A trial has no clock and the subscription starts with a conversation: no length, and "sales" stays out of the name.
    expect(featureWords).not.toMatch(/\b\d+[- ]days?\b|\bdays? (?:free|trial)\b|\bfree for\b|\bsales\b/i);
  });

  it('shows no invented company: the founder’s own app is the subject', async () => {
    const files = [
      ...(await readdir(new URL('../components/', import.meta.url))).map((name) => `../components/${name}`),
      ...(await readdir(new URL('./', import.meta.url))).map((name) => `./${name}`),
    ].filter((path) => /\.(tsx?|json)$/.test(path) && !path.endsWith('.test.ts'));
    for (const path of files) expect(await source(path), path).not.toMatch(/slotbloom|studio-example|example board/i);
  });
});

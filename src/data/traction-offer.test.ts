import { readdir, readFile, stat } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { boardHref, continueHref, freeBoard, partnershipHref, services, startHref, waysOn } from './traction-offer';
import { after, dayOne, featuresIntro, howItWorks, howItWorksHref, steps, tiers, tractionPages } from './traction-features';
import { tour } from './traction-tour';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const words = [freeBoard.text, ...waysOn.flatMap((way) => [way.name, way.text]), ...services.map((service) => service.text)].join('\n');

describe('how Traction continues', () => {
  it('offers continued use and the Partnership through available conversation routes', () => {
    expect(waysOn.map((way) => way.slug)).toEqual(['subscription', 'partnership']);
    // The subscription says what it includes and how its price is set; it never leaves the scope to be agreed (founder, 11 November 2026).
    expect(waysOn[0].text).toMatch(/mailbox connected, a market read a day and Analytics on your own app/);
    expect(waysOn[0].text).toMatch(/quote for the level of integration you want/);
    expect(waysOn[0].text).not.toMatch(/agree what’s included|price on your board/);
    expect(waysOn[0].link?.href).toBe('/traction?situation=subscription#enquire');
    expect(waysOn[1].link?.href).toBe(partnershipHref);
    expect(continueHref).toBe('/traction#continue');
  });

  it('never says free: the trial implies it (founder, 11 November 2026)', async () => {
    const pages = ['./traction-features.ts', './traction-offer.ts', './situations.ts', '../components/Traction.tsx', '../components/TractionPartnership.tsx', '../components/TractionInvitation.tsx', '../components/TractionDoor.tsx', '../components/Proof.tsx', '../app/traction/page.tsx', '../app/llms.txt/route.ts'];
    for (const path of pages) {
      const strings = [...(await source(path)).matchAll(/'([^'\n]*)'|>([^<{}\n]+)</g)].map((match) => match[1] ?? match[2] ?? '').join('\n');
      expect(strings, path).not.toMatch(/\bfree\b/i);
    }
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
    // A founder with no board yet finds the free start in step one, as text in the door's own words, never a second button.
    expect(partnership).toMatch(/<TractionStartLink href=\{startHref\(\)\} plain>Trial Traction →<\/TractionStartLink>/);
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

  it('gives the start page one job: the film of Traction at work, its steps by name, how it continues, then the one door', async () => {
    const product = await source('../components/Traction.tsx');
    const order = ['<TractionTour ', 'id="loop"', 'id="continue"', '<TractionDoor />'].map((mark) => product.indexOf(mark));
    expect(order.every((at) => at > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    // The steps' words live on their own page; the start page names the steps and links to each.
    expect(product).not.toMatch(/<TractionFeatures/);
    expect(product).toMatch(/\$\{howItWorksHref\}\$\{from\}#\$\{step\.id\}/);
    expect((await source('../components/TractionDoor.tsx')).match(/Trial Traction →/g)).toHaveLength(1);
  });

  it('tells one story in the picture and in the words: the film’s chapters, in the film’s order, then the results', () => {
    // Day one, then every week after. The first five steps are the film's chapters, with the film's own titles.
    expect(dayOne.map((step) => step.id)).toEqual(['read', 'customers', 'email']);
    expect(after.map((step) => step.id)).toEqual(['plan', 'market', 'results']);
    expect(steps.slice(0, 5).map((step) => step.id)).toEqual(tour.chapters.map((chapter) => chapter.id));
    expect(steps.slice(0, 5).map((step) => step.title)).toEqual(tour.chapters.map((chapter) => chapter.title));
    expect(steps.map((step) => step.name)).toEqual(['First impression', 'Customers', 'Email', 'Plan', 'Market', 'Results']);
    // The product runs no weekly rhythm by itself, so the second act is named for what it follows.
    expect([featuresIntro.dayOne, featuresIntro.after]).toEqual(['Day one', 'After day one']);
    // The last step hands on to the next move; it promises no second market read, which a free board doesn't have.
    expect(featuresIntro.again).toBe('Then the next move, from what you learned.');
  });

  it('opens on the engine at work: Traction itself as one film, a question, five chapters in order, then the close and the door', async () => {
    expect(tour.chapters.map((chapter) => chapter.id)).toEqual(['read', 'customers', 'email', 'plan', 'market']);
    // The opening question plays first; the chapters start in order; the close follows the last, the door shows inside it.
    const starts = tour.chapters.map((chapter) => chapter.start);
    expect(starts[0]).toBeGreaterThan(0);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(tour.close).toBeGreaterThan(starts.at(-1)!);
    expect(tour.door.at).toBeGreaterThan(tour.close);
    expect(tour.duration).toBeGreaterThan(tour.door.at);
    expect(tour.end.title).toBe('Make Traction work for you, now.');
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


  it('answers how Traction works on a page of its own, one click from the other two', async () => {
    expect(howItWorksHref).toBe('/traction/how-it-works');
    const page = await source('../app/traction/how-it-works/page.tsx');
    expect(page).toMatch(/canonical: '\/traction\/how-it-works'/);
    expect(page).toMatch(/const title = 'How Traction works/);
    expect(howItWorks.title).toBe('How Traction works');
    const component = await source('../components/TractionHowItWorks.tsx');
    expect(component).toMatch(/<h1>\{howItWorks\.title\}<\/h1>/);
    expect(component.indexOf('<TractionFeatures />')).toBeLessThan(component.indexOf('<TractionDoor '));
    // Each step is an address a door on the board can open, and none takes one the page already uses.
    const features = await source('../components/TractionFeatures.tsx');
    expect(features).toMatch(/<section id="features" /);
    expect(features).toMatch(/<li id=\{step\.id\}>/);
    expect(steps.map((step) => step.id).filter((id) => ['features', 'traction', 'your-board'].includes(id))).toEqual([]);
    expect(await source('../app/sitemap.ts')).toMatch(/'traction\/how-it-works'/);
    expect(await source('../app/llms.txt/route.ts')).toMatch(/\/traction\/how-it-works\)/);
    expect(tractionPages.map((entry) => entry.href)).toEqual(['/traction', '/traction/how-it-works', '/traction/partnership']);
    for (const file of ['../app/traction/page.tsx', '../app/traction/how-it-works/page.tsx', '../app/traction/partnership/page.tsx']) expect(await source(file), file).toMatch(/<TractionPages current="/);
  });

  it('marks where the free start stops and what the subscription adds, as the board does', () => {
    const marks = (tier: 'free' | 'subscription') => Object.fromEntries(steps.flatMap((step) => step[tier] ? [[step.id, step[tier]]] : []));
    // The free start: a review of the website, one search, drafts the founder sends from their own mail, one market read.
    expect(marks('free')).toEqual({
      read: 'A review of your website, the day you sign up.',
      customers: 'Your first search: up to five prospects or investors.',
      email: 'Each draft opens in your own mail app, or copies in one click. You send it yourself.',
      market: 'One read of your market.',
    });
    // A free board sends nothing: the line never says a draft is ready to send, or that Traction sends it.
    expect(marks('free').email).not.toMatch(/ready to send|sends? (?:it|them) for you/i);
    // The subscription: the founder's mailbox with replies read back, one market read a day, Analytics on their own app.
    // What only a connected mailbox does stays on the subscription line, never in the step every reader takes as theirs.
    expect(steps.find((step) => step.id === 'email')?.text).not.toMatch(/repl|follow-up/i);
    expect(Object.keys(marks('subscription'))).toEqual(['email', 'market', 'results']);
    expect(tiers).toEqual({ free: 'In the trial', subscription: 'With the subscription' });
    // Analytics is there to show what each initiative returned (founder, 10 November 2026). The board marks each one on
    // the line and computes no return, and it runs on Traction's own board only, so the step says both.
    expect(steps.find((step) => step.id === 'results')).toMatchObject({ title: 'Analytics matches your numbers to your initiatives.', text: expect.stringMatching(/judge what each one returned/), subscription: expect.stringMatching(/Running today on Traction’s own board\.$/) });
    // A subscribed board reads its market when its founder asks, once a day.
    expect(marks('subscription').market).toBe('A fresh read each day you ask for one.');
  });

  it('keeps each claim to what the board does: no price, term or trial length, and no claim about demand', () => {
    const featureWords = [...Object.values(featuresIntro), howItWorks.lead, ...Object.values(tiers), ...steps.flatMap((step) => [step.title, step.text, step.free ?? '', step.subscription ?? ''])].join('\n');
    expect(featuresIntro.title).toBe('A whole team, dedicated to the growth of your app.');
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

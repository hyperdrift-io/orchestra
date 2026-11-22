// Run against the local French-language Traction demo fixture. No production targets.
const fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const origin = process.env.FILM_APP || "http://localhost:3896",
  out = path.resolve(process.argv[2]);
if (new URL(origin).hostname !== "localhost")
  throw Error("A loopback fixture is required.");
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const c = await browser.newContext({
    locale: "fr-FR",
    viewport: { width: 1456, height: 820 },
    recordVideo: { dir: out, size: { width: 1456, height: 820 } },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  await c.route("**/*", (r) => {
    let u = new URL(r.request().url());
    return ["127.0.0.1", "localhost"].includes(u.hostname) ||
      !/^https?:$/.test(u.protocol)
      ? r.continue()
      : r.abort();
  });
  const p = await c.newPage();
  p.setDefaultTimeout(10000);
  const sess = await c.newCDPSession(p);
  await sess.send("WebAuthn.enable");
  await sess.send("WebAuthn.addVirtualAuthenticator", {
    options: {
      protocol: "ctap2",
      transport: "internal",
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  });
  p.on("pageerror", (e) => console.error(e));
  const marks = {};
  const start = Date.now();
  async function shot(n, el) {
    await p.waitForTimeout(230);
    marks[n] = (Date.now() - start) / 1000;
    await p.screenshot({
      path: path.join(out, n + "-full.png"),
      animations: "disabled",
    });
    if (el) {
      const e = typeof el === "string" ? p.locator(el).first() : el;
      await e.scrollIntoViewIfNeeded();
      await e.screenshot({
        path: path.join(out, n + ".png"),
        animations: "disabled",
      });
    } else
      fs.copyFileSync(
        path.join(out, n + "-full.png"),
        path.join(out, n + ".png"),
      );
    await p.waitForTimeout(550);
  }
  const who = process.env.FILM_DOMAIN || "atelier-rendezvous.demo";
  await p.goto(origin + "/start?lang=fr");
  await p.locator("form[data-start-free] button[type=submit]").waitFor();
  await p.locator("input[name=name]").fill("Camille Martin");
  await p.locator("input[name=app_url]").fill(who);
  await p.locator("input[name=email]").fill("camille@" + who);
  await shot("start", "main[data-start]");
  await p.locator("form[data-start-free] button[type=submit]").click();
  await p.waitForURL(/\/app\//);
  const board = p.url().split("#")[0];
  await p
    .locator("[data-day-one-read] ol li h3")
    .first()
    .waitFor({ state: "attached" });
  await p
    .locator("[data-tour] button")
    .filter({ hasText: /[Pp]asser/ })
    .first()
    .click();
  await shot("read", "[data-day-one-read]");
  await shot("offers", "[data-day-one-gm]");
  await p
    .getByRole("button", { name: /^Rechercher des clients potentiels/ })
    .click();
  await p.locator("table[data-day-one-prospects] tbody tr").first().waitFor();
  await shot("customers", "table[data-day-one-prospects]");
  const first = p.locator("[data-day-one-emails] [data-day-one-draft]").first();
  if (!(await first.evaluate((e) => e.open)))
    await first.locator("summary").click();
  await shot("email", first);
  await p
    .locator("[data-day-one-gm-actions] button")
    .filter({ hasText: /Valider/ })
    .first()
    .click();
  await p.locator("[data-day-one-email-actions] a").first().waitFor();
  await shot("approve", "[data-day-one-gm]");
  await p.goto(board + "/initiatives");
  await p.locator("main h1").first().waitFor();
  await shot("plan", "main");
  await p.goto(board + "/intel");
  await p.waitForTimeout(1300);
  await p.locator("[data-stage-offer] button").first().click();
  await p
    .locator("[data-stage-lead][data-shown]")
    .waitFor({ timeout: 25000 })
    .catch(() => {});
  console.log("market", await p.locator("[data-intel-stage]").innerText());
  if (!(await p.locator("[data-stage-lead]").count())) {
    await p.locator("[data-stage-offer] button").first().click();
    await p.locator("[data-stage-lead]").waitFor({ timeout: 25000 });
  }
  await p.waitForTimeout(1600);
  await shot("market", "[data-intel-stage]");
  if (await p.locator("[data-stage-move]").count())
    await shot("market-move", "[data-stage-move]");
  await p.goto(board + "/analytics");
  await p.locator("main").waitFor();
  await shot("analytics", "main");
  await c.close();
  fs.writeFileSync(
    path.join(out, "marks.json"),
    JSON.stringify(marks, null, 2),
  );
  await browser.close();
  console.log(marks);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

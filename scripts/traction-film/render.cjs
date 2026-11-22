// Render the seekable approved motion layout and its French edition, using only local assets.
const fs = require("node:fs"),
  path = require("node:path"),
  { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const [lang, original, captured, dest] = process.argv.slice(2),
  fr = lang === "fr";
const url = (p) => pathToFileURL(path.resolve(p)).href,
  read = (n) => fs.readFileSync(path.join(__dirname, n), "utf8");
const frames = path.join(dest, "frames");
fs.mkdirSync(frames, { recursive: true });
let html = read("hero.html");
if (fr)
  for (const [en, local] of Object.entries(JSON.parse(read("hero-fr.json"))))
    html = html.replaceAll(en, local);
html = html
  .replaceAll("__PUBLIC__", url(path.join(__dirname, "../../public")))
  .replaceAll("__CAPTURE__", url(captured))
  .replaceAll("__ORIGINAL__", url(original));
html = html.replace(
  "<script>",
  `<script>window.TIMELINE=${read("timeline.json")};window.FRENCH=${fr};`,
);
const film = path.join(dest, "hero.html");
fs.writeFileSync(film, html);
(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    args: [
      "--allow-file-access-from-files",
      "--disable-background-timer-throttling",
    ],
  });
  const fps = 15,
    count = 76 * fps;
  let next = 0;
  async function worker() {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2 / 3,
    });
    await page.goto(url(film));
    await page.evaluate(() => window.ready);
    while (next < count) {
      const i = next++,
        file = path.join(frames, String(i).padStart(5, "0") + ".jpg");
      if (fs.existsSync(file)) continue;
      if (!fr && i / fps < 58.9) continue;
      await page.evaluate((t) => window.seek(t), i / fps);
      await page.screenshot({ path: file, type: "jpeg", quality: 90 });
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

import { chromium, webkit } from "playwright";
const out = process.argv[2];
const url = "https://www.neotheagency.de/datenschutz?cb=" + Date.now();
for (const [name, type, vp] of [["1440", chromium, {width:1440,height:900}], ["375", webkit, {width:375,height:812}]]) {
  let b;
  try { b = await type.launch(); } catch (e) { b = await (name==="375"?chromium:webkit).launch(); }
  const p = await b.newPage({ viewport: vp });
  const early = [];
  p.on("domcontentloaded", async () => early.push(await p.title().catch(()=>"?")));
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  const t = await p.title();
  const n = await p.evaluate(() => document.querySelectorAll("title").length);
  const h1 = await p.evaluate(() => document.querySelector("h1")?.textContent);
  await p.screenshot({ path: `${out}/datenschutz-live-${name}.png` });
  console.log(name, b.browserType().name(), JSON.stringify({ early, title: t, titleTags: n, h1 }));
  await b.close();
}

// Live check: every homepage video starts when scrolled into view (1440 Chrome, 375 WebKit iPhone).
import { chromium, webkit, devices } from 'playwright';
import { writeFileSync } from 'fs';
const out = '/private/tmp/claude-501/-Users-raoulito-digital-movement-uk/8d1061b3-a933-435a-b5b7-25ea217c1592/scratchpad/neo-qa-main/qa/buttons-videos-2026-11-26/';
const tag = process.argv[2] || 'check';
const res = {};
for (const [name, mk] of [['1440', async () => (await chromium.launch({ channel: 'chrome' })).newContext({ viewport: { width: 1440, height: 900 } })],
                          ['375', async () => (await webkit.launch()).newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } })]]) {
  const ctx = await mk(); const page = await ctx.newPage();
  await page.goto('https://www.neotheagency.de/?v=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 600) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(250); }
  const n = await page.evaluate(() => document.querySelectorAll('video').length);
  const rows = [];
  for (let i = 0; i < n; i++) {
    await page.evaluate(i => { const v = document.querySelectorAll('video')[i]; v.scrollIntoView({ block: 'center' }); }, i);
    let r;
    for (let t = 0; t < 30; t++) {
      await page.waitForTimeout(500);
      r = await page.evaluate(i => { const v = document.querySelectorAll('video')[i]; const b = v.getBoundingClientRect();
        const sec = v.closest('section'); return { i, section: sec ? (sec.id || sec.className.slice(0, 40)) : '', src: (v.currentSrc || v.getAttribute('src') || '').split('/').pop(),
          visible: b.width > 0 && b.height > 0 && b.bottom > 0 && b.top < innerHeight && getComputedStyle(v).visibility !== 'hidden' && +getComputedStyle(v).opacity > 0.05,
          w: Math.round(b.width), paused: v.paused, readyState: v.readyState, t: +v.currentTime.toFixed(2) }; }, i);
      if (!r.paused && r.t > 0.2) break;
    }
    rows.push(r);
  }
  res[name] = { total: n, rows, scrollHeight: H };
  await ctx.browser().close();
}
writeFileSync(out + `videos-${tag}.json`, JSON.stringify(res, null, 1));
for (const k in res) { console.log(`== ${k}: ${res[k].total} videos`); for (const r of res[k].rows) console.log(`${r.i} ${r.section} ${r.src} vis=${r.visible} w=${r.w} paused=${r.paused} rs=${r.readyState} t=${r.t}`); }

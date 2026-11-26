import { chromium, webkit, devices } from 'playwright';
const base = process.argv[2]; const paths = ['/', '/seo-agentur/', '/leistungen/webdesign/', '/leistungen/google-ads/'];
const out = {};
for (const w of [375, 1440]) {
  const b = w === 1440 ? await chromium.launch({ channel: 'chrome' }) : await webkit.launch();
  const ctx = w === 1440 ? await b.newContext({ viewport: { width: 1440, height: 900 } }) : await b.newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } });
  const p = await ctx.newPage();
  for (const path of paths) {
    const r = await p.goto(base + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
    out[`${path}@${w}`] = await p.evaluate(() => { const g = document.querySelector('.neo-marquee-group'); const h = document.querySelector('h1'); const r = e => e ? Math.round(e.getBoundingClientRect().right) : null; return { group: r(g), h1Right: r(h), wide: [...document.querySelectorAll('h1,h1 ~ p,main p')].filter(e => e.getBoundingClientRect().right > innerWidth + 2 && !e.closest('.neo-marquee')).length }; });
    out[`${path}@${w}`].status = r.status();
  }
  await b.close();
}
console.log(JSON.stringify(out));

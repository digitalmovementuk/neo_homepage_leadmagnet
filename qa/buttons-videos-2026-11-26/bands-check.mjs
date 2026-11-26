import { chromium, webkit, devices } from 'playwright';
import fs from 'fs';
const OUT = process.argv[2]; const res = {};
const pages = [['home','https://www.neotheagency.de/'],['seo','https://www.neotheagency.de/seo-agentur/']];
for (const w of [1440, 375]) {
  const b = w === 1440 ? await chromium.launch({ channel: 'chrome' }) : await webkit.launch();
  const ctx = w === 1440 ? await b.newContext({ viewport: { width: 1440, height: 900 } }) : await b.newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } });
  const p = await ctx.newPage();
  for (const [name, url] of pages) {
    await p.goto(url + '?v=' + Date.now(), { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
    const snap = () => p.evaluate(() => [...document.querySelectorAll('.neo-marquee-group')].slice(0,1).flatMap(g => [...g.querySelectorAll('.neo-marquee-track')].map(t => new DOMMatrix(getComputedStyle(t).transform).m41)));
    const a = await snap(); await p.waitForTimeout(1500); const c = await snap();
    const geo = await p.evaluate(() => {
      const r = el => { const x = el.getBoundingClientRect(); return [Math.round(x.left), Math.round(x.top), Math.round(x.right), Math.round(x.bottom)]; };
      const g = document.querySelector('.neo-marquee-group'); if (!g) return null;
      const nav = g.closest('nav');
      const vis = el => { const x = el.getBoundingClientRect(); return x.width > 0 && x.height > 0 && x.right > 0 && x.left < innerWidth && x.bottom > 0 && x.top < innerHeight; };
      const ctas = [...document.querySelectorAll('a,button')].filter(e => /Potenzialanalyse|Erstgespräch/.test(e.textContent) && vis(e) && !e.closest('header')).map(r);
      const av = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && /CO-FOUNDERS|Co-Founders/i.test(e.textContent) && vis(e)).map(e => r(e.parentElement.parentElement));
      const rows = [...g.querySelectorAll('.neo-marquee')].map(r);
      const band = r(nav);
      const hit = x => !(x[2] <= band[0] || x[0] >= band[2] || x[3] <= band[1] || x[1] >= band[3]);
      return { band, rows, ctas, avatars: av, overlapCTA: ctas.some(hit), overlapAvatars: av.some(hit), hscroll: document.documentElement.scrollWidth > innerWidth, logos: g.querySelectorAll('img').length };
    });
    res[`${name}-${w}`] = { row1: [a[0], c[0]], row2: [a[1], c[1]], row1Dir: c[0] < a[0] ? 'left' : c[0] > a[0] ? 'right' : 'still', row2Dir: c[1] < a[1] ? 'left' : c[1] > a[1] ? 'right' : 'still', ...geo };
    if (name === 'home') await p.screenshot({ path: `${OUT}/bands-live-${w}-hero.png` });
    else { const n = await p.$('.neo-marquee-group'); if (n) { await n.scrollIntoViewIfNeeded(); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/bands-live-${w}-seo.png` }); } }
  }
  await b.close();
}
fs.writeFileSync(`${OUT}/bands-live-check.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));

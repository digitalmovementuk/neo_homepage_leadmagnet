import { chromium, webkit, devices } from 'playwright';
import fs from 'fs';
const OUT = process.argv[2]; const res = {};
for (const [name, mk] of [['1440', async () => (await chromium.launch({ channel: 'chrome' })).newContext({ viewport: { width: 1440, height: 900 } })],
                          ['375', async () => (await webkit.launch()).newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } })]]) {
  const ctx = await mk(); const page = await ctx.newPage();
  await page.goto('https://www.neotheagency.de/?v=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  res[name] = await page.evaluate(() => {
    const bg = [...document.querySelectorAll('a,button')].map(e => getComputedStyle(e).backgroundImage).filter(b => b.includes('gradient'));
    const hero = [...document.querySelectorAll('a[href*="goodfirms.co/company/neo-the-agency"]')].map(a => { const i = a.querySelector('img'); return { img: i && i.currentSrc.split('/').pop(), loaded: i && i.complete && i.naturalWidth > 0, h: i && Math.round(i.getBoundingClientRect().height) }; });
    const foot = [...document.querySelectorAll('a[href*="myaccount.goodfirms.co/review/company/add/241949"]')].map(a => { const i = a.querySelector('img'); return { img: i && i.currentSrc.split('/').pop(), loaded: i && i.complete && i.naturalWidth > 0, label: a.getAttribute('aria-label') }; });
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent).join('');
    const cards = [...document.querySelectorAll('a[aria-label*="bewerten"], a[aria-label*="Write a review"]')].map(a => { const r = a.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width)]; });
    return { pinkButtons: bg.filter(b => b.includes('rgb(217, 18, 127)')).length, orangeButtons: bg.filter(b => b.includes('rgb(240, 95, 34)')).length, hero, foot, sameAs: ld.includes('goodfirms.co/company/neo-the-agency'), cards, hscroll: document.documentElement.scrollWidth > innerWidth };
  });
  // scroll whole page so lazy parts render, then shoot
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/live-${name}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}/live-${name}-hero.png` });
  const foot = page.locator('a[href*="myaccount.goodfirms.co"]').first();
  await foot.scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.locator('ul:has(a[href*="myaccount.goodfirms.co"])').screenshot({ path: `${OUT}/live-${name}-footer-cards.png` });
  await ctx.browser().close();
}
fs.writeFileSync(`${OUT}/live-check-goodfirms.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));

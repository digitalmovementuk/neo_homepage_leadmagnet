import { chromium, webkit, devices } from 'playwright';
const out = new URL('./', import.meta.url).pathname;
const res = {};
for (const [name, mk] of [['1440', async () => (await chromium.launch()).newContext({ viewport: { width: 1440, height: 900 } })],
                          ['375', async () => (await webkit.launch()).newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } })]]) {
  const ctx = await mk(); const page = await ctx.newPage();
  await page.goto('https://www.neotheagency.de/?v18=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const vh = innerHeight;
    const imgs = [...document.querySelectorAll('img')].filter(i => /logos\/platforms\//.test(i.src));
    const pick = k => imgs.filter(i => i.src.includes('/' + k)).map(i => { const b = i.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height), w: Math.round(b.width), loaded: i.complete && i.naturalWidth > 0 }; });
    const label = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /Gesehen auf/i.test(e.textContent));
    const lb = label ? label.getBoundingClientRect() : null;
    const footerDR = [...document.querySelectorAll('a')].filter(a => a.href.includes('designrush.com/agency/profile/neo-the-agency')).map(a => a.getAttribute('aria-label'));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent).join('');
    return { vh, labelTop: lb && Math.round(lb.top), labelBottom: lb && Math.round(lb.bottom), designrush: pick('designrush'), clutch: pick('clutch'), footerDR, sameAsDR: ld.includes('designrush.com/agency/profile/neo-the-agency'), hscroll: document.documentElement.scrollWidth > innerWidth };
  });
  res[name] = r;
  await page.screenshot({ path: out + `v18-live-home-${name}-first.png` });
  // footer
  const card = page.locator('a[href*="designrush.com/agency/profile/neo-the-agency"]').last();
  await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
  await page.screenshot({ path: out + `v18-live-home-${name}-footer.png` });
  // link works
  const [pop] = await Promise.all([page.waitForEvent('popup', { timeout: 15000 }).catch(() => null), card.click()]);
  if (pop) { await pop.waitForLoadState('domcontentloaded').catch(() => {}); res[name].footerOpens = { url: pop.url(), title: await pop.title() }; }
  await ctx.browser().close();
}
console.log(JSON.stringify(res, null, 1));

import { chromium, webkit, devices } from 'playwright';
const out = new URL('./', import.meta.url).pathname;
const res = {};
const PROF = 'clutch.co/profile/neo-agency-0', FORM = 'review.clutch.co/review?provider_id=2778599';
for (const [name, mk] of [['1440', async () => (await chromium.launch({ channel: 'chrome' })).newContext({ viewport: { width: 1440, height: 900 } })],
                          ['375', async () => (await webkit.launch()).newContext({ ...devices['iPhone 13'], viewport: { width: 375, height: 812 } })]]) {
  const ctx = await mk(); await ctx.route(/\.mp4(\?|$)/, r => r.abort()); const page = await ctx.newPage(); // slow local line (~1.4 Mbit/s): videos off so logos can load
  await page.goto('https://www.neotheagency.de/?v19=' + Date.now(), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3500);
  res[name] = await page.evaluate(([PROF, FORM]) => {
    const imgs = [...document.querySelectorAll('img')].filter(i => /logos\/platforms\/clutch/.test(i.src));
    const clutchImgs = imgs.map(i => { const b = i.getBoundingClientRect(); const a = i.closest('a'); return { top: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), loaded: i.complete && i.naturalWidth > 0, href: a && a.href }; });
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent).join('');
    return { clutchImgs, profileLinks: [...document.querySelectorAll('a')].filter(a => a.href.includes(PROF)).length,
      formLinks: [...document.querySelectorAll('a')].filter(a => a.href.includes(FORM)).length,
      sameAs: ld.includes(PROF), hscroll: document.documentElement.scrollWidth > innerWidth };
  }, [PROF, FORM]);
  await page.screenshot({ path: out + `v19-live-home-${name}-first.png` });
  const band = page.locator(`a[href*="${PROF}"]`).first();
  const [p1] = await Promise.all([page.waitForEvent('popup', { timeout: 15000 }).catch(() => null), band.click({ force: true })]);
  if (p1) { await p1.waitForLoadState('domcontentloaded').catch(() => {}); res[name].bandOpens = { url: p1.url(), title: await p1.title() }; await p1.close(); }
  const card = page.locator(`a[href*="${FORM}"]`).last();
  await card.scrollIntoViewIfNeeded(); await page.waitForFunction(() => [...document.querySelectorAll('a[href*="review.clutch.co"] img')].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(800);
  res[name].footerLogosLoaded = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i => /logos\/platforms\/[a-z0-9]+\.svg/.test(i.src)).map(i => i.naturalWidth > 0 ? 1 : 0).join(''));
  await page.screenshot({ path: out + `v19-live-home-${name}-footer.png` });
  const [p2] = await Promise.all([page.waitForEvent('popup', { timeout: 15000 }).catch(() => null), card.click({ force: true })]);
  if (p2) { await p2.waitForLoadState('domcontentloaded').catch(() => {}); res[name].footerOpens = { url: p2.url(), title: await p2.title() }; }
  await ctx.browser().close();
}
console.log(JSON.stringify(res, null, 1));

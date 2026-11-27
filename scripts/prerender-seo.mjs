/**
 * Prerender aller Seiten zu statischem HTML · v1.8 (27.11.2026)
 *
 * Läuft NACH `vite build`. Leichtester Weg ohne neues Paket:
 *   1. Vite baut src/entry-prerender.tsx einmal für Node (SSR) in einen
 *      Zwischenordner.
 *   2. React rendert die Seite fertig (react-dom/static, wartet auf lazy).
 *   3. dist/index.html dient als Hülle: Kopfbereich wird auf die SEO-Seite
 *      umgestellt, das HTML kommt in #root, Ergebnis nach
 *      dist/seo-agentur/index.html.
 *   4. Weiterleitungsseiten für die alten Adressen /leistungen/seo/ und
 *      /services/seo/ (meta refresh + canonical + noindex), falls der Server
 *      keine echte 301 setzt.
 *   5. Ab v1.5: Startseite, Leistungsseiten, Über-uns-Seite (ab v1.6 /neo-the-agency/), Rechtsseiten und
 *      404 kommen fertig gerendert (Inhalt in #root, eigenes JSON-LD).
 *
 * Changelog
 *   v1.8 (27.11.2026) Deutsch = Standard, Englisch unter /en/ (Startseite, drei Leistungen, Über uns) mit lang="en",
 *        og:locale en_GB und eigenem JSON-LD. hreflang de/en/x-default (x-default = Deutsch) auf allen Seitenpaaren,
 *        de/x-default auf den rein deutschen Seiten.
 *   v1.7 (26.11.2026) Startseiten-WebPage (data-home-only) wird auf allen anderen Seiten entfernt.
 *   v1.6 (26.11.2026) Flache Adressen je Fokus-Suchbegriff: /google-ads-agentur/, /social-media-agentur/,
 *        /webdesign-agentur/, /neo-the-agency/ (alte Adressen leiten per 301 weiter, vercel.json);
 *        keine /about-Kopie mehr.
 *   v1.5 (26.11.2026) QA-Gate: alle Seiten vorgerendert (Inhalt ohne JavaScript lesbar), eigenes JSON-LD je Seite
 *        (Service/AboutPage/WebPage + Breadcrumb), Beschreibung für die Rechtsseiten, /about als Kopie von /uber-uns,
 *        echte 404-Seite (dist/404.html, noindex). Titel der Rechtsseiten unverändert.
 *   v1.4 (26.11.2026) /datenschutz: Titel „Datenschutzerklärung · NEO THE AGENCY" (passt zur Überschrift; vorher „Datenschutz · NEO THE AGENCY").
 *   v1.3 (24.11.2026) /services/google-ads, /services/social-media, /services/websites und /uber-uns bekommen
 *        eigenes statisches HTML mit eigener Canonical, og:url, Titel, Beschreibung, og:/twitter:-Titel und -Beschreibung
 *        (Werte aus translations.de über routeHeads). Sichtbar unverändert.
 *   v1.2 (24.11.2026) /impressum und /datenschutz bekommen eigenes statisches HTML mit eigener
 *        Canonical, og:url und Titel (Hülle = Startseite, Inhalt bleibt die App). Sichtbar unverändert.
 *   v1.1 (19.11.2026) Adresse /seo-agentur/; Weiterleitungsseiten für alte Adressen.
 *   v1.0 (19.11.2026) Erste Fassung.
 */
import { build } from "vite";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "node_modules", ".prerender-seo");

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function must(html, re, label) {
  if (!re.test(html)) throw new Error(`prerender-seo: Stelle nicht gefunden: ${label}`);
}

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-prerender.tsx", outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
});

try {
  const entryFile = (await readdir(ssrOut)).find((f) => /^entry-prerender\.(m?js)$/.test(f));
  if (!entryFile) throw new Error("prerender-seo: SSR-Ausgabe fehlt");
  const mod = await import(pathToFileURL(path.join(ssrOut, entryFile)).href);
  const { renderSeoPage, renderPage, seoHead, buildSeoJsonLd, SEO_PATH, routeHeads, enRouteHeads, enHomeHead, legalHeads } = mod;
  if (!Array.isArray(legalHeads) || legalHeads.length !== 2) throw new Error("prerender-seo: legalHeads fehlt");
  if (!Array.isArray(routeHeads) || routeHeads.length !== 4) throw new Error("prerender-seo: routeHeads fehlt");
  if (!Array.isArray(enRouteHeads) || enRouteHeads.length !== 4) throw new Error("prerender-seo: enRouteHeads fehlt");
  if (!enHomeHead?.title) throw new Error("prerender-seo: enHomeHead fehlt");

  const appHtml = await renderSeoPage();
  if (!appHtml.includes('id="top-titel"')) throw new Error("prerender-seo: H1 fehlt im gerenderten HTML");

  const homeShell = await readFile(path.join(dist, "index.html"), "utf8");
  let html = homeShell;
  const assets = await readdir(path.join(dist, "assets"));

  const rootRe = /<div id="root"([^>]*)><\/div>/;
  const inject = (src, body, label) => {
    must(src, rootRe, `#root (${label})`);
    return src.replace(rootRe, (_m, attrs) => `<div id="root"${attrs}>${body}</div>`);
  };
  const shellRe = /\s*<!-- LCP shell[\s\S]*?-->\s*<img\s+id="lcp-shell"[\s\S]*?\/>/;
  const homePreloadRe = /\s*<!-- LCP: preload[\s\S]*?-->\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/;
  const homeOnlyLdRe = /\s*<!-- Startseite: WebPage[\s\S]*?-->\s*<script type="application\/ld\+json" data-home-only="true">[\s\S]*?<\/script>/;
  // Startseiten-Platzhalterbild und -Preload gehören nur auf die Startseite.
  const stripHomeOnly = (src, label) => {
    must(src, shellRe, `LCP-Hülle (${label})`);
    must(src, homePreloadRe, `Startseiten-Preload (${label})`);
    must(src, homeOnlyLdRe, `Startseiten-WebPage (${label})`);
    return src.replace(shellRe, "").replace(homePreloadRe, "").replace(homeOnlyLdRe, "");
  };
  const addChunk = (src, re) => {
    const f = assets.find((a) => re.test(a));
    if (!f) throw new Error(`prerender-seo: Seitenmodul fehlt (${re})`);
    return src.replace("</head>", `    <link rel="modulepreload" crossorigin href="/assets/${f}" />\n  </head>`);
  };
  const addLd = (src, data) =>
    src.replace("</head>", `    <script type="application/ld+json" data-route-jsonld="true">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n  </head>`);
  // hreflang: Deutsch ist Standard (x-default). enPath = null für rein deutsche Seiten.
  const ORIGIN = "https://www.neotheagency.de";
  const addHreflang = (src, dePath, enPath) => {
    const tags = [`<link rel="alternate" hreflang="de" href="${esc(ORIGIN + dePath)}" />`];
    if (enPath) tags.push(`<link rel="alternate" hreflang="en" href="${esc(ORIGIN + enPath)}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(ORIGIN + dePath)}" />`);
    if (enPath) tags.push('<meta property="og:locale:alternate" content="en_GB" />');
    return src.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
  };
  const writePage = async (route, content, note) => {
    const dir = path.join(dist, ...route.split("/").filter(Boolean));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), content);
    console.log(`prerender-seo: ${route} ${note} (${(Buffer.byteLength(content) / 1024).toFixed(1)} kB)`);
  };
  const h = seoHead;

  const setMeta = (attr, key, value) => {
    const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
    const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
    if (re.test(html)) html = html.replace(re, tag);
    else html = html.replace("</head>", `    ${tag}\n  </head>`);
  };

  must(html, /<title>[\s\S]*?<\/title>/, "title");
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(h.title)}</title>`);
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${h.lang}">`);
  must(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, "canonical");
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(h.canonical)}" />`);

  setMeta("name", "description", h.description);
  setMeta("name", "robots", h.robots);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:url", h.canonical);
  setMeta("property", "og:site_name", "NEO the Agency");
  setMeta("property", "og:title", h.title);
  setMeta("property", "og:description", h.description);
  setMeta("property", "og:locale", "de_DE");
  setMeta("property", "og:image", h.ogImage);
  setMeta("property", "og:image:secure_url", h.ogImage);
  setMeta("property", "og:image:type", "image/jpeg");
  setMeta("property", "og:image:width", String(h.ogImageWidth));
  setMeta("property", "og:image:height", String(h.ogImageHeight));
  setMeta("property", "og:image:alt", h.ogImageAlt);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", h.title);
  setMeta("name", "twitter:description", h.description);
  setMeta("name", "twitter:image", h.ogImage);
  setMeta("name", "twitter:image:alt", h.ogImageAlt);

  // Startseiten-JSON-LD raus, SEO-Graph rein. Das Attribut
  // data-route-jsonld lässt useDocumentHead denselben Block weiterverwenden.
  const homeLd = /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  must(html, homeLd, "Startseiten-JSON-LD");
  html = html.replace(homeLd, "");
  must(html, homeOnlyLdRe, "Startseiten-WebPage");
  html = html.replace(homeOnlyLdRe, "");
  const ld = JSON.stringify(buildSeoJsonLd()).replace(/</g, "\\u003c");
  html = html.replace("</head>", `    <script type="application/ld+json" data-route-jsonld="true">${ld}</script>\n  </head>`);

  // Hero-Bild vorladen, genau wie <picture> in SectionsA (Handy bis 640 px).
  const homePreload = /<!-- LCP: preload[\s\S]*?-->\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/;
  must(html, homePreload, "Startseiten-Preload");
  const bp = h.heroPreload.breakpoint;
  html = html.replace(
    homePreload,
    `<link rel="preload" as="image" href="${h.heroPreload.mobile}" type="image/webp" media="(max-width: ${bp}px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="${h.heroPreload.desktop}" type="image/webp" media="(min-width: ${bp + 1}px)" fetchpriority="high" />`,
  );

  // Lazy geladenes Seitenmodul früh anfordern, damit die Hydrierung nicht wartet.
  const seoChunk = (await readdir(path.join(dist, "assets"))).find((f) => /^SeoPage-.*\.js$/.test(f));
  if (seoChunk) html = html.replace("</head>", `    <link rel="modulepreload" crossorigin href="/assets/${seoChunk}" />\n  </head>`);

  // Platzhalterbild der Startseite (LCP-Hülle) gehört nicht auf diese Seite.
  must(html, shellRe, "LCP-Hülle");
  html = html.replace(shellRe, "");
  html = addHreflang(inject(html, appHtml, SEO_PATH), SEO_PATH, null);

  const outDir = path.join(dist, ...SEO_PATH.split("/").filter(Boolean));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`prerender-seo: ${path.relative(root, path.join(outDir, "index.html"))} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);

  const swapMeta = (src, attr, key, value, label) => {
    const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
    must(src, re, `${key} (${label})`);
    return src.replace(re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
  };

  // Rechtsseiten: gleiche Hülle wie die Startseite, aber eigene Canonical, og:url und Titel im Roh-HTML.
  const origin = new URL(h.canonical).origin;
  for (const page of [
    { path: "/impressum", title: "Impressum · NEO THE AGENCY" },
    { path: "/datenschutz", title: "Datenschutzerklärung · NEO THE AGENCY" },
  ]) {
    let legal = homeShell;
    const url = origin + page.path;
    must(legal, /<link rel="canonical" href="[^"]*"\s*\/?>/, "canonical (Rechtsseite)");
    legal = legal.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" />`);
    must(legal, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, "og:url (Rechtsseite)");
    legal = legal.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(url)}" />`);
    legal = legal.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
    const lh = legalHeads.find((l) => l.path === page.path);
    if (!lh) throw new Error(`prerender-seo: legalHeads ohne ${page.path}`);
    legal = swapMeta(legal, "name", "description", lh.description, page.path);
    legal = swapMeta(legal, "property", "og:title", page.title, page.path);
    legal = swapMeta(legal, "property", "og:description", lh.description, page.path);
    legal = swapMeta(legal, "name", "twitter:title", page.title, page.path);
    legal = swapMeta(legal, "name", "twitter:description", lh.description, page.path);
    legal = addLd(stripHomeOnly(legal, page.path), lh.jsonLd);
    legal = addChunk(legal, page.path === "/impressum" ? /^Impressum-.*\.js$/ : /^Datenschutz-.*\.js$/);
    legal = addHreflang(inject(legal, await renderPage(page.path), page.path), page.path, null);
    await writePage(page.path, legal, "(eigene Canonical, vorgerendert)");
  }

  // Leistungsseiten und /neo-the-agency/: Hülle der Startseite, aber eigene Canonical, og:url, Titel und
  // Beschreibung (auch für og/twitter) schon im Roh-HTML. Die App setzt zur Laufzeit dieselben Werte.
  for (const page of routeHeads) {
    let pageHtml = homeShell;
    const url = origin + page.path;
    must(pageHtml, /<link rel="canonical" href="[^"]*"\s*\/?>/, `canonical (${page.path})`);
    pageHtml = pageHtml.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" />`);
    must(pageHtml, /<title>[\s\S]*?<\/title>/, `title (${page.path})`);
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
    pageHtml = swapMeta(pageHtml, "property", "og:url", url, page.path);
    pageHtml = swapMeta(pageHtml, "name", "description", page.description, page.path);
    pageHtml = swapMeta(pageHtml, "property", "og:title", page.title, page.path);
    pageHtml = swapMeta(pageHtml, "property", "og:description", page.description, page.path);
    pageHtml = swapMeta(pageHtml, "name", "twitter:title", page.title, page.path);
    pageHtml = swapMeta(pageHtml, "name", "twitter:description", page.description, page.path);
    pageHtml = addChunk(addLd(stripHomeOnly(pageHtml, page.path), page.jsonLd), page.chunk);
    pageHtml = inject(pageHtml, await renderPage(page.path), page.path);
    pageHtml = addHreflang(pageHtml, page.path, `/en${page.path}`);
    await writePage(page.path, pageHtml, "(eigener Kopfbereich, vorgerendert)");
  }

  // Englische Fassung unter /en/: gleiche Hülle, aber lang="en", og:locale en_GB, eigener Kopfbereich und JSON-LD.
  const toEnglish = (src, page, label) => {
    let out = src.replace(/<html lang="[^"]*">/, '<html lang="en">');
    const url = origin + page.path;
    must(out, /<link rel="canonical" href="[^"]*"\s*\/?>/, `canonical (${label})`);
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" />`);
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
    out = swapMeta(out, "property", "og:url", url, label);
    out = swapMeta(out, "property", "og:locale", "en_GB", label);
    out = swapMeta(out, "name", "description", page.description, label);
    out = swapMeta(out, "property", "og:title", page.title, label);
    out = swapMeta(out, "property", "og:description", page.description, label);
    out = swapMeta(out, "name", "twitter:title", page.title, label);
    out = swapMeta(out, "name", "twitter:description", page.description, label);
    return out;
  };
  const enHreflang = (src, enPath, dePath) => {
    const tags = [
      `<link rel="alternate" hreflang="de" href="${esc(ORIGIN + dePath)}" />`,
      `<link rel="alternate" hreflang="en" href="${esc(ORIGIN + enPath)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${esc(ORIGIN + dePath)}" />`,
      '<meta property="og:locale:alternate" content="de_DE" />',
    ];
    return src.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
  };
  for (const [i, page] of enRouteHeads.entries()) {
    const dePath = routeHeads[i].path;
    let enHtml = toEnglish(homeShell, page, page.path);
    enHtml = addChunk(addLd(stripHomeOnly(enHtml, page.path), page.jsonLd), page.chunk);
    enHtml = inject(enHtml, await renderPage(page.path, "en"), page.path);
    if (!/<h1[\s>]/.test(enHtml)) throw new Error(`prerender-seo: H1 fehlt (${page.path})`);
    await writePage(page.path, enHreflang(enHtml, page.path, dePath), "(Englisch, vorgerendert)");
  }
  {
    // Englische Startseite: LCP-Hülle bleibt, deutsche WebPage raus, englische rein.
    let enHome = toEnglish(homeShell, enHomeHead, "/en/");
    must(enHome, homeOnlyLdRe, "Startseiten-WebPage (/en/)");
    enHome = addLd(enHome.replace(homeOnlyLdRe, ""), enHomeHead.jsonLd);
    const body = await renderPage("/en/", "en");
    if (!/<h1[\s>]/.test(body)) throw new Error("prerender-seo: H1 fehlt auf /en/");
    await writePage("/en/", enHreflang(inject(enHome, body, "/en/"), "/en/", "/"), "(Englisch, vorgerendert)");
  }

  // 404: echte Fehlerseite mit Navigation, noindex, ohne Canonical. Vercel liefert sie mit Status 404.
  let notFound = stripHomeOnly(homeShell, "404");
  notFound = notFound.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, "");
  notFound = notFound.replace(/\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, "");
  notFound = notFound.replace(/<title>[\s\S]*?<\/title>/, "<title>Seite nicht gefunden · NEO THE AGENCY</title>");
  notFound = notFound.replace("</head>", '    <meta name="robots" content="noindex, follow" />\n  </head>');
  notFound = addChunk(notFound, /^NotFound-.*\.js$/);
  notFound = inject(notFound, await renderPage("/404-seite-nicht-gefunden"), "404");
  await writeFile(path.join(dist, "404.html"), notFound);
  console.log("prerender-seo: 404.html (noindex)");

  // Startseite zuletzt: erst jetzt dist/index.html überschreiben, alle anderen Seiten nutzen die leere Hülle.
  const homeBody = await renderPage("/");
  if (!/<h1[\s>]/.test(homeBody)) throw new Error("prerender-seo: H1 fehlt auf der Startseite");
  await writeFile(path.join(dist, "index.html"), addHreflang(inject(homeShell, homeBody, "/"), "/", "/en/"));
  console.log(`prerender-seo: / (vorgerendert, ${(Buffer.byteLength(homeBody) / 1024).toFixed(1)} kB Inhalt)`);

  // Alte Adressen: kleine Weiterleitungsseite, falls der Server keine 301 sendet.
  const target = h.canonical;
  const redirectHtml = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${esc(target)}" />
    <meta http-equiv="refresh" content="0; url=${esc(SEO_PATH)}" />
    <title>Weiterleitung</title>
    <script>location.replace(${JSON.stringify(SEO_PATH)} + location.search + location.hash);</script>
  </head>
  <body><p>Diese Seite ist umgezogen: <a href="${esc(SEO_PATH)}">${esc(target)}</a></p></body>
</html>
`;
  for (const old of ["/leistungen/seo/", "/services/seo/"]) {
    const dir = path.join(dist, ...old.split("/").filter(Boolean));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), redirectHtml);
    console.log(`prerender-seo: Weiterleitung ${old} -> ${SEO_PATH}`);
  }
} finally {
  await rm(ssrOut, { recursive: true, force: true });
}

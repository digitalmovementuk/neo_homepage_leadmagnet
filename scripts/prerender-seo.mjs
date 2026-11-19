/**
 * Prerender /seo-agentur/ zu statischem HTML · v1.1 (19.11.2026)
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
 * dist/index.html (Startseite) wird nur gelesen, nie verändert.
 *
 * Changelog
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
  const { renderSeoPage, seoHead, buildSeoJsonLd, SEO_PATH } = mod;

  const appHtml = await renderSeoPage();
  if (!appHtml.includes('id="top-titel"')) throw new Error("prerender-seo: H1 fehlt im gerenderten HTML");

  let html = await readFile(path.join(dist, "index.html"), "utf8");
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
  setMeta("property", "og:image:alt", h.ogImageAlt);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", h.title);
  setMeta("name", "twitter:description", h.description);
  setMeta("name", "twitter:image", h.ogImage);
  setMeta("name", "twitter:image:alt", h.ogImageAlt);

  // Startseiten-JSON-LD (Digital Movement) raus, SEO-Graph rein. Das Attribut
  // data-route-jsonld lässt useDocumentHead denselben Block weiterverwenden.
  const homeLd = /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  must(html, homeLd, "Startseiten-JSON-LD");
  html = html.replace(homeLd, "");
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
  const shell = /\s*<!-- LCP shell[\s\S]*?-->\s*<img\s+id="lcp-shell"[\s\S]*?\/>/;
  must(html, shell, "LCP-Hülle");
  html = html.replace(shell, "");

  const rootRe = /<div id="root"([^>]*)><\/div>/;
  must(html, rootRe, "#root");
  html = html.replace(rootRe, (_m, attrs) => `<div id="root"${attrs}>${appHtml}</div>`);

  const outDir = path.join(dist, ...SEO_PATH.split("/").filter(Boolean));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`prerender-seo: ${path.relative(root, path.join(outDir, "index.html"))} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);

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

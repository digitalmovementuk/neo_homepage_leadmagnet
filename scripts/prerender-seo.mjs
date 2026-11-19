/**
 * Prerender aller Seiten zu statischem HTML · v2.0 (19.11.2026)
 *
 * Läuft NACH `vite build`. Leichtester Weg ohne neues Paket:
 *   1. Vite baut src/entry-prerender.tsx einmal für Node (SSR) in einen
 *      Zwischenordner.
 *   2. React rendert jede Route fertig (react-dom/static, wartet auf lazy).
 *   3. dist/index.html (unveränderte Hülle) bekommt je Route eigenen Titel,
 *      Beschreibung, Canonical, Open Graph / Twitter, Robots und JSON-LD aus
 *      src/content/route-meta.ts; das HTML kommt in #root.
 *      Ausgabe: dist/index.html (Startseite), dist/<route>/index.html,
 *      dist/404.html (noindex, kein Canonical).
 *   4. Prüfungen: genau ein <h1> je Seite, eigener Titel und Canonical je Seite.
 *   5. Weiterleitungsseiten für alte Adressen (meta refresh + canonical +
 *      noindex), falls der Server keine echte 308 setzt (vercel.json tut es).
 *
 * Changelog
 *   v2.0 (19.11.2026) Alle 8 Routen + 404 statt nur /seo-agentur/; Kopfdaten
 *        zentral aus route-meta; /about/ als weitere alte Adresse.
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

function must(html, re, label, where) {
  if (!re.test(html)) throw new Error(`prerender: Stelle nicht gefunden: ${label} (${where})`);
}

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-prerender.tsx", outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
});

try {
  const entryFile = (await readdir(ssrOut)).find((f) => /^entry-prerender\.(m?js)$/.test(f));
  if (!entryFile) throw new Error("prerender: SSR-Ausgabe fehlt");
  const mod = await import(pathToFileURL(path.join(ssrOut, entryFile)).href);
  const { renderRoute, routeHead, buildSeoJsonLd, seoHead, ROUTE_META, ROUTE_PATHS, NOT_FOUND_META, NOT_FOUND_PROBE, SITE_ORIGIN } = mod;

  const shell = await readFile(path.join(dist, "index.html"), "utf8");
  const assets = await readdir(path.join(dist, "assets"));
  const seenTitles = new Map();

  /** Baut die fertige HTML-Datei für eine Route. */
  async function page(routePath, meta, renderAt) {
    const where = routePath;
    const head = routePath === "/404" ? routeHead("/404") : routeHead(routePath);
    const jsonLd = routePath === "/seo-agentur/" ? buildSeoJsonLd() : head.jsonLd;
    const appHtml = await renderAt;

    const h1s = (appHtml.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) throw new Error(`prerender: ${where} hat ${h1s} <h1> (erwartet genau 1)`);

    let html = shell;
    const setMeta = (attr, key, value) => {
      const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
      const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
      if (re.test(html)) html = html.replace(re, tag);
      else html = html.replace("</head>", `    ${tag}\n  </head>`);
    };
    // Mehrzeilige Meta-Tags der Hülle (description, og:description, twitter:description) vorher entfernen.
    for (const [attr, key] of [["name", "description"], ["property", "og:description"], ["name", "twitter:description"]]) {
      html = html.replace(new RegExp(`\\s*<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`), "");
    }

    must(html, /<title>[\s\S]*?<\/title>/, "title", where);
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`);
    must(html, /<html lang="de">/, "html lang", where);

    const canonRe = /\s*<link rel="canonical" href="[^"]*"\s*\/?>/;
    must(html, canonRe, "canonical", where);
    html = head.canonical
      ? html.replace(canonRe, `\n    <link rel="canonical" href="${esc(head.canonical)}" />`)
      : html.replace(canonRe, "");

    setMeta("name", "description", head.description);
    setMeta("name", "robots", head.robots);
    setMeta("property", "og:type", "website");
    if (head.canonical) setMeta("property", "og:url", head.canonical);
    else html = html.replace(/\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, "");
    setMeta("property", "og:site_name", "NEO THE AGENCY");
    setMeta("property", "og:title", head.title);
    setMeta("property", "og:description", head.description);
    setMeta("property", "og:locale", "de_DE");
    setMeta("property", "og:image", head.ogImage);
    setMeta("property", "og:image:secure_url", head.ogImage);
    setMeta("property", "og:image:type", "image/jpeg");
    setMeta("property", "og:image:width", String(head.ogImageWidth));
    setMeta("property", "og:image:height", String(head.ogImageHeight));
    setMeta("property", "og:image:alt", head.ogImageAlt);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", head.title);
    setMeta("name", "twitter:description", head.description);
    setMeta("name", "twitter:image", head.ogImage);
    setMeta("name", "twitter:image:alt", head.ogImageAlt);

    // JSON-LD je Route. data-route-jsonld lässt useDocumentHead denselben Block weiterverwenden.
    if (/application\/ld\+json/.test(html)) throw new Error(`prerender: Hülle enthält noch festes JSON-LD (${where})`);
    if (jsonLd) {
      const ld = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
      html = html.replace("</head>", `    <script type="application/ld+json" data-route-jsonld="true">${ld}</script>\n  </head>`);
    }

    if (routePath !== "/") {
      // Startseiten-Heldbild (Preload + LCP-Hülle) gehört nur auf die Startseite.
      const homePreload = /\s*<!-- LCP: preload[\s\S]*?-->\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/;
      must(html, homePreload, "Startseiten-Preload", where);
      const lcpShell = /\s*<!-- LCP shell[\s\S]*?-->\s*<img\s+id="lcp-shell"[\s\S]*?\/>/;
      must(html, lcpShell, "LCP-Hülle", where);
      let preload = "";
      if (routePath === "/seo-agentur/") {
        const bp = seoHead.heroPreload.breakpoint;
        preload =
          `\n    <link rel="preload" as="image" href="${seoHead.heroPreload.mobile}" type="image/webp" media="(max-width: ${bp}px)" fetchpriority="high" />` +
          `\n    <link rel="preload" as="image" href="${seoHead.heroPreload.desktop}" type="image/webp" media="(min-width: ${bp + 1}px)" fetchpriority="high" />`;
      }
      html = html.replace(homePreload, preload).replace(lcpShell, "");
    }

    // Lazy geladenes Seitenmodul früh anfordern, damit die Hydrierung nicht wartet.
    if (meta.chunk) {
      const re = new RegExp(`^${meta.chunk}-[\\w-]+\\.js$`);
      const file = assets.find((f) => re.test(f));
      if (!file) throw new Error(`prerender: Seitenmodul ${meta.chunk}-*.js fehlt (${where})`);
      // Auch die direkt eingebundenen Teilmodule (z. B. ServicePageShell, LegalPage), nicht das Hauptbundle.
      const code = await readFile(path.join(dist, "assets", file), "utf8");
      const deps = [...code.matchAll(/(?:from|import)\s*"\.\/([\w-]+\.js)"/g)].map((m) => m[1]).filter((f) => !/^index-/.test(f));
      for (const f of [file, ...new Set(deps)]) {
        html = html.replace("</head>", `    <link rel="modulepreload" crossorigin href="/assets/${f}" />\n  </head>`);
      }
    }

    const rootRe = /<div id="root"([^>]*)><\/div>/;
    must(html, rootRe, "#root", where);
    html = html.replace(rootRe, (_m, attrs) => `<div id="root"${attrs}>${appHtml}</div>`);

    if (seenTitles.has(head.title)) throw new Error(`prerender: Titel doppelt (${where} und ${seenTitles.get(head.title)})`);
    seenTitles.set(head.title, where);
    return html;
  }

  async function write(rel, html) {
    const file = path.join(dist, rel);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`prerender: ${path.relative(root, file)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
  }

  for (const routePath of ROUTE_PATHS) {
    const meta = ROUTE_META[routePath];
    const html = await page(routePath, meta, renderRoute(routePath));
    const rel = routePath === "/" ? "index.html" : path.join(...routePath.split("/").filter(Boolean), "index.html");
    await write(rel, html);
  }
  // Echte 404-Seite (Vercel liefert dist/404.html mit Status 404 aus).
  await write("404.html", await page("/404", NOT_FOUND_META, renderRoute(NOT_FOUND_PROBE)));

  // Alte Adressen: kleine Weiterleitungsseite, falls der Server keine 308 sendet.
  const stub = (to) => `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${esc(SITE_ORIGIN + to)}" />
    <meta http-equiv="refresh" content="0; url=${esc(to)}" />
    <title>Weiterleitung</title>
    <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
  </head>
  <body><p>Diese Seite ist umgezogen: <a href="${esc(to)}">${esc(SITE_ORIGIN + to)}</a></p></body>
</html>
`;
  for (const [old, to] of [["/leistungen/seo/", "/seo-agentur/"], ["/services/seo/", "/seo-agentur/"], ["/about/", "/uber-uns/"]]) {
    await write(path.join(...old.split("/").filter(Boolean), "index.html"), stub(to));
  }
} finally {
  await rm(ssrOut, { recursive: true, force: true });
}

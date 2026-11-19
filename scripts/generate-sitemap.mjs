#!/usr/bin/env node
// generate-sitemap.mjs · v2.0 (19.11.2026)
// Erzeugt public/sitemap.xml für www.neotheagency.de aus src/content/route-meta.ts
// (eine Quelle für alle Adressen). lastmod = Datum der letzten Git-Änderung an den
// Quelldateien der Seite (sources in route-meta), nicht das Build-Datum.
// Changelog:
//   v2.0 (19.11.2026) Adressen aus route-meta (alle mit Schrägstrich am Ende); lastmod aus git.
//   v1.0 (19.11.2026) Erste Fassung, 8 Adressen inkl. /seo-agentur/.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Node >= 22.18 lädt .ts ohne Typen direkt; route-meta.ts hat keine Importe.
const { ROUTE_META, ROUTE_PATHS, SITE_ORIGIN } = await import(
  pathToFileURL(resolve(ROOT, "src/content/route-meta.ts")).href
);

const EXPECTED = 8;
const PRIORITY = { "/": ["1.0", "weekly"], "/seo-agentur/": ["0.9", "weekly"], "/impressum/": ["0.2", "yearly"], "/datenschutz/": ["0.2", "yearly"] };
const today = new Date().toISOString().slice(0, 10);

function lastmod(sources) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...sources], { cwd: ROOT, encoding: "utf8" }).trim();
    return out || today;
  } catch {
    return today; // kein Git verfügbar (z. B. Build ohne Historie)
  }
}

const urls = ROUTE_PATHS.filter((p) => ROUTE_META[p].robots.startsWith("index"));
if (urls.length !== EXPECTED) {
  console.error(`generate-sitemap: erwartet ${EXPECTED} Adressen, gefunden ${urls.length}.`);
  process.exit(1);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((p) => {
    const [priority, changefreq] = PRIORITY[p] ?? (p === "/uber-uns/" ? ["0.5", "monthly"] : ["0.7", "monthly"]);
    return `  <url>
    <loc>${SITE_ORIGIN}${p}</loc>
    <lastmod>${lastmod(ROUTE_META[p].sources)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const out = resolve(ROOT, "public/sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`✓ sitemap.xml mit ${urls.length} Adressen → ${out}`);

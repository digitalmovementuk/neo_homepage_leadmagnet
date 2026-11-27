#!/usr/bin/env node
// generate-sitemap.mjs · v1.3 (27.11.2026)
// Erzeugt public/sitemap.xml für www.neotheagency.de. Jede neue Route muss
// hier eingetragen werden, sonst fehlt sie in der Sitemap.
// Changelog: v1.3 (27.11.2026) HTML-Sitemap /sitemap/ (14 Adressen).
//            v1.2 (27.11.2026) Englische Fassung unter /en/ (5 Adressen); Deutsch bleibt Standard.
//            v1.1 (26.11.2026) Flache Adressen = Fokus-Suchbegriff (/google-ads-agentur/, /social-media-agentur/, /webdesign-agentur/, /neo-the-agency/).
//            v1.0 (19.11.2026) Erste Fassung, 8 Adressen inkl. /seo-agentur/.

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.neotheagency.de";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/seo-agentur/", priority: "0.9", changefreq: "weekly" },
  { path: "/google-ads-agentur/", priority: "0.7", changefreq: "monthly" },
  { path: "/social-media-agentur/", priority: "0.7", changefreq: "monthly" },
  { path: "/webdesign-agentur/", priority: "0.7", changefreq: "monthly" },
  { path: "/neo-the-agency/", priority: "0.5", changefreq: "monthly" },
  { path: "/impressum", priority: "0.2", changefreq: "yearly" },
  { path: "/datenschutz", priority: "0.2", changefreq: "yearly" },
  { path: "/sitemap/", priority: "0.2", changefreq: "monthly" },
  { path: "/en/", priority: "0.6", changefreq: "monthly" },
  { path: "/en/google-ads-agentur/", priority: "0.4", changefreq: "monthly" },
  { path: "/en/social-media-agentur/", priority: "0.4", changefreq: "monthly" },
  { path: "/en/webdesign-agentur/", priority: "0.4", changefreq: "monthly" },
  { path: "/en/neo-the-agency/", priority: "0.3", changefreq: "monthly" },
];
const EXPECTED = 14;

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;

if (ROUTES.length !== EXPECTED) {
  console.error(`generate-sitemap: erwartet ${EXPECTED} Adressen, gefunden ${ROUTES.length}.`);
  process.exit(1);
}
const out = resolve(ROOT, "public/sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`✓ sitemap.xml mit ${ROUTES.length} Adressen → ${out}`);

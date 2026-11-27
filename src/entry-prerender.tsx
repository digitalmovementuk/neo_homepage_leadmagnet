/**
 * Prerender-Einstieg für alle indexierbaren Seiten · v1.6 (27.11.2026)
 * Wird nur von scripts/prerender-seo.mjs beim Build genutzt (Vite SSR-Build),
 * nie im Browser. Rendert dieselbe Route wie die App, mit StaticRouter.
 *
 * Changelog
 *   v1.6 (27.11.2026) Englische Fassung unter /en/: renderPage(location, lang), enRouteHeads + enHomeHead
 *        (Startseite, drei Leistungen, Über uns). Deutsch bleibt Standard ohne Präfix.
 *   v1.5 (26.11.2026) Pfade aus SERVICE_PATHS / ABOUT_PATH (flache Adressen je Fokus-Suchbegriff).
 *   v1.4 (26.11.2026) renderPage(location): jede Route (Startseite, Leistungen, Über uns, Rechtsseiten,
 *        404-Seite) wird fertig gerendert, damit Suchmaschinen den Inhalt ohne JavaScript sehen.
 *        renderSeoPage bleibt als Kurzform für /seo-agentur/. routeHeads tragen JSON-LD und den Namen des
 *        Seitenmoduls; legalHeads liefern Beschreibung und JSON-LD der Rechtsseiten.
 *   v1.3 (24.11.2026) routeHeads: Titel und Beschreibung der drei Leistungsseiten und von /uber-uns
 *        (aus translations.de), damit das Prerender-Skript ihnen eine eigene Canonical gibt.
 *   v1.2 (19.11.2026) Dieselben Provider wie src/main.tsx (LeadModal, SeoModal), damit Hydrierung passt.
 *   v1.1 (19.11.2026) progressiveChunkSize: Infinity, damit der Seiteninhalt
 *        direkt im HTML steht (sonst lagert React ihn ans Ende aus und blendet
 *        ihn erst per Skript ein; das kostete auf dem Handy ~1 s LCP).
 *   v1.0 (19.11.2026) Erste Fassung.
 */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes, BASE } from "./App";
import { LanguageProvider } from "./lib/i18n";
import { LeadModalProvider } from "./lib/leadModal";
import { SeoModalProvider } from "./lib/seoModal";
import { buildSeoJsonLd, seoHead } from "./content/seo-head";
import { seoDe } from "./content/seo-de";
import { translations } from "./lib/translations";
import { SITE_ORIGIN, aboutPageJsonLd, servicePageJsonLd, SERVICE_PATHS, ABOUT_PATH, EN_PREFIX, simplePageJsonLd } from "./content/route-jsonld";
import type { Lang } from "./lib/translations";

export { buildSeoJsonLd, seoHead };
export const SEO_PATH = seoDe.path;

/** Eigener Kopfbereich (Adresse, Titel, Beschreibung, JSON-LD) für Seiten, die sonst die Startseiten-Hülle bekämen. */
type RouteHead = { path: string; title: string; description: string; chunk: RegExp; jsonLd: Record<string, unknown> };
const headsFor = (lang: Lang): RouteHead[] => {
  const t = translations[lang];
  const isEN = lang === "en";
  const prefix = isEN ? EN_PREFIX : "";
  const svc = (key: "googleAds" | "socialMedia" | "websites", chunk: RegExp): RouteHead => {
    const p = t.servicePages[key];
    return { path: `${prefix}${SERVICE_PATHS[p.slug]}`, ...p.meta, chunk, jsonLd: servicePageJsonLd(p.slug, p.meta.title, p.meta.description, isEN, p.faq.items) };
  };
  return [
    svc("googleAds", /^google-ads-.*\.js$/),
    svc("socialMedia", /^social-media-.*\.js$/),
    svc("websites", /^websites-.*\.js$/),
    { path: `${prefix}${ABOUT_PATH}`, ...t.about.meta, chunk: /^AboutUs-.*\.js$/, jsonLd: aboutPageJsonLd(t.about.meta.title, t.about.meta.description, isEN) },
  ];
};
export const routeHeads: RouteHead[] = headsFor("de");
/** Englische Gegenstücke unter /en/... (gleiche Reihenfolge wie routeHeads). */
export const enRouteHeads: RouteHead[] = headsFor("en");

/** Englische Startseite /en/: Titel, Beschreibung und WebPage-JSON-LD (Deutsch steht in index.html). */
const enHomeTitle = "Online Marketing Agency for Owners & SMEs | NEO THE AGENCY";
const enHomeDescription =
  "Online marketing agency for owner-led businesses and SMEs: SEO, GEO, Google Ads, Social Ads, website development and CRM from one team. Delivery first, invoice after. Start with a free audit.";
export const enHomeHead = {
  path: `${EN_PREFIX}/`,
  title: enHomeTitle,
  description: enHomeDescription,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}${EN_PREFIX}/#webpage`,
        url: `${SITE_ORIGIN}${EN_PREFIX}/`,
        name: enHomeTitle,
        description: enHomeDescription,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#organization` },
        dateModified: "2026-11-27",
        author: { "@type": "Person", "@id": `${SITE_ORIGIN}/#johannes-kaluc`, name: "Johannes Kaluc", url: `${SITE_ORIGIN}${EN_PREFIX}${ABOUT_PATH}` },
      },
    ],
  } as Record<string, unknown>,
};

/** Rechtsseiten: Beschreibung und WebPage-JSON-LD (Titel setzt das Prerender-Skript). */
const legal = (path: string, crumb: string, title: string, description: string) => ({
  path,
  description,
  jsonLd: simplePageJsonLd({ type: "WebPage", url: `${SITE_ORIGIN}${path}`, crumb, title, description, isEN: false }),
});
export const legalHeads = [
  legal(
    "/impressum",
    "Impressum",
    "Impressum · NEO THE AGENCY",
    "Impressum von NEO THE AGENCY: Anbieterkennzeichnung nach § 5 DDG mit Inhabern, Anschrift und Kontakt.",
  ),
  legal(
    "/datenschutz",
    "Datenschutzerklärung",
    "Datenschutzerklärung · NEO THE AGENCY",
    "Datenschutzerklärung von NEO THE AGENCY: welche Daten diese Website verarbeitet, wofür, wie lange und welche Rechte Sie haben.",
  ),
];

/** Rendert eine Route vollständig (wartet auf lazy geladene Teile) und gibt das HTML für #root zurück. */
export async function renderPage(location: string, lang: Lang = "de"): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <LanguageProvider initialLang={lang}>
        <LeadModalProvider>
          <SeoModalProvider>
            <StaticRouter basename={lang === "en" ? `${BASE}${EN_PREFIX}` : BASE} location={location}>
              <AppRoutes />
            </StaticRouter>
          </SeoModalProvider>
        </LeadModalProvider>
      </LanguageProvider>
    </StrictMode>,
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk as Uint8Array));
  return Buffer.concat(chunks).toString("utf8");
}

/** Kurzform für /seo-agentur/. */
export const renderSeoPage = (): Promise<string> => renderPage(seoDe.path);

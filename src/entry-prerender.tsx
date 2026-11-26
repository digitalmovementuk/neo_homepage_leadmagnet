/**
 * Prerender-Einstieg für alle indexierbaren Seiten · v1.5 (26.11.2026)
 * Wird nur von scripts/prerender-seo.mjs beim Build genutzt (Vite SSR-Build),
 * nie im Browser. Rendert dieselbe Route wie die App, mit StaticRouter.
 *
 * Changelog
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
import { SITE_ORIGIN, aboutPageJsonLd, servicePageJsonLd, SERVICE_PATHS, ABOUT_PATH, simplePageJsonLd } from "./content/route-jsonld";

export { buildSeoJsonLd, seoHead };
export const SEO_PATH = seoDe.path;

/** Eigener Kopfbereich (Adresse, Titel, Beschreibung, JSON-LD) für Seiten, die sonst die Startseiten-Hülle bekämen. */
const de = translations.de;
type RouteHead = { path: string; title: string; description: string; chunk: RegExp; jsonLd: Record<string, unknown> };
const svc = (key: "googleAds" | "socialMedia" | "websites", chunk: RegExp): RouteHead => {
  const p = de.servicePages[key];
  return { path: SERVICE_PATHS[p.slug], ...p.meta, chunk, jsonLd: servicePageJsonLd(p.slug, p.meta.title, p.meta.description, false) };
};
export const routeHeads: RouteHead[] = [
  svc("googleAds", /^google-ads-.*\.js$/),
  svc("socialMedia", /^social-media-.*\.js$/),
  svc("websites", /^websites-.*\.js$/),
  { path: ABOUT_PATH, ...de.about.meta, chunk: /^AboutUs-.*\.js$/, jsonLd: aboutPageJsonLd(de.about.meta.title, de.about.meta.description, false) },
];

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
export async function renderPage(location: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <LanguageProvider>
        <LeadModalProvider>
          <SeoModalProvider>
            <StaticRouter basename={BASE} location={location}>
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

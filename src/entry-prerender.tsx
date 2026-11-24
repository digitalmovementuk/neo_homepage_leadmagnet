/**
 * Prerender-Einstieg für /seo-agentur/ · v1.3 (24.11.2026)
 * Wird nur von scripts/prerender-seo.mjs beim Build genutzt (Vite SSR-Build),
 * nie im Browser. Rendert dieselbe Route wie die App, mit StaticRouter.
 *
 * Changelog
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

export { buildSeoJsonLd, seoHead };
export const SEO_PATH = seoDe.path;

/** Eigener Kopfbereich (Adresse, Titel, Beschreibung) für Seiten, die sonst die Startseiten-Hülle bekämen. */
const de = translations.de;
export const routeHeads: { path: string; title: string; description: string }[] = [
  { path: `/services/${de.servicePages.googleAds.slug}`, ...de.servicePages.googleAds.meta },
  { path: `/services/${de.servicePages.socialMedia.slug}`, ...de.servicePages.socialMedia.meta },
  { path: `/services/${de.servicePages.websites.slug}`, ...de.servicePages.websites.meta },
  { path: "/uber-uns", ...de.about.meta },
];

/** Rendert die Seite vollständig (wartet auf lazy geladene Teile) und gibt das HTML für #root zurück. */
export async function renderSeoPage(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <LanguageProvider>
        <LeadModalProvider>
          <SeoModalProvider>
            <StaticRouter basename={BASE} location={seoDe.path}>
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

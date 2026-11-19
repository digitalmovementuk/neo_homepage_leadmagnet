/**
 * Prerender-Einstieg für alle Seiten · v2.0 (19.11.2026)
 * Wird nur von scripts/prerender-seo.mjs beim Build genutzt (Vite SSR-Build),
 * nie im Browser. Rendert dieselben Routen wie die App, mit StaticRouter.
 *
 * Changelog
 *   v2.0 (19.11.2026) renderRoute(path) für jede Route (auch 404); Kopfdaten
 *        aus content/route-meta.ts.
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
import {
  NOT_FOUND_META,
  ROUTE_META,
  ROUTE_PATHS,
  SITE_ORIGIN,
  buildRouteJsonLd,
  routeHead,
} from "./content/route-meta";

export { NOT_FOUND_META, ROUTE_META, ROUTE_PATHS, SITE_ORIGIN, buildRouteJsonLd, buildSeoJsonLd, routeHead, seoHead };

/** Adresse, unter der die App die 404-Ansicht zeigt (gibt es nicht als Route). */
export const NOT_FOUND_PROBE = "/__seite-nicht-gefunden__/";

/** Rendert eine Route vollständig (wartet auf lazy geladene Teile) und gibt das HTML für #root zurück. */
export async function renderRoute(location: string): Promise<string> {
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

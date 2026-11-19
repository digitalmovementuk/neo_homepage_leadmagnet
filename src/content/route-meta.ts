/**
 * Kopfdaten aller Seiten an EINER Stelle · v1.0 (19.11.2026)
 *
 * Titel, Meta-Beschreibung, Canonical (absolut, mit Schrägstrich am Ende),
 * Open Graph / Twitter, Robots, Brotkrumen und JSON-LD je Route.
 * Gelesen von:
 *   - den Seiten im Browser (useRouteHead → useDocumentHead)
 *   - scripts/prerender-seo.mjs beim Build (über src/entry-prerender.tsx)
 *   - scripts/generate-sitemap.mjs (Liste der Adressen, eigene Kopie dort)
 *
 * /seo-agentur/ holt Titel/Beschreibung von hier; ihren ausführlichen
 * JSON-LD-Graphen baut weiterhin content/seo-head.ts (nutzt organizationNode()).
 *
 * Regeln: nur Fakten, die bereits auf der Seite oder in index.html standen.
 * Kein AggregateRating (erst mit echten, prüfbaren Bewertungen).
 *
 * Changelog
 *   v1.0 (19.11.2026) Erste Fassung (technische SEO-Schicht).
 */

export const SITE_ORIGIN = "https://www.neotheagency.de";
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const SITE_NAME = "NEO THE AGENCY";

const DEFAULT_OG = {
  ogImage: `${SITE_ORIGIN}/brand/og-cover.jpg`,
  ogImageWidth: 2400,
  ogImageHeight: 1260,
  ogImageAlt: "NEO THE AGENCY — Digitalagentur für Websites, SEO, Google Ads und Social Media",
};

export type RoutePath =
  | "/"
  | "/seo-agentur/"
  | "/services/google-ads/"
  | "/services/social-media/"
  | "/services/websites/"
  | "/uber-uns/"
  | "/impressum/"
  | "/datenschutz/";

export type RouteMeta = {
  path: RoutePath | "/404";
  title: string;
  description: string;
  robots: string;
  ogImage: string;
  ogImageWidth: number;
  ogImageHeight: number;
  ogImageAlt: string;
  /** Brotkrumen ohne die Startseite selbst (die steht immer vorne). */
  crumbs: { name: string; path: string }[];
  /** Nur Leistungsseiten: Angaben für den Service-Knoten. */
  service?: { name: string; serviceType: string };
  /** Dateinamen-Muster des lazy geladenen Seitenmoduls (für modulepreload im Prerender). */
  chunk?: string;
  /** Quelldateien, deren letzter Commit das lastmod der Sitemap bestimmt. */
  sources: string[];
};

/** Organisation + ProfessionalService: auf jeder Seite gleich (eine @id). */
export function organizationNode(): Record<string, unknown> {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["NEO the Agency", "Neo Agency"],
    url: `${SITE_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/brand/icon-blue-n-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_ORIGIN}/brand/og-cover.jpg`,
    email: "info@neotheagency.com",
    telephone: "+4916096897003",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kolonnenstraße 8",
      postalCode: "10827",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    areaServed: { "@type": "Country", name: "Deutschland" },
    sameAs: [
      "https://www.instagram.com/neotheagency.de/",
      "https://www.youtube.com/@neotheagency",
      "https://www.facebook.com/p/NEO-The-Agency-61588285349359/",
    ],
  };
}

export const ROUTE_META: Record<RoutePath, RouteMeta> = {
  "/": {
    path: "/",
    title: "NEO THE AGENCY — Neue Website + Google Seite 1 in 90 Tagen",
    description:
      "Wir bauen Websites, die ranken, überzeugen und Anfragen bringen. SEO, Google Ads, Social Media und Webentwicklung aus einer Hand — für den deutschen Markt.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [],
    sources: ["src/pages/HomePage.tsx", "src/components", "src/lib/translations.ts"],
  },
  "/seo-agentur/": {
    path: "/seo-agentur/",
    // Freigegeben (Raoul, 19.11.2026), siehe content/seo-head.ts v1.2.
    title: "SEO Agentur für Kleinunternehmen in Deutschland | NEO",
    description:
      "SEO für Kleinunternehmen in Deutschland. Ihre Website erstellen wir ohne Aufpreis. Zahlung erst nach Einreichung bei Google. Kostenloser Audit in 24 h.",
    robots: "index, follow",
    ogImage: `${SITE_ORIGIN}/brand/og-seo-agentur.jpg`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: "NEO THE AGENCY: SEO für Kleinunternehmen in ganz Deutschland",
    crumbs: [{ name: "SEO", path: "/seo-agentur/" }],
    chunk: "SeoPage",
    sources: ["src/pages/SeoPage.tsx", "src/content/seo-de.ts", "src/content/seo-head.ts", "src/components/seo"],
  },
  "/services/google-ads/": {
    path: "/services/google-ads/",
    title: "Google Ads für Inhaber & Mittelstand · NEO THE AGENCY",
    description:
      "ROI-positiver bezahlter Traffic, der druckt. Eng gefasste Search- und Performance-Max-Kampagnen für inhabergeführte Unternehmen. Festpreis, wöchentliches Verschwendungs-Trimming.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Google Ads", path: "/services/google-ads/" }],
    service: { name: "Google Ads", serviceType: "Google-Ads-Kampagnenbetreuung" },
    chunk: "google-ads",
    sources: ["src/pages/services/google-ads.tsx", "src/components/ServicePageShell.tsx", "src/lib/translations.ts"],
  },
  "/services/social-media/": {
    path: "/services/social-media/",
    title: "Social Media für Inhaber & Mittelstand · NEO THE AGENCY",
    description:
      "Inhalte, die Anfragen bringen — keine Eitelkeitsmetriken. Short-Form-Video, Paid Social und Kreativ-Production für inhabergeführte Marken. Festpreis, lead-driven.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Social Media", path: "/services/social-media/" }],
    service: { name: "Social Media", serviceType: "Social-Media-Marketing" },
    chunk: "social-media",
    sources: ["src/pages/services/social-media.tsx", "src/components/ServicePageShell.tsx", "src/lib/translations.ts"],
  },
  "/services/websites/": {
    path: "/services/websites/",
    title: "Websites für Inhaber & Mittelstand · NEO THE AGENCY",
    description:
      "Conversion-optimierte Websites, die ab Tag 1 ranken. Mobile-First, Core Web Vitals, selbst editierbar. Festpreis, in 6–8 Wochen live.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Websites", path: "/services/websites/" }],
    service: { name: "Websites", serviceType: "Webdesign und Webentwicklung" },
    chunk: "websites",
    sources: ["src/pages/services/websites.tsx", "src/components/ServicePageShell.tsx", "src/lib/translations.ts"],
  },
  "/uber-uns/": {
    path: "/uber-uns/",
    title: "Über NEO · Die Agentur, die wirklich liefert",
    description:
      "Wer wir sind, woran wir glauben, und das Team hinter den 90-Tage-Sprints. Inhabergeführt, international, ohne Account-Manager-Ketten.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Über uns", path: "/uber-uns/" }],
    chunk: "AboutUs",
    sources: ["src/pages/AboutUs.tsx", "src/lib/translations.ts"],
  },
  "/impressum/": {
    path: "/impressum/",
    title: "Impressum · NEO THE AGENCY",
    // TODO-COPY: sachliche Platzhalter-Beschreibung, Text-Schritt darf ersetzen.
    description: "Impressum der NEO THE AGENCY, Kolonnenstraße 8, 10827 Berlin: Anbieterangaben und Kontakt.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Impressum", path: "/impressum/" }],
    chunk: "Impressum",
    sources: ["src/pages/Impressum.tsx", "src/pages/LegalPage.tsx"],
  },
  "/datenschutz/": {
    path: "/datenschutz/",
    title: "Datenschutz · NEO THE AGENCY",
    // TODO-COPY: sachliche Platzhalter-Beschreibung, Text-Schritt darf ersetzen.
    description: "Datenschutzerklärung der NEO THE AGENCY: welche Daten diese Website verarbeitet, wozu und welche Rechte Sie haben.",
    robots: "index, follow",
    ...DEFAULT_OG,
    crumbs: [{ name: "Datenschutz", path: "/datenschutz/" }],
    chunk: "Datenschutz",
    sources: ["src/pages/Datenschutz.tsx", "src/pages/LegalPage.tsx"],
  },
};

export const NOT_FOUND_META: RouteMeta = {
  path: "/404",
  title: "Seite nicht gefunden · NEO THE AGENCY",
  description: "Diese Seite gibt es nicht. Zurück zur Startseite von NEO THE AGENCY.",
  robots: "noindex, follow",
  ...DEFAULT_OG,
  crumbs: [],
  chunk: "NotFound",
  sources: [],
};

export const ROUTE_PATHS = Object.keys(ROUTE_META) as RoutePath[];

export const absoluteUrl = (p: string) => `${SITE_ORIGIN}${p}`;

function breadcrumbNode(meta: RouteMeta, url: string) {
  const items = [{ name: "Startseite", path: "/" }, ...meta.crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** JSON-LD für alle Routen außer /seo-agentur/ (die baut content/seo-head.ts). */
export function buildRouteJsonLd(path: RoutePath): Record<string, unknown> {
  const meta = ROUTE_META[path];
  const url = absoluteUrl(meta.path);
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      inLanguage: "de-DE",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": meta.path === "/uber-uns/" ? "AboutPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: "de-DE",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(meta.service ? { about: { "@id": `${url}#service` } } : {}),
    },
    breadcrumbNode(meta, url),
  ];
  if (meta.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: meta.service.name,
      serviceType: meta.service.serviceType,
      description: meta.description,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Deutschland" },
      url,
      audience: { "@type": "BusinessAudience", audienceType: "Inhabergeführte Unternehmen und Mittelstand" },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Argumente für useDocumentHead (einmal pro Route vorberechnet, damit der Effekt stabil bleibt). */
export type HeadArgs = {
  title: string;
  description: string;
  canonical: string | null;
  robots: string;
  ogImage: string;
  ogImageAlt: string;
  ogImageWidth: number;
  ogImageHeight: number;
  lang: "de";
  jsonLd?: Record<string, unknown>;
};

function headArgs(meta: RouteMeta, jsonLd?: Record<string, unknown>): HeadArgs {
  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.path === "/404" ? null : absoluteUrl(meta.path),
    robots: meta.robots,
    ogImage: meta.ogImage,
    ogImageAlt: meta.ogImageAlt,
    ogImageWidth: meta.ogImageWidth,
    ogImageHeight: meta.ogImageHeight,
    lang: "de",
    jsonLd,
  };
}

const cache = new Map<string, HeadArgs>();

/** Kopfdaten einer Route (ohne JSON-LD für /seo-agentur/, das hängt SeoPage selbst an). */
export function routeHead(path: RoutePath | "/404"): HeadArgs {
  let hit = cache.get(path);
  if (!hit) {
    if (path === "/404") hit = headArgs(NOT_FOUND_META);
    else hit = headArgs(ROUTE_META[path], path === "/seo-agentur/" ? undefined : buildRouteJsonLd(path));
    cache.set(path, hit);
  }
  return hit;
}

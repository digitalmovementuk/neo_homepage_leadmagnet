/**
 * Kopfbereich und strukturierte Daten der SEO-Seite (/seo-agentur/)
 * v1.3 (19.11.2026)
 *
 * Changelog
 *   v1.3 (19.11.2026) Titel/Beschreibung/Vorschaubild aus content/route-meta.ts;
 *        Organisation aus organizationNode() (jetzt mit Logo, gleiche @id auf allen Seiten).
 *   v1.2 (19.11.2026) „für kleine Unternehmen" → „für Kleinunternehmen" in Titel,
 *        Beschreibung, og:/twitter: und JSON-LD (Raoul). Eigenes Vorschaubild
 *        /brand/og-seo-agentur.jpg (1200×630) statt des Startseiten-Bilds.
 *   v1.1 (19.11.2026) Freigegebener Titel und freigegebene Meta-Beschreibung aus
 *        NEO-SEO-Meta-Fehlertext-v1.1-20261119.md (wörtlich; in "24 h" steht ein
 *        geschütztes Leerzeichen U+00A0). og:/twitter: übernehmen beide Werte.
 *   v1.0 (19.11.2026) Titel, Beschreibung, Canonical, Open Graph, Robots und
 *        JSON-LD (@graph) aus seo-de.ts abgeleitet. Wird von SeoPage
 *        (Browser) und scripts/prerender-seo.mjs (Build) gleich genutzt.
 *
 * Regeln: Nur Fakten, die in seo-de.ts oder in der Seitenstruktur v1.3 stehen.
 * Bewusst NICHT enthalten: AggregateRating (erst mit echten Bewertungen),
 * OpeningHoursSpecification (keine Öffnungszeiten bekannt), logo (es gibt
 * noch keine NEO-Logodatei).
 */
import { anchors, seoDe } from "./seo-de";
import { ORG_ID, ROUTE_META, SITE_NAME, SITE_ORIGIN, organizationNode } from "./route-meta";

export { SITE_ORIGIN };
export const SEO_CANONICAL = `${SITE_ORIGIN}${seoDe.path}`;
const META = ROUTE_META["/seo-agentur/"];

const H1 = `${seoDe.hero.heading.ink} ${seoDe.hero.heading.grey}`;

export const seoHead = {
  // Titel, Beschreibung und Vorschaubild stehen seit v1.3 in content/route-meta.ts.
  title: META.title,
  description: META.description,
  canonical: SEO_CANONICAL,
  robots: META.robots,
  lang: "de" as const,
  ogImage: META.ogImage,
  ogImageWidth: META.ogImageWidth,
  ogImageHeight: META.ogImageHeight,
  ogImageAlt: META.ogImageAlt,
  /** Hero-Bild: Handy bis 640 px, sonst Desktop (wie <picture> in SectionsA). */
  heroPreload: {
    mobile: `/${seoDe.hero.image.srcMobile}`,
    desktop: `/${seoDe.hero.image.src}`,
    breakpoint: 640,
  },
};

const ID = {
  org: ORG_ID,
  site: `${SITE_ORIGIN}/#website`,
  person: `${SITE_ORIGIN}/#raoul-mueller`,
  page: `${SEO_CANONICAL}#webpage`,
  breadcrumb: `${SEO_CANONICAL}#breadcrumb`,
  service: `${SEO_CANONICAL}#service`,
  faq: `${SEO_CANONICAL}#faq`,
  catalog: `${SEO_CANONICAL}#leistungen`,
  heroImage: `${SEO_CANONICAL}#hero-bild`,
};

function absolute(pathOrHash: string): string {
  return `${SITE_ORIGIN}${pathOrHash.startsWith("/") ? "" : "/"}${pathOrHash}`;
}

export function buildSeoJsonLd(): Record<string, unknown> {
  const { hero, trail, blocks, packages, team, faq } = seoDe;
  const founder = team.people[0];
  const fundament = packages.items[0];

  // Gemeinsamer Organisations-Knoten (mit Logo, ohne AggregateRating), plus Gründer-Verweis.
  const organization = { ...organizationNode(), founder: { "@id": ID.person } };

  const person = {
    "@type": "Person",
    "@id": ID.person,
    name: founder.name,
    jobTitle: founder.role,
    image: absolute(founder.photo!.src),
    worksFor: { "@id": ID.org },
  };

  const website = {
    "@type": "WebSite",
    "@id": ID.site,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    inLanguage: "de-DE",
    publisher: { "@id": ID.org },
  };

  const heroImage = {
    "@type": "ImageObject",
    "@id": ID.heroImage,
    url: absolute(hero.image.src),
    width: hero.image.width,
    height: hero.image.height,
    caption: hero.image.alt,
  };

  const webpage = {
    "@type": "WebPage",
    "@id": ID.page,
    url: SEO_CANONICAL,
    name: seoHead.title,
    description: seoHead.description,
    inLanguage: "de-DE",
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.service },
    breadcrumb: { "@id": ID.breadcrumb },
    primaryImageOfPage: { "@id": ID.heroImage },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#top-titel", "#top-titel + p"] },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb,
    itemListElement: trail.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.to === null ? SEO_CANONICAL : absolute(`${item.to}${item.hash}`),
    })),
  };

  const service = {
    "@type": "Service",
    "@id": ID.service,
    name: H1,
    serviceType: "Suchmaschinenoptimierung (SEO)",
    description: hero.subline,
    provider: { "@id": ID.org },
    areaServed: { "@type": "Country", name: "Deutschland" },
    url: SEO_CANONICAL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": ID.catalog,
      name: "SEO-Leistungen",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: blocks.heading.ink.replace(/,$/, ""),
          itemListElement: blocks.cards.map((card) => ({
            "@type": "Service",
            name: card.title,
            description: card.text,
            provider: { "@id": ID.org },
          })),
        },
        {
          "@type": "OfferCatalog",
          name: "Pakete",
          itemListElement: [
            {
              "@type": "Offer",
              name: fundament.name,
              description: fundament.line,
              url: `${SEO_CANONICAL}#${anchors.packages}`,
              itemOffered: {
                "@type": "Service",
                name: `SEO-Paket ${fundament.name}`,
                description: [...fundament.points, ...packages.shared].join(". "),
                provider: { "@id": ID.org },
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 490,
                priceCurrency: "EUR",
                unitCode: "MON",
                valueAddedTaxIncluded: false,
              },
            },
            ...packages.items.slice(1).map((item) => ({
              "@type": "Service",
              name: `SEO-Paket ${item.name}`,
              description: [item.line, ...item.points, ...packages.shared].join(". "),
              provider: { "@id": ID.org },
            })),
          ],
        },
      ],
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": ID.faq,
    isPartOf: { "@id": ID.page },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, person, website, webpage, heroImage, breadcrumb, service, faqPage],
  };
}

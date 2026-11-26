/**
 * Kopfbereich und strukturierte Daten der SEO-Seite (/seo-agentur/)
 * v1.8 (26.11.2026)
 *
 * Changelog
 *   v1.8 (26.11.2026) Autor Johannes Kaluc: WebPage.author + eigener Person-Knoten.
 *   v1.7 (26.11.2026) Titel und Meta mit Fokus-Suchbegriff „SEO-Agentur" (QA-Gate 26.11.).
 *   v1.6 (25.11.2026) sameAs aus platforms.ts v1.3: Sortlist mit korrigierter Adresse wieder enthalten.
 *   v1.5 (24.11.2026) Organization.telephone = „+49 160 9689 7003" (wie index.html und Impressum;
 *        vorher „+4916096897003"). sameAs aus platforms.ts v1.2 (Canonical-Adressen,
 *        LinkedIn-Unternehmensseite, ohne Sortlist).
 *   v1.4 (24.11.2026) Organization.sameAs zusätzlich mit Hotfrog (DIRECTORY_PROFILES
 *        in content/platforms.ts). Organization.name = „NEO THE AGENCY" + alternateName
 *        „Neo Agency" wie in index.html (vorher „NEO the Agency"). WebSite-Knoten unverändert.
 *   v1.3 (22.11.2026) Organization.sameAs = Instagram, Facebook, YouTube, Trustpilot,
 *        ProvenExpert, Sortlist, wlw (content/platforms.ts); Person.sameAs = LinkedIn
 *        des Gründers. Keine Bewertungs-Auszeichnung (noch keine echten Bewertungen).
 *   v1.2 (19.11.2026) „für kleine Unternehmen" → „für Kleinunternehmen" in Titel,
 *        Beschreibung, og:/twitter: und JSON-LD (Raoul). Eigenes Vorschaubild
 *        /brand/og-neo-seo-agentur.jpg (1200×630) statt des Startseiten-Bilds.
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
import { FOUNDER_LINKEDIN, ORG_SAME_AS } from "./platforms";

export const SITE_ORIGIN = "https://www.neotheagency.de";
export const SEO_CANONICAL = `${SITE_ORIGIN}${seoDe.path}`;

const H1 = `${seoDe.hero.heading.ink} ${seoDe.hero.heading.grey}`;

export const seoHead = {
  // v1.2: „für Kleinunternehmen" (Raoul, 19.11.2026), 53 und 151 Zeichen.
  // v1.7 (26.11.2026): Fokus-Suchbegriff „SEO-Agentur" in Titel und Meta (QA-Gate, Raoul-Scope); 54 und 144 Zeichen.
  title: "SEO-Agentur für Kleinunternehmen in Deutschland | NEO",
  description: "SEO-Agentur für Kleinunternehmen. Ihre Website erstellen wir ohne Aufpreis. Zahlung erst nach Einreichung bei Google. Kostenloser Audit in 24 h.",
  canonical: SEO_CANONICAL,
  robots: "index, follow",
  lang: "de" as const,
  ogImage: `${SITE_ORIGIN}/brand/og-neo-seo-agentur.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "NEO THE AGENCY: SEO für Kleinunternehmen in ganz Deutschland",
  /** Hero-Bild: Handy bis 640 px, sonst Desktop (wie <picture> in SectionsA). */
  heroPreload: {
    mobile: `/${seoDe.hero.image.srcMobile}`,
    desktop: `/${seoDe.hero.image.src}`,
    breakpoint: 640,
  },
};

const ID = {
  org: `${SITE_ORIGIN}/#organization`,
  site: `${SITE_ORIGIN}/#website`,
  person: `${SITE_ORIGIN}/#raoul-mueller`,
  author: `${SITE_ORIGIN}/#johannes-kaluc`,
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
  const { contact, hero, trail, blocks, packages, team, faq } = seoDe;
  const [postalCode, ...localityParts] = contact.city.split(" ");
  const founder = team.people[0];
  const fundament = packages.items[0];

  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.org,
    // v1.4: gleicher Name wie im Startseiten-Datensatz (index.html), damit beide Seiten dieselbe Firma beschreiben
    name: "NEO THE AGENCY",
    alternateName: "Neo Agency",
    url: `${SITE_ORIGIN}/`,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode,
      addressLocality: localityParts.join(" "),
      addressCountry: "DE",
    },
    areaServed: { "@type": "Country", name: "Deutschland" },
    founder: { "@id": ID.person },
    // v1.3: alle geprüften Profile (Social + Bewertungsplattformen) aus content/platforms.ts
    sameAs: ORG_SAME_AS,
  };

  const person = {
    "@type": "Person",
    "@id": ID.person,
    name: founder.name,
    jobTitle: founder.role,
    image: absolute(founder.photo!.src),
    worksFor: { "@id": ID.org },
    sameAs: [FOUNDER_LINKEDIN],
  };

  const website = {
    "@type": "WebSite",
    "@id": ID.site,
    url: `${SITE_ORIGIN}/`,
    name: "NEO the Agency",
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
    dateModified: "2026-11-26",
    author: { "@type": "Person", "@id": ID.author, name: "Johannes Kaluc", url: `${SITE_ORIGIN}/neo-the-agency/` },
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

  const author = {
    "@type": "Person",
    "@id": ID.author,
    name: "Johannes Kaluc",
    url: `${SITE_ORIGIN}/neo-the-agency/`,
    jobTitle: "Co-Founder · Operations & Business Development",
    image: `${SITE_ORIGIN}/brand/founders/johannes-kaluc-384.webp`,
    worksFor: { "@id": ID.org },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, person, author, website, webpage, heroImage, breadcrumb, service, faqPage],
  };
}

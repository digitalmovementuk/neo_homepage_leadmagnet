/**
 * Strukturierte Daten (JSON-LD) für Leistungsseiten, Über uns und Rechtsseiten · v1.4 (27.11.2026)
 * Eine Quelle für Browser (useDocumentHead) und Build (scripts/prerender-seo.mjs),
 * damit das Roh-HTML und die fertige Seite dieselben Daten tragen.
 *
 * Changelog
 *   v1.4 (27.11.2026) Englische Fassung unter /en/: isEN setzt /en vor alle Adressen, Brotkrumen-Start /en/,
 *        inLanguage en-GB.
 *   v1.3 (26.11.2026) Autor Johannes Kaluc: author auf jeder WebPage, Person-Knoten im Graphen der
 *        Leistungsseiten und von Über uns (sichtbare Autorenzeile auf denselben Seiten).
 *   v1.2 (26.11.2026) dateModified auf jeder WebPage; FAQPage aus den sichtbaren FAQ der Leistungsseiten;
 *        Über uns als ["WebPage","AboutPage"].
 *   v1.1 (26.11.2026) SERVICE_PATHS + ABOUT_PATH: flache Adressen je Fokus-Suchbegriff (/google-ads-agentur/ usw.).
 *   v1.0 (26.11.2026) Erste Fassung: Service + BreadcrumbList + WebPage; AboutPage; WebPage für Rechtsseiten;
 *        servicePageJsonLd/aboutPageJsonLd mit Fachbegriffen statt Werbe-Überschriften.
 */
import { ORG_ID } from "./platforms";

export const SITE_ORIGIN = "https://www.neotheagency.de";
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

type Ld = Record<string, unknown>;

const AUTHOR_ID = `${SITE_ORIGIN}/#johannes-kaluc`;
const authorPerson: Ld = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: "Johannes Kaluc",
  url: `${SITE_ORIGIN}/neo-the-agency/`,
  jobTitle: "Co-Founder · Operations & Business Development",
  image: `${SITE_ORIGIN}/brand/founders/johannes-kaluc-384.webp`,
  worksFor: { "@id": ORG_ID },
};

function breadcrumb(url: string, name: string, isEN: boolean): Ld {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEN ? "Home" : "Startseite", item: `${SITE_ORIGIN}${isEN ? "/en/" : "/"}` },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}

function webPage(type: string | string[], url: string, name: string, description: string, isEN: boolean): Ld {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: isEN ? "en-GB" : "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    author: { "@type": "Person", "@id": AUTHOR_ID, name: "Johannes Kaluc", url: `${SITE_ORIGIN}/neo-the-agency/` },
    dateModified: "2026-11-26",
  };
}

export function serviceJsonLd(args: {
  url: string;
  name: string;
  serviceType: string;
  title: string;
  description: string;
  isEN: boolean;
  faq?: { q: string; a: string }[];
}): Ld {
  const { url, name, serviceType, title, description, isEN, faq } = args;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        url,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Germany" },
        description,
        serviceType,
        audience: {
          "@type": "BusinessAudience",
          audienceType: isEN ? "Founder-led businesses and SMEs" : "Inhabergeführte Unternehmen und Mittelstand",
        },
      },
      webPage("WebPage", url, title, description, isEN),
      breadcrumb(url, serviceType, isEN),
      authorPerson,
      ...(faq && faq.length
        ? [{
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }]
        : []),
    ],
  };
}

export function simplePageJsonLd(args: {
  type: string | string[];
  url: string;
  crumb: string;
  title: string;
  description: string;
  isEN: boolean;
}): Ld {
  const { type, url, crumb, title, description, isEN } = args;
  return {
    "@context": "https://schema.org",
    "@graph": [webPage(type, url, title, description, isEN), breadcrumb(url, crumb, isEN)],
  };
}

/** Fachbegriffe je Leistungsseite (statt der Werbe-Überschrift „ROI." als serviceType). */
const SERVICE_NAMES: Record<string, { de: [string, string]; en: [string, string] }> = {
  "google-ads": { de: ["Google-Ads-Betreuung", "Google Ads"], en: ["Google Ads management", "Google Ads"] },
  "social-media": { de: ["Social-Media-Marketing", "Social Media"], en: ["Social media marketing", "Social media"] },
  websites: { de: ["Webdesign und Website-Erstellung", "Webdesign"], en: ["Web design and website builds", "Web design"] },
};

/** Flache Adressen je Leistungsseite (26.11.2026): Adresse = Fokus-Suchbegriff. Alte /services/...-Adressen leiten per 301 weiter (vercel.json). */
export const SERVICE_PATHS: Record<string, string> = {
  "google-ads": "/google-ads-agentur/",
  "social-media": "/social-media-agentur/",
  websites: "/webdesign-agentur/",
};
/** Über-uns-Seite unter dem Markennamen (26.11.2026); /uber-uns und /about leiten weiter. */
export const ABOUT_PATH = "/neo-the-agency/";
/** Englische Fassung liegt unter /en/... (27.11.2026); Deutsch ist die Standardsprache ohne Präfix. */
export const EN_PREFIX = "/en";

/** JSON-LD für die Leistungsseiten: dieselbe Funktion nutzt der Browser und der Build. */
export function servicePageJsonLd(slug: string, title: string, description: string, isEN: boolean, faq?: { q: string; a: string }[]): Ld {
  const names = SERVICE_NAMES[slug] ?? { de: [title, title], en: [title, title] };
  const [name, serviceType] = isEN ? names.en : names.de;
  return serviceJsonLd({ url: `${SITE_ORIGIN}${isEN ? EN_PREFIX : ""}${SERVICE_PATHS[slug] ?? `/${slug}/`}`, name, serviceType, title, description, isEN, faq });
}

/** JSON-LD für die Über-uns-Seite (DE unter /neo-the-agency/, EN unter /en/neo-the-agency/). */
export function aboutPageJsonLd(title: string, description: string, isEN: boolean): Ld {
  const ld = simplePageJsonLd({
    type: ["WebPage", "AboutPage"],
    url: `${SITE_ORIGIN}${isEN ? EN_PREFIX : ""}${ABOUT_PATH}`,
    crumb: isEN ? "About" : "Über uns",
    title,
    description,
    isEN,
  });
  (ld["@graph"] as Ld[]).push(authorPerson);
  return ld;
}

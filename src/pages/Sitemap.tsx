/**
 * HTML-Sitemap /sitemap/ · v1.0 (27.11.2026)
 * Listet nur die Seiten, die live sind (gleiche Liste wie scripts/generate-sitemap.mjs).
 * Neue Seite = hier und in generate-sitemap.mjs eintragen.
 *
 * Changelog
 *   v1.0 (27.11.2026) Erste Fassung: Leistungen, Agentur, Rechtliches, englische Fassung, XML-Sitemap.
 */
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { LegalPage, LegalSection } from "./LegalPage";

type Entry = { label: string; to: string; note?: string; external?: boolean };

const groups: { title: string; entries: Entry[] }[] = [
  {
    title: "Startseite und Leistungen",
    entries: [
      { label: "Startseite", to: "/" },
      { label: "SEO-Agentur", to: "/seo-agentur/" },
      { label: "Google-Ads-Agentur", to: "/google-ads-agentur/" },
      { label: "Social-Media-Agentur", to: "/social-media-agentur/" },
      { label: "Webdesign-Agentur", to: "/webdesign-agentur/" },
    ],
  },
  {
    title: "Agentur",
    entries: [{ label: "Über uns", to: "/neo-the-agency/" }],
  },
  {
    title: "Rechtliches",
    entries: [
      { label: "Impressum", to: "/impressum/" },
      { label: "Datenschutzerklärung", to: "/datenschutz/" },
    ],
  },
  {
    title: "English version",
    entries: [
      { label: "Home", to: "/en/", external: true },
      { label: "Google Ads agency", to: "/en/google-ads-agentur/", external: true },
      { label: "Social media agency", to: "/en/social-media-agentur/", external: true },
      { label: "Web design agency", to: "/en/webdesign-agentur/", external: true },
      { label: "About us", to: "/en/neo-the-agency/", external: true },
    ],
  },
  {
    title: "Für Suchmaschinen",
    entries: [{ label: "XML-Sitemap", to: "/sitemap.xml", note: "maschinenlesbare Liste aller Seiten", external: true }],
  },
];

const linkCls =
  "group inline-flex items-center gap-1.5 text-ink font-medium underline-offset-4 hover:underline hover:text-brand-violet-deep";

export function Sitemap() {
  return (
    <LegalPage
      eyebrow="Übersicht"
      title="Sitemap"
      docTitle="Sitemap · NEO THE AGENCY"
      canonical="https://www.neotheagency.de/sitemap/"
    >
      <p>Alle Seiten von NEO THE AGENCY auf einen Blick.</p>
      {groups.map((g) => (
        <LegalSection key={g.title} title={g.title}>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {g.entries.map((e) => (
              <li key={e.to} className="py-3" lang={g.title === "English version" ? "en" : undefined}>
                {e.external ? (
                  <a href={e.to} className={linkCls}>
                    {e.label}
                    <ArrowUpRight size={14} className="text-ink-faint group-hover:text-brand-violet-deep" aria-hidden />
                  </a>
                ) : (
                  <Link to={e.to} className={linkCls}>
                    {e.label}
                    <ArrowUpRight size={14} className="text-ink-faint group-hover:text-brand-violet-deep" aria-hidden />
                  </Link>
                )}
                {e.note && <span className="ml-2 text-[14px] text-ink-muted">· {e.note}</span>}
              </li>
            ))}
          </ul>
        </LegalSection>
      ))}
    </LegalPage>
  );
}

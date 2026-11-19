/**
 * SEO-Leistungsseite /seo-agentur/ · v1.3 (19.11.2026)
 * Reihenfolge der Abschnitte 1 bis 25. Kopfzeile, Fußzeile (26) und die
 * mitlaufende Leiste kommen aus components/seo/SeoLayout.tsx.
 *
 * Changelog
 *   v1.3 (19.11.2026) Gestaltung je Abschnitt wie die Live-Seite /services/seo;
 *        die Weg-Zeile sitzt jetzt im Abschnitt mit dem Audit-Formular.
 *   v1.2 (19.11.2026) Abschnitte 20 und 21 je über eigenes Flag
 *        (flags.showReviews / flags.showNumbers), standardmäßig aus (QA F1).
 *   v1.1 (19.11.2026) Kopfbereich und JSON-LD aus content/seo-head.ts; beim
 *        Build vorab als HTML ausgegeben (scripts/prerender-seo.mjs).
 *   v1.0 (19.11.2026) Design-Stand.
 */
import { seoDe } from "../content/seo-de";
import { buildSeoJsonLd } from "../content/seo-head";
import { routeHead } from "../content/route-meta";
import { useDocumentHead } from "../lib/useDocumentHead";
import { AuditForm, Cex, Channels, Hero, Measure, Problem, Proof } from "../components/seo/SectionsA";
import { Advantage, Approach, Blocks, Fit, Gains, Later, Packages, ShortForm, Timeline } from "../components/seo/SectionsB";
import { Faq, FinalCta, Numbers, Related, Reviews, Team, Tools, Videos } from "../components/seo/SectionsC";

const SEO_HEAD = { ...routeHead("/seo-agentur/"), jsonLd: buildSeoJsonLd() };

export function SeoPage() {
  // Kopfdaten zentral in content/route-meta.ts; der ausführliche Graph aus seo-head.ts.
  useDocumentHead(SEO_HEAD);
  const { showReviews, showNumbers } = seoDe.flags;
  return (
    <>
      <Hero />
      <AuditForm />
      <Proof />
      <Problem />
      <Measure />
      <Channels />
      <Cex />
      <Approach />
      <Blocks />
      <Timeline />
      <Later />
      <Advantage />
      <ShortForm />
      <Packages />
      <Gains />
      <Fit />
      <Team />
      <Tools />
      {/* Abschnitte 20 und 21 sind reine Platzhalter: erst einschalten, wenn echte Daten vorliegen. */}
      {showReviews ? <Reviews /> : null}
      {showNumbers ? <Numbers /> : null}
      <Related />
      <Faq />
      <Videos />
      <FinalCta />
    </>
  );
}

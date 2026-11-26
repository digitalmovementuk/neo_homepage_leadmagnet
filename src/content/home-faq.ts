/**
 * Häufige Fragen der Startseite (sichtbar + FAQPage in index.html)
 * v1.0 (26.11.2026)
 *
 * Changelog
 *   v1.0 (26.11.2026) Erste Fassung, sechs Fragen. Der deutsche Text steht wortgleich
 *        als FAQPage im Startseiten-Block von index.html (data-home-only).
 */
export type FaqItem = { q: string; a: string };
export type HomeFaqContent = { eyebrow: string; headlineMain: string; headlineSub: string; intro: string; items: FaqItem[] };

export const homeFaqDe: HomeFaqContent = {
  eyebrow: "FAQ",
  headlineMain: "Häufige Fragen",
  headlineSub: "an unsere Online-Marketing-Agentur.",
  intro: "Kurze Antworten auf die Fragen, die Inhaber uns am häufigsten stellen.",
  items: [
    {
      q: "Was macht eine Online-Marketing-Agentur wie NEO?",
      a: "Wir kümmern uns um SEO, KI-Suche, Google Ads, Social Media und Ihre Website. Alles kommt aus einer Hand, mit einem festen Ansprechpartner. Das Ziel ist einfach: mehr Anfragen für Ihr Unternehmen.",
    },
    {
      q: "Wie schnell sehe ich Ergebnisse?",
      a: "Wir arbeiten in Sprints von 90 Tagen mit klaren Zielen. Bei SEO lautet das Ziel Seite 1 in 90 Tagen. Jeden Monat zeigt Ihnen ein Bericht, was sich bewegt hat.",
    },
    {
      q: "Was kostet die Zusammenarbeit?",
      a: "Sie zahlen einen Festpreis. Es gibt keine Setup-Gebühr und keine versteckten Stunden. Ihr Werbebudget läuft über Ihr eigenes Konto, nicht über uns.",
    },
    {
      q: "Gibt es eine Mindestlaufzeit?",
      a: "Nein. Nach dem ersten Sprint läuft die Zusammenarbeit monatlich weiter. Sie können jederzeit pausieren. Konten und Daten gehören immer Ihnen.",
    },
    {
      q: "Mit wem spreche ich bei NEO?",
      a: "Sie sprechen direkt mit den Fachleuten, die Ihre Kampagnen und Seiten bauen. Einen Account-Manager dazwischen gibt es nicht. Sie haben einen festen Ansprechpartner.",
    },
    {
      q: "Für wen ist NEO die richtige Agentur?",
      a: "Für inhabergeführte Unternehmen und den Mittelstand in Deutschland. Unser Sitz ist in Berlin-Schöneberg. Wir arbeiten mit Kunden aus ganz Deutschland.",
    },
  ],
};

export const homeFaqEn: HomeFaqContent = {
  eyebrow: "FAQ",
  headlineMain: "Common questions",
  headlineSub: "for our online marketing agency.",
  intro: "Short answers to the questions owners ask us most often.",
  items: [
    { q: "What does an online marketing agency like NEO do?", a: "We handle SEO, AI search, Google Ads, social media and your website. Everything comes from one team, with one fixed contact person. The goal is simple: more enquiries for your business." },
    { q: "How quickly will I see results?", a: "We work in 90-day sprints with clear goals. For SEO the goal is page 1 in 90 days. A monthly report shows you what has moved." },
    { q: "What does it cost?", a: "You pay a fixed price. There is no setup fee and no hidden hours. Your ad budget runs through your own account, not through us." },
    { q: "Is there a minimum term?", a: "No. After the first sprint we continue month by month. You can pause at any time. Accounts and data always belong to you." },
    { q: "Who will I talk to at NEO?", a: "You talk directly to the specialists who build your campaigns and pages. There is no account manager in between. You have one fixed contact person." },
    { q: "Who is NEO the right agency for?", a: "For owner-led businesses and the German Mittelstand. We are based in Berlin-Schöneberg and work with clients across Germany." },
  ],
};

// Alle Texte in einer Datei, damit sie schnell überprüft und bearbeitet
// werden können. Deutsche Marktversion für NEO THE AGENCY.

export const business = {
  name: "NEO THE AGENCY",
  tagline: "Neue Website. Google Seite 1. In 90 Tagen.",
  // TODO: echte Telefonnummer eintragen
  phone: "+49 30 123 4567",
  phoneHref: "tel:+493012345678",
  // TODO: echte E-Mail eintragen
  email: "kontakt@neo-agency.de",
  emailHref: "mailto:kontakt@neo-agency.de",
  // TODO: echte WhatsApp-Nummer eintragen
  whatsapp: "+49 30 123 4567",
  whatsappHref: "https://wa.me/493012345678",
  address: {
    // TODO: echte Adresse eintragen
    line1: "Hardenbergstraße 1",
    line2: "10623 Berlin",
    country: "Deutschland",
  },
  socials: [
    // TODO: echte Profile eintragen
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const navLinks = [
  { label: "Was wir tun", href: "#services" },
  { label: "Kundenprojekte", href: "#cases" },
  { label: "Zahlen", href: "#metrics" },
  { label: "Kontakt", href: "#contact" },
];

export const heroStats = [
  { value: 8, suffix: "x", label: "mehr Anfragen pro Monat" },
  { value: 90, suffix: "", label: "Tage bis Google Seite 1" },
];

export const googleRating = {
  rating: 5.0,
  count: 20,
  reviewsUrl: "https://www.google.com/search?q=NEO+THE+AGENCY+reviews",
};

export const services = [
  {
    key: "seo",
    title: "SEO",
    promise: "Google Seite 1 in nur 90 Tagen.",
    detail:
      "Technische Korrekturen, Inhalte mit Klicks und Linkaufbau, der sich auszahlt. Wir zeigen Ihnen jeden Monat die Mathematik dahinter — was sich bewegt hat, warum, und was als Nächstes kommt.",
    bullets: [
      "Technisches SEO-Audit",
      "Content + On-Page",
      "Autoritätsaufbau",
      "Monatliche Auswertung",
    ],
    video: "video/seo-logo.mp4",
  },
  {
    key: "google-ads",
    title: "Google Ads",
    promise: "ROI-positiver bezahlter Traffic, der druckt.",
    detail:
      "Eng gefasste Kampagnen, mit Conversions getrackte Landingpages und wöchentliches Verschwendungs-Trimming. Wir bieten nicht auf Eitelkeitsbegriffe — wir bieten auf Umsatz.",
    bullets: [
      "Search + Performance Max",
      "Conversion-Tracking",
      "Landingpages, die konvertieren",
      "Wöchentliche Optimierung",
    ],
    video: "video/google-ads-logo.mp4",
  },
  {
    key: "social",
    title: "Social Media",
    promise: "Inhalte, die Anfragen bringen — keine Eitelkeitsmetriken.",
    detail:
      "Short-Form-Video, Paid Social und Kreatives, gebaut für Ihre Zielgruppe und Plattform. Follower sind nett — gebuchte Termine sind besser.",
    bullets: [
      "Short-Form-Video",
      "Paid Social",
      "Kreativ-Produktion",
      "Lead-getriebener Posting-Plan",
    ],
    video: "video/socials-logo.mp4",
  },
  {
    key: "websites",
    title: "Websites",
    promise: "Conversion-optimierte Seiten, die ab Tag 1 ranken.",
    detail:
      "Schnelle, moderne, mobile-first Websites, die schnell laden, gut aussehen und Besucher zu Anfragen machen. Auf Plattformen, die Sie selbst pflegen können.",
    bullets: [
      "Mobile-first Design",
      "Core Web Vitals",
      "Auf Conversion gebaut",
      "Selbst editierbar",
    ],
    video: "video/website-logo.mp4",
  },
];

export const results = [
  {
    metric: "1312%",
    label: "Mehr Anfragen pro Monat",
    industry: "Premium-Klinik",
    work: "SEO + Webdesign + Google Ads",
    timeline: "Innerhalb 4 Monaten",
    quote: "Aus einem ruhigen Montag wurde ein voll belegter Kalender.",
  },
];

export const processSteps = [
  {
    n: "01",
    eta: "Heute",
    title: "Audit Ihrer Seite",
    body: "Wir prüfen Ihre Website, aktuelle Google-Rankings und Online-Präsenz, um Quick Wins und Wachstums-Chancen zu finden.",
  },
  {
    n: "02",
    eta: "Woche 1",
    title: "Wir starten",
    body: "Tracking geht live, Landingpages stehen, bezahlte Kampagnen laufen, On-Page-SEO-Fixes werden ausgeliefert. Sie sehen alles passieren.",
  },
  {
    n: "03",
    eta: "Wochen 4–8",
    title: "Sie sehen die Mathematik",
    body: "Stärkere Rankings, echte Anfragen und ein Monatsreport, den Sie tatsächlich lesen können. Wir zeigen jeden Monat, was sich bewegt hat — und was als Nächstes kommt.",
  },
];

/**
 * Case Studies. English remains the fallback for the language switcher;
 * German copy is exported separately so the default German page does not
 * mix languages in the customer-project section.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  services: string[];
  timeline: string;
  headline: string;
  body: string;
  metrics: { value: string; label: string }[];
  video: string;
  poster?: string;
  accent: "orange" | "pink" | "violet";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cunos",
    client: "Cunos",
    industry: "Senior finance consultancy",
    location: "London",
    services: ["SEO", "Content", "Web Design"],
    timeline: "5 months",
    headline: "5x consultations from organic search",
    body:
      "An advice-only firm punching below its weight on Google. We built topical authority across pension drawdown and IHT planning, and shipped a redesign that finally matched the brand.",
    metrics: [
      { value: "5x", label: "Consultations" },
      { value: "7x", label: "Organic traffic" },
      { value: "#1", label: "12 target keywords" },
    ],
    video: "video/cases/finance-skyline.mp4",
    accent: "violet",
  },
  {
    slug: "cheshire-conservatory-roofs",
    client: "Cheshire Conservatory Roofs",
    industry: "Roofing & home improvement",
    location: "Cheshire",
    services: ["Local SEO", "Google Ads"],
    timeline: "3 months",
    headline: "8x more booked jobs per week",
    body:
      "We took a five-page brochure site and turned it into a lead engine. Quote-form changes, GBP optimisation, and a tight Performance Max campaign filled the diary inside a quarter.",
    metrics: [
      { value: "8x", label: "Booked jobs" },
      { value: "£42", label: "Cost per lead" },
      { value: "9/10", label: "Quote-to-job" },
    ],
    video: "video/cases/roofing.mp4",
    accent: "orange",
  },
  {
    slug: "fantastic-finish",
    client: "Fantastic Finish",
    industry: "Commercial cleaning",
    location: "Manchester",
    services: ["SEO", "Web Design", "Google Ads"],
    timeline: "4 months",
    headline: "13x more monthly leads",
    body:
      "A regional commercial cleaner with strong reviews but a near-invisible Google footprint. We rebuilt the site, restructured the service architecture and tightened paid search around high-intent commercial terms.",
    metrics: [
      { value: "13x", label: "More leads" },
      { value: "60", label: "Days to page 1" },
      { value: "8x", label: "ROAS" },
    ],
    video: "video/cases/cleaning.mp4",
    accent: "pink",
  },
  {
    slug: "stride-and-co",
    client: "Stride & Co.",
    industry: "Last-mile logistics",
    location: "Birmingham",
    services: ["SEO", "Web Design"],
    timeline: "6 months",
    headline: "11x more booked deliveries",
    body:
      "Same traffic, more than ten times the booked deliveries. We rewrote every service page, fixed Core Web Vitals, and rebuilt the quote-request flow around a single primary action.",
    metrics: [
      { value: "11x", label: "Conversions" },
      { value: "1.5x", label: "Avg. order value" },
      { value: "1.8s", label: "LCP" },
    ],
    video: "video/cases/logistics.mp4",
    accent: "violet",
  },
  {
    slug: "loomframe",
    client: "Loomframe",
    industry: "B2B operations software",
    location: "Bristol",
    services: ["SEO", "Content", "Conversion"],
    timeline: "8 months",
    headline: "18x more organic traffic",
    body:
      "Built the content engine alongside the founders. From a standing start, the site now ranks for 800+ commercial queries and books demos every working day without paid spend.",
    metrics: [
      { value: "18x", label: "Organic traffic" },
      { value: "800+", label: "Ranking keywords" },
      { value: "12", label: "Demos / week" },
    ],
    video: "video/cases/digital.mp4",
    accent: "pink",
  },
];

export const caseStudiesDe: CaseStudy[] = [
  {
    slug: "cunos",
    client: "Cunos",
    industry: "Finanzberatung",
    location: "London",
    services: ["SEO", "Content", "Webdesign"],
    timeline: "5 Monate",
    headline: "5x mehr Beratungen über Google",
    body:
      "Die Marke hatte klare Expertise, aber zu wenig Sichtbarkeit. Wir bauten Themenautorität rund um Pension Drawdown und Erbschaftsteuer auf und gaben der Website eine Architektur, die Vertrauen schneller erklärt.",
    metrics: [
      { value: "5x", label: "Beratungen" },
      { value: "7x", label: "Organischer Traffic" },
      { value: "#1", label: "12 Ziel-Keywords" },
    ],
    video: "video/cases/finance-skyline.mp4",
    accent: "violet",
  },
  {
    slug: "cheshire-conservatory-roofs",
    client: "Cheshire Conservatory Roofs",
    industry: "Dach & Hausbau",
    location: "Cheshire",
    services: ["Local SEO", "Google Ads"],
    timeline: "3 Monate",
    headline: "8x mehr gebuchte Aufträge pro Woche",
    body:
      "Aus einer einfachen Broschüren-Seite wurde ein Lead-System. Angebotsformular, Google Business Profile und eine enge Performance-Max-Kampagne füllten den Kalender innerhalb eines Quartals.",
    metrics: [
      { value: "8x", label: "Gebuchte Jobs" },
      { value: "£42", label: "Kosten pro Lead" },
      { value: "9/10", label: "Quote zu Auftrag" },
    ],
    video: "video/cases/roofing.mp4",
    accent: "orange",
  },
  {
    slug: "fantastic-finish",
    client: "Fantastic Finish",
    industry: "Gewerbereinigung",
    location: "Manchester",
    services: ["SEO", "Webdesign", "Google Ads"],
    timeline: "4 Monate",
    headline: "13x mehr Anfragen pro Monat",
    body:
      "Starke Bewertungen, aber kaum Google-Präsenz. Wir bauten die Website neu, ordneten die Service-Struktur und fokussierten Paid Search auf kaufbereite gewerbliche Suchbegriffe.",
    metrics: [
      { value: "13x", label: "Mehr Leads" },
      { value: "60", label: "Tage bis Seite 1" },
      { value: "8x", label: "ROAS" },
    ],
    video: "video/cases/cleaning.mp4",
    accent: "pink",
  },
  {
    slug: "stride-and-co",
    client: "Stride & Co.",
    industry: "Logistik",
    location: "Birmingham",
    services: ["SEO", "Webdesign"],
    timeline: "6 Monate",
    headline: "11x mehr gebuchte Lieferungen",
    body:
      "Gleicher Traffic, deutlich mehr Abschlüsse. Wir schrieben jede Service-Seite neu, verbesserten Core Web Vitals und reduzierten den Anfrageprozess auf eine klare Hauptaktion.",
    metrics: [
      { value: "11x", label: "Conversions" },
      { value: "1,5x", label: "Warenkorbwert" },
      { value: "1,8s", label: "LCP" },
    ],
    video: "video/cases/logistics.mp4",
    accent: "violet",
  },
  {
    slug: "loomframe",
    client: "Loomframe",
    industry: "B2B-Software",
    location: "Bristol",
    services: ["SEO", "Content", "Conversion"],
    timeline: "8 Monate",
    headline: "18x mehr organischer Traffic",
    body:
      "Gemeinsam mit den Gründern entstand ein Content-System von null. Heute rankt die Website für 800+ kommerzielle Suchanfragen und bucht Demo-Termine ohne laufende Paid-Spend-Abhängigkeit.",
    metrics: [
      { value: "18x", label: "Organischer Traffic" },
      { value: "800+", label: "Ranking-Keywords" },
      { value: "12", label: "Demos pro Woche" },
    ],
    video: "video/cases/digital.mp4",
    accent: "pink",
  },
];

/**
 * Reviews — deutsche Platzhalter; später durch echte verifizierte
 * Google-Bewertungen ersetzen.
 */
export type Review = {
  name: string;
  role: string;
  quote: string;
  when?: string;
  initial?: string;
};

export const testimonials: Review[] = [
  {
    name: "Stefan Bauer",
    role: "Inhaber Online-Shop",
    when: "Verifizierte Google-Bewertung",
    quote:
      "Ich kann NEO nicht genug empfehlen. Als Inhaber eines kleinen Online-Shops habe ich darum gekämpft, regelmäßig Traffic anzuziehen und Verkäufe zu generieren — das Team hat das für uns gedreht.",
  },
  {
    name: "Beate Sorensen",
    role: "Selbstständige Unternehmerin",
    when: "Verifizierte Google-Bewertung",
    quote:
      "Die Zusammenarbeit mit NEO war hervorragend. Sie haben mir eine starke Website gebaut, SEO und Google Ads aufgesetzt, und nicht lange später kamen echte Anfragen rein. Alles in Klartext erklärt.",
  },
  {
    name: "Fabienne M.",
    role: "Gründerin",
    when: "Verifizierte Google-Bewertung",
    quote:
      "Pünktlich, organisiert und effizient — nur einige ihrer besten Eigenschaften. Bessere Agentur ist nicht zu finden. Die Kommunikation ist ehrlich gesagt die beste, die ich je hatte.",
  },
  {
    name: "Matthias Peard",
    role: "Geschäftsführer",
    when: "Verifizierte Google-Bewertung",
    quote:
      "Das Team ist leicht zu erreichen, antwortet schnell und erklärt alles in Klartext. Endlich fühle ich mich beim Marketing sicher — und die Anfragen kommen rein.",
  },
];

export const faqs = [
  {
    q: "Wie lange dauert es, bis ich Ergebnisse sehe?",
    a: "Manche Kunden sehen Ranking-Bewegung in der ersten Woche. Echtes Lead-Wachstum zeigt sich meist zwischen Woche 2 und 6. Was Sie konkret erwarten können, sagen wir Ihnen nach dem Audit — ohne Schönreden.",
  },
  {
    q: "Gibt es Verträge oder Lock-Ins?",
    a: "Wir arbeiten Monat für Monat nach einer kurzen Mindestlaufzeit für den ordentlichen Setup. Wenn wir nicht liefern, können Sie gehen. Wir verdienen lieber den nächsten Monat, als Sie darin festzuhalten.",
  },
  {
    q: "Was steckt im kostenlosen Erstgespräch?",
    a: "Eine kurze Loom-Walkthrough plus ein schriftliches Ein-Seiten-Audit, das technische Probleme, Ranking-Lücken und die drei wirkungsvollsten Fixes aufzeigt. Gehört Ihnen — egal, ob Sie mit uns arbeiten oder nicht.",
  },
  {
    q: "Wie ist die Preisgestaltung?",
    a: "Feste Monatspauschalen ohne Überraschungen. Wir scopen die Arbeit nach Ihren Zielen und Ihrem Budget. Wir sind nicht die billigste Agentur, aber ehrlich darüber, was jeder Euro bringt.",
  },
  {
    q: "Garantieren Sie wirklich Ergebnisse?",
    a: "Wir garantieren die Arbeit, das Reporting und die Antwortzeit. Wir sind sicher genug in unserem Prozess, das schriftlich zu geben — und zeigen jeden Monat die Mathematik.",
  },
  {
    q: "Mit welchen Branchen arbeiten Sie?",
    a: "Premium-Kliniken, Handwerk, E-Commerce, professionelle Dienstleister und lokale deutsche Unternehmen. Wenn Ihre Kunden Google nutzen, können wir helfen.",
  },
];

export const heroEyebrow = {
  ratingText: "5,0 · +20 Bewertungen",
};

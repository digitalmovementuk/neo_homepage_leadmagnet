export type Lang = "de" | "en";

/**
 * Full string-table for the NEO homepage. German is the canonical version.
 * British English follows agency-tone (concise, no Americanisms — "organise"
 * not "organize", "behaviour" not "behavior", etc.).
 *
 * Add new strings here, not inline in components.
 */

type NavLink = { label: string; href: string };

export type Translations = {
  nav: {
    links: NavLink[];
    cta: string;
    menuOpen: string;
    menuClose: string;
    languageLabel: string;
    languages: { de: string; en: string };
  };
  hero: {
    eyebrow: string;
    headlineTop: string;
    headlineBottom: string;
    sub: string;
    services: string[];
    priceLine: string;
    priceLineSub: string;
    cta: string;
    pauseLabel: string;
    playLabel: string;
  };
  snapshot: {
    title: string;
    tagline: string;
    items: { index: string; label: string; headline: string; detail: string }[];
  };
  testimonials: {
    eyebrow: string;
    headline: string;
    description: string;
    prevLabel: string;
    nextLabel: string;
    soundOn: string;
    soundOff: string;
    visit: string;
    items: { name: string; role: string; description: string }[];
  };
  whyManifesto: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    closing: string;
    founderName: string;
    founderRole: string;
  };
  principles: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: { title: string; body: string; kicker: string }[];
  };
  services: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: { key: string; title: string; promise: string; detail: string; bullets: string[] }[];
  };
  cases: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    serviceLabel: string;
    timelineLabel: string;
  };
  comparison: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    columns: { other: string; neo: string };
    rows: { topic: string; other: string; neo: string }[];
  };
  process: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    steps: { n: string; eta: string; title: string; body: string }[];
  };
  metrics: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: { value: number; suffix: string; label: string }[];
  };
  founder: {
    eyebrow: string;
    headlinePre: string;
    headlineSoft: string;
    paragraphs: string[];
    signature: string;
    signatureBlock: string;
  };
  contact: {
    eyebrow: string;
    headlinePre: string;
    headlineSoft: string;
    intro: string;
    form: { name: string; email: string; company: string; message: string; submit: string; success: string };
    tiles: { kicker: string; value: string }[];
  };
  footer: {
    blurb: string;
    sections: { title: string; links: NavLink[] }[];
    rights: string;
    legal: NavLink[];
  };
  sticky: { cta: string; arrow: string };
  modal: {
    eyebrow: string;
    headline: string;
    sub: string;
    name: string;
    email: string;
    submit: string;
    dismiss: string;
  };
  servicePages: ServicePage;
};

export type ServicePageContent = {
  slug: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headlineTop: string;
    headlineBottom: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    chips: string[];
    video?: string;
  };
  whatItIs: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    paragraphs: string[];
    audience: string;
  };
  outcomes: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: {
      kicker: string;
      value: string;
      unit: string;
      title: string;
      body: string;
    }[];
  };
  methodology: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    phases: {
      kicker: string;
      title: string;
      body: string;
      bullets?: string[];
    }[];
  };
  deliverables: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    columns: { title: string; items: string[] }[];
  };
  process: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    steps: { eta: string; title: string; body: string }[];
  };
  stack: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: { name: string; body: string }[];
  };
  faq: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    intro: string;
    items: { q: string; a: string }[];
  };
  leadMagnet: {
    eyebrow: string;
    headline: string;
    body: string;
    bullets: string[];
    cta: string;
    note: string;
    modal: {
      eyebrow: string;
      headline: string;
      sub: string;
      submit: string;
      successHeadline: string;
      successBody: string;
    };
  };
  finalCta: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    body: string;
    primary: string;
  };
};

export type ServicePage = {
  seo: ServicePageContent;
  googleAds: ServicePageContent;
  socialMedia: ServicePageContent;
  websites: ServicePageContent;
};

const de: Translations = {
  nav: {
    links: [
      { label: "Was wir tun", href: "#services" },
      { label: "Kundenprojekte", href: "#cases" },
      { label: "Zahlen", href: "#metrics" },
      { label: "Kontakt", href: "#contact" },
    ],
    cta: "Erstgespräch",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    languageLabel: "Sprache",
    languages: { de: "Deutsch", en: "English" },
  },

  hero: {
    eyebrow: "High-End Performance Marketing",
    headlineTop: "Digitales",
    headlineBottom: "Wachstum.",
    sub: "Wir machen Ihre Website zum Asset und generieren kontinuierliche Kundenanfragen.",
    services: [
      "Search Engine Optimization",
      "AI Search Optimization",
      "High-End Website Development",
    ],
    priceLine: "Kostenloses Erstgespräch",
    priceLineSub: "Antwort in 24 h",
    cta: "Start",
    pauseLabel: "Hero-Video pausieren",
    playLabel: "Hero-Video starten",
  },

  snapshot: {
    title: "Snapshot",
    tagline: "In 30 Sekunden klar — was, für wen, was Sie bekommen.",
    items: [
      {
        index: "01",
        label: "Was",
        headline: "Mehr Kundenanfragen.",
        detail: "Performance Marketing & SEO, das messbar Umsatz bringt.",
      },
      {
        index: "02",
        label: "Für wen",
        headline: "Für Inhaber & Mittelstand.",
        detail: "Beratung, Handwerk, Dienstleister, B2B.",
      },
      {
        index: "03",
        label: "Was Sie bekommen",
        headline: "Kontinuierliche Kundenanfragen.",
        detail: "Festpreis, 90 Tage, keine Mindestlaufzeit.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Stimmen unserer Kunden",
    headline: "In ihren eigenen Worten.",
    description:
      "Fünf Inhaber erzählen, was sich in den ersten 90 Tagen mit NEO messbar verändert hat.",
    prevLabel: "Vorherige Stimme",
    nextLabel: "Nächste Stimme",
    soundOn: "Ton an",
    soundOff: "Ton",
    visit: "Website ansehen",
    items: [
      {
        name: "Ayham Muhrez",
        role: "CEO & Founder Azura Living Bali",
        description:
          "Von 0 auf Seite 1 für 'villa rental bali' in 90 Tagen — kontinuierliche Direktbuchungen statt Plattform-Kommission.",
      },
      {
        name: "Faisaö Chauhan",
        role: "Director ADDRESSBALI®",
        description:
          "Premium-Villenmarke. Komplettes Website-Re-Design plus Performance-Marketing-Sprint, 8× Anfragen-Pipeline.",
      },
      {
        name: "Enting Man",
        role: "Founder & Director Cunos",
        description:
          "B2B-Beratungsmarke. Klare Positionierung, SEO-First Architektur, qualifizierte Inbound-Leads ab Tag 30.",
      },
      {
        name: "Dana",
        role: "Marketing Director Pentadoc",
        description:
          "Document-Intelligence-Plattform. Editoriale Homepage, klare Conversion-Architektur, Demo-Requests verdoppelt.",
      },
      {
        name: "Johannes",
        role: "Founder & CEO CX",
        description:
          "Customer-Excellence-Plattform. Sunset-Hero plus Service-Karten. SEO-Architektur trägt das B2B-Pipeline-Wachstum.",
      },
    ],
  },

  whyManifesto: {
    eyebrow: "Wofür wir stehen",
    headline: "Commitment.",
    paragraphs: [
      "Unsere Kundenprojekte vereint ein Ziel: Unternehmenswachstum durch digitales Marketing. Erfolgreich sind wir, wenn unsere Kunden ihren Umsatz steigern.",
      "NEO THE AGENCY® ist eine High-End Performance Marketing-Agentur. Projekterfolge sind bei uns messbar. Wir liefern Kundenanfragen.",
      "Als ehemalige Strategieberater, Unternehmensberater und Projektmanager bekommen unsere Kunden das Komplettpaket: Digitalstrategie, professionelles Projektmanagement und Expertentum.",
    ],
    closing: "Customer Excellence ist unser Kompass. Deshalb arbeiten wir mit drei klaren Prinzipien.",
    founderName: "Raoul Müller",
    founderRole: "Gründer · NEO THE AGENCY",
  },

  principles: {
    eyebrow: "Wie wir arbeiten",
    headlineMain: "Drei Prinzipien.",
    headlineSub: "Eine Methode.",
    intro:
      "Customer Excellence ist abstrakt. Konkret heißt das für uns: Commitment, Performance, Fairer Preis. Drei Sätze, die jeden Tag entscheiden, was wir tun — und was wir lassen.",
    items: [
      {
        title: "Commitment",
        body:
          "Wir gehen mit. Sie bekommen den Gründer am Telefon, nicht einen Account-Manager mit Excel-Tabelle. Jedes Projekt wird zu unserem.",
        kicker: "Prinzip",
      },
      {
        title: "Performance",
        body:
          "Wir messen Anfragen, nicht Klicks. Jeden Monat sehen Sie, was sich bewegt hat — und warum. Kein Schönreden, keine Eitelkeitsmetriken.",
        kicker: "Prinzip",
      },
      {
        title: "Fairer Preis",
        body:
          "Festpreis vom ersten Tag an. Keine Setup-Surprise, keine Mindestlaufzeit, keine versteckten Stunden. Sie wissen, was Sie bekommen.",
        kicker: "Prinzip",
      },
    ],
  },

  services: {
    eyebrow: "Was wir tun",
    headlineMain: "Vier Disziplinen.",
    headlineSub: "Eine Pipeline.",
    intro:
      "Eng verzahnt, weil sich Wachstum nicht in Silos einsperren lässt. Klicken Sie sich durch — oder lassen Sie den Slider laufen.",
    items: [
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
      },
    ],
  },

  cases: {
    eyebrow: "Kundenprojekte",
    headlineMain: "Echte Marken.",
    headlineSub: "Echte Zahlen.",
    intro:
      "Eine Auswahl. Mit allen Kunden seit fünf Jahren am Tisch — oder gar nicht erst angefangen.",
    serviceLabel: "Leistungen",
    timelineLabel: "Zeitraum",
  },

  comparison: {
    eyebrow: "NEO vs. Andere",
    headlineMain: "Was wir anders machen.",
    headlineSub: "Sechs Punkte.",
    intro:
      "Damit Sie wissen, worauf Sie sich einlassen — bevor Sie sich einlassen.",
    columns: { other: "Andere Agenturen", neo: "NEO THE AGENCY" },
    rows: [
      {
        topic: "Vertragslaufzeit",
        other: "12 oder 24 Monate, schwer zu beenden",
        neo: "90-Tage-Sprint, monatlich verlängerbar",
      },
      {
        topic: "Reporting",
        other: "Eitelkeitsmetriken in 30-seitigen PDFs",
        neo: "Anfragen, Umsatz, Quellen — eine Seite",
      },
      {
        topic: "Ansprechpartner",
        other: "Account-Manager, der Excel vorliest",
        neo: "Der Gründer, am Telefon",
      },
      {
        topic: "Preisgestaltung",
        other: "Stundensätze, Setup-Fees, Mehrkosten",
        neo: "Festpreis, alles inklusive, transparent",
      },
      {
        topic: "Ziel",
        other: "Mehr Klicks, mehr Reichweite",
        neo: "Mehr qualifizierte Anfragen",
      },
      {
        topic: "Lock-in",
        other: "Daten und Accounts beim Wechsel verloren",
        neo: "Sie besitzen alles vom ersten Tag",
      },
    ],
  },

  process: {
    eyebrow: "Der 90-Tage-Sprint",
    headlineMain: "Vier Meilensteine.",
    headlineSub: "Keine Überraschungen.",
    intro:
      "Was an Tag 1, 30, 60 und 90 passiert. Wir sagen es vorher, wir halten uns dran, und wir zeigen Ihnen jeden Monat die Mathematik.",
    steps: [
      {
        n: "01",
        eta: "Tag 1",
        title: "Audit & Kickoff",
        body:
          "Technisches SEO-Audit, Kanal-Diagnose, Konkurrenz-Mapping. 30-Min-Screen-Share, ein Gründer am Bildschirm.",
      },
      {
        n: "02",
        eta: "Tag 30",
        title: "Launch",
        body:
          "Tracking live, neue Landingpages online, Google-Ads-Kampagnen aktiv, On-Page-SEO-Fixes ausgeliefert.",
      },
      {
        n: "03",
        eta: "Tag 60",
        title: "Erste Page-1-Keywords",
        body:
          "Erste kommerzielle Keywords ranken auf Seite 1. Pipeline füllt sich, monatlicher Klartext-Report mit den nächsten Hebeln.",
      },
      {
        n: "04",
        eta: "Tag 90",
        title: "8× Pipeline",
        body:
          "Gemessene Steigerung qualifizierter Anfragen. Ab hier monatliche Optimierung — keine Überraschungen, keine Mindestlaufzeit.",
      },
    ],
  },

  metrics: {
    eyebrow: "Zahlen",
    headlineMain: "Was wirklich zählt.",
    headlineSub: "Anfragen, nicht Klicks.",
    intro: "Vier Zahlen aus laufenden Kunden — gemessen, nicht behauptet.",
    items: [
      { value: 8, suffix: "×", label: "mehr Anfragen pro Monat" },
      { value: 90, suffix: "", label: "Tage bis Google Seite 1" },
      { value: 4, suffix: "", label: "Kundenprojekte abgeschlossen" },
    ],
  },

  founder: {
    eyebrow: "Eine Notiz vom Gründer",
    headlinePre: "Sie reden mit der Person,",
    headlineSoft: "die auch liefert.",
    paragraphs: [
      "Ich habe NEO gegründet, weil ich es leid war zu sehen, wie gute Unternehmen Tausende Euro pro Monat an Agenturen zahlen, die ihnen Eitelkeitsmetriken zeigen statt echte Anfragen im Posteingang.",
      "Bei NEO bekommen Sie keinen Account-Manager, der eine Excel-Tabelle vorliest. Sie bekommen mich am Telefon, einen Festpreis ohne Lock-in, und einen 90-Tage-Sprint, hinter dem ich mit meinem Namen stehe.",
      "Wenn das nach Ihrer Art zu arbeiten klingt — schreiben Sie mir unten. Ich antworte werktags innerhalb 24 h, persönlich.",
    ],
    signature: "Raoul",
    signatureBlock: "Raoul Müller · Gründer, NEO THE AGENCY",
  },

  contact: {
    eyebrow: "Schreiben Sie uns",
    headlinePre: "Lassen Sie uns",
    headlineSoft: "starten.",
    intro:
      "Kostenloses Erstgespräch. Antwort werktags innerhalb 24 h, persönlich vom Gründer.",
    form: {
      name: "Name",
      email: "E-Mail",
      company: "Unternehmen (optional)",
      message: "Was möchten Sie erreichen?",
      submit: "Nachricht senden",
      success: "Danke. Sie hören innerhalb von 24 h von uns.",
    },
    tiles: [
      { kicker: "Telefon", value: "+49 30 123 4567" },
      { kicker: "E-Mail", value: "kontakt@neo-agency.de" },
      { kicker: "Adresse", value: "Hardenbergstraße 1, 10623 Berlin" },
    ],
  },

  footer: {
    blurb:
      "NEO THE AGENCY ist eine High-End Performance Marketing-Agentur. Wir machen Websites zu Assets und liefern qualifizierte Anfragen.",
    sections: [
      {
        title: "Leistungen",
        links: [
          { label: "SEO", href: "#services" },
          { label: "Google Ads", href: "#services" },
          { label: "Social Media", href: "#services" },
          { label: "Websites", href: "#services" },
        ],
      },
      {
        title: "Agentur",
        links: [
          { label: "Wofür wir stehen", href: "#why" },
          { label: "Wie wir arbeiten", href: "#principles" },
          { label: "Kundenprojekte", href: "#cases" },
          { label: "Kontakt", href: "#contact" },
        ],
      },
    ],
    rights: "© NEO THE AGENCY. Alle Rechte vorbehalten.",
    legal: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
  },

  sticky: {
    cta: "Kostenloses Erstgespräch",
    arrow: "→",
  },

  modal: {
    eyebrow: "Bevor Sie weiterlesen",
    headline: "Kostenloses Audit Ihrer Website.",
    sub: "30-Minuten-Walkthrough plus Ein-Seiten-Audit per E-Mail. Egal, ob Sie mit uns arbeiten oder nicht.",
    name: "Name",
    email: "E-Mail",
    submit: "Audit anfordern",
    dismiss: "Später vielleicht",
  },

  servicePages: {
    seo: {
      slug: "seo",
      meta: {
        title: "SEO für Inhaber & Mittelstand · NEO THE AGENCY",
        description:
          "Google Seite 1 in 90 Tagen. Technisches SEO, Content der klickt, und Linkaufbau, der sich für inhabergeführte Unternehmen rechnet. Festpreis, kein Lock-in.",
      },
      hero: {
        eyebrow: "Suchmaschinenoptimierung · für Inhaber & Mittelstand",
        headlineTop: "Google.",
        headlineBottom: "Seite 1.",
        sub: "Wir bringen Ihre Website auf Seite 1 für die Begriffe, die Ihre Kunden tippen — in 90 Tagen, mit Festpreis und ohne Lock-in. Inhabergeführt, Klartext, messbar.",
        primaryCta: "Kostenloser SEO-Audit",
        secondaryCta: "Erstgespräch buchen",
        chips: ["Technisches SEO", "Content & On-Page", "Linkaufbau", "Lokales SEO"],
        video: "video/seo-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "SEO ohne Buzzwords.",
        headlineSub: "Anfragen statt Klicks.",
        paragraphs: [
          "SEO ist kein Trick und keine Black Box. Es ist konsequente Arbeit an drei Hebeln: technische Sauberkeit, Inhalte, die kommerzielle Suchbegriffe abbilden, und Autorität durch saubere Verlinkung.",
          "Bei NEO heißt das: Wir prüfen Ihre Website auf Crawler-Probleme, Geschwindigkeit und Indexierung. Wir bauen Inhalte, die Ihre Kunden tatsächlich suchen — und schreiben sie so, dass sie konvertieren. Wir bauen Autorität langsam, aber mit Substanz.",
          "Sie sehen jeden Monat in einer Klartext-Notiz, was sich bewegt hat — Rankings, Traffic, Anfragen — und was als Nächstes passiert. Kein Schönreden, keine 50-Seiten-PDFs.",
        ],
        audience:
          "Gemacht für inhabergeführte Unternehmen und Mittelstand, die wachsen wollen — nicht für Konzerne, die ein neues KPI-Deck brauchen.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die zählen.",
        intro:
          "Median über aktive Kundenprojekte der letzten 12 Monate. Branchen quer durch — Beratung, Handwerk, Premium-Dienstleister, B2B.",
        items: [
          {
            kicker: "Pipeline",
            value: "8",
            unit: "×",
            title: "mehr qualifizierte Anfragen",
            body: "Durchschnittliche Steigerung der monatlichen Anfragen aus organischer Suche nach den ersten 6 Monaten.",
          },
          {
            kicker: "Sichtbarkeit",
            value: "90",
            unit: "Tage",
            title: "bis Google Seite 1",
            body: "Vom Kick-off bis zum ersten kommerziellen Keyword auf der ersten Seite. Median — manche Kunden sind schneller.",
          },
          {
            kicker: "Trust",
            value: "5,0",
            unit: "★",
            title: "verifizierte Bewertungen",
            body: "20+ Bewertungen über inhabergeführte Kunden, gemessen seit Q1 2026.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir es tun",
        headlineMain: "Vier Phasen.",
        headlineSub: "Keine Geheimnisse.",
        intro:
          "Unsere Methodik ist nicht patentiert — sie ist diszipliniert. Wir machen die unsichtbare Arbeit sichtbar, weil Sie verstehen sollen, wofür Sie zahlen.",
        phases: [
          {
            kicker: "Phase 1 · Tag 1–7",
            title: "Audit & Datenanker",
            body: "Wir öffnen die Motorhaube. Crawler-Analyse, Indexierungs-Check, Core Web Vitals, Content-Inventur, Keyword-Mapping gegen Wettbewerb.",
            bullets: [
              "Technisches SEO-Audit mit 50+ Checkpoints",
              "Search Console + GA4 als Source of Truth",
              "Wettbewerber-Gap-Analyse",
              "Schriftlicher Audit-Report mit Priorisierung",
            ],
          },
          {
            kicker: "Phase 2 · Tag 8–30",
            title: "Technisches Fundament",
            body: "Bevor neuer Content kommt, muss das Fundament stehen. Wir beheben Crawler-Fehler, optimieren Core Web Vitals, strukturieren die URL-Hierarchie.",
            bullets: [
              "Sitemap & robots.txt sauber aufgesetzt",
              "Core Web Vitals < 2,5 s LCP, < 0,1 CLS",
              "Schema.org Markup (LocalBusiness, Service, FAQ)",
              "Interne Verlinkung & Page-Architektur",
            ],
          },
          {
            kicker: "Phase 3 · Tag 31–60",
            title: "Content-Engine",
            body: "Wir schreiben Inhalte, die Ihre Kunden tippen — Service-Pages, Vergleichs-Inhalte, FAQ-Hubs. Alle redaktionell, alle conversion-orientiert.",
            bullets: [
              "Service-Pages mit kommerzieller Suchabsicht",
              "Vergleichs- und Comparison-Content",
              "Lokale Landingpages (wenn relevant)",
              "FAQ-Hubs für Long-Tail-Traffic",
            ],
          },
          {
            kicker: "Phase 4 · Tag 61–90",
            title: "Autorität & Skalierung",
            body: "Saubere Links — keine PBNs, kein Spam. Digital PR, Branchen-Kataloge, Partnerschaften. Plus monatlicher Klartext-Report.",
            bullets: [
              "Digital-PR-Kampagne (3–5 Platzierungen / Quartal)",
              "Verzeichnis- und Branchen-Listings",
              "Partner- und Gast-Beiträge",
              "Monatlicher Klartext-Report mit nächsten Hebeln",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro:
          "Festpreis. Keine Add-ons, keine Setup-Surprise. Was unten steht, ist im 90-Tage-Sprint enthalten — und auch danach jeden Monat, solange Sie wollen.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Technisches SEO-Audit",
              "Keyword-Strategie & -Mapping",
              "Content-Plan über 6 Monate",
              "Wettbewerber-Analyse",
              "Conversion-Architektur",
            ],
          },
          {
            title: "Execution",
            items: [
              "Technische Fixes (Speed, Crawler, Indexierung)",
              "Content-Erstellung (4–8 Pages / Monat)",
              "On-Page-Optimierung",
              "Linkaufbau (3–5 Quality-Links / Quartal)",
              "Schema.org & strukturierte Daten",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live-Dashboard (Rankings, Traffic, Anfragen)",
              "Monatlicher Klartext-Report (eine Seite)",
              "Wöchentliche WhatsApp-Updates",
              "Direkt der Gründer — kein Account-Manager",
              "Slack- oder E-Mail-Direkt-Zugang",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 90-Tage-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Klartext, kein Schönreden.",
        intro:
          "Was an Tag 1, 30, 60 und 90 passiert. Wir sagen es vorher, wir halten uns dran, und wir zeigen Ihnen jeden Monat die Mathematik.",
        steps: [
          { eta: "Tag 1", title: "Audit & Kickoff", body: "Audit-Report im Posteingang. 60-Min-Strategy-Call. Sie verstehen, wo Sie stehen." },
          { eta: "Tag 30", title: "Fundament steht", body: "Technisches SEO sauber. Erste Content-Pages live. Tracking läuft, Daten fließen." },
          { eta: "Tag 60", title: "Erste Page-1-Keywords", body: "Erste kommerzielle Keywords ranken auf Seite 1. Pipeline beginnt sich zu füllen." },
          { eta: "Tag 90", title: "8× Pipeline (Median)", body: "Messbare Steigerung qualifizierter Anfragen. Ab hier monatlich, ohne Mindestlaufzeit." },
        ],
      },
      stack: {
        eyebrow: "Tools & Standards",
        headlineMain: "Womit wir arbeiten.",
        headlineSub: "Keine Geheimnisse, keine Lock-ins.",
        intro:
          "Industrie-Standard-Tools, sauber integriert. Sie behalten alle Zugänge — auch wenn Sie irgendwann ohne uns weitermachen wollen.",
        items: [
          { name: "Google Search Console", body: "Source of Truth für Rankings, Klicks, Indexierung." },
          { name: "GA4 + Tag Manager", body: "Conversion-Tracking sauber aufgesetzt — Server-Side wo nötig." },
          { name: "Ahrefs / Semrush", body: "Backlink-Monitoring, Wettbewerber-Analyse, Keyword-Recherche." },
          { name: "Screaming Frog", body: "Technische Audits, Crawler-Diagnose, Site-Struktur-Mapping." },
          { name: "Schema.org", body: "Strukturierte Daten — LocalBusiness, Service, FAQ, Organization." },
          { name: "PageSpeed Insights / Lighthouse", body: "Core Web Vitals, Speed-Optimierung, Mobile-First-Audits." },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt geantwortet.",
        intro: "Was wir am häufigsten von Inhabern hören, bevor sie buchen.",
        items: [
          { q: "Wie schnell sehe ich erste Ergebnisse?", a: "Ranking-Bewegung in den ersten 2–4 Wochen, erste Page-1-Keywords nach 60–90 Tagen. Echte Anfragen-Steigerung typischerweise ab Monat 3. Was Sie konkret erwarten können, sagen wir Ihnen nach dem Audit — ohne Schönreden." },
          { q: "Was ist im Festpreis enthalten?", a: "Alles, was unter ‚Was Sie bekommen‘ steht. Keine Add-ons, keine Setup-Fee, keine Mehrkosten für ‚mehr Content‘ oder ‚mehr Links‘. Wenn Sie skalieren wollen, sprechen wir — sonst bleibt der Preis stabil." },
          { q: "Gibt es eine Mindestlaufzeit?", a: "Nein. Wir arbeiten Monat für Monat nach dem 90-Tage-Sprint. Wenn wir nicht liefern, können Sie gehen. Wir verdienen lieber den nächsten Monat, als Sie darin festzuhalten." },
          { q: "Wer macht die eigentliche Arbeit?", a: "Der Gründer (ich, Raoul) plus zwei Senior-SEO-Spezialisten. Kein Account-Manager-Pingpong, keine Junior, die hinter Ihrem Rücken einarbeitet. Wer Sie im Erstgespräch trifft, liefert auch." },
          { q: "Wie passt SEO zu Google Ads?", a: "Sehr gut — wir betreiben oft beides parallel. SEO baut langfristige Sichtbarkeit, Ads kaufen kurzfristig Traffic. Wenn beides sauber aufgesetzt ist, ergibt das eine Pipeline, die nicht aufhört zu wachsen." },
          { q: "Können Sie für meine Branche Ergebnisse garantieren?", a: "Ranking-Garantien sind unseriös — wir geben keine. Was wir tun: Wir nehmen keine Kunden an, bei denen wir nicht überzeugt sind, dass es funktioniert. Wenn das Audit zeigt, dass SEO der falsche Hebel ist, sagen wir Ihnen das." },
          { q: "Was passiert nach den 90 Tagen?", a: "Sie entscheiden. Die meisten Kunden bleiben monatlich, weil das Wachstum erst dann skaliert. Manche pausieren, kommen später wieder. Sie behalten alle Zugänge, alle Daten, alle Inhalte — auch wenn Sie morgen aufhören." },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie sich entscheiden",
        headline: "Kostenloser SEO-Audit für Ihre Website.",
        body: "Wir prüfen Ihre Site auf 50+ technische und inhaltliche Faktoren und schicken Ihnen einen 1-Seiten-Klartext-Report. Was kaputt ist, was funktioniert, und die drei wirkungsvollsten nächsten Hebel — egal, ob Sie mit uns arbeiten oder nicht.",
        bullets: [
          "1-Seiten-Audit per E-Mail in 24 h",
          "30-Min-Loom-Walkthrough",
          "Konkrete nächste Schritte priorisiert",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Audit kostenlos anfordern",
        note: "Werktags innerhalb von 24 h im Posteingang. Kein Spam.",
        modal: {
          eyebrow: "Kostenloser SEO-Audit",
          headline: "Ihr 1-Seiten-Audit, in 24 h.",
          sub: "Schicken Sie uns Ihre Domain — Sie bekommen einen Klartext-Audit per E-Mail. Egal, ob Sie mit uns arbeiten oder nicht.",
          submit: "SEO-Audit anfordern",
          successHeadline: "Erhalten — wir prüfen.",
          successBody: "Ihr Audit landet werktags innerhalb 24 Stunden in Ihrem Posteingang.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Ein Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Sie bekommen eine ehrliche Einschätzung, einen Plan auf einer Seite, und dann entscheiden Sie. Keine Verkaufspräsentation, kein Druck.",
        primary: "Erstgespräch buchen",
      },
    },

    googleAds: {
      slug: "google-ads",
      meta: {
        title: "Google Ads für Inhaber & Mittelstand · NEO THE AGENCY",
        description:
          "ROI-positiver bezahlter Traffic, der druckt. Eng gefasste Search- und Performance-Max-Kampagnen für inhabergeführte Unternehmen. Festpreis, wöchentliches Verschwendungs-Trimming.",
      },
      hero: {
        eyebrow: "Google Ads · für Inhaber & Mittelstand",
        headlineTop: "ROI.",
        headlineBottom: "Nicht Reichweite.",
        sub: "Wir bauen Google-Ads-Kampagnen, die Anfragen drucken, nicht Klicks abrechnen. Eng gefasst, conversion-getrackt, wöchentlich auf Verschwendung getrimmt. Festpreis, kein Lock-in.",
        primaryCta: "Kostenloses Ads-Teardown",
        secondaryCta: "Erstgespräch buchen",
        chips: ["Search Ads", "Performance Max", "Conversion-Tracking", "Landingpage-Tuning"],
        video: "video/google-ads-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Bezahlter Traffic,",
        headlineSub: "der sich rechnet.",
        paragraphs: [
          "Google Ads ist kein Auktions-Glücksspiel. Es ist diszipliniertes Bieten auf kommerzielle Suchabsicht — kombiniert mit Landingpages, die das, was wir kaufen, auch in Anfragen verwandeln.",
          "Bei NEO heißt das: Wir bieten nicht auf Eitelkeitsbegriffe. Wir tracken jede Conversion bis zum Cent. Wir trimmen wöchentlich Verschwendung — Suchbegriffe, Keywords, Anzeigen, die nicht performen, raus. Was bleibt, druckt.",
          "Sie sehen jeden Monat eine Klartext-Notiz: was investiert wurde, was reingekommen ist, ROAS pro Kampagne, und welche drei Hebel als Nächstes kommen.",
        ],
        audience:
          "Gemacht für inhabergeführte Unternehmen und Mittelstand, die ROI über Reach stellen — keine Markenkampagnen, sondern Anfragen-Pipelines.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die Ihr CFO versteht.",
        intro:
          "Median über aktive Ads-Kunden der letzten 12 Monate. Volumen pro Branche unterschiedlich, ROAS-Ziel immer Cash-positiv ab Monat 2.",
        items: [
          {
            kicker: "ROAS",
            value: "5,2",
            unit: "×",
            title: "Return on Ad Spend",
            body: "Median über aktive Sprints — gemessen als Umsatz aus Google-Ads-Anfragen geteilt durch Werbeausgaben.",
          },
          {
            kicker: "CPL",
            value: "−42",
            unit: "%",
            title: "günstigere Anfragen",
            body: "Cost-per-Lead-Reduktion innerhalb der ersten 90 Tage durch Quality-Score-Lift und Negativ-Keywords.",
          },
          {
            kicker: "Speed",
            value: "14",
            unit: "Tage",
            title: "bis erste qualifizierte Anfrage",
            body: "Vom Kick-off bis zur ersten gebuchten Termin. Median — bei B2B-Branchen oft schneller.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir es tun",
        headlineMain: "Vier Phasen.",
        headlineSub: "Disziplin schlägt Lautstärke.",
        intro:
          "Ads-Methodik ist 80 % Setup, 20 % Optimierung. Wenn das Setup sauber ist, optimiert sich vieles selbst — bis dahin ziehen wir an jedem Schräubchen.",
        phases: [
          {
            kicker: "Phase 1 · Tag 1–7",
            title: "Audit & Conversion-Anker",
            body: "Wir prüfen, was bisher lief — Konten, Kampagnen, Tracking. Conversion-Tracking ist meistens das größte Problem.",
            bullets: [
              "Account- und Kampagnen-Audit",
              "Conversion-Tracking auf Server-Side-Niveau",
              "Wettbewerbs-Analyse (Auction Insights, SimilarWeb)",
              "Schriftlicher Audit-Report mit Verschwendungs-Hotspots",
            ],
          },
          {
            kicker: "Phase 2 · Tag 8–30",
            title: "Setup & Landingpages",
            body: "Eng gefasste Kampagnen-Struktur. Conversion-getrackte Landingpages — keine generische Homepage als Ad-Ziel.",
            bullets: [
              "Search-Kampagnen pro Service / Branche",
              "Performance Max für Volumen, eng gefasste Asset-Group",
              "Landingpage-Builds mit Conversion-Architektur",
              "Negativ-Keyword-Liste (200+ Begriffe)",
            ],
          },
          {
            kicker: "Phase 3 · Tag 31–60",
            title: "Optimierung & Trimming",
            body: "Daten kommen rein. Wöchentlich trimmen wir Verschwendung — Begriffe, die Geld kosten ohne Anfragen zu liefern, raus.",
            bullets: [
              "Wöchentlicher Search-Term-Review",
              "Bid-Strategie auf Conversion-Wert umstellen",
              "Anzeigen-A/B-Tests laufend",
              "Quality-Score-Lift durch Landingpage-Tuning",
            ],
          },
          {
            kicker: "Phase 4 · Tag 61–90",
            title: "Skalierung & Reporting",
            body: "Wenn ROAS stabil über Ziel liegt, skalieren wir Volumen. Plus monatlicher Klartext-Report mit Cash-Flow-Mathematik.",
            bullets: [
              "Budget-Skalierung auf profitable Kampagnen",
              "Geo- und Tageszeit-Tuning",
              "Re-Marketing-Audiences sauber aufgesetzt",
              "Monatlicher Cash-Report mit ROAS pro Kampagne",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro:
          "Festpreis, alle Budgets in Ihrem Konto. Wir verdienen nicht an Ihren Werbeausgaben — wir verdienen am Ergebnis.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Account- und Tracking-Audit",
              "Kampagnen-Architektur",
              "Landingpage-Conversion-Plan",
              "Wettbewerbs-Analyse",
              "Budget- und ROAS-Modell",
            ],
          },
          {
            title: "Execution",
            items: [
              "Search- und Performance-Max-Kampagnen-Builds",
              "Landingpage-Production (Mobile-First)",
              "Conversion-Tracking (GA4 + Server-Side)",
              "Wöchentliches Search-Term-Trimming",
              "Anzeigen- und Asset-Production",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live-Dashboard (ROAS, CPL, Conversions)",
              "Monatlicher Cash-Report (eine Seite)",
              "Wöchentliche WhatsApp-Updates",
              "Direkt der Gründer — kein Junior",
              "Slack- oder E-Mail-Direkt-Zugang",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 90-Tage-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Cash, nicht Klicks.",
        intro:
          "Was an Tag 1, 30, 60 und 90 passiert. Wir sagen es vorher, wir halten uns dran, und wir zeigen Ihnen jeden Monat die ROAS-Mathematik.",
        steps: [
          { eta: "Tag 1", title: "Audit & Kickoff", body: "Audit-Report mit Verschwendungs-Hotspots. 60-Min-Setup-Call." },
          { eta: "Tag 30", title: "Kampagnen live", body: "Search + Performance Max laufen. Conversion-Tracking sauber. Erste Daten." },
          { eta: "Tag 60", title: "ROAS stabilisiert", body: "Verschwendung getrimmt, Quality-Score gestiegen, ROAS pendelt sich ein." },
          { eta: "Tag 90", title: "5× ROAS (Median)", body: "Profitable Kampagnen werden skaliert. Ab hier monatliche Optimierung." },
        ],
      },
      stack: {
        eyebrow: "Tools & Standards",
        headlineMain: "Womit wir arbeiten.",
        headlineSub: "Industriestandard, sauber integriert.",
        intro:
          "Sie behalten alle Konten und Zugänge — auch wenn Sie ohne uns weitermachen wollen. Kein Lock-in.",
        items: [
          { name: "Google Ads", body: "Search, Performance Max, Re-Marketing — alles unter Ihrem Konto." },
          { name: "GA4 + Tag Manager", body: "Conversion-Tracking sauber, Server-Side wo es zählt." },
          { name: "Google Merchant Center", body: "Für E-Commerce-Kunden — Shopping-Ads sauber integriert." },
          { name: "Looker Studio", body: "Live-Dashboard, das Sie auf Ihrem Telefon öffnen können." },
          { name: "CallRail / Hyros", body: "Call-Tracking und Multi-Touch-Attribution für High-Ticket-Branchen." },
          { name: "SimilarWeb / Auction Insights", body: "Wettbewerbs-Sichtbarkeit, wo bietet wer wieviel." },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt geantwortet.",
        intro: "Was Inhaber am häufigsten fragen, bevor sie Ads-Budget freigeben.",
        items: [
          { q: "Wie hoch sollte mein Werbebudget sein?", a: "Hängt von Ihrer Branche und Ihrem CPL ab. Wir empfehlen meistens €1.500–€5.000 / Monat zum Start. Im Audit geben wir Ihnen eine konkrete Zahl basierend auf Ihrem Markt." },
          { q: "Verdient NEO an meinem Werbebudget?", a: "Nein. Alle Budgets laufen direkt über Ihr Google-Ads-Konto. Wir bekommen den Festpreis pro Monat — egal, ob Ihr Budget €1.000 oder €100.000 ist. Anreiz: Ergebnisse, nicht Volumen." },
          { q: "Wie schnell sehe ich erste Anfragen?", a: "Bei sauberem Setup oft innerhalb der ersten 14 Tage. Skalieren auf stabilen ROAS dauert in der Regel 60–90 Tage." },
          { q: "Was, wenn ROAS unter Ziel bleibt?", a: "Wir treffen uns wöchentlich und passen an. Wenn nach 60 Tagen klar ist, dass das Marktpotenzial nicht reicht, sagen wir Ihnen das ehrlich — und beenden den Sprint, statt Ihr Geld zu verbrennen." },
          { q: "Wer schreibt die Anzeigen?", a: "Wir. Inklusive A/B-Test-Varianten und Asset-Production für Performance Max. Sie freigeben, wir schalten." },
          { q: "Was ist mit Performance Max — funktioniert das?", a: "Ja, wenn man weiß, was man tut. Eng gefasste Asset-Groups, Negativ-Keywords auf Account-Ebene, Conversion-Tracking sauber. Sonst frisst PMax Budget und liefert Vanity-Conversions." },
          { q: "Was passiert nach den 90 Tagen?", a: "Monatlich weiter, ohne Mindestlaufzeit. Sie können jederzeit pausieren, alle Konten und Daten gehören Ihnen." },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie investieren",
        headline: "Kostenloses Ads-Teardown Ihres Kontos.",
        body: "Wir öffnen Ihr Google-Ads-Konto (read-only) und finden die drei größten Verschwendungs-Hotspots. Ein 1-Seiten-Klartext-Report mit konkreten Hebeln, die Sie sofort umsetzen können — egal, ob Sie mit uns arbeiten oder nicht.",
        bullets: [
          "Verschwendungs-Analyse Ihres aktiven Kontos",
          "Top 3 Quick-Wins priorisiert",
          "30-Min-Loom-Walkthrough",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Ads-Teardown anfordern",
        note: "Werktags innerhalb von 48 h im Posteingang. Read-only Zugriff genügt.",
        modal: {
          eyebrow: "Kostenloses Ads-Teardown",
          headline: "Wo verbrennt Ihr Account Geld?",
          sub: "Wir machen einen Read-only-Audit Ihres Google-Ads-Kontos und schicken Ihnen die Top 3 Hebel per E-Mail.",
          submit: "Teardown anfordern",
          successHeadline: "Erhalten — wir öffnen das Konto.",
          successBody: "Ihr Teardown landet werktags innerhalb 48 Stunden in Ihrem Posteingang.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Cash-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir prüfen Ihr aktuelles Ads-Setup live, und Sie bekommen einen ROAS-Plan auf einer Seite. Keine Verkaufspräsentation.",
        primary: "Erstgespräch buchen",
      },
    },

    socialMedia: {
      slug: "social-media",
      meta: {
        title: "Social Media für Inhaber & Mittelstand · NEO THE AGENCY",
        description:
          "Inhalte, die Anfragen bringen — keine Eitelkeitsmetriken. Short-Form-Video, Paid Social und Kreativ-Production für inhabergeführte Marken. Festpreis, lead-driven.",
      },
      hero: {
        eyebrow: "Social Media · für Inhaber & Mittelstand",
        headlineTop: "Anfragen.",
        headlineBottom: "Nicht Follower.",
        sub: "Short-Form-Video, Paid Social und Kreativ-Content, der gebuchte Termine bringt — nicht Likes. Inhabergeführt, content-fokussiert, ohne Buzzword-Bingo.",
        primaryCta: "Content-Sample anfragen",
        secondaryCta: "Erstgespräch buchen",
        chips: ["Short-Form-Video", "Paid Social", "Kreativ-Production", "Posting-Plan"],
        video: "video/socials-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Content,",
        headlineSub: "der konvertiert.",
        paragraphs: [
          "Social Media ist kein Beauty-Contest. Es ist ein Anfragen-Kanal — wenn die Inhalte zur richtigen Zielgruppe in der richtigen Suchabsicht laufen, ergeben sich gebuchte Termine, nicht Vanity-Likes.",
          "Bei NEO heißt das: Wir bauen Short-Form-Video, das Ihre Zielgruppe tatsächlich konsumiert. Wir kombinieren organischen Content mit eng gefasstem Paid Social. Und wir tracken jede Anfrage zurück bis zur Plattform.",
          "Sie sehen jeden Monat eine Klartext-Notiz: welche Inhalte performen, welche Plattform Anfragen liefert, und was als Nächstes produziert wird.",
        ],
        audience:
          "Gemacht für inhabergeführte Marken und Mittelstand, die Social als Vertriebskanal nutzen wollen — nicht als PR-Bühne.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die zählen.",
        intro:
          "Median über aktive Social-Kunden der letzten 12 Monate. B2B und High-Ticket-B2C — wo eine Anfrage echtes Geld wert ist.",
        items: [
          {
            kicker: "Pipeline",
            value: "3,4",
            unit: "×",
            title: "mehr Anfragen aus Social",
            body: "Durchschnittliche Steigerung nach 6 Monaten — über organisches Short-Form und Paid Social kombiniert.",
          },
          {
            kicker: "CPL",
            value: "€32",
            unit: "Median",
            title: "Cost-per-Lead über Paid Social",
            body: "Median über aktive Kampagnen — abhängig von Branche, aber konsistent unter Google-Ads-CPL.",
          },
          {
            kicker: "Volumen",
            value: "12",
            unit: "/Monat",
            title: "Short-Form-Videos produziert",
            body: "Pro Monat im Sprint — Reels, TikTok, YouTube Shorts, alle redaktionell geplant.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir es tun",
        headlineMain: "Vier Phasen.",
        headlineSub: "Lead-driven, nicht Vanity.",
        intro:
          "Social-Methodik bei NEO: Erst die Anfrage definieren, dann den Inhalt rückwärts planen. Nie umgekehrt. Wer mit dem Inhalt anfängt, verliert.",
        phases: [
          {
            kicker: "Phase 1 · Tag 1–7",
            title: "Audit & Audience-Definition",
            body: "Wir analysieren Ihre Plattformen, Wettbewerb und Zielgruppen-Verhalten. Welche Plattform liefert für Ihr Geschäft Anfragen?",
            bullets: [
              "Plattform-Audit (TikTok, Instagram, LinkedIn, YouTube)",
              "Wettbewerbs-Content-Analyse",
              "Zielgruppen-Definition mit Suchabsicht",
              "Conversion-Pfad pro Plattform",
            ],
          },
          {
            kicker: "Phase 2 · Tag 8–30",
            title: "Content-Engine & Setup",
            body: "Redaktionsplan, Produktions-Pipeline, Tracking. Bevor wir live gehen, ist alles dokumentiert.",
            bullets: [
              "12-Monats-Redaktionsplan",
              "Short-Form-Video-Templates und Hooks",
              "Paid-Social-Tracking (Meta + TikTok Pixel)",
              "Production-Schedule (12 Videos / Monat)",
            ],
          },
          {
            kicker: "Phase 3 · Tag 31–60",
            title: "Production & Distribution",
            body: "Inhalte werden produziert, organisch verteilt und teils paid pushed. Wöchentliche Optimierung basierend auf Performance.",
            bullets: [
              "12 Short-Form-Videos / Monat",
              "Organischer Posting-Plan",
              "Paid-Social-Boost auf High-Performer",
              "Wöchentliche Performance-Reviews",
            ],
          },
          {
            kicker: "Phase 4 · Tag 61–90",
            title: "Skalierung & Iteration",
            body: "Was performt, wird skaliert. Was nicht performt, wird gestoppt. Plus monatlicher Klartext-Report über Pipeline-Beitrag.",
            bullets: [
              "Skalierung der profitabelsten Content-Formate",
              "Plattform-Verschiebung wo nötig",
              "Creator-Partner-Kampagnen (optional)",
              "Monatlicher Klartext-Report mit Pipeline-Mathematik",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro:
          "Festpreis, alle Werbebudgets in Ihrem Konto. Production, Distribution und Reporting — komplett.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Plattform-Audit",
              "Audience- & Conversion-Plan",
              "12-Monats-Redaktionsplan",
              "Wettbewerbs-Analyse",
              "Performance-Benchmark-Modell",
            ],
          },
          {
            title: "Execution",
            items: [
              "12 Short-Form-Videos / Monat",
              "Organischer Posting-Plan (alle Plattformen)",
              "Paid-Social-Kampagnen (Meta + TikTok)",
              "Conversion-Tracking sauber",
              "Creator- und UGC-Production (optional)",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live-Dashboard (Pipeline pro Plattform)",
              "Monatlicher Klartext-Report (eine Seite)",
              "Wöchentliche WhatsApp-Updates",
              "Direkt der Gründer — kein Junior",
              "Slack- oder E-Mail-Direkt-Zugang",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 90-Tage-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Termine, nicht Follower.",
        intro:
          "Was an Tag 1, 30, 60 und 90 passiert. Wir sagen es vorher und liefern dann.",
        steps: [
          { eta: "Tag 1", title: "Audit & Kickoff", body: "Plattform-Audit. Audience- und Content-Plan. Tracking-Setup-Call." },
          { eta: "Tag 30", title: "Erste Inhalte live", body: "Erste 12 Videos produziert und gepostet. Paid-Social läuft." },
          { eta: "Tag 60", title: "Erste Anfragen tracked", body: "Conversion-Pfad messbar. Erste Termine aus Social." },
          { eta: "Tag 90", title: "Pipeline-Beitrag etabliert", body: "Social ist messbarer Anfragen-Kanal. Skalierung beginnt." },
        ],
      },
      stack: {
        eyebrow: "Tools & Plattformen",
        headlineMain: "Womit wir arbeiten.",
        headlineSub: "Plattform-agnostisch, Conversion-fokussiert.",
        intro:
          "Wir entscheiden plattform-neutral. Welche Plattform für Ihr Geschäft Anfragen liefert, daran arbeiten wir — egal, ob das LinkedIn oder TikTok ist.",
        items: [
          { name: "Meta Business Suite", body: "Instagram + Facebook organisch und paid, Pixel-Tracking sauber." },
          { name: "TikTok Ads Manager", body: "Short-Form-Video für jüngere Zielgruppen oder Volumen-Plays." },
          { name: "LinkedIn Campaign Manager", body: "B2B-Lead-Gen mit eng gefasster Audience." },
          { name: "YouTube Studio + YouTube Ads", body: "Long-Form-Authority und Pre-Roll-Targeting." },
          { name: "GA4 + Tag Manager", body: "Cross-Plattform-Conversion-Tracking, sauber attribuiert." },
          { name: "CapCut + Premiere", body: "Production-Stack für Short-Form-Video — schnell, hochwertig, skalierbar." },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt geantwortet.",
        intro: "Was Inhaber am häufigsten fragen, bevor sie Social-Budget freigeben.",
        items: [
          { q: "Brauche ich auf jeder Plattform präsent zu sein?", a: "Nein. Wir empfehlen 1–2 Plattformen, auf denen Ihre Zielgruppe wirklich Zeit verbringt. Lieber tief als breit." },
          { q: "Was, wenn ich nicht vor der Kamera will?", a: "Geht. Wir bauen UGC-Style-Content mit Creators oder produktbasierte Visuals. Persönliche Founder-Content performt aber typischerweise am besten." },
          { q: "Wie viel Werbebudget brauche ich?", a: "Für Paid Social empfehlen wir mindestens €1.500 / Monat zum Start. Organisch geht auch ohne — dauert aber länger." },
          { q: "Wer produziert die Videos?", a: "Wir. Inklusive Skripte, Drehbuch, Schnitt, Hooks. Sie freigeben, wir veröffentlichen. Bei Founder-Content brauchen wir 2 h pro Monat von Ihnen." },
          { q: "Wie schnell sehe ich Anfragen?", a: "Organisch dauert 60–90 Tage bis erste tracked Conversions. Paid Social oft innerhalb der ersten 2–3 Wochen, wenn das Setup sauber ist." },
          { q: "Was ist mit Creators und Influencer-Marketing?", a: "Wenn relevant, ja — aber als Add-on, nicht Default. Inhabergeführte Marken bauen meistens am besten über eigene Founder-Content. Creators kommen, wenn das Volumen es rechtfertigt." },
          { q: "Was passiert nach den 90 Tagen?", a: "Monatlich weiter, ohne Mindestlaufzeit. Sie behalten alle Konten, alle Inhalte, alle Daten — wenn Sie aufhören, geht nichts verloren." },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie investieren",
        headline: "Kostenloses Content-Sample für Ihre Marke.",
        body: "Wir produzieren ein Short-Form-Video-Sample (60 Sekunden) für Ihre Marke — basierend auf einer Conversion-Hypothese, die wir aus Ihrem Geschäft ableiten. Sie sehen, wie unser Content für Sie aussehen würde, bevor Sie sich entscheiden.",
        bullets: [
          "Eine 60-Sekunden Short-Form-Video-Production",
          "Conversion-Hypothese schriftlich erklärt",
          "Vorgeschlagener Hook und Skript",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Content-Sample anfordern",
        note: "Production-Zeit 5–7 Werktage. Kein Spam, keine Verpflichtung.",
        modal: {
          eyebrow: "Kostenloses Content-Sample",
          headline: "Wir produzieren Ihnen ein Video.",
          sub: "Schicken Sie uns Ihre Marke und Zielgruppe — Sie bekommen ein 60-Sekunden Short-Form-Video-Sample. Egal, ob Sie mit uns arbeiten oder nicht.",
          submit: "Sample anfordern",
          successHeadline: "Erhalten — wir produzieren.",
          successBody: "Ihr Sample ist in 5–7 Werktagen in Ihrem Posteingang.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Content-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir definieren live, welche Plattform für Ihr Geschäft funktioniert — und wie der erste 90-Tage-Sprint aussehen würde.",
        primary: "Erstgespräch buchen",
      },
    },

    websites: {
      slug: "websites",
      meta: {
        title: "Websites für Inhaber & Mittelstand · NEO THE AGENCY",
        description:
          "Conversion-optimierte Websites, die ab Tag 1 ranken. Mobile-First, Core Web Vitals, selbst editierbar. Festpreis, in 6–8 Wochen live.",
      },
      hero: {
        eyebrow: "Website-Development · für Inhaber & Mittelstand",
        headlineTop: "Ihre Site,",
        headlineBottom: "als Asset.",
        sub: "Schnelle, moderne, mobile-first Websites, die schnell laden, gut aussehen und Besucher zu Anfragen machen. Auf Plattformen, die Sie selbst pflegen können.",
        primaryCta: "Speed- & Conversion-Report",
        secondaryCta: "Erstgespräch buchen",
        chips: ["Mobile-First", "Core Web Vitals", "Conversion-Architektur", "Selbst editierbar"],
        video: "video/website-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Websites,",
        headlineSub: "die druckbar liefern.",
        paragraphs: [
          "Eine Website ist kein Visitenkarten-PDF online. Sie ist Ihr aktivster Verkäufer — 24/7, ohne Krankheitstage. Wenn sie schlecht ist, kostet sie täglich Geld. Wenn sie gut ist, druckt sie Anfragen.",
          "Bei NEO heißt das: Mobile-First-Design, Core Web Vitals unter 2,5 s LCP, Conversion-Architektur basierend auf echtem Nutzerverhalten. Plus: alle Inhalte selbst editierbar — Sie sind nicht für jeden Komma-Fix abhängig.",
          "Sie bekommen eine Site, die ab Tag 1 rankt, ab Tag 1 konvertiert und über die nächsten 5 Jahre mitwächst — ohne komplettes Re-Design.",
        ],
        audience:
          "Gemacht für inhabergeführte Unternehmen und Mittelstand, die ihre Website als Vertriebs-Asset behandeln — nicht als Pflicht-Online-Auftritt.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die spürbar werden.",
        intro:
          "Median über Website-Projekte der letzten 12 Monate. Branchenmix — Beratung, Handwerk, Premium-Dienstleister, B2B.",
        items: [
          {
            kicker: "Speed",
            value: "1,8",
            unit: "s",
            title: "LCP-Median",
            body: "Largest Contentful Paint im 75. Perzentil — schneller als 92 % der DACH-Mittelstands-Websites.",
          },
          {
            kicker: "Conversion",
            value: "3,1",
            unit: "×",
            title: "höhere Anfragen-Rate",
            body: "Median-Steigerung der Conversion-Rate vs. der vorherigen Site, gemessen 6 Wochen nach Launch.",
          },
          {
            kicker: "Time-to-Live",
            value: "6",
            unit: "Wochen",
            title: "vom Kick-off bis Launch",
            body: "Median für Standard-Sprints. Plus 2 Wochen, wenn umfangreicher Content produziert werden muss.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir es tun",
        headlineMain: "Vier Phasen.",
        headlineSub: "Conversion vor Pixel.",
        intro:
          "Website-Methodik bei NEO: erst Conversion-Architektur definieren, dann visuell gestalten. Nie umgekehrt. Wer mit Pixeln anfängt, verliert.",
        phases: [
          {
            kicker: "Phase 1 · Woche 1",
            title: "Discovery & Conversion-Plan",
            body: "Wir verstehen Ihre Zielgruppe, Conversion-Pfade und Wettbewerb. Bevor irgendwas designed wird, steht der Plan.",
            bullets: [
              "Stakeholder-Interviews und Audience-Mapping",
              "Conversion-Architektur (Wireframes)",
              "Content-Inventur und Plan",
              "SEO- und Tech-Briefing",
            ],
          },
          {
            kicker: "Phase 2 · Woche 2–3",
            title: "Design & Prototyping",
            body: "High-Fidelity-Design im NEO- oder Ihrem Brand-System. Mobile-First, accessibility-konform, conversion-fokussiert.",
            bullets: [
              "Mobile-First-Design (375 px → 1440 px)",
              "Interaktiver Prototype (Figma)",
              "Accessibility-Check (WCAG 2.2 AA)",
              "2 Review-Runden mit Ihnen",
            ],
          },
          {
            kicker: "Phase 3 · Woche 4–5",
            title: "Build & Content",
            body: "Wir bauen auf Plattformen, die Sie selbst editieren können — Webflow, Framer, oder bei Bedarf Custom-Stack. Inhalte parallel.",
            bullets: [
              "Plattform-Build (Webflow / Framer / Custom)",
              "Content-Production parallel",
              "Schema.org und SEO sauber integriert",
              "Tracking (GA4 + Tag Manager) ab Tag 1",
            ],
          },
          {
            kicker: "Phase 4 · Woche 6",
            title: "QA & Launch",
            body: "Cross-Browser, Mobile, Speed, Accessibility. Plus Übergabe — Sie bekommen ein 30-Min-Video-Tutorial, wie Sie selbst editieren.",
            bullets: [
              "Cross-Browser- und Device-Testing",
              "Speed-Optimierung (Core Web Vitals)",
              "Launch-Checkliste (DNS, SSL, Redirects)",
              "Übergabe und Editing-Tutorial",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro:
          "Festpreis. Eine komplette Website inkl. Design, Build, Content-Production und Launch — keine Add-ons, keine Setup-Surprise.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Discovery & Stakeholder-Interviews",
              "Conversion-Architektur und Wireframes",
              "Content- und SEO-Plan",
              "Wettbewerbs-Analyse",
              "Tech-Stack-Empfehlung",
            ],
          },
          {
            title: "Execution",
            items: [
              "Mobile-First-Design (Figma)",
              "Plattform-Build (Webflow / Framer / Custom)",
              "Content-Production (Texte, Fotos, Videos)",
              "Schema.org und SEO-Integration",
              "Tracking-Setup (GA4 + Tag Manager)",
            ],
          },
          {
            title: "Launch & Aftercare",
            items: [
              "Cross-Browser- und Mobile-QA",
              "Core-Web-Vitals-Optimierung",
              "Launch-Checkliste (DNS, SSL, Redirects)",
              "Editing-Tutorial (30 Min Video)",
              "30 Tage Bug-Fix-Support post-launch",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 6-Wochen-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Schnell, sauber, dokumentiert.",
        intro:
          "Standard-Sprint dauert 6 Wochen. Was in jeder Woche passiert, sehen Sie unten — keine Black-Box.",
        steps: [
          { eta: "Woche 1", title: "Discovery", body: "Stakeholder-Interviews, Conversion-Plan, Content-Inventur." },
          { eta: "Woche 2–3", title: "Design", body: "Mobile-First-Design im Figma. 2 Review-Runden, Accessibility-Check." },
          { eta: "Woche 4–5", title: "Build & Content", body: "Plattform-Build, Content-Production, Tracking sauber aufgesetzt." },
          { eta: "Woche 6", title: "Launch", body: "QA, Speed-Optimierung, Launch und Übergabe inkl. Editing-Tutorial." },
        ],
      },
      stack: {
        eyebrow: "Tech-Stack",
        headlineMain: "Womit wir bauen.",
        headlineSub: "Sie selbst editieren können.",
        intro:
          "Wir bauen auf Plattformen, die Sie selbst pflegen — keine Wordpress-Plugin-Hölle, keine Custom-Black-Box, die nur wir öffnen können.",
        items: [
          { name: "Webflow", body: "Default für Marketing-Websites — visuell editierbar, schnell, SEO-friendly." },
          { name: "Framer", body: "Wenn Animations- und Motion-Design Priorität haben." },
          { name: "Custom (Vite + React + Tailwind)", body: "Für E-Commerce, komplexe Apps, oder spezifische Performance-Ziele." },
          { name: "Figma", body: "Design-Source-of-Truth — Sie bekommen das File, gehört Ihnen." },
          { name: "GA4 + Tag Manager", body: "Tracking ab Tag 1 sauber aufgesetzt, Server-Side wo nötig." },
          { name: "Cloudinary / Sanity", body: "Asset-Management und Headless-CMS, wenn Content-Volumen es rechtfertigt." },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt geantwortet.",
        intro: "Was Inhaber am häufigsten fragen, bevor sie ein Website-Projekt starten.",
        items: [
          { q: "Wie lange dauert ein typisches Projekt?", a: "Standard-Sprint 6 Wochen. Plus 2 Wochen, wenn wir umfangreichen neuen Content produzieren. Bei größeren E-Commerce-Builds kann es 8–12 Wochen werden — das sagen wir vorher klar." },
          { q: "Welche Plattform empfehlt ihr?", a: "Webflow ist unser Default für Marketing-Websites. Framer für Motion-Heavy-Brands. Custom-React, wenn Performance oder Komplexität es verlangt. Wir empfehlen das, was zu Ihnen passt — nicht zu uns." },
          { q: "Kann ich die Site selbst pflegen?", a: "Ja, das ist Standard. Sie bekommen Editing-Zugang und ein 30-Min-Video-Tutorial. Bei Webflow/Framer können Sie Texte, Bilder und Pages selbst ändern." },
          { q: "Was passiert mit meiner alten Site?", a: "Wir machen ein 301-Redirect-Mapping, damit kein SEO-Trust verloren geht. Plus Backup, falls Sie zurück wollen." },
          { q: "Was, wenn ich nach Launch noch Änderungen will?", a: "30 Tage Bug-Fix-Support sind im Festpreis enthalten. Danach: monatliche Care-Pakete oder einzelne Stunden — Sie entscheiden." },
          { q: "Was ist mit SEO — wird die neue Site ranken?", a: "Wir bauen SEO-First — Schema.org, Core Web Vitals, saubere URL-Struktur, Content-Strategie ab Tag 1. Wenn Sie zusätzlich aktiv ranken wollen, ergänzen wir mit unserem SEO-Sprint." },
          { q: "Was kostet ein Custom-Build vs. Webflow?", a: "Festpreis-Range startet bei €15.000 (Webflow Marketing-Site) und kann bis €60.000+ gehen (Custom React/E-Commerce). Wir geben Ihnen im Erstgespräch eine konkrete Zahl." },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie sich entscheiden",
        headline: "Kostenloser Speed- & Conversion-Report.",
        body: "Wir analysieren Ihre aktuelle Website auf Core Web Vitals, Mobile-Performance und Conversion-Architektur. Sie bekommen einen 1-Seiten-Report mit den drei wirkungsvollsten Hebeln — egal, ob Sie mit uns bauen oder nicht.",
        bullets: [
          "Core-Web-Vitals-Messung (LCP, CLS, INP)",
          "Mobile-Performance-Audit",
          "Top 3 Conversion-Hebel priorisiert",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Speed-Report anfordern",
        note: "Werktags innerhalb von 24 h im Posteingang.",
        modal: {
          eyebrow: "Kostenloser Speed- & Conversion-Report",
          headline: "Wo verliert Ihre Site Anfragen?",
          sub: "Schicken Sie uns Ihre Domain — Sie bekommen einen Speed- und Conversion-Audit per E-Mail.",
          submit: "Report anfordern",
          successHeadline: "Erhalten — wir messen.",
          successBody: "Ihr Report landet werktags innerhalb 24 Stunden in Ihrem Posteingang.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Website-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir prüfen Ihre aktuelle Site live und Sie bekommen einen Sprint-Plan auf einer Seite. Keine Verkaufspräsentation.",
        primary: "Erstgespräch buchen",
      },
    },
  },
};

const en: Translations = {
  nav: {
    links: [
      { label: "What we do", href: "#services" },
      { label: "Case studies", href: "#cases" },
      { label: "Results", href: "#metrics" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Free intro call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Language",
    languages: { de: "Deutsch", en: "English" },
  },

  hero: {
    eyebrow: "High-end performance marketing",
    headlineTop: "Digital",
    headlineBottom: "Growth.",
    sub: "We turn your website into an asset and generate a continuous flow of qualified enquiries.",
    services: [
      "Search Engine Optimisation",
      "AI Search Optimisation",
      "High-End Website Development",
    ],
    priceLine: "Free consultation",
    priceLineSub: "Reply within 24 h",
    cta: "Start",
    pauseLabel: "Pause hero video",
    playLabel: "Play hero video",
  },

  snapshot: {
    title: "Snapshot",
    tagline: "Clear in 30 seconds — what, for whom, what you get.",
    items: [
      {
        index: "01",
        label: "What",
        headline: "More enquiries.",
        detail: "Performance marketing & SEO that measurably drives revenue.",
      },
      {
        index: "02",
        label: "For whom",
        headline: "For owners & SMEs.",
        detail: "Consultancies, trades, professional services, B2B.",
      },
      {
        index: "03",
        label: "What you get",
        headline: "Continuous enquiries.",
        detail: "Fixed price, 90 days, no minimum term.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Voices of our clients",
    headline: "In their own words.",
    description:
      "Five owners describe what measurably changed in the first 90 days with NEO.",
    prevLabel: "Previous voice",
    nextLabel: "Next voice",
    soundOn: "Sound on",
    soundOff: "Sound",
    visit: "Visit Website",
    items: [
      {
        name: "Ayham Muhrez",
        role: "CEO & Founder, Azura Living Bali",
        description:
          "From zero to page one for 'villa rental bali' in 90 days — direct bookings instead of platform commission.",
      },
      {
        name: "Faisaö Chauhan",
        role: "Director, ADDRESSBALI®",
        description:
          "Premium villa brand. Full website redesign plus a performance-marketing sprint, 8× the enquiry pipeline.",
      },
      {
        name: "Enting Man",
        role: "Founder & Director, Cunos",
        description:
          "B2B consultancy. Sharp positioning, SEO-first architecture, qualified inbound leads from day 30.",
      },
      {
        name: "Dana",
        role: "Marketing Director, Pentadoc",
        description:
          "Document-intelligence platform. Editorial homepage, clean conversion architecture, demo requests doubled.",
      },
      {
        name: "Johannes",
        role: "Founder & CEO, CX",
        description:
          "Customer-excellence platform. Sunset hero plus service cards. SEO architecture carries the B2B pipeline.",
      },
    ],
  },

  whyManifesto: {
    eyebrow: "What we stand for",
    headline: "Commitment.",
    paragraphs: [
      "Our client work shares one goal: business growth through digital marketing. We're successful when our clients grow revenue.",
      "NEO THE AGENCY® is a high-end performance marketing agency. Project success is measurable. We deliver enquiries.",
      "As former strategy consultants, management consultants and project managers, our clients get the full package: digital strategy, professional project management, and genuine expertise.",
    ],
    closing:
      "Customer excellence is our compass. That's why we work to three clear principles.",
    founderName: "Raoul Müller",
    founderRole: "Founder · NEO THE AGENCY",
  },

  principles: {
    eyebrow: "How we work",
    headlineMain: "Three principles.",
    headlineSub: "One method.",
    intro:
      "Customer excellence is abstract. In practice, it means: commitment, performance, a fair price. Three sentences that decide what we do — and what we don't — every day.",
    items: [
      {
        title: "Commitment",
        body:
          "We're in. You get the founder on the phone, not an account manager with a spreadsheet. Every project becomes ours.",
        kicker: "Principle",
      },
      {
        title: "Performance",
        body:
          "We measure enquiries, not clicks. Every month you see what moved — and why. No spin, no vanity metrics.",
        kicker: "Principle",
      },
      {
        title: "Fair price",
        body:
          "Fixed price from day one. No setup surprise, no minimum term, no hidden hours. You know exactly what you get.",
        kicker: "Principle",
      },
    ],
  },

  services: {
    eyebrow: "What we do",
    headlineMain: "Four disciplines.",
    headlineSub: "One pipeline.",
    intro:
      "Tightly interlocked, because growth doesn't sit in silos. Click through — or let the carousel run.",
    items: [
      {
        key: "seo",
        title: "SEO",
        promise: "Google page one in 90 days.",
        detail:
          "Technical fixes, content that earns clicks, and link-building that pays off. We show you the maths every month — what moved, why, and what's next.",
        bullets: [
          "Technical SEO audit",
          "Content + on-page",
          "Authority building",
          "Monthly review",
        ],
      },
      {
        key: "google-ads",
        title: "Google Ads",
        promise: "ROI-positive paid traffic that prints.",
        detail:
          "Tightly scoped campaigns, conversion-tracked landing pages, and weekly waste trimming. We don't bid on vanity terms — we bid on revenue.",
        bullets: [
          "Search + Performance Max",
          "Conversion tracking",
          "Landing pages that convert",
          "Weekly optimisation",
        ],
      },
      {
        key: "social",
        title: "Social Media",
        promise: "Content that drives enquiries — not vanity metrics.",
        detail:
          "Short-form video, paid social, and creative built for your audience and platform. Followers are nice — booked calls are better.",
        bullets: [
          "Short-form video",
          "Paid social",
          "Creative production",
          "Lead-driven posting plan",
        ],
      },
      {
        key: "websites",
        title: "Websites",
        promise: "Conversion-optimised pages that rank from day one.",
        detail:
          "Fast, modern, mobile-first websites that load quickly, look right, and turn visitors into enquiries. On platforms you can edit yourself.",
        bullets: [
          "Mobile-first design",
          "Core Web Vitals",
          "Built for conversion",
          "Self-editable",
        ],
      },
    ],
  },

  cases: {
    eyebrow: "Case studies",
    headlineMain: "Real brands.",
    headlineSub: "Real numbers.",
    intro:
      "A selection. We've been at the table with every client for five years — or we don't start.",
    serviceLabel: "Services",
    timelineLabel: "Timeline",
  },

  comparison: {
    eyebrow: "NEO vs. others",
    headlineMain: "What we do differently.",
    headlineSub: "Six points.",
    intro: "So you know what you're signing up for — before you sign up.",
    columns: { other: "Other agencies", neo: "NEO THE AGENCY" },
    rows: [
      {
        topic: "Contract length",
        other: "12 or 24 months, hard to leave",
        neo: "90-day sprint, renewed monthly",
      },
      {
        topic: "Reporting",
        other: "Vanity metrics across 30-page PDFs",
        neo: "Enquiries, revenue, sources — one page",
      },
      {
        topic: "Point of contact",
        other: "Account manager reading a spreadsheet",
        neo: "The founder, on the phone",
      },
      {
        topic: "Pricing",
        other: "Hourly rates, setup fees, surcharges",
        neo: "Fixed price, all-in, transparent",
      },
      {
        topic: "Goal",
        other: "More clicks, more reach",
        neo: "More qualified enquiries",
      },
      {
        topic: "Lock-in",
        other: "Data and accounts lost when you leave",
        neo: "You own everything from day one",
      },
    ],
  },

  process: {
    eyebrow: "The 90-day sprint",
    headlineMain: "Four milestones.",
    headlineSub: "No surprises.",
    intro:
      "What happens on day 1, 30, 60 and 90. We say it up front, we stick to it, and we show you the maths every month.",
    steps: [
      {
        n: "01",
        eta: "Day 1",
        title: "Audit & kickoff",
        body:
          "Technical SEO audit, channel diagnosis, competitor mapping. 30-minute screen share, a founder on the call.",
      },
      {
        n: "02",
        eta: "Day 30",
        title: "Launch",
        body:
          "Tracking live, new landing pages online, Google Ads campaigns active, on-page SEO fixes shipped.",
      },
      {
        n: "03",
        eta: "Day 60",
        title: "First page-one keywords",
        body:
          "First commercial keywords rank on page one. Pipeline starts filling, monthly plain-talk report with the next levers.",
      },
      {
        n: "04",
        eta: "Day 90",
        title: "8× pipeline",
        body:
          "Measured uplift in qualified enquiries. From here on, monthly optimisation — no surprises, no minimum term.",
      },
    ],
  },

  metrics: {
    eyebrow: "Numbers",
    headlineMain: "What actually counts.",
    headlineSub: "Enquiries, not clicks.",
    intro: "Four numbers from live clients — measured, not claimed.",
    items: [
      { value: 8, suffix: "×", label: "more enquiries per month" },
      { value: 90, suffix: "", label: "days to Google page one" },
      { value: 4, suffix: "", label: "client projects shipped" },
    ],
  },

  founder: {
    eyebrow: "A note from the founder",
    headlinePre: "You'll talk to the person",
    headlineSoft: "who delivers.",
    paragraphs: [
      "I founded NEO because I was tired of watching good companies pay agencies thousands a month to be shown vanity metrics instead of real enquiries in the inbox.",
      "At NEO you don't get an account manager reading a spreadsheet. You get me on the phone, a fixed price with no lock-in, and a 90-day sprint I put my name on.",
      "If that sounds like your way of working — drop me a line below. I reply personally, on weekdays, within 24 h.",
    ],
    signature: "Raoul",
    signatureBlock: "Raoul Müller · Founder, NEO THE AGENCY",
  },

  contact: {
    eyebrow: "Get in touch",
    headlinePre: "Let's get",
    headlineSoft: "started.",
    intro:
      "Free consultation. Reply within 24 h on weekdays, personally from the founder.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "What do you want to achieve?",
      submit: "Send message",
      success: "Thank you. You'll hear from us within 24 h.",
    },
    tiles: [
      { kicker: "Phone", value: "+49 30 123 4567" },
      { kicker: "Email", value: "kontakt@neo-agency.de" },
      { kicker: "Address", value: "Hardenbergstraße 1, 10623 Berlin" },
    ],
  },

  footer: {
    blurb:
      "NEO THE AGENCY is a high-end performance marketing agency. We turn websites into assets and deliver qualified enquiries.",
    sections: [
      {
        title: "Services",
        links: [
          { label: "SEO", href: "#services" },
          { label: "Google Ads", href: "#services" },
          { label: "Social Media", href: "#services" },
          { label: "Websites", href: "#services" },
        ],
      },
      {
        title: "Agency",
        links: [
          { label: "What we stand for", href: "#why" },
          { label: "How we work", href: "#principles" },
          { label: "Case studies", href: "#cases" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    rights: "© NEO THE AGENCY. All rights reserved.",
    legal: [
      { label: "Imprint", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },

  sticky: {
    cta: "Free consultation",
    arrow: "→",
  },

  modal: {
    eyebrow: "Before you scroll on",
    headline: "Free audit of your website.",
    sub: "30-minute walkthrough plus a one-page audit by email. Whether you work with us or not.",
    name: "Name",
    email: "Email",
    submit: "Request audit",
    dismiss: "Maybe later",
  },

  servicePages: {
    seo: {
      slug: "seo",
      meta: {
        title: "SEO for founders & SMEs · NEO THE AGENCY",
        description:
          "Google page one in 90 days. Technical SEO, content that earns clicks, and link-building that actually pays back — for founder-led businesses. Fixed price, no lock-in.",
      },
      hero: {
        eyebrow: "Search engine optimisation · for founders & SMEs",
        headlineTop: "Google.",
        headlineBottom: "Page one.",
        sub: "We get your website to page one for the terms your customers actually type — in 90 days, on a fixed price, without lock-in. Founder-led, plain talk, measurable.",
        primaryCta: "Free SEO audit",
        secondaryCta: "Book a consultation",
        chips: ["Technical SEO", "Content & on-page", "Link-building", "Local SEO"],
        video: "video/seo-logo.mp4",
      },
      whatItIs: {
        eyebrow: "What we do",
        headlineMain: "SEO without buzzwords.",
        headlineSub: "Enquiries, not clicks.",
        paragraphs: [
          "SEO isn't a trick or a black box. It's disciplined work on three levers: technical hygiene, content that maps to commercial search intent, and authority through clean linking.",
          "At NEO that means we audit your site for crawler issues, speed and indexation. We build content your customers actually search for — and write it so it converts. We build authority slowly, but with substance.",
          "Every month you get a plain-talk note: what moved, why, and what's next. No spin, no 30-page PDFs.",
        ],
        audience:
          "Built for founder-led businesses and SMEs that want to grow — not for enterprises that need a new KPI deck.",
      },
      outcomes: {
        eyebrow: "What changes",
        headlineMain: "Three numbers",
        headlineSub: "that count.",
        intro:
          "Median across active client sprints over the last 12 months. Industries across the board — consultancies, trades, premium services, B2B.",
        items: [
          {
            kicker: "Pipeline",
            value: "8",
            unit: "×",
            title: "more qualified enquiries",
            body: "Average uplift in monthly enquiries from organic search after the first six months.",
          },
          {
            kicker: "Visibility",
            value: "90",
            unit: "days",
            title: "to Google page one",
            body: "From kick-off to the first commercial keyword on page one. Median — some clients are faster.",
          },
          {
            kicker: "Trust",
            value: "5.0",
            unit: "★",
            title: "verified reviews",
            body: "20+ reviews from founder-led clients, measured since Q1 2026.",
          },
        ],
      },
      methodology: {
        eyebrow: "How we do it",
        headlineMain: "Four phases.",
        headlineSub: "No secret sauce.",
        intro:
          "Our methodology isn't patented — it's disciplined. We make the invisible work visible because you should know what you're paying for.",
        phases: [
          {
            kicker: "Phase 1 · Day 1–7",
            title: "Audit & data anchor",
            body: "We open the bonnet. Crawler analysis, indexation check, Core Web Vitals, content inventory, keyword mapping against competitors.",
            bullets: [
              "Technical SEO audit with 50+ checkpoints",
              "Search Console + GA4 as source of truth",
              "Competitor gap analysis",
              "Written audit report with priorities",
            ],
          },
          {
            kicker: "Phase 2 · Day 8–30",
            title: "Technical foundation",
            body: "Before new content arrives, the foundation must hold. We fix every crawler issue, optimise Core Web Vitals, restructure URL hierarchy.",
            bullets: [
              "Sitemap & robots.txt cleaned up",
              "Core Web Vitals < 2.5 s LCP, < 0.1 CLS",
              "Schema.org markup (LocalBusiness, Service, FAQ)",
              "Internal linking & page architecture",
            ],
          },
          {
            kicker: "Phase 3 · Day 31–60",
            title: "Content engine",
            body: "We write content your customers actually type — service pages, comparison content, FAQ hubs. All editorial, all conversion-led.",
            bullets: [
              "Service pages with commercial search intent",
              "Comparison content",
              "Local landing pages where relevant",
              "FAQ hubs for long-tail traffic",
            ],
          },
          {
            kicker: "Phase 4 · Day 61–90",
            title: "Authority & scaling",
            body: "Clean links — no PBNs, no spam. Digital PR, industry catalogues, partnerships. Plus monthly plain-talk report.",
            bullets: [
              "Digital PR campaign (3–5 placements per quarter)",
              "Directory and industry listings",
              "Partner and guest posts",
              "Monthly plain-talk report with the next levers",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "What you get",
        headlineMain: "Three pillars.",
        headlineSub: "All-in.",
        intro:
          "Fixed price. No add-ons, no setup surprise. Everything below is in the 90-day sprint — and every month after, as long as you want.",
        columns: [
          {
            title: "Strategy",
            items: [
              "Technical SEO audit",
              "Keyword strategy & mapping",
              "Six-month content plan",
              "Competitor analysis",
              "Conversion architecture",
            ],
          },
          {
            title: "Execution",
            items: [
              "Technical fixes (speed, crawler, indexation)",
              "Content production (4–8 pages/month)",
              "On-page optimisation",
              "Link-building (3–5 quality links per quarter)",
              "Schema.org & structured data",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live dashboard (rankings, traffic, enquiries)",
              "Monthly plain-talk report (one page)",
              "Weekly WhatsApp updates",
              "Direct founder access — no account manager",
              "Slack or email direct line",
            ],
          },
        ],
      },
      process: {
        eyebrow: "The 90-day sprint",
        headlineMain: "Four milestones.",
        headlineSub: "Plain talk, no spin.",
        intro:
          "What happens on day 1, 30, 60 and 90. We say it up front, we stick to it, and we show the maths every month.",
        steps: [
          { eta: "Day 1", title: "Audit & kick-off", body: "Audit report in your inbox. 60-min strategy call. You understand where you stand." },
          { eta: "Day 30", title: "Foundation in place", body: "Technical SEO clean. First content pages live. Tracking running, data flowing." },
          { eta: "Day 60", title: "First page-one keywords", body: "First commercial keywords rank on page one. Pipeline starts filling." },
          { eta: "Day 90", title: "8× pipeline (median)", body: "Measurable uplift in qualified enquiries. From here on, monthly, no minimum term." },
        ],
      },
      stack: {
        eyebrow: "Tools & standards",
        headlineMain: "What we work with.",
        headlineSub: "No secrets, no lock-in.",
        intro:
          "Industry-standard tools, cleanly integrated. You keep all access — even if you eventually want to continue without us.",
        items: [
          { name: "Google Search Console", body: "Source of truth for rankings, clicks, indexation." },
          { name: "GA4 + Tag Manager", body: "Conversion tracking set up cleanly — server-side where it matters." },
          { name: "Ahrefs / Semrush", body: "Backlink monitoring, competitor analysis, keyword research." },
          { name: "Screaming Frog", body: "Technical audits, crawler diagnostics, site-structure mapping." },
          { name: "Schema.org", body: "Structured data — LocalBusiness, Service, FAQ, Organization." },
          { name: "PageSpeed Insights / Lighthouse", body: "Core Web Vitals, speed optimisation, mobile-first audits." },
        ],
      },
      faq: {
        eyebrow: "Common questions",
        headlineMain: "Asked straight.",
        headlineSub: "Answered straight.",
        intro: "What we hear most often from founders before they book.",
        items: [
          { q: "How fast will I see results?", a: "Ranking movement in the first 2–4 weeks, first page-one keywords by 60–90 days. Real enquiry uplift typically from month 3. What you can specifically expect, we'll tell you after the audit — without spin." },
          { q: "What's included in the fixed price?", a: "Everything under \"What you get.\" No add-ons, no setup fee, no upcharges for \"more content\" or \"more links.\" If you want to scale, we'll talk — otherwise the price stays stable." },
          { q: "Is there a minimum term?", a: "No. We work month-to-month after the 90-day sprint. If we don't deliver, you can leave. We'd rather earn next month than trap you in this one." },
          { q: "Who actually does the work?", a: "The founder (me, Raoul) plus two senior SEO specialists. No account-manager ping-pong, no juniors learning on your behalf. The person you meet in the consultation does the work." },
          { q: "How does SEO sit alongside Google Ads?", a: "Very well — we often run both in parallel. SEO builds long-term visibility; Ads buy short-term traffic. When both are clean, you get a pipeline that doesn't stop growing." },
          { q: "Can you guarantee results in my industry?", a: "Ranking guarantees are dishonest — we don't give them. What we do: we don't take on clients we don't believe will work. If the audit shows SEO is the wrong lever, we'll tell you that." },
          { q: "What happens after the 90 days?", a: "You decide. Most clients stay monthly because growth scales from there. Some pause and come back later. You keep all access, all data, all content — even if you stop tomorrow." },
        ],
      },
      leadMagnet: {
        eyebrow: "Before you decide",
        headline: "Free SEO audit of your website.",
        body: "We audit your site against 50+ technical and content factors and send you a one-page plain-talk report. What's broken, what's working, and the three highest-impact next levers — whether you work with us or not.",
        bullets: [
          "One-page audit by email in 24 h",
          "30-minute Loom walkthrough",
          "Concrete next steps prioritised",
          "No sales pitch required",
        ],
        cta: "Request free audit",
        note: "Lands in your inbox within 24 working hours. No spam.",
        modal: {
          eyebrow: "Free SEO audit",
          headline: "Your one-page audit, in 24 h.",
          sub: "Send us your domain — you'll get a plain-talk audit by email. Whether you work with us or not.",
          submit: "Request SEO audit",
          successHeadline: "Got it — we're auditing.",
          successBody: "Your audit lands in your inbox within 24 working hours.",
        },
      },
      finalCta: {
        eyebrow: "Ready?",
        headlineMain: "30 minutes.",
        headlineSub: "A plan on one page.",
        body: "Free consultation with the founder. You'll get an honest read, a one-page plan, and then you decide. No sales pitch, no pressure.",
        primary: "Book a consultation",
      },
    },

    googleAds: {
      slug: "google-ads",
      meta: {
        title: "Google Ads for founders & SMEs · NEO THE AGENCY",
        description:
          "ROI-positive paid traffic that prints. Tightly scoped Search and Performance Max campaigns for founder-led businesses. Fixed price, weekly waste-trimming.",
      },
      hero: {
        eyebrow: "Google Ads · for founders & SMEs",
        headlineTop: "ROI.",
        headlineBottom: "Not reach.",
        sub: "We build Google Ads campaigns that print enquiries, not bills. Tightly scoped, conversion-tracked, weekly waste-trimming. Fixed price, no lock-in.",
        primaryCta: "Free Ads teardown",
        secondaryCta: "Book a consultation",
        chips: ["Search Ads", "Performance Max", "Conversion tracking", "Landing-page tuning"],
        video: "video/google-ads-logo.mp4",
      },
      whatItIs: {
        eyebrow: "What we do",
        headlineMain: "Paid traffic",
        headlineSub: "that pays back.",
        paragraphs: [
          "Google Ads isn't an auction lottery. It's disciplined bidding on commercial search intent — combined with landing pages that turn what we buy into enquiries.",
          "At NEO that means we don't bid on vanity terms. We track every conversion to the cent. We trim waste weekly — search terms, keywords, ads that don't perform get pulled. What's left, prints.",
          "Every month you get a plain-talk note: what was invested, what came back, ROAS per campaign, and the three next levers.",
        ],
        audience:
          "Built for founder-led businesses and SMEs that put ROI over reach — not brand campaigns, but enquiry pipelines.",
      },
      outcomes: {
        eyebrow: "What changes",
        headlineMain: "Three numbers",
        headlineSub: "your CFO understands.",
        intro:
          "Median across active Ads clients over the last 12 months. Volume varies by industry, ROAS target is always cash-positive from month 2.",
        items: [
          {
            kicker: "ROAS",
            value: "5.2",
            unit: "×",
            title: "Return on ad spend",
            body: "Median across active sprints — measured as revenue from Google Ads enquiries divided by ad spend.",
          },
          {
            kicker: "CPL",
            value: "−42",
            unit: "%",
            title: "cheaper enquiries",
            body: "Cost-per-lead reduction within the first 90 days through quality-score lift and negative keywords.",
          },
          {
            kicker: "Speed",
            value: "14",
            unit: "days",
            title: "to first qualified enquiry",
            body: "From kick-off to the first booked appointment. Median — often faster in B2B.",
          },
        ],
      },
      methodology: {
        eyebrow: "How we do it",
        headlineMain: "Four phases.",
        headlineSub: "Discipline beats volume.",
        intro:
          "Ads methodology is 80 % setup, 20 % optimisation. When the setup is clean, much optimises itself — until then, we tighten every screw.",
        phases: [
          {
            kicker: "Phase 1 · Day 1–7",
            title: "Audit & conversion anchor",
            body: "We review what's been running — accounts, campaigns, tracking. Conversion tracking is usually the biggest issue.",
            bullets: [
              "Account and campaign audit",
              "Conversion tracking at server-side level",
              "Competitor analysis (Auction Insights, SimilarWeb)",
              "Written audit report with waste hot-spots",
            ],
          },
          {
            kicker: "Phase 2 · Day 8–30",
            title: "Setup & landing pages",
            body: "Tightly scoped campaign structure. Conversion-tracked landing pages — never a generic homepage as ad target.",
            bullets: [
              "Search campaigns per service / industry",
              "Performance Max with tightly scoped asset groups",
              "Landing-page builds with conversion architecture",
              "Negative keyword list (200+ terms)",
            ],
          },
          {
            kicker: "Phase 3 · Day 31–60",
            title: "Optimisation & trimming",
            body: "Data flows in. Weekly we trim waste — terms costing money without enquiries get pulled.",
            bullets: [
              "Weekly search-term review",
              "Bid strategy on conversion value",
              "Ad A/B tests running continuously",
              "Quality-score lift via landing-page tuning",
            ],
          },
          {
            kicker: "Phase 4 · Day 61–90",
            title: "Scaling & reporting",
            body: "When ROAS sits stably above target, we scale volume. Plus monthly plain-talk report with cash-flow maths.",
            bullets: [
              "Budget scaling on profitable campaigns",
              "Geo and time-of-day tuning",
              "Re-marketing audiences set up cleanly",
              "Monthly cash report with ROAS per campaign",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "What you get",
        headlineMain: "Three pillars.",
        headlineSub: "All-in.",
        intro:
          "Fixed price, all budgets in your account. We don't earn on your ad spend — we earn on results.",
        columns: [
          {
            title: "Strategy",
            items: [
              "Account and tracking audit",
              "Campaign architecture",
              "Landing-page conversion plan",
              "Competitor analysis",
              "Budget and ROAS model",
            ],
          },
          {
            title: "Execution",
            items: [
              "Search and Performance Max campaign builds",
              "Landing-page production (mobile-first)",
              "Conversion tracking (GA4 + server-side)",
              "Weekly search-term trimming",
              "Ad and asset production",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live dashboard (ROAS, CPL, conversions)",
              "Monthly cash report (one page)",
              "Weekly WhatsApp updates",
              "Direct founder access — no junior",
              "Slack or email direct line",
            ],
          },
        ],
      },
      process: {
        eyebrow: "The 90-day sprint",
        headlineMain: "Four milestones.",
        headlineSub: "Cash, not clicks.",
        intro:
          "What happens on day 1, 30, 60 and 90. We say it up front, we stick to it, and we show the ROAS maths every month.",
        steps: [
          { eta: "Day 1", title: "Audit & kick-off", body: "Audit report with waste hot-spots. 60-min setup call." },
          { eta: "Day 30", title: "Campaigns live", body: "Search + Performance Max running. Conversion tracking clean. First data." },
          { eta: "Day 60", title: "ROAS stabilising", body: "Waste trimmed, quality score up, ROAS settling in." },
          { eta: "Day 90", title: "5× ROAS (median)", body: "Profitable campaigns scaled. From here on, monthly optimisation." },
        ],
      },
      stack: {
        eyebrow: "Tools & standards",
        headlineMain: "What we work with.",
        headlineSub: "Industry standard, cleanly integrated.",
        intro:
          "You keep all accounts and access — even if you continue without us. No lock-in.",
        items: [
          { name: "Google Ads", body: "Search, Performance Max, re-marketing — all under your account." },
          { name: "GA4 + Tag Manager", body: "Conversion tracking clean, server-side where it counts." },
          { name: "Google Merchant Center", body: "For e-commerce clients — Shopping Ads cleanly integrated." },
          { name: "Looker Studio", body: "Live dashboard you can open on your phone." },
          { name: "CallRail / Hyros", body: "Call-tracking and multi-touch attribution for high-ticket industries." },
          { name: "SimilarWeb / Auction Insights", body: "Competitor visibility — who's bidding what, where." },
        ],
      },
      faq: {
        eyebrow: "Common questions",
        headlineMain: "Asked straight.",
        headlineSub: "Answered straight.",
        intro: "What founders ask most often before they release Ads budget.",
        items: [
          { q: "How much ad spend do I need?", a: "Depends on your industry and CPL. We typically recommend €1,500–€5,000 / month to start. The audit will give you a concrete number based on your market." },
          { q: "Does NEO earn on my ad budget?", a: "No. All budgets run directly through your Google Ads account. We earn the fixed monthly fee — whether your budget is €1,000 or €100,000. Incentive: results, not volume." },
          { q: "How fast will I see enquiries?", a: "With clean setup, often within the first 14 days. Scaling to stable ROAS typically takes 60–90 days." },
          { q: "What if ROAS stays below target?", a: "We meet weekly and adjust. If after 60 days it's clear the market potential isn't enough, we'll tell you honestly — and end the sprint instead of burning your budget." },
          { q: "Who writes the ads?", a: "We do. Including A/B test variants and asset production for Performance Max. You approve, we ship." },
          { q: "What about Performance Max — does it work?", a: "Yes, when you know what you're doing. Tightly scoped asset groups, account-level negative keywords, clean conversion tracking. Otherwise PMax eats budget and delivers vanity conversions." },
          { q: "What happens after the 90 days?", a: "Monthly continuation, no minimum term. You can pause anytime. All accounts and data are yours." },
        ],
      },
      leadMagnet: {
        eyebrow: "Before you invest",
        headline: "Free Ads teardown of your account.",
        body: "We open your Google Ads account (read-only) and find the three biggest waste hot-spots. A one-page plain-talk report with concrete levers you can implement immediately — whether you work with us or not.",
        bullets: [
          "Waste analysis of your active account",
          "Top 3 quick wins prioritised",
          "30-minute Loom walkthrough",
          "No sales pitch required",
        ],
        cta: "Request Ads teardown",
        note: "In your inbox within 48 working hours. Read-only access is enough.",
        modal: {
          eyebrow: "Free Ads teardown",
          headline: "Where is your account burning money?",
          sub: "We do a read-only audit of your Google Ads account and email you the top 3 levers.",
          submit: "Request teardown",
          successHeadline: "Got it — we're opening the account.",
          successBody: "Your teardown lands in your inbox within 48 working hours.",
        },
      },
      finalCta: {
        eyebrow: "Ready?",
        headlineMain: "30 minutes.",
        headlineSub: "Cash plan on one page.",
        body: "Free consultation with the founder. We review your current Ads setup live, and you get a ROAS plan on one page. No sales pitch.",
        primary: "Book a consultation",
      },
    },

    socialMedia: {
      slug: "social-media",
      meta: {
        title: "Social Media for founders & SMEs · NEO THE AGENCY",
        description:
          "Content that drives enquiries — not vanity metrics. Short-form video, paid social and creative production for founder-led brands. Fixed price, lead-driven.",
      },
      hero: {
        eyebrow: "Social media · for founders & SMEs",
        headlineTop: "Enquiries.",
        headlineBottom: "Not followers.",
        sub: "Short-form video, paid social and creative content that books appointments — not likes. Founder-led, content-driven, no buzzword bingo.",
        primaryCta: "Free content sample",
        secondaryCta: "Book a consultation",
        chips: ["Short-form video", "Paid social", "Creative production", "Posting plan"],
        video: "video/socials-logo.mp4",
      },
      whatItIs: {
        eyebrow: "What we do",
        headlineMain: "Content",
        headlineSub: "that converts.",
        paragraphs: [
          "Social media isn't a beauty contest. It's an enquiry channel — when content meets the right audience with the right intent, you get booked appointments, not vanity likes.",
          "At NEO that means we build short-form video your audience actually consumes. We combine organic content with tightly scoped paid social. And we track every enquiry back to the platform.",
          "Every month you get a plain-talk note: which content performs, which platform delivers enquiries, and what we'll produce next.",
        ],
        audience:
          "Built for founder-led brands and SMEs that use social as a sales channel — not as a PR stage.",
      },
      outcomes: {
        eyebrow: "What changes",
        headlineMain: "Three numbers",
        headlineSub: "that count.",
        intro:
          "Median across active social clients over the last 12 months. B2B and high-ticket B2C — where one enquiry is worth real money.",
        items: [
          {
            kicker: "Pipeline",
            value: "3.4",
            unit: "×",
            title: "more enquiries from social",
            body: "Average uplift after six months — across organic short-form and paid social combined.",
          },
          {
            kicker: "CPL",
            value: "€32",
            unit: "median",
            title: "Cost-per-lead via paid social",
            body: "Median across active campaigns — varies by industry, but consistently below Google-Ads CPL.",
          },
          {
            kicker: "Volume",
            value: "12",
            unit: "/month",
            title: "Short-form videos produced",
            body: "Per month in the sprint — Reels, TikTok, YouTube Shorts, all editorially planned.",
          },
        ],
      },
      methodology: {
        eyebrow: "How we do it",
        headlineMain: "Four phases.",
        headlineSub: "Lead-driven, not vanity.",
        intro:
          "Social methodology at NEO: define the enquiry first, then plan the content backwards. Never the reverse. Whoever starts with content loses.",
        phases: [
          {
            kicker: "Phase 1 · Day 1–7",
            title: "Audit & audience definition",
            body: "We analyse your platforms, competition and audience behaviour. Which platform delivers enquiries for your business?",
            bullets: [
              "Platform audit (TikTok, Instagram, LinkedIn, YouTube)",
              "Competitor content analysis",
              "Audience definition with search intent",
              "Conversion path per platform",
            ],
          },
          {
            kicker: "Phase 2 · Day 8–30",
            title: "Content engine & setup",
            body: "Editorial plan, production pipeline, tracking. Before we go live, everything is documented.",
            bullets: [
              "12-month editorial plan",
              "Short-form video templates and hooks",
              "Paid social tracking (Meta + TikTok pixel)",
              "Production schedule (12 videos / month)",
            ],
          },
          {
            kicker: "Phase 3 · Day 31–60",
            title: "Production & distribution",
            body: "Content gets produced, distributed organically and partly pushed paid. Weekly optimisation based on performance.",
            bullets: [
              "12 short-form videos per month",
              "Organic posting plan",
              "Paid social boost on high-performers",
              "Weekly performance reviews",
            ],
          },
          {
            kicker: "Phase 4 · Day 61–90",
            title: "Scaling & iteration",
            body: "What performs gets scaled. What doesn't gets stopped. Plus monthly plain-talk report on pipeline contribution.",
            bullets: [
              "Scaling on the most profitable content formats",
              "Platform shift where needed",
              "Creator-partner campaigns (optional)",
              "Monthly plain-talk report with pipeline maths",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "What you get",
        headlineMain: "Three pillars.",
        headlineSub: "All-in.",
        intro:
          "Fixed price, all ad budgets in your account. Production, distribution and reporting — complete.",
        columns: [
          {
            title: "Strategy",
            items: [
              "Platform audit",
              "Audience & conversion plan",
              "12-month editorial plan",
              "Competitor analysis",
              "Performance benchmark model",
            ],
          },
          {
            title: "Execution",
            items: [
              "12 short-form videos per month",
              "Organic posting plan (all platforms)",
              "Paid social campaigns (Meta + TikTok)",
              "Conversion tracking clean",
              "Creator and UGC production (optional)",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live dashboard (pipeline per platform)",
              "Monthly plain-talk report (one page)",
              "Weekly WhatsApp updates",
              "Direct founder access — no junior",
              "Slack or email direct line",
            ],
          },
        ],
      },
      process: {
        eyebrow: "The 90-day sprint",
        headlineMain: "Four milestones.",
        headlineSub: "Appointments, not followers.",
        intro:
          "What happens on day 1, 30, 60 and 90. We say it up front and then we deliver.",
        steps: [
          { eta: "Day 1", title: "Audit & kick-off", body: "Platform audit. Audience and content plan. Tracking setup call." },
          { eta: "Day 30", title: "First content live", body: "First 12 videos produced and posted. Paid social running." },
          { eta: "Day 60", title: "First enquiries tracked", body: "Conversion path measurable. First appointments from social." },
          { eta: "Day 90", title: "Pipeline contribution established", body: "Social is a measurable enquiry channel. Scaling begins." },
        ],
      },
      stack: {
        eyebrow: "Tools & platforms",
        headlineMain: "What we work with.",
        headlineSub: "Platform-agnostic, conversion-focused.",
        intro:
          "We choose platforms neutrally. Whichever one delivers enquiries for your business, we work on — whether that's LinkedIn or TikTok.",
        items: [
          { name: "Meta Business Suite", body: "Instagram + Facebook organic and paid, pixel tracking clean." },
          { name: "TikTok Ads Manager", body: "Short-form video for younger audiences or volume plays." },
          { name: "LinkedIn Campaign Manager", body: "B2B lead-gen with tightly scoped audiences." },
          { name: "YouTube Studio + YouTube Ads", body: "Long-form authority and pre-roll targeting." },
          { name: "GA4 + Tag Manager", body: "Cross-platform conversion tracking, cleanly attributed." },
          { name: "CapCut + Premiere", body: "Production stack for short-form video — fast, polished, scalable." },
        ],
      },
      faq: {
        eyebrow: "Common questions",
        headlineMain: "Asked straight.",
        headlineSub: "Answered straight.",
        intro: "What founders ask most often before they release social budget.",
        items: [
          { q: "Do I need to be present on every platform?", a: "No. We recommend 1–2 platforms where your audience actually spends time. Better deep than wide." },
          { q: "What if I don't want to be on camera?", a: "Works. We build UGC-style content with creators or product-led visuals. But personal founder content typically performs best." },
          { q: "How much ad budget do I need?", a: "For paid social we recommend at least €1,500 / month to start. Organic works without it — just takes longer." },
          { q: "Who produces the videos?", a: "We do. Including scripts, storyboard, edit, hooks. You approve, we publish. For founder content we need 2 h per month from you." },
          { q: "How fast will I see enquiries?", a: "Organic takes 60–90 days for first tracked conversions. Paid social often within 2–3 weeks if setup is clean." },
          { q: "What about creators and influencer marketing?", a: "When relevant, yes — but as an add-on, not default. Founder-led brands typically build best on their own founder content. Creators come when volume justifies it." },
          { q: "What happens after the 90 days?", a: "Monthly continuation, no minimum term. You keep all accounts, all content, all data — if you stop, nothing is lost." },
        ],
      },
      leadMagnet: {
        eyebrow: "Before you invest",
        headline: "Free content sample for your brand.",
        body: "We produce a 60-second short-form video sample for your brand — based on a conversion hypothesis we draw from your business. You see how our content would look for you, before you decide.",
        bullets: [
          "One 60-second short-form video production",
          "Conversion hypothesis explained in writing",
          "Suggested hook and script",
          "No sales pitch required",
        ],
        cta: "Request content sample",
        note: "Production time 5–7 working days. No spam, no obligation.",
        modal: {
          eyebrow: "Free content sample",
          headline: "We'll produce a video for you.",
          sub: "Send us your brand and audience — you'll get a 60-second short-form video sample. Whether you work with us or not.",
          submit: "Request sample",
          successHeadline: "Got it — we're producing.",
          successBody: "Your sample is in your inbox within 5–7 working days.",
        },
      },
      finalCta: {
        eyebrow: "Ready?",
        headlineMain: "30 minutes.",
        headlineSub: "Content plan on one page.",
        body: "Free consultation with the founder. We define live which platform works for your business — and what the first 90-day sprint looks like.",
        primary: "Book a consultation",
      },
    },

    websites: {
      slug: "websites",
      meta: {
        title: "Websites for founders & SMEs · NEO THE AGENCY",
        description:
          "Conversion-optimised websites that rank from day one. Mobile-first, Core Web Vitals, self-editable. Fixed price, live in 6–8 weeks.",
      },
      hero: {
        eyebrow: "Website development · for founders & SMEs",
        headlineTop: "Your site,",
        headlineBottom: "as an asset.",
        sub: "Fast, modern, mobile-first websites that load quickly, look right, and turn visitors into enquiries. On platforms you can edit yourself.",
        primaryCta: "Speed & conversion report",
        secondaryCta: "Book a consultation",
        chips: ["Mobile-first", "Core Web Vitals", "Conversion architecture", "Self-editable"],
        video: "video/website-logo.mp4",
      },
      whatItIs: {
        eyebrow: "What we do",
        headlineMain: "Websites",
        headlineSub: "that print.",
        paragraphs: [
          "A website isn't an online business card. It's your most active salesperson — 24/7, no sick days. If it's bad, it costs you money daily. If it's good, it prints enquiries.",
          "At NEO that means mobile-first design, Core Web Vitals under 2.5 s LCP, conversion architecture grounded in actual user behaviour. Plus: all content self-editable — you're not dependent on us for every comma fix.",
          "You get a site that ranks from day one, converts from day one, and grows with you over the next five years — without a complete redesign.",
        ],
        audience:
          "Built for founder-led businesses and SMEs that treat their website as a sales asset — not as a mandatory online presence.",
      },
      outcomes: {
        eyebrow: "What changes",
        headlineMain: "Three numbers",
        headlineSub: "you'll feel.",
        intro:
          "Median across website projects over the last 12 months. Industry mix — consultancies, trades, premium services, B2B.",
        items: [
          {
            kicker: "Speed",
            value: "1.8",
            unit: "s",
            title: "LCP median",
            body: "Largest Contentful Paint at 75th percentile — faster than 92 % of mid-market German websites.",
          },
          {
            kicker: "Conversion",
            value: "3.1",
            unit: "×",
            title: "higher enquiry rate",
            body: "Median uplift in conversion rate vs the previous site, measured 6 weeks post-launch.",
          },
          {
            kicker: "Time-to-live",
            value: "6",
            unit: "weeks",
            title: "from kick-off to launch",
            body: "Median for standard sprints. Plus 2 weeks if extensive content needs producing.",
          },
        ],
      },
      methodology: {
        eyebrow: "How we do it",
        headlineMain: "Four phases.",
        headlineSub: "Conversion before pixels.",
        intro:
          "Website methodology at NEO: define conversion architecture first, then design visually. Never the reverse. Whoever starts with pixels loses.",
        phases: [
          {
            kicker: "Phase 1 · Week 1",
            title: "Discovery & conversion plan",
            body: "We understand your audience, conversion paths and competition. Before anything is designed, the plan is in place.",
            bullets: [
              "Stakeholder interviews and audience mapping",
              "Conversion architecture (wireframes)",
              "Content inventory and plan",
              "SEO and tech briefing",
            ],
          },
          {
            kicker: "Phase 2 · Week 2–3",
            title: "Design & prototyping",
            body: "High-fidelity design in NEO's or your brand system. Mobile-first, accessibility-compliant, conversion-led.",
            bullets: [
              "Mobile-first design (375 px → 1440 px)",
              "Interactive prototype (Figma)",
              "Accessibility check (WCAG 2.2 AA)",
              "2 review rounds with you",
            ],
          },
          {
            kicker: "Phase 3 · Week 4–5",
            title: "Build & content",
            body: "We build on platforms you can edit yourself — Webflow, Framer, or custom stack if needed. Content in parallel.",
            bullets: [
              "Platform build (Webflow / Framer / custom)",
              "Content production in parallel",
              "Schema.org and SEO cleanly integrated",
              "Tracking (GA4 + Tag Manager) from day one",
            ],
          },
          {
            kicker: "Phase 4 · Week 6",
            title: "QA & launch",
            body: "Cross-browser, mobile, speed, accessibility. Plus handover — you get a 30-min video tutorial on how to edit yourself.",
            bullets: [
              "Cross-browser and device testing",
              "Speed optimisation (Core Web Vitals)",
              "Launch checklist (DNS, SSL, redirects)",
              "Handover and editing tutorial",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "What you get",
        headlineMain: "Three pillars.",
        headlineSub: "All-in.",
        intro:
          "Fixed price. A complete website incl. design, build, content production and launch — no add-ons, no setup surprise.",
        columns: [
          {
            title: "Strategy",
            items: [
              "Discovery & stakeholder interviews",
              "Conversion architecture and wireframes",
              "Content and SEO plan",
              "Competitor analysis",
              "Tech-stack recommendation",
            ],
          },
          {
            title: "Execution",
            items: [
              "Mobile-first design (Figma)",
              "Platform build (Webflow / Framer / custom)",
              "Content production (copy, photos, video)",
              "Schema.org and SEO integration",
              "Tracking setup (GA4 + Tag Manager)",
            ],
          },
          {
            title: "Launch & aftercare",
            items: [
              "Cross-browser and mobile QA",
              "Core Web Vitals optimisation",
              "Launch checklist (DNS, SSL, redirects)",
              "Editing tutorial (30-min video)",
              "30 days bug-fix support post-launch",
            ],
          },
        ],
      },
      process: {
        eyebrow: "The 6-week sprint",
        headlineMain: "Four milestones.",
        headlineSub: "Fast, clean, documented.",
        intro:
          "Standard sprint takes 6 weeks. What happens each week is below — no black box.",
        steps: [
          { eta: "Week 1", title: "Discovery", body: "Stakeholder interviews, conversion plan, content inventory." },
          { eta: "Week 2–3", title: "Design", body: "Mobile-first design in Figma. 2 review rounds, accessibility check." },
          { eta: "Week 4–5", title: "Build & content", body: "Platform build, content production, tracking set up cleanly." },
          { eta: "Week 6", title: "Launch", body: "QA, speed optimisation, launch and handover incl. editing tutorial." },
        ],
      },
      stack: {
        eyebrow: "Tech stack",
        headlineMain: "What we build with.",
        headlineSub: "What you can edit yourself.",
        intro:
          "We build on platforms you can maintain — no Wordpress plugin hell, no custom black box only we can open.",
        items: [
          { name: "Webflow", body: "Default for marketing websites — visually editable, fast, SEO-friendly." },
          { name: "Framer", body: "When motion design is a priority." },
          { name: "Custom (Vite + React + Tailwind)", body: "For e-commerce, complex apps, or specific performance targets." },
          { name: "Figma", body: "Design source of truth — you get the file, it's yours." },
          { name: "GA4 + Tag Manager", body: "Tracking from day one cleanly set up, server-side where needed." },
          { name: "Cloudinary / Sanity", body: "Asset management and headless CMS, when content volume justifies it." },
        ],
      },
      faq: {
        eyebrow: "Common questions",
        headlineMain: "Asked straight.",
        headlineSub: "Answered straight.",
        intro: "What founders ask most often before starting a website project.",
        items: [
          { q: "How long does a typical project take?", a: "Standard sprint 6 weeks. Plus 2 weeks if we produce extensive new content. Larger e-commerce builds can be 8–12 weeks — we'll tell you that up front." },
          { q: "Which platform do you recommend?", a: "Webflow is our default for marketing websites. Framer for motion-heavy brands. Custom React when performance or complexity demand it. We recommend what fits you — not us." },
          { q: "Can I maintain the site myself?", a: "Yes, that's standard. You get editing access and a 30-min video tutorial. With Webflow/Framer you can change copy, images and pages yourself." },
          { q: "What happens to my old site?", a: "We do a 301-redirect mapping so no SEO trust is lost. Plus a backup, in case you want to roll back." },
          { q: "What if I want changes after launch?", a: "30 days bug-fix support are included in the fixed price. After that: monthly care packages or hourly — you decide." },
          { q: "What about SEO — will the new site rank?", a: "We build SEO-first — Schema.org, Core Web Vitals, clean URL structure, content strategy from day one. If you want to actively rank, we add our SEO sprint on top." },
          { q: "What's the cost difference between custom and Webflow?", a: "Fixed-price range starts at €15,000 (Webflow marketing site) and can go to €60,000+ (custom React/e-commerce). We give you a concrete number in the consultation." },
        ],
      },
      leadMagnet: {
        eyebrow: "Before you decide",
        headline: "Free Speed & Conversion Report.",
        body: "We analyse your current website on Core Web Vitals, mobile performance and conversion architecture. You get a one-page report with the three highest-impact levers — whether you build with us or not.",
        bullets: [
          "Core Web Vitals measurement (LCP, CLS, INP)",
          "Mobile performance audit",
          "Top 3 conversion levers prioritised",
          "No sales pitch required",
        ],
        cta: "Request speed report",
        note: "In your inbox within 24 working hours.",
        modal: {
          eyebrow: "Free Speed & Conversion Report",
          headline: "Where is your site losing enquiries?",
          sub: "Send us your domain — you'll get a speed and conversion audit by email.",
          submit: "Request report",
          successHeadline: "Got it — we're measuring.",
          successBody: "Your report lands in your inbox within 24 working hours.",
        },
      },
      finalCta: {
        eyebrow: "Ready?",
        headlineMain: "30 minutes.",
        headlineSub: "Website plan on one page.",
        body: "Free consultation with the founder. We review your current site live, and you get a sprint plan on one page. No sales pitch.",
        primary: "Book a consultation",
      },
    },
  },
};

export const translations: Record<Lang, Translations> = { de, en };

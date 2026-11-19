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
    languageLabel?: string;
    languages?: { de: string; en: string };
    services?: { title: string; sub: string; href: string }[];
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
  sticky: { cta: string; arrow: string; button?: string };
  modal: {
    eyebrow: string;
    headline: string;
    sub: string;
    name: string;
    email: string;
    submit: string;
    dismiss: string;
  };
  about: {
    meta: { title: string; description: string };
    hero: {
      eyebrow: string;
      headlinePre: string;
      headlineSoft: string;
      sub: string;
      locations: string;
      imageAlt: string;
    };
    pillarsIntro: {
      eyebrow: string;
      headlinePre: string;
      headlineSoft: string;
      body: string;
    };
    pillars: {
      label: string;
      headline: string;
      body: string;
    }[];
    method: {
      eyebrow: string;
      headlinePre: string;
      headlineSoft: string;
      intro: string;
      steps: { label: string; body: string }[];
      note: string;
    };
    services: {
      eyebrow: string;
      headline: string;
      items: { title: string; body: string; href: string }[];
    };
    audience: { eyebrow: string; headline: string; body: string };
    why: { eyebrow: string; headline: string; body: string };
    studio: {
      eyebrow: string;
      headlinePre: string;
      headlineSoft: string;
      body: string;
      bullets: string[];
      imageAlt: string;
    };
    cta: {
      eyebrow: string;
      headlinePre: string;
      headlineSoft: string;
      body: string;
      button: string;
      secondary: string;
      smallprint: string;
    };
  };
  servicePages: ServicePage;
};

export type ServicePageContent = {
  slug: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    /** Optional smaller first line inside the H1, before headlineTop. */
    h1Lead?: string;
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
      { label: "Leistungen", href: "/#services" },
      { label: "Über uns", href: "/uber-uns/" },
      { label: "Kundenprojekte", href: "/#cases" },
      { label: "Kontakt", href: "/#contact" },
    ],
    cta: "Erstgespräch",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    services: [
      { title: "SEO", sub: "Bei Google gefunden werden", href: "/seo-agentur/" },
      { title: "Google Ads", sub: "Suchanzeigen, die Anfragen bringen", href: "/services/google-ads/" },
      { title: "Social Media", sub: "Inhalte und Anzeigen für Ihre Kanäle", href: "/services/social-media/" },
      { title: "Websites", sub: "Websites für kleine und mittlere Unternehmen", href: "/services/websites/" },
    ],
  },

  hero: {
    eyebrow: "Online-Marketing-Agentur für Inhaber und Mittelstand",
    headlineTop: "Jede Woche neue Verkaufschancen.",
    headlineBottom: "Über Google, KI-Suche und eine Website, die liefert.",
    sub: "Als Online-Marketing-Agentur sorgen wir dafür, dass man Sie in jeder relevanten Stadt und in jedem Stadtteil findet. Das Ergebnis sind Anfragen, keine leeren Versprechen.",
    services: [
      "Suchmaschinenoptimierung (SEO)",
      "KI-Suchoptimierung",
      "Website-Entwicklung auf Premium-Niveau",
    ],
    priceLine: "Kostenloses Erstgespräch",
    priceLineSub: "Antwort innerhalb von 24 Stunden",
    cta: "Jetzt starten",
    pauseLabel: "Hero-Video pausieren",
    playLabel: "Hero-Video abspielen",
  },

  snapshot: {
    title: "Ihre Online-Marketing-Agentur auf einen Blick",
    tagline: "In 30 Sekunden: was wir tun, für wen und was Sie bekommen.",
    items: [
      {
        index: "01",
        label: "Was",
        headline: "Mehr Anfragen.",
        detail: "Als Performance-Marketing-Agentur verbinden wir bezahlte Anzeigen und SEO, messbar bis zum Umsatz.",
      },
      {
        index: "02",
        label: "Für wen",
        headline: "Inhaber und Mittelstand.",
        detail: "Beratungen, Handwerksbetriebe, Dienstleister und B2B-Unternehmen.",
      },
      {
        index: "03",
        label: "Was Sie bekommen",
        headline: "Premium-Website und SEO-Seiten.",
        detail: "Eine Website, die liefert, und Leistungsseiten, die ab Tag 1 ranken.",
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
          "In 90 Tagen von null auf Seite 1 für „villa rental bali“. Seitdem laufend Direktbuchungen statt Provision an Plattformen.",
      },
      {
        name: "Faisaö Chauhan",
        role: "Director ADDRESSBALI®",
        description:
          "Premium-Villenmarke. Kompletter Website-Relaunch plus Performance-Marketing-Sprint, 8× mehr Anfragen in der Pipeline.",
      },
      {
        name: "Enting Man",
        role: "Founder & Director Cunos",
        description:
          "B2B-Beratungsmarke. Klare Positionierung, eine Website-Struktur, die von SEO her gedacht ist, und qualifizierte Inbound-Anfragen ab Tag 30.",
      },
      {
        name: "Dana",
        role: "Marketing Director Pentadoc",
        description:
          "Plattform für Document Intelligence. Redaktionelle Startseite, klarer Weg zur Anfrage, doppelt so viele Demo-Anfragen.",
      },
      {
        name: "Johannes",
        role: "Founder & CEO CEx",
        description:
          "Plattform für Customer Excellence. Startbereich mit Sonnenuntergangsmotiv plus Leistungskarten. Die SEO-Struktur trägt das Wachstum der B2B-Pipeline.",
      },
    ],
  },

  whyManifesto: {
    eyebrow: "Wofür wir stehen",
    headline: "Commitment.",
    paragraphs: [
      "Ein Ziel verbindet alle Projekte: Ihr Umsatz wächst. Erfolg messen wir daran. Nicht an unserer Kreativität.",
      "NEO THE AGENCY® ist High-End Performance Marketing. Erfolge sind messbar. Wir liefern Anfragen — keine Tabellen.",
      "Hintergrund: Strategieberatung, Unternehmensberatung, Projektmanagement. Sie bekommen das Komplettpaket — Strategie, Projektsteuerung, Handwerk.",
    ],
    closing: "Customer Excellence ist der Kompass. Drei Prinzipien zeigen, wie das in der Praxis aussieht.",
    founderName: "Raoul Müller",
    founderRole: "Gründer · NEO THE AGENCY",
  },

  principles: {
    eyebrow: "Wie wir arbeiten",
    headlineMain: "Drei Prinzipien.",
    headlineSub: "Eine Methode.",
    intro:
      "Customer Excellence klingt abstrakt. Konkret heißt das: Commitment. Performance. Fairer Preis. Drei Sätze. Jeden Tag.",
    items: [
      {
        title: "Commitment",
        body:
          "Wir gehen mit. Sie kriegen den Gründer am Hörer — nicht den Account-Manager mit Excel. Jedes Projekt wird unsers.",
        kicker: "Prinzip",
      },
      {
        title: "Performance",
        body:
          "Wir zählen Anfragen. Nicht Klicks. Jeden Monat: was sich bewegt hat, warum. Kein Schönreden. Keine Eitelkeitsmetriken.",
        kicker: "Prinzip",
      },
      {
        title: "Fairer Preis",
        body:
          "Festpreis vom ersten Tag. Kein Setup-Trick. Keine Mindestlaufzeit. Keine versteckten Stunden. Was Sie sehen, kriegen Sie.",
        kicker: "Prinzip",
      },
    ],
  },

  services: {
    eyebrow: "Was wir tun",
    headlineMain: "Vier Disziplinen.",
    headlineSub: "Eine Pipeline.",
    intro:
      "Als Full-Service-Agentur verzahnen wir alle vier Bereiche, denn Wachstum entsteht nicht in Silos. Klicken Sie sich durch oder lehnen Sie sich zurück.",
    items: [
      {
        key: "seo",
        title: "SEO",
        promise: "Seite 1 bei Google. In 90 Tagen.",
        detail:
          "Wir beheben technische Fehler, schreiben Inhalte, die Klicks holen, und bauen Links auf, die sich auszahlen. Jeden Monat zeigen wir Ihnen die Zahlen dahinter: was sich bewegt hat, warum und was als Nächstes kommt.",
        bullets: [
          "Technisches SEO-Audit",
          "Inhalte und On-Page-Optimierung",
          "Autoritätsaufbau",
          "Monatliche Auswertung",
        ],
      },
      {
        key: "google-ads",
        title: "Google Ads",
        promise: "Bezahlter Traffic, der sich rechnet. ROI-positiv.",
        detail:
          "Eng geschnittene Kampagnen und ein Conversion-Tracking, das stimmt. Jede Woche streichen wir, was Budget verbrennt. Wir optimieren auf Umsatz, nicht auf schöne Klickzahlen.",
        bullets: [
          "Suchanzeigen und Performance Max",
          "Conversion-Tracking",
          "Landingpages, die konvertieren",
          "Wöchentliche Optimierung",
        ],
      },
      {
        key: "social",
        title: "Social Media",
        promise: "Content, der Anfragen bringt. Likes sind kein KPI.",
        detail:
          "Kurzvideos, Paid Social und Kreativarbeit, die zur jeweiligen Plattform passt. Follower sind nett, Termine sind besser.",
        bullets: [
          "Kurzvideos",
          "Paid Social",
          "Kreativproduktion",
          "Redaktionsplan, der auf Anfragen zielt",
        ],
      },
      {
        key: "websites",
        title: "Websites",
        promise: "Seiten, die ab Tag 1 ranken und ab dem ersten Klick konvertieren.",
        detail:
          "Modern und zuerst für das Smartphone gebaut. Ihre Website lädt schnell, sieht gut aus und macht aus Besuchern Anfragen. Auf Plattformen, die Sie selbst pflegen können.",
        bullets: [
          "Mobile-first-Design",
          "Core Web Vitals",
          "Auf Anfragen ausgelegt",
          "Selbst bearbeitbar",
        ],
      },
    ],
  },

  cases: {
    eyebrow: "Kundenprojekte",
    headlineMain: "Echte Marken.",
    headlineSub: "Echte Zahlen.",
    intro:
      "Eine Auswahl. Alle Kunden sitzen seit fünf Jahren mit uns am Tisch, sonst hätten wir gar nicht erst angefangen.",
    serviceLabel: "Leistungen",
    timelineLabel: "Zeitraum",
  },

  comparison: {
    eyebrow: "NEO im Vergleich",
    headlineMain: "Was wir anders machen.",
    headlineSub: "Sechs Punkte.",
    intro:
      "Damit Sie vorher wissen, worauf Sie sich einlassen.",
    columns: { other: "Andere Agenturen", neo: "NEO THE AGENCY" },
    rows: [
      {
        topic: "Vertragslaufzeit",
        other: "12 oder 24 Monate, schwer kündbar",
        neo: "90-Tage-Sprint, danach monatlich verlängerbar",
      },
      {
        topic: "Reporting",
        other: "Schöne Zahlen in 30-seitigen PDFs",
        neo: "Anfragen, Umsatz und Quellen auf einer Seite",
      },
      {
        topic: "Ansprechpartner",
        other: "Ein Account-Manager, der Excel vorliest",
        neo: "Der Gründer, direkt am Telefon",
      },
      {
        topic: "Preise",
        other: "Stundensätze, Einrichtungsgebühren, Zusatzkosten",
        neo: "Festpreis, alles inklusive, transparent",
      },
      {
        topic: "Ziel",
        other: "Mehr Klicks, mehr Reichweite",
        neo: "Mehr qualifizierte Anfragen",
      },
      {
        topic: "Daten und Konten",
        other: "Gehen beim Wechsel verloren",
        neo: "Ihnen gehört alles, vom ersten Tag an",
      },
    ],
  },

  process: {
    eyebrow: "Der 90-Tage-Sprint",
    headlineMain: "Vier Meilensteine.",
    headlineSub: "Keine Überraschungen.",
    intro:
      "Was an Tag 1, 30, 60 und 90 passiert, sagen wir Ihnen vorher. Daran halten wir uns. Jeden Monat sehen Sie schwarz auf weiß, was es gebracht hat.",
    steps: [
      {
        n: "01",
        eta: "Tag 1",
        title: "Audit und Kickoff",
        body:
          "Technisches SEO-Audit, Kanal-Diagnose und Wettbewerbsanalyse. Dazu 30 Minuten Bildschirmfreigabe direkt mit dem Gründer.",
      },
      {
        n: "02",
        eta: "Tag 30",
        title: "Launch",
        body:
          "Das Tracking läuft, neue Landingpages sind online, Google Ads ist aktiv und die On-Page-Optimierung ist umgesetzt.",
      },
      {
        n: "03",
        eta: "Tag 60",
        title: "Erste Keywords auf Seite 1",
        body:
          "Die ersten kommerziellen Keywords stehen auf Seite 1, die Pipeline füllt sich. Sie bekommen einen monatlichen Report in Klartext, mit den nächsten Hebeln.",
      },
      {
        n: "04",
        eta: "Tag 90",
        title: "8× Pipeline",
        body:
          "Gemessene Steigerung qualifizierter Anfragen. Ab hier optimieren wir monatlich. Keine Überraschungen, keine Mindestlaufzeit.",
      },
    ],
  },

  metrics: {
    eyebrow: "Zahlen",
    headlineMain: "Was wirklich zählt.",
    headlineSub: "Anfragen statt Klicks.",
    intro: "Vier Zahlen aus echten Kundenprojekten. Gemessen, nicht behauptet.",
    items: [
      { value: 8, suffix: "×", label: "mehr Anfragen pro Monat" },
      { value: 90, suffix: "", label: "Tage bis Seite 1 bei Google" },
      { value: 4, suffix: "", label: "Kundenprojekte abgeschlossen" },
    ],
  },

  founder: {
    eyebrow: "Eine Notiz vom Gründer",
    headlinePre: "Sie sprechen mit der Person,",
    headlineSoft: "die auch liefert.",
    paragraphs: [
      "Ich habe NEO gegründet, weil ich es leid war: Gute Firmen zahlen Tausende im Monat, bekommen Zahlen, die gut aussehen, und trotzdem landen keine Anfragen im Posteingang. Hier ändert sich das.",
      "Bei NEO gibt es keinen Account-Manager mit Excel-Tabelle. Sie haben mich am Telefon. Festpreis, kein Lock-in und ein 90-Tage-Sprint, für den ich mit meinem Namen geradestehe.",
      "Klingt nach Ihrer Art zu arbeiten? Schreiben Sie mir unten. Werktags antworte ich innerhalb von 24 Stunden, persönlich.",
    ],
    signature: "Raoul",
    signatureBlock: "Raoul Müller · Gründer, NEO THE AGENCY",
  },

  contact: {
    eyebrow: "Schreiben Sie uns",
    headlinePre: "Lassen Sie uns",
    headlineSoft: "starten.",
    intro:
      "Das Erstgespräch ist kostenlos. Ich antworte Ihnen persönlich, werktags innerhalb von 24 Stunden.",
    form: {
      name: "Name",
      email: "E-Mail",
      company: "Unternehmen (optional)",
      message: "Was möchten Sie erreichen?",
      submit: "Nachricht senden",
      success: "Danke. Sie hören werktags innerhalb von 24 Stunden von mir.",
    },
    tiles: [
      { kicker: "Telefon", value: "+49 160 9689 7003" },
      { kicker: "WhatsApp", value: "+49 176 82360647" },
      { kicker: "Adresse", value: "Kolonnenstraße 8, 10827 Berlin" },
    ],
  },

  footer: {
    blurb:
      "Performance-Marketing aus Berlin: SEO, Google Ads, Websites und Social Media für inhabergeführte und kleine Unternehmen in ganz Deutschland. Wir machen Ihre Website zum Vertriebskanal, der qualifizierte Anfragen bringt.",
    sections: [
      {
        title: "Leistungen",
        links: [
          { label: "SEO", href: "/seo-agentur/" },
          { label: "Google Ads", href: "/services/google-ads/" },
          { label: "Social Media", href: "/services/social-media/" },
          { label: "Websites", href: "/services/websites/" },
        ],
      },
      {
        title: "Agentur",
        links: [
          { label: "Über uns", href: "/uber-uns/" },
          { label: "Kundenprojekte", href: "/#cases" },
          { label: "Kontakt", href: "/#contact" },
        ],
      },
    ],
    rights: "© {year} Digital Movement Germany, Raoul Müller, handelnd als NEO the Agency. Alle Rechte vorbehalten.",
    legal: [
      { label: "Impressum", href: "/impressum/" },
      { label: "Datenschutz", href: "/datenschutz/" },
    ],
  },

  sticky: {
    cta: "Kostenloses Erstgespräch",
    arrow: "→",
    button: "Anfragen",
  },

  modal: {
    eyebrow: "Bevor Sie weiterlesen",
    headline: "Kostenloses Audit Ihrer Website.",
    sub: "Wir gehen Ihre Website 30 Minuten lang gemeinsam mit Ihnen durch, dazu kommt ein einseitiges Audit per E-Mail. Beides bekommen Sie auch, wenn wir danach nicht zusammenarbeiten.",
    name: "Name",
    email: "E-Mail",
    submit: "Audit anfordern",
    dismiss: "Vielleicht später",
  },

  about: {
    meta: {
      title: "Über uns: Marketing-Agentur aus Berlin | NEO THE AGENCY",
      description:
        "NEO THE AGENCY ist eine kleine Marketing-Agentur aus Berlin: SEO, KI-Suche, Google Ads, Social Media und Websites für Inhaber und den Mittelstand.",
    },
    hero: {
      eyebrow: "Über uns",
      headlinePre: "NEO THE AGENCY:",
      headlineSoft: "Marketing-Agentur aus Berlin",
      sub: "NEO THE AGENCY ist eine kleine, inhabergeführte Marketing-Agentur aus Berlin. Für Inhaber und mittelständische Unternehmen übernehmen wir SEO, Optimierung für KI-Antworten, Google Ads, Social Media und Websites, zum Festpreis und in 90-Tage-Sprints.",
      locations: "Berlin",
      imageAlt: "Heller Büroraum mit Pflanzen und Sitzgruppen",
    },
    pillarsIntro: {
      eyebrow: "Worauf wir bauen",
      headlinePre: "Drei Sätze.",
      headlineSoft: "Eine Arbeitsweise.",
      body: "An diesen drei Sätzen messen wir jedes Versprechen an unsere Kunden. Nach ihnen entscheiden wir, welche Aufträge wir annehmen und welche wir ablehnen.",
    },
    pillars: [
      {
        label: "Vision",
        headline:
          "Eine Welt, in der jedes mittelständische Unternehmen online gefunden wird, auch von KI.",
        body: "Inhabergeführte Unternehmen sollen bei Google und in ChatGPT, Perplexity und Gemini auftauchen, ohne eine eigene Marketingabteilung aufzubauen.",
      },
      {
        label: "Mission",
        headline:
          "Performance-Marketing verständlich machen und in echte Anfragen übersetzen.",
        body: "Schluss mit Vanity-Metriken, Reporting-Theater und Account-Manager-Ketten. Wir liefern technische SEO, Optimierung für KI-Antworten und High-End-Websites zum Festpreis und stehen mit unserem Namen dafür gerade.",
      },
      {
        label: "Werte",
        headline: "Commitment. Performance. Fairer Preis.",
        body: "Wir nehmen weniger Kunden an und sind für jeden Kunden direkt am Telefon erreichbar. Was wir versprechen, halten wir. Was wir nicht halten können, versprechen wir nicht.",
      },
    ],
    method: {
      eyebrow: "Arbeitsweise",
      headlinePre: "So arbeitet NEO THE AGENCY:",
      headlineSoft: "ein Festpreis, ein 90-Tage-Sprint.",
      intro:
        "Jedes Projekt startet mit einem 90-Tage-Sprint zum Festpreis. Sie sprechen direkt mit den Leuten, die die Arbeit machen. Eine Pyramide aus Junior-Beratern gibt es bei uns nicht, und wir geben nichts an White-Label-Subunternehmer weiter.",
      steps: [
        {
          label: "Tag 1 · Audit und Kickoff",
          body: "Technisches SEO-Audit, Kanal-Diagnose und Wettbewerbsanalyse. Die Ergebnisse gehen wir mit Ihnen in 30 Minuten per Bildschirmfreigabe durch.",
        },
        {
          label: "Tag 30 · Launch",
          body: "Das Tracking ist live, neue Landingpages stehen, die Google Ads laufen und die On-Page-SEO ist umgesetzt.",
        },
        {
          label: "Tag 60 · Erste Rankings",
          body: "Ihre Seiten ranken für die ersten kaufrelevanten Suchbegriffe auf Seite 1. Jeden Monat bekommen Sie einen Bericht in klarer Sprache.",
        },
        {
          label: "Tag 90 · Pipeline",
          body: "Wir messen, wie viele qualifizierte Anfragen dazugekommen sind. Danach optimieren wir monatlich weiter, ohne Mindestlaufzeit.",
        },
      ],
      note: "Alles, was wir für Sie aufbauen, gehört Ihnen vom ersten Tag an.",
    },
    services: {
      eyebrow: "Leistungen",
      headline: "Was wir für Sie übernehmen",
      items: [
        {
          title: "SEO",
          body: "Technische SEO, On-Page-Optimierung und Landingpages für die Suchbegriffe, mit denen Ihre Kunden nach Ihren Leistungen suchen.",
          href: "/seo-agentur/",
        },
        {
          title: "Optimierung für KI-Antworten",
          body: "Wir bereiten Inhalte und Struktur Ihrer Website so auf, dass ChatGPT, Perplexity und Gemini sie auswerten können.",
          href: "/seo-agentur/",
        },
        {
          title: "Google Ads",
          body: "Kampagnen für Suchanfragen mit Kaufabsicht, mit sauberem Tracking ab dem ersten Monat.",
          href: "/services/google-ads",
        },
        {
          title: "Social Media",
          body: "Betreuung Ihrer Social-Media-Kanäle als Teil Ihrer gesamten Marketingstrategie.",
          href: "/services/social-media",
        },
        {
          title: "Websites",
          body: "High-End-Websites und Landingpages, die Ihnen vom ersten Tag an gehören.",
          href: "/services/websites",
        },
      ],
    },
    audience: {
      eyebrow: "Für wen",
      headline: "Für Inhaber und Mittelstand",
      body: "Wir arbeiten für Unternehmen, meist inhabergeführte Firmen aus dem Mittelstand, die keine eigene Marketingabteilung haben und trotzdem bei Google und in KI-Antworten auftauchen wollen. Am besten passen wir zu Inhaberinnen und Inhabern, die Wachstum ernst nehmen, klare Sprache mögen und von Marketing-Floskeln genug haben. Unser Angebot richtet sich ausschließlich an Unternehmen.",
    },
    why: {
      eyebrow: "Warum NEO",
      headline: "Weniger Berichte, mehr Anfragen",
      body: "Viele gute Unternehmen zahlen Agenturen jeden Monat Tausende Euro und bekommen dafür Berichte, aber kaum Anfragen. Deshalb wurde NEO THE AGENCY 2026 in Berlin gegründet. Wir arbeiten mit festen Preisen, ohne lange Vertragsbindung und ohne White-Label-Dienstleister. Den Erfolg unserer Arbeit messen wir an qualifizierten Anfragen.",
    },
    studio: {
      eyebrow: "Standort",
      headlinePre: "Marketing-Agentur",
      headlineSoft: "in Berlin-Schöneberg.",
      body: "Unser Sitz ist die Kolonnenstraße 8 in 10827 Berlin. Im Alltag arbeiten wir überwiegend asynchron. Wenn eine Entscheidung ansteht, sprechen wir live mit Ihnen.",
      bullets: [
        "Sitz in Berlin-Schöneberg",
        "Persönliche Workshops vor Ort möglich",
        "Asynchron im Alltag, live bei Entscheidungen",
      ],
      imageAlt: "Besprechungsraum mit langem Holztisch und großen Fenstern",
    },
    cta: {
      eyebrow: "Bereit?",
      headlinePre: "Lassen Sie uns",
      headlineSoft: "über Ihr Wachstum reden.",
      body: "Kostenloses Erstgespräch. Antwort werktags innerhalb von 24 Stunden.",
      button: "Kostenlose Potenzialanalyse starten",
      secondary: "Erstgespräch vereinbaren",
      smallprint:
        "Alle Preise netto zzgl. MwSt. Das Angebot richtet sich an Unternehmen.",
    },
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
        title: "Google Ads Agentur: Betreuung zum Festpreis | NEO THE AGENCY",
        description: "Google Ads Betreuung für Inhaber und Mittelstand: Search Ads, Performance Max und sauberes Conversion-Tracking. Zum Festpreis, ohne lange Bindung.",
      },
      hero: {
        eyebrow: "Google Ads Betreuung · für Inhaber und Mittelstand",
        headlineTop: "Google Ads Agentur:",
        headlineBottom: "ROI. Nicht Reichweite.",
        sub: "Als Google-Ads-Agentur bauen wir Kampagnen, die Anfragen bringen und nicht nur Klicks kosten. Eng gefasst, mit Conversion-Tracking und jede Woche von Streuverlusten bereinigt. Zum Festpreis und ohne lange Vertragsbindung.",
        primaryCta: "Kostenloser Ads-Check",
        secondaryCta: "Erstgespräch buchen",
        chips: [
          "Search Ads",
          "Performance Max",
          "Conversion-Tracking",
          "Landingpage-Optimierung",
        ],
        video: "video/google-ads-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Ihre Google Ads Agentur:",
        headlineSub: "bezahlter Traffic, der sich rechnet.",
        paragraphs: [
          "In der Google-Auktion gewinnt, wer diszipliniert auf Suchanfragen mit Kaufabsicht bietet und die Klicks auf Landingpages schickt, die daraus Anfragen machen.",
          "Bei NEO heißt das: Wir bieten nicht auf Begriffe, die nur gut aussehen. Wir messen jede Conversion auf den Cent genau. Jede Woche fliegt raus, was kein Geld bringt: Suchbegriffe, Keywords und Anzeigen ohne Leistung. Übrig bleibt, was Anfragen liefert.",
          "Jeden Monat bekommen Sie eine Notiz in Klartext: was investiert wurde, was zurückkam, der ROAS pro Kampagne und die drei nächsten Hebel.",
        ],
        audience: "Für inhabergeführte Unternehmen und Mittelständler, denen Anfragen wichtiger sind als Reichweite. Wenn Sie eine SEA-Agentur für planbare Anfragen suchen und keine Markenkampagne, sind Sie hier richtig.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die auch Ihr Finanzchef versteht.",
        intro: "Median über alle aktiven Ads-Kunden der letzten 12 Monate. Das Volumen schwankt je nach Branche. Unser Ziel ist immer: ab Monat 2 cash-positiv.",
        items: [
          {
            kicker: "ROAS",
            value: "5,2",
            unit: "×",
            title: "Return on Ad Spend",
            body: "Median über aktive Sprints, gemessen als Umsatz aus Google-Ads-Anfragen geteilt durch die Werbeausgaben.",
          },
          {
            kicker: "CPL",
            value: "−42",
            unit: "%",
            title: "Kosten pro Anfrage",
            body: "Niedrigere Kosten pro Anfrage innerhalb der ersten 90 Tage, durch einen höheren Quality Score und gezielte Negativ-Keywords.",
          },
          {
            kicker: "Tempo",
            value: "14",
            unit: "Tage",
            title: "bis zur ersten qualifizierten Anfrage",
            body: "Median vom Kick-off bis zur ersten qualifizierten Anfrage. In B2B-Branchen geht es oft schneller.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir arbeiten",
        headlineMain: "Vier Phasen.",
        headlineSub: "Disziplin schlägt Lautstärke.",
        intro: "Bei Google Ads entscheidet zu 80 % das Setup und zu 20 % die Optimierung. Steht das Setup sauber, regelt sich vieles von selbst. Bis dahin drehen wir an jeder Schraube.",
        phases: [
          {
            kicker: "Phase 1 · Tag 1 bis 7",
            title: "Audit und Conversion-Basis",
            body: "Wir prüfen, was bisher gelaufen ist: Konten, Kampagnen, Tracking. Die größte Schwachstelle liegt meist im Conversion-Tracking.",
            bullets: [
              "Audit von Konto und Kampagnen",
              "Serverseitiges Conversion-Tracking",
              "Wettbewerbsanalyse (Auction Insights, SimilarWeb)",
              "Schriftlicher Audit-Bericht mit den größten Streuverlusten",
            ],
          },
          {
            kicker: "Phase 2 · Tag 8 bis 30",
            title: "Setup und Landingpages",
            body: "Eine klar gegliederte Kampagnenstruktur und Landingpages mit Conversion-Tracking. Die Startseite als Anzeigenziel gibt es bei uns nicht.",
            bullets: [
              "Search-Kampagnen je Leistung oder Branche",
              "Performance Max für Volumen, mit klar abgegrenzten Asset-Gruppen",
              "Landingpages mit durchdachter Conversion-Struktur",
              "Negativ-Keyword-Liste mit 200+ Begriffen",
            ],
          },
          {
            kicker: "Phase 3 · Tag 31 bis 60",
            title: "Optimierung und Bereinigung",
            body: "Jetzt liegen Daten vor. Jede Woche streichen wir Begriffe, die Geld kosten und keine Anfragen bringen.",
            bullets: [
              "Wöchentliche Prüfung der Suchbegriffe",
              "Umstellung der Gebotsstrategie auf Conversion-Wert",
              "Laufende A/B-Tests der Anzeigen",
              "Höherer Quality Score durch optimierte Landingpages",
            ],
          },
          {
            kicker: "Phase 4 · Tag 61 bis 90",
            title: "Skalierung und Reporting",
            body: "Liegt der ROAS stabil über dem Ziel, erhöhen wir das Volumen. Dazu kommt jeden Monat ein Bericht in Klartext, der zeigt, wie viel Geld hinein- und wie viel zurückfließt.",
            bullets: [
              "Mehr Budget für profitable Kampagnen",
              "Feinsteuerung nach Region und Tageszeit",
              "Gezielt aufgebaute Remarketing-Zielgruppen",
              "Monatlicher Cash-Bericht mit ROAS pro Kampagne",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Google Ads Betreuung",
        headlineSub: "in drei Säulen, alles inklusive.",
        intro: "Festpreis zzgl. MwSt., und das gesamte Werbebudget läuft über Ihr eigenes Konto. An Ihren Werbeausgaben verdienen wir nichts. Uns interessiert Ihr Ergebnis.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Audit von Konto und Tracking",
              "Kampagnenarchitektur",
              "Conversion-Plan für Landingpages",
              "Wettbewerbsanalyse",
              "Budget- und ROAS-Modell",
            ],
          },
          {
            title: "Umsetzung",
            items: [
              "Aufbau von Search- und Performance-Max-Kampagnen",
              "Landingpages (Mobile First)",
              "Conversion-Tracking (GA4 und serverseitig)",
              "Wöchentliche Bereinigung der Suchbegriffe",
              "Anzeigentexte und Assets",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live-Dashboard (ROAS, CPL, Conversions)",
              "Monatlicher Cash-Bericht auf einer Seite",
              "Wöchentliche Updates per WhatsApp",
              "Der Gründer persönlich, kein Junior",
              "Direkter Draht per Slack oder E-Mail",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 90-Tage-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Umsatz statt Klicks.",
        intro: "Was an Tag 1, 30, 60 und 90 passiert. Wir sagen es vorher, halten uns daran und zeigen Ihnen jeden Monat die ROAS-Rechnung.",
        steps: [
          {
            eta: "Tag 1",
            title: "Audit und Kick-off",
            body: "Audit-Bericht mit den größten Streuverlusten, dazu ein 60-minütiger Setup-Call.",
          },
          {
            eta: "Tag 30",
            title: "Kampagnen live",
            body: "Search und Performance Max laufen, das Conversion-Tracking sitzt, die ersten Daten kommen.",
          },
          {
            eta: "Tag 60",
            title: "ROAS stabilisiert",
            body: "Die Streuverluste sind bereinigt, der Quality Score ist gestiegen, der ROAS pendelt sich ein.",
          },
          {
            eta: "Tag 90",
            title: "5× ROAS (Median)",
            body: "Profitable Kampagnen werden skaliert. Danach optimieren wir monatlich weiter.",
          },
        ],
      },
      stack: {
        eyebrow: "Tools und Standards",
        headlineMain: "Womit wir arbeiten.",
        headlineSub: "Branchenstandard, sauber verbunden.",
        intro: "Alle Konten und Zugänge gehören Ihnen, auch wenn Sie später ohne uns weitermachen. Sie sind an nichts gebunden.",
        items: [
          {
            name: "Google Ads",
            body: "Search, Performance Max und Remarketing, alles in Ihrem eigenen Konto.",
          },
          {
            name: "GA4 + Tag Manager",
            body: "Verlässliches Conversion-Tracking, serverseitig dort, wo es zählt.",
          },
          {
            name: "Google Merchant Center",
            body: "Für Onlineshops: Shopping-Anzeigen korrekt eingebunden.",
          },
          {
            name: "Looker Studio",
            body: "Ein Live-Dashboard, das Sie auch auf dem Handy öffnen können.",
          },
          {
            name: "CallRail / Hyros",
            body: "Anruf-Tracking und Multi-Touch-Attribution für Branchen mit hohen Auftragswerten.",
          },
          {
            name: "SimilarWeb / Auction Insights",
            body: "Sichtbarkeit im Wettbewerb: wer bei Ihren Suchbegriffen mitbietet und wie oft.",
          },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt beantwortet.",
        intro: "Was Inhaber am häufigsten fragen, bevor sie ein Budget für Google Ads freigeben.",
        items: [
          {
            q: "Wie hoch sollte mein Werbebudget sein?",
            a: "Das hängt von Ihrer Branche und Ihren Kosten pro Anfrage ab. Für den Start empfehlen wir meist 1.500 bis 5.000 € im Monat. Im Audit nennen wir Ihnen eine konkrete Zahl für Ihren Markt.",
          },
          {
            q: "Verdient NEO an meinem Werbebudget?",
            a: "Nein. Das gesamte Budget läuft direkt über Ihr Google-Ads-Konto. Wir berechnen einen festen Monatspreis zzgl. MwSt., egal ob Ihr Budget bei 1.000 € oder bei 100.000 € liegt. So zählt für uns das Ergebnis und nicht die Höhe Ihrer Ausgaben.",
          },
          {
            q: "Wie schnell kommen die ersten Anfragen?",
            a: "Bei sauberem Setup oft schon in den ersten 14 Tagen. Bis der ROAS stabil ist und wir skalieren können, vergehen in der Regel 60 bis 90 Tage.",
          },
          {
            q: "Was, wenn der ROAS unter dem Ziel bleibt?",
            a: "Wir stimmen uns jede Woche mit Ihnen ab und steuern nach. Zeigt sich nach 60 Tagen, dass Ihr Markt nicht genug hergibt, sagen wir Ihnen das offen und beenden den Sprint, bevor weiteres Geld verloren geht.",
          },
          {
            q: "Wer schreibt die Anzeigen?",
            a: "Wir, samt Varianten für A/B-Tests und den Assets für Performance Max. Sie geben frei, wir schalten.",
          },
          {
            q: "Funktioniert Performance Max wirklich?",
            a: "Ja, wenn man es richtig aufsetzt: eng gefasste Asset-Gruppen, Negativ-Keywords auf Kontoebene und sauberes Conversion-Tracking. Sonst verbraucht PMax Budget und liefert Conversions, die nur auf dem Papier gut aussehen.",
          },
          {
            q: "Wie geht es nach den 90 Tagen weiter?",
            a: "Wir arbeiten monatlich weiter, ohne Mindestlaufzeit. Sie können jederzeit pausieren. Alle Konten und Daten gehören Ihnen.",
          },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie investieren",
        headline: "Kostenloser Ads-Check für Ihr Konto.",
        body: "Wir sehen uns Ihr Google-Ads-Konto mit Lesezugriff an und finden die drei größten Streuverluste. Sie bekommen einen einseitigen Bericht in Klartext mit konkreten Hebeln, die Sie sofort umsetzen können, auch wenn Sie nicht mit uns zusammenarbeiten.",
        bullets: [
          "Analyse der Streuverluste in Ihrem aktiven Konto",
          "Die drei wichtigsten Quick Wins, nach Priorität",
          "30-minütiges Erklärvideo per Loom",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Ads-Check anfordern",
        note: "An Werktagen innerhalb von 48 Stunden in Ihrem Postfach. Lesezugriff genügt.",
        modal: {
          eyebrow: "Kostenloser Ads-Check",
          headline: "Wo verliert Ihr Konto Geld?",
          sub: "Wir prüfen Ihr Google-Ads-Konto mit Lesezugriff und schicken Ihnen die drei wichtigsten Hebel per E-Mail.",
          submit: "Ads-Check anfordern",
          successHeadline: "Angekommen. Wir sehen uns Ihr Konto an.",
          successBody: "Ihr Ads-Check kommt an Werktagen innerhalb von 48 Stunden per E-Mail.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Ihr ROAS-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir sehen uns Ihr aktuelles Google-Ads-Setup gemeinsam an, danach bekommen Sie Ihren ROAS-Plan schriftlich. Ohne Verkaufspräsentation.",
        primary: "Erstgespräch buchen",
      },
    },

    socialMedia: {
      slug: "social-media",
      meta: {
        title: "Social Media Agentur für mehr Anfragen | NEO THE AGENCY",
        description: "Social Media Betreuung für Inhaber und Mittelstand: Short-Form-Video, Paid Social und Content-Produktion zum Festpreis. Unser Ziel sind echte Anfragen.",
      },
      hero: {
        eyebrow: "Social Media Betreuung · für Inhaber & Mittelstand",
        h1Lead: "Social Media Agentur:",
        headlineTop: "Anfragen.",
        headlineBottom: "Nicht Follower.",
        sub: "Als Social Media Agentur für Inhaber und Mittelstand produzieren wir Short-Form-Videos, schalten Paid-Social-Anzeigen und liefern Content, der gebuchte Termine bringt statt Likes. Inhabergeführt, mit klarem Fokus auf Inhalte, ohne Buzzword-Bingo.",
        primaryCta: "Content-Sample anfordern",
        secondaryCta: "Erstgespräch buchen",
        chips: [
          "Short-Form-Video",
          "Paid Social",
          "Content-Produktion",
          "Posting-Plan",
        ],
        video: "video/socials-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Social Media Agentur",
        headlineSub: "mit Vertriebsziel.",
        paragraphs: [
          "Social Media ist für uns ein Anfragekanal und kein Schönheitswettbewerb. Erreichen Ihre Inhalte die richtige Zielgruppe mit der richtigen Absicht, entstehen daraus gebuchte Termine.",
          "Unsere Social Media Betreuung heißt konkret: Wir produzieren Short-Form-Videos, die Ihre Zielgruppe wirklich anschaut. Organischen Content kombinieren wir mit präzise gesteuerten Paid-Social-Kampagnen. Und jede Anfrage verfolgen wir bis zur Plattform zurück, von der sie kam.",
          "Jeden Monat bekommen Sie einen kurzen Bericht in Klartext: welche Inhalte funktionieren, welche Plattform Anfragen bringt und was wir als Nächstes produzieren.",
        ],
        audience: "Für inhabergeführte Marken und mittelständische Unternehmen, die Social Media als Vertriebskanal nutzen wollen und nicht als PR-Bühne.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die zählen.",
        intro: "Median über alle aktiven Social-Media-Kunden der letzten 12 Monate, aus B2B und hochpreisigem B2C. Also dort, wo eine einzelne Anfrage echtes Geld wert ist.",
        items: [
          {
            kicker: "Pipeline",
            value: "3,4",
            unit: "×",
            title: "mehr Anfragen aus Social Media",
            body: "Durchschnittliche Steigerung nach 6 Monaten, organisches Short-Form und Paid Social zusammengerechnet.",
          },
          {
            kicker: "CPL",
            value: "32 €",
            unit: "Median",
            title: "Kosten pro Anfrage über Paid Social",
            body: "Median über alle aktiven Kampagnen. Je nach Branche verschieden, aber durchgehend unter den Kosten pro Anfrage aus Google Ads.",
          },
          {
            kicker: "Volumen",
            value: "12",
            unit: "/Monat",
            title: "produzierte Short-Form-Videos",
            body: "Pro Monat im Sprint: Reels, TikToks und YouTube Shorts, alle redaktionell geplant.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir arbeiten",
        headlineMain: "Vier Phasen.",
        headlineSub: "Ausgerichtet auf Anfragen.",
        intro: "Wir legen zuerst fest, welche Anfrage entstehen soll, und planen den Inhalt von dort aus rückwärts. Wer mit dem Inhalt anfängt, produziert ins Blaue.",
        phases: [
          {
            kicker: "Phase 1 · Tag 1 bis 7",
            title: "Audit und Zielgruppe",
            body: "Wir analysieren Ihre Kanäle, Ihren Wettbewerb und das Verhalten Ihrer Zielgruppe. Die Leitfrage: Welche Plattform bringt Ihrem Geschäft Anfragen?",
            bullets: [
              "Plattform-Audit (TikTok, Instagram, LinkedIn, YouTube)",
              "Analyse der Inhalte Ihrer Wettbewerber",
              "Definition von Zielgruppe und Kaufabsicht",
              "Conversion-Pfad je Plattform",
            ],
          },
          {
            kicker: "Phase 2 · Tag 8 bis 30",
            title: "Content-Maschine und Setup",
            body: "Redaktionsplan, Produktionsablauf, Tracking. Bevor etwas live geht, ist alles dokumentiert.",
            bullets: [
              "Redaktionsplan für 12 Monate",
              "Vorlagen und Hooks für Short-Form-Videos",
              "Paid-Social-Tracking (Meta- und TikTok-Pixel)",
              "Produktionsplan (12 Videos pro Monat)",
            ],
          },
          {
            kicker: "Phase 3 · Tag 31 bis 60",
            title: "Produktion und Verbreitung",
            body: "Wir produzieren die Inhalte, verbreiten sie organisch und bewerben einen Teil davon mit bezahlten Anzeigen. Jede Woche optimieren wir nach den Ergebnissen.",
            bullets: [
              "12 Short-Form-Videos pro Monat",
              "Organischer Posting-Plan",
              "Paid-Social-Budget auf die stärksten Videos",
              "Wöchentliche Performance-Reviews",
            ],
          },
          {
            kicker: "Phase 4 · Tag 61 bis 90",
            title: "Skalieren und nachschärfen",
            body: "Was funktioniert, bauen wir aus. Was nicht funktioniert, stoppen wir. Dazu kommt jeden Monat ein Klartext-Report über den Beitrag zu Ihrer Pipeline.",
            bullets: [
              "Ausbau der profitabelsten Content-Formate",
              "Plattformwechsel, wo nötig",
              "Kampagnen mit Creator-Partnern (optional)",
              "Monatlicher Klartext-Report mit Pipeline-Rechnung",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro: "Festpreis (netto zzgl. MwSt.). Alle Werbebudgets laufen über Ihr eigenes Werbekonto. Produktion, Verbreitung und Reporting sind komplett enthalten.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Plattform-Audit",
              "Zielgruppen- und Conversion-Plan",
              "Redaktionsplan für 12 Monate",
              "Wettbewerbsanalyse",
              "Benchmark-Modell für die Performance",
            ],
          },
          {
            title: "Umsetzung",
            items: [
              "12 Short-Form-Videos pro Monat",
              "Organischer Posting-Plan (alle Plattformen)",
              "Paid-Social-Kampagnen (Meta und TikTok)",
              "Sauberes Conversion-Tracking",
              "Creator- und UGC-Produktion (optional)",
            ],
          },
          {
            title: "Reporting",
            items: [
              "Live-Dashboard (Pipeline je Plattform)",
              "Monatlicher Klartext-Report (eine Seite)",
              "Wöchentliche Updates per WhatsApp",
              "Direkt mit dem Gründer, kein Junior",
              "Direkter Draht per Slack oder E-Mail",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 90-Tage-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Termine statt Follower.",
        intro: "Was an Tag 1, 30, 60 und 90 passiert, sagen wir Ihnen vorher. Dann liefern wir.",
        steps: [
          {
            eta: "Tag 1",
            title: "Audit und Kickoff",
            body: "Plattform-Audit, Zielgruppen- und Content-Plan, gemeinsamer Termin zum Tracking-Setup.",
          },
          {
            eta: "Tag 30",
            title: "Erste Inhalte live",
            body: "Die ersten 12 Videos sind produziert und veröffentlicht. Paid Social läuft.",
          },
          {
            eta: "Tag 60",
            title: "Erste Anfragen gemessen",
            body: "Der Conversion-Pfad ist messbar, die ersten Termine kommen aus Social Media.",
          },
          {
            eta: "Tag 90",
            title: "Fester Beitrag zur Pipeline",
            body: "Social Media ist ein messbarer Anfragekanal. Jetzt beginnt die Skalierung.",
          },
        ],
      },
      stack: {
        eyebrow: "Tools und Plattformen",
        headlineMain: "Womit wir arbeiten.",
        headlineSub: "Plattformneutral, auf Conversions ausgerichtet.",
        intro: "Als Paid Social Agentur wählen wir Plattformen neutral aus. Wir arbeiten dort, wo Ihr Geschäft Anfragen bekommt, ob auf LinkedIn oder auf TikTok.",
        items: [
          {
            name: "Meta Business Suite",
            body: "Instagram und Facebook, organisch und bezahlt, mit sauberem Pixel-Tracking.",
          },
          {
            name: "TikTok Ads Manager",
            body: "Short-Form-Video für jüngere Zielgruppen oder große Reichweite.",
          },
          {
            name: "LinkedIn Campaign Manager",
            body: "B2B-Leadgenerierung mit eng gefasster Zielgruppe.",
          },
          {
            name: "YouTube Studio + YouTube Ads",
            body: "Längere Videos für Ihren Expertenstatus und gezielte Pre-Roll-Anzeigen.",
          },
          {
            name: "GA4 + Tag Manager",
            body: "Conversion-Tracking über alle Plattformen, sauber zugeordnet.",
          },
          {
            name: "CapCut + Premiere",
            body: "Unsere Schnittwerkzeuge für Short-Form-Video: schnell und hochwertig, auch in großer Stückzahl.",
          },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt geantwortet.",
        intro: "Das fragen Inhaber am häufigsten, bevor sie Budget für Social Media freigeben.",
        items: [
          {
            q: "Muss ich auf jeder Plattform vertreten sein?",
            a: "Nein. Wir empfehlen ein bis zwei Plattformen, auf denen Ihre Zielgruppe wirklich Zeit verbringt. Lieber tief als breit.",
          },
          {
            q: "Was, wenn ich nicht vor die Kamera will?",
            a: "Das geht. Wir produzieren Content im UGC-Stil mit Creators oder setzen Ihr Produkt ins Bild. Am besten funktioniert erfahrungsgemäß aber persönlicher Content vom Gründer selbst.",
          },
          {
            q: "Wie viel Werbebudget brauche ich?",
            a: "Für Paid Social empfehlen wir zum Start mindestens 1.500 € pro Monat. Organisch geht es auch ohne Werbebudget, dauert aber länger.",
          },
          {
            q: "Wer produziert die Videos?",
            a: "Wir, inklusive Skript, Storyboard, Schnitt und Hooks. Sie geben frei, wir veröffentlichen. Für Content mit Ihnen als Gründer brauchen wir zwei Stunden pro Monat von Ihnen.",
          },
          {
            q: "Wie schnell kommen die ersten Anfragen?",
            a: "Organisch dauert es 60 bis 90 Tage bis zu den ersten gemessenen Conversions. Mit Paid Social oft nur 2 bis 3 Wochen, wenn das Setup sauber steht.",
          },
          {
            q: "Wie steht es mit Creators und Influencer-Marketing?",
            a: "Wenn es passt, gern, aber als Zusatz und nicht als Standard. Inhabergeführte Marken wachsen meist am besten mit eigenem Gründer-Content. Creators kommen dazu, wenn das Volumen es rechtfertigt.",
          },
          {
            q: "Was passiert nach den 90 Tagen?",
            a: "Wir arbeiten monatlich weiter, ohne Mindestlaufzeit. Alle Konten, Inhalte und Daten gehören Ihnen. Wenn Sie aufhören, geht nichts verloren.",
          },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie investieren",
        headline: "Kostenloses Content-Sample für Ihre Marke.",
        body: "Wir produzieren für Ihre Marke ein Short-Form-Video von 60 Sekunden. Grundlage ist eine Conversion-Hypothese, die wir aus Ihrem Geschäft ableiten. So sehen Sie vor Ihrer Entscheidung, wie unser Content für Sie aussehen würde.",
        bullets: [
          "Ein fertig produziertes Short-Form-Video (60 Sekunden)",
          "Conversion-Hypothese, schriftlich erklärt",
          "Vorschlag für Hook und Skript",
          "Kein Verkaufsgespräch nötig",
        ],
        cta: "Content-Sample anfordern",
        note: "Produktionszeit 5 bis 7 Werktage. Kein Spam, keine Verpflichtung.",
        modal: {
          eyebrow: "Kostenloses Content-Sample",
          headline: "Wir produzieren ein Video für Sie.",
          sub: "Nennen Sie uns Ihre Marke und Ihre Zielgruppe. Sie bekommen ein 60-sekündiges Short-Form-Video als Sample, ganz gleich, ob Sie danach mit uns arbeiten oder nicht.",
          submit: "Sample anfordern",
          successHeadline: "Angekommen. Wir legen los.",
          successBody: "Ihr Sample kommt innerhalb von 5 bis 7 Werktagen per E-Mail.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Ihr Content-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir klären gemeinsam, welche Plattform für Ihr Geschäft funktioniert und wie Ihr erster 90-Tage-Sprint aussehen würde.",
        primary: "Erstgespräch buchen",
      },
    },

    websites: {
      slug: "websites",
      meta: {
        title: "Webdesign-Agentur: Website zum Festpreis | NEO THE AGENCY",
        description: "Website erstellen lassen oder Relaunch: fürs Smartphone gebaut, schnell und selbst pflegbar. Zum Festpreis und in 6 bis 8 Wochen live. Jetzt anfragen.",
      },
      hero: {
        eyebrow: "Webdesign & Website-Entwicklung · für Inhaber und Mittelstand",
        headlineTop: "Webdesign-Agentur:",
        headlineBottom: "Ihre Website als Asset.",
        sub: "Als Webdesign-Agentur bauen wir moderne Websites, die zuerst fürs Smartphone gestaltet sind, schnell laden und aus Besuchern Anfragen machen. Gebaut auf Plattformen, die Sie selbst pflegen können.",
        primaryCta: "Speed- und Conversion-Report",
        secondaryCta: "Erstgespräch buchen",
        chips: [
          "Mobile-First",
          "Core Web Vitals",
          "Conversion-Architektur",
          "Selbst pflegbar",
        ],
        video: "video/website-logo.mp4",
      },
      whatItIs: {
        eyebrow: "Was wir tun",
        headlineMain: "Webdesign-Agentur,",
        headlineSub: "die Anfragen liefert.",
        paragraphs: [
          "Ihre Website ist Ihr aktivster Verkäufer: rund um die Uhr im Einsatz, ohne Krankheitstage. Eine schlechte Website kostet Sie jeden Tag Geld, eine gute bringt laufend Anfragen.",
          "Wenn Sie bei NEO Ihre Website erstellen lassen, heißt das: Design für das Smartphone zuerst, Core Web Vitals mit einem LCP unter 2,5 Sekunden und eine Conversion-Architektur, die auf echtem Nutzerverhalten beruht. Alle Inhalte pflegen Sie selbst. Wegen eines fehlenden Kommas müssen Sie uns nicht anrufen.",
          "Sie bekommen eine Website, die vom ersten Tag an rankt und Anfragen bringt. In den nächsten fünf Jahren wächst sie mit Ihnen mit, ohne komplettes Redesign.",
        ],
        audience: "Für inhabergeführte Unternehmen und Mittelständler, die mit ihrer Website verkaufen wollen. Ein Online-Auftritt aus Pflichtgefühl reicht ihnen nicht.",
      },
      outcomes: {
        eyebrow: "Was sich verändert",
        headlineMain: "Drei Zahlen,",
        headlineSub: "die Sie spüren.",
        intro: "Median aller Website-Projekte der letzten 12 Monate. Branchen: Beratung, Handwerk, Premium-Dienstleister, B2B.",
        items: [
          {
            kicker: "Ladezeit",
            value: "1,8",
            unit: "s",
            title: "LCP-Median",
            body: "Largest Contentful Paint im 75. Perzentil. Damit schneller als 92 % der Mittelstands-Websites im DACH-Raum.",
          },
          {
            kicker: "Conversion",
            value: "3,1",
            unit: "×",
            title: "höhere Anfragequote",
            body: "Median-Steigerung der Conversion-Rate gegenüber der vorherigen Website, gemessen 6 Wochen nach dem Launch.",
          },
          {
            kicker: "Bis zum Launch",
            value: "6",
            unit: "Wochen",
            title: "vom Kick-off bis zum Launch",
            body: "Median bei Standard-Sprints. Zwei Wochen mehr, wenn wir umfangreichen Content produzieren.",
          },
        ],
      },
      methodology: {
        eyebrow: "Wie wir arbeiten",
        headlineMain: "Vier Phasen.",
        headlineSub: "Erst die Conversion, dann das Design.",
        intro: "Wir legen zuerst die Conversion-Architektur fest und gestalten erst danach. Wer mit Pixeln anfängt, verliert.",
        phases: [
          {
            kicker: "Phase 1 · Woche 1",
            title: "Discovery & Conversion-Plan",
            body: "Wir analysieren Ihre Zielgruppe, Ihre Conversion-Pfade und Ihren Wettbewerb. Der Plan steht, bevor wir irgendetwas gestalten.",
            bullets: [
              "Stakeholder-Interviews und Zielgruppen-Analyse",
              "Conversion-Architektur (Wireframes)",
              "Content-Inventur und Content-Plan",
              "SEO- und Technik-Briefing",
            ],
          },
          {
            kicker: "Phase 2 · Woche 2 bis 3",
            title: "Design & Prototyp",
            body: "High-Fidelity-Design im Erscheinungsbild Ihrer Marke oder im NEO-Designsystem. Fürs Smartphone zuerst, barrierefrei geprüft und auf Anfragen ausgerichtet.",
            bullets: [
              "Mobile-First-Design (375 px bis 1440 px)",
              "Klickbarer Prototyp in Figma",
              "Barrierefreiheits-Check (WCAG 2.2 AA)",
              "2 Feedbackrunden mit Ihnen",
            ],
          },
          {
            kicker: "Phase 3 · Woche 4 bis 5",
            title: "Umsetzung & Inhalte",
            body: "Wir bauen auf Plattformen, die Sie selbst pflegen können: Webflow, Framer oder bei Bedarf ein individueller Tech-Stack. Die Inhalte entstehen parallel.",
            bullets: [
              "Umsetzung auf Webflow, Framer oder individuell",
              "Content-Produktion parallel zum Build",
              "Schema.org und SEO sauber integriert",
              "Tracking mit GA4 und Tag Manager ab Tag 1",
            ],
          },
          {
            kicker: "Phase 4 · Woche 6",
            title: "QA & Launch",
            body: "Wir testen Browser, Mobilgeräte, Ladezeit und Barrierefreiheit. Zur Übergabe bekommen Sie ein 30-minütiges Video-Tutorial, das zeigt, wie Sie Ihre Website selbst bearbeiten.",
            bullets: [
              "Browser- und Gerätetests",
              "Ladezeit-Optimierung (Core Web Vitals)",
              "Launch-Checkliste (DNS, SSL, Weiterleitungen)",
              "Übergabe mit Video-Tutorial",
            ],
          },
        ],
      },
      deliverables: {
        eyebrow: "Was Sie bekommen",
        headlineMain: "Drei Säulen.",
        headlineSub: "Alles inklusive.",
        intro: "Ein Festpreis für die komplette Website: Design, Umsetzung, Content-Produktion und Launch. Ohne Zusatzmodule und ohne Überraschungen beim Setup.",
        columns: [
          {
            title: "Strategie",
            items: [
              "Discovery und Stakeholder-Interviews",
              "Conversion-Architektur und Wireframes",
              "Content- und SEO-Plan",
              "Wettbewerbsanalyse",
              "Empfehlung für den Tech-Stack",
            ],
          },
          {
            title: "Umsetzung",
            items: [
              "Mobile-First-Design in Figma",
              "Umsetzung auf Webflow, Framer oder individuell",
              "Content-Produktion (Texte, Fotos, Videos)",
              "Schema.org- und SEO-Integration",
              "Tracking-Setup (GA4 und Tag Manager)",
            ],
          },
          {
            title: "Launch & Betreuung",
            items: [
              "Browser- und Mobil-Tests",
              "Core-Web-Vitals-Optimierung",
              "Launch-Checkliste (DNS, SSL, Weiterleitungen)",
              "Video-Tutorial zur Pflege (30 Minuten)",
              "30 Tage Fehlerbehebung nach dem Launch",
            ],
          },
        ],
      },
      process: {
        eyebrow: "Der 6-Wochen-Sprint",
        headlineMain: "Vier Meilensteine.",
        headlineSub: "Jede Woche dokumentiert.",
        intro: "Ein Standard-Sprint dauert 6 Wochen. Was in welcher Woche passiert, sehen Sie hier.",
        steps: [
          {
            eta: "Woche 1",
            title: "Discovery",
            body: "Stakeholder-Interviews, Conversion-Plan, Content-Inventur.",
          },
          {
            eta: "Woche 2 bis 3",
            title: "Design",
            body: "Mobile-First-Design in Figma, 2 Feedbackrunden, Barrierefreiheits-Check.",
          },
          {
            eta: "Woche 4 bis 5",
            title: "Umsetzung & Inhalte",
            body: "Build auf der Plattform, Content-Produktion, sauber eingerichtetes Tracking.",
          },
          {
            eta: "Woche 6",
            title: "Launch",
            body: "QA, Ladezeit-Optimierung, Launch und Übergabe mit Video-Tutorial.",
          },
        ],
      },
      stack: {
        eyebrow: "Tech-Stack",
        headlineMain: "Womit wir bauen.",
        headlineSub: "Und was Sie selbst pflegen.",
        intro: "Wir bauen auf Plattformen, die Sie selbst pflegen. Keine WordPress-Plugin-Hölle und keine Individuallösung, die nur wir öffnen können.",
        items: [
          {
            name: "Webflow",
            body: "Unser Standard für Marketing-Websites: visuell bearbeitbar, schnell, suchmaschinenfreundlich.",
          },
          {
            name: "Framer",
            body: "Wenn Animation und Motion Design im Vordergrund stehen.",
          },
          {
            name: "Individuell (Vite + React + Tailwind)",
            body: "Für E-Commerce, komplexe Anwendungen oder besondere Performance-Ziele.",
          },
          {
            name: "Figma",
            body: "Die verbindliche Designquelle. Sie bekommen die Datei, sie gehört Ihnen.",
          },
          {
            name: "GA4 + Tag Manager",
            body: "Sauberes Tracking ab Tag 1, serverseitig, wo nötig.",
          },
          {
            name: "Cloudinary / Sanity",
            body: "Asset-Management und Headless-CMS, wenn das Content-Volumen es rechtfertigt.",
          },
        ],
      },
      faq: {
        eyebrow: "Häufige Fragen",
        headlineMain: "Direkt gefragt.",
        headlineSub: "Direkt beantwortet.",
        intro: "Was Inhaber am häufigsten fragen, bevor sie eine Website erstellen lassen oder einen Relaunch starten.",
        items: [
          {
            q: "Wie lange dauert ein typisches Website-Projekt?",
            a: "Ein Standard-Sprint dauert 6 Wochen. Produzieren wir umfangreichen neuen Content, kommen zwei Wochen dazu. Größere E-Commerce-Projekte können 8 bis 12 Wochen dauern. Das sagen wir Ihnen vorher.",
          },
          {
            q: "Welche Plattform empfehlen Sie?",
            a: "Für Marketing-Websites ist Webflow unser Standard. Framer nehmen wir für Marken mit viel Animation, eine individuelle React-Lösung, wenn Performance oder Komplexität es verlangen. Wir empfehlen, was zu Ihnen passt, und nicht das, was uns am liebsten ist.",
          },
          {
            q: "Kann ich die Website selbst pflegen?",
            a: "Ja, das ist bei uns Standard. Sie bekommen einen Redaktionszugang und ein 30-minütiges Video-Tutorial. Bei Webflow und Framer ändern Sie Texte, Bilder und ganze Seiten selbst.",
          },
          {
            q: "Website-Relaunch: Was passiert mit meiner alten Website?",
            a: "Beim Website-Relaunch leiten wir jede alte URL per 301-Weiterleitung auf die passende neue Seite um, damit Ihre Website das bei Google aufgebaute Vertrauen nicht verliert. Außerdem sichern wir die alte Website, falls Sie zurückwollen.",
          },
          {
            q: "Was, wenn ich nach dem Launch noch Änderungen möchte?",
            a: "30 Tage Fehlerbehebung sind im Festpreis enthalten. Danach wählen Sie zwischen einem monatlichen Betreuungspaket und der Abrechnung nach Stunden.",
          },
          {
            q: "Und SEO: Wird die neue Website ranken?",
            a: "Wir bauen SEO von Anfang an mit ein: Schema.org, Core Web Vitals, saubere URL-Struktur und eine Content-Strategie ab dem ersten Tag. Wenn Sie zusätzlich aktiv um Rankings kämpfen wollen, ergänzen wir unseren SEO-Sprint.",
          },
          {
            q: "Was kostet eine Website mit Webflow, was eine individuelle Lösung?",
            a: "Der Festpreis beginnt bei 15.000 € netto zzgl. MwSt. für eine Marketing-Website auf Webflow und kann bei individuellen React- oder E-Commerce-Projekten über 60.000 € netto liegen. Im Erstgespräch nennen wir Ihnen eine konkrete Zahl.",
          },
        ],
      },
      leadMagnet: {
        eyebrow: "Bevor Sie sich entscheiden",
        headline: "Kostenloser Speed- und Conversion-Report.",
        body: "Wir prüfen Ihre aktuelle Website auf Core Web Vitals, mobile Performance und Conversion-Architektur. Sie bekommen einen einseitigen Report mit den drei Hebeln, die am meisten bewirken. Ob Sie danach mit uns bauen, entscheiden Sie.",
        bullets: [
          "Messung der Core Web Vitals (LCP, CLS, INP)",
          "Audit der mobilen Performance",
          "Die 3 wichtigsten Conversion-Hebel, priorisiert",
          "Ohne Verkaufsgespräch",
        ],
        cta: "Speed-Report anfordern",
        note: "An Werktagen innerhalb von 24 Stunden in Ihrem Posteingang.",
        modal: {
          eyebrow: "Kostenloser Speed- und Conversion-Report",
          headline: "Wo verliert Ihre Website Anfragen?",
          sub: "Schicken Sie uns Ihre Domain. Den Speed- und Conversion-Report bekommen Sie per E-Mail.",
          submit: "Report anfordern",
          successHeadline: "Angekommen. Wir messen.",
          successBody: "Ihr Report ist an Werktagen innerhalb von 24 Stunden in Ihrem Posteingang.",
        },
      },
      finalCta: {
        eyebrow: "Bereit?",
        headlineMain: "30 Minuten.",
        headlineSub: "Ihr Website-Plan auf einer Seite.",
        body: "Kostenloses Erstgespräch mit dem Gründer. Wir sehen uns Ihre aktuelle Website gemeinsam live an, danach bekommen Sie einen Sprint-Plan auf einer Seite. Ohne Verkaufspräsentation.",
        primary: "Erstgespräch buchen",
      },
    },
  },
};

const en: Translations = {
  nav: {
    links: [
      { label: "What we do", href: "#services" },
      { label: "About", href: "/uber-uns/" },
      { label: "Case studies", href: "#cases" },
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
    headlineTop: "New sales opportunities every week.",
    headlineBottom: "Through Google, AI search, and a website that ships results.",
    sub: "Visible in every relevant city. In every district. So enquiries roll in — not hope.",
    services: [
      "Search Engine Optimisation",
      "AI Search Optimisation",
      "High-End Website Development",
    ],
    priceLine: "Free consultation",
    priceLineSub: "Reply within 24 h",
    cta: "Start",
    pauseLabel: "Pause hero video",
    playLabel: "Play hero video",
  },

  snapshot: {
    title: "Snapshot",
    tagline: "30 seconds. What, for whom, what you get.",
    items: [
      {
        index: "01",
        label: "What",
        headline: "More enquiries.",
        detail: "Performance marketing & SEO. Measurable. In revenue.",
      },
      {
        index: "02",
        label: "For whom",
        headline: "For owners & SMEs.",
        detail: "Consultancies. Trades. Services. B2B.",
      },
      {
        index: "03",
        label: "What you get",
        headline: "Premium website. SEO pages.",
        detail: "A website that ships. Service pages that rank. From day one.",
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
      "One goal ties every project together: your revenue grows. That's how we measure success. Not by our creativity.",
      "NEO THE AGENCY® is high-end performance marketing. Results are measurable. We deliver enquiries — not spreadsheets.",
      "Background: strategy consulting, management consulting, project management. You get the full package — strategy, project ownership, craft.",
    ],
    closing:
      "Customer excellence is the compass. Three principles show what that looks like in practice.",
    founderName: "Raoul Müller",
    founderRole: "Founder · NEO THE AGENCY",
  },

  principles: {
    eyebrow: "How we work",
    headlineMain: "Three principles.",
    headlineSub: "One method.",
    intro:
      "Customer excellence sounds abstract. In practice it means: commitment. Performance. Fair price. Three sentences. Every day.",
    items: [
      {
        title: "Commitment",
        body:
          "We're in. You get the founder on the line — not an account manager with a spreadsheet. Every project becomes ours.",
        kicker: "Principle",
      },
      {
        title: "Performance",
        body:
          "We count enquiries. Not clicks. Every month: what moved, why. No spin. No vanity metrics.",
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
        promise: "Google page one. In 90 days.",
        detail:
          "Technical fixes. Content that earns clicks. Links that pay. Every month: the maths behind it — what moved, why, what's next.",
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
        promise: "Paid traffic that prints. ROI-positive.",
        detail:
          "Tight campaigns. Conversion-tracking that holds up. Every week: waste out. We bid on revenue. Not on vanity.",
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
        promise: "Content that drives enquiries. Likes aren't a KPI.",
        detail:
          "Short-form. Paid social. Creative that sits on your platform. Followers are nice. Booked calls are better.",
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
        promise: "Pages that rank. From day one. That convert. From click one.",
        detail:
          "Fast. Modern. Mobile-first. Loads quick, looks right, turns visitors into enquiries. On platforms you maintain yourself.",
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
    intro: "So you know what you're signing up for. Before you sign up.",
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
      "What happens on day 1, 30, 60, 90. We say it. We stick to it. Every month: the maths.",
    steps: [
      {
        n: "01",
        eta: "Day 1",
        title: "Audit & kickoff",
        body:
          "Technical SEO audit. Channel diagnosis. Competitor mapping. 30 minutes on a screen share, founder on the call.",
      },
      {
        n: "02",
        eta: "Day 30",
        title: "Launch",
        body:
          "Tracking live. New landing pages online. Google Ads active. On-page SEO shipped.",
      },
      {
        n: "03",
        eta: "Day 60",
        title: "First page-one keywords",
        body:
          "First commercial keywords on page one. Pipeline starts filling. Monthly plain-talk report — with the next levers.",
      },
      {
        n: "04",
        eta: "Day 90",
        title: "8× pipeline",
        body:
          "Measured uplift in qualified enquiries. From here on, monthly optimisation. No surprises. No minimum term.",
      },
    ],
  },

  metrics: {
    eyebrow: "Numbers",
    headlineMain: "What actually counts.",
    headlineSub: "Enquiries. Not clicks.",
    intro: "Four numbers from live clients. Measured. Not claimed.",
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
      "I founded NEO because I was tired of it. Good companies pay thousands a month. They get vanity metrics. Not enquiries in the inbox. That changes here.",
      "At NEO: no account manager with a spreadsheet. You get me on the line. Fixed price. No lock-in. A 90-day sprint with my name on it.",
      "Sound like your way of working? Drop me a line below. Weekdays I reply in 24 h. Personally.",
    ],
    signature: "Raoul",
    signatureBlock: "Raoul Müller · Founder, NEO THE AGENCY",
  },

  contact: {
    eyebrow: "Get in touch",
    headlinePre: "Let's get",
    headlineSoft: "started.",
    intro:
      "Free consultation. Weekdays I reply in 24 h. Personally.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "What do you want to achieve?",
      submit: "Send message",
      success: "Thank you. You'll hear from us within 24 h.",
    },
    tiles: [
      { kicker: "Phone", value: "+49 160 9689 7003" },
      { kicker: "WhatsApp", value: "+49 160 9689 7003" },
      { kicker: "Address", value: "Kolonnenstraße 8, 10827 Berlin" },
    ],
  },

  footer: {
    blurb:
      "NEO THE AGENCY is a high-end performance marketing agency. We turn websites into assets and deliver qualified enquiries.",
    sections: [
      {
        title: "Services",
        links: [
          { label: "SEO", href: "/seo-agentur/" },
          { label: "Google Ads", href: "/services/google-ads/" },
          { label: "Social Media", href: "/services/social-media/" },
          { label: "Websites", href: "/services/websites/" },
        ],
      },
      {
        title: "Agency",
        links: [
          { label: "Case studies", href: "/#cases" },
          { label: "About", href: "/uber-uns/" },
          { label: "Contact", href: "/#contact" },
        ],
      },
    ],
    rights: "© NEO THE AGENCY. All rights reserved.",
    legal: [
      { label: "Impressum", href: "/impressum/" },
      { label: "Datenschutz", href: "/datenschutz/" },
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

  about: de.about,

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

/**
 * NEO the Agency · SEO-Leistungsseite (/seo-agentur/)
 * Inhaltsmodul v1.2 (26.11.2026)
 *
 * Changelog
 *   v1.2 (26.11.2026) QA-Gate: Fokus-Suchbegriff „SEO-Agentur" und die Neben-Suchbegriffe
 *        „Local-SEO-Agentur" und „B2B-SEO-Agentur" in Problem-, Ablauf-, Lokal-, Passt-es- und
 *        Team-Text. Ab jetzt ist qa/qa-gate-2026-11-26/wp-handoff.json die Textquelle für WordPress;
 *        die Textdatei v1.1 ist für diese fünf Stellen überholt.
 *   v1.1 (19.11.2026) Hero-Kicker, H1 und Footer: „für kleine Unternehmen“ →
 *        „für Kleinunternehmen“ (Raoul). Andere Formen bleiben unverändert.
 *
 * Einzige Quelle für alle sichtbaren deutschen Texte der Seite.
 * Wortlaut 1:1 aus „NEO-SEO-Seitentexte-v1.1-20261119.md“. Hier nichts
 * umformulieren: Textänderungen laufen über die Textdatei.
 *
 * Regeln in diesem Modul:
 * - Texte in eckigen Klammern ([Zitat folgt]) sind offene Platzhalter. Die
 *   Seite zeichnet sie automatisch als leere, gestrichelte Felder.
 * - href: null bedeutet: Zielseite gibt es noch nicht, es wird kein Link gebaut.
 * -   ist ein geschütztes Leerzeichen (490 €, 24 h, 5,0 ★).
 * - Alt-Texte beschreiben das Bild, das wirklich gezeigt wird.
 *
 * Changelog
 * - v1.0 (19.11.2026): erste Fassung aus den Seitentexten v1.1.
 */

export type SeoHeading = { ink: string; grey: string };
export type SeoLink = { label: string; href: string | null };

/** Sprungziele auf der Seite (id der jeweiligen Sektion). */
export const anchors = {
  hero: "top",
  audit: "audit",
  shortForm: "start",
  packages: "pakete",
  finalCta: "erstgespraech",
} as const;

const SEO_PATH = "/seo-agentur/";

export const seoDe = {
  path: SEO_PATH,

  /**
   * Schalter vor dem Livegang.
   * showReviews: Abschnitt 20 (Kundenstimmen), showNumbers: Abschnitt 21
   * (NEO in Zahlen). Beide bleiben laut Textdatei verborgen, bis echte Daten
   * vorliegen (QA F1, v1.1). Zum Prüfen der Platzhalter auf true setzen.
   */
  flags: {
    showReviews: false,
    showNumbers: false,
  },

  contact: {
    email: "office@neotheagency.de",
    emailHref: "mailto:office@neotheagency.de",
    phone: "+49 160 9689 7003",
    phoneHref: "tel:+4916096897003",
    whatsapp: "+49 160 9689 7003",
    whatsappHref: "https://wa.me/4916096897003",
    street: "Kolonnenstraße 8",
    city: "10827 Berlin",
    youtubeHref: "https://www.youtube.com/@neotheagency",
    facebookHref: "https://www.facebook.com/p/NEO-The-Agency-61588285349359/",
  },

  header: {
    logoAlt: "NEO the Agency Logo",
    servicesLabel: "Leistungen",
    services: [
      { label: "SEO", to: SEO_PATH, hash: "" },
      { label: "Google Ads", to: "/google-ads-agentur/", hash: "" },
      { label: "Websites", to: "/webdesign-agentur/", hash: "" },
      { label: "Social Media", to: "/social-media-agentur/", hash: "" },
    ],
    links: [
      { label: "Über uns", to: "/neo-the-agency/", hash: "" },
      { label: "Kundenprojekte", to: "/", hash: "#cases" },
      { label: "Kontakt", to: SEO_PATH, hash: `#${anchors.finalCta}` },
    ],
    cta: "Erstgespräch",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    /** Zeigt nur die aktuelle Sprache. Es gibt keine englische Fassung dieser Seite. */
    languageCode: "DE",
    languageLabel: "Sprache: Deutsch",
    skipLabel: "Zum Inhalt springen",
  },

  hero: {
    kicker: "Ihre SEO-Agentur",
    heading: { ink: "SEO für Kleinunternehmen", grey: "in ganz Deutschland" },
    subline:
      "Als SEO-Agentur erstellen wir Ihre Website und Keyword-Seiten zu den Begriffen, nach denen Ihre Kunden suchen, und optimieren alles für Google, Google Maps und KI-Antworten. Wir kümmern uns um technisches SEO, lokales SEO mit Google Maps, Ihr Unternehmensprofil bei Google und strukturierte Daten. Jeden Monat erhalten Sie einen Bericht in klarer Sprache.",
    primary: "Kostenloser Audit in 24 h",
    secondary: "30-Minuten-Gespräch",
    micro:
      "Bezahlt wird erst nach der Einreichung bei Google. Bis dahin können Sie ohne Angabe von Gründen kündigen, ohne Frist und ohne Kosten.",
    image: {
      src: "brand/hero-poster.webp",
      srcMobile: "brand/hero-poster-mobile.webp",
      width: 1400,
      height: 906,
      // Alt an das echte Motiv angepasst (offener Punkt 16 der Textdatei).
      alt: "Skateboarder fährt eine sonnige Straße in der Stadt hinunter",
    },
  },

  trail: {
    label: "Brotkrumen-Navigation",
    items: [
      { label: "Startseite", to: "/", hash: "" },
      { label: "Leistungen", to: "/", hash: "#services" },
      { label: "SEO", to: null, hash: "" },
    ],
  },

  /** Nicht in v1.1: Beschriftung der Pfeile unter den Wisch-Reihen (nur für Vorlese-Programme sichtbar). */
  carousel: {
    prev: "Vorherige Karte",
    next: "Nächste Karte",
  },

  forms: {
    required: "* Pflichtfeld",
    errorWebsite: "Bitte geben Sie die Adresse Ihrer Website ein.",
    errorEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    // Freigegeben (NEO-SEO-Meta-Fehlertext-v1.1-20261119.md), 175 Zeichen.
    // E-Mail und Telefonnummer werden im Formular automatisch verlinkt.
    errorSend: "Ihre Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es noch einmal, schreiben Sie uns an office@neotheagency.de oder rufen Sie uns unter +49 160 9689 7003 an.",
    privacyLinkText: "Datenschutzerklärung",
    privacyHref: "/datenschutz",
    website: { label: "Ihre Website", placeholder: "www.ihre-firma.de" },
    email: { label: "Ihre E-Mail-Adresse", placeholder: "name@ihre-firma.de" },
    service: { label: "Ihre wichtigste Leistung (optional)", placeholder: "Dachsanierung in Köln" },
    name: { label: "Ihr Name (optional)", placeholder: "Vor- und Nachname" },
  },

  audit: {
    chips: ["2 Minuten", "Ergebnis in 24 h", "Ohne Verpflichtung"],
    heading: { ink: "SEO-Agentur: Ihr kostenloser SEO-Audit", grey: "in 24 Stunden" },
    subline:
      "Als SEO-Agentur schicken wir Ihnen ein kurzes Video, in dem wir Ihre Website durchgehen und die wichtigsten Stellschrauben zeigen.",
    button: "Audit anfordern",
    note:
      "Antwort in 24 Stunden an Werktagen. Wir nutzen Ihre Angaben, um den Audit zu erstellen und Sie dazu zu kontaktieren. Details finden Sie in unserer Datenschutzerklärung.",
    success:
      "Danke. Ihr Audit ist angefragt. Sie erhalten das Video innerhalb von 24 Stunden an Werktagen per E-Mail.",
  },

  proof: {
    items: [
      { value: "8×", label: "mehr Anfragen", needsProof: true },
      { value: "Seite eins", label: "bei Google in 90 Tagen", needsProof: true },
      { value: "5,0 ★", label: "aus über 20 Bewertungen", needsProof: true },
      { value: "Website", label: "ohne Aufpreis", needsProof: false },
    ],
    footnote: "Ergebnisse aus Kundenprojekten. [Quelle und Bezug folgen]",
  },

  problem: {
    kicker: "DAS PROBLEM",
    heading: { ink: "Gute Arbeit allein", grey: "bringt keine Anfragen über Google." },
    intro: "Viele kleine Unternehmen sind besser als ihr Platz bei Google. Als SEO-Agentur sehen wir meist drei Ursachen.",
    cards: [
      {
        title: "Google versteht nicht, was Sie anbieten",
        text: "Oft nennt die Website die Leistungen nur am Rand, und für die wichtigen Suchbegriffe fehlt jeweils eine eigene Seite. Dann zeigt Google lieber andere Anbieter.",
      },
      {
        title: "Ihre Website bremst",
        text: "Langsame Ladezeiten, Fehler auf dem Handy und eine unklare Struktur kosten Plätze. Besucher springen ab, bevor sie anrufen.",
      },
      {
        title: "Sie fehlen auf der Karte",
        text: "Wer „Elektriker in der Nähe“ sucht, sieht zuerst die Karte von Google Maps. Ohne gepflegtes Unternehmensprofil bei Google tauchen Sie dort selten auf.",
      },
    ],
  },

  measure: {
    kicker: "WAS ZÄHLT",
    heading: { ink: "Anfragen.", grey: "Nicht Klicks." },
    body: "Ein Kunde sucht, klickt und ruft an. Genau diesen Weg messen wir. Klicks allein zahlen keine Rechnung.",
    steps: [
      { title: "Suche", text: "Ihr Kunde sucht bei Google, in Google Maps oder fragt eine KI." },
      { title: "Klick", text: "Er findet Ihre Seite und öffnet sie." },
      { title: "Anruf", text: "Er ruft an oder schickt eine Anfrage." },
    ],
    listHeading: "Das steht in Ihrem Bericht",
    list: [
      "Anrufe über Ihre Website",
      "Anfragen über Ihre Formulare",
      "Ihre Positionen bei Google",
      "Aufrufe Ihres Profils in Google Maps",
      "Nennungen in KI-Antworten",
    ],
  },

  channels: {
    kicker: "DREI ORTE, EIN ZIEL",
    heading: { ink: "Gefunden werden,", grey: "wo Ihre Kunden suchen." },
    blocks: [
      {
        key: "search",
        title: "Google-Suche",
        text: "Eigene Seiten zu Ihren Leistungen und Einsatzorten, technisch sauber und schnell. Jede Seite zielt auf genau einen Begriff.",
        alt: "Illustration: Laptop mit einer geöffneten Suche und einem hervorgehobenen Treffer",
      },
      {
        key: "maps",
        title: "Google Maps",
        text: "Ein vollständiges Unternehmensprofil bei Google mit passenden Kategorien, Leistungen und Fotos. Das ist die Grundlage für einen Platz in der Karte.",
        alt: "Illustration: Smartphone mit einer Karte und markierten Betrieben in der Umgebung",
      },
      {
        key: "ai",
        title: "KI-Antworten",
        text: "Klare Antworten, strukturierte Daten und ein einheitliches Bild Ihres Unternehmens im Netz. So können ChatGPT, Gemini und die Übersicht mit KI bei Google Sie nennen.",
        alt: "Illustration: Bildschirm mit einer KI-Antwort, die lokale Anbieter auflistet",
      },
    ],
    chart: {
      title: "Positionen bei Google: CEx, Köln",
      subtitle: "Gemessen an drei Stichtagen",
      keywordHead: "Suchbegriff",
      dates: ["29.08.2026", "09.10.2026", "10.11.2026"],
      notFound: "nicht gefunden",
      notChecked: "–",
      /** Werte: Zahl = Position, "nf" = nicht gefunden, "nc" = nicht geprüft. */
      rows: [
        { keyword: "change management beratung köln", values: ["nc", "nf", 2] },
        { keyword: "change management consulting köln", values: ["nf", "nc", 4] },
        { keyword: "pmo beratung", values: ["nf", "nc", 8] },
        { keyword: "microsoft copilot beratung", values: ["nf", "nc", 14] },
      ] as { keyword: string; values: ("nc" | "nf" | number)[] }[],
      legend:
        "„nicht gefunden“ = bei der Prüfung nicht unter den ersten [Anzahl folgt] Ergebnissen. „–“ = an diesem Tag nicht geprüft. [Bedeutung von „–“ bestätigen]",
    },
  },

  cex: {
    kicker: "KUNDENPROJEKT · CEX, KÖLN",
    heading: { ink: "Drei Monate SEO", grey: "für eine Unternehmensberatung." },
    body: "CEx berät Unternehmen in Köln zu Change Management, Projektsteuerung und KI. Vom 15.08. bis 14.11.2026 haben wir die Website ausgebaut und für Google optimiert.",
    figures: [
      { value: "2,7×", label: "Einblendungen in der Google-Suche (Impressionen) pro Monat, von 682 auf 1.848" },
      { value: "Platz 2", label: "für den wichtigsten Suchbegriff, drei weitere Begriffe auf Seite eins" },
      { value: "3 → 39", label: "Suchbegriffe mit einer durchschnittlichen Position von 1 bis 10" },
      { value: "58 → 204", label: "Suchbegriffe, bei denen Google CEx anzeigt" },
    ],
    builtHeading: "Das haben wir gebaut",
    built: ["13 neue Seiten", "17 Standortseiten", "4 Blogartikel"],
    quote: "[Zitat folgt]",
    quoteName: "Johannes Reusch, CEx",
    quoteRole: "[Rolle folgt]",
    source: "Quelle: Google Search Console, Zeitraum 15.08. bis 14.11.2026.",
    link: { label: "Zum Kundenprojekt CEx", href: null, placeholder: "[Ziel-URL folgt]" },
    // Foto des Gründerteams liegt noch nicht vor (Freigabe von CEx nötig).
    photo: { src: null as string | null, alt: "Das Gründerteam von CEx in Köln", placeholder: "[Foto folgt]" },
  },

  approach: {
    kicker: "SO ARBEITEN WIR",
    heading: { ink: "SEO ohne Fachchinesisch.", grey: "Strategie, Umsetzung, Bericht." },
    intro:
      "Gemacht für inhabergeführte Unternehmen, die wachsen wollen. Von uns als SEO-Agentur bekommen Sie einen Plan, die Umsetzung und jeden Monat einen Bericht auf einer Seite.",
    columns: [
      {
        title: "Strategie",
        items: [
          "Audit Ihrer Website und Ihres Unternehmensprofils bei Google",
          "Analyse der Begriffe, nach denen Ihre Kunden suchen",
          "Blick auf die Wettbewerber, die heute vor Ihnen stehen",
          "Plan, welche Seite welchen Begriff abdeckt",
        ],
      },
      {
        title: "Umsetzung",
        items: [
          "Website und Keyword-Seiten schreiben und bauen",
          "Technische Fehler beheben, Ladezeit verbessern",
          "Unternehmensprofil bei Google pflegen",
          "Verlinkung und Erwähnungen aufbauen",
        ],
      },
      {
        title: "Bericht",
        items: [
          "Ein Bericht auf einer Seite, jeden Monat",
          "Anrufe, Anfragen und Positionen im Überblick",
          "Was wir getan haben und was als Nächstes kommt",
          "Ein Ansprechpartner, der die Arbeit selbst macht",
        ],
      },
    ],
  },

  blocks: {
    kicker: "LEISTUNGEN IM DETAIL",
    heading: { ink: "Neun Bausteine,", grey: "ein Ziel: mehr Anfragen." },
    /** Wird nur gezeigt, wenn ein Baustein ein href hat (Unterseiten gibt es noch nicht). */
    linkLabel: "Mehr erfahren",
    carouselLabel: "Neun Bausteine, seitlich wischbar",
    cards: [
      {
        key: "technik",
        title: "Technisches SEO",
        text: "Saubere Struktur, Sitemap, Weiterleitungen und Indexierung, damit Google jede Seite lesen kann.",
        alt: "Illustration: Baumstruktur der Seiten einer Website",
        href: null,
      },
      {
        key: "inhalte",
        title: "Inhalte und Keyword-Seiten",
        text: "Eine Seite pro Leistung und Suchbegriff, geschrieben für Ihre Kunden und für Google.",
        alt: "Illustration: Textseite mit Überschrift und hervorgehobenem Suchbegriff",
        href: null,
      },
      {
        key: "lokal",
        title: "Lokales SEO und Google Maps",
        text: "Als Local-SEO-Agentur bauen wir Seiten für Ihre Einsatzorte und pflegen Ihren Eintrag in der Karte, wenn jemand in Ihrer Nähe sucht.",
        alt: "Illustration: Stadtplan mit markierten Orten",
        href: null,
      },
      {
        key: "profil",
        title: "Unternehmensprofil bei Google",
        text: "Kategorien, Leistungen, Öffnungszeiten und Fotos vollständig und aktuell.",
        alt: "Illustration: Profilkarte eines Unternehmens mit Sternen und Öffnungszeiten",
        href: null,
      },
      {
        key: "links",
        title: "Linkaufbau",
        text: "Erwähnungen auf passenden Seiten aus Ihrer Branche und Region. So gewinnt Ihre Website bei Google an Gewicht.",
        alt: "Illustration: Netzwerk aus verbundenen Punkten",
        href: null,
      },
      {
        key: "ladezeit",
        title: "Ladezeit",
        text: "Schnelle Seiten auf dem Handy. Ziel sind gute Werte bei den Core Web Vitals von Google.",
        alt: "Illustration: Smartphone mit einer Anzeige für die Ladezeit",
        href: null,
      },
      {
        key: "daten",
        title: "Strukturierte Daten",
        text: "Angaben zu Unternehmen, Leistungen und Fragen in einer Form, die Suchmaschinen direkt verstehen.",
        alt: "Illustration: Geordnete Datenblöcke auf einem Bildschirm",
        href: null,
      },
      {
        key: "ki",
        title: "Optimierung für KI-Antworten",
        text: "Inhalte, die KI-Systeme als Quelle nutzen können, wenn Kunden nach Anbietern wie Ihnen fragen.",
        alt: "Illustration: Chatfenster mit einer Frage und einer Antwort",
        href: null,
      },
      {
        key: "bericht",
        title: "Bericht",
        text: "Jeden Monat eine Seite: Anrufe, Anfragen, Positionen und die nächsten Schritte.",
        alt: "Illustration: Einseitiger Bericht mit einem Diagramm",
        href: null,
      },
    ] as { key: string; title: string; text: string; alt: string; href: string | null }[],
  },

  timeline: {
    kicker: "DER ABLAUF",
    heading: { ink: "Erst bauen,", grey: "dann bei Google einreichen." },
    phase0Label: "Phase 0 · Vor dem Start",
    phase0: [
      { title: "Bauen.", text: "Wir erstellen Ihre Website und 20 Keyword-Seiten." },
      { title: "Prüfen.", text: "Sie sehen sich alles in Ruhe an." },
      { title: "Freigeben.", text: "Sie geben beides frei, zum Beispiel per E-Mail." },
      {
        title: "Einreichen.",
        text: "Wir reichen alles bei Google ein. Ab diesem Tag läuft Ihr Vertrag, und Sie erhalten die erste Rechnung.",
      },
    ],
    phase0Note: "Bis zur Einreichung können Sie ohne Angabe von Gründen kündigen, ohne Frist und ohne Kosten.",
    days: [
      {
        label: "Tag 1 bis 7 · Messen",
        text: "Wir richten die Messung ein: Search Console, Google Analytics, Anrufe und Formulare. Wir halten Ihre Positionen zum Start fest.",
      },
      {
        label: "Tag 8 bis 30 · Fundament",
        text: "Technische Feinarbeit, Ladezeit, strukturierte Daten und interne Verlinkung. Ihr Unternehmensprofil bei Google wird vollständig.",
      },
      {
        label: "Tag 31 bis 60 · Inhalte",
        text: "Wir bauen die Seiten aus, die zuerst Wirkung zeigen, und ergänzen Inhalte zu den Fragen Ihrer Kunden.",
      },
      {
        label: "Tag 61 bis 90 · Stärken",
        text: "Linkaufbau und Erwähnungen. Wir verstärken, was wirkt, und streichen, was nicht wirkt.",
      },
    ],
    daysNote: "Die Tage zählen ab der Einreichung bei Google.",
  },

  later: {
    kicker: "DANACH",
    heading: { ink: "Monat 4 bis 12:", grey: "ausbauen, was Anfragen bringt." },
    body: "Nach den ersten 90 Tagen sehen wir, welche Seiten Anrufe und Anfragen bringen. Dort legen wir nach: neue Seiten für weitere Leistungen und Orte, mehr Erwähnungen, laufende Pflege. Jeden Monat erhalten Sie Ihren Bericht auf einer Seite.",
    boxTitle: "Ehrlich gesagt: Rankings garantiert niemand.",
    boxText:
      "Google entscheidet allein über die Reihenfolge. Wer Ihnen Platz 1 garantiert, sagt nicht die Wahrheit. Wir garantieren saubere Arbeit, klare Berichte und offene Worte. Zeigt der Audit, dass SEO für Sie der falsche Weg ist, sagen wir es Ihnen.",
  },

  advantage: {
    kicker: "IHR VORTEIL",
    heading: { ink: "Erst sehen,", grey: "dann zahlen." },
    steps: [
      {
        title: "Wir liefern zuerst.",
        text: "Wir erstellen Ihre komplette Website ohne Aufpreis und dazu 20 Keyword-Seiten. Sie sehen alles fertig, bevor Ihnen Kosten entstehen.",
      },
      {
        title: "Sie prüfen und geben frei.",
        text: "Sie sehen sich Website und Keyword-Seiten in Ruhe an. Passt alles, geben Sie beides frei, zum Beispiel per E-Mail. Passt etwas nicht, können Sie ohne Angabe von Gründen kündigen, ohne Frist und ohne Kosten.",
      },
      {
        title: "Einreichung bei Google.",
        text: "Erst nach Ihrer Freigabe reichen wir alles bei Google ein. Ab diesem Tag läuft Ihr Vertrag, und Sie erhalten die erste Rechnung.",
      },
    ],
  },

  shortForm: {
    heading: { ink: "Sehen Sie sich", grey: "Ihre Seiten zuerst an." },
    body: "Schreiben Sie uns kurz. Wir melden uns innerhalb von 24 Stunden an Werktagen.",
    button: "Ohne Risiko starten",
    note: "Wir nutzen Ihre Angaben, um Sie zu Ihrer Anfrage zu kontaktieren. Details finden Sie in unserer Datenschutzerklärung.",
    success: "Danke. Wir melden uns innerhalb von 24 Stunden an Werktagen.",
  },

  packages: {
    kicker: "PAKETE UND PREISE",
    heading: { ink: "Drei Pakete.", grey: "Eine Website ohne Aufpreis in jedem." },
    items: [
      {
        key: "fundament",
        name: "Fundament",
        line: "Für Unternehmen, die bei Google erstmals gezielt gefunden werden wollen.",
        // Zusammen gelesen: „Ab 490 € pro Monat zzgl. MwSt.“
        pricePrefix: "Ab",
        price: "490 €",
        priceSuffix: "pro Monat zzgl. MwSt.",
        text: "",
        points: [
          "20 Keyword-Seiten zu Ihren wichtigsten Suchbegriffen",
          "On-Page- und Off-Page-SEO inklusive",
          "Bericht über Anrufe, Anfragen und Google-Positionen",
          "Kein Einheitspreis: Der Monatsbetrag richtet sich nach dem Umfang",
        ],
        button: "Paket „Fundament“ anfragen",
        target: anchors.shortForm,
        highlight: false,
      },
      {
        key: "wachstum",
        name: "Wachstum",
        line: "Für Unternehmen, die mehrere Leistungen oder Städte abdecken oder sich gegen stärkere Konkurrenz behaupten müssen.",
        pricePrefix: "",
        price: "Preis nach Analyse",
        priceSuffix: "",
        text: "Umfang und Preis legen wir nach dem kostenlosen Audit fest, passend zu Ihrer Ausgangslage.",
        points: [
          "Mehr Keyword-Seiten; die Anzahl ergibt sich aus dem Audit",
          "Stadtseiten für Ihre Einsatzorte",
          "Pflege Ihres Unternehmensprofils bei Google",
          "Optimierung für KI-Antworten",
          "On-Page- und Off-Page-SEO inklusive",
        ],
        button: "Kostenlosen Audit anfordern",
        target: anchors.audit,
        highlight: true,
      },
      {
        key: "marktfuehrer",
        name: "Marktführer",
        line: "Für Unternehmen mit mehreren Standorten, bundesweiter Reichweite oder sehr starker Konkurrenz.",
        pricePrefix: "",
        price: "Preis nach Analyse",
        priceSuffix: "",
        text: "Umfang und Preis legen wir nach dem kostenlosen Audit fest, passend zu Ihrem Markt.",
        points: [
          "Keyword-Seiten in der Anzahl, die Ihr Markt verlangt",
          "Content-Plan für Ihre Themen und Standorte",
          "Linkaufbau, abgestimmt auf Ihren Wettbewerb",
          "Monatliches Strategiegespräch",
        ],
        button: "30-Minuten-Gespräch vereinbaren",
        target: anchors.finalCta,
        highlight: false,
      },
    ],
    shared: [
      "Komplette Website ohne Aufpreis",
      "Erste Rechnung erst nach der Einreichung bei Google",
      "Bis zur Einreichung ohne Angabe von Gründen kündbar",
    ],
    priceNote: "Alle Preise netto zzgl. MwSt. Das Angebot richtet sich an Unternehmen.",
  },

  gains: {
    kicker: "IHR GEWINN",
    heading: { ink: "Was sich für Sie", grey: "ändern soll." },
    cards: [
      { key: "anrufe", title: "Mehr Anrufe", text: "Kunden finden Sie, wenn sie gerade suchen, und greifen zum Telefon." },
      { key: "planbar", title: "Planbare Anfragen", text: "Anfragen kommen gleichmäßiger, nicht nur über Empfehlungen und Zufall." },
      { key: "kosten", title: "Weniger Werbekosten", text: "Besucher aus den normalen Suchergebnissen kosten Sie nichts pro Klick." },
      { key: "ki", title: "Genannt in KI-Antworten", text: "Wer ChatGPT oder Gemini nach einem Anbieter fragt, soll auch Ihren Namen lesen." },
    ],
  },

  fit: {
    kicker: "PASST ES?",
    heading: { ink: "Für wen wir arbeiten", grey: "und für wen nicht." },
    yesTitle: "Passt gut",
    yes: [
      "Gründer, die von Anfang an bei Google gefunden werden wollen",
      "Kleine Unternehmen, die ihre Anfragen nicht dem Zufall überlassen wollen",
      "Lokale Dienstleister, die in ihrer Stadt und Region vorne stehen wollen",
      "B2B-Firmen, die eine B2B-SEO-Agentur für planbare Firmenanfragen suchen",
      "Betriebe in ganz Deutschland, von Flensburg bis Passau",
    ],
    noTitle: "Passt nicht",
    no: [
      "Konzerne, denen Kennzahlen für die nächste Präsentation wichtiger sind als Anfragen",
      "Unternehmen, die Platz 1 in zwei Wochen erwarten",
      "Unternehmen, die nur Klickzahlen sehen wollen, keine Anfragen",
    ],
  },

  team: {
    kicker: "WER FÜR SIE ARBEITET",
    heading: { ink: "Sie sprechen mit denen,", grey: "die auch liefern." },
    intro: "Kein Account-Manager dazwischen. Wer Sie im Erstgespräch trifft, arbeitet in unserer SEO-Agentur auch an Ihrem Projekt.",
    people: [
      {
        photo: { src: "brand/raoul-founder-426.png", width: 426, height: 426 },
        photoPlaceholder: "",
        alt: "Raoul Müller, Gründer von NEO the Agency",
        name: "Raoul Müller",
        role: "Gründer",
        text: "Sie sprechen direkt mit mir. An Werktagen antworte ich Ihnen persönlich innerhalb von 24 Stunden.",
      },
      {
        photo: null,
        photoPlaceholder: "[Foto folgt]",
        alt: "[Name folgt], [Rolle folgt] bei NEO the Agency",
        name: "[Name folgt]",
        role: "[Rolle folgt, zum Beispiel Senior-SEO-Spezialist oder Senior-SEO-Spezialistin]",
        text: "[Erfahrung folgt]",
      },
      {
        photo: null,
        photoPlaceholder: "[Foto folgt]",
        alt: "[Name folgt], [Rolle folgt] bei NEO the Agency",
        name: "[Name folgt]",
        role: "[Rolle folgt, zum Beispiel Senior-SEO-Spezialist oder Senior-SEO-Spezialistin]",
        text: "[Erfahrung folgt]",
      },
    ] as {
      photo: { src: string; width: number; height: number } | null;
      photoPlaceholder: string;
      alt: string;
      name: string;
      role: string;
      text: string;
    }[],
  },

  tools: {
    kicker: "UNSER WERKZEUG",
    heading: { ink: "Gemessen mit Werkzeugen,", grey: "die Profis nutzen." },
    // Nur Namen als Text, keine Hersteller-Logos (Markenrichtlinien).
    items: [
      { key: "gsc", name: "Google Search Console", text: "Positionen, Klicks und Indexierung direkt von Google." },
      { key: "ga4", name: "Google Analytics 4", text: "Was Besucher auf Ihrer Website tun, bis zum Anruf oder zur Anfrage." },
      { key: "semrush", name: "Semrush", text: "Suchbegriffe, Suchvolumen und Wettbewerber." },
      { key: "frog", name: "Screaming Frog", text: "Technische Prüfung jeder einzelnen Seite." },
      { key: "psi", name: "PageSpeed Insights", text: "Ladezeit und Core Web Vitals auf Handy und Desktop." },
    ],
  },

  reviews: {
    kicker: "KUNDENSTIMMEN",
    heading: { ink: "Was Kunden", grey: "über NEO sagen." },
    slotCount: 8,
    slot: {
      stars: "[Sterne folgen]",
      text: "„[Bewertungstext folgt]“",
      name: "[Name, Firma, Ort folgen]",
      source: "[Plattform und Datum folgen]",
    },
    carouselLabel: "Kundenstimmen, seitlich wischbar",
    link: {
      label: "Alle Bewertungen bei Google ansehen",
      href: null,
      placeholder: "[Link zum Google-Profil von NEO folgt]",
    },
  },

  numbers: {
    kicker: "NEO IN ZAHLEN",
    heading: { ink: "Zahlen,", grey: "die wir belegen können." },
    items: [
      { value: "[Zahl folgt]", label: "betreute Unternehmen" },
      { value: "[Zahl folgt]", label: "Kunden, die nach dem ersten Jahr bleiben" },
      { value: "[Zahl folgt]", label: "Jahre Erfahrung im SEO" },
    ],
  },

  related: {
    kicker: "MEHR VON NEO",
    heading: { ink: "SEO wirkt stärker", grey: "im Zusammenspiel." },
    carouselLabel: "Weitere Leistungen, seitlich wischbar",
    cards: [
      {
        title: "Google Ads",
        text: "Anzeigen erscheinen ab dem ersten Tag, während SEO noch wächst.",
        link: { label: "Mehr zu Google Ads", href: null },
        image: { src: "seo-visuals/google-ads-agentur-visual.jpg", width: 1200, height: 1193 },
        alt: "Illustration: Auswertungsflächen mit Ringdiagramm und Balken",
      },
      {
        title: "Websites",
        text: "Modernes Design, schnell und für das Handy gebaut. Optimiert für Google und KI-Suche.",
        link: { label: "Mehr zu Websites", href: null },
        image: { src: "seo-visuals/website-erstellen-lassen-visual.jpg", width: 1200, height: 1193 },
        alt: "Illustration: Dieselbe Website als Entwurf auf Laptop und Smartphone",
      },
      {
        title: "Social Media",
        text: "Inhalte, die Vertrauen schaffen. Gemessen an Anfragen, nicht an Likes.",
        link: { label: "Mehr zu Social Media", href: null },
        image: { src: "seo-visuals/webentwicklung-agentur-visual.jpg", width: 1200, height: 1193 },
        alt: "Illustration: Bausteine einer Oberfläche mit Megafon und Diagramm",
      },
    ] as {
      title: string;
      text: string;
      link: SeoLink;
      image: { src: string; width: number; height: number };
      alt: string;
    }[],
  },

  faq: {
    kicker: "FAQ",
    heading: { ink: "Häufige Fragen", grey: "zu SEO bei NEO." },
    items: [
      {
        q: "Wie schnell sehe ich erste Ergebnisse?",
        a: "Das hängt von Ihrer Branche, Ihrem Ort und Ihrer Konkurrenz ab. Die ersten 90 Tage nach der Einreichung bei Google sind fest geplant: messen, Fundament legen, Inhalte ausbauen, stärken. Was in Ihrem Fall realistisch ist, sagen wir Ihnen nach dem Audit.",
      },
      {
        q: "Was ist im Monatsbetrag enthalten?",
        a: "Die Website ohne Aufpreis, die Keyword-Seiten Ihres Pakets, On-Page- und Off-Page-SEO und jeden Monat ein Bericht auf einer Seite. Was genau dazugehört, steht nach dem Audit schriftlich in Ihrem Angebot.",
      },
      {
        q: "Gibt es eine Mindestlaufzeit?",
        a: "Bis zur Einreichung bei Google können Sie ohne Angabe von Gründen kündigen, ohne Frist und ohne Kosten. Die Vertragslaufzeit beginnt erst mit der Einreichung. [Laufzeit nach Vertrag bestätigen]",
      },
      {
        q: "Wer macht die eigentliche Arbeit?",
        a: "Raoul Müller als Gründer und zwei Senior-SEO-Spezialisten. Es gibt keinen Account-Manager dazwischen. Wer Sie im Erstgespräch trifft, arbeitet in unserer SEO-Agentur auch an Ihrem Projekt.",
      },
      {
        q: "Wie passt SEO zu Google Ads?",
        a: "Gut. Anzeigen bei Google erscheinen ab dem ersten Tag, Sie zahlen aber für jeden Klick. SEO braucht länger, dafür kosten Besucher aus den normalen Suchergebnissen nichts pro Klick. Was für Sie sinnvoll ist, sagen wir Ihnen im Gespräch.",
      },
      {
        q: "Können Sie für meine Branche Ergebnisse garantieren?",
        a: "Nein. Ranking-Garantien sind unseriös, deshalb geben wir keine. Google entscheidet allein über die Reihenfolge. Wir garantieren saubere Arbeit und ehrliche Berichte. Zeigt der Audit, dass SEO für Sie der falsche Weg ist, sagen wir Ihnen das.",
      },
      {
        q: "Was passiert nach den 90 Tagen?",
        a: "Wir bauen aus, was Anrufe und Anfragen bringt: neue Seiten für weitere Leistungen und Orte, mehr Erwähnungen, laufende Pflege. Sie erhalten weiter jeden Monat Ihren Bericht.",
      },
      {
        q: "Kostet die Website extra?",
        a: "Nein. In allen drei Paketen erhalten Sie eine komplette Website ohne Aufpreis. Sie zahlen nur für die SEO-Leistung. Im Paket „Fundament“ sind das 20 Keyword-Seiten, also SEO-Landingpages zu Ihren Suchbegriffen, inklusive On-Page- und Off-Page-SEO, ab 490 € pro Monat zzgl. MwSt. Für die Pakete „Wachstum“ und „Marktführer“ legen wir Umfang und Preis nach dem kostenlosen Audit fest. Einen Einheitspreis gibt es nicht. Der Monatsbetrag richtet sich nach dem vereinbarten Umfang.",
      },
      {
        q: "Wann bekomme ich die erste Rechnung?",
        a: "Erst nach der Einreichung bei Google. Zuerst liefern wir Website und Keyword-Seiten, Sie prüfen beides und geben es frei. Danach reichen wir alles bei Google ein. Ab diesem Tag läuft Ihr Vertrag, und erst dann stellen wir die erste Rechnung.",
      },
      {
        q: "Was passiert, wenn ich nicht zufrieden bin?",
        a: "Dann kündigen Sie einfach. Bis zur Einreichung bei Google genügt eine kurze E-Mail, ohne Angabe von Gründen. Es gilt keine Kündigungsfrist, und es entstehen Ihnen keine Kosten.",
      },
      {
        q: "Was genau ist der kostenlose SEO-Audit?",
        a: "Ein kurzes Video, in dem wir Ihre Website durchgehen und die wichtigsten Stellschrauben zeigen. Sie erhalten es innerhalb von 24 Stunden an Werktagen per E-Mail. Der Audit verpflichtet Sie zu nichts.",
      },
      {
        q: "Was heißt Optimierung für KI-Antworten?",
        a: "Immer mehr Menschen fragen ChatGPT, Gemini oder die Übersicht mit KI bei Google nach einem Anbieter. Wir schreiben Ihre Seiten so, dass sie klare Antworten geben, ergänzen strukturierte Daten und sorgen für ein einheitliches Bild Ihres Unternehmens im Netz. Ob und wann eine KI Sie nennt, entscheidet der jeweilige Anbieter.",
      },
      {
        q: "Arbeiten Sie nur in Berlin?",
        a: "Nein. Unser Büro ist in Berlin, wir arbeiten für Unternehmen in ganz Deutschland. Gespräche führen wir per Telefon oder Video.",
      },
    ],
  },

  videos: {
    kicker: "NEO AUF YOUTUBE",
    heading: { ink: "SEO erklärt,", grey: "in wenigen Minuten." },
    body: "Auf unserem YouTube-Kanal zeigen wir, was bei Google zählt.",
    // Kein YouTube-Einbau: stille Platzhalter, bis Titel und Einwilligungslösung stehen.
    items: [
      { title: "[Videotitel folgt]", alt: "Vorschaubild des Videos [Videotitel folgt]" },
      { title: "[Videotitel folgt]", alt: "Vorschaubild des Videos [Videotitel folgt]" },
      { title: "[Videotitel folgt]", alt: "Vorschaubild des Videos [Videotitel folgt]" },
    ],
    carouselLabel: "Videos, seitlich wischbar",
    button: "Zum YouTube-Kanal",
  },

  finalCta: {
    heading: { ink: "30 Minuten.", grey: "Ein Plan auf einer Seite." },
    body: "Kostenloses Erstgespräch mit dem Gründer. Sie bekommen eine ehrliche Einschätzung und einen Plan auf einer Seite. Dann entscheiden Sie. Keine Verkaufspräsentation, kein Druck.",
    button: "Erstgespräch anfragen",
    underButton: "Erste Rechnung erst nach der Einreichung bei Google",
    note: "Wir nutzen Ihre Angaben, um Sie zu Ihrer Anfrage zu kontaktieren. Details finden Sie in unserer Datenschutzerklärung.",
    success: "Danke. Wir melden uns innerhalb von 24 Stunden an Werktagen.",
    altHeading: "Lieber direkt sprechen?",
    callButton: "NEO anrufen",
    whatsappButton: "Per WhatsApp schreiben",
  },

  sticky: {
    textWide: "Kostenloses Erstgespräch · Antwort in 24 h · Zahlung erst nach Einreichung bei Google",
    textNarrow: "Erstgespräch · Antwort in 24 h",
    callLabel: "NEO anrufen",
    button: "Erstgespräch",
  },

  footer: {
    logoAlt: "NEO the Agency Logo",
    blurb: "SEO, Google Ads, Websites und Social Media für Kleinunternehmen in ganz Deutschland.",
    startLink: "Projekt starten",
    servicesTitle: "Leistungen",
    agencyTitle: "Agentur",
    contactTitle: "Kontakt",
    officeTitle: "Büro",
    whatsappLine: "WhatsApp: +49 160 9689 7003",
    youtubeLabel: "NEO auf YouTube",
    facebookLabel: "NEO auf Facebook",
    copyright: "© 2026 NEO THE AGENCY · Inhaber: Raoul Müller und Johannes Kaluc",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },
} as const satisfies Record<string, unknown>;

export type SeoContent = typeof seoDe;

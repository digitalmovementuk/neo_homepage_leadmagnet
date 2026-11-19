/**
 * Self-contained bilingual copy for the SEO Analyser modal.
 *
 * Drives every visible string + the email auto-response, so a single
 * `useLang()` hook switches the entire module between German and English.
 */

import type { Lang } from "../../lib/translations";

export type SeoCopy = {
  documentTitleIdle: string;
  documentTitleAnalysing: (domain: string) => string;
  documentTitleResults: (domain: string, gbp: string) => string;

  errors: {
    network: string;
    captureSend: string;
  };

  langPicker: {
    label: string;
    de: string;
    en: string;
  };

  currencyPicker: {
    label: string;
  };

  input: {
    eyebrow: string;
    title: string;
    sub: string;
    placeholder: string;
    submit: string;
    footnote: string;
    domainAria: string;
    /** Section heading above the optional business questions. */
    refineHeading: string;
    refineSub: string;
    domainLabel: string;
    aovLabel: string;
    aovHint: string;
    conversionRateLabel: string;
    conversionRateHint: string;
    industryHintLabel: string;
    industryHintPlaceholder: string;
    industryHintHelp: string;
  };

  analysing: {
    eyebrow: string;
    lines: readonly string[];
  };

  reveal: {
    eyebrowSep: string;
    metricLabel: string;
    metricSuffix: string;
    showMaths: string;
    hideMaths: string;
    mathsIntro: string;
    mathsCtr: string;
    mathsConv: string;
    mathsAov: string;
  };

  curve: {
    title: string;
    range: (days: number) => string;
    todayPrefix: string;
    daySuffix: string;
    perMonth: string;
    aria: string;
  };

  breakdown: {
    eyebrow: string;
    headline: string;
    tabs: { rankings: string; money: string; blockers: string };
  };

  rankings: {
    searchesPerMo: string;
    bands: { top3: string; page1: string; "page2-3": string; page4plus: string; unranked: string };
  };

  money: {
    keyword: string;
    searchesPerMo: string;
    now: string;
    ifPage1: string;
    perMo: string;
    clicks: string;
    total: string;
  };

  blockers: {
    impacts: { high: string; medium: string; low: string };
  };

  nav: {
    back: string;
    next: string;
    finish: string;
    pageOf: (n: number, total: number) => string;
  };

  pageRankings: { eyebrow: string; headline: string; sub: string };
  pageMoney: { eyebrow: string; headline: string; sub: string };
  pageBlockers: { eyebrow: string; headline: string; sub: string };

  summary: {
    eyebrow: string;
    headline: string;
    sub: string;
    takeaways: {
      opportunity: string;
      topWins: string;
      topBlocker: string;
      timeline: string;
      timelineBody: (days: number, gbp: string) => string;
    };
    contactHeadline: string;
    contactSub: string;
    trust: string[];
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    phoneCountryAria: string;
    submit: string;
    submitting: string;
    note: string;
  };

  capture: {
    eyebrow: string;
    headline: string;
    sub: (gbp: string) => string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    note: string;
  };

  sent: {
    headline: (domain: string) => string;
    body: (gbp: string) => string;
    nextSteps: { title: string; items: string[] };
    reset: string;
  };

  reset: string;

  emailSubject: (name: string, email: string, domain: string, gbp: string) => string;
  emailAutoresponse: (name: string, domain: string, gbp: string, industry: string, location: string) => string;
};

export const COPY: Record<Lang, SeoCopy> = {
  de: {
    documentTitleIdle: "SEO-Potenzialanalyse | NEO THE AGENCY",
    documentTitleAnalysing: (d) => `Analyse läuft: ${d}…`,
    documentTitleResults: (d, gbp) => `${d}: ${gbp} Potenzial pro Monat`,

    errors: {
      network:
        "Die Analyse ist gerade nicht erreichbar. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      captureSend:
        "Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.",
    },

    langPicker: {
      label: "Sprache",
      de: "Deutsch",
      en: "English",
    },

    currencyPicker: {
      label: "Währung",
    },

    input: {
      eyebrow: "SEO-Potenzialanalyse",
      title: "Wie lautet die Adresse Ihrer Website?",
      sub: "Eine Domain und drei kurze Angaben zu Ihrem Geschäft. Wir berechnen, wie viel Umsatz Ihnen in der Google-Suche derzeit entgeht.",
      placeholder: "meinrestaurant-koeln.de",
      submit: "Analyse starten",
      footnote:
        "Live-Daten aus Semrush · gerechnet mit Ihren Zahlen statt Branchenschätzungen · 8 kostenlose Analysen pro Tag",
      domainAria: "Website-Domain",
      refineHeading: "Ihre Geschäftszahlen",
      refineSub:
        "Je genauer Ihre Angaben, desto genauer die Schätzung. Vorausgefüllt sind übliche Durchschnittswerte Ihrer Branche.",
      domainLabel: "Website",
      aovLabel: "Durchschnittlicher Umsatz pro Auftrag",
      aovHint: "Was bringt Ihnen ein neuer Kunde im Schnitt ein?",
      conversionRateLabel: "Abschlussquote (Besucher, die zu Kunden werden)",
      conversionRateHint: "Wie viele Website-Besucher kaufen oder fragen an?",
      industryHintLabel: "Branche",
      industryHintPlaceholder: "z. B. Zahnarztpraxis, Restaurant, Softwareanbieter",
      industryHintHelp: "Optional. Wenn Sie das Feld leer lassen, erkennen wir die Branche automatisch.",
    },

    analysing: {
      eyebrow: "Analyse läuft",
      lines: [
        "Domain wird geprüft…",
        "Semrush-Daten für Ihre Region werden ausgewählt…",
        "Aktuelle Google-Positionen werden bei Semrush abgefragt…",
        "Ihre wichtigsten Suchbegriffe werden mit Position, Suchvolumen und Schwierigkeit geladen…",
        "Wettbewerber mit denselben Suchbegriffen werden ermittelt…",
        "Noch keine Positionen? Dann laden wir passende Suchbegriffe aus Ihrer Branche…",
        "Klickraten je Position werden eingerechnet (Quelle: Backlinko 2024)…",
        "Klicks heute und auf Seite 1 werden verglichen…",
        "Ihre Abschlussquote und Ihr Umsatz pro Auftrag werden eingerechnet…",
        "90-Tage-Prognose wird berechnet…",
        "Ihr Potenzial wird zusammengerechnet…",
      ],
    },

    reveal: {
      eyebrowSep: "·",
      metricLabel: "Geschätzter ungenutzter Umsatz pro Monat",
      metricSuffix: "/ Monat aus der Google-Suche",
      showMaths: "So haben wir gerechnet",
      hideMaths: "Schließen",
      mathsIntro:
        "Summe über alle Suchbegriffe: monatliches Suchvolumen × Klickrate auf der Zielposition × Abschlussquote der Branche × Umsatz pro Auftrag in der Branche, abzüglich des geschätzten Werts der heutigen Position.",
      mathsCtr: "Klickrate je Position",
      mathsConv: "Abschlussquote (Branche)",
      mathsAov: "Umsatz pro Auftrag (Branche)",
    },

    curve: {
      title: "90-Tage-Prognose",
      range: (d) => `Heute bis Tag ${d}`,
      todayPrefix: "Heute",
      daySuffix: "Tag",
      perMonth: "Monat",
      aria: "90-Tage-Prognose",
    },

    breakdown: {
      eyebrow: "Die Aufschlüsselung",
      headline: "Woher diese Zahl kommt.",
      tabs: {
        rankings: "Ihre Positionen heute",
        money: "Ungenutzter Umsatz",
        blockers: "Was Sie bremst",
      },
    },

    rankings: {
      searchesPerMo: "Suchen/Monat",
      bands: {
        top3: "Top 3",
        page1: "Seite 1",
        "page2-3": "Seite 2–3",
        page4plus: "ab Seite 4",
        unranked: "nicht gefunden",
      },
    },

    money: {
      keyword: "Suchbegriff",
      searchesPerMo: "Suchen/Monat",
      now: "Heute",
      ifPage1: "Auf Seite 1",
      perMo: "€/Monat",
      clicks: "Klicks",
      total: "Ungenutzter Umsatz pro Monat insgesamt",
    },

    blockers: {
      impacts: {
        high: "Große Wirkung",
        medium: "Mittlere Wirkung",
        low: "Geringe Wirkung",
      },
    },

    nav: {
      back: "Zurück",
      next: "Weiter",
      finish: "Zur Zusammenfassung",
      pageOf: (n, total) => `Schritt ${n} von ${total}`,
    },

    pageRankings: {
      eyebrow: "Ihre Positionen heute",
      headline: "So sichtbar sind Sie heute.",
      sub: "Wonach Ihre Kunden bei Google schon suchen und wo Sie dabei erscheinen oder fehlen.",
    },
    pageMoney: {
      eyebrow: "Ungenutzter Umsatz",
      headline: "Was jede Position pro Monat wert ist.",
      sub: "Klicks heute und auf Seite 1, gerechnet mit Ihren echten Geschäftszahlen.",
    },
    pageBlockers: {
      eyebrow: "Was Sie bremst",
      headline: "Drei bis fünf Dinge, die zwischen Ihnen und Seite 1 stehen.",
      sub: "Konkrete Punkte, die sich an Ihrer Website überprüfen lassen.",
    },

    summary: {
      eyebrow: "Zusammenfassung",
      headline: "Möchten Sie dieses Potenzial nutzen?",
      sub: "Die wichtigsten Ergebnisse Ihrer Analyse. Wenn Sie den 90-Tage-Plan möchten, sprechen Sie direkt mit NEO.",
      takeaways: {
        opportunity: "Ungenutzter Umsatz pro Monat",
        topWins: "Größte Hebel",
        topBlocker: "Größte Bremse",
        timeline: "Ihr Weg in 90 Tagen",
        timelineBody: (days, gbp) =>
          `In ${days} Tagen von heute auf ${gbp} pro Monat aus der Google-Suche.`,
      },
      contactHeadline: "Sprechen Sie mit NEO.",
      contactSub:
        "Ihren ausführlichen Plan bekommen Sie werktags innerhalb von 24 Stunden.",
      trust: [
        "Antwort werktags innerhalb von 24 Stunden",
        "Unverbindliches Strategiegespräch",
        "Kein Spam, keine Verpflichtung",
      ],
      namePlaceholder: "Vor- und Nachname",
      emailPlaceholder: "name@ihre-firma.de",
      phonePlaceholder: "Telefon",
      phoneCountryAria: "Ländervorwahl",
      submit: "90-Tage-Plan anfordern",
      submitting: "Wird gesendet…",
      note: "Kein Spam. Sie bekommen den Plan einmal, danach melden wir uns nur, wenn Sie es möchten.",
    },

    capture: {
      eyebrow: "Der 90-Tage-Plan",
      headline: "Möchten Sie den vollständigen Plan?",
      sub: (gbp) =>
        `Der ausführliche Plan für diese ${gbp} pro Monat: Suchbegriff für Suchbegriff, Hürde für Hürde, in 90 Tagen.`,
      nameLabel: "Name",
      namePlaceholder: "Vor- und Nachname",
      emailLabel: "E-Mail",
      emailPlaceholder: "name@ihre-firma.de",
      submit: "90-Tage-Plan anfordern",
      submitting: "Wird gesendet…",
      note: "Kein Spam. Sie bekommen den Plan einmal, danach melden wir uns nur, wenn Sie es möchten.",
    },

    sent: {
      headline: (domain) => `Ihre Anfrage zu ${domain} ist fast fertig.`,
      body: (gbp) =>
        `WhatsApp hat sich mit Ihrer Auswertung geöffnet. Senden Sie die Nachricht ab, dann besprechen wir, wie Sie ${gbp} pro Monat aus der Google-Suche gewinnen.`,
      nextSteps: {
        title: "Was als Nächstes passiert",
        items: [
          "Nachricht in WhatsApp absenden.",
          "Persönliche Antwort werktags innerhalb von 24 Stunden.",
          "Auf Wunsch ein 30-minütiges Strategiegespräch mit NEO.",
        ],
      },
      reset: "Weitere Domain analysieren",
    },

    reset: "Weitere Domain analysieren",

    emailSubject: (name, email, domain, gbp) =>
      `SEO-Analyse: ${name || email}, ${domain}, ${gbp} pro Monat`,
    emailAutoresponse: (name, domain, gbp, industry, location) =>
      `Guten Tag ${name},\n\ndanke, dass Sie die SEO-Potenzialanalyse von NEO für ${domain} genutzt haben.\n\nUnsere Einschätzung: rund ${gbp} pro Monat ungenutzter Umsatz aus der Google-Suche, auf Basis der erkannten Branche (${industry}) und des Standorts (${location}).\n\nWir melden uns werktags innerhalb von 24 Stunden mit Ihrem ausführlichen 90-Tage-Plan.\n\nViele Grüße\nNEO THE AGENCY`,
  },

  en: {
    documentTitleIdle: "SEO Potential Analyser — Neo",
    documentTitleAnalysing: (d) => `Analysing ${d}…`,
    documentTitleResults: (d, gbp) => `${d} — ${gbp}/mo opportunity`,

    errors: {
      network:
        "Couldn't reach the analysis engine. Check your connection and try again.",
      captureSend: "Sorry — couldn't send. Please try again or email us directly.",
    },

    langPicker: {
      label: "Language",
      de: "Deutsch",
      en: "English",
    },

    currencyPicker: {
      label: "Currency",
    },

    input: {
      eyebrow: "SEO Potential Analyser",
      title: "Where's your website?",
      sub: "One domain, three quick facts about your business. We work out the revenue you're leaving on the table from organic search.",
      placeholder: "yourbusiness.co.uk",
      submit: "Analyse",
      footnote:
        "Live Semrush data · Your numbers, not industry guesses · 8 free runs/day per visitor",
      domainAria: "Website domain",
      refineHeading: "Your business numbers",
      refineSub:
        "The more accurate these are, the sharper the estimate. Defaults are sensible industry midpoints.",
      domainLabel: "Website",
      aovLabel: "Average revenue per sale",
      aovHint: "What does a new customer typically bring you?",
      conversionRateLabel: "Conversion rate (visitor → customer)",
      conversionRateHint: "How many of your visitors buy or become a lead?",
      industryHintLabel: "Industry / business type",
      industryHintPlaceholder: "e.g. dentist, restaurant, B2B SaaS",
      industryHintHelp: "Optional — leave blank to auto-detect",
    },

    analysing: {
      eyebrow: "Analysing",
      lines: [
        "Normalising your domain…",
        "Selecting the right Semrush regional database…",
        "Pulling live organic rankings from Semrush…",
        "Loading top keywords with position, volume and difficulty…",
        "Identifying competitors via shared-keyword overlap…",
        "If no rankings: phrase_related fetches keyword ideas in your category…",
        "Applying CTR-by-position curve (Backlinko 2024)…",
        "Comparing current vs. page-1 click potential…",
        "Crossing with your conversion rate and AOV…",
        "Modelling 90-day projection curve…",
        "Compiling the opportunity number…",
      ],
    },

    reveal: {
      eyebrowSep: "·",
      metricLabel: "Estimated revenue you're missing per month",
      metricSuffix: "/ month in untapped search demand",
      showMaths: "How we calculated this",
      hideMaths: "Hide",
      mathsIntro:
        "Sum across keywords of: monthly searches × CTR at target position × industry conversion rate × industry AOV, minus current estimated value at current position.",
      mathsCtr: "CTR curve source",
      mathsConv: "Industry conversion rate used",
      mathsAov: "Industry AOV used",
    },

    curve: {
      title: "90-day projection",
      range: (d) => `Today → Day ${d}`,
      todayPrefix: "Today",
      daySuffix: "Day",
      perMonth: "mo",
      aria: "90-day projection",
    },

    breakdown: {
      eyebrow: "The breakdown",
      headline: "Why that number isn't made up.",
      tabs: {
        rankings: "Where you rank now",
        money: "Money on the table",
        blockers: "What's blocking you",
      },
    },

    rankings: {
      searchesPerMo: "searches/mo",
      bands: {
        top3: "Top 3",
        page1: "Page 1",
        "page2-3": "Page 2–3",
        page4plus: "Page 4+",
        unranked: "Not ranking",
      },
    },

    money: {
      keyword: "Keyword",
      searchesPerMo: "Searches/mo",
      now: "Now",
      ifPage1: "If Page 1",
      perMo: "£/mo",
      clicks: "clicks",
      total: "Total monthly opportunity",
    },

    blockers: {
      impacts: {
        high: "High impact",
        medium: "Medium impact",
        low: "Low impact",
      },
    },

    nav: {
      back: "Back",
      next: "Next",
      finish: "Go to summary",
      pageOf: (n, total) => `Step ${n} of ${total}`,
    },

    pageRankings: {
      eyebrow: "Where you rank now",
      headline: "How visible you are today.",
      sub: "What your customers already search for on Google — and where you're showing up, if at all.",
    },
    pageMoney: {
      eyebrow: "Money on the table",
      headline: "What each position is worth per month.",
      sub: "Click volume now vs. on Page 1, multiplied by your real business numbers.",
    },
    pageBlockers: {
      eyebrow: "What's blocking you",
      headline: "Three to five things sitting between you and Page 1.",
      sub: "Specific and observable — no generic SEO platitudes.",
    },

    summary: {
      eyebrow: "Summary",
      headline: "Ready to capture this opportunity?",
      sub: "The key takeaways from your analysis — plus a direct line to Neo if you want the full 90-day roadmap.",
      takeaways: {
        opportunity: "Monthly opportunity",
        topWins: "Biggest wins",
        topBlocker: "Most critical blocker",
        timeline: "90-day path",
        timelineBody: (days, gbp) =>
          `From today to ${gbp}/month in organic-search revenue, in ${days} days.`,
      },
      contactHeadline: "Talk to Neo.",
      contactSub:
        "Within one working day with your detailed roadmap.",
      trust: [
        "Reply within one working day",
        "No-obligation strategy chat",
        "No commitment, no spam",
      ],
      namePlaceholder: "Your full name",
      emailPlaceholder: "you@company.com",
      phonePlaceholder: "Phone",
      phoneCountryAria: "Country prefix",
      submit: "Send me the roadmap",
      submitting: "Sending…",
      note: "No spam. We send the roadmap once and only follow up if you ask.",
    },

    capture: {
      eyebrow: "The 90-day roadmap",
      headline: "Want the full roadmap?",
      sub: (gbp) =>
        `The detailed plan to capture this ${gbp}/month — keyword by keyword, blocker by blocker, in 90 days.`,
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      submit: "Send me the roadmap",
      submitting: "Sending…",
      note: "No spam. We email it once and follow up only if you ask.",
    },

    sent: {
      headline: (domain) => `Your request for ${domain} is almost done.`,
      body: (gbp) =>
        `WhatsApp has opened with your results. Send the message and we'll discuss how to capture ${gbp}/month from organic search.`,
      nextSteps: {
        title: "What happens next",
        items: [
          "Send the message in WhatsApp.",
          "Personal reply within one working day.",
          "Optional 30-min strategy call with Neo, if you want it.",
        ],
      },
      reset: "Analyse another site",
    },

    reset: "Analyse another site",

    emailSubject: (name, email, domain, gbp) =>
      `SEO Analyser — ${name || email} — ${domain} — ${gbp}/mo opportunity`,
    emailAutoresponse: (name, domain, gbp, industry, location) =>
      `Hi ${name},\n\nThanks for running Neo's SEO Potential Analyser on ${domain}.\n\nHeadline: we estimate around ${gbp}/month in untapped organic-search opportunity, given your inferred industry (${industry}) and location (${location}).\n\nA member of the team will be in touch within one working day with the detailed 90-day roadmap.\n\n— Neo The Agency`,
  },
};

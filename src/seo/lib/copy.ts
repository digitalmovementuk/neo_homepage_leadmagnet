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
    documentTitleIdle: "SEO Potential Analyser — Neo",
    documentTitleAnalysing: (d) => `Analyse läuft: ${d}…`,
    documentTitleResults: (d, gbp) => `${d} — ${gbp}/Mo Opportunity`,

    errors: {
      network:
        "Analyse-Engine nicht erreichbar. Bitte Verbindung prüfen und erneut versuchen.",
      captureSend:
        "Sorry — konnte nicht gesendet werden. Bitte erneut versuchen oder direkt schreiben.",
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
      eyebrow: "SEO Potential Analyser",
      title: "Wo lebt Ihre Website?",
      sub: "Eine Domain. Drei kurze Angaben zu Ihrem Geschäft. Wir errechnen, wie viel Umsatz aus organischer Suche aktuell liegen bleibt.",
      placeholder: "meinrestaurant-koeln.de",
      submit: "Analysieren",
      footnote:
        "Live-Daten aus Semrush · Ihre Zahlen statt Branchenschätzwerte · 8 freie Analysen/Tag",
      domainAria: "Website-Domain",
      refineHeading: "Ihre Geschäftszahlen",
      refineSub:
        "Je genauer Sie diese Felder ausfüllen, desto präziser ist die Schätzung. Vorbelegungen sind branchenübliche Mittelwerte.",
      domainLabel: "Website",
      aovLabel: "Durchschnittlicher Umsatz pro Verkauf",
      aovHint: "Was bringt Ihnen ein neuer Kunde im Schnitt ein?",
      conversionRateLabel: "Conversion-Rate (Besucher → Kunde)",
      conversionRateHint: "Wie viele Website-Besucher kaufen oder werden Lead?",
      industryHintLabel: "Branche / Geschäftstyp",
      industryHintPlaceholder: "z. B. Zahnarztpraxis, Restaurant, B2B-SaaS",
      industryHintHelp: "Optional — leer lassen heißt automatisch erkennen",
    },

    analysing: {
      eyebrow: "Analyse läuft",
      lines: [
        "Domain wird normalisiert…",
        "Semrush-Datenbank für Region wird gewählt…",
        "Live-Rankings werden aus Semrush abgefragt…",
        "Top-Keywords mit Position, Volumen und Difficulty werden geladen…",
        "Wettbewerber werden über gemeinsame Keywords identifiziert…",
        "Falls kein Ranking: phrase_related liefert Keyword-Ideen aus Ihrer Branche…",
        "Click-Through-Raten je Position werden angewendet (Backlinko 2024)…",
        "Aktuelle vs. Page-1-Klicks werden verglichen…",
        "Ihre Conversion-Rate und AOV werden gekreuzt…",
        "90-Tage-Projektion wird modelliert…",
        "Opportunity-Zahl wird zusammengesetzt…",
      ],
    },

    reveal: {
      eyebrowSep: "·",
      metricLabel: "Geschätzter ungenutzter Umsatz pro Monat",
      metricSuffix: "/ Monat aus organischer Suche",
      showMaths: "So haben wir gerechnet",
      hideMaths: "Schließen",
      mathsIntro:
        "Summe über alle Keywords aus: monatliches Suchvolumen × CTR an Zielposition × Branchen-Conversion-Rate × Branchen-AOV, abzüglich aktuell geschätztem Wert auf aktueller Position.",
      mathsCtr: "CTR-Kurve",
      mathsConv: "Conversion-Rate (Branche)",
      mathsAov: "AOV (Branche)",
    },

    curve: {
      title: "90-Tage-Projektion",
      range: (d) => `Heute → Tag ${d}`,
      todayPrefix: "Heute",
      daySuffix: "Tag",
      perMonth: "Mo",
      aria: "90-Tage-Projektion",
    },

    breakdown: {
      eyebrow: "Die Aufschlüsselung",
      headline: "Warum diese Zahl nicht erfunden ist.",
      tabs: {
        rankings: "Aktuelle Rankings",
        money: "Geld auf dem Tisch",
        blockers: "Was Sie blockiert",
      },
    },

    rankings: {
      searchesPerMo: "Suchen/Mo",
      bands: {
        top3: "Top 3",
        page1: "Seite 1",
        "page2-3": "Seite 2–3",
        page4plus: "Seite 4+",
        unranked: "Ohne Ranking",
      },
    },

    money: {
      keyword: "Keyword",
      searchesPerMo: "Suchen/Mo",
      now: "Jetzt",
      ifPage1: "Wenn Seite 1",
      perMo: "£/Mo",
      clicks: "Klicks",
      total: "Gesamtopportunity pro Monat",
    },

    blockers: {
      impacts: {
        high: "Hoher Impact",
        medium: "Mittlerer Impact",
        low: "Niedriger Impact",
      },
    },

    nav: {
      back: "Zurück",
      next: "Weiter",
      finish: "Zur Zusammenfassung",
      pageOf: (n, total) => `Schritt ${n} von ${total}`,
    },

    pageRankings: {
      eyebrow: "Aktuelle Rankings",
      headline: "So sichtbar sind Sie heute.",
      sub: "Wo Ihre Kunden bei Google bereits suchen — und wo Sie aktuell auftauchen oder eben nicht.",
    },
    pageMoney: {
      eyebrow: "Geld auf dem Tisch",
      headline: "Was jede Position pro Monat wert ist.",
      sub: "Klick-Volumen heute vs. auf Seite 1, multipliziert mit Ihren echten Geschäftszahlen.",
    },
    pageBlockers: {
      eyebrow: "Was Sie blockiert",
      headline: "Drei bis fünf Dinge, die zwischen Ihnen und Seite 1 stehen.",
      sub: "Konkret und beobachtbar — keine generischen SEO-Phrasen.",
    },

    summary: {
      eyebrow: "Zusammenfassung",
      headline: "Bereit, dieses Potenzial zu erschließen?",
      sub: "Die wichtigsten Erkenntnisse aus Ihrer Analyse — plus ein direkter Draht zu Neo, wenn Sie die 90-Tage-Roadmap wollen.",
      takeaways: {
        opportunity: "Monatliche Opportunity",
        topWins: "Größte Hebel",
        topBlocker: "Wichtigster Blocker",
        timeline: "90-Tage-Pfad",
        timelineBody: (days, gbp) =>
          `In ${days} Tagen von heute auf ${gbp}/Monat aus organischer Suche.`,
      },
      contactHeadline: "Sprechen Sie mit Neo.",
      contactSub:
        "Werktags innerhalb 24 Stunden zurück mit Ihrer detaillierten Roadmap.",
      trust: [
        "Antwort werktags innerhalb 24 Stunden",
        "Unverbindliches Strategiegespräch",
        "Keine Verpflichtung, kein Spam",
      ],
      namePlaceholder: "Ihr vollständiger Name",
      emailPlaceholder: "ihre@firma.com",
      phonePlaceholder: "Telefon",
      phoneCountryAria: "Ländervorwahl",
      submit: "Roadmap an mich senden",
      submitting: "Wird gesendet…",
      note: "Kein Spam. Wir senden die Roadmap einmal und hören nur auf Wunsch wieder.",
    },

    capture: {
      eyebrow: "Die 90-Tage-Roadmap",
      headline: "Möchten Sie die volle Roadmap?",
      sub: (gbp) =>
        `Der detaillierte Plan, um diese ${gbp}/Monat zu erschließen — Keyword für Keyword, Blocker für Blocker, in 90 Tagen.`,
      nameLabel: "Name",
      namePlaceholder: "Ihr vollständiger Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "ihre@firma.com",
      submit: "Roadmap an mich senden",
      submitting: "Wird gesendet…",
      note: "Kein Spam. Wir senden die Roadmap einmal und hören nur auf Wunsch wieder.",
    },

    sent: {
      headline: (domain) => `Ihre Roadmap für ${domain} ist auf dem Weg.`,
      body: (gbp) =>
        `Wir bauen Ihren detaillierten 90-Tage-Plan, um ${gbp}/Monat aus organischer Suche zu erschließen.`,
      nextSteps: {
        title: "Was als Nächstes passiert",
        items: [
          "Bestätigung per E-Mail — sofort in Ihrem Posteingang.",
          "Detaillierte Roadmap als PDF — werktags innerhalb 24 Stunden.",
          "Optional ein 30-Minuten-Strategiegespräch mit Neo, wenn Sie wollen.",
        ],
      },
      reset: "Weitere Domain analysieren",
    },

    reset: "Weitere Domain analysieren",

    emailSubject: (name, email, domain, gbp) =>
      `SEO Analyser — ${name || email} — ${domain} — ${gbp}/Mo Opportunity`,
    emailAutoresponse: (name, domain, gbp, industry, location) =>
      `Hi ${name},\n\nDanke, dass Sie Neos SEO Potential Analyser auf ${domain} laufen lassen haben.\n\nEinschätzung: rund ${gbp}/Monat ungenutzte Opportunity aus organischer Suche, basierend auf der erkannten Branche (${industry}) und dem Standort (${location}).\n\nWir melden uns werktags innerhalb 24 Stunden mit der detaillierten 90-Tage-Roadmap.\n\n— Neo The Agency`,
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
      headline: (domain) => `Your roadmap for ${domain} is on the way.`,
      body: (gbp) =>
        `We're putting together your detailed 90-day plan to capture ${gbp}/month from organic search.`,
      nextSteps: {
        title: "What happens next",
        items: [
          "Confirmation email — already in your inbox.",
          "Detailed roadmap PDF — within one working day.",
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

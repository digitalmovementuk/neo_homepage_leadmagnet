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

  input: {
    eyebrow: string;
    title: string;
    sub: string;
    placeholder: string;
    submit: string;
    footnote: string;
    domainAria: string;
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
    headline: string;
    body: (gbp: string, domain: string) => string;
    reset: string;
  };

  reset: string;

  emailSubject: (name: string, email: string, domain: string, gbp: string) => string;
  emailAutoresponse: (name: string, domain: string, gbp: string, industry: string, location: string) => string;
};

const intGbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);

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

    input: {
      eyebrow: "SEO Potential Analyser",
      title: "Wo lebt Ihre Website?",
      sub: "Eine Domain. Neunzig Sekunden. Die Summe, die Sie aus organischer Suche aktuell liegen lassen.",
      placeholder: "meinrestaurant-koeln.de",
      submit: "Analysieren",
      footnote:
        "Echte PageSpeed-Signale · Branchenübliche CTR-Mathematik · 8 freie Analysen/Tag",
      domainAria: "Website-Domain",
    },

    analysing: {
      eyebrow: "Analyse läuft",
      lines: [
        "Homepage wird gelesen…",
        "Branche und Standort werden erkannt…",
        "Google PageSpeed läuft (Mobile & Desktop)…",
        "Core Web Vitals werden gemessen — LCP, CLS, INP…",
        "Meta-Tags, Headings, Schema-Markup werden geprüft…",
        "Hochintent-Keywords werden zugeordnet…",
        "Monatliche Suchvolumen werden geschätzt…",
        "Click-Through-Raten je Position werden berechnet…",
        "Branchen-Conversion-Raten und AOV werden gekreuzt…",
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
      headline: "Roadmap unterwegs.",
      body: (gbp, domain) =>
        `Wir stellen Ihren detaillierten 90-Tage-Plan zusammen, um ${gbp}/Monat für ${domain} zu erschließen. Werktags innerhalb 24 Stunden in Ihrem Posteingang.`,
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

    input: {
      eyebrow: "SEO Potential Analyser",
      title: "Where's your website?",
      sub: "One domain. Ninety seconds. The number on the table from search you're not capturing.",
      placeholder: "yourbusiness.co.uk",
      submit: "Analyse",
      footnote:
        "Real PageSpeed signals · Industry-standard CTR maths · 8 free runs/day per visitor",
      domainAria: "Website domain",
    },

    analysing: {
      eyebrow: "Analysing",
      lines: [
        "Reading your homepage…",
        "Inferring industry and primary location…",
        "Running Google PageSpeed (mobile & desktop)…",
        "Measuring Core Web Vitals — LCP, CLS, INP…",
        "Auditing meta tags, headings, schema markup…",
        "Mapping high-intent search keywords…",
        "Estimating monthly search volumes…",
        "Calculating click-through rates by position…",
        "Crossing with industry conversion rates and AOV…",
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
      headline: "Roadmap on the way.",
      body: (gbp, domain) =>
        `We're putting together your detailed 90-day plan to capture ${gbp}/month for ${domain}. Expect it in your inbox within one working day.`,
      reset: "Analyse another site",
    },

    reset: "Analyse another site",

    emailSubject: (name, email, domain, gbp) =>
      `SEO Analyser — ${name || email} — ${domain} — ${gbp}/mo opportunity`,
    emailAutoresponse: (name, domain, gbp, industry, location) =>
      `Hi ${name},\n\nThanks for running Neo's SEO Potential Analyser on ${domain}.\n\nHeadline: we estimate around ${gbp}/month in untapped organic-search opportunity, given your inferred industry (${industry}) and location (${location}).\n\nA member of the team will be in touch within one working day with the detailed 90-day roadmap.\n\n— Neo The Agency`,
  },
};

export { intGbp };

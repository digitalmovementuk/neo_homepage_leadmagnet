/**
 * Ihre Ansprechpartner · v1.1 (26.11.2026)
 * Fester Abschnitt direkt über dem Fußbereich, auf allen Seiten (Startseite,
 * Leistungsseiten, /seo-agentur/, Rechtliches). Zeigt die beiden Inhaber
 * Johannes Kaluc und Raoul Müller mit echten Fotos (Quelle: DM-Team-Ordner,
 * dieselben wie in den Co-Founders-Avataren im Hero).
 *
 * `tone` wechselt die Fläche, damit der Abschnitt sich immer vom vorherigen
 * abhebt: dunkel nach hellem Seitenende (Startseite, Rechtliches), hell nach
 * dunklem Seitenende (Leistungsseiten, Über uns, /seo-agentur/).
 * `data-surface` steuert dabei weiter die Logofarbe in der Kopfzeile.
 */
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../content";
import { Reveal } from "../lib/Reveal";

type Tone = "dark" | "light";
type Lang = "de" | "en";

const PEOPLE = [
  {
    id: "johannes-kaluc",
    name: "Johannes Kaluc",
    photo: "brand/founders/johannes-kaluc",
    role: { de: "Co-Founder · Operations & Business Development", en: "Co-Founder · Operations & Business Development" },
    line: {
      de: "Ihr fester Ansprechpartner, von der ersten Anfrage bis zum laufenden Projekt.",
      en: "Your single point of contact, from the first enquiry to the running project.",
    },
  },
  {
    id: "raoul-mueller",
    name: "Raoul Müller",
    photo: "brand/founders/raoul-mueller",
    role: { de: "Co-Founder · Customer Success & Strategie", en: "Co-Founder · Customer Success & Strategy" },
    line: {
      de: "Verantwortet die Strategie und dass Ihr Projekt messbar Anfragen bringt.",
      en: "Owns the strategy and makes sure your project brings measurable enquiries.",
    },
  },
] as const;

const COPY = {
  de: {
    eyebrow: "Ihre Ansprechpartner",
    headInk: "Zwei Inhaber.",
    headGrey: "Ein direkter Draht.",
    intro: "Kein Callcenter, kein Account-Manager dazwischen. Sie sprechen direkt mit den Inhabern von NEO und bekommen an Werktagen innerhalb von 24 Stunden eine Antwort.",
    cta: "Erstgespräch anfragen",
    call: "Anrufen",
  },
  en: {
    eyebrow: "Your contacts",
    headInk: "Two owners.",
    headGrey: "One direct line.",
    intro: "No call centre, no account manager in between. You speak directly with the owners of NEO and get a reply within 24 hours on working days.",
    cta: "Book a first call",
    call: "Call us",
  },
} as const;

export function ContactPersons({
  tone,
  lang = "de",
  ctaHref,
}: {
  tone: Tone;
  lang?: Lang;
  /** "#erstgespraech" auf /seo-agentur/, sonst "/#contact". */
  ctaHref: string;
}) {
  const c = COPY[lang];
  const dark = tone === "dark";
  const base = import.meta.env.BASE_URL;

  const ctaCls = dark ? "btn btn-on-dark" : "btn btn-primary";
  const callCls = dark ? "btn btn-ghost-on-dark" : "btn btn-ghost";
  const cta = ctaHref.startsWith("#") ? (
    <a href={ctaHref} className={`${ctaCls} whitespace-nowrap`}>
      {c.cta} <ArrowRight size={15} strokeWidth={2.2} />
    </a>
  ) : (
    <Link to={ctaHref} className={`${ctaCls} whitespace-nowrap`}>
      {c.cta} <ArrowRight size={15} strokeWidth={2.2} />
    </Link>
  );

  return (
    <section
      id="ansprechpartner"
      data-surface={tone}
      aria-labelledby="ansprechpartner-titel"
      className={`relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 ${
        dark ? "surface-dark text-white" : "surface-light text-ink"
      }`}
    >
      {/* Brand glow, nur dekorativ */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-gradient blur-[120px] ${
          dark ? "opacity-[0.22]" : "opacity-[0.10]"
        }`}
      />

      <div className="container-v3 relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Text + CTA */}
          <div className="text-center lg:text-left">
            <Reveal>
              <p className={`eyebrow ${dark ? "text-white/60" : "text-ink-muted"}`}>{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="ansprechpartner-titel"
                className="balance mx-auto mt-4 max-w-[16ch] text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[40px] lg:mx-0 lg:text-[48px]"
              >
                {c.headInk}{" "}
                <span className={dark ? "text-white/45" : "text-ink/40"}>{c.headGrey}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className={`pretty mx-auto mt-5 max-w-[46ch] text-[15.5px] leading-relaxed sm:text-[16.5px] lg:mx-0 ${
                  dark ? "text-white/70" : "text-ink-soft"
                }`}
              >
                {c.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                {cta}
                <a href={business.phoneHref} className={`${callCls} whitespace-nowrap`} aria-label={`${c.call}: ${business.phone}`}>
                  <Phone size={14} strokeWidth={2.2} /> {business.phone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Zwei Personenkarten */}
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {PEOPLE.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={0.1 + i * 0.08} className="h-full">
                  <article
                    className={`group relative flex h-full items-center gap-4 rounded-[24px] p-4 text-left transition-transform duration-300 hover:-translate-y-1 sm:flex-col sm:gap-0 sm:rounded-[28px] sm:px-7 sm:pb-7 sm:pt-8 sm:text-center ${
                      dark
                        ? "border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                        : "border border-ink/10 bg-surface-2 shadow-[0_24px_60px_-34px_rgba(26,14,46,0.35)]"
                    }`}
                  >
                    <span className="relative block h-[92px] w-[92px] shrink-0 rounded-full bg-brand-gradient p-[2.5px] shadow-[0_18px_40px_-18px_rgba(236,23,141,0.55)] sm:h-40 sm:w-40 sm:p-[3px]">
                      <img
                        src={`${base}${p.photo}-384.webp`}
                        srcSet={`${base}${p.photo}-192.webp 192w, ${base}${p.photo}-384.webp 384w`}
                        sizes="160px"
                        alt={`${p.name}, ${p.role[lang]} bei NEO THE AGENCY`}
                        width={160}
                        height={160}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full scale-[1.02] rounded-full object-cover grayscale ${
                          dark ? "border-[2px] border-[#1a0e2e] sm:border-[3px]" : "border-[2px] border-white sm:border-[3px]"
                        }`}
                      />
                    </span>
                    <div className="min-w-0 sm:flex sm:flex-col sm:items-center">
                    <h3 className="text-[18px] font-bold leading-tight tracking-[-0.02em] sm:mt-6 sm:text-[21px]">{p.name}</h3>
                    <p
                      className={`mt-1 text-[10.5px] font-semibold uppercase leading-snug tracking-[0.12em] sm:mt-1.5 sm:text-[11.5px] sm:tracking-[0.16em] ${
                        dark ? "text-[#FC9C48]" : "text-brand-violet-deep"
                      }`}
                    >
                      {p.role[lang]}
                    </p>
                    <p className={`mt-2 text-[13.5px] leading-snug sm:mt-4 sm:max-w-[30ch] sm:text-[14.5px] sm:leading-relaxed ${dark ? "text-white/70" : "text-ink-soft"}`}>
                      {p.line[lang]}
                    </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Seitenende hell → Abschnitt dunkel, Seitenende dunkel → Abschnitt hell. */
export function toneForPath(pathname: string): Tone {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "dark";
  if (p === "/impressum" || p === "/datenschutz") return "dark";
  if (p.startsWith("/services") || p === "/about" || p === "/uber-uns" || p === "/seo-agentur") return "light";
  return "dark";
}

/**
 * Bewertungsblock im Fußbereich · v1.2 (25.11.2026)
 * v1.2: nur Plattformen mit eigener Bewertungsseite (hasReviewForm); jede Karte öffnet die Seite zum Bewerten.
 *   Profile ohne Bewertungsseite (wlw, Tupalo, Branchenbuch Deutschland) stehen nur noch im Hero.
 * v1.1: acht Plattformen (Hotfrog, ShowMeLocal, Tupalo, 11880 dazu), Logohöhe je Plattform optisch angeglichen.
 * „Bewerten Sie uns“: Logo jeder Plattform + direkter Link zum Bewerten,
 * darunter die Social-Profile (Instagram, Facebook, YouTube) und das LinkedIn des Gründers.
 * Gleiche Adressen wie in Organization.sameAs.
 */
import { ArrowUpRight } from "lucide-react";
import { FOUNDER_LINKEDIN, PLATFORMS, SOCIALS, type Platform, type Social } from "../content/platforms";

const REVIEW_PLATFORMS = PLATFORMS.filter((p) => p.hasReviewForm);

const CARD_H: Partial<Record<Platform["key"], string>> = {
  wlw: "h-[26px]",
  "11880": "h-[28px]",
  tupalo: "h-[23px]",
  hotfrog: "h-[22px]",
  showmelocal: "h-[18px]",
};
import { useLang } from "../lib/i18n";

function SocialIcon({ k }: { k: Social["key"] | "linkedin" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (k === "instagram")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    );
  if (k === "facebook")
    return (
      <svg {...common}>
        <path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21" />
      </svg>
    );
  if (k === "youtube")
    return (
      <svg {...common}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.4v5.2l4.6-2.6L10 9.4Z" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M11.5 10.5V16" />
    </svg>
  );
}

export function PlatformReviewLinks({ forceDe }: { forceDe?: boolean }) {
  const { lang } = useLang();
  const en = !forceDe && lang === "en";

  return (
    <section
      aria-labelledby="bewerten-titel"
      className="mt-14 sm:mt-16 border-t border-ink/10 pt-10 sm:pt-12"
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="max-w-[360px] text-center lg:text-left">
          <h2 id="bewerten-titel" className="text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted">
            {en ? "Review us" : "Bewerten Sie uns"}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            {en
              ? "Worked with us? A short, honest review on one of these platforms helps other businesses decide."
              : "Sie haben mit uns gearbeitet? Eine kurze, ehrliche Bewertung auf einer dieser Plattformen hilft anderen Unternehmen bei der Entscheidung."}
          </p>
          <ul className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            {SOCIALS.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={en ? `NEO THE AGENCY on ${s.name}` : `NEO THE AGENCY auf ${s.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                >
                  <SocialIcon k={s.key} />
                </a>
              </li>
            ))}
            <li>
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener"
                aria-label={en ? "Founder Raoul Müller on LinkedIn" : "Gründer Raoul Müller auf LinkedIn"}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                <SocialIcon k="linkedin" />
              </a>
            </li>
          </ul>
        </div>

        <ul className="grid w-full max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-3">
          {REVIEW_PLATFORMS.map((p) => (
            <li key={p.key}>
              <a
                href={p.reviewUrl}
                target="_blank"
                rel="noopener"
                aria-label={
                  en
                    ? `Write a review for NEO THE AGENCY on ${p.name} (opens in a new tab)`
                    : `NEO THE AGENCY auf ${p.name} bewerten (öffnet in neuem Tab)`
                }
                className="group flex h-full flex-col items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white px-4 py-5 text-center transition-colors hover:border-ink/30"
              >
                <span className="flex h-7 items-center">
                  <img
                    src={`${import.meta.env.BASE_URL}${p.logo}`}
                    alt={en ? p.altEn : p.altDe}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    className={`w-auto ${CARD_H[p.key] ?? "h-[20px]"}`}
                  />
                </span>
                <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-ink-soft group-hover:text-ink">
                  {en ? "Write a review" : "Bewertung schreiben"}
                  <ArrowUpRight size={13} aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

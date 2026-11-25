/**
 * Hero-Band „As seen on“ · v2.0 (25.11.2026)
 * Langsam laufendes, endloses Logo-Band aller fremden Plattformen mit öffentlichem NEO-Profil
 * (Liste: HERO_PLATFORMS in content/platforms.ts, ohne eigene Social-Profile). Jedes Logo verlinkt das Profil.
 * Keine Sterne, Punktzahlen oder Zahlen. Label „As seen on“ ist Raouls Verkaufstext und bleibt in jeder Sprache gleich.
 * Endlosschleife: zwei gleiche Sätze, der zweite für Screenreader verborgen und nicht per Tab erreichbar.
 * Hält bei Maus darüber und bei Tastaturfokus an. Bei „Bewegung reduzieren“: eine ruhige, umbrechende Reihe.
 * Changelog
 * - v2.0 (25.11.2026): Glas-Kacheln ersetzt durch laufendes Band „As seen on“; Logos rund 40 % größer; Facebook und andere
 *   eigene Social-Profile nie im Band (Raoul 25.11.).
 * - v1.0 (25.11.2026): Glas-Kacheln mit Plattform-Logos im ersten Bildschirm.
 */
import { HERO_PLATFORMS, type Platform } from "../content/platforms";
import { useLang } from "../lib/i18n";

const LABEL = "As seen on";

/** Optisch gleiche Größe: kompakte Logos etwas größer, breite Schriftzüge etwas kleiner. */
const LOGO_H: Partial<Record<Platform["key"], string>> = {
  wlw: "h-[31px] sm:h-[36px]",
  "11880": "h-[32px] sm:h-[39px]",
  tupalo: "h-[28px] sm:h-[34px]",
  hotfrog: "h-[25px] sm:h-[31px]",
  showmelocal: "h-[21px] sm:h-[27px]",
  branchenbuchdeutschland: "h-[31px] sm:h-[42px]",
};
const DEFAULT_H = "h-[24px] sm:h-[30px]";

type Props = {
  /** Deutsch erzwingen (SEO-Seite ist nur deutsch). */
  forceDe?: boolean;
  /** responsive = Label über dem Band bis md, danach daneben; responsive-lg = dasselbe ab lg */
  align?: "responsive" | "responsive-lg";
  className?: string;
};

function LogoSet({ en, hidden }: { en: boolean; hidden?: boolean }) {
  return (
    <ul className="neo-marquee-set" aria-hidden={hidden || undefined} data-dup={hidden ? "" : undefined}>
      {HERO_PLATFORMS.map((p) => (
        <li key={p.key} className="flex shrink-0 items-center">
          <a
            href={p.profileUrl}
            target="_blank"
            rel="noopener"
            tabIndex={hidden ? -1 : undefined}
            aria-label={en ? `NEO THE AGENCY on ${p.name} (opens in a new tab)` : `NEO THE AGENCY auf ${p.name} (öffnet in neuem Tab)`}
            className="flex items-center rounded-md opacity-90 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          >
            <img
              src={`${import.meta.env.BASE_URL}${p.logoWhite}`}
              alt={hidden ? "" : en ? p.altEn : p.altDe}
              width={p.width}
              height={p.height}
              decoding="async"
              draggable={false}
              className={`w-auto max-w-none object-contain ${LOGO_H[p.key] ?? DEFAULT_H}`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PlatformBadges({ forceDe, align = "responsive", className = "" }: Props) {
  const { lang } = useLang();
  const en = !forceDe && lang === "en";
  const lg = align === "responsive-lg";

  return (
    <nav
      aria-label={LABEL}
      className={`flex w-full min-w-0 flex-col gap-2 sm:gap-2.5 ${
        lg ? "items-center lg:flex-row lg:items-center lg:gap-6" : "items-center md:flex-row md:items-center md:gap-7"
      } ${className}`}
    >
      <span className="shrink-0 whitespace-nowrap text-[12px] font-bold uppercase leading-none tracking-[0.2em] text-white sm:text-[13px]">
        {LABEL}
      </span>
      <div className="neo-marquee w-full min-w-0 flex-1">
        <div className="neo-marquee-track">
          <LogoSet en={en} />
          <LogoSet en={en} hidden />
        </div>
      </div>
    </nav>
  );
}

/**
 * Hero-Band „Gesehen auf“ / „As seen on“ · v2.3 (26.11.2026)
 * Langsam laufendes, endloses Logo-Band aller fremden Plattformen mit öffentlichem NEO-Profil
 * (Liste: HERO_PLATFORMS in content/platforms.ts, ohne eigene Social-Profile). Jedes Logo verlinkt das Profil.
 * Keine Sterne, Punktzahlen oder Zahlen. Label: deutsch „Gesehen auf“, englisch „As seen on“.
 * Endlosschleife: zwei gleiche Sätze, der zweite für Screenreader verborgen und nicht per Tab erreichbar.
 * Hält bei Maus darüber und bei Tastaturfokus an. Bei „Bewegung reduzieren“: eine ruhige, umbrechende Reihe.
 * Changelog
 * - v2.3 (26.11.2026): zwei Bänder übereinander, gegenläufig (oben nach links, unten nach rechts); die Plattformen
 *   abwechselnd auf beide Reihen verteilt (je 6). Je Reihe vier gleiche Sätze, damit nie eine Lücke entsteht; gleiches
 *   Tempo wie bisher (gleiche Logos pro Sekunde), gleiche Logo-Größen, weiche Kanten, Pause bei Maus und Fokus.
 * - v2.2 (26.11.2026): GoodFirms im Band (breiter Schriftzug, darum etwas niedriger, optisch gleich groß).
 * - v2.1 (25.11.2026): Label deutsch „Gesehen auf“, englisch „As seen on“ (Raoul 25.11.); Logos rund 22 % größer;
 *   Clutch im Band (verlinkt das Bewertungsformular, es gibt noch keine Profilseite).
 * - v2.0 (25.11.2026): Glas-Kacheln ersetzt durch laufendes Band „As seen on“; Logos rund 40 % größer; Facebook und andere
 *   eigene Social-Profile nie im Band (Raoul 25.11.).
 * - v1.0 (25.11.2026): Glas-Kacheln mit Plattform-Logos im ersten Bildschirm.
 */
import { HERO_PLATFORMS, type Platform } from "../content/platforms";
import { useLang } from "../lib/i18n";

/** Optisch gleiche Größe: kompakte Logos etwas größer, breite Schriftzüge etwas kleiner. */
const LOGO_H: Partial<Record<Platform["key"], string>> = {
  wlw: "h-[38px] sm:h-[44px]",
  "11880": "h-[39px] sm:h-[48px]",
  tupalo: "h-[34px] sm:h-[41px]",
  hotfrog: "h-[31px] sm:h-[38px]",
  showmelocal: "h-[26px] sm:h-[33px]",
  branchenbuchdeutschland: "h-[38px] sm:h-[51px]",
  clutch: "h-[24px] sm:h-[30px]",
  designrush: "h-[26px] sm:h-[33px]",
  goodfirms: "h-[21px] sm:h-[27px]",
};
const DEFAULT_H = "h-[29px] sm:h-[37px]";

type Props = {
  /** Deutsch erzwingen (SEO-Seite ist nur deutsch). */
  forceDe?: boolean;
  /** responsive = Label über dem Band bis md, danach daneben; responsive-lg = dasselbe ab lg */
  align?: "responsive" | "responsive-lg";
  className?: string;
};

/** Abwechselnd verteilt: Reihe 1 = 1., 3., 5. … Plattform, Reihe 2 = 2., 4., 6. … */
const ROWS: Platform[][] = [
  HERO_PLATFORMS.filter((_, i) => i % 2 === 0),
  HERO_PLATFORMS.filter((_, i) => i % 2 === 1),
];

function LogoSet({ en, items, hidden }: { en: boolean; items: Platform[]; hidden?: boolean }) {
  return (
    <ul className="neo-marquee-set" aria-hidden={hidden || undefined} data-dup={hidden ? "" : undefined}>
      {items.map((p) => (
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
  const label = en ? "As seen on" : "Gesehen auf";

  return (
    <nav
      aria-label={label}
      className={`flex w-full min-w-0 flex-col gap-2 sm:gap-2.5 ${
        lg ? "items-center lg:flex-row lg:items-center lg:gap-6" : "items-center md:flex-row md:items-center md:gap-7"
      } ${className}`}
    >
      <span className="shrink-0 whitespace-nowrap text-[12px] font-bold uppercase leading-none tracking-[0.2em] text-white sm:text-[13px]">
        {label}
      </span>
      <div className="neo-marquee-group flex w-full min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
        {ROWS.map((items, r) => (
          <div key={r} className={`neo-marquee w-full min-w-0 ${r === 1 ? "neo-marquee--rev" : ""}`}>
            <div className="neo-marquee-track">
              <LogoSet en={en} items={items} />
              <LogoSet en={en} items={items} hidden />
              <LogoSet en={en} items={items} hidden />
              <LogoSet en={en} items={items} hidden />
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

/**
 * Plattform-Kacheln im ersten Bildschirm · v1.0 (25.11.2026)
 * Große, gut sichtbare Vertrauenszeichen: offizielles Logo jeder Plattform mit öffentlichem NEO-Profil
 * (Liste: content/platforms.ts) auf einer Glas-Kachel, jeweils mit Link zum Profil.
 * Keine Sterne, Punktzahlen oder Zahlen (noch keine Bewertungen vorhanden). Ersetzt im Hero die kleine Leiste.
 * Handy: drei Spalten, alle Kacheln gleich breit. Ab sm: eine umbrechende Reihe.
 */
import { PLATFORMS, type Platform } from "../content/platforms";
import { useLang } from "../lib/i18n";

/** Optisch gleiche Größe: kompakte Logos etwas größer, breite Schriftzüge etwas kleiner. */
const BADGE_H: Partial<Record<Platform["key"], string>> = {
  wlw: "h-[22px] sm:h-[26px]",
  "11880": "h-[23px] sm:h-[28px]",
  tupalo: "h-[20px] sm:h-[24px]",
  hotfrog: "h-[18px] sm:h-[22px]",
  showmelocal: "h-[15px] sm:h-[19px]",
  branchenbuchdeutschland: "h-[22px] sm:h-[30px]",
};

type Props = {
  /** Deutsch erzwingen (SEO-Seite ist nur deutsch). */
  forceDe?: boolean;
  /** responsive = mittig bis md, danach links; responsive-lg = mittig bis lg, danach links */
  align?: "responsive" | "responsive-lg";
  className?: string;
};

export function PlatformBadges({ forceDe, align = "responsive", className = "" }: Props) {
  const { lang } = useLang();
  const en = !forceDe && lang === "en";
  const label = en ? "Find us on" : "Sie finden uns auf";
  const lg = align === "responsive-lg";

  return (
    <nav aria-label={label} className={`flex w-full flex-col ${lg ? "items-center lg:items-start" : "items-center md:items-start"} ${className}`}>
      <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/70 sm:text-[11px]">{label}</span>
      <ul
        className={`mt-2.5 grid w-full max-w-[420px] grid-cols-3 gap-2 sm:mt-3 sm:flex sm:max-w-none sm:flex-wrap ${
          lg ? "sm:justify-center lg:justify-start" : "sm:justify-center md:justify-start"
        }`}
      >
        {PLATFORMS.map((p) => (
          <li key={p.key} className="flex">
            <a
              href={p.profileUrl}
              target="_blank"
              rel="noopener"
              aria-label={en ? `NEO THE AGENCY on ${p.name} (opens in a new tab)` : `NEO THE AGENCY auf ${p.name} (öffnet in neuem Tab)`}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-2 backdrop-blur-md transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.14] sm:h-14 sm:w-auto sm:min-w-[118px] sm:px-4"
            >
              <img
                src={`${import.meta.env.BASE_URL}${p.logoWhite}`}
                alt={en ? p.altEn : p.altDe}
                width={p.width}
                height={p.height}
                decoding="async"
                className={`w-auto max-w-full object-contain ${BADGE_H[p.key] ?? "h-[17px] sm:h-[21px]"}`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

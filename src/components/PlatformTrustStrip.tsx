/**
 * Vertrauensleiste im ersten Bildschirm · v1.4 (26.11.2026)
 * v1.4: GoodFirms ergänzt (breiter Schriftzug, etwas niedriger).
 * v1.3: nur fremde Plattformen (HERO_PLATFORMS), keine eigenen Social-Profile wie Facebook.
 * Offizielle Logos aller Plattformen mit öffentlichem NEO-Profil (Liste: content/platforms.ts), jeweils mit Link zum Profil.
 * Keine Sterne, Punktzahlen oder Zahlen. Feste Höhe, damit nichts springt.
 * v1.2: Branchenbuch Deutschland ergänzt. Nur noch auf Über uns, Rechtsseiten und 404; im Hero stehen jetzt die großen Kacheln (PlatformBadges).
 * v1.1: acht Logos, Liste bricht sauber um (mittig auf dem Handy), Höhe je Logo optisch angeglichen.
 */
import { HERO_PLATFORMS, type Platform } from "../content/platforms";

/** Optisch gleiche Größe: hohe, kompakte Logos etwas größer, breite Schriftzüge etwas kleiner. */
const STRIP_H: Partial<Record<Platform["key"], string>> = {
  wlw: "h-[17px] sm:h-[20px]",
  "11880": "h-[19px] sm:h-[23px]",
  tupalo: "h-[16px] sm:h-[19px]",
  hotfrog: "h-[15px] sm:h-[18px]",
  showmelocal: "h-[13px] sm:h-[16px]",
  branchenbuchdeutschland: "h-[17px] sm:h-[21px]",
  goodfirms: "h-[11px] sm:h-[13px]",
};
import { useLang } from "../lib/i18n";

type Props = {
  tone?: "dark" | "light";
  /** Deutsch erzwingen (SEO-Seite ist nur deutsch). */
  forceDe?: boolean;
  /** Halbtransparente Kapsel hinter der Leiste, für Stellen direkt auf einem Foto. */
  pill?: boolean;
  /** responsive = mittig bis md, danach links; responsive-lg = mittig bis lg, danach links */
  align?: "center" | "start" | "responsive" | "responsive-lg";
  className?: string;
};

export function PlatformTrustStrip({ tone = "dark", forceDe, pill, align = "responsive", className = "" }: Props) {
  const { lang } = useLang();
  const en = !forceDe && lang === "en";
  const dark = tone === "dark";
  const label = en ? "Find us on" : "Sie finden uns auf";

  const alignCls =
    align === "center"
      ? "justify-center"
      : align === "start"
        ? "justify-start"
        : align === "responsive-lg"
          ? "justify-center lg:justify-start"
          : "justify-center md:justify-start";
  const labelAlign =
    align === "start"
      ? "text-left"
      : align === "responsive-lg"
        ? "text-center lg:text-left"
        : "text-center sm:text-left";

  const pillCls = pill
    ? "rounded-full border border-white/12 bg-black/25 px-4 py-2 backdrop-blur-md sm:px-5"
    : "";

  return (
    <nav aria-label={label} className={`flex ${alignCls} ${className}`}>
      <div className={`flex flex-wrap items-center ${alignCls} gap-x-4 gap-y-2 sm:gap-x-5 ${pillCls}`}>
        <span
          className={`${pill ? "sr-only sm:not-sr-only" : "w-full"} ${labelAlign} text-[10px] font-bold uppercase tracking-[0.22em] sm:w-auto sm:text-[10.5px] ${
            dark ? "text-white/60" : "text-ink-muted"
          }`}
        >
          {label}
        </span>
        <ul className={`flex flex-wrap items-center ${alignCls} gap-x-4 gap-y-2.5 sm:gap-x-5`}>
          {HERO_PLATFORMS.map((p) => (
            <li key={p.key} className="flex">
              <a
                href={p.profileUrl}
                target="_blank"
                rel="noopener"
                aria-label={en ? `NEO THE AGENCY on ${p.name} (opens in a new tab)` : `NEO THE AGENCY auf ${p.name} (öffnet in neuem Tab)`}
                className={`inline-flex min-h-[32px] items-center transition-opacity duration-200 ${
                  dark ? "opacity-80 hover:opacity-100" : "opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${dark ? p.logoWhite : p.logo}`}
                  alt={en ? p.altEn : p.altDe}
                  width={p.width}
                  height={p.height}
                  loading="eager"
                  decoding="async"
                  className={`w-auto ${STRIP_H[p.key] ?? "h-[14px] sm:h-[17px]"}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

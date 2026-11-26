import { useLang } from "../lib/i18n";

/**
 * AuthorByline · v1.0 (26.11.2026)
 * Sichtbare Autorenzeile für Startseite, Leistungsseiten und Über uns.
 * Gehört zum Person-Datensatz https://www.neotheagency.de/#johannes-kaluc (JSON-LD).
 *
 * Changelog
 *   v1.0 (26.11.2026) Erste Fassung: Johannes Kaluc als Autor, Foto mit srcset für Telefone.
 */
export function AuthorByline({ surface = "light" }: { surface?: "light" | "dark" }) {
  const { lang } = useLang();
  const en = lang === "en";
  const dark = surface === "dark";
  const base = import.meta.env.BASE_URL;
  return (
    <aside
      aria-label={en ? "Author" : "Autor"}
      data-surface={surface}
      className={dark ? "surface-dark py-8" : "py-8"}
      style={{ background: dark ? "#0a0612" : "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div
          className={`flex items-center gap-4 rounded-2xl border px-5 py-4 max-w-[640px] ${
            dark ? "border-white/10 bg-white/[0.03]" : "border-ink/10 bg-white"
          }`}
        >
          <img
            src={`${base}brand/founders/johannes-kaluc-192.webp`}
            srcSet={`${base}brand/founders/johannes-kaluc-192.webp 192w, ${base}brand/founders/johannes-kaluc-384.webp 384w`}
            sizes="48px"
            width={48}
            height={48}
            alt="Johannes Kaluc"
            loading="lazy"
            decoding="async"
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <p className={`m-0 text-[13.5px] leading-snug ${dark ? "text-white/70" : "text-ink-soft"}`}>
            <span className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>
              {en ? "Author: " : "Autor: "}
              <span rel="author">Johannes Kaluc</span>
            </span>
            <br />
            Co-Founder · Operations & Business Development
            <br />
            {en ? "Last updated: 26 November 2026" : "Zuletzt aktualisiert: 26. November 2026"}
          </p>
        </div>
      </div>
    </aside>
  );
}

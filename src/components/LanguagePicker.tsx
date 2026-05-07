import { useEffect, useRef, useState, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useLang } from "../lib/i18n";
import type { Lang } from "../lib/translations";

/**
 * LanguagePicker — clean dropdown im Top-Bar mit Flaggen-Icon (DE/GB).
 *
 * Trigger: aktuelle Flagge + 2-Letter-Code + chevron.
 * Menü: zwei Items mit echter SVG-Flagge, Sprachname und Häkchen für
 * den aktiven Eintrag. Schließt bei Outside-Click oder Escape.
 *
 * Visual identity: weiße Glas-Pillen / Hairline-Borders je Surface,
 * spiegelt das Nav-Glas-Pattern (`nav-glass-light` / `nav-glass-dark`).
 */

type Props = {
  /** "dark" wenn der Bar-Hintergrund dunkel ist, sonst "light" */
  surface: "dark" | "light";
  /** "compact" verkleinert Trigger im scrolled Nav-Modus */
  compact?: boolean;
};

const FLAGS: Record<Lang, ReactElement> = {
  de: <FlagDE />,
  en: <FlagGB />,
};

const LABELS: Record<Lang, { code: string; name: string }> = {
  de: { code: "DE", name: "Deutsch" },
  en: { code: "EN", name: "English" },
};

export function LanguagePicker({ surface, compact = false }: Props) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onDark = surface === "dark";
  const triggerCls = onDark
    ? "border-white/25 bg-white/10 hover:bg-white/15 text-white"
    : "border-ink/15 bg-white/70 hover:bg-white text-ink";

  const sizeCls = compact
    ? "h-8 px-2.5 text-[11px] gap-1.5"
    : "h-9 px-3 text-[12px] gap-2";

  const handleSelect = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.nav.languageLabel}: ${LABELS[lang].name}`}
        className={`inline-flex items-center rounded-full border backdrop-blur-md font-semibold tracking-tight transition-all duration-300 ${sizeCls} ${triggerCls}`}
      >
        <span className="block h-3.5 w-5 overflow-hidden rounded-[2px] shrink-0 ring-1 ring-black/10">
          {FLAGS[lang]}
        </span>
        <span className="hidden sm:inline">{LABELS[lang].code}</span>
        <ChevronDown
          size={12}
          strokeWidth={2.4}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label={t.nav.languageLabel}
            className={`absolute right-0 mt-2 min-w-[160px] rounded-2xl border backdrop-blur-xl overflow-hidden z-[60] ${
              onDark
                ? "border-white/15 bg-[#1a1b22]/90 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                : "border-ink/10 bg-white/95 text-ink shadow-[0_30px_60px_-30px_rgba(38,39,47,0.25)]"
            }`}
          >
            {(["de", "en"] as const).map((l) => {
              const active = l === lang;
              return (
                <li key={l} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => handleSelect(l)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                      onDark
                        ? "hover:bg-white/8"
                        : "hover:bg-ink/[0.04]"
                    } ${active ? (onDark ? "bg-white/8" : "bg-ink/[0.04]") : ""}`}
                  >
                    <span className="block h-3.5 w-5 overflow-hidden rounded-[2px] shrink-0 ring-1 ring-black/10">
                      {FLAGS[l]}
                    </span>
                    <span className="flex-1 text-left">
                      {t.nav.languages[l]}
                    </span>
                    {active && (
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className={onDark ? "text-white/85" : "text-ink"}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────  Inline Flag SVGs  ───────────────────────── */

function FlagDE() {
  return (
    <svg viewBox="0 0 5 3" className="block h-full w-full" preserveAspectRatio="none">
      <rect width="5" height="1" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className="block h-full w-full" preserveAspectRatio="none">
      <clipPath id="lp-gb-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="lp-gb-clip2">
        <path d="M30,15 h30 v15 z M30,15 v15 h-30 z M30,15 h-30 v-15 z M30,15 v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#lp-gb-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#lp-gb-clip2)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

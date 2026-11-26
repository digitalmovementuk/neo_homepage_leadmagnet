/**
 * Kleine Bausteine der SEO-Seite (/seo-agentur/) · v1.1 (19.11.2026) · v1.1: Einblenden über SeoReveal (max. 0,6 s, QA F6)
 * Überschriften, Platzhalter-Felder, Wisch-Reihen mit Punkten, Links.
 */
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { seoDe, type SeoHeading } from "../../content/seo-de";
import { Reveal } from "./SeoReveal";

/** Bildpfad aus dem Textmodul (ohne führenden Schrägstrich) zur fertigen Adresse. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const PLACEHOLDER = /(\[[^\]]+\])/g;

/**
 * Gibt einen Text aus dem Textmodul aus. Alles in eckigen Klammern ist ein
 * offener Platzhalter und erscheint als gestricheltes, leeres Feld.
 */
export function RichText({ text, dark = false }: { text: string; dark?: boolean }) {
  const parts = text.split(PLACEHOLDER);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className={`seo-ph${dark ? " seo-ph-dark" : ""}`} data-placeholder>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Leeres, gestricheltes Feld für ein fehlendes Bild. */
export function EmptySlot({
  label,
  alt,
  dark = false,
  className = "",
  children,
}: {
  label: string;
  alt?: string;
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt}
      data-placeholder
      className={`${dark ? "seo-slot-dark" : "seo-slot"} grid place-items-center text-center ${className}`}
    >
      <div className="flex flex-col items-center gap-3 p-4">
        {children}
        <span className={`seo-ph${dark ? " seo-ph-dark" : ""}`}>{label}</span>
      </div>
    </div>
  );
}

type Surface = "light" | "light-2" | "dark" | "deep";
const SURFACE: Record<Surface, string> = {
  light: "surface-light",
  "light-2": "surface-light-2",
  dark: "surface-dark seo-dark",
  deep: "surface-dark seo-dark",
};

/** Ein Abschnitt der Seite. `data-surface` steuert die Farbe der Kopfzeile. */
export function Section({
  id,
  surface = "light",
  className = "",
  children,
}: {
  id: string;
  surface?: Surface;
  className?: string;
  children: ReactNode;
}) {
  const dark = surface === "dark" || surface === "deep";
  return (
    <section
      id={id}
      data-surface={dark ? "dark" : "light"}
      aria-labelledby={`${id}-titel`}
      className={`${SURFACE[surface]} relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 ${className}`}
    >
      {children}
    </section>
  );
}

/* Kartenformen der Live-Seite /services/seo (v2.0). */
export const CARD_L3 = "rounded-[28px] sm:rounded-[36px] border border-ink/[0.08] bg-white p-7 sm:p-9 md:p-10";
export const CARD_L5 = "rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm";
export const CARD_L6 = "rounded-[24px] sm:rounded-[28px] border border-ink/[0.08] bg-white p-6 sm:p-7";
export const CARD_L7 = "rounded-2xl border border-ink/10 bg-white p-5 sm:p-6";
export const KICKER = "text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em]";
export const H3_CARD = "text-[20px] sm:text-[22px] font-bold leading-tight tracking-[-0.02em]";
export const BODY_CARD = "text-[15.5px] sm:text-[16px] leading-relaxed";
export const PILL_BLUE =
  "seo-btn-blue group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-brand-pink bg-brand-button px-7 py-3.5 text-[15px] sm:text-[16px] font-semibold text-white hover:brightness-[0.92]";

/** Oranger Haken-Punkt wie auf der Live-Seite; `no` = grauer Punkt mit Kreuz. */
export function Tick({ no = false, dark = false }: { no?: boolean; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
        no ? (dark ? "bg-white/15 text-white/70" : "bg-ink/10 text-ink/60") : "bg-[#F05F22] text-white"
      }`}
    >
      {no ? <X size={9} strokeWidth={3.5} /> : <Check size={9} strokeWidth={3.5} />}
    </span>
  );
}

/**
 * Dachzeile + Überschrift (dunkler und grauer Teil) + optionaler Einstieg.
 * `split` = Kopf wie auf der Live-Seite: Überschrift links, Einstieg rechts
 * unten (ab Desktop), am Handy mittig untereinander.
 */
export function SectionHead({
  id,
  kicker,
  heading,
  intro,
  dark = false,
  xl = false,
  center = false,
  split = false,
  className = "",
  headingClassName = "",
}: {
  id: string;
  kicker?: string;
  heading: SeoHeading;
  intro?: string;
  dark?: boolean;
  xl?: boolean;
  /** true = auf allen Breiten mittig; sonst mittig am Handy, links ab Desktop. */
  center?: boolean;
  split?: boolean;
  className?: string;
  headingClassName?: string;
}) {
  const align = center ? "text-center" : "text-center lg:text-left";
  const auto = center ? "mx-auto" : "mx-auto lg:mx-0";
  const eyebrow = kicker ? <p className={`eyebrow ${dark ? "text-white/55" : "text-ink-muted"}`}>{kicker}</p> : null;
  const title = (
    <h2
      id={`${id}-titel`}
      className={`${kicker ? "mt-5" : ""} ${xl ? "seo-h2-xl" : "seo-h2"} ${auto} ${headingClassName} ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      {heading.ink} <span className={dark ? "text-white/55" : "text-ink/55"}>{heading.grey}</span>
    </h2>
  );
  const lead = intro ? (
    <p
      className={`${auto} max-w-[60ch] text-[15.5px] sm:text-[17.5px] leading-relaxed pretty ${
        dark ? "text-white/70" : "text-ink-soft"
      }`}
    >
      <RichText text={intro} dark={dark} />
    </p>
  ) : null;
  if (split && intro) {
    return (
      <Reveal className={`grid gap-5 sm:gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-10 ${align} ${className}`}>
        <div>
          {eyebrow}
          {title}
        </div>
        {lead}
      </Reveal>
    );
  }
  return (
    <Reveal className={`${align} ${className}`}>
      {eyebrow}
      {title}
      {lead ? <div className="mt-5 sm:mt-6">{lead}</div> : null}
    </Reveal>
  );
}

/**
 * Link aus dem Textmodul: Ziele auf dieser Seite als Sprungmarke (weiches
 * Gleiten), Ziele auf der Startseite über den Router.
 */
export function SiteLink({
  to,
  hash,
  className,
  children,
  onClick,
  ...rest
}: {
  to: string;
  hash: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page";
}) {
  if (to === seoDe.path) {
    return (
      <a href={hash || "#top"} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={{ pathname: to, hash }} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/** Wisch-Reihe am Handy: merkt sich die aktive Karte und springt per Punkt. */
export function useSnapRow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const padOf = (el: HTMLElement) => parseFloat(getComputedStyle(el).paddingLeft) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 && el.scrollLeft > 4) {
        setActive(kids.length - 1);
        return;
      }
      const start = el.scrollLeft + padOf(el);
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((kid, i) => {
        const dist = Math.abs(kid.offsetLeft - start);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const kid = el.children[index] as HTMLElement | undefined;
      if (!kid) return;
      el.scrollTo({ left: kid.offsetLeft - padOf(el), behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  return { ref, active, goTo };
}

/** Klassen für die Wisch-Reihe: am Handy wischen, ab Desktop ein Raster. */
export const SNAP_ROW =
  "relative -mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2 snap-x [scroll-padding-inline:var(--gutter)]";

/**
 * Steuerung unter einer Wisch-Reihe (nur am Handy sichtbar, kein Autoplay):
 * zwei Pfeile mit 44 px Tippfläche, dazwischen die Punkte als reine Anzeige.
 */
export function SnapDots({
  count,
  active,
  onSelect,
  label,
  dark = false,
  className = "",
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  const arrow = `grid h-11 w-11 shrink-0 place-items-center rounded-full transition-opacity disabled:opacity-30 ${
    dark ? "seo-on-dark text-white" : "text-ink"
  }`;
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        role="group"
        aria-label={label}
        className={`flex items-center rounded-full backdrop-blur-md ${dark ? "bg-white/[0.12]" : "bg-ink/[0.08]"}`}
      >
        <button
          type="button"
          onClick={() => onSelect(Math.max(0, active - 1))}
          disabled={active <= 0}
          aria-label={seoDe.carousel.prev}
          className={arrow}
        >
          <ChevronLeft size={18} strokeWidth={2.4} aria-hidden />
        </button>
        <div className="flex items-center gap-1.5 px-1" aria-hidden>
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`block h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? `w-6 ${dark ? "bg-white/90" : "bg-ink/85"}`
                  : `w-2 ${dark ? "bg-white/40" : "bg-ink/35"}`
              }`}
            />
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {active + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => onSelect(Math.min(count - 1, active + 1))}
          disabled={active >= count - 1}
          aria-label={seoDe.carousel.next}
          className={arrow}
        >
          <ChevronRight size={18} strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/** Zähler in Mono-Schrift, z. B. „01 / 03“. */
export function Counter({ index, total, dark = false }: { index: number; total: number; dark?: boolean }) {
  const two = (n: number) => String(n).padStart(2, "0");
  return (
    <span className={`seo-mono text-[13px] font-medium tracking-[0.04em] ${dark ? "text-white/60" : "text-ink-muted"}`}>
      <span className={dark ? "text-[#F05F22]" : "text-[#C2410C]"}>{two(index)}</span> / {two(total)}
    </span>
  );
}

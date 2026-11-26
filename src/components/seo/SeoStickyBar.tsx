/**
 * Mitlaufende Leiste am unteren Rand · v1.1 (19.11.2026)
 * v1.1: langer Text ab 640 px (QA F5). Zwischen 640 und 1023 px kompaktere
 * Leiste (13 px, schmalerer Button), damit der Text neben dem Button passt;
 * ab 760 px in einer Zeile, darunter bricht er auf zwei Zeilen um.
 * Gleiche Form wie auf der Startseite (StickyCTA.tsx). Erscheint, sobald der
 * Kopfbereich aus dem Bild ist, und macht Platz, wenn das Abschluss-Formular
 * zu sehen ist. Am Handy mit rundem Anruf-Knopf.
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { anchors, seoDe } from "../../content/seo-de";

export function SeoStickyBar() {
  const { sticky, contact } = seoDe;
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const hero = document.getElementById(anchors.hero);
      const end = document.getElementById(anchors.finalCta);
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      let atEnd = false;
      if (end) {
        const r = end.getBoundingClientRect();
        atEnd = r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.4;
      }
      setShow(pastHero && !atEnd);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      data-track-place="sticky"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
      aria-hidden={!show}
    >
      <motion.div
        initial={false}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`seo-pulse-off flex w-full max-w-[min(900px,calc(100vw-32px))] items-center justify-between gap-2 rounded-full border border-white/55 bg-white/85 py-2 pl-5 pr-2 backdrop-blur-xl sm:w-auto sm:justify-center sm:gap-3 lg:gap-5 lg:py-3 lg:pl-7 lg:pr-3 ${
          reduce ? "shadow-soft" : "animate-pulse-bar"
        } ${show ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <p className="min-w-0 text-[13px] font-semibold leading-tight text-ink min-[760px]:whitespace-nowrap lg:text-[14.5px]">
          <span className="block max-w-[112px] sm:hidden">{sticky.textNarrow}</span>
          <span className="hidden sm:block">{sticky.textWide}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={contact.phoneHref}
            aria-label={sticky.callLabel}
            tabIndex={show ? 0 : -1}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink sm:hidden"
          >
            <Phone size={17} strokeWidth={2.2} />
          </a>
          <a
            href={`#${anchors.finalCta}`}
            tabIndex={show ? 0 : -1}
            className={`seo-pulse-off inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-pink bg-brand-button px-5 py-2.5 text-[14px] font-semibold text-white hover:brightness-[0.92] lg:px-7 lg:py-3.5 lg:text-[15px] ${
              reduce ? "" : "animate-pulse-plum"
            }`}
          >
            {sticky.button}
            <ArrowRight size={14} strokeWidth={2.4} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Kopfzeile der SEO-Seite · v1.1 (19.11.2026) · v1.1: Menüpunkte 0,3 s + 0,04 s Abstand (QA F6)
 * Gleiche Maße, Farben und Bewegungen wie die Kopfzeile der Startseite
 * (Nav.tsx), nur mit den deutschen Texten aus dem Textmodul.
 */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { anchors, seoDe } from "../../content/seo-de";
import { asset, SiteLink } from "./ui";

const NAV_BAND = 80;
const EASE = [0.22, 1, 0.36, 1] as const;

export function SeoHeader() {
  const { header, contact } = seoDe;
  const reduce = useReducedMotion();
  const [surface, setSurface] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname, hash } = useLocation();

  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4, restDelta: 0.001 });

  // Farbe der Kopfzeile folgt dem Abschnitt direkt darunter.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
      let next: "light" | "dark" = "light";
      document.querySelectorAll<HTMLElement>("[data-surface]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= NAV_BAND && r.bottom > NAV_BAND) {
          next = el.dataset.surface === "dark" ? "dark" : "light";
        }
      });
      setSurface(next);
      const hero = document.getElementById(anchors.hero);
      if (hero) setCompact(hero.getBoundingClientRect().bottom < hero.offsetHeight * 0.5);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    schedule();
    const timer = window.setTimeout(compute, 250);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-surface"],
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Menü am Handy: Seite dahinter festhalten, Escape schließt.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Aufklappliste „Leistungen“: schließt bei Klick daneben und bei Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname, hash]);

  const dark = surface === "dark";
  const linkTone = dark ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink";
  const linkSize = compact ? "text-[13px]" : "text-[15px]";
  const linkBase = `font-semibold tracking-tight transition-all duration-300 ${linkSize} ${linkTone}${dark ? " seo-on-dark" : ""}`;
  const pillTone = dark ? "border-white/30 bg-white/10 text-white" : "border-ink/15 bg-white/70 text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? (dark ? "nav-glass-dark" : "nav-glass-light") : "bg-transparent"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between px-[var(--gutter)] transition-all duration-300 ${
            compact ? "h-[48px] md:h-[56px]" : "h-[64px] md:h-[76px]"
          }`}
        >
          <Link to="/" className={`flex min-h-[44px] items-center gap-3${dark ? " seo-on-dark" : ""}`}>
            <img
              src={asset(dark ? "brand/logo-color-negative.png" : "brand/logo-color-positive.png")}
              alt={header.logoAlt}
              width={1600}
              height={174}
              draggable={false}
              className={`w-auto transition-all duration-300 ${compact ? "h-6 sm:h-7" : "h-7 sm:h-9"}`}
            />
          </Link>

          <nav
            aria-label={header.servicesLabel}
            className={`hidden md:flex items-center transition-all duration-300 ${compact ? "gap-6 lg:gap-8" : "gap-7 lg:gap-10"}`}
          >
            <div
              ref={dropRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 ${linkBase}`}
              >
                {header.servicesLabel}
                <ChevronDown
                  size={13}
                  strokeWidth={2.4}
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-1/2 z-[60] -translate-x-1/2 pt-3"
                  >
                    <div
                      className={`min-w-[300px] overflow-hidden rounded-2xl border backdrop-blur-xl ${
                        dark
                          ? "border-white/15 bg-[#1a1b22]/90 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                          : "border-ink/10 bg-white/95 text-ink shadow-[0_30px_60px_-30px_rgba(38,39,47,0.25)]"
                      }`}
                    >
                      <ul className="py-2">
                        {header.services.map((item) => {
                          const current = item.to === seoDe.path && !item.hash;
                          return (
                            <li key={item.label}>
                              <SiteLink
                                to={item.to}
                                hash={item.hash}
                                aria-current={current ? "page" : undefined}
                                onClick={() => setServicesOpen(false)}
                                className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                                  dark ? "hover:bg-white/10 seo-on-dark" : "hover:bg-ink/[0.04]"
                                }`}
                              >
                                <ArrowUpRight
                                  size={14}
                                  strokeWidth={2.2}
                                  className={`mt-1 ${current ? (dark ? "text-[#FF7A45]" : "text-[#C2410C]") : dark ? "text-white/55" : "text-ink-muted"}`}
                                />
                                <span className="block text-[14px] font-semibold tracking-tight">{item.label}</span>
                              </SiteLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            {header.links.map((item) => (
              <SiteLink key={item.label} to={item.to} hash={item.hash} className={linkBase}>
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sprach-Kennzeichen: zeigt nur „DE“, schaltet nichts um (siehe README). */}
            <span
              role="img"
              aria-label={header.languageLabel}
              className={`inline-flex h-11 min-w-[44px] items-center justify-center rounded-pill border px-3 text-[12px] font-bold tracking-[0.12em] backdrop-blur transition-colors md:h-9 md:min-w-[40px] ${pillTone}`}
            >
              {header.languageCode}
            </span>
            <a
              href={`#${anchors.finalCta}`}
              className={`hidden md:inline-flex items-center gap-2 rounded-full bg-[#0071E3] font-medium text-white transition-all duration-300 hover:bg-[#0077ED] ${
                compact ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-[14px]"
              }${dark ? " seo-on-dark" : ""}`}
            >
              {header.cta}
              <ArrowRight size={13} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={header.menuOpen}
              aria-expanded={open}
              className={`md:hidden grid h-11 w-11 place-items-center rounded-pill border backdrop-blur transition-colors ${pillTone}${
                dark ? " seo-on-dark" : ""
              }`}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#FF7A45]"
          style={{ scaleX: reduce ? scrollYProgress : spring }}
        />
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.2 } }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-plum/70 backdrop-blur"
              aria-hidden
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label={header.menuOpen}
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: reduce ? 0 : 0.32, ease: EASE } }}
              transition={{ duration: 0.32, ease: EASE }}
              className="surface-dark fixed inset-y-0 right-0 z-[70] w-[88%] max-w-[420px] overflow-y-auto p-6"
              data-lenis-prevent
            >
              <div className="flex items-center justify-between">
                <img
                  src={asset("brand/logo-color-negative.png")}
                  alt={header.logoAlt}
                  width={1600}
                  height={174}
                  className="h-7 w-auto"
                  draggable={false}
                />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={header.menuClose}
                  className="seo-on-dark grid h-11 w-11 place-items-center rounded-pill border border-white/20 text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label={header.menuOpen} className="mt-10 flex flex-col">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                  className="border-b border-white/10 pb-4"
                >
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.22em] text-white/60">
                    {header.servicesLabel}
                  </p>
                  <ul>
                    {header.services.map((item) => (
                      <li key={item.label}>
                        <SiteLink
                          to={item.to}
                          hash={item.hash}
                          onClick={() => setOpen(false)}
                          className="seo-on-dark flex min-h-[44px] items-center justify-between py-2.5 text-[16px] font-medium text-white/85 hover:text-white"
                        >
                          {item.label}
                          <ArrowUpRight size={14} className="text-white/45" />
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                {header.links.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * (i + 1), ease: EASE }}
                  >
                    <SiteLink
                      to={item.to}
                      hash={item.hash}
                      onClick={() => setOpen(false)}
                      className="seo-on-dark block border-b border-white/10 py-3.5 text-[24px] font-bold tracking-tight text-white"
                    >
                      {item.label}
                    </SiteLink>
                  </motion.div>
                ))}
              </nav>

              <a
                href={`#${anchors.finalCta}`}
                onClick={() => setOpen(false)}
                className="seo-on-dark mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] py-3 text-[15px] font-medium text-white hover:bg-[#0077ED]"
              >
                {header.cta}
                <ArrowRight size={15} />
              </a>

              <div className="mt-8 text-[14px] text-white/70">
                <a href={contact.phoneHref} className="seo-on-dark flex min-h-[44px] items-center hover:text-white">
                  {contact.phone}
                </a>
                <a href={contact.emailHref} className="seo-on-dark flex min-h-[44px] items-center hover:text-white">
                  {contact.email}
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

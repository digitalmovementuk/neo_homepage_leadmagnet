import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { business } from "../content";
import { useT } from "../lib/i18n";
import { LanguagePicker } from "./LanguagePicker";

const SERVICE_ROUTES = [
  { slug: "seo" as const, path: "/services/seo" },
  { slug: "googleAds" as const, path: "/services/google-ads" },
  { slug: "socialMedia" as const, path: "/services/social-media" },
  { slug: "websites" as const, path: "/services/websites" },
];

type Surface = "dark" | "light";

/**
 * Fixed translucent top bar. Surface tone (dark/light) is derived from which
 * page section is currently behind the bar — each section in App.tsx carries
 * a `data-surface` attribute and we pick whichever one straddles the nav
 * baseline. Logo + link colours flip accordingly so the bar always reads.
 *
 * Includes a clean LanguagePicker (DE/EN flags) — visible right of the
 * primary CTA on desktop, inline with the hamburger on mobile.
 */
export function Nav() {
  const t = useT();
  const location = useLocation();
  const [surface, setSurface] = useState<Surface>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesWrapRef = useRef<HTMLDivElement>(null);

  // Close service-dropdown on outside click + Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!servicesWrapRef.current?.contains(e.target as Node))
        setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Close dropdown on route change.
  useEffect(() => {
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const NAV_BAND = 80;
    let frame = 0;

    const compute = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);

      const sections = document.querySelectorAll<HTMLElement>("[data-surface]");
      let active: Surface = "dark";
      for (const sec of sections) {
        const r = sec.getBoundingClientRect();
        if (r.top <= NAV_BAND && r.bottom > NAV_BAND) {
          active = (sec.dataset.surface as Surface) ?? "dark";
          break;
        }
      }
      setSurface(active);

      const hero = document.getElementById("top");
      if (hero) {
        const r = hero.getBoundingClientRect();
        setCompact(r.bottom < hero.offsetHeight * 0.5);
      }
    };

    // Coalesce scroll events into a single rAF tick so we don't trigger
    // a relayout/repaint per scroll event — was causing the bar to flicker
    // at section boundaries on iOS where wheel/scroll fires very fast.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = surface === "dark";
  const linkCls = onDark
    ? "text-white/85 hover:text-white"
    : "text-ink-soft hover:text-ink";
  const ctaSize = compact ? "text-[13px] px-4 py-2" : "text-[14px] px-5 py-2.5";
  const ctaCls = `inline-flex items-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium transition-all duration-300 ${ctaSize}`;
  const hamburgerCls = onDark
    ? "border-white/30 bg-white/10 text-white"
    : "border-ink/15 bg-white/70 text-ink";

  const barHeightCls = compact ? "h-[48px] md:h-[56px]" : "h-[64px] md:h-[76px]";
  const logoHeightCls = compact ? "h-6 sm:h-7" : "h-7 sm:h-9";
  const linkSizeCls = compact ? "text-[13px]" : "text-[15px]";
  const linkGapCls = compact ? "gap-6 lg:gap-8" : "gap-7 lg:gap-10";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? onDark
              ? "nav-glass-dark"
              : "nav-glass-light"
            : "bg-transparent"
        }`}
      >
        <div className={`container-v3 flex items-center justify-between transition-all duration-300 ${barHeightCls}`}>
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="NEO THE AGENCY home"
          >
            <img
              src={`${import.meta.env.BASE_URL}brand/${
                onDark ? "logo-color-negative" : "logo-color-positive"
              }.png`}
              alt="NEO THE AGENCY"
              className={`w-auto transition-all duration-300 ${logoHeightCls}`}
              draggable={false}
            />
          </Link>

          <nav className={`hidden md:flex items-center transition-all duration-300 ${linkGapCls}`}>
            {t.nav.links.map((l, i) => {
              // First nav link is "Was wir tun" / "What we do" — turn it
              // into a hover/click dropdown with the four service routes.
              if (i === 0) {
                return (
                  <div
                    key={l.href}
                    ref={servicesWrapRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`inline-flex items-center gap-1.5 font-semibold tracking-tight transition-all duration-300 ${linkSizeCls} ${linkCls}`}
                    >
                      {l.label}
                      <ChevronDown
                        size={13}
                        strokeWidth={2.4}
                        className={`transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`absolute left-1/2 -translate-x-1/2 mt-3 min-w-[300px] rounded-2xl border backdrop-blur-xl overflow-hidden z-[60] ${
                            onDark
                              ? "border-white/15 bg-[#1a1b22]/90 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                              : "border-ink/10 bg-white/95 text-ink shadow-[0_30px_60px_-30px_rgba(38,39,47,0.25)]"
                          }`}
                        >
                          <ul className="py-2">
                            {SERVICE_ROUTES.map((r) => {
                              const sp = t.servicePages[r.slug];
                              return (
                                <li key={r.slug}>
                                  <Link
                                    to={r.path}
                                    onClick={() => setServicesOpen(false)}
                                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                                      onDark
                                        ? "hover:bg-white/10"
                                        : "hover:bg-ink/[0.04]"
                                    }`}
                                  >
                                    <ArrowUpRight
                                      size={14}
                                      strokeWidth={2.2}
                                      className={
                                        onDark
                                          ? "text-white/55 mt-1"
                                          : "text-ink-muted mt-1"
                                      }
                                    />
                                    <span className="flex-1">
                                      <span className="block text-[14px] font-semibold tracking-tight">
                                        {sp.hero.headlineTop} {sp.hero.headlineBottom}
                                      </span>
                                      <span
                                        className={`block text-[12px] mt-0.5 leading-relaxed ${
                                          onDark
                                            ? "text-white/55"
                                            : "text-ink-muted"
                                        }`}
                                      >
                                        {sp.hero.eyebrow}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                            <li
                              className={`mt-1 mx-3 pt-2 border-t ${
                                onDark ? "border-white/10" : "border-ink/8"
                              }`}
                            >
                              <a
                                href={l.href}
                                onClick={() => setServicesOpen(false)}
                                className={`flex items-center justify-between px-1 py-2 text-[12px] font-bold uppercase tracking-[0.18em] ${
                                  onDark
                                    ? "text-white/65 hover:text-white"
                                    : "text-ink-muted hover:text-ink"
                                }`}
                              >
                                {l.label}
                                <ArrowUpRight size={12} strokeWidth={2.4} />
                              </a>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  to={{ pathname: "/", hash: l.href }}
                  className={`font-semibold tracking-tight transition-all duration-300 ${linkSizeCls} ${linkCls}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguagePicker surface={surface} compact={compact} />

            <Link
              to={{ pathname: "/", hash: "#contact" }}
              className={`hidden md:inline-flex ${ctaCls}`}
            >
              {t.nav.cta} <ArrowRight size={13} />
            </Link>

            <button
              className={`md:hidden grid h-10 w-10 place-items-center rounded-pill border backdrop-blur transition-colors ${hamburgerCls}`}
              onClick={() => setOpen(true)}
              aria-label={t.nav.menuOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-plum/70 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 right-0 z-[70] w-[88%] max-w-[420px] surface-dark p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <img
                  src={`${import.meta.env.BASE_URL}brand/logo-color-negative.png`}
                  alt="NEO THE AGENCY"
                  className="h-7 w-auto"
                />
                <button
                  className="grid h-10 w-10 place-items-center rounded-pill border border-white/20 text-white"
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.menuClose}
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col">
                {t.nav.links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08 }}
                  >
                    <Link
                      to={{ pathname: "/", hash: l.href }}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-[24px] font-bold tracking-tight border-b border-white/10 text-white"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile services list */}
              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-3">
                  Services
                </p>
                <ul className="space-y-1">
                  {SERVICE_ROUTES.map((r, i) => {
                    const sp = t.servicePages[r.slug];
                    return (
                      <motion.li
                        key={r.slug}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i + 0.36 }}
                      >
                        <Link
                          to={r.path}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-2.5 text-[15px] text-white/85 hover:text-white"
                        >
                          <span>
                            {sp.hero.headlineTop} {sp.hero.headlineBottom}
                          </span>
                          <ArrowUpRight size={14} className="text-white/45" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <Link
                to={{ pathname: "/", hash: "#contact" }}
                onClick={() => setOpen(false)}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-[15px] font-medium py-3 transition-colors"
              >
                {t.nav.cta} <ArrowRight size={15} />
              </Link>

              <div className="mt-8 flex justify-center">
                <LanguagePicker surface="dark" />
              </div>

              <div className="mt-10 text-[13px] text-white/65 space-y-1.5">
                <p>{business.phone}</p>
                <p>{business.email}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

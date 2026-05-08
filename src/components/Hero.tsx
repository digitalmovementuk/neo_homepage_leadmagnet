import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import { useT, useLang } from "../lib/i18n";
import { useSeoModal } from "../lib/seoModal";

/**
 * Hero — Apple Watch Series 11 blueprint, mit eigenem Mobile-Treatment.
 *
 * Desktop (md+):
 *   • Bottom-LEFT column: chip + bold italic headline + sub + service tags
 *   • Bottom-RIGHT column: price-equivalent + Buy-style pill
 *   • Beide Spalten bottom-aligned (md:items-end), Button-Bottom = Tags-Bottom
 *
 * Mobile:
 *   • Nur Eyebrow + H1 + H2 + CTA — kein Tag-Salat, keine Preiszeile
 *   • Block sitzt knapp am unteren Rand (pb-6) damit das Video oben mehr
 *     Bühne bekommt — wie auf apple.com/apple-watch-series-11
 *
 * Right edge: kleines Pause/Play-Steuerelement über dem Video.
 */
export function Hero() {
  const t = useT();
  const { lang } = useLang();
  const { openSeo } = useSeoModal();
  const seoLabel =
    lang === "en"
      ? "Start free potential analysis"
      : "Kostenlose Potenzialanalyse starten";
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // iOS Safari is strict about autoplay. Defenses, in order:
  //   1. Force `muted` as both property AND attribute (React only sets the
  //      property; Safari needs the attribute for autoplay to fire).
  //   2. Try play() immediately, then again on canplay / loadedmetadata
  //      so a slow 4G mobile network doesn't lose the autoplay window.
  //   3. If autoplay is still blocked (Low Power Mode, strict private
  //      browsing), attach a one-shot user-gesture listener on the
  //      document so the very first touch starts the video silently.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();

    const onFirstGesture = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
    };
    document.addEventListener("touchstart", onFirstGesture, {
      once: true,
      passive: true,
    });
    document.addEventListener("pointerdown", onFirstGesture, {
      once: true,
      passive: true,
    });

    v.addEventListener("canplay", tryPlay, { once: true });
    v.addEventListener("loadedmetadata", tryPlay, { once: true });

    return () => {
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadedmetadata", tryPlay);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      data-surface="dark"
      className="surface-dark relative isolate overflow-hidden w-screen min-h-[100svh] h-[100svh]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Video is always rendered — including under prefers-reduced-motion.
            A muted, looping background clip is content, not motion that
            triggers vestibular issues. preload="auto" ensures the browser
            loads enough data to actually start playing on slower mobile
            networks instead of waiting for a user gesture. */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error fetchpriority is missing from React types
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover scale-105 bg-black"
          src={`${import.meta.env.BASE_URL}video/hero.mp4#t=0.1`}
          {...({
            "webkit-playsinline": "true",
            "x5-playsinline": "true",
          } as Record<string, string>)}
        />

        {/* Top fade — improves nav legibility */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,32,0.55) 0%, rgba(15,8,32,0) 100%)",
          }}
        />
        {/* Bottom fade — anchors the typographic block bottom-left */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,32,0) 0%, rgba(15,8,32,0.55) 65%, rgba(15,8,32,0.92) 100%)",
          }}
        />
      </div>

      {/* Pause / play control */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={paused ? t.hero.playLabel : t.hero.pauseLabel}
        className="absolute top-[max(22vh,180px)] right-5 sm:right-8 z-10 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-white/12 hover:bg-white/22 backdrop-blur-md text-white border border-white/15 transition"
      >
        {paused ? <Play size={13} fill="white" /> : <Pause size={12} fill="white" />}
      </button>

      {/* Bottom block. Mobile: tight centered stack near viewport bottom.
          Desktop: 2-column Apple Watch S11 layout, bottom-aligned. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-v3 pb-6 sm:pb-10 md:pb-20 lg:pb-24">
          <div className="flex flex-col items-center text-center gap-5 md:flex-row md:items-end md:justify-between md:text-left md:gap-10">
            {/* Left column (desktop) / full content (mobile) */}
            <div className="flex flex-col items-center md:items-start w-full md:w-auto">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-[10.5px] sm:text-[12px] font-bold uppercase text-white tracking-[0.32em]"
              >
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 sm:mt-5 md:mt-6 max-w-[18ch] text-white"
              >
                <span
                  className="block uppercase italic"
                  style={{
                    fontSize: "clamp(36px, 6.4vw, 96px)",
                    lineHeight: "0.94",
                    letterSpacing: "-0.04em",
                    fontWeight: 700,
                  }}
                >
                  {t.hero.headlineTop}
                </span>
                <span
                  className="mt-3 block max-w-[34ch] text-white/85 sm:mt-4"
                  style={{
                    fontSize: "clamp(15px, 1.8vw, 26px)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.012em",
                    fontWeight: 400,
                  }}
                >
                  {t.hero.headlineBottom}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-4 sm:mt-5 md:mt-6 max-w-[36ch] md:max-w-none text-[13.5px] sm:text-[15px] lg:text-[16px] text-white/65 leading-relaxed md:whitespace-nowrap"
              >
                {t.hero.sub}
              </motion.p>

              {/* Mobile-only CTAs — primary SEO check (orange) + secondary contact (blue) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="md:hidden mt-6 flex flex-wrap items-center gap-2.5"
              >
                <button
                  type="button"
                  onClick={openSeo}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF7A45] hover:bg-[#F15F2B] text-white font-medium text-[14px] px-5 py-2.5 transition-colors animate-pulse-plum"
                >
                  <Sparkles size={14} strokeWidth={2.4} />
                  {seoLabel}
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[14px] px-5 py-2.5 transition-colors"
                >
                  {t.hero.cta}
                </a>
              </motion.div>
            </div>

            {/* Right column — desktop only. Bottom-aligns to tags row. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="hidden md:flex flex-col md:items-end gap-3 shrink-0"
            >
              <p className="text-white/70 text-[13px] sm:text-[14px] font-medium leading-tight whitespace-nowrap md:text-right">
                {t.hero.priceLine}{" "}
                <span className="text-white/45">· {t.hero.priceLineSub}</span>
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={openSeo}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF7A45] hover:bg-[#F15F2B] text-white font-medium text-[14px] px-5 py-2 transition-colors animate-pulse-plum"
                >
                  <Sparkles size={14} strokeWidth={2.4} />
                  {seoLabel}
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[14px] px-5 py-2 transition-colors"
                >
                  {t.hero.cta}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

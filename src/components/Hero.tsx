import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import { useT, useLang } from "../lib/i18n";
import { useSeoModal } from "../lib/seoModal";

/**
 * Hero — Apple Watch Series 11 style: full-bleed motion, simple bottom-left
 * message, and one compact bottom-right CTA cluster.
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

  // iOS Safari is strict about autoplay, so force muted as an attribute too.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");

    const setOpeningFrame = () => {
      if (v.currentTime < 1.1) v.currentTime = 1.2;
    };
    const tryPlay = () => {
      setOpeningFrame();
      v.play().catch(() => {});
    };
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
    v.addEventListener("timeupdate", setOpeningFrame);

    return () => {
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("timeupdate", setOpeningFrame);
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
      className="surface-dark relative isolate h-[100svh] min-h-[100svh] w-screen overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error fetchpriority is missing from React types
          fetchpriority="high"
          className="absolute inset-0 h-full w-full bg-black object-cover"
          src={`${import.meta.env.BASE_URL}video/hero.mp4#t=1.2`}
          {...({
            "webkit-playsinline": "true",
            "x5-playsinline": "true",
          } as Record<string, string>)}
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-44"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.20) 58%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,4,10,0.46) 55%, rgba(5,4,10,0.92) 100%)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={paused ? t.hero.playLabel : t.hero.pauseLabel}
        className="absolute right-5 top-[max(16vh,140px)] z-10 grid h-9 w-9 place-items-center rounded-full border border-white/18 bg-black/24 text-white backdrop-blur-md transition hover:bg-black/36 sm:right-8 sm:h-10 sm:w-10 lg:right-10"
      >
        {paused ? <Play size={13} fill="white" /> : <Pause size={12} fill="white" />}
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto w-full max-w-[1512px] px-5 pb-[calc(22px+env(safe-area-inset-bottom))] sm:px-8 sm:pb-8 lg:px-12 lg:pb-10 xl:pb-12 2xl:px-0">
          <div className="grid items-end gap-5 md:grid-cols-[minmax(0,680px)_auto] md:justify-between md:gap-10">
            <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-white sm:text-[12px]"
              >
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 max-w-[340px] text-white sm:mt-4 md:mt-5 md:max-w-[680px]"
              >
                <span
                  className="balance block"
                  style={{
                    fontSize: "clamp(32px, 5vw, 72px)",
                    lineHeight: "1.02",
                    letterSpacing: "-0.035em",
                    fontWeight: 700,
                  }}
                >
                  {t.hero.headlineTop}
                </span>
                <span
                  className="mt-3 block max-w-[31ch] text-white/86 sm:mt-4"
                  style={{
                    fontSize: "clamp(16px, 1.55vw, 24px)",
                    lineHeight: 1.22,
                    letterSpacing: "-0.01em",
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
                className="mt-4 max-w-[38ch] text-[13.5px] leading-relaxed text-white/68 sm:mt-5 sm:text-[15px] lg:max-w-[54ch] lg:text-[16px]"
              >
                {t.hero.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="mt-6 flex w-full flex-col items-center gap-3 md:hidden"
              >
                <button
                  type="button"
                  onClick={openSeo}
                  className="inline-flex min-h-11 max-w-full items-center justify-center gap-1.5 rounded-full bg-[#FF7A45] px-5 py-2.5 text-center text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(255,122,69,0.30)] transition-colors hover:bg-[#F15F2B]"
                >
                  <Sparkles size={14} strokeWidth={2.4} />
                  {seoLabel}
                </button>
                <a
                  href="#contact"
                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-white/12 px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/18"
                >
                  {t.hero.cta}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="hidden min-w-0 shrink-0 items-center gap-3 rounded-full border border-white/10 bg-black/34 p-2 pl-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:flex"
            >
              <p className="max-w-[270px] text-right text-[13px] font-semibold leading-tight text-white/82">
                {t.hero.priceLine}{" "}
                <span className="text-white/52">· {t.hero.priceLineSub}</span>
              </p>
              <button
                type="button"
                onClick={openSeo}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#0071E3] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0077ED]"
              >
                <Sparkles size={14} strokeWidth={2.4} />
                {seoLabel}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

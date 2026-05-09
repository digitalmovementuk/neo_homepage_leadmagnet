import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import { useT, useLang } from "../lib/i18n";
import { useSeoModal } from "../lib/seoModal";

const AUTOPLAY_MS = 8000;

type HeroSlide = {
  key: string;
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  sub: string;
  video: string;
};

/**
 * Hero — auto-advancing full-bleed carousel (mirrors ServicesCarousel).
 * Three slides crossfade through hero copy variants; each slide is a
 * full-viewport-width scene with its own brand video, gradient masks,
 * and the CTA cluster pinned bottom-right (desktop) or below the headline
 * (mobile). Auto-advances every 8 s; hover pauses; arrow keys navigate.
 */
export function Hero() {
  const t = useT();
  const { lang } = useLang();
  const { openSeo } = useSeoModal();
  const seoLabel =
    lang === "en"
      ? "Start free potential analysis"
      : "Kostenlose Potenzialanalyse starten";

  // Three slides — one per headline service. Slide 1 is the brand hero;
  // slides 2 and 3 spotlight specific services using copy from t.services.
  const seo = t.services.items.find((it) => it.key === "seo");
  const websites = t.services.items.find((it) => it.key === "websites");
  const isEN = lang === "en";

  const slides: HeroSlide[] = [
    {
      key: "hero",
      eyebrow: t.hero.eyebrow,
      headlineTop: t.hero.headlineTop,
      headlineBottom: t.hero.headlineBottom,
      sub: t.hero.sub,
      video: "video/hero.mp4#t=1.2",
    },
    {
      key: "search",
      eyebrow: isEN ? "Google Search & AI Search Optimization" : "Google Search & KI-Suche Optimierung",
      headlineTop: seo?.promise ?? (isEN ? "Google page one in 90 days." : "Google Seite 1 in 90 Tagen."),
      headlineBottom: isEN
        ? "Search Engine Optimisation + AI Search Optimisation."
        : "Suchmaschinenoptimierung + KI-Suchoptimierung.",
      sub: seo?.detail ?? t.hero.sub,
      video: "video/seo-logo.mp4",
    },
    {
      key: "websites",
      eyebrow: isEN ? "Website Development" : "Website-Entwicklung",
      headlineTop: isEN
        ? "Conversion-optimised\nwebsites that rank."
        : "Conversion-optimierte\nWebsites, die ranken.",
      headlineBottom: isEN ? "From day one." : "Vom ersten Tag an.",
      sub: websites?.detail ?? t.hero.sub,
      video: "video/website-logo.mp4",
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[idx];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    setActiveIdx((i) => {
      const ni = (i + 1) % slides.length;
      goTo(ni);
      return ni;
    });
  }, [goTo, slides.length]);

  const prev = useCallback(() => {
    setActiveIdx((i) => {
      const ni = (i - 1 + slides.length) % slides.length;
      goTo(ni);
      return ni;
    });
  }, [goTo, slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const obs = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e;
          }
        }
        if (best) {
          const idx = slideRefs.current.findIndex((el) => el === best!.target);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { root: track, threshold: [0.4, 0.6, 0.8] },
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || hovering) return;
    const track = trackRef.current;
    if (!track) return;
    let visible = true;
    const sectionObs = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    sectionObs.observe(track);
    const tick = () => {
      if (!visible || document.hidden) return;
      next();
    };
    const id = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      window.clearInterval(id);
      sectionObs.disconnect();
    };
  }, [paused, hovering, next]);

  const togglePlay = () => {
    setPaused((p) => {
      const v = videoRefs.current[activeIdx];
      if (!v) return !p;
      if (p) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
      return !p;
    });
  };

  return (
    <section
      id="top"
      data-surface="dark"
      className="surface-dark relative isolate h-[100svh] min-h-[100svh] w-screen overflow-hidden"
      aria-roledescription="carousel"
      aria-label={lang === "en" ? "Hero carousel" : "Hero-Karussell"}
    >
      <div
        ref={trackRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex h-full w-full overflow-x-auto overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
          }
        }}
      >
        {slides.map((slide, i) => (
          <HeroSlideView
            key={slide.key}
            slide={slide}
            index={i}
            isActive={i === activeIdx}
            seoLabel={seoLabel}
            ctaSecondary={t.hero.cta}
            priceLine={t.hero.priceLine}
            priceLineSub={t.hero.priceLineSub}
            onOpenSeo={openSeo}
            slideRef={(el) => {
              slideRefs.current[i] = el;
            }}
            videoRef={(el) => {
              videoRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={paused ? t.hero.playLabel : t.hero.pauseLabel}
        className="absolute right-5 top-[max(16vh,140px)] z-20 grid h-9 w-9 place-items-center rounded-full border border-white/18 bg-black/24 text-white backdrop-blur-md transition hover:bg-black/36 sm:right-8 sm:h-10 sm:w-10 lg:right-10"
      >
        {paused ? <Play size={13} fill="white" /> : <Pause size={12} fill="white" />}
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center sm:bottom-6">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={lang === "en" ? `Go to slide ${i + 1}` : `Zu Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all sm:h-3 ${
                activeIdx === i ? "w-9 bg-white/90 sm:w-12" : "w-2.5 bg-white/40 hover:bg-white/60 sm:w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const HeroSlideView = ({
  slide,
  index,
  isActive,
  seoLabel,
  ctaSecondary,
  priceLine,
  priceLineSub,
  onOpenSeo,
  slideRef,
  videoRef,
}: {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
  seoLabel: string;
  ctaSecondary: string;
  priceLine: string;
  priceLineSub: string;
  onOpenSeo: () => void;
  slideRef: (el: HTMLElement | null) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}) => {
  return (
    <article
      ref={slideRef}
      className="relative h-full w-screen flex-shrink-0"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      aria-roledescription="slide"
      aria-label={`${index + 1}: ${slide.headlineTop}`}
    >
      <SlideVideo file={slide.video} videoRef={videoRef} priority={index === 0} />

      <div aria-hidden className="absolute inset-0 -z-0 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-44"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.20) 58%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Mobile: stronger, taller bottom scrim so the headline never floats over the rider. Desktop reverts to the lighter scrim. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] md:h-[62%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,4,10,0.62) 38%, rgba(5,4,10,0.92) 70%, rgba(5,4,10,0.97) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto w-full max-w-[1512px] px-5 pb-[calc(64px+env(safe-area-inset-bottom))] sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 xl:pb-28 2xl:px-0">
          <div className="grid items-end gap-5 md:grid-cols-[minmax(0,680px)_auto] md:justify-between md:gap-10">
            <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
              <motion.p
                key={`eyebrow-${slide.key}`}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
                transition={{ duration: 0.5, delay: isActive ? 0.15 : 0 }}
                className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-white sm:text-[12px]"
              >
                {slide.eyebrow}
              </motion.p>

              <motion.h1
                key={`title-${slide.key}`}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
                transition={{ duration: 0.7, delay: isActive ? 0.25 : 0, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 max-w-[340px] text-white sm:mt-4 md:mt-5 md:max-w-[680px]"
              >
                <span
                  className="balance block"
                  style={{
                    fontSize: "clamp(28px, 4.6vw, 72px)",
                    lineHeight: "1.04",
                    letterSpacing: "-0.035em",
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.headlineTop}
                </span>
                <span
                  className="mt-2 block max-w-[31ch] text-white/86 sm:mt-4"
                  style={{
                    fontSize: "clamp(14px, 1.55vw, 24px)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                  }}
                >
                  {slide.headlineBottom}
                </span>
              </motion.h1>

              <motion.p
                key={`sub-${slide.key}`}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
                transition={{ duration: 0.6, delay: isActive ? 0.4 : 0 }}
                className="mt-3 max-w-[38ch] text-[13.5px] leading-snug text-white/72 sm:mt-5 sm:text-[15px] sm:leading-relaxed sm:text-white/68 lg:max-w-[54ch] lg:text-[16px]"
              >
                {slide.sub}
              </motion.p>

              <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
                transition={{ duration: 0.6, delay: isActive ? 0.55 : 0 }}
                className="mt-5 flex w-full flex-col items-center gap-2.5 md:hidden"
              >
                <button
                  type="button"
                  onClick={onOpenSeo}
                  className="inline-flex min-h-11 max-w-full items-center justify-center gap-1.5 rounded-full bg-[#FF7A45] px-5 py-2.5 text-center text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(255,122,69,0.30)] transition-colors hover:bg-[#F15F2B]"
                >
                  <Sparkles size={14} strokeWidth={2.4} />
                  {seoLabel}
                </button>
                <a
                  href="#contact"
                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-white/12 px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/18"
                >
                  {ctaSecondary}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.6, delay: isActive ? 0.55 : 0 }}
              className="hidden min-w-0 shrink-0 items-center gap-3 rounded-full border border-white/10 bg-black/34 p-2 pl-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:flex"
            >
              <p className="max-w-[270px] text-right text-[13px] font-semibold leading-tight text-white/82">
                {priceLine} <span className="text-white/52">· {priceLineSub}</span>
              </p>
              <button
                type="button"
                onClick={onOpenSeo}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#0071E3] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0077ED]"
              >
                <Sparkles size={14} strokeWidth={2.4} />
                {seoLabel}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
};

function SlideVideo({
  file,
  videoRef,
  priority,
}: {
  file: string;
  videoRef: (el: HTMLVideoElement | null) => void;
  priority: boolean;
}) {
  const localRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = localRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");

    const tryPlay = () => v.play().catch(() => {});

    if (priority) tryPlay();

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) tryPlay();
              else v.pause();
            },
            { threshold: 0.4 },
          )
        : null;
    io?.observe(v);

    const onFirstGesture = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
    };
    document.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    document.addEventListener("pointerdown", onFirstGesture, { once: true, passive: true });

    return () => {
      io?.disconnect();
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
    };
  }, [priority]);

  return (
    <video
      ref={(el) => {
        localRef.current = el;
        videoRef(el);
      }}
      autoPlay
      loop
      muted
      playsInline
      preload={priority ? "auto" : "metadata"}
      // @ts-expect-error fetchpriority is missing from React types
      fetchpriority={priority ? "high" : "low"}
      poster={`${import.meta.env.BASE_URL}brand/hero-poster.webp`}
      className="absolute inset-0 -z-10 h-full w-full bg-black object-cover"
      // CSS background mirrors the poster so the layer behind the <video> is
      // never a black box while iOS Safari decodes the first frame on slow
      // networks. Browsers reuse the preloaded WebP from the document <head>.
      style={{
        backgroundImage: priority
          ? `image-set(url('${import.meta.env.BASE_URL}brand/hero-poster.webp') type('image/webp'))`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      src={`${import.meta.env.BASE_URL}${file}`}
      aria-hidden
      {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
    />
  );
}

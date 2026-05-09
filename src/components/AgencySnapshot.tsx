import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";

const AUTOPLAY_MS = 8000;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const SLIDE_BG = [
  "snapshot/slide-01.jpg",
  "snapshot/slide-02.jpg",
  "snapshot/slide-03.jpg",
];

type SlideContent = {
  index: string;
  label: string;
  headline: string;
  detail: string;
};

/**
 * AgencySnapshot — auto-advancing horizontal carousel (mirrors ServicesCarousel).
 * Three slides cycle through "What / For whom / What you get". Each slide is a
 * full-width rounded card with a background image, big italic numeral, label,
 * headline, and detail. Auto-advances every 8 s; hover pauses; arrow keys nav.
 */
export function AgencySnapshot() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  const items = t.snapshot.items;

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[idx];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    setActiveIdx((i) => {
      const ni = (i + 1) % items.length;
      goTo(ni);
      return ni;
    });
  }, [goTo, items.length]);

  const prev = useCallback(() => {
    setActiveIdx((i) => {
      const ni = (i - 1 + items.length) % items.length;
      goTo(ni);
      return ni;
    });
  }, [goTo, items.length]);

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
    if (hovering) return;
    const track = trackRef.current;
    if (!track) return;
    let visible = false;
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
  }, [hovering, next]);

  return (
    <section
      id="snapshot"
      data-surface="light"
      aria-label={isEN ? "Agency snapshot" : "Agentur-Snapshot"}
      aria-roledescription="carousel"
      className="surface-light relative flex flex-col pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 md:min-h-[680px]"
    >
      <div className="container-v3 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6 pb-5 sm:pb-6 border-b border-ink/10"
        >
          <h2
            className="text-ink"
            style={{
              fontSize: "clamp(20px, 2.2vw, 26px)",
              lineHeight: "1.0",
              letterSpacing: "-0.024em",
              fontWeight: 700,
            }}
          >
            {t.snapshot.title}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-ink-muted leading-relaxed">
            {t.snapshot.tagline}
          </p>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="snap-x mt-5 sm:mt-6 flex overflow-x-auto flex-1 min-h-0 gap-3 sm:gap-4"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft:
            "max(var(--gutter), calc((100vw - var(--container-max)) / 2 + var(--gutter)))",
          paddingRight:
            "max(var(--gutter), calc((100vw - var(--container-max)) / 2 + var(--gutter)))",
        }}
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
        {items.map((s, i) => (
          <SnapshotSlide
            key={s.index}
            slide={s}
            index={i}
            total={items.length}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <div className="container-v3 mt-5 sm:mt-7 shrink-0 flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-ink/[0.10] backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
          {items.map((s, i) => (
            <button
              key={s.index}
              type="button"
              onClick={() => goTo(i)}
              aria-label={isEN ? `Jump to ${s.headline}` : `Zu ${s.headline} springen`}
              className={`h-2.5 sm:h-3 rounded-full transition-all ${
                activeIdx === i ? "w-9 sm:w-12 bg-ink/85" : "w-2.5 sm:w-3 bg-ink/35 hover:bg-ink/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const SnapshotSlide = ({
  ref,
  slide,
  index,
  total,
}: {
  ref: (el: HTMLElement | null) => void;
  slide: SlideContent;
  index: number;
  total: number;
}) => {
  const base = import.meta.env.BASE_URL;
  const bgUrl = `${base}${SLIDE_BG[index] ?? SLIDE_BG[0]}`;
  return (
    <article
      ref={ref}
      className="snap-card flex-shrink-0"
      style={{
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
        width: "calc(min(100vw, var(--container-max)) - 2 * var(--gutter))",
      }}
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total}: ${slide.headline}`}
    >
      <div className="relative grid h-full min-h-[460px] w-full grid-rows-[200px_1fr] overflow-hidden rounded-[24px] bg-white shadow-card sm:min-h-[480px] sm:rounded-[32px] sm:grid-rows-[240px_1fr] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1">
        <div className="relative overflow-hidden">
          <img
            src={bgUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.95) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.92) 92%, #ffffff 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-col justify-center px-6 py-7 sm:px-10 sm:py-9 md:px-12 md:py-10 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute right-5 top-4 select-none text-ink/[0.06] sm:right-7 sm:top-5 lg:right-8 lg:top-7"
            style={{
              fontSize: "clamp(96px, 14vw, 180px)",
              fontWeight: 600,
              fontStyle: "italic",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
            }}
          >
            {slide.index}
          </span>

          <div className="relative max-w-[36ch]">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                {slide.index} / {String(total).padStart(2, "0")}
              </span>
              <Reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink-muted sm:text-[12px]">
                  {slide.label}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <h3
                className="mt-4 balance text-ink sm:mt-5"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 48px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.028em",
                  fontWeight: 700,
                }}
              >
                {slide.headline}
              </h3>
            </Reveal>

            <Reveal delay={0.12}>
              <p
                className="mt-4 max-w-[44ch] text-ink-soft sm:mt-5"
                style={{
                  fontSize: "clamp(15px, 1.15vw, 17px)",
                  lineHeight: 1.55,
                }}
              >
                {slide.detail}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
};

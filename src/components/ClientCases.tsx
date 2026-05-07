import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { caseStudies, caseStudiesDe } from "../content";
import type { CaseStudy } from "../content";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";

// A faint colour wash over each video so cards retain brand variety
// without overwhelming the footage underneath.
const ACCENT_TINT: Record<CaseStudy["accent"], string> = {
  orange: "linear-gradient(135deg, rgba(240,95,34,0.30) 0%, rgba(236,23,141,0.25) 100%)",
  pink: "linear-gradient(135deg, rgba(236,23,141,0.30) 0%, rgba(211,50,255,0.25) 100%)",
  violet: "linear-gradient(135deg, rgba(154,47,198,0.32) 0%, rgba(74,30,140,0.30) 100%)",
};

// Metropolitan urban skyline at night — sized tall (2:3) so the user scrolls
// THROUGH the city as they pass the 200vh section.
const BG_IMAGE =
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=2000&h=3000&q=80";

/**
 * ClientCases — Apple "feature story" editorial stack with a parallax bg.
 *
 * Section is 2 viewports tall on desktop. A single dark cityscape stretches
 * across the whole section behind black; a slow parallax translate makes it
 * feel like the user is scrolling THROUGH the image, not past it. Cards on
 * top are light-themed (white surface, ink text) for crisp contrast. Pattern
 * is distinct from Section 1 (horizontal slider) and Section 4 (bento grid).
 */
export function ClientCases() {
  const t = useT();
  const { lang } = useLang();
  const studies = lang === "de" ? caseStudiesDe : caseStudies;
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax: image starts a touch above center, drifts upward as the
  // user scrolls past. The image is sized 125% of the section height so even
  // at the extremes the section is fully covered with no edge gap.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "-22%"]);

  return (
    <section
      ref={sectionRef}
      id="cases"
      data-surface="light"
      className="surface-light relative overflow-hidden md:min-h-[200vh] pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      {/* Subtle ambient gradient orb — light-theme replacement for the
          previous dark cityscape parallax. Drifts gently as the user scrolls
          through the 200vh section. */}
      <motion.div
        aria-hidden
        style={!reduce ? { y: imgY } : undefined}
        className="pointer-events-none absolute inset-x-0 top-0 h-[125%] -z-0"
      >
        <div
          className="absolute -top-32 -right-40 h-[640px] w-[640px] rounded-full opacity-[0.10]"
          style={{
            background:
              "radial-gradient(circle at center, #EC178D 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-[40%] -left-40 h-[560px] w-[560px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle at center, #9A2FC6 0%, transparent 65%)",
          }}
        />
      </motion.div>

      <div className="relative container-v3">
        {/* Section header — same pattern as the other sections (eyebrow +
            h2 + sub) for page coherency, then the mobile IG-story carousel
            (or desktop stack) renders below. */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.cases.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[18ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(34px, 6vw, 84px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {t.cases.headlineMain}
                <span className="text-ink/55"> {t.cases.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.cases.intro}
            </p>
          </Reveal>
        </div>

        {/* Editorial stack — desktop only */}
        <ul className="hidden md:block mt-12 sm:mt-16 md:mt-20 space-y-5 sm:space-y-6 md:space-y-7">
          {studies.map((cs, i) => (
            <CaseRow
              key={cs.slug}
              study={cs}
              index={i}
              total={studies.length}
              reverse={i % 2 === 1}
            />
          ))}
        </ul>
      </div>

      {/* Mobile-only IG-story carousel */}
      <MobileCaseStories studies={studies} />
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Mobile IG-story carousel                                       */
/* ────────────────────────────────────────────────────────────── */

const STORY_DURATION_MS = 8000;

function MobileCaseStories({ studies }: { studies: CaseStudy[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const slideVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isProgrammaticScrollRef = useRef(false);
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Visibility — manual IntersectionObserver, more reliable than useInView
  // for sections that are taller than the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStoriesVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance — setInterval ticking at 50ms; on completion we bump
  // activeIdx, which restarts the effect for the next story.
  useEffect(() => {
    if (!storiesVisible) return;
    setProgress(0);
    const startTime = Date.now();
    const id = window.setInterval(() => {
      if (document.hidden) return;
      const p = Math.min((Date.now() - startTime) / STORY_DURATION_MS, 1);
      setProgress(p);
      if (p >= 1) {
        window.clearInterval(id);
        setActiveIdx((i) => (i + 1) % studies.length);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [activeIdx, storiesVisible, studies.length]);

  // Sync scroll to activeIdx — uses clientWidth × idx so the math doesn't
  // depend on offsetLeft layout quirks. Sets a guard flag so the slide
  // observer below ignores intermediate states during smooth scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    isProgrammaticScrollRef.current = true;
    const target = activeIdx * track.clientWidth;
    track.scrollTo({ left: target, behavior: "smooth" });
    const t = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 600);
    return () => window.clearTimeout(t);
  }, [activeIdx]);

  // Explicit play / pause + rewind on the active slide's video. Removes
  // the dependence on each video's intrinsic IntersectionObserver, which
  // wasn't always firing when slides came into the horizontal track.
  useEffect(() => {
    slideVideoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      if (i === activeIdx) {
        try {
          v.currentTime = 0;
        } catch {}
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeIdx]);

  // Slide tracker — keeps activeIdx aligned with manual swipes. Skips
  // intermediate states during programmatic (smooth) scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e;
          }
        }
        if (best) {
          const idx = slideRefs.current.findIndex((el) => el === best!.target);
          if (idx !== -1) {
            setActiveIdx((cur) => (cur === idx ? cur : idx));
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const next = () => {
    setActiveIdx((i) => (i + 1) % studies.length);
  };

  return (
    <div ref={sectionRef} className="md:hidden relative select-none mt-8">
      <div
        ref={trackRef}
        className="snap-x flex overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {studies.map((cs, i) => (
          <CaseStorySlide
            key={cs.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            videoRef={(el) => {
              slideVideoRefs.current[i] = el;
            }}
            study={cs}
            index={i}
            total={studies.length}
            onTap={next}
          />
        ))}
      </div>

      {/* Progress bars — IG style at the very top of the active story.
          Edge-to-edge slide, so just a small comfortable side inset. */}
      <div className="pointer-events-none absolute top-3 inset-x-4 flex gap-1.5 z-30">
        {studies.map((cs, i) => (
          <div
            key={cs.slug}
            className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden"
          >
            <div
              className="h-full bg-white"
              style={{
                width:
                  i < activeIdx
                    ? "100%"
                    : i === activeIdx
                      ? `${progress * 100}%`
                      : "0%",
                transition: i === activeIdx ? "none" : "width 250ms",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const CaseStorySlide = ({
  ref,
  videoRef,
  study,
  index,
  total,
  onTap,
}: {
  ref: (el: HTMLElement | null) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
  study: CaseStudy;
  index: number;
  total: number;
  onTap: () => void;
}) => {
  return (
    <article
      ref={ref}
      className="snap-card flex-shrink-0 relative overflow-hidden bg-ink"
      style={{
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
        width: "100vw",
        // 100dvh + max 100vh → always exactly one visible viewport, never
        // taller. dvh adjusts to the live toolbar state on mobile Safari.
        height: "100dvh",
        maxHeight: "100vh",
      }}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${study.client}`}
    >
      <StoryVideo file={study.video} videoRef={videoRef} />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,8,32,0.55) 0%, rgba(15,8,32,0) 18%, rgba(15,8,32,0) 50%, rgba(15,8,32,0.78) 100%)",
        }}
      />

      {/* Tap-anywhere button INSIDE each slide — part of the slide's own
          DOM/stacking context so iOS doesn't route the tap to the scroll
          container. Z-10 lets the chip + bottom overlay render visually
          above (they have pointer-events-none so taps still reach here). */}
      <button
        type="button"
        aria-label="Next case study"
        onClick={onTap}
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
      />

      <div className="absolute top-10 inset-x-5 z-20 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.20em] text-white/85 pointer-events-none">
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="h-px w-5 bg-white/40" />
        <span>{study.industry}</span>
      </div>

      <div className="absolute inset-x-0 top-[64%] bottom-0 px-6 pb-9 z-20 text-center text-white pointer-events-none flex flex-col justify-start">
        <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-white/80">
          {study.client}
        </p>
        <p
          className="mt-2.5 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
          style={{
            fontSize: "clamp(44px, 12vw, 76px)",
            lineHeight: "0.94",
            letterSpacing: "-0.04em",
            fontWeight: 700,
          }}
        >
          {study.metrics[0]?.value}
        </p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
          {study.metrics[0]?.label}
        </p>
        <p className="mt-2.5 mx-auto max-w-[32ch] text-[13px] text-white/85 leading-relaxed line-clamp-2">
          {study.body}
        </p>
      </div>
    </article>
  );
};

/**
 * StoryVideo — used by the mobile IG-story slides. The parent component
 * controls play/pause/rewind via the supplied videoRef so it doesn't rely
 * on the video's own intersection observer (which was unreliable for slides
 * inside a horizontally scrolling track).
 */
function StoryVideo({
  file,
  videoRef,
}: {
  file: string;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      // @ts-expect-error fetchpriority is missing from React types
      fetchpriority="low"
      // pointer-events-none — keeps the video purely visual so iOS can't
      // intercept taps; the slide-local "Next" button beneath catches them.
      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      src={`${import.meta.env.BASE_URL}${file}`}
      aria-hidden
      {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
    />
  );
}

function CaseVideo({ file, poster }: { file: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => v.play().catch(() => {});
    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [file]);
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      // @ts-expect-error fetchpriority is missing from React types
      fetchpriority="low"
      // pointer-events-none — keeps the video purely visual so iOS Safari
      // can't intercept taps (which would toggle native playback / restart
      // the loop). All taps reach the slide's "Next case" button beneath.
      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      src={`${import.meta.env.BASE_URL}${file}`}
      aria-hidden
      {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
    />
  );
}

function CaseRow({
  study,
  index,
  total,
  reverse,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  reverse: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white border border-ink/8 shadow-[0_30px_80px_-30px_rgba(27,14,46,0.18)]"
    >
      <div
        className={`grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Copy column — light theme, ink text */}
        <div className="p-7 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between min-h-[360px] md:min-h-[440px] text-ink">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
              <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-6 bg-ink/15" />
              <span>{study.industry}</span>
              <span className="h-px w-6 bg-ink/15" />
              <span>{study.location}</span>
            </div>

            <p className="mt-7 text-[14.5px] font-semibold text-ink tracking-[0.01em]">
              {study.client}
            </p>

            <h3
              className="mt-2.5 max-w-[18ch] balance text-ink"
              style={{
                fontSize: "clamp(30px, 3.6vw, 52px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 600,
              }}
            >
              {(() => {
                const words = study.headline.split(" ");
                const head = words.slice(0, 3).join(" ");
                const tail = words.slice(3).join(" ");
                return tail ? (
                  <>
                    {head} <span className="text-ink/55">{tail}</span>
                  </>
                ) : (
                  study.headline
                );
              })()}
            </h3>

            <p className="mt-5 max-w-[480px] text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
              {study.body}
            </p>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-1.5">
            {study.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/10 bg-surface-2 px-3 py-1.5 text-[11px] font-semibold text-ink-soft"
              >
                {s}
              </span>
            ))}
            <span className="rounded-full border border-ink/10 bg-surface-2 px-3 py-1.5 text-[11px] font-semibold text-ink-muted">
              {study.timeline}
            </span>
          </div>
        </div>

        {/* Visual column — autoplaying client video with a faint accent tint */}
        <div className="relative overflow-hidden min-h-[260px] md:min-h-[440px] flex flex-col justify-between p-7 sm:p-10 md:p-12 lg:p-14 text-white">
          <CaseVideo file={study.video} poster={study.poster} />
          {/* Accent tint */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: ACCENT_TINT[study.accent] }}
          />
          {/* Bottom + side darken so metrics + chip stay legible */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,8,32,0.10) 0%, rgba(15,8,32,0) 35%, rgba(15,8,32,0.55) 100%)",
            }}
          />

          <div className="relative flex items-start justify-between gap-4">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/85">
              Ergebnis
            </span>
            <span className="rounded-full bg-white/15 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 border border-white/20">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="relative my-8">
            <p
              className="text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.65)]"
              style={{
                fontSize: "clamp(56px, 8vw, 132px)",
                lineHeight: "0.9",
                letterSpacing: "-0.045em",
                fontWeight: 700,
              }}
            >
              {study.metrics[0]?.value}
            </p>
            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
              {study.metrics[0]?.label}
            </p>
          </div>

          <ul className="relative grid grid-cols-2 gap-4 pt-5 border-t border-white/30">
            {study.metrics.slice(1, 3).map((m) => (
              <li key={m.label}>
                <p
                  className="text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]"
                  style={{
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.0",
                  }}
                >
                  {m.value}
                </p>
                <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.16em] text-white/85 font-bold">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services as servicesFallback } from "../content";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";

const SERVICE_ROUTE_MAP: Record<string, string> = {
  seo: "/services/seo",
  "google-ads": "/services/google-ads",
  social: "/services/social-media",
  websites: "/services/websites",
};

const AUTOPLAY_MS = 8000;

/**
 * ServicesCarousel — Apple "Why Apple Watch" feature-story slider.
 * Each service = one full-screen rounded card, swipe horizontally to advance.
 * Bottom: pill of dots + circular pause/play. Auto-advances.
 */
export function ServicesCarousel() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  // i18n services merge their copy with the fallback `video` field.
  const services = t.services.items.map((it, idx) => ({
    ...it,
    video: servicesFallback[idx]?.video ?? "video/seo-logo.mp4",
  }));
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
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
    const idx = (activeIdx + 1) % services.length;
    goTo(idx);
  }, [activeIdx, goTo]);

  const prev = useCallback(() => {
    const idx = (activeIdx - 1 + services.length) % services.length;
    goTo(idx);
  }, [activeIdx, goTo]);

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
  }, [paused, hovering, next]);

  return (
    <section
      id="services"
      data-surface="light"
      className="surface-light relative flex flex-col pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 md:min-h-[680px]"
    >
      <div className="container-v3 shrink-0">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-10 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.services.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 max-w-[18ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 52px)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {t.services.headlineMain}
                <span className="text-ink/55"> {t.services.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[14px] sm:text-[15px] text-ink-soft leading-relaxed max-w-[440px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.services.intro}
            </p>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="snap-x mt-5 sm:mt-6 flex overflow-x-auto flex-1 min-h-0 gap-3 sm:gap-4"
        style={{
          scrollSnapType: "x mandatory",
          // Match container-v3's content edge on both sides so the first
          // slide's left edge lines up with the H2 above (and the last
          // slide's right edge mirrors). Without this, scroll-snap "center"
          // clamps the first slide flush to the viewport-left at scrollLeft=0.
          paddingLeft: "max(var(--gutter), calc((100vw - var(--container-max)) / 2 + var(--gutter)))",
          paddingRight: "max(var(--gutter), calc((100vw - var(--container-max)) / 2 + var(--gutter)))",
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
        {services.map((s, i) => (
          <ServiceSlide
            key={s.key}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            service={s}
            index={i}
            total={services.length}
            route={SERVICE_ROUTE_MAP[s.key]}
            learnMoreLabel={isEN ? "Learn more" : "Mehr erfahren"}
          />
        ))}
      </div>

      {/* Apple-style controls — dots only */}
      <div className="container-v3 mt-5 sm:mt-7 shrink-0 flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-ink/[0.10] backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
          {services.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={isEN ? `Jump to ${s.title}` : `Zu ${s.title} springen`}
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

type ServiceItem = {
  key: string;
  title: string;
  promise: string;
  detail: string;
  bullets: string[];
  video: string;
};

const ServiceSlide = ({
  ref,
  service,
  index,
  total,
  route,
  learnMoreLabel,
}: {
  ref: (el: HTMLElement | null) => void;
  service: ServiceItem;
  index: number;
  total: number;
  route?: string;
  learnMoreLabel: string;
}) => {
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
      aria-label={`${index + 1} / ${total}: ${service.title}`}
    >
      <div className="relative h-full min-h-[460px] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-ink shadow-card">
        {/* Full-bleed brand video covers the whole card */}
        <ServiceVideo file={service.video} />
        {/* Bottom darken — keeps the two-line overlay legible without
            heavy-handed full-card tinting */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,32,0) 35%, rgba(15,8,32,0.55) 80%, rgba(15,8,32,0.78) 100%)",
          }}
        />

        {/* Counter chip — top-right */}
        <span className="absolute top-5 right-5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 border border-white/15">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Two-line overlay + Learn-more pill, bottom-left */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-5 sm:gap-6">
          <div>
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-white/85">
              {service.title}
            </p>
            <h3
              className="mt-2 max-w-[16ch] balance text-white"
              style={{
                fontSize: "clamp(28px, 3.4vw, 48px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 600,
              }}
            >
              {service.promise}
            </h3>
          </div>
          {route && (
            <Link
              to={route}
              className="self-start inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[12.5px] font-semibold uppercase tracking-[0.16em] px-4 py-2 border border-white/15 transition-colors"
            >
              {learnMoreLabel} <ArrowUpRight size={13} strokeWidth={2.4} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

function ServiceVideo({ file }: { file: string }) {
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
      { threshold: 0.1 },
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
      preload="auto"
      // @ts-expect-error fetchpriority is missing from React types
      fetchpriority="low"
      // object-cover fills both axes; the extra scale crops the brand padding
      // around the centred logo so the animation reads boldly to the edges.
      className="absolute inset-0 h-full w-full object-cover scale-[1.18] origin-center"
      src={`${import.meta.env.BASE_URL}${file}`}
      aria-hidden
      {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
    />
  );
}

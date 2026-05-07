import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { testimonials } from "../content";
import type { Review } from "../content";
import { Reveal } from "../lib/Reveal";

const AUTOPLAY_MS = 9000;

/**
 * Reviews — horizontal swipeable Google review cards.
 *
 * Same Apple control language as Sections 1 and 2: section header in the
 * container, full-bleed scroll-snap track, dot pill + circular pause/play.
 * Each slide is a quote card with the verified-Google badge, 5 stars, the
 * quote, and the reviewer's name + role.
 */
export function Reviews() {
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
    const idx = (activeIdx + 1) % testimonials.length;
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
      { threshold: 0.3 },
    );
    sectionObs.observe(track);
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      next();
    }, AUTOPLAY_MS);
    return () => {
      window.clearInterval(id);
      sectionObs.disconnect();
    };
  }, [paused, hovering, next]);

  return (
    <section
      id="reviews"
      data-surface="light"
      className="surface-light relative pt-28 sm:pt-32 md:pt-36 pb-28 sm:pb-32 md:pb-36"
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">Verifizierte Google-Bewertungen</p>
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
                In ihren Worten.
                <span className="text-ink/55"> Nicht in unseren.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="lg:justify-self-end">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <GoogleGIcon />
                <p className="text-[15px] sm:text-[17px] text-ink-soft leading-tight">
                  <span className="font-semibold text-ink">5,0 Schnitt</span> aus{" "}
                  <span className="font-semibold text-ink">+20 verifizierten Bewertungen</span>.
                </p>
              </div>
              <div className="mt-2 flex items-center justify-center lg:justify-start gap-1 text-[#F5A623]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarFilled key={i} size={18} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="snap-x mt-10 sm:mt-12 md:mt-14 flex overflow-x-auto gap-4 sm:gap-5"
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
          }
        }}
      >
        {testimonials.map((r, i) => (
          <ReviewCard
            key={r.name}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            review={r}
            index={i}
          />
        ))}
      </div>

      {/* Apple-style controls */}
      <div className="container-v3 mt-8 sm:mt-10 flex items-center justify-center gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-2.5 rounded-full bg-ink/[0.10] backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3.5">
          {testimonials.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Bewertung von ${r.name} öffnen`}
              className={`h-2.5 rounded-full transition-all ${
                activeIdx === i ? "w-8 bg-ink/80" : "w-2.5 bg-ink/35 hover:bg-ink/55"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={paused ? "Autoplay fortsetzen" : "Autoplay pausieren"}
          onClick={() => setPaused((p) => !p)}
          className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-ink/[0.10] backdrop-blur-md text-ink/85 hover:text-ink hover:bg-ink/[0.14] transition"
        >
          {paused ? <Play size={14} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
        </button>
      </div>
    </section>
  );
}

const ReviewCard = ({
  ref,
  review,
  index,
}: {
  ref: (el: HTMLElement | null) => void;
  review: Review;
  index: number;
}) => {
  return (
    <article
      ref={ref}
      className="snap-card flex-shrink-0 basis-[88%] sm:basis-[64%] md:basis-[44%] lg:basis-[34%] xl:basis-[28%]"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      aria-roledescription="slide"
      aria-label={`${index + 1} von ${testimonials.length}: ${review.name}`}
    >
      <div className="relative h-full bg-white rounded-[24px] sm:rounded-[28px] border border-ink/8 p-7 sm:p-8 md:p-10 flex flex-col shadow-card">
        <div className="flex items-center gap-2.5">
          <GoogleGIcon size={20} />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
            Verifizierte Google-Bewertung
          </span>
        </div>

        <div className="mt-5 flex items-center gap-1 text-[#F5A623]">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarFilled key={i} size={18} />
          ))}
        </div>

        <p className="mt-6 text-[16px] sm:text-[17.5px] text-ink leading-[1.55] flex-1">
          <span aria-hidden className="text-ink/30 mr-1">"</span>
          {review.quote}
          <span aria-hidden className="text-ink/30 ml-0.5">"</span>
        </p>

        <div className="mt-8 flex items-center gap-3 pt-5 border-t border-ink/10">
          <span
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white text-[15px] font-bold tracking-tight"
            aria-hidden
          >
            {(review.initial ?? review.name[0]).toUpperCase()}
          </span>
          <div className="leading-tight">
            <p className="text-[14.5px] font-semibold text-ink">{review.name}</p>
            <p className="text-[12px] text-ink-muted mt-0.5">{review.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

function GoogleGIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function StarFilled({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.95 6 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.1 1.13-6.58L2.45 9.46l6.6-.96L12 2.5z" />
    </svg>
  );
}

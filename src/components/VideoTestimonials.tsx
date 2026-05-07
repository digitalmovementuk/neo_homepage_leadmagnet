import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useT } from "../lib/i18n";

/**
 * VideoTestimonials — premium video-Stimmen direkt nach der Mikro-Sektion.
 *
 * Schwarze Sektion, weiße Cards mit talking-head Video oben (auto-play,
 * muted, looping; pausiert off-screen). Untere Hälfte trägt Name (title),
 * Rolle + Firma (subtitle), 2-Zeilen Projekt-Beschreibung und einen
 * zentrierten "Visit Website"-Button.
 *
 * Card hat festes aspect-[4/5] für den Video-Bereich und natürliche
 * Höhe für den Content-Bereich darunter. Damit ist die Card-Höhe
 * vorhersehbar (≈ 600 px bei 360 px Breite) und das Video ist auf
 * jeder Viewport-Größe direkt sichtbar.
 *
 * Horizontaler Snap-Carousel innerhalb container-v3: linke Kante der
 * ersten Card = container-content-edge = H2-left. Negative right-margin
 * lässt den Track nach rechts in den Viewport-Rand bluten.
 *
 * Sichtbarer Unmute-Button auf jedem Video — radio-Pattern, nur eine
 * Card kann gleichzeitig hörbar sein.
 */

type Testimonial = {
  name: string;
  role: string;
  description: string;
  videoSrc?: string;
  posterSrc?: string;
  websiteUrl: string;
};

/** Media + URLs are constant across languages; copy comes from i18n. */
const MEDIA: { videoSrc: string; websiteUrl: string }[] = [
  { videoSrc: "testimonials/azura.mp4", websiteUrl: "#" },
  { videoSrc: "testimonials/address.mp4", websiteUrl: "#" },
  { videoSrc: "testimonials/cunos.mp4", websiteUrl: "#" },
  { videoSrc: "testimonials/pentadoc.mp4", websiteUrl: "https://pentadoc.com" },
  { videoSrc: "testimonials/cx.mp4", websiteUrl: "#" },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type CardProps = {
  t: Testimonial;
  i: number;
  total: number;
  labels: {
    soundOn: string;
    soundOff: string;
    visit: string;
    muteAria: (name: string) => string;
    unmuteAria: (name: string) => string;
  };
  unmutedId: string | null;
  onUnmute: (id: string | null) => void;
};

function TestimonialCard({ t, i, total, labels, unmutedId, onUnmute }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const isUnmuted = unmutedId === t.name;

  useEffect(() => {
    const v = videoRef.current;
    const root = cardRef.current;
    if (!v || !root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isUnmuted;
    if (isUnmuted) v.play().catch(() => {});
  }, [isUnmuted]);

  const toggleMute = () => onUnmute(isUnmuted ? null : t.name);

  const base = import.meta.env.BASE_URL;

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.07 * i, ease: EASE_OUT }}
      className="snap-card group relative bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col shrink-0 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        width: "min(85vw, 360px)",
      }}
      aria-roledescription="slide"
      aria-label={`${i + 1} / ${total}: ${t.name}`}
    >
      {/* Video — fixed 4/5 aspect für vorhersehbare Card-Höhe */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2a2b34 0%, #18181f 60%, #0f0f14 100%)",
          }}
        />

        <video
          ref={videoRef}
          src={t.videoSrc ? `${base}${t.videoSrc}#t=0.1` : undefined}
          poster={t.posterSrc ? `${base}${t.posterSrc}` : undefined}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={
            isUnmuted ? labels.muteAria(t.name) : labels.unmuteAria(t.name)
          }
          aria-pressed={isUnmuted}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 rounded-full bg-white/95 hover:bg-white text-ink text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
        >
          {isUnmuted ? (
            <>
              <Volume2 size={12} strokeWidth={2.4} />
              <span>{labels.soundOn}</span>
            </>
          ) : (
            <>
              <VolumeX size={12} strokeWidth={2.4} />
              <span>{labels.soundOff}</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom content — name, role, 2-line description, centered CTA */}
      <div className="flex-1 flex flex-col items-center text-center gap-2.5 sm:gap-3 p-4 sm:p-5 md:p-6">
        <div>
          <h3
            className="text-ink"
            style={{
              fontSize: "clamp(14px, 1.3vw, 17px)",
              lineHeight: "1.2",
              letterSpacing: "-0.018em",
              fontWeight: 700,
            }}
          >
            {t.name}
          </h3>
          <p className="mt-0.5 text-[11.5px] sm:text-[12.5px] text-ink-muted leading-snug">
            {t.role}
          </p>
        </div>

        <p className="text-[12.5px] sm:text-[13.5px] text-ink-soft leading-relaxed line-clamp-2">
          {t.description}
        </p>

        <a
          href={t.websiteUrl}
          target={t.websiteUrl.startsWith("http") ? "_blank" : undefined}
          rel={
            t.websiteUrl.startsWith("http") ? "noopener noreferrer" : undefined
          }
          className="mt-auto inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 px-3.5 sm:px-4 rounded-full bg-ink text-white text-[11.5px] sm:text-[12px] font-semibold tracking-[0.01em] hover:bg-[#0071E3] transition-colors duration-300"
        >
          <span>{labels.visit}</span>
          <ArrowUpRight size={13} strokeWidth={2.2} />
        </a>
      </div>
    </motion.li>
  );
}

export function VideoTestimonials() {
  const t = useT();
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const TESTIMONIALS: Testimonial[] = t.testimonials.items.map((it, idx) => ({
    name: it.name,
    role: it.role,
    description: it.description,
    videoSrc: MEDIA[idx]?.videoSrc,
    websiteUrl: MEDIA[idx]?.websiteUrl ?? "#",
  }));

  // Soft heuristic: EN translation table uses "Sound" as `soundOff`, DE uses "Ton".
  const isEN = t.testimonials.soundOff !== "Ton";
  const labels = {
    soundOn: t.testimonials.soundOn,
    soundOff: t.testimonials.soundOff,
    visit: t.testimonials.visit,
    muteAria: (name: string) => (isEN ? `Mute ${name}` : `${name} stummschalten`),
    unmuteAria: (name: string) =>
      isEN ? `Unmute ${name}` : `${name} Ton einschalten`,
  };

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardW = first?.offsetWidth ?? 360;
    const gap = 20;
    el.scrollBy({ left: dir * (cardW + gap), behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      data-surface="dark"
      className="relative pt-12 pb-12 md:pt-24 md:pb-24 text-white"
      style={{ background: "#0a0a0c" }}
    >
      <div className="container-v3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-3 lg:gap-12 items-end pb-6 sm:pb-10 md:pb-12 border-b border-white/10 text-center lg:text-left"
        >
          <div>
            <p className="eyebrow text-white/55 text-[10.5px] sm:text-[12px]">
              {t.testimonials.eyebrow}
            </p>
            <h2
              className="mt-3 sm:mt-5 max-w-[20ch] mx-auto lg:mx-0 balance text-white"
              style={{
                fontSize: "clamp(28px, 6vw, 84px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
            >
              {t.testimonials.headline}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 lg:items-end">
            <p className="text-[13px] sm:text-[15px] lg:text-[17px] text-white/65 leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              {t.testimonials.description}
            </p>
            <div className="flex items-center gap-2 self-center lg:self-auto">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label={t.testimonials.prevLabel}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label={t.testimonials.nextLabel}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carousel — ul lives INSIDE container-v3, so its left edge =
            container content edge = exact H2 alignment. Negative right
            margin lets the track bleed past container's right gutter. */}
        <ul
          ref={trackRef}
          className="snap-x mt-6 sm:mt-10 md:mt-12 flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            marginRight:
              "calc(-1 * max(var(--gutter), (100vw - var(--container-max)) / 2 + var(--gutter)))",
            paddingRight:
              "max(var(--gutter), calc((100vw - var(--container-max)) / 2 + var(--gutter)))",
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              scroll(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              scroll(-1);
            }
          }}
        >
          {TESTIMONIALS.map((it, i) => (
            <TestimonialCard
              key={it.name}
              t={it}
              i={i}
              total={TESTIMONIALS.length}
              labels={labels}
              unmutedId={unmutedId}
              onUnmute={setUnmutedId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

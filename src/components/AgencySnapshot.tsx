import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useT } from "../lib/i18n";

/**
 * AgencySnapshot — scroll-jacked Mikro-Sektion direkt unter dem Hero.
 *
 * Verhalten:
 *   • Section ist 300vh hoch — der äußere Container "frisst" 3 Viewport-
 *     Höhen Scrolling.
 *   • Innerhalb davon ein sticky Wrapper (`top-0 h-screen`), der das
 *     Viewport pinnt während die Section gescrollt wird.
 *   • Ein horizontaler Track (3 × 100vw) übersetzt sich anhand des
 *     Scroll-Progress: Slide 1 → 2 → 3 horizontal.
 *   • Wenn die Section bottom erreicht ist, löst sich der sticky-Lock
 *     automatisch (Sticky endet, sobald Parent-Bottom oben aus dem
 *     Viewport rauskommt) und die Page rollt vertikal weiter — exakt
 *     wie bei Apple-/Stripe-Pinning-Patterns.
 *
 * Mobile / reduced-motion: kein Pinning, sondern eine vertikale Liste
 * der drei Slides, damit die Touch-Scroll-Erfahrung nicht hijacked wird.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type SlideContent = {
  index: string;
  label: string;
  headline: string;
  detail: string;
};

/** Background images per slide — agency-vibe stock with light overlay,
 *  in sync with the focus state (sharp + less overlay when active). */
const SLIDE_BG = [
  "snapshot/slide-01.jpg",
  "snapshot/slide-02.jpg",
  "snapshot/slide-03.jpg",
];

export function AgencySnapshot() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Wrap raw scroll progress in a spring so the horizontal slide and
  // colour/blur transitions have natural inertia instead of being
  // 1:1 locked to the user's scroll position. Eliminates the mechanical
  // "jumps to whatever pixel I've scrolled" feel.
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Track translates from 0 → -200vw across the full scroll-pinned range,
  // bringing slide 1 → 2 → 3 into view. 3 slides × 100vw each = 300vw track,
  // moved by 200vw to put slide 3 flush with the viewport.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  const items = t.snapshot.items;

  // Note: previously this section bypassed the scroll-jack under
  // prefers-reduced-motion. We removed that branch — the horizontal
  // slide is content navigation (one slide per third of the section
  // height), not gratuitous parallax that triggers vestibular issues.
  // Without the bypass, iOS users with the "Reduce Motion" toggle on
  // (very common) still see the slide animation as intended.

  return (
    <section
      id="snapshot"
      data-surface="light"
      aria-label="Agentur-Snapshot"
      ref={sectionRef}
      className="surface-light relative h-[300svh] md:h-[300vh]"
    >
      {/* Sticky pin — bleibt 100vh hoch im Viewport, während die Section
          ihre 300vh durchgescrollt wird. Innerhalb davon der horizontale
          Slider. */}
      <div
        className="sticky top-0 h-[100svh] md:h-screen overflow-hidden flex flex-col"
        style={{
          // GPU layer hint — keeps the pinned viewport on its own
          // composite layer so backdrop-filters and scroll-driven
          // transforms don't repaint the page beneath.
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      >
        {/* Section header — sitzt oben in der pinned-Card, klein gehalten */}
        <div className="container-v3 pt-[max(env(safe-area-inset-top),5rem)] sm:pt-24 md:pt-28 shrink-0">
          <SnapshotHeader
            title={t.snapshot.title}
            tagline={t.snapshot.tagline}
            progress={scrollYProgress}
          />
        </div>

        {/* Horizontal track — 3 slides à 100vw = 300vw breit. Bewegt sich
            nach links während des vertikalen Scrolls in der Section. */}
        <motion.ul
          style={{ x }}
          className="flex flex-1 min-h-0 will-change-transform"
        >
          {items.map((s, i) => (
            <Slide key={s.index} s={s} index={i} progress={scrollYProgress} />
          ))}
        </motion.ul>

        {/* Progress dots — fixed bottom, fill as user scrolls through the 3 slides */}
        <ProgressDots progress={scrollYProgress} count={items.length} />
      </div>
    </section>
  );
}

/* ─────────────────────────────  Section header  ─────────────────────────── */

function SnapshotHeader({
  title,
  tagline,
  progress,
}: {
  title: string;
  tagline: string;
  progress?: MotionValue<number>;
}) {
  // Section title fades a touch as user scrolls deeper into the pinned section,
  // pushing focus onto the slide content. Use a stable fallback MV so the
  // hook chain runs unconditionally even when no progress is supplied.
  const fallback = useMotionValue(0);
  const headerOpacity = useTransform(progress ?? fallback, [0, 0.85, 1], [1, 0.55, 0.4]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={progress ? { opacity: headerOpacity } : undefined}
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
        {title}
      </h2>
      <p className="text-[12px] sm:text-[13px] text-ink-muted leading-relaxed">
        {tagline}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────  Single slide  ───────────────────────────── */

function Slide({
  s,
  index,
  progress,
}: {
  s: SlideContent;
  index: number;
  progress: MotionValue<number>;
}) {
  // Slide handoff sync — the moment slide A starts blurring out, slide B
  // starts sharpening in, both crossing the same handoff window.
  //
  // Focus boundaries between slides sit at progress 0.25 (slide 0 → 1)
  // and 0.75 (slide 1 → 2). The transition window is centred on each
  // boundary (±delta), so during the handoff range BOTH neighbouring
  // slides animate simultaneously: outgoing fades to grey + blurs +
  // overlay heavies, incoming snaps to black + sharpens + overlay lifts.
  //
  // Offsets stay in [0, 1] and strictly monotonic.
  const delta = 0.035;
  const eps = 0.0001;
  const cut1 = 0.25;
  const cut2 = 0.75;

  type Stops = [number, number, number, number];
  type Quad<T> = [T, T, T, T];

  let stops: Stops;
  let pattern: "first" | "middle" | "last";

  if (index === 0) {
    // First slide — sits active from progress 0, hands off to slide 1
    // at the first cut.
    stops = [0, cut1 - delta, cut1 + delta, 1] as Stops;
    pattern = "first";
  } else if (index === 1) {
    // Middle slide — handoff in at cut1, handoff out at cut2.
    stops = [
      cut1 - delta,
      cut1 + delta,
      cut2 - delta,
      cut2 + delta,
    ] as Stops;
    pattern = "middle";
  } else {
    // Last slide — handoff in at cut2, sits active until progress 1.
    stops = [0, cut2 - delta, cut2 + delta, 1] as Stops;
    pattern = "last";
  }

  // Guard against equal stops (defensive — shouldn't happen with current
  // delta but keeps framer-motion's Element.animate() happy).
  for (let i = 1; i < 4; i++) {
    if (stops[i] <= stops[i - 1]) stops[i] = stops[i - 1] + eps;
  }

  /** Returns a 4-stop value array using the slide's handoff pattern. */
  const v = <T,>(active: T, inactive: T): Quad<T> => {
    if (pattern === "first") {
      // [active@0, active@cut-δ, inactive@cut+δ, inactive@1]
      return [active, active, inactive, inactive];
    }
    if (pattern === "last") {
      // [inactive@0, inactive@cut-δ, active@cut+δ, active@1]
      return [inactive, inactive, active, active];
    }
    // middle: [inactive, active, active, inactive]
    return [inactive, active, active, inactive];
  };

  const scale = useTransform(progress, stops, v(1, 0.96));

  const headlineColor = useTransform(progress, stops, v("#000000", "#9a9a9a"));
  const numeralColor = useTransform(
    progress,
    stops,
    v("rgba(0,0,0,0.55)", "rgba(38,39,47,0.10)")
  );
  const detailColor = useTransform(progress, stops, v("#26272f", "#a8a8a8"));
  const labelColor = useTransform(progress, stops, v("#000000", "#a8a8a8"));

  // Background image — sharp + more visible when active, blurred +
  // bleached when inactive. Same handoff window as the text.
  const bgBlurValue = useTransform(progress, stops, v(0, 18));
  const bgFilter = useTransform(bgBlurValue, (val) => `blur(${val}px)`);
  const bgScale = useTransform(progress, stops, v(1, 1.06));
  const overlayOpacity = useTransform(progress, stops, v(0.55, 0.92));

  const base = import.meta.env.BASE_URL;
  const bgUrl = `${base}${SLIDE_BG[index] ?? SLIDE_BG[0]}`;

  return (
    <li className="relative w-screen h-full shrink-0 flex items-center overflow-hidden">
      {/* Background image — blurred + bleached when out of focus, sharp +
          more visible when this slide is the user's centre of attention */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url("${bgUrl}")`,
          filter: bgFilter,
          scale: bgScale,
        }}
      />
      {/* White overlay — lighter when in focus, heavier when out.
          Drives the "becomes more visible" half of the user's brief. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-white"
        style={{ opacity: overlayOpacity }}
      />
      <motion.div
        style={{ scale }}
        className="relative z-10 container-v3 flex flex-col justify-center text-center lg:text-left"
      >
        <div className="grid lg:grid-cols-[auto_1fr] lg:gap-12 lg:items-center max-w-[1100px] mx-auto lg:mx-0">
          {/* Big italic numeral — stronger contrast at the centered moment */}
          <motion.span
            style={{ color: numeralColor }}
            className="block leading-none mb-6 lg:mb-0"
            aria-hidden
          >
            <span
              style={{
                fontSize: "clamp(120px, 18vw, 280px)",
                letterSpacing: "-0.05em",
                fontWeight: 500,
                fontStyle: "italic",
                lineHeight: "0.9",
              }}
            >
              {s.index}
            </span>
          </motion.span>

          <div>
            <motion.p
              style={{ color: labelColor }}
              className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.24em]"
            >
              {s.label}
            </motion.p>
            <motion.h3
              style={{
                color: headlineColor,
                fontSize: "clamp(40px, 7.5vw, 120px)",
                lineHeight: "1.0",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
              className="mt-4 sm:mt-5 balance"
            >
              {s.headline}
            </motion.h3>
            <motion.p
              style={{ color: detailColor }}
              className="mt-5 sm:mt-7 max-w-[44ch] mx-auto lg:mx-0 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed"
            >
              {s.detail}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

/* ─────────────────────────────  Static fallback  ────────────────────────── */

function SlideStatic({ s }: { s: SlideContent }) {
  return (
    <div className="text-center lg:text-left">
      <span
        className="block leading-none text-ink/15"
        style={{
          fontSize: "clamp(56px, 9vw, 110px)",
          letterSpacing: "-0.05em",
          fontWeight: 500,
          fontStyle: "italic",
        }}
        aria-hidden
      >
        {s.index}
      </span>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-muted">
        {s.label}
      </p>
      <h3
        className="mt-3 text-ink balance"
        style={{
          fontSize: "clamp(28px, 6vw, 56px)",
          lineHeight: "1.06",
          letterSpacing: "-0.028em",
          fontWeight: 700,
        }}
      >
        {s.headline}
      </h3>
      <p className="mt-3 max-w-[44ch] mx-auto lg:mx-0 text-[14.5px] sm:text-[16px] text-ink-soft leading-relaxed">
        {s.detail}
      </p>
    </div>
  );
}

/* ─────────────────────────────  Progress dots  ──────────────────────────── */

function ProgressDots({
  progress,
  count,
}: {
  progress: MotionValue<number>;
  count: number;
}) {
  return (
    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} progress={progress} index={i} count={count} />
      ))}
    </div>
  );
}

function Dot({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const segment = 1 / (count - 1);
  const start = Math.max(0, index * segment - 0.05);
  const end = Math.min(1, index * segment + 0.05);
  const width = useTransform(progress, [start, end], [8, 28]);
  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  return (
    <motion.span
      style={{ width, opacity }}
      className="block h-2 rounded-full bg-ink"
      aria-hidden
    />
  );
}

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * ProcessTimeline — Day 1 → 30 → 60 → 90 milestones. Dark surface, orange
 * accent line that fills in lockstep with scroll progress through the
 * section (no one-shot enter trigger). Each step reveals as the user
 * reaches its position on the timeline. Copy via i18n (DE/EN).
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Step = { day: string; title: string; body: string };

export function ProcessTimeline() {
  const t = useT();
  const STEPS: Step[] = t.process.steps.map((s) => ({
    day: s.eta,
    title: s.title,
    body: s.body,
  }));
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the timeline block: starts when the timeline
  // top reaches 78% of the viewport (so animation begins as it scrolls in),
  // ends when its bottom reaches 35% (animation completes well before exit).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 35%"],
  });

  // Spring-smooth the raw progress so the line fill and step reveals don't
  // lock 1:1 to scroll wheel ticks — feels intentional rather than mechanical.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
    restDelta: 0.001,
  });

  // The line fills from 0% → 100% across the full scroll window.
  const lineFill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="process"
      data-surface="dark"
      className="surface-dark relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      <div className="container-v3 relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-white/55">{t.process.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[18ch] mx-auto lg:mx-0 balance text-white"
                style={{
                  fontSize: "clamp(34px, 6vw, 84px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {t.process.headlineMain}
                <span className="text-white/55"> {t.process.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-white/65 leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.process.intro}
            </p>
          </Reveal>
        </div>

        <div ref={timelineRef} className="mt-14 sm:mt-20 relative">
          {/* Desktop horizontal track */}
          <div
            className="hidden md:block absolute top-[34px] left-[5%] right-[5%] h-px bg-white/15 overflow-hidden"
            aria-hidden
          >
            <motion.div
              className="absolute inset-y-0 left-0 h-px"
              style={{
                width: lineFill,
                background:
                  "linear-gradient(90deg, #FFB07A 0%, #FF7A45 100%)",
              }}
            />
          </div>

          {/* Mobile vertical track */}
          <div
            className="md:hidden absolute left-[9px] top-2 bottom-2 w-px bg-white/12 overflow-hidden"
            aria-hidden
          >
            <motion.div
              className="absolute inset-x-0 top-0 w-px"
              style={{
                height: lineFill,
                background:
                  "linear-gradient(180deg, #FFB07A 0%, #FF7A45 100%)",
              }}
            />
          </div>

          <ol className="relative grid gap-8 sm:gap-9 md:gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <ProcessStep
                key={s.day}
                step={s}
                index={i}
                total={STEPS.length}
                progress={progress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Window each step occupies along the scroll progress. Step 0 begins
  // immediately so the first card isn't blank when the section enters; later
  // steps stagger to roughly line up with the line fill reaching their dot.
  const span = 0.7 / total;
  const start = index === 0 ? 0 : (index - 0.4) * span;
  const fadeEnd = start + span * 1.2;
  const dotEnd = start + span * 0.55;

  const opacity = useTransform(progress, [start, fadeEnd], [0, 1]);
  const y = useTransform(progress, [start, fadeEnd], [24, 0]);
  const dotScale = useTransform(progress, [start, dotEnd], [0.6, 1]);
  const dotGlow = useTransform(
    progress,
    [start, dotEnd],
    ["0 0 0 4px rgba(38,39,47,1), 0 0 0 4px rgba(255,122,69,0)",
     "0 0 0 4px rgba(38,39,47,1), 0 0 0 5px rgba(255,122,69,0.4)"],
  );

  return (
    <motion.li
      style={{ opacity, y }}
      transition={{ ease: EASE_OUT }}
      className="relative pl-10 md:pl-0 md:text-center"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-1 block h-[18px] w-[18px] rounded-full md:static md:mx-auto"
        style={{
          background: index === 0 ? "#FFB07A" : "#FF7A45",
          scale: dotScale,
          boxShadow: dotGlow,
        }}
      />

      <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-white/65 md:mt-5">
        {step.day}
      </p>
      <h3
        className="mt-2 text-white"
        style={{
          fontSize: "clamp(20px, 1.8vw, 24px)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: "1.2",
        }}
      >
        {step.title}
      </h3>
      <p className="mt-2.5 text-[14px] sm:text-[14.5px] text-white/70 leading-relaxed max-w-[32ch] md:max-w-[28ch] md:mx-auto">
        {step.body}
      </p>
    </motion.li>
  );
}

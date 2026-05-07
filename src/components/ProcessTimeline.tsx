import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * ProcessTimeline — Day 1 → 30 → 60 → 90 milestone copy. Dark surface,
 * orange accent line that animates across as the section enters viewport.
 * Copy via i18n (DE/EN).
 */

export function ProcessTimeline() {
  const t = useT();
  const STEPS = t.process.steps.map((s) => ({
    day: s.eta,
    title: s.title,
    body: s.body,
  }));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
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

        {/* Timeline */}
        <div ref={ref} className="mt-14 sm:mt-20 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[34px] left-[5%] right-[5%] h-px bg-white/15" aria-hidden>
            <motion.div
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 h-px"
              style={{ background: "linear-gradient(90deg, #FFB07A 0%, #FF7A45 100%)" }}
            />
          </div>
          <div
            className="md:hidden absolute left-[9px] top-2 bottom-2 w-px bg-white/12"
            aria-hidden
          />

          <ol className="relative grid gap-8 sm:gap-9 md:gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.day}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-10 md:pl-0 md:text-center"
              >
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 block h-[18px] w-[18px] rounded-full md:static md:mx-auto"
                  style={{
                    background: i === 0 ? "#FFB07A" : "#FF7A45",
                    boxShadow: "0 0 0 4px rgba(38,39,47,1), 0 0 0 5px rgba(255,122,69,0.4)",
                  }}
                />

                <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-white/65 md:mt-5">
                  {s.day}
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
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14px] sm:text-[14.5px] text-white/70 leading-relaxed max-w-[32ch] md:max-w-[28ch] md:mx-auto">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

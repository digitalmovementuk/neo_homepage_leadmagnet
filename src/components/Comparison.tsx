import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * Comparison — "Andere Agenturen vs. NEO". Two-column side-by-side table
 * that directly addresses agency PTSD: contract length, reporting, point
 * of contact, pricing transparency, goal, lock-in. Copy via i18n (DE/EN).
 *
 * Motion: ambient orange/magenta orbs drift in opposite directions on
 * scroll for depth; rows stagger in line-by-line as the cards enter view.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Comparison() {
  const t = useT();
  const ROWS = t.comparison.rows.map((r) => ({
    label: r.topic,
    them: r.other,
    us: r.neo,
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbAY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const orbBY = useTransform(scrollYProgress, [0, 1], ["6%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      data-surface="light"
      className="surface-light-2 relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      {/* Ambient parallax orbs — soft brand-colour washes drifting on scroll */}
      <motion.div
        aria-hidden
        style={{ y: orbAY }}
        className="pointer-events-none absolute -left-32 top-32 h-[520px] w-[520px] rounded-full opacity-[0.07]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #FF7A45 0%, transparent 65%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbBY }}
        className="pointer-events-none absolute -right-24 bottom-24 h-[460px] w-[460px] rounded-full opacity-[0.06]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #EC178D 0%, transparent 65%)",
          }}
        />
      </motion.div>

      <div className="container-v3 relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.comparison.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[18ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(30px, 6vw, 84px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {t.comparison.headlineMain}
                <span className="text-ink/55"> {t.comparison.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.comparison.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-4 sm:gap-5">
          {/* Andere Agenturen */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="rounded-[28px] sm:rounded-[36px] border border-ink/10 bg-white p-7 sm:p-9 shadow-card"
          >
            <p className="eyebrow text-ink-muted">{t.comparison.columns.other}</p>
            <ul className="mt-6 space-y-4">
              {ROWS.map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18 + 0.06 * i,
                    ease: EASE_OUT,
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/8 text-ink-faint">
                    <X size={11} strokeWidth={3} />
                  </span>
                  <div className="leading-snug">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[14px] sm:text-[15px] text-ink-soft">{r.them}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* NEO */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="relative rounded-[28px] sm:rounded-[36px] border-2 bg-white p-7 sm:p-9 shadow-[0_30px_80px_-30px_rgba(255,122,69,0.35)]"
            style={{ borderColor: "#FF7A45" }}
          >
            <span
              className="absolute -top-3 left-7 sm:left-9 inline-flex items-center gap-1.5 rounded-full text-white text-[10.5px] font-bold uppercase tracking-[0.18em] px-3 py-1.5"
              style={{ background: "#FF7A45" }}
            >
              NEO
            </span>
            <p className="eyebrow text-ink mt-2">{t.comparison.columns.neo}</p>
            <ul className="mt-6 space-y-4">
              {ROWS.map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.24 + 0.06 * i,
                    ease: EASE_OUT,
                  }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "#FF7A45" }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div className="leading-snug">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[14px] sm:text-[15px] font-semibold text-ink">
                      {r.us}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

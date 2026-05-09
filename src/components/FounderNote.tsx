import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * FounderNote — signed personal message from Raoul Müller. Photo on the
 * left (md+), copy on the right. Humanises the data-led page directly
 * before the contact form. Copy via i18n (DE/EN).
 *
 * Motion: portrait drifts vertically inside its frame on scroll for depth;
 * each paragraph in the body reveals individually with a small stagger;
 * decorative offset square peeks from behind the photo (matches About page).
 */
export function FounderNote() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section
      ref={ref}
      id="founder"
      data-surface="light"
      className="surface-light relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative mx-auto lg:mx-0 max-w-[420px] lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-surface-2 shadow-[0_30px_80px_-30px_rgba(38,39,47,0.25)]">
                <motion.img
                  src={`${import.meta.env.BASE_URL}brand/raoul-founder.png`}
                  alt={t.founder.signatureBlock}
                  style={{ y: portraitY }}
                  className="absolute inset-0 h-[112%] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Decorative offset square — adds depth, matches About page */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-2xl bg-[#FF7A45]/20 sm:-bottom-5 sm:-right-5 sm:h-32 sm:w-32"
              />
            </div>
          </Reveal>

          <div className="text-center lg:text-left">
            <Reveal delay={0.05}>
              <p className="eyebrow text-ink-muted">{t.founder.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-5 max-w-[22ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(28px, 4.4vw, 48px)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.028em",
                  fontWeight: 700,
                }}
              >
                {t.founder.headlinePre}{" "}
                <span className="text-ink/55">{t.founder.headlineSoft}</span>
              </h2>
            </Reveal>
            <div className="mt-7 max-w-[560px] mx-auto lg:mx-0 space-y-5 text-[15.5px] sm:text-[16.5px] text-ink-soft leading-relaxed">
              {t.founder.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + 0.06 * i,
                    ease: EASE_OUT,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <Reveal delay={0.36}>
              <div className="mt-8 flex flex-col items-center lg:items-start gap-2">
                <span
                  className="text-[34px] sm:text-[38px] text-ink"
                  style={{
                    fontFamily:
                      '"Snell Roundhand", "Apple Chancery", "Brush Script MT", "Lucida Handwriting", cursive',
                    lineHeight: "1.0",
                    letterSpacing: "0.01em",
                  }}
                  aria-hidden
                >
                  {t.founder.signature}
                </span>
                <p className="text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                  {t.founder.signatureBlock}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

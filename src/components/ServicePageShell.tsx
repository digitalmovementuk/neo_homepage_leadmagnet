import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";
import { useDocumentHead } from "../lib/useDocumentHead";
import { useLeadModal, type LeadModalContent } from "../lib/leadModal";
import type { ServicePage } from "../lib/translations";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SITE_ORIGIN = "https://digitalmovementuk.github.io";
const SITE_BASE = "/Neo_Homepage_Apple";

/**
 * ServicePageShell — comprehensive service product page used by all four
 * service routes. Reads its content from `t.servicePages[slug]` and
 * renders a full-bleed Hero plus eight downstream sections plus shared
 * chrome (Layout component handles Nav/Footer/Sticky/Modal).
 *
 * Sections (top → bottom):
 *   1. Hero — eyebrow + h1 + sub + dual CTA + chips
 *   2. What it is — definition + paragraphs
 *   3. Outcomes — three metric cards
 *   4. Methodology — phased deep-dive
 *   5. Deliverables — three-column checklist
 *   6. Process — 90-day timeline
 *   7. Stack — tools + standards
 *   8. FAQ — accordion
 *   9. Lead-magnet — service-specific freebie modal trigger
 *  10. Final CTA — full-width consultation banner → /#contact
 */
export function ServicePageShell({ slug }: { slug: keyof ServicePage }) {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  const page = t.servicePages[slug];
  const { openWith } = useLeadModal();

  const path = `/services/${page.slug}`;
  const canonical = `${SITE_ORIGIN}${SITE_BASE}${path}`;

  useDocumentHead({
    title: page.meta.title,
    description: page.meta.description,
    canonical,
    lang,
    ogImage: `${SITE_ORIGIN}${SITE_BASE}/brand/og-cover.jpg`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.hero.headlineTop + " " + page.hero.headlineBottom,
      provider: {
        "@type": "Organization",
        name: "NEO THE AGENCY",
        url: `${SITE_ORIGIN}${SITE_BASE}/`,
      },
      areaServed: { "@type": "Country", name: "Germany" },
      description: page.meta.description,
      serviceType: page.hero.headlineTop,
      audience: {
        "@type": "BusinessAudience",
        audienceType: isEN
          ? "Founder-led businesses and SMEs"
          : "Inhabergeführte Unternehmen und Mittelstand",
      },
    },
  });

  const openLeadMagnet = () => openWith(page.leadMagnet.modal);

  return (
    <>
      <Hero page={page} onLeadMagnet={openLeadMagnet} />
      <WhatItIs page={page} />
      <Outcomes page={page} />
      <Methodology page={page} />
      <Deliverables page={page} />
      <ProcessTimelineService page={page} />
      <Stack page={page} />
      <FAQ page={page} />
      <LeadMagnet page={page} onOpen={openLeadMagnet} />
      <FinalCTA page={page} isEN={isEN} />
    </>
  );
}

/* ────────────────────────────  1 · Hero  ────────────────────────────── */

function Hero({
  page,
  onLeadMagnet,
}: {
  page: ServicePage[keyof ServicePage];
  onLeadMagnet: () => void;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const base = import.meta.env.BASE_URL;

  // iOS-hardened autoplay (same pattern as homepage Hero).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onFirstGesture = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
    };
    document.addEventListener("touchstart", onFirstGesture, {
      once: true,
      passive: true,
    });
    document.addEventListener("pointerdown", onFirstGesture, {
      once: true,
      passive: true,
    });
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => {
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("pointerdown", onFirstGesture);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      data-surface="dark"
      className="surface-dark relative isolate overflow-hidden w-screen min-h-[100svh] h-[100svh]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {!reduce && page.hero.video && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={`${base}brand/og-cover.jpg`}
            // @ts-expect-error fetchpriority is missing from React types
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover scale-105"
            src={`${base}${page.hero.video}#t=0.1`}
            {...({
              "webkit-playsinline": "true",
              "x5-playsinline": "true",
            } as Record<string, string>)}
          />
        )}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,32,0.55) 0%, rgba(15,8,32,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,32,0) 0%, rgba(15,8,32,0.55) 65%, rgba(15,8,32,0.92) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-v3 pb-6 sm:pb-10 md:pb-20 lg:pb-24">
          <div className="flex flex-col items-center text-center gap-5 md:flex-row md:items-end md:justify-between md:text-left md:gap-10">
            <div className="flex flex-col items-center md:items-start w-full md:w-auto">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[10.5px] sm:text-[12px] font-bold uppercase text-white tracking-[0.32em]"
              >
                {page.hero.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
                className="mt-3 sm:mt-5 md:mt-6 text-white uppercase italic"
                style={{
                  fontSize: "clamp(40px, 7.5vw, 112px)",
                  lineHeight: "0.86",
                  letterSpacing: "-0.05em",
                  fontWeight: 700,
                }}
              >
                <span className="block">{page.hero.headlineTop}</span>
                <span className="block font-medium text-white/95">
                  {page.hero.headlineBottom}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 sm:mt-6 md:mt-7 max-w-[36ch] md:max-w-[52ch] text-[13.5px] sm:text-[15px] lg:text-[16px] text-white/65 leading-relaxed"
              >
                {page.hero.sub}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="hidden md:flex mt-7 flex-wrap justify-center md:justify-start gap-2"
              >
                {page.hero.chips.map((s) => (
                  <li
                    key={s}
                    className="border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80"
                  >
                    {s}
                  </li>
                ))}
              </motion.ul>

              {/* Mobile dual-CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="md:hidden mt-6 flex flex-col items-center gap-3"
              >
                <button
                  type="button"
                  onClick={onLeadMagnet}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[14px] px-6 py-2.5 transition-colors"
                >
                  {page.hero.primaryCta} <ArrowRight size={14} />
                </button>
                <a
                  href="/#contact"
                  className="text-[13px] text-white/75 hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {page.hero.secondaryCta}
                </a>
              </motion.div>
            </div>

            {/* Desktop right column — dual CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden md:flex flex-col md:items-end gap-3 shrink-0"
            >
              <button
                type="button"
                onClick={onLeadMagnet}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[14px] px-5 py-2 transition-colors"
              >
                {page.hero.primaryCta} <ArrowRight size={13} />
              </button>
              <a
                href="/#contact"
                className="text-white/65 hover:text-white text-[13px] sm:text-[14px] font-medium leading-tight whitespace-nowrap md:text-right transition-colors"
              >
                {page.hero.secondaryCta}{" "}
                <span className="text-white/35">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  2 · What it is  ──────────────────────── */

function WhatItIs({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="light"
      className="surface-light relative pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">
                {page.whatItIs.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[18ch] balance text-ink"
                style={{
                  fontSize: "clamp(34px, 5.6vw, 72px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {page.whatItIs.headlineMain}
                <span className="text-ink/55"> {page.whatItIs.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <div className="space-y-5 sm:space-y-6 text-[15.5px] sm:text-[17px] md:text-[17.5px] text-ink-soft leading-relaxed">
            {page.whatItIs.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + 0.06 * i,
                  ease: EASE_OUT,
                }}
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: 0.12 + 0.06 * page.whatItIs.paragraphs.length,
                ease: EASE_OUT,
              }}
              className="text-ink font-semibold"
            >
              {page.whatItIs.audience}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  3 · Outcomes  ────────────────────────── */

function Outcomes({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{page.outcomes.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[20ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(32px, 5.4vw, 64px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {page.outcomes.headlineMain}
                <span className="text-ink/55">
                  {" "}
                  {page.outcomes.headlineSub}
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {page.outcomes.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {page.outcomes.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: EASE_OUT,
              }}
              className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-ink/8 overflow-hidden p-7 sm:p-9 md:p-10"
            >
              <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                <span>0{i + 1}</span>
                <span className="h-px w-6 bg-ink/15" />
                <span>{item.kicker}</span>
              </div>
              <p
                className="mt-5 text-ink"
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  lineHeight: "0.9",
                  letterSpacing: "-0.045em",
                  fontWeight: 700,
                }}
              >
                {item.value}
                <span className="text-ink/55"> {item.unit}</span>
              </p>
              <h3
                className="mt-3 text-ink"
                style={{
                  fontSize: "clamp(20px, 1.8vw, 24px)",
                  lineHeight: "1.18",
                  letterSpacing: "-0.022em",
                  fontWeight: 600,
                }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ────────────────────────────  4 · Methodology  ─────────────────────── */

function Methodology({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="max-w-[680px]">
          <Reveal>
            <p className="eyebrow text-ink-muted">
              {page.methodology.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-5 balance text-ink"
              style={{
                fontSize: "clamp(32px, 5.4vw, 64px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
            >
              {page.methodology.headlineMain}
              <span className="text-ink/55">
                {" "}
                {page.methodology.headlineSub}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] sm:text-[17px] text-ink-soft leading-relaxed">
              {page.methodology.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 sm:mt-16 space-y-12 sm:space-y-16">
          {page.methodology.phases.map((phase, i) => (
            <motion.li
              key={phase.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: 0.05 * i,
                ease: EASE_OUT,
              }}
              className="grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-12 items-start border-t border-ink/10 pt-8 sm:pt-10"
            >
              <div>
                <span
                  className="block text-ink/35 italic leading-none"
                  style={{
                    fontSize: "clamp(48px, 5.2vw, 72px)",
                    letterSpacing: "-0.04em",
                    fontWeight: 500,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                  {phase.kicker}
                </p>
              </div>
              <div className="max-w-[640px]">
                <h3
                  className="text-ink"
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 32px)",
                    lineHeight: "1.12",
                    letterSpacing: "-0.026em",
                    fontWeight: 700,
                  }}
                >
                  {phase.title}
                </h3>
                <p className="mt-3 text-[15.5px] sm:text-[16.5px] text-ink-soft leading-relaxed">
                  {phase.body}
                </p>
                {phase.bullets && phase.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {phase.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-ink-soft"
                      >
                        <span
                          className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                          style={{ background: "#FF7A45" }}
                          aria-hidden
                        >
                          <Check size={9} strokeWidth={3.5} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ────────────────────────────  5 · Deliverables  ────────────────────── */

function Deliverables({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="dark"
      className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 text-white"
      style={{ background: "#0a0a0c" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-white/55">
                {page.deliverables.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[20ch] mx-auto lg:mx-0 balance text-white"
                style={{
                  fontSize: "clamp(32px, 5.4vw, 64px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {page.deliverables.headlineMain}
                <span className="text-white/55">
                  {" "}
                  {page.deliverables.headlineSub}
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-white/65 leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {page.deliverables.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {page.deliverables.columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: EASE_OUT,
              }}
              className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
            >
              <p className="text-[10.5px] font-bold uppercase tracking-[0.20em] text-white/55">
                0{i + 1}
              </p>
              <h3
                className="mt-3 text-white"
                style={{
                  fontSize: "clamp(20px, 1.8vw, 24px)",
                  lineHeight: "1.16",
                  letterSpacing: "-0.022em",
                  fontWeight: 700,
                }}
              >
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] sm:text-[14.5px] text-white/80 leading-relaxed"
                  >
                    <span
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "#FF7A45" }}
                      aria-hidden
                    >
                      <Check size={9} strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  6 · Process  ─────────────────────────── */

function ProcessTimelineService({
  page,
}: {
  page: ServicePage[keyof ServicePage];
}) {
  return (
    <section
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">
                {page.process.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[18ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(32px, 5.4vw, 64px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {page.process.headlineMain}
                <span className="text-ink/55">
                  {" "}
                  {page.process.headlineSub}
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {page.process.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-4">
          {page.process.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: EASE_OUT,
              }}
              className="relative bg-white rounded-[24px] sm:rounded-[28px] border border-ink/8 p-6 sm:p-7"
            >
              <span
                aria-hidden
                className="block h-[14px] w-[14px] rounded-full"
                style={{
                  background: i === 0 ? "#FFB07A" : "#FF7A45",
                  boxShadow:
                    "0 0 0 4px rgba(255,255,255,1), 0 0 0 5px rgba(255,122,69,0.4)",
                }}
              />
              <p className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                {step.eta}
              </p>
              <h3
                className="mt-2 text-ink"
                style={{
                  fontSize: "clamp(18px, 1.6vw, 20px)",
                  fontWeight: 700,
                  letterSpacing: "-0.022em",
                  lineHeight: "1.2",
                }}
              >
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-ink-soft leading-relaxed">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ────────────────────────────  7 · Stack  ───────────────────────────── */

function Stack({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="max-w-[680px]">
          <Reveal>
            <p className="eyebrow text-ink-muted">{page.stack.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-5 balance text-ink"
              style={{
                fontSize: "clamp(32px, 5.4vw, 64px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
            >
              {page.stack.headlineMain}
              <span className="text-ink/55"> {page.stack.headlineSub}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] sm:text-[17px] text-ink-soft leading-relaxed">
              {page.stack.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.stack.items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.04 * i,
                ease: EASE_OUT,
              }}
              className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                  style={{ background: "#FF7A45" }}
                  aria-hidden
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-bold text-ink leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-ink-soft leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ────────────────────────────  8 · FAQ  ─────────────────────────────── */

function FAQ({ page }: { page: ServicePage[keyof ServicePage] }) {
  return (
    <section
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{page.faq.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[14ch] balance text-ink"
                style={{
                  fontSize: "clamp(32px, 5.4vw, 64px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {page.faq.headlineMain}
                <span className="text-ink/55"> {page.faq.headlineSub}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15.5px] text-ink-soft leading-relaxed max-w-[400px]">
                {page.faq.intro}
              </p>
            </Reveal>
          </div>

          <ul className="space-y-2 sm:space-y-3">
            {page.faq.items.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: EASE_OUT }}
      className="rounded-2xl border border-ink/10 bg-white overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left text-ink hover:bg-ink/[0.02] transition-colors"
      >
        <span
          className="text-[15.5px] sm:text-[17px] font-semibold leading-snug"
          style={{ letterSpacing: "-0.018em" }}
        >
          {q}
        </span>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-ink"
          aria-hidden
        >
          {open ? (
            <Minus size={14} strokeWidth={2.4} />
          ) : (
            <Plus size={14} strokeWidth={2.4} />
          )}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-5 sm:px-7 pb-6 text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
          {a}
        </p>
      </motion.div>
    </motion.li>
  );
}

/* ────────────────────────────  9 · Lead-magnet  ─────────────────────── */

function LeadMagnet({
  page,
  onOpen,
}: {
  page: ServicePage[keyof ServicePage];
  onOpen: () => void;
}) {
  return (
    <section
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative rounded-[28px] sm:rounded-[40px] border-2 bg-white p-8 sm:p-12 md:p-16 overflow-hidden"
          style={{ borderColor: "#FF7A45" }}
        >
          <span
            aria-hidden
            className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full opacity-[0.10]"
            style={{
              background:
                "radial-gradient(circle at center, #FF7A45 0%, transparent 70%)",
            }}
          />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="eyebrow text-ink-muted">
                {page.leadMagnet.eyebrow}
              </p>
              <h2
                className="mt-5 max-w-[18ch] balance text-ink"
                style={{
                  fontSize: "clamp(28px, 4.8vw, 56px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.030em",
                  fontWeight: 700,
                }}
              >
                {page.leadMagnet.headline}
              </h2>
              <p className="mt-5 max-w-[520px] text-[15.5px] sm:text-[17px] text-ink-soft leading-relaxed">
                {page.leadMagnet.body}
              </p>
              <ul className="mt-6 space-y-2">
                {page.leadMagnet.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-ink-soft"
                  >
                    <span
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "#FF7A45" }}
                      aria-hidden
                    >
                      <Check size={9} strokeWidth={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start lg:items-center gap-4">
              <button
                type="button"
                onClick={onOpen}
                className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-[15px] sm:text-[16px] px-7 py-3.5 transition-colors"
              >
                {page.leadMagnet.cta} <ArrowRight size={16} />
              </button>
              <p className="text-[12px] text-ink-muted leading-relaxed">
                {page.leadMagnet.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────  10 · Final CTA  ──────────────────────── */

function FinalCTA({
  page,
  isEN,
}: {
  page: ServicePage[keyof ServicePage];
  isEN: boolean;
}) {
  return (
    <section
      data-surface="dark"
      className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 text-white overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle at center, #FF7A45 0%, transparent 70%)",
        }}
      />
      <div className="container-v3 relative">
        <Reveal>
          <p className="eyebrow text-white/55">{page.finalCta.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-5 max-w-[20ch] balance text-white"
            style={{
              fontSize: "clamp(38px, 7vw, 96px)",
              lineHeight: "1.0",
              letterSpacing: "-0.04em",
              fontWeight: 700,
            }}
          >
            {page.finalCta.headlineMain}
            <span className="text-white/55"> {page.finalCta.headlineSub}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[560px] text-[16px] sm:text-[18px] text-white/65 leading-relaxed">
            {page.finalCta.body}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-[15px] sm:text-[16px] px-7 py-3.5 transition-colors"
            >
              {page.finalCta.primary} <ArrowRight size={16} />
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] text-white/75 hover:text-white transition-colors"
            >
              {isEN ? "Back to homepage" : "Zur Startseite"}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

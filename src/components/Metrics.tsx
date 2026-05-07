import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "../lib/useCountUp";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";

/**
 * Metrics — editorial proof section.
 *
 * Distinct from Section 1 (horizontal slider with videos) and Section 2
 * (parallax cityscape with editorial cards): a hero featured-stat card
 * spanning full width followed by three supporting cards, each with its
 * own bespoke visual flourish (bar chart, day track, star row, timeline).
 * Same Apple polish — semibold weights, tight letter-spacing, generous
 * whitespace, subtle motion on scroll.
 */
export function Metrics() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  return (
    <section
      id="metrics"
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      {/* Faint ambient orb — anchors the section visually without competing
          with the cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-32 h-[520px] w-[520px] rounded-full opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle at center, #EC178D 0%, transparent 65%)",
        }}
      />

      <div className="container-v3 relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.metrics.eyebrow}</p>
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
                {t.metrics.headlineMain}
                <span className="text-ink/55"> {t.metrics.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.metrics.intro}
            </p>
          </Reveal>
        </div>

        {/* Hero stat */}
        <FeaturedStat isEN={isEN} />

        {/* Three supporting stats */}
        <div className="mt-5 sm:mt-6 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-3">
          <DaysStat isEN={isEN} />
          <ReviewsStat isEN={isEN} />
          <HeritageStat isEN={isEN} />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Featured: 8× more monthly leads                                */
/* ────────────────────────────────────────────────────────────── */

function FeaturedStat({ isEN }: { isEN: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.35, once: true });
  const { ref: numRef, value } = useCountUp(8);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 sm:mt-12 md:mt-14 relative bg-white rounded-[24px] sm:rounded-[32px] border border-ink/8 overflow-hidden p-5 sm:p-8 md:p-10 lg:p-12"
    >
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 md:gap-10 items-center text-center">
        {/* Left — big stat */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
            <span>01</span>
            <span className="h-px w-6 bg-ink/15" />
            <span>{isEN ? "Headline result" : "Vorzeige-Ergebnis"}</span>
          </div>

          <span
            ref={numRef as never}
            className="mt-3 block text-ink"
            style={{
              fontSize: "clamp(64px, 10vw, 140px)",
              lineHeight: "0.88",
              letterSpacing: "-0.05em",
              fontWeight: 700,
            }}
          >
            {inView ? value : 0}
            <span className="text-ink/55">×</span>
          </span>

          <p className="mt-3 text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.18em] text-ink">
            {isEN
              ? "more enquiries per month"
              : "mehr Anfragen pro Monat"}
          </p>
          <p className="mt-3 max-w-[440px] text-[14px] sm:text-[15px] text-ink-soft leading-relaxed">
            {isEN
              ? "Average uplift across live SEO and Ads clients in the first six months. We show you the maths behind it every month."
              : "Durchschnittliche Steigerung über aktive SEO- und Ads-Kunden in den ersten sechs Monaten. Wir zeigen Ihnen jeden Monat die Mathematik dahinter."}
          </p>
        </div>

        {/* Right — comparison bar visual */}
        <BarChartVisual inView={inView} isEN={isEN} />
      </div>
    </motion.div>
  );
}

function BarChartVisual({ inView, isEN }: { inView: boolean; isEN: boolean }) {
  const bars = [
    {
      label: isEN ? "Industry average" : "Branchenschnitt",
      value: 1,
      mute: true,
    },
    { label: isEN ? "Our clients" : "Unsere Kunden", value: 8 },
  ];
  const maxValue = 8;
  return (
    <div className="relative w-full max-w-[460px] justify-self-center md:justify-self-end">
      <div className="flex items-end gap-6 sm:gap-10 h-[160px] sm:h-[220px] md:h-[260px]">
        {bars.map((b) => {
          const heightPct = (b.value / maxValue) * 100;
          return (
            <div key={b.label} className="flex-1 flex h-full flex-col items-center gap-3">
              <div className="relative w-full flex flex-1 items-end">
                <motion.div
                  initial={{ height: "0%" }}
                  animate={inView ? { height: `${heightPct}%` } : { height: "0%" }}
                  transition={{
                    duration: 1.2,
                    delay: b.mute ? 0.1 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`w-full rounded-t-[12px] ${
                    b.mute ? "bg-ink/[0.18]" : ""
                  }`}
                  style={
                    b.mute
                      ? { minHeight: "16px" }
                      : {
                          background:
                            "linear-gradient(180deg, #EC178D 0%, #9A2FC6 100%)",
                          minHeight: "16px",
                        }
                  }
                />
              </div>
              <p
                className={`text-[10.5px] font-bold uppercase tracking-[0.16em] ${
                  b.mute ? "text-ink-faint" : "text-ink"
                }`}
              >
                {b.label}
              </p>
              <p
                className={`text-[18px] sm:text-[20px] font-bold ${
                  b.mute ? "text-ink-muted" : "text-ink"
                } -mt-1`}
                style={{ letterSpacing: "-0.025em" }}
              >
                {b.value}×
              </p>
            </div>
          );
        })}
      </div>
      {/* Baseline */}
      <div className="mt-2 h-px bg-ink/12" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Supporting: 60 days to Google page 1                           */
/* ────────────────────────────────────────────────────────────── */

function DaysStat({ isEN }: { isEN: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const { ref: numRef, value } = useCountUp(90);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-ink/8 overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[300px] text-center"
    >
      <div className="inline-flex self-center items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
        <span>02</span>
        <span className="h-px w-6 bg-ink/15" />
        <span>{isEN ? "To Google page one" : "Bis Google Seite 1"}</span>
      </div>

      <div className="my-6">
        <span
          ref={numRef as never}
          className="block text-ink"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: "0.9",
            letterSpacing: "-0.045em",
            fontWeight: 700,
          }}
        >
          {inView ? value : 0}
          <span className="text-ink/55"> {isEN ? "days" : "Tage"}</span>
        </span>
      </div>

      {/* 90-day progress bar */}
      <div className="mb-6">
        <div className="relative h-1.5 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #F15F2B 0%, #FF7A45 100%)",
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-faint">
          <span>{isEN ? "Day 1" : "Tag 1"}</span>
          <span>{isEN ? "Day 90" : "Tag 90"}</span>
        </div>
      </div>

      <p className="text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
        {isEN
          ? "From kick-off to the first commercial keyword on page one. The number is the median — some clients are faster."
          : "Vom Kick-off bis zum ersten kommerziellen Keyword auf der ersten Seite. Der Wert ist der Median — manche Kunden sind schneller."}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Supporting: 4 Kundenprojekte abgeschlossen in Q1 2026          */
/* ────────────────────────────────────────────────────────────── */

function ReviewsStat({ isEN }: { isEN: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const { ref: numRef, value } = useCountUp(4);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-ink/8 overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[300px] text-center"
    >
      <div className="inline-flex self-center items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
        <span>03</span>
        <span className="h-px w-6 bg-ink/15" />
        <span>
          {isEN ? "Client projects shipped" : "Kundenprojekte abgeschlossen"}
        </span>
      </div>

      <div className="my-6">
        <span
          ref={numRef as never}
          className="block text-ink"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: "0.9",
            letterSpacing: "-0.045em",
            fontWeight: 700,
          }}
        >
          {inView ? value : 0}
          <span className="text-ink/55"> in Q1</span>
        </span>
      </div>

      <p className="text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
        {isEN
          ? "Four real projects in Q1 2026 — from Azura Living Bali to Cunos. Every brand is now on page one for its core keywords."
          : "Vier reale Projekte in Q1 2026 — von Azura Living Bali bis Cunos. Jede Marke ist heute auf Seite 1 für ihre Kern-Keywords."}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Supporting: Since 2026                                         */
/* ────────────────────────────────────────────────────────────── */

function HeritageStat({ isEN }: { isEN: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTick(i);
      if (i >= 4) window.clearInterval(id);
    }, 320);
    return () => window.clearInterval(id);
  }, [inView]);

  // NEO is a young studio (founded 2026) — quarterly markers, not years.
  const today = isEN ? "Today" : "Heute";
  const quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", today];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-ink/8 overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[300px] text-center"
    >
      <div className="inline-flex self-center items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
        <span>04</span>
        <span className="h-px w-6 bg-ink/15" />
        <span>{isEN ? "Founder-led · plain talk" : "Inhabergeführt · Klartext"}</span>
      </div>

      <div className="my-6">
        <span
          className="block text-ink"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            lineHeight: "0.9",
            letterSpacing: "-0.045em",
            fontWeight: 700,
          }}
        >
          {isEN ? "Since" : "Seit"}{" "}
          <span className="text-ink/55">2026</span>
        </span>
      </div>

      {/* Quartals-Timeline */}
      <div className="mb-6">
        <div className="relative h-px bg-ink/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 h-px"
            style={{
              background: "linear-gradient(90deg, #FFB07A 0%, #FF7A45 100%)",
            }}
          />
          <div className="absolute inset-x-0 -top-1 flex justify-between">
            {quarters.map((q, i) => {
              const lit = tick > i;
              return (
                <span
                  key={q}
                  className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                    lit ? "bg-ink" : "bg-ink/15"
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-3 flex justify-between text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-faint tabular-nums">
          <span>Q1</span>
          <span className="hidden sm:inline">Q2</span>
          <span className="hidden sm:inline">Q3</span>
          <span className="hidden sm:inline">Q4</span>
          <span>{today}</span>
        </div>
      </div>

      <p className="text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">
        {isEN
          ? "Young studio, clear stance. The team you meet at the first call ships the work — no account-manager ping-pong."
          : "Junges Studio, klare Ansage. Das Team, das Sie im Erstgespräch treffen, liefert auch die Arbeit ab — kein Account-Manager-Pingpong."}
      </p>
    </motion.div>
  );
}

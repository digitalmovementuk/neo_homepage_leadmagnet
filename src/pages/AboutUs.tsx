import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Compass, Heart, MapPin, Sparkles, Target } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";
import { useDocumentHead } from "../lib/useDocumentHead";
import { routeHead } from "../content/route-meta";
import { useSeoModal } from "../lib/seoModal";

const STUDIO_IMAGE =
  "/media/stock/photo-1497366811353-6870744d04b2-2400.jpg";
const HERO_IMAGE =
  "/media/stock/photo-1604328698692-f76ea9498e76-2400.jpg";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * AboutUs — full About page.
 *
 * Layout arc: hero → three pillars (vision / mission / values) → method
 * (90-day sprint) → services → audience + why NEO → location → final CTA.
 * Company only: no people or team section.
 *
 * Visual language stays in lock-step with the homepage: light-surface
 * editorial, ink type, large balanced headlines with a 55%-tone soft tail,
 * and the orange (#FF7A45) accent reserved for proofs and calls-to-action.
 */
export function AboutUs() {
  const { openSeo } = useSeoModal();

  // Kopfdaten zentral in content/route-meta.ts.
  useDocumentHead(routeHead("/uber-uns/"));

  return (
    <>
      <AboutHero />
      <Pillars />
      <Method />
      <Services />
      <AudienceAndWhy />
      <Studio />
      <AboutCTA onOpenSeo={openSeo} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Hero — full-bleed loft + intro                                  */
/* ────────────────────────────────────────────────────────────── */

function AboutHero() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Layered parallax — background, mid (overlay accent), and foreground text
  // each drift at a different rate to give the hero genuine depth.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const accentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.82]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-dark relative isolate min-h-[78svh] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10 h-[120%]"
      >
        <img
          src={HERO_IMAGE}
          alt={t.about.hero.imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-[#0a0612]"
      />

      {/* Mid-layer accent orb — drifts at a different rate than the image */}
      <motion.div
        aria-hidden
        style={{ y: accentY }}
        className="pointer-events-none absolute -right-32 top-[20%] -z-10 h-[520px] w-[520px] rounded-full opacity-[0.30]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #FF7A45 0%, transparent 65%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,18,0) 0%, rgba(10,6,18,0.55) 55%, rgba(10,6,18,0.95) 100%)",
        }}
      />

      <motion.div
        style={{ y: textY }}
        className="relative mx-auto flex min-h-[78svh] w-full max-w-[var(--container-max)] flex-col justify-end px-[var(--gutter)] pb-20 pt-[max(140px,18vh)] sm:pb-24 md:pb-20"
      >
        <Reveal>
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/80 sm:text-[12px]">
            <span className="h-px w-7 bg-white/45" aria-hidden />
            {t.about.hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            className="mt-5 max-w-[20ch] balance text-white"
            style={{
              fontSize: "clamp(40px, 6.6vw, 92px)",
              lineHeight: "1.0",
              letterSpacing: "-0.038em",
              fontWeight: 700,
            }}
          >
            {t.about.hero.headlinePre}{" "}
            <span className="text-white/55">{t.about.hero.headlineSoft}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-7 max-w-[58ch] text-[15.5px] leading-relaxed text-white/72 sm:text-[17px] md:text-[18px]">
            {t.about.hero.sub}
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-7 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
            <MapPin size={14} strokeWidth={2} className="text-[#FF7A45]" />
            {t.about.hero.locations}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Pillars — vision / mission / values                             */
/* ────────────────────────────────────────────────────────────── */

const PILLAR_ICONS = [Compass, Target, Heart] as const;

/**
 * Pillars — vertical scroll-flow. Cards stack normally (no pinning). As each
 * card crosses the viewport centre, its background interpolates from white
 * to dark gradient and the type colours invert in lockstep — so only the
 * card the reader is on is in dark "focus" state, the others sit pale.
 */
function Pillars() {
  const t = useT();

  return (
    <section
      data-surface="light"
      className="surface-light-2 relative overflow-hidden pb-20 pt-20 sm:pt-24 md:pb-28 md:pt-28"
    >
      <div className="container-v3 relative">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="inline-flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-ink-muted">
              <span className="h-px w-8 bg-ink/20" aria-hidden />
              {t.about.pillarsIntro.eyebrow}
              <span className="h-px w-8 bg-ink/20" aria-hidden />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-5 balance text-ink"
              style={{
                fontSize: "clamp(30px, 4.4vw, 56px)",
                lineHeight: "1.04",
                letterSpacing: "-0.032em",
                fontWeight: 700,
              }}
            >
              {t.about.pillarsIntro.headlinePre}{" "}
              <span className="text-ink/55">
                {t.about.pillarsIntro.headlineSoft}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 mx-auto max-w-[58ch] text-[15px] leading-relaxed text-ink-soft sm:text-[16.5px]">
              {t.about.pillarsIntro.body}
            </p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-14 flex max-w-[860px] flex-col gap-8 sm:gap-10 md:mt-16">
          {t.about.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? Compass;
            return (
              <PillarScrollCard
                key={p.label}
                pillar={p}
                icon={Icon}
                index={i}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PillarScrollCard({
  pillar,
  icon: Icon,
  index,
}: {
  pillar: { label: string; headline: string; body: string };
  icon: typeof Compass;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // Track the card's progress through the viewport: 0 when its top hits the
  // viewport bottom, 1 when its bottom hits the viewport top. We peak focus
  // at 0.5 (card centred) and ease off at the edges.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.55,
    restDelta: 0.001,
  });

  // Focus rises from 0 → 1 as the card enters the centre band, holds, then
  // falls back to 0 as it exits.
  const focus = useTransform(smooth, [0.18, 0.42, 0.58, 0.82], [0, 1, 1, 0]);

  // Background overlay opacity (0 = white card, 1 = dark gradient card)
  const darkOpacity = focus;
  const accentRadialOpacity = useTransform(focus, [0, 1], [0, 0.28]);

  // Type + chrome colour interpolations
  const headlineColor = useTransform(focus, [0, 1], ["#26272F", "#FFFFFF"]);
  const bodyColor = useTransform(
    focus,
    [0, 1],
    ["#4A4D59", "rgba(255,255,255,0.78)"],
  );
  const counterColor = useTransform(
    focus,
    [0, 1],
    ["#66636D", "rgba(255,255,255,0.62)"],
  );
  const iconBg = useTransform(
    focus,
    [0, 1],
    ["rgba(255,122,69,0.12)", "rgba(255,255,255,0.12)"],
  );
  const iconColor = useTransform(focus, [0, 1], ["#FF7A45", "#FFFFFF"]);
  const numeralColor = useTransform(
    focus,
    [0, 1],
    ["rgba(38,39,47,0.05)", "rgba(255,255,255,0.06)"],
  );
  const dividerBg = useTransform(
    focus,
    [0, 1],
    [
      "linear-gradient(90deg, rgba(38,39,47,0.15) 0%, rgba(38,39,47,0.05) 60%, transparent 100%)",
      "linear-gradient(90deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)",
    ],
  );
  const cardShadow = useTransform(
    focus,
    [0, 1],
    [
      "0 18px 48px -30px rgba(38,39,47,0.18)",
      "0 30px 80px -28px rgba(0,0,0,0.55)",
    ],
  );
  const borderColor = useTransform(
    focus,
    [0, 1],
    ["rgba(38,39,47,0.08)", "rgba(255,255,255,0.10)"],
  );

  return (
    <motion.li
      ref={ref}
      style={{ boxShadow: cardShadow, borderColor }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_OUT }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative isolate flex flex-col overflow-hidden rounded-[28px] border bg-white p-8 sm:p-10 md:p-12"
    >
      {/* Dark gradient overlay — fades in as the card centres in viewport */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: darkOpacity,
          background:
            "linear-gradient(135deg, #0a0612 0%, #160a26 50%, #1f0f31 100%)",
        }}
      />
      {/* Subtle radial accent on the focused card */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
        style={{
          opacity: accentRadialOpacity,
          background:
            "radial-gradient(circle at center, #FF7A45 0%, transparent 65%)",
        }}
      />

      {/* Always-on top accent line, brand orange */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-[#FF7A45] via-[#FF8E5C] to-[#FFB07A]"
      />

      {/* Big italic numeral watermark — colour interpolates with focus */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none sm:-right-1 sm:-top-2"
        style={{
          color: numeralColor,
          fontSize: "clamp(120px, 16vw, 200px)",
          fontWeight: 600,
          fontStyle: "italic",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
        }}
      >
        0{index + 1}
      </motion.span>

      <div className="relative flex items-center justify-between">
        <motion.div
          className="grid h-12 w-12 place-items-center rounded-2xl"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon size={20} strokeWidth={1.85} />
        </motion.div>
        <motion.span
          className="text-[10.5px] font-bold uppercase tracking-[0.24em]"
          style={{ color: counterColor }}
        >
          0{index + 1} / 03
        </motion.span>
      </div>

      <p className="relative mt-7 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF7A45]">
        {pillar.label}
      </p>

      <motion.h3
        className="relative mt-3 balance"
        style={{
          color: headlineColor,
          fontSize: "clamp(26px, 3vw, 38px)",
          lineHeight: "1.1",
          letterSpacing: "-0.026em",
          fontWeight: 700,
        }}
      >
        {pillar.headline}
      </motion.h3>

      <motion.p
        className="relative mt-5 text-[15px] leading-relaxed sm:text-[16px]"
        style={{ color: bodyColor }}
      >
        {pillar.body}
      </motion.p>

      <motion.span
        aria-hidden
        className="relative mt-7 block h-px w-full"
        style={{ background: dividerBg }}
      />
    </motion.li>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Arbeitsweise, Leistungen, Für wen, Warum NEO                    */
/* ────────────────────────────────────────────────────────────── */

function SectionHead({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <>
      <Reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-ink-muted sm:text-[12px]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className="mt-5 balance text-ink"
          style={{
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
            fontWeight: 700,
          }}
        >
          {children}
        </h2>
      </Reveal>
    </>
  );
}

function Method() {
  const t = useT();
  const m = t.about.method;
  return (
    <section
      data-surface="light"
      className="surface-light relative overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="container-v3 relative">
        <div className="max-w-[760px]">
          <SectionHead eyebrow={m.eyebrow}>
            {m.headlinePre}{" "}
            <span className="text-ink/55">{m.headlineSoft}</span>
          </SectionHead>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft sm:text-[16.5px]">
              {m.intro}
            </p>
          </Reveal>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {m.steps.map((step, i) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE_OUT }}
              className="rounded-2xl border border-ink/10 bg-white/70 p-6"
            >
              <h3 className="text-[15px] font-bold text-ink sm:text-[16px]">
                {step.label}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <p className="mt-8 text-[15px] font-semibold text-ink sm:text-[16px]">
            {m.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const t = useT();
  const sv = t.about.services;
  return (
    <section
      data-surface="light"
      className="surface-light-2 relative overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="container-v3 relative">
        <div className="max-w-[760px]">
          <SectionHead eyebrow={sv.eyebrow}>{sv.headline}</SectionHead>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sv.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT }}
            >
              <Link
                to={item.href}
                className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-[#FF7A45]/60"
              >
                <h3 className="flex items-center justify-between gap-3 text-[16px] font-bold text-ink sm:text-[17px]">
                  {item.title}
                  <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    aria-hidden
                    className="shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:text-[#FF7A45]"
                  />
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">
                  {item.body}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AudienceAndWhy() {
  const t = useT();
  const blocks = [t.about.audience, t.about.why];
  return (
    <section
      data-surface="light"
      className="surface-light relative overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="container-v3 relative grid gap-14 md:grid-cols-2 md:gap-16">
        {blocks.map((b) => (
          <div key={b.headline} className="max-w-[560px]">
            <SectionHead eyebrow={b.eyebrow}>{b.headline}</SectionHead>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-[16.5px]">
                {b.body}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Studio — full-width loft photo with overlaid copy                */
/* ────────────────────────────────────────────────────────────── */

function Studio() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Stronger parallax on the loft image with a slight scale shift for depth.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);
  // Light secondary parallax on the dark gradient panel — keeps the text
  // anchor moving slightly slower than the photo behind it.
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-dark relative isolate overflow-hidden"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10 h-[120%]"
      >
        <img
          src={STUDIO_IMAGE}
          alt={t.about.studio.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#0a0612]/55" />
      {/* Vertical gradient on mobile (bottom-fade), horizontal on desktop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,18,0.55) 0%, rgba(10,6,18,0.78) 60%, rgba(10,6,18,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-full max-w-[820px] md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,6,18,0.92) 0%, rgba(10,6,18,0.65) 55%, rgba(10,6,18,0) 100%)",
        }}
      />

      <div className="container-v3 relative grid min-h-[68svh] items-center py-20 sm:py-24 md:min-h-[72svh] md:py-28">
        <motion.div style={{ y: panelY }} className="max-w-[640px] text-white">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60 sm:text-[12px]">
              {t.about.studio.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-5 balance text-white"
              style={{
                fontSize: "clamp(30px, 5vw, 64px)",
                lineHeight: "1.04",
                letterSpacing: "-0.032em",
                fontWeight: 700,
              }}
            >
              {t.about.studio.headlinePre}{" "}
              <span className="text-white/55">{t.about.studio.headlineSoft}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-white/72 sm:text-[16.5px]">
              {t.about.studio.body}
            </p>
          </Reveal>
          <ul className="mt-7 space-y-2.5">
            {t.about.studio.bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: 0.22 + 0.07 * i,
                  ease: EASE_OUT,
                }}
                className="flex items-start gap-3 text-[14px] text-white/82 sm:text-[14.5px]"
              >
                <span
                  aria-hidden
                  className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7A45]"
                />
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Final CTA                                                        */
/* ────────────────────────────────────────────────────────────── */

function AboutCTA({ onOpenSeo }: { onOpenSeo: () => void }) {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Orbs drift in opposite directions to amplify depth as the section is read.
  const orbAY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const orbAX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const orbBY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const orbBX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-dark relative overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-28"
    >
      <motion.div
        aria-hidden
        style={{ x: orbAX, y: orbAY }}
        className="pointer-events-none absolute -top-24 right-[-15%] h-[420px] w-[420px] rounded-full opacity-[0.30] sm:h-[520px] sm:w-[520px]"
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
        style={{ x: orbBX, y: orbBY }}
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[380px] w-[380px] rounded-full opacity-[0.16] sm:h-[460px] sm:w-[460px]"
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
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 sm:text-[12px]">
              {t.about.cta.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-5 balance text-white"
              style={{
                fontSize: "clamp(30px, 5.6vw, 76px)",
                lineHeight: "1.02",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
            >
              {t.about.cta.headlinePre}{" "}
              <span className="text-white/55">{t.about.cta.headlineSoft}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 mx-auto max-w-[54ch] text-[15.5px] leading-relaxed text-white/72 sm:text-[17px] md:text-[17.5px]">
              {t.about.cta.body}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onOpenSeo}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_18px_44px_rgba(255,122,69,0.34)] transition-colors hover:bg-[#F15F2B] sm:text-[14.5px]"
              >
                <Sparkles size={15} strokeWidth={2.4} />
                {t.about.cta.button}
              </button>
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:text-[14.5px]"
              >
                {t.about.cta.secondary} <ArrowRight size={14} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-6 text-[12.5px] text-white/50 sm:text-[13px]">
              {t.about.cta.smallprint}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

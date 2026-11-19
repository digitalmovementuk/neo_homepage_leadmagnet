/**
 * SEO-Seite · Abschnitte 1 bis 8 · v2.0 (19.11.2026) · v2.0: Aufbau, Flächen, Karten und Schriftgrößen wie auf der Live-Seite /services/seo; Brotkrumen sitzen oben im Audit-Abschnitt · v1.1: Einblenden über SeoReveal (max. 0,6 s, QA F6); Hero-Hauptbutton am Handy (unter 768 px) orange wie auf der Startseite · v2.1: Hero-Hauptbutton auch am Handy blau wie auf der Live-Seite /services/seo
 *   1 Hero · 2 Brotkrumen · 3 Audit-Formular · 4 Belege-Leiste · 5 Problem
 *   6 Was zählt · 7 Drei Orte + CEx-Grafik · 8 Kundenprojekt CEx
 * Alle sichtbaren Texte kommen aus content/seo-de.ts.
 */
import { ArrowRight, Quote } from "lucide-react";
import { anchors, seoDe } from "../../content/seo-de";
import { Reveal } from "./SeoReveal";
import {
  asset,
  BODY_CARD,
  CARD_L3,
  CARD_L5,
  CARD_L6,
  EmptySlot,
  H3_CARD,
  KICKER,
  RichText,
  Section,
  SectionHead,
  SiteLink,
  Tick,
} from "./ui";
import { SeoLeadForm } from "./SeoLeadForm";
import { ChannelArt } from "./illustrations";
import { CexPositionsChart } from "./CexPositionsChart";

const two = (n: number) => String(n).padStart(2, "0");

/* ───────── 1 · Hero ───────── */
export function Hero() {
  const { hero } = seoDe;
  return (
    <section
      id={anchors.hero}
      data-surface="dark"
      aria-labelledby="top-titel"
      className="surface-dark relative isolate h-[100svh] min-h-[660px] w-full overflow-hidden"
    >
      {/* Vorgeladen im <head> der vorab gerenderten Seite (scripts/prerender-seo.mjs). */}
      <picture>
        <source media="(max-width: 640px)" srcSet={asset(hero.image.srcMobile)} />
        <img
          src={asset(hero.image.src)}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full bg-black object-cover"
        />
      </picture>
      {/* Bewegter Hintergrund wie auf der Live-Seite; bei „weniger Bewegung“ bleibt das Standbild. */}
      <video
        aria-hidden
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset(hero.image.src)}
        className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover motion-reduce:hidden"
      >
        <source src={asset("video/seo-logo.mp4")} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-44"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.20) 58%, rgba(0,0,0,0) 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[88%] md:h-[66%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,8,32,0) 0%, rgba(15,8,32,0.62) 36%, rgba(15,8,32,0.9) 70%, rgba(15,8,32,0.96) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto grid w-full max-w-[1512px] gap-7 px-5 pb-[calc(40px+env(safe-area-inset-bottom))] text-center sm:px-8 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14 lg:px-12 lg:pb-20 lg:text-left 2xl:px-0">
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-white/85 sm:text-[12px]">{hero.kicker}</p>
            <h1
              id="top-titel"
              className="mt-4 font-bold uppercase italic text-white balance sm:mt-5"
              style={{ fontSize: "clamp(32px, 5.2vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.045em" }}
            >
              {hero.heading.ink} <span className="font-medium text-white/60 lg:block">{hero.heading.grey}</span>
            </h1>
            <p className="pretty mt-5 max-w-[40ch] text-[14.5px] leading-relaxed text-white/65 sm:max-w-[56ch] sm:text-[16px] lg:max-w-[62ch] lg:text-[17px]">
              {hero.subline}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 lg:max-w-[340px] lg:items-start lg:pb-1">
            <a
              href={`#${anchors.audit}`}
              className="seo-btn-blue seo-on-dark group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-[#0077ED] min-[480px]:w-auto sm:text-[16px]"
            >
              {hero.primary}
              <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href={`#${anchors.finalCta}`}
              className="seo-on-dark inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
            >
              {hero.secondary} <span aria-hidden>→</span>
            </a>
            <p className="pretty max-w-[44ch] text-[13px] leading-snug text-white/65">{hero.micro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── 2 · Brotkrumen (sitzen oben im Audit-Abschnitt) ───────── */
export function Trail({ className = "" }: { className?: string }) {
  const { trail } = seoDe;
  return (
    <nav aria-label={trail.label} className={className}>
      <ol className="flex flex-wrap items-center justify-center text-[12px] text-ink-muted sm:text-[13px] lg:justify-start">
        {trail.items.map((item, i) => (
          <li key={item.label} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden className="px-2.5 text-ink-faint">
                ›
              </span>
            ) : null}
            {item.to ? (
              <SiteLink
                to={item.to}
                hash={item.hash}
                className="inline-flex min-h-[44px] items-center underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/50"
              >
                {item.label}
              </SiteLink>
            ) : (
              <span aria-current="page" className="inline-flex min-h-[44px] items-center font-semibold text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ───────── 3 · Audit-Formular (Muster: orange gerahmte Karte der Live-Seite) ───────── */
export function AuditForm() {
  const { audit } = seoDe;
  return (
    <Section id={anchors.audit} surface="light">
      <div className="container-v3">
        <Trail className="-mt-10 mb-5 sm:-mt-12 sm:mb-6 md:-mt-14" />
        <Reveal className="relative overflow-hidden rounded-[28px] border-2 border-[#FF7A45] bg-white p-6 sm:rounded-[40px] sm:p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,122,69,0.22) 0%, rgba(255,122,69,0) 68%)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div className="text-center lg:text-left">
              <h2
                id={`${anchors.audit}-titel`}
                className="seo-h2-card mx-auto max-w-[16ch] text-ink lg:mx-0"
              >
                {audit.heading.ink} <span className="text-ink/55">{audit.heading.grey}</span>
              </h2>
              <p className="pretty mx-auto mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft sm:text-[17.5px] lg:mx-0">
                <RichText text={audit.subline} />
              </p>
            </div>
            <SeoLeadForm variant="audit" button={audit.button} note={audit.note} success={audit.success} chips={audit.chips} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 4 · Belege-Leiste (Muster: Ergebnis-Karten, vier nebeneinander) ───────── */
export function Proof() {
  const { proof } = seoDe;
  return (
    <section id="belege" data-surface="light" className="surface-light-2 relative py-12 sm:py-16">
      <div className="container-v3">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {proof.items.map((item, i) => (
            <li key={item.label} data-needs-proof={item.needsProof || undefined} className="h-full">
              <Reveal
                delay={i * 0.05}
                className="h-full rounded-[24px] border border-ink/[0.08] bg-white p-5 sm:rounded-[28px] sm:p-7"
              >
                <p
                  className="font-bold leading-none tracking-[-0.03em] text-ink"
                  style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}
                >
                  {item.value}
                </p>
                <p className="mt-3 text-[14px] leading-snug text-ink-soft sm:text-[15.5px]">{item.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-7 text-center text-[13px] leading-[1.9] text-ink-muted">
            <RichText text={proof.footnote} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 5 · Das Problem (Muster: drei Ergebnis-Karten) ───────── */
export function Problem() {
  const { problem } = seoDe;
  return (
    <Section id="problem" surface="light">
      <div className="container-v3">
        <SectionHead id="problem" kicker={problem.kicker} heading={problem.heading} intro={problem.intro} split />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {problem.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07} className={`${CARD_L3} seo-lift !bg-surface-2`}>
              <p className={`${KICKER} text-[#C2410C]`}>{two(i + 1)}</p>
              <h3 className={`mt-6 ${H3_CARD} text-ink sm:!text-[24px]`}>{card.title}</h3>
              <p className={`mt-3 ${BODY_CARD} text-ink-soft`}>{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────── 6 · Was zählt (Muster: Ablauf-Karten mit orangem Punkt) ───────── */
export function Measure() {
  const { measure } = seoDe;
  return (
    <Section id="messung" surface="light-2">
      <div className="container-v3">
        <SectionHead id="messung" kicker={measure.kicker} heading={measure.heading} intro={measure.body} split />
        <ol className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {measure.steps.map((step, i) => (
            <li key={step.title} className="h-full">
              <Reveal delay={i * 0.07} className={`h-full ${CARD_L6}`}>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#FF7A45] ring-4 ring-[#FF7A45]/20" />
                  <span className={`${KICKER} text-ink-muted`}>{two(i + 1)}</span>
                </div>
                <h3 className={`mt-5 ${H3_CARD} text-ink`}>{step.title}</h3>
                <p className={`mt-2.5 ${BODY_CARD} text-ink-soft`}>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={0.1} className={`mt-4 sm:mt-5 ${CARD_L6}`}>
          <h3 className={`${H3_CARD} text-ink`}>{measure.listHeading}</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {measure.list.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-snug text-ink-soft sm:text-[15.5px]">
                <Tick />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 7 · Drei Orte, ein Ziel (+ CEx-Grafik) (Muster: dunkle Leistungs-Karten) ───────── */
export function Channels() {
  const { channels } = seoDe;
  return (
    <Section id="kanaele" surface="dark">
      <div className="container-v3">
        <SectionHead id="kanaele" kicker={channels.kicker} heading={channels.heading} dark />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {channels.blocks.map((block, i) => (
            <Reveal key={block.key} delay={i * 0.07} className={CARD_L5}>
              <p className={`${KICKER} text-[#FF7A45]`}>{two(i + 1)}</p>
              <div className="mt-5 overflow-hidden rounded-2xl bg-white px-4 pt-4">
                <ChannelArt kind={block.key} alt={block.alt} />
              </div>
              <h3 className={`mt-6 ${H3_CARD} text-white`}>{block.title}</h3>
              <p className={`mt-3 ${BODY_CARD} text-white/70`}>{block.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-4 sm:mt-5">
          <CexPositionsChart />
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 8 · Kundenprojekt CEx (Muster: Ergebnis-Karten + zwei Spalten) ───────── */
export function Cex() {
  const { cex } = seoDe;
  return (
    <Section id="cex" surface="light-2">
      <div className="container-v3">
        <SectionHead id="cex" kicker={cex.kicker} heading={cex.heading} intro={cex.body} split className="xl:!grid-cols-[1.5fr_1fr] xl:!gap-10" headingClassName="max-w-[22ch] xl:max-w-none xl:!text-[56px]" />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {cex.figures.map((figure, i) => (
            <li key={figure.label} className="h-full">
              <Reveal delay={i * 0.06} className="h-full rounded-[24px] border border-ink/[0.08] bg-white p-5 sm:rounded-[28px] sm:p-7">
                <p className={`${KICKER} text-ink-muted`}>{two(i + 1)}</p>
                <p
                  className="mt-4 whitespace-nowrap font-bold leading-none tracking-[-0.03em] text-ink"
                  style={{ fontSize: "clamp(25px, 3.4vw, 46px)" }}
                >
                  {figure.value}
                </p>
                <p className="mt-3 text-[14px] leading-snug text-ink-soft sm:text-[15.5px]">{figure.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[28px]">{cex.builtHeading}</h3>
            <ul className="mt-6 space-y-4">
              {cex.built.map((line) => (
                <li key={line} className="flex gap-3 text-[16px] font-semibold leading-snug text-ink sm:text-[17.5px]">
                  <Tick />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="text-[13px] leading-relaxed text-ink-muted">{cex.source}</p>
              {cex.link.href ? (
                <a
                  href={cex.link.href}
                  className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-ink underline underline-offset-4"
                >
                  {cex.link.label}
                </a>
              ) : (
                /* Noch kein Ziel vorhanden: bewusst kein klickbarer Link. */
                <p className="mt-3 text-[14px] leading-[1.9] text-ink-soft">
                  <span className="font-semibold text-ink">{cex.link.label}</span> <RichText text={cex.link.placeholder} />
                </p>
              )}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Reveal delay={0.06}>
              {cex.photo.src ? (
                /* Gesichter nie anschneiden: Bildausschnitt beim Einsetzen des echten Fotos prüfen. */
                <img
                  src={asset(cex.photo.src)}
                  alt={cex.photo.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full rounded-[24px] object-cover sm:aspect-auto sm:rounded-[28px]"
                />
              ) : (
                <EmptySlot
                  label={cex.photo.placeholder}
                  alt={cex.photo.alt}
                  className="aspect-[4/3] h-full w-full rounded-[24px] sm:aspect-auto sm:min-h-[280px] sm:rounded-[28px]"
                />
              )}
            </Reveal>
            <Reveal delay={0.12}>
              <figure className={`h-full ${CARD_L6}`}>
                <Quote size={24} className="text-[#FF7A45]" aria-hidden />
                <blockquote className="mt-4 text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[20px]">
                  <RichText text={cex.quote} />
                </blockquote>
                <figcaption className="mt-6 text-[14px] leading-[1.9] text-ink-soft">
                  <span className="block font-semibold text-ink">{cex.quoteName}</span>
                  <RichText text={cex.quoteRole} />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * SEO-Seite · Abschnitte 18 bis 25 · v2.1 (26.11.2026)
 *   18 Wer für Sie arbeitet · 19 Werkzeuge · 20 Kundenstimmen (Platzhalter)
 *   21 Zahlen (Platzhalter) · 22 Weitere Leistungen · 23 FAQ · 24 Videos · 25 Abschluss
 * Alle sichtbaren Texte kommen aus content/seo-de.ts.
 * v2.1: Handy-Bildgrößen (srcSet/sizes) für Teamfoto und Themenkarten.
 * v2.0: Flächen, Karten, Abstände und Schaltflächen wie auf der Live-Seite /services/seo.
 * v1.1: Einblenden über SeoReveal (max. 0,6 s, QA F6).
 */
import { useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, Minus, Phone, Play, Plus, Star } from "lucide-react";
import { seoDe } from "../../content/seo-de";
import { MAX_DELAY, Reveal } from "./SeoReveal";
import {
  asset,
  BODY_CARD,
  CARD_L5,
  CARD_L6,
  CARD_L7,
  EmptySlot,
  H3_CARD,
  KICKER,
  RichText,
  Section,
  SectionHead,
  SNAP_ROW,
  SnapDots,
  useSnapRow,
} from "./ui";
import { SeoLeadForm } from "./SeoLeadForm";
import { ToolArt } from "./illustrations";

/* ───────── 18 · Wer für Sie arbeitet ───────── */
export function Team() {
  const { team } = seoDe;
  return (
    <Section id="team" surface="light">
      <div className="container-v3">
        <SectionHead id="team" kicker={team.kicker} heading={team.heading} intro={team.intro} split />
        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {team.people.map((person, i) => (
            <li key={i} className="h-full">
              <Reveal
                delay={Math.min(i * 0.07, MAX_DELAY)}
                className="seo-lift flex h-full flex-col overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white sm:rounded-[28px]"
              >
                {person.photo ? (
                  /* Ganzes Bild, kein Zuschnitt: Gesicht und Oberkörper bleiben sichtbar. */
                  <div className="grid aspect-[4/3] w-full place-items-center bg-surface-2 p-5">
                    <img
                      src={asset(person.photo.src)}
                      srcSet={person.photo.src.endsWith("raoul-founder-426.png") ? `${asset("brand/raoul-founder-240.webp")} 240w, ${asset("brand/raoul-founder-426.webp")} 426w` : undefined}
                      sizes="(max-width: 640px) 200px, 260px"
                      alt={person.alt}
                      width={person.photo.width}
                      height={person.photo.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto rounded-full object-contain"
                    />
                  </div>
                ) : (
                  <EmptySlot label={person.photoPlaceholder} alt={person.alt} className="aspect-[4/3] w-full !rounded-none !border-0 !border-b" />
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className={`${KICKER} text-[#C2410C]`}>
                    <RichText text={person.role} />
                  </p>
                  <h3 className={`mt-3 ${H3_CARD} text-ink`}>
                    <RichText text={person.name} />
                  </h3>
                  <p className={`mt-3 ${BODY_CARD} text-ink-soft`}>
                    <RichText text={person.text} />
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ───────── 19 · Werkzeuge ───────── */
export function Tools() {
  const { tools } = seoDe;
  return (
    <Section id="werkzeug" surface="light-2">
      <div className="container-v3">
        <SectionHead id="werkzeug" kicker={tools.kicker} heading={tools.heading} />
        <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {tools.items.map((tool, i) => (
            <li key={tool.key} className="h-full">
              <Reveal delay={Math.min(i * 0.05, MAX_DELAY)} className={`${CARD_L7} seo-lift flex h-full gap-4 lg:flex-col lg:gap-0`}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-2">
                  <ToolArt kind={tool.key} />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-bold leading-tight tracking-[-0.01em] text-ink lg:mt-5 lg:text-[17px]">{tool.name}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft lg:mt-2 lg:text-[15px]">{tool.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ───────── 20 · Kundenstimmen (Platzhalter, noch nicht live) ───────── */
export function Reviews() {
  const { reviews } = seoDe;
  const row = useSnapRow<HTMLUListElement>();
  const slots = Array.from({ length: reviews.slotCount });
  return (
    <Section id="kundenstimmen" surface="light">
      <div className="container-v3" data-placeholder-section>
        <SectionHead id="kundenstimmen" kicker={reviews.kicker} heading={reviews.heading} />
        <Reveal className="mt-10 sm:mt-14">
          <ul
            ref={row.ref}
            className={`${SNAP_ROW} lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0`}
          >
            {slots.map((_, i) => (
              <li
                key={i}
                data-placeholder
                className="seo-slot snap-card flex min-h-[230px] w-[80%] shrink-0 flex-col rounded-[24px] p-6 sm:w-[44%] lg:w-auto"
              >
                <span className="flex items-center gap-2">
                  <Star size={16} strokeWidth={2} className="shrink-0 text-ink-muted" aria-hidden />
                  <span className="seo-ph">{reviews.slot.stars}</span>
                </span>
                <p className="mt-5">
                  <span className="seo-ph">{reviews.slot.text}</span>
                </p>
                <p className="mt-auto flex flex-col items-start gap-2 pt-6">
                  <span className="seo-ph">{reviews.slot.name}</span>
                  <span className="seo-ph">{reviews.slot.source}</span>
                </p>
              </li>
            ))}
          </ul>
          <SnapDots
            count={reviews.slotCount}
            active={row.active}
            onSelect={row.goTo}
            label={reviews.carouselLabel}
            className="mt-4 lg:hidden"
          />
        </Reveal>
        {/* Noch kein Ziel: Beschriftung ohne Link, bis die Adresse des Google-Profils feststeht. */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px] font-semibold text-ink-soft lg:justify-start">
          {reviews.link.label}
          <span className="seo-ph">{reviews.link.placeholder}</span>
        </p>
      </div>
    </Section>
  );
}

/* ───────── 21 · Zahlen (Platzhalter, noch nicht live) ───────── */
export function Numbers() {
  const { numbers } = seoDe;
  return (
    <Section id="zahlen" surface="dark">
      <div className="container-v3" data-placeholder-section>
        <SectionHead id="zahlen" kicker={numbers.kicker} heading={numbers.heading} dark />
        <ul className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {numbers.items.map((item, i) => (
            <li key={i} className="h-full">
              <Reveal delay={Math.min(i * 0.07, MAX_DELAY)} className="seo-slot-dark flex h-full flex-col items-center rounded-[24px] p-7 text-center sm:rounded-[28px] sm:p-9">
                <span className="seo-ph seo-ph-dark" data-placeholder style={{ fontSize: "clamp(20px, 2.4vw, 30px)", padding: "10px 18px" }}>
                  {item.value}
                </span>
                <p className="mt-5 text-[16px] leading-snug text-white/75 sm:text-[17px]">
                  <RichText text={item.label} dark />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ───────── 22 · Weitere Leistungen ───────── */
export function Related() {
  const { related } = seoDe;
  const row = useSnapRow<HTMLUListElement>();
  return (
    <Section id="mehr" surface="light">
      <div className="container-v3">
        <SectionHead id="mehr" kicker={related.kicker} heading={related.heading} />
        <Reveal className="mt-10 sm:mt-14">
          <ul
            ref={row.ref}
            className={`${SNAP_ROW} lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0`}
          >
            {related.cards.map((card) => (
              <li
                key={card.title}
                className="snap-card seo-lift flex w-[82%] shrink-0 flex-col overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white sm:w-[46%] sm:rounded-[28px] lg:w-auto"
              >
                <img
                  src={asset(card.image.src)}
                  srcSet={`${asset(card.image.src.replace(/\.jpg$/, "-640.jpg"))} 640w, ${asset(card.image.src)} 1200w`}
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 400px"
                  alt={card.alt}
                  width={card.image.width}
                  height={card.image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full bg-surface-2 object-cover"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className={`${H3_CARD} text-ink`}>{card.title}</h3>
                  <p className={`mt-3 ${BODY_CARD} text-ink-soft`}>{card.text}</p>
                  {/* Der Link erscheint erst, wenn die Seite existiert (href im Textmodul). */}
                  {card.link.href ? (
                    <a
                      href={card.link.href}
                      className="group mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-brand-violet-deep"
                    >
                      {card.link.label}
                      <ArrowRight size={15} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <SnapDots
            count={related.cards.length}
            active={row.active}
            onSelect={row.goTo}
            label={related.carouselLabel}
            className="mt-4 lg:hidden"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 23 · FAQ ───────── */
export function Faq() {
  const { faq } = seoDe;
  const [open, setOpen] = useState<readonly number[]>([0]);
  const toggle = (i: number) => setOpen((list) => (list.includes(i) ? list.filter((n) => n !== i) : [...list, i]));
  return (
    <Section id="faq" surface="light-2">
      <div className="container-v3 grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="faq" kicker={faq.kicker} heading={faq.heading} />
        </div>
        <Reveal>
          {/* Alle Antworten stehen immer im Quelltext, auch zugeklappt. */}
          <ul className="space-y-3">
            {faq.items.map((item, i) => {
              const isOpen = open.includes(i);
              return (
                <li key={item.q} className="rounded-2xl border border-ink/10 bg-white">
                  <h3>
                    <button
                      type="button"
                      id={`faq-frage-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-antwort-${i}`}
                      onClick={() => toggle(i)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[18px]">{item.q}</span>
                      <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-ink">
                        {isOpen ? <Minus size={16} strokeWidth={2.4} /> : <Plus size={16} strokeWidth={2.4} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-antwort-${i}`}
                    role="region"
                    aria-labelledby={`faq-frage-${i}`}
                    data-open={isOpen}
                    className="seo-faq-panel"
                  >
                    <div>
                      <p className="px-5 pb-6 text-[15.5px] leading-relaxed text-ink-soft sm:px-6 sm:pb-6 sm:text-[16.5px]">
                        <RichText text={item.a} />
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 24 · Videos ───────── */
export function Videos() {
  const { videos, contact } = seoDe;
  const row = useSnapRow<HTMLUListElement>();
  return (
    <Section id="videos" surface="light">
      <div className="container-v3">
        <SectionHead id="videos" kicker={videos.kicker} heading={videos.heading} intro={videos.body} split />
        <Reveal className="mt-10 sm:mt-14">
          {/* Keine eingebetteten Videos: Einbetten braucht erst die Einwilligung (Zwei-Klick-Lösung). */}
          <ul
            ref={row.ref}
            className={`${SNAP_ROW} lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0`}
          >
            {videos.items.map((video, i) => (
              <li key={i} className="snap-card w-[82%] shrink-0 sm:w-[46%] lg:w-auto">
                <EmptySlot label={video.title} alt={video.alt} className="aspect-video w-full rounded-[24px]">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink-muted">
                    <Play size={18} strokeWidth={2.2} aria-hidden />
                  </span>
                </EmptySlot>
              </li>
            ))}
          </ul>
          <SnapDots
            count={videos.items.length}
            active={row.active}
            onSelect={row.goTo}
            label={videos.carouselLabel}
            className="mt-4 lg:hidden"
          />
        </Reveal>
        <div className="mt-8 flex justify-center lg:justify-start">
          <a
            href={contact.youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 text-[15px] font-semibold text-ink transition-colors hover:border-ink/40 sm:text-[16px]"
          >
            {videos.button}
            <ArrowUpRight size={17} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ───────── 25 · Abschluss ───────── */
const TILE = `${CARD_L5} seo-on-dark group flex min-h-[72px] items-center gap-4 !p-4 !pr-5 text-left transition-colors hover:border-white/25`;

export function FinalCta() {
  const { finalCta, contact } = seoDe;
  return (
    <Section id="erstgespraech" surface="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(240,95,34,0.22),transparent_65%)]"
      />
      <div className="container-v3 relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHead id="erstgespraech" heading={finalCta.heading} intro={finalCta.body} xl dark />
          <Reveal delay={0.1} className="mt-10 sm:mt-12">
            <h3 className="text-center text-[18px] font-bold tracking-[-0.02em] text-white sm:text-[20px] lg:text-left">{finalCta.altHeading}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {/* Klick-Tracking für tel: und wa.me läuft zentral über listenForContactClicks() in SeoLayout. */}
              <a href={contact.phoneHref} className={TILE}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#C2410C] text-white">
                  <Phone size={18} strokeWidth={2.2} aria-hidden />
                </span>
                <span>
                  <span className="block text-[16px] font-bold leading-tight text-white">{finalCta.callButton}</span>
                  <span className="seo-mono mt-1 block text-[14px] text-white/70">{contact.phone}</span>
                </span>
              </a>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={TILE}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-[#1A1B22]">
                  <MessageCircle size={19} strokeWidth={2.2} aria-hidden />
                </span>
                <span>
                  <span className="block text-[16px] font-bold leading-tight text-white">{finalCta.whatsappButton}</span>
                  <span className="seo-mono mt-1 block text-[14px] text-white/70">{contact.whatsapp}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
          <SeoLeadForm
            variant="final"
            button={finalCta.button}
            note={finalCta.note}
            success={finalCta.success}
            underButton={finalCta.underButton}
          />
        </Reveal>
      </div>
    </Section>
  );
}

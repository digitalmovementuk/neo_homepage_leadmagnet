/**
 * SEO-Seite · Abschnitte 9 bis 17 · v2.0 (19.11.2026)
 *   9 Arbeitsweise · 10 Neun Bausteine · 11 Ablauf · 12 Monate 4 bis 12
 *   13 Erst sehen, dann zahlen · 14 Kurzformular · 15 Pakete · 16 Gewinn · 17 Passt / passt nicht
 * Alle sichtbaren Texte kommen aus content/seo-de.ts.
 *
 * Changelog
 *   v2.0 (19.11.2026) Jeder Abschnitt im Muster des passenden Abschnitts der
 *        Live-Seite /services/seo (Karten, Flächen, Schriftgrößen, Abstände).
 *        Paket-Knopf bleibt auf jeder Breite einzeilig.
 *   v1.1 (19.11.2026) Einblenden über SeoReveal (max. 0,6 s, QA F6).
 */
import { ArrowRight, CalendarCheck, PhoneCall, PiggyBank, Sparkles } from "lucide-react";
import { seoDe } from "../../content/seo-de";
import { Reveal } from "./SeoReveal";
import {
  BODY_CARD,
  CARD_L3,
  CARD_L5,
  CARD_L6,
  CARD_L7,
  H3_CARD,
  KICKER,
  RichText,
  Section,
  SectionHead,
  SNAP_ROW,
  SnapDots,
  Tick,
  useSnapRow,
} from "./ui";
import { SeoLeadForm } from "./SeoLeadForm";
import { BlockArt } from "./illustrations";

const two = (n: number) => String(n).padStart(2, "0");
const BIG_NO = "block font-bold italic leading-none tracking-[-0.04em] text-ink/35 text-[44px] sm:text-[56px] lg:text-[64px]";

/* ───────── 9 · Arbeitsweise (dunkel, drei Karten) ───────── */
export function Approach() {
  const { approach } = seoDe;
  return (
    <Section id="arbeitsweise" surface="dark">
      <div className="container-v3">
        <SectionHead id="arbeitsweise" kicker={approach.kicker} heading={approach.heading} intro={approach.intro} dark split />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
          {approach.columns.map((column, i) => (
            <Reveal key={column.title} delay={i * 0.07} className={CARD_L5}>
              <p aria-hidden className={`${KICKER} text-[#FF7A45]`}>
                {two(i + 1)}
              </p>
              <h3 className={`mt-4 ${H3_CARD} text-white`}>{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug text-white/80 sm:text-[15.5px]">
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────── 10 · Neun Bausteine (Karten mit Bildfläche oben) ───────── */
export function Blocks() {
  const { blocks } = seoDe;
  const row = useSnapRow<HTMLUListElement>();
  return (
    <Section id="bausteine" surface="light">
      <div className="container-v3">
        <SectionHead id="bausteine" kicker={blocks.kicker} heading={blocks.heading} />
        <Reveal className="mt-10 sm:mt-14">
          <ul
            ref={row.ref}
            className={`${SNAP_ROW} lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0`}
          >
            {blocks.cards.map((card) => (
              <li key={card.key} className={`snap-card flex w-[82%] shrink-0 flex-col sm:w-[46%] lg:w-auto ${CARD_L7}`}>
                <span className="grid aspect-[16/10] w-full place-items-center rounded-xl bg-surface-2">
                  <BlockArt kind={card.key} alt={card.alt} />
                </span>
                <h3 className="mt-5 text-[18px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[20px]">{card.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft sm:text-[15.5px]">{card.text}</p>
                {/* Der Link erscheint erst, wenn die Unterseite existiert (href im Textmodul). */}
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-[#0071E3]"
                  >
                    {blocks.linkLabel}
                    <ArrowRight size={15} strokeWidth={2.4} aria-hidden />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <SnapDots
            count={blocks.cards.length}
            active={row.active}
            onSelect={row.goTo}
            label={blocks.carouselLabel}
            className="mt-4 lg:hidden"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 11 · Der Ablauf (Zeilen mit großer Ziffer) ───────── */
export function Timeline() {
  const { timeline } = seoDe;
  const ROW = "grid gap-4 border-t border-ink/10 pt-8 lg:grid-cols-[120px_1fr] lg:gap-10";
  return (
    <Section id="ablauf" surface="light-2">
      <div className="container-v3">
        <SectionHead id="ablauf" kicker={timeline.kicker} heading={timeline.heading} />

        <div className="mt-10 space-y-8 sm:mt-14 sm:space-y-10">
          <Reveal className={ROW}>
            <span aria-hidden className={BIG_NO}>
              00
            </span>
            <div>
              <h3 className={`${H3_CARD} text-ink`}>{timeline.phase0Label}</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                {timeline.phase0.map((step, i) => (
                  <li key={step.title} className={CARD_L7}>
                    <p aria-hidden className={`${KICKER} text-[#C2410C]`}>
                      {two(i + 1)}
                    </p>
                    <h4 className="mt-3 text-[17px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[18px]">{step.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-start gap-3 text-[15px] font-semibold leading-snug text-ink sm:text-[16px]">
                <Tick />
                {timeline.phase0Note}
              </p>
            </div>
          </Reveal>

          <ol className="space-y-8 sm:space-y-10">
            {timeline.days.map((day, i) => (
              <li key={day.label}>
                <Reveal className={ROW}>
                  <span aria-hidden className={BIG_NO}>
                    {two(i + 1)}
                  </span>
                  <div className="lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
                    <h3 className={`${H3_CARD} text-ink`}>{day.label}</h3>
                    <p className={`mt-3 ${BODY_CARD} text-ink-soft lg:mt-0`}>{day.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 border-t border-ink/10 pt-6 text-[13px] leading-relaxed text-ink-muted">{timeline.daysNote}</p>
      </div>
    </Section>
  );
}

/* ───────── 12 · Monate 4 bis 12 (Kopf links, schmal gerahmter Kasten rechts) ───────── */
export function Later() {
  const { later } = seoDe;
  return (
    <Section id="monate" surface="light">
      <div className="container-v3 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <SectionHead id="monate" kicker={later.kicker} heading={later.heading} intro={later.body} />
        <Reveal delay={0.1} className="rounded-[24px] border border-ink/15 p-6 sm:rounded-[28px] sm:p-8">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C2410C] text-white">
            <CalendarCheck size={17} strokeWidth={2.2} aria-hidden />
          </span>
          <h3 className={`mt-5 ${H3_CARD} text-ink`}>{later.boxTitle}</h3>
          <p className={`mt-3 ${BODY_CARD} text-ink-soft`}>
            <RichText text={later.boxText} />
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 13 · Erst sehen, dann zahlen (drei Karten mit Punkt) ───────── */
export function Advantage() {
  const { advantage } = seoDe;
  return (
    <Section id="vorteil" surface="light-2">
      <div className="container-v3">
        <SectionHead id="vorteil" kicker={advantage.kicker} heading={advantage.heading} />
        <ol className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
          {advantage.steps.map((step, i) => (
            <li key={step.title} className="h-full">
              <Reveal delay={i * 0.08} className={`h-full ${CARD_L6}`}>
                <p aria-hidden className={`flex items-center gap-2.5 ${KICKER} text-ink-muted`}>
                  <span className="h-2 w-2 rounded-full bg-[#FF7A45]" />
                  {two(i + 1)}
                </p>
                <h3 className={`mt-5 ${H3_CARD} text-ink`}>{step.title}</h3>
                <p className={`mt-3 ${BODY_CARD} text-ink-soft`}>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ───────── 14 · Kurzformular (orange gerahmte Karte) ───────── */
export function ShortForm() {
  const { shortForm } = seoDe;
  return (
    <Section id="start" surface="light">
      <div className="container-v3">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-[#FF7A45]/30 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(255,122,69,0.55)] sm:rounded-[36px] sm:p-10 md:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF7A45]/[0.12] blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="text-center lg:text-left">
              <h2 id="start-titel" className="seo-h2-card mx-auto max-w-[18ch] text-ink lg:mx-0">
                {shortForm.heading.ink} <span className="text-ink/55">{shortForm.heading.grey}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft sm:text-[17.5px] lg:mx-0">
                {shortForm.body}
              </p>
            </div>
            <div className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
              <SeoLeadForm variant="short" button={shortForm.button} note={shortForm.note} success={shortForm.success} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── 15 · Pakete und Preise ───────── */
// Preis wie „490 €“: Ziffern in Mono, geschütztes Leerzeichen und € in der
// Grundschrift. In Mono ist jedes Zeichen gleich breit, dadurch stand das €
// zu weit von der Zahl weg. Der Text bleibt „490 €“ (mit U+00A0).
function renderPrice(price: string) {
  const m = /^([\d.,]+)( )(€)$/.exec(price);
  if (!m) return price;
  return (
    <>
      {m[1]}
      <span data-price-currency className="ml-[-0.04em] font-sans">
        {m[2]}
        {m[3]}
      </span>
    </>
  );
}

export function Packages() {
  const { packages } = seoDe;
  return (
    <Section id="pakete" surface="light-2">
      <div className="container-v3">
        <SectionHead id="pakete" kicker={packages.kicker} heading={packages.heading} headingClassName="max-w-[22ch]" />

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
          {packages.items.map((item, i) => {
            const longPrice = item.price.length > 8;
            return (
              <li key={item.key} data-package={item.key}>
                <Reveal
                  delay={i * 0.07}
                  className={`relative flex h-full flex-col rounded-[28px] bg-white p-7 sm:rounded-[36px] sm:p-8 xl:p-9 ${
                    item.highlight
                      ? "border-2 border-[#FF7A45]/60 shadow-[0_30px_80px_-50px_rgba(255,122,69,0.6)]"
                      : "border border-ink/[0.08]"
                  }`}
                >
                  <h3 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[28px]">{item.name}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft sm:text-[15.5px] lg:min-h-[4.9em]">{item.line}</p>

                  <p className="mt-6 border-t border-ink/10 pt-6 text-ink">
                    {item.pricePrefix ? (
                      <span className="mr-2 text-[16px] font-semibold text-ink-soft">{item.pricePrefix}</span>
                    ) : null}{" "}
                    <span
                      className={`font-bold leading-none tracking-tight ${
                        longPrice ? "text-[28px] sm:text-[30px]" : "seo-mono text-[44px] sm:text-[52px]"
                      }`}
                    >
                      {renderPrice(item.price)}
                    </span>{" "}
                    {item.priceSuffix ? (
                      <span className="mt-2 block text-[14px] font-medium text-ink-muted">{item.priceSuffix}</span>
                    ) : null}
                  </p>
                  {item.text ? <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.text}</p> : null}

                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-snug text-ink-soft sm:text-[15.5px]">
                        <Tick />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    {/* Einzeilig auf jeder Breite: kleinere Schrift und schmaler Rand statt Umbruch. */}
                    <a
                      href={`#${item.target}`}
                      className={`group inline-flex min-h-[52px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-3 text-center text-[14px] font-semibold leading-tight sm:gap-2 sm:px-5 sm:text-[15.5px] lg:gap-1 lg:px-2 lg:text-[12.5px] xl:gap-2 xl:px-4 xl:text-[14.5px] ${
                        item.highlight
                          ? "seo-btn-blue bg-[#0071E3] text-white hover:bg-[#0077ED]"
                          : "border border-ink/25 bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      }`}
                    >
                      {item.button}
                      <ArrowRight
                        size={16}
                        strokeWidth={2.4}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className={`mt-5 sm:mt-6 ${CARD_L6}`}>
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {packages.shared.map((line) => (
              <li key={line} className="flex gap-3 text-[15.5px] font-semibold leading-snug text-ink sm:text-[16px]">
                <Tick />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-6 text-center text-[13px] leading-relaxed text-ink-muted">{packages.priceNote}</p>
      </div>
    </Section>
  );
}

/* ───────── 16 · Was Sie gewinnen (vier Karten mit orangem Kreis) ───────── */
const GAIN_ICONS = { anrufe: PhoneCall, planbar: CalendarCheck, kosten: PiggyBank, ki: Sparkles } as const;

export function Gains() {
  const { gains } = seoDe;
  return (
    <Section id="gewinn" surface="light">
      <div className="container-v3">
        <SectionHead id="gewinn" kicker={gains.kicker} heading={gains.heading} />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {gains.cards.map((card, i) => {
            const Icon = GAIN_ICONS[card.key];
            return (
              <Reveal key={card.key} delay={i * 0.06} className={`${CARD_L7} !bg-surface-2`}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C2410C] text-white">
                  <Icon size={17} strokeWidth={2.2} aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[20px]">{card.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft sm:text-[15.5px]">{card.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ───────── 17 · Passt / passt nicht (zwei Spalten) ───────── */
export function Fit() {
  const { fit } = seoDe;
  return (
    <Section id="passt" surface="light-2">
      <div className="container-v3">
        <SectionHead id="passt" kicker={fit.kicker} heading={fit.heading} />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2">
          <Reveal className={CARD_L3}>
            <h3 className={`${H3_CARD} text-ink`}>{fit.yesTitle}</h3>
            <ul className="mt-6 space-y-3.5">
              {fit.yes.map((line) => (
                <li key={line} className="flex gap-3 text-[15.5px] leading-snug text-ink sm:text-[17px]">
                  <Tick />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className={`${CARD_L3} !bg-transparent`}>
            <h3 className={`${H3_CARD} text-ink`}>{fit.noTitle}</h3>
            <ul className="mt-6 space-y-3.5">
              {fit.no.map((line) => (
                <li key={line} className="flex gap-3 text-[15.5px] leading-snug text-ink-soft sm:text-[17px]">
                  <Tick no />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

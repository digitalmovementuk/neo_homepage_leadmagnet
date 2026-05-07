import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * WhyManifesto — die WHY-Sektion direkt nach dem Hero.
 *
 * Sinek-Logik: bevor wir verkaufen, was wir tun (WHAT), erklären wir
 * woran wir glauben (WHY). Belief-Block, kein CTA — die Sektion verkauft
 * Haltung, nicht Service. Schließt mit Brücke zu den drei Prinzipien.
 *
 * Layout: 2 Spalten ab lg+ — Foto (Gründer + Name) links, Copy rechts.
 * Copy wird über useT() per Sprache aufgelöst.
 */
export function WhyManifesto() {
  const t = useT();
  return (
    <section
      id="why"
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-center">
          {/* Left — founder photo + name */}
          <Reveal>
            <figure className="relative mx-auto lg:mx-0 max-w-[420px] lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-surface-2 shadow-[0_30px_80px_-30px_rgba(38,39,47,0.25)]">
                <img
                  src={`${import.meta.env.BASE_URL}brand/raoul-founder.png`}
                  alt={t.whyManifesto.founderName}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-5 text-center lg:text-left">
                <p
                  className="text-ink"
                  style={{
                    fontSize: "clamp(20px, 1.6vw, 24px)",
                    fontWeight: 600,
                    letterSpacing: "-0.018em",
                    lineHeight: "1.2",
                  }}
                >
                  {t.whyManifesto.founderName}
                </p>
                <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                  {t.whyManifesto.founderRole}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Right — copy */}
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.whyManifesto.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-5 max-w-[22ch] mx-auto lg:mx-0 balance text-ink"
                style={{
                  fontSize: "clamp(34px, 6vw, 84px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.034em",
                  fontWeight: 700,
                }}
              >
                {t.whyManifesto.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 sm:mt-10 max-w-[560px] mx-auto lg:mx-0 space-y-5 text-[16px] sm:text-[17.5px] text-ink-soft leading-relaxed">
                {t.whyManifesto.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="text-ink font-semibold">{t.whyManifesto.closing}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

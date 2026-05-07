import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * FounderNote — signed personal message from Raoul Müller. Photo on the
 * left (md+), copy on the right. Humanises the data-led page directly
 * before the contact form. Copy via i18n (DE/EN).
 */
export function FounderNote() {
  const t = useT();
  return (
    <section
      id="founder"
      data-surface="light"
      className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative mx-auto lg:mx-0 max-w-[420px] lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-surface-2 shadow-[0_30px_80px_-30px_rgba(38,39,47,0.25)]">
                <img
                  src={`${import.meta.env.BASE_URL}brand/raoul-founder.png`}
                  alt={t.founder.signatureBlock}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
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
            <Reveal delay={0.15}>
              <div className="mt-7 max-w-[560px] mx-auto lg:mx-0 space-y-5 text-[16px] sm:text-[17px] text-ink-soft leading-relaxed">
                {t.founder.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.22}>
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

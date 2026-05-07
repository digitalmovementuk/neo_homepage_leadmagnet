import { Check, X } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * Comparison — "Andere Agenturen vs. NEO". Two-column side-by-side table
 * that directly addresses agency PTSD: contract length, reporting, point
 * of contact, pricing transparency, goal, lock-in. Copy via i18n (DE/EN).
 */

export function Comparison() {
  const t = useT();
  const ROWS = t.comparison.rows.map((r) => ({
    label: r.topic,
    them: r.other,
    us: r.neo,
  }));
  return (
    <section
      id="comparison"
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.comparison.eyebrow}</p>
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
          <div className="rounded-[28px] sm:rounded-[36px] border border-ink/10 bg-white p-7 sm:p-9 shadow-card">
            <p className="eyebrow text-ink-muted">{t.comparison.columns.other}</p>
            <ul className="mt-6 space-y-4">
              {ROWS.map((r) => (
                <li key={r.label} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/8 text-ink-faint">
                    <X size={11} strokeWidth={3} />
                  </span>
                  <div className="leading-snug">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[14.5px] sm:text-[15px] text-ink-soft">{r.them}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* NEO */}
          <div
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
              {ROWS.map((r) => (
                <li key={r.label} className="flex items-start gap-3">
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
                    <p className="mt-1 text-[14.5px] sm:text-[15px] font-semibold text-ink">
                      {r.us}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

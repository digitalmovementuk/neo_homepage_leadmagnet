import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * Comparison · v2.0 (26.11.2026) — "Andere Agenturen vs. NEO" als echte HTML-Tabelle.
 *   Changelog: v2.0 (26.11.2026) Karten durch <table> ersetzt (Vergleichstabelle für Suche/KI), am Telefon gestapelt.
 * Earlier: two-column side-by-side table
 * that directly addresses agency PTSD: contract length, reporting, point
 * of contact, pricing transparency, goal, lock-in. Copy via i18n (DE/EN).
 *
 * Motion: ambient orange/magenta orbs drift in opposite directions on
 * scroll for depth; rows stagger in line-by-line as the cards enter view.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Comparison() {
  const t = useT();
  const ROWS = t.comparison.rows.map((r) => ({
    label: r.topic,
    them: r.other,
    us: r.neo,
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbAY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const orbBY = useTransform(scrollYProgress, [0, 1], ["6%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      data-surface="light"
      className="surface-light-2 relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      {/* Ambient parallax orbs — soft brand-colour washes drifting on scroll */}
      <motion.div
        aria-hidden
        style={{ y: orbAY }}
        className="pointer-events-none absolute -left-32 top-32 h-[520px] w-[520px] rounded-full opacity-[0.07]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #F05F22 0%, transparent 65%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbBY }}
        className="pointer-events-none absolute -right-24 bottom-24 h-[460px] w-[460px] rounded-full opacity-[0.06]"
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
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.comparison.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="section-h2 mt-5 mx-auto lg:mx-0 text-ink"
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

        {/* v2.0 (26.11.2026): echte Vergleichstabelle (table/thead/tbody) statt zwei Karten.
            Ab sm drei Spalten; am Telefon stapelt jede Zeile Thema, Andere, NEO. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-12 sm:mt-16 rounded-[28px] sm:rounded-[36px] border border-ink/10 bg-white shadow-card overflow-hidden"
        >
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.comparison.caption}</caption>
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-ink/10">
                <th scope="col" className="px-6 lg:px-9 py-5 eyebrow text-ink-muted w-[24%]">{t.comparison.columns.topic}</th>
                <th scope="col" className="px-6 lg:px-9 py-5 eyebrow text-ink-muted w-[38%]">{t.comparison.columns.other}</th>
                <th scope="col" className="px-6 lg:px-9 py-5 eyebrow w-[38%]" style={{ color: "#C2410C" }}>{t.comparison.columns.neo}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="grid grid-cols-2 sm:table-row border-b border-ink/10 last:border-b-0">
                  <th scope="row" className="col-span-2 px-5 sm:px-6 lg:px-9 pt-5 sm:py-5 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted align-top">
                    {r.label}
                  </th>
                  <td className="px-5 sm:px-6 lg:px-9 pt-2 pb-5 sm:py-5 align-top">
                    <span className="flex items-start gap-2.5">
                      <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/8 text-ink-faint" aria-hidden>
                        <X size={11} strokeWidth={3} />
                      </span>
                      <span className="text-[14px] sm:text-[15px] leading-snug text-ink-soft">
                        <span className="sm:hidden block text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-0.5">{t.comparison.columns.other}</span>
                        {r.them}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 sm:px-6 lg:px-9 pt-2 pb-5 sm:py-5 align-top">
                    <span className="flex items-start gap-2.5">
                      <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full text-white" style={{ background: "#F05F22" }} aria-hidden>
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-[14px] sm:text-[15px] leading-snug font-semibold text-ink">
                        <span className="sm:hidden block text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5" style={{ color: "#C2410C" }}>NEO</span>
                        {r.us}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

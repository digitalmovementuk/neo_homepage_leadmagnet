import { motion } from "framer-motion";
import { HeartHandshake, BarChart3, Tag } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useT } from "../lib/i18n";

/**
 * Principles — HOW-Sektion. Drei Prinzipien, die NEO's Methode zusammenfassen:
 * Commitment · Performance · Fairer Preis. Steht zwischen WHY-Manifest und
 * ProcessTimeline (HOW in Aktion). Copy via i18n (DE/EN).
 */

const ICONS = [HeartHandshake, BarChart3, Tag];

export function Principles() {
  const t = useT();
  const PRINCIPLES = t.principles.items.map((it, idx) => ({
    icon: ICONS[idx] ?? HeartHandshake,
    title: it.title,
    body: it.body,
    kicker: it.kicker,
  }));
  return (
    <section
      id="principles"
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-12 items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{t.principles.eyebrow}</p>
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
                {t.principles.headlineMain}
                <span className="text-ink/55"> {t.principles.headlineSub}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-[15px] sm:text-[17px] text-ink-soft leading-relaxed max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end">
              {t.principles.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-ink/8 overflow-hidden p-7 sm:p-9 md:p-10 flex flex-col shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-full text-white shrink-0"
                style={{ background: "#FF7A45" }}
              >
                <p.icon size={20} strokeWidth={2.2} />
              </span>
              <div className="mt-5 inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                <span>0{i + 1}</span>
                <span className="h-px w-6 bg-ink/15" />
                <span>{p.kicker}</span>
              </div>
              <h3
                className="mt-3 text-ink"
                style={{
                  fontSize: "clamp(28px, 3vw, 36px)",
                  lineHeight: "1.04",
                  letterSpacing: "-0.028em",
                  fontWeight: 700,
                }}
              >
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] sm:text-[15.5px] text-ink-soft leading-relaxed">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

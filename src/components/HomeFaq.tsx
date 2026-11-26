/**
 * HomeFaq — Häufige Fragen auf der Startseite
 * v1.0 (26.11.2026)
 *
 * Changelog
 *   v1.0 (26.11.2026) Neu. Gleiches Akkordeon wie die Leistungsseiten; Inhalt aus
 *        content/home-faq.ts. Die FAQPage-Daten stehen in index.html (nur Startseite).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "../lib/Reveal";
import { useLang } from "../lib/i18n";
import { homeFaqDe, homeFaqEn } from "../content/home-faq";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function HomeFaq() {
  const { lang } = useLang();
  const c = lang === "en" ? homeFaqEn : homeFaqDe;
  return (
    <section
      id="faq"
      data-surface="light"
      className="surface-light-2 relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      style={{ background: "var(--surface-light-2)" }}
    >
      <div className="container-v3">
        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-10 lg:gap-12 items-start">
          <div>
            <Reveal>
              <p className="eyebrow text-ink-muted">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-h2 mt-5 text-ink">
                {c.headlineMain}
                <span className="text-ink/55"> {c.headlineSub}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15.5px] text-ink-soft leading-relaxed max-w-[400px]">{c.intro}</p>
            </Reveal>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {c.items.map((item, i) => (
              <Item key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: EASE_OUT }}
      className="rounded-2xl border border-ink/10 bg-white overflow-hidden"
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left text-ink hover:bg-ink/[0.02] transition-colors"
        >
          <span className="text-[15.5px] sm:text-[17px] font-semibold leading-snug" style={{ letterSpacing: "-0.018em" }}>
            {q}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-ink" aria-hidden>
            {open ? <Minus size={14} strokeWidth={2.4} /> : <Plus size={14} strokeWidth={2.4} />}
          </span>
        </button>
      </h3>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-5 sm:px-7 pb-6 text-[14.5px] sm:text-[15.5px] text-ink-soft leading-relaxed">{a}</p>
      </motion.div>
    </motion.li>
  );
}

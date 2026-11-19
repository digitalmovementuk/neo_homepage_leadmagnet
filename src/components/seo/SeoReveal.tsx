/**
 * Einblenden beim Scrollen, nur für die SEO-Seite · v1.1 (19.11.2026)
 * v1.1: bei „weniger Bewegung“ sichtbar trotz vorgerendertem opacity:0.
 * Wie lib/Reveal.tsx (bleibt für die Startseite unverändert), aber jede
 * Einblendung ist nach höchstens 0,6 s fertig (QA F6): Dauer 0,45 s,
 * Verzögerung auf 0,15 s begrenzt.
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const DURATION = 0.45;
const MAX_TOTAL = 0.6;
/** Größte erlaubte Verzögerung, damit Dauer + Verzögerung <= 0,6 s bleibt. */
export const MAX_DELAY = MAX_TOTAL - DURATION;

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 22, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) {
    // Weniger Bewegung: sofort sichtbar, ohne Animation. Bewusst motion.div statt
    // <div>: Die vorgerenderte Seite trägt opacity:0 als Inline-Stil, und React
    // übernimmt beim Hydrieren keine abweichenden Attribute. Ein schlichtes <div>
    // bliebe deshalb unsichtbar (v1.2-Befund); motion.div setzt opacity 1 selbst.
    return (
      <motion.div className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION, delay: Math.min(Math.max(delay, 0), MAX_DELAY), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

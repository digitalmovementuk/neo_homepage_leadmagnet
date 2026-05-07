import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSeoModal } from "../lib/seoModal";
import SeoAnalyser from "../seo/SeoAnalyser";

/**
 * Full-viewport modal that hosts the SEO Potential Analyser. Triggered from
 * any "Free SEO check" CTA via `useSeoModal().openSeo()`. Closeable via X,
 * Esc, or backdrop tap.
 */
export function SeoAnalyserModal() {
  const { open, closeSeo } = useSeoModal();

  // Body scroll lock + Esc-to-close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSeo();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeSeo]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="seo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeSeo}
            className="fixed inset-0 z-[80] bg-ink/55 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            key="seo-modal-panel"
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Kostenloser SEO-Check"
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 z-[90] overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/40 bg-surface-1 shadow-[0_30px_80px_-30px_rgba(15,8,32,0.55)]"
          >
            <button
              type="button"
              onClick={closeSeo}
              aria-label="Schließen"
              className="absolute top-4 right-4 z-[5] grid h-10 w-10 place-items-center rounded-full bg-ink/[0.06] hover:bg-ink/[0.12] text-ink/75 hover:text-ink transition"
            >
              <X size={18} strokeWidth={2.4} />
            </button>

            <div className="h-full w-full overflow-y-auto overscroll-contain">
              <SeoAnalyser />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

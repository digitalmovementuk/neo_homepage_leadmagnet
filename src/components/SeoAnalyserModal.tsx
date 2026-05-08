import { lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useSeoModal } from "../lib/seoModal";
import { getLenis } from "../lib/useLenis";

// Lazy: the SEO wizard (~30KB gzipped — currencies, countries, all step
// pages, all bilingual copy) only ships when the user actually opens the
// modal. Keeps the homepage's initial JS lean.
const SeoAnalyser = lazy(() => import("../seo/SeoAnalyser"));

/**
 * Full-viewport modal that hosts the SEO Potential Analyser. Triggered from
 * any "Free SEO check" CTA via `useSeoModal().openSeo()`. Closeable via X,
 * Esc, or backdrop tap.
 */
export function SeoAnalyserModal() {
  const { open, closeSeo } = useSeoModal();

  // Body scroll lock + Esc-to-close + stop Lenis while open. Lenis is the
  // page-wide smooth-scroll engine; if it stays running, wheel events on
  // the modal content scroll the homepage behind it instead of the modal.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSeo();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      getLenis()?.start();
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
            className="fixed inset-0 z-[80] bg-ink/30 backdrop-blur-lg"
            aria-hidden
          />

          <motion.div
            key="seo-modal-panel"
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="SEO Potential Analyser"
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 z-[90] overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/55 bg-white/55 shadow-[0_30px_60px_-28px_rgba(20,20,50,0.18),0_6px_18px_-10px_rgba(20,20,50,0.08)] backdrop-blur-xl backdrop-saturate-150"
          >
            <button
              type="button"
              onClick={closeSeo}
              aria-label="Close"
              className="absolute top-4 right-4 z-[5] grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink-muted backdrop-blur-md transition hover:border-ink/20 hover:bg-white hover:text-ink"
            >
              <X size={16} strokeWidth={2.2} />
            </button>

            <div
              data-lenis-prevent
              className="h-full w-full overflow-y-auto overscroll-contain"
            >
              <Suspense
                fallback={
                  <div className="grid h-full w-full place-items-center">
                    <Loader2 size={18} className="animate-spin text-ink-faint" />
                  </div>
                }
              >
                <SeoAnalyser />
              </Suspense>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

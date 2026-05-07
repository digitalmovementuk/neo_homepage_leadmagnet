import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n";

/**
 * Bottom-centred sticky CTA bar.
 *
 * Light "frozen glass" pill (white/85 + backdrop-blur), centre-aligned, with
 * a plum-tinted ring pulse on both the bar and its inner CTA (synced 2.4s
 * beat). Only blends in once the user has scrolled the hero out of view —
 * the hero already has its own "Start" CTA, so showing this bar over the
 * hero would be redundant. It fades in after the Snapshot section and only
 * fades out once the footer is fully visible.
 */
export function StickyCTA() {
  const t = useT();
  const [show, setShow] = useState(false);

  // The bar appears after the long Snapshot section has fully passed. It
  // stays available through the page and only disappears when the footer is
  // fully visible, so it does not vanish over founder/contact content.
  useEffect(() => {
    const snapshot = document.getElementById("snapshot");
    const footer = document.querySelector("footer");
    if (!snapshot || !footer) return;
    const onScroll = () => {
      const vh = window.innerHeight;
      const snapshotRect = snapshot.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const navClearance = Math.min(96, vh * 0.14);
      const afterSnapshot = snapshotRect.bottom <= navClearance;
      const footerFullyVisible =
        footerRect.top >= -1 && footerRect.bottom <= vh + 1;
      const atDocumentBottom =
        window.scrollY + vh >= document.documentElement.scrollHeight - 2;
      setShow(afterSnapshot && !footerFullyVisible && !atDocumentBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Outer wrapper handles fixed positioning + horizontal centring (CSS only).
  // Inner motion.div is the only thing framer-motion writes a transform to,
  // so the centring isn't clobbered when y/opacity animate.
  return (
    <div
      aria-hidden={!show}
      className="flex fixed inset-x-0 bottom-4 sm:bottom-6 z-40 justify-center px-4 pointer-events-none"
    >
      <motion.div
        initial={false}
        animate={
          show
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: 24, pointerEvents: "none" }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-[min(640px,calc(100vw-32px))] items-center justify-center gap-3 sm:gap-5 rounded-full bg-white/85 backdrop-blur-xl pl-5 sm:pl-7 pr-2 sm:pr-3 py-2 sm:py-3 border border-white/55 animate-pulse-bar"
      >
        <p className="text-[13px] sm:text-[14.5px] font-semibold text-ink leading-tight whitespace-nowrap">
          {t.nav.cta}{" "}
          <span className="hidden sm:inline text-ink-muted font-medium">· {t.hero.priceLineSub}</span>
        </p>
        <a
          href="#contact"
          tabIndex={show ? 0 : -1}
          className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-[13.5px] sm:text-[15px] px-5 sm:px-7 py-2.5 sm:py-3.5 transition-colors animate-pulse-plum whitespace-nowrap"
        >
          {t.hero.cta} <ArrowRight size={14} strokeWidth={2.4} />
        </a>
      </motion.div>
    </div>
  );
}

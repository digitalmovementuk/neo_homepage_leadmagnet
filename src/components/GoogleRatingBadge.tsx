import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Floating, sticky Google Rating widget.
 * Rendered as a position:fixed element from App.tsx so it persists across
 * the entire page scroll. Desktop only — on mobile the inline hero badge
 * handles trust signal. Fades out as the Contact form approaches so the
 * form's primary CTA isn't competing with a floating trust pill, and back
 * in when the user scrolls above the contact section again.
 */
export function StickyGoogleRatingBadge() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const onScroll = () => {
      const vh = window.innerHeight;
      const contactApproaching = contact.getBoundingClientRect().top < vh * 0.65;
      setShow(!contactApproaching);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={
        show
          ? { opacity: 1, y: 0, pointerEvents: "auto" }
          : { opacity: 0, y: 12, pointerEvents: "none" }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!show}
      className="hidden md:block fixed bottom-5 left-5 z-40"
    >
      <GoogleRatingCard />
    </motion.div>
  );
}

export function GoogleRatingCard() {
  return (
    <a
      href="https://www.google.com/search?q=NEO+THE+AGENCY+reviews"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Zu unseren Google-Bewertungen — 5,0 Schnitt aus über 20 verifizierten Bewertungen"
      className="inline-flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:bg-white transition"
    >
      <GoogleGIcon />
      <div className="leading-tight">
        <p className="text-[11px] sm:text-[12px] font-semibold text-ink/80">
          Google-Bewertung
        </p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-[16px] sm:text-[17px] font-bold text-ink tracking-tight tabular-nums">
            5,0
          </span>
          <div className="flex gap-[2px] text-[#F5A623]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarFilled key={i} />
            ))}
          </div>
        </div>
        <p className="mt-0.5 text-[10px] sm:text-[10.5px] text-ink-muted">
          Basierend auf +20 Bewertungen
        </p>
      </div>
    </a>
  );
}

function GoogleGIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function StarFilled() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.95 6 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.1 1.13-6.58L2.45 9.46l6.6-.96L12 2.5z" />
    </svg>
  );
}

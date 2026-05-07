import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { useT, useLang } from "../lib/i18n";
import { useLeadModal, type LeadModalContent } from "../lib/leadModal";

/**
 * LeadCaptureModal — frozen-glass modal driven by `useLeadModal()`.
 *
 *   • Pages call `openWith({...})` to display custom service-specific copy
 *     (e.g. "Free SEO Audit", "Free Ads Teardown").
 *   • Falls back to homepage default copy from `t.modal.*` when no
 *     content has been set (the auto-trigger on #reviews keeps working).
 *
 * Apple-style frosted card with a blurred-page backdrop. Closeable via X,
 * Esc, or backdrop tap.
 */
export function LeadCaptureModal() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  const { open, content, setOpen, openWith } = useLeadModal();
  const [submitted, setSubmitted] = useState(false);
  const hasShownRef = useRef(false);

  // Default content from i18n — used by the auto-trigger when no service-
  // page-specific payload is in flight.
  const defaultContent: LeadModalContent = {
    eyebrow: t.modal.eyebrow,
    headline: t.modal.headline,
    sub: t.modal.sub,
    submit: t.modal.submit,
    successHeadline: isEN
      ? "Got it — we'll be in touch."
      : "Erhalten — wir melden uns.",
    successBody: isEN
      ? "Your audit lands in your inbox within 24 working hours."
      : "Ihr Audit landet werktags innerhalb 24 Stunden in Ihrem Posteingang.",
  };

  const c = content ?? defaultContent;

  // Auto-trigger — IntersectionObserver on #reviews. Only fires on the
  // homepage where #reviews is rendered.
  useEffect(() => {
    const reviews = document.getElementById("reviews");
    if (!reviews) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShownRef.current) {
          hasShownRef.current = true;
          openWith(defaultContent);
        }
      },
      { rootMargin: "0px 0px 240px 0px", threshold: 0 }
    );
    obs.observe(reviews);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Body scroll lock + Esc-to-close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  // Reset submitted state when modal opens fresh.
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setOpen(false), 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="lcm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-xl"
            aria-hidden
          />

          <motion.div
            key="lcm-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lcm-title"
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative pointer-events-auto w-full max-w-[440px] rounded-[28px] border border-white/55 bg-white/85 backdrop-blur-2xl shadow-[0_30px_80px_-30px_rgba(15,8,32,0.55)] p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isEN ? "Close" : "Schließen"}
                className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full bg-ink/[0.06] hover:bg-ink/[0.12] text-ink/75 hover:text-ink transition"
              >
                <X size={16} strokeWidth={2.4} />
              </button>

              {!submitted ? (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                    {c.eyebrow}
                  </p>
                  <h3
                    id="lcm-title"
                    className="mt-2 text-ink"
                    style={{
                      fontSize: "clamp(22px, 4.4vw, 28px)",
                      lineHeight: "1.1",
                      letterSpacing: "-0.028em",
                      fontWeight: 700,
                    }}
                  >
                    {c.headline}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">
                    {c.sub}
                  </p>

                  <form onSubmit={onSubmit} className="mt-5 space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={t.modal.name}
                      className={inputCls}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder={t.modal.email}
                      className={inputCls}
                    />
                    <button
                      type="submit"
                      className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-[15px] py-3 transition-colors"
                    >
                      {c.submit} <ArrowRight size={15} />
                    </button>
                    <p className="text-[11px] text-ink-muted text-center pt-1 leading-relaxed">
                      {isEN
                        ? "No spam. Unsubscribe anytime."
                        : "Kein Spam. Jederzeit abbestellbar."}
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
                    <Check size={22} strokeWidth={3} />
                  </div>
                  <h3 className="mt-4 text-[20px] font-bold text-ink tracking-tight">
                    {c.successHeadline}
                  </h3>
                  <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
                    {c.successBody}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/55 focus:ring-2 focus:ring-ink/10";

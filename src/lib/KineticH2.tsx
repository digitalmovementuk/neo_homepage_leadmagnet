import { useEffect, useRef, useState } from "react";

type Span = { text: string; className?: string };

type Props = {
  spans: Span[];
  className?: string;
  delay?: number;
};

/**
 * Word-by-word reveal heading. Uses native IntersectionObserver + CSS
 * transitions so it can't get stuck if framer-motion's whileInView misfires.
 * Reduced-motion → instant. Safety timer guarantees the heading is visible.
 */
export function KineticH2({ spans, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    // Safety: if IO never reports (Lenis edge cases, etc.), reveal anyway.
    const safety = window.setTimeout(() => setInView(true), 2200);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  let wordIdx = 0;
  return (
    <h2 ref={ref} className={className}>
      {spans.map((span, si) => {
        const words = span.text.split(/\s+/).filter(Boolean);
        return words.map((w, wi) => {
          const idx = wordIdx++;
          return (
            <span
              key={`${si}-${wi}`}
              className="inline-block overflow-hidden align-baseline mr-[0.22em]"
            >
              <span
                className={`inline-block ${span.className ?? ""}`}
                style={{
                  transform: inView ? "translateY(0)" : "translateY(110%)",
                  transition: "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${delay + idx * 35}ms`,
                  willChange: "transform",
                }}
              >
                {w}
              </span>
            </span>
          );
        });
      })}
    </h2>
  );
}

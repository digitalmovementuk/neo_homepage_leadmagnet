import { useEffect, type ReactNode } from "react";
import { PlatformTrustStrip } from "../components/PlatformTrustStrip";

export function LegalPage({
  eyebrow,
  title,
  docTitle,
  canonical,
  children,
}: {
  eyebrow: string;
  title: string;
  docTitle: string;
  /** Eigene Canonical-Adresse der Seite (v1.1, 24.11.2026): vorher zeigte der Platzhalter der Startseite. */
  canonical: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const prev = document.title;
    document.title = docTitle;
    return () => {
      document.title = prev;
    };
  }, [docTitle]);

  // Canonical und og:url auf die eigene Adresse setzen, beim Verlassen zurück (sonst bleibt die Startseite eingetragen).
  useEffect(() => {
    const created: Element[] = [];
    const swap = (selector: string, attr: string, tag: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector);
      let prev: string | null = null;
      if (!el) {
        el = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
        document.head.appendChild(el);
        created.push(el);
      } else {
        prev = el.getAttribute(attr);
      }
      el.setAttribute(attr, canonical);
      return () => {
        if (!created.includes(el!) && prev !== null) el!.setAttribute(attr, prev);
      };
    };
    const undoLink = swap('link[rel="canonical"]', "href", "link", { rel: "canonical" });
    const undoOg = swap('meta[property="og:url"]', "content", "meta", { property: "og:url" });
    return () => {
      undoLink();
      undoOg();
      created.forEach((el) => el.remove());
    };
  }, [canonical]);

  return (
    <section
      data-surface="light"
      className="surface-light relative pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24"
    >
      <div className="container-v3">
        <div className="max-w-[760px]">
          <p className="eyebrow text-ink-muted">{eyebrow}</p>
          <h1
            lang="de"
            className="mt-4 text-ink"
            style={{
              // 22.11.2026: lange Einzelwörter („Datenschutzerklärung") passten auf 375 px nicht → Silbentrennung
              hyphens: "auto",
              overflowWrap: "break-word",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: "1.04",
              letterSpacing: "-0.034em",
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
          <PlatformTrustStrip tone="light" align="start" className="mt-6" />
          <div className="legal-body mt-10 sm:mt-12 space-y-9 text-[15px] sm:text-[16px] leading-relaxed text-ink-soft">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-ink text-[19px] sm:text-[21px] font-bold tracking-tight mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

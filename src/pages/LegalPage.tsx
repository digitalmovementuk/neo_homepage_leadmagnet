import { useEffect, type ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  docTitle,
  children,
}: {
  eyebrow: string;
  title: string;
  docTitle: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const prev = document.title;
    document.title = docTitle;
    return () => {
      document.title = prev;
    };
  }, [docTitle]);

  return (
    <section
      data-surface="light"
      className="surface-light relative pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24"
    >
      <div className="container-v3">
        <div className="max-w-[760px]">
          <p className="eyebrow text-ink-muted">{eyebrow}</p>
          <h1
            className="mt-4 text-ink"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: "1.04",
              letterSpacing: "-0.034em",
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
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

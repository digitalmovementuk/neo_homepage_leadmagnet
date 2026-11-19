import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDocumentHead } from "../lib/useDocumentHead";
import { routeHead } from "../content/route-meta";

export function NotFound() {
  // noindex, kein Canonical (content/route-meta.ts → NOT_FOUND_META).
  useDocumentHead(routeHead("/404"));
  return (
    <section
      data-surface="dark"
      className="surface-dark relative min-h-[100svh] flex items-center justify-center px-6"
    >
      <div className="text-center max-w-[560px]">
        <p className="eyebrow text-white/55">Fehler 404</p>
        <h1
          className="mt-5 text-white"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.04",
            letterSpacing: "-0.034em",
            fontWeight: 700,
          }}
        >
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-5 text-[15px] sm:text-[17px] text-white/65 leading-relaxed">
          Vielleicht hat sich die Adresse geändert oder sie enthält einen Tippfehler. Auf der Startseite finden Sie alle Leistungen und den Weg zum Erstgespräch.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[15px] px-6 py-3 transition-colors"
        >
          <ArrowLeft size={15} />
          Zur Startseite
        </Link>
        <Link
          to={{ pathname: "/", hash: "#contact" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:border-white/60 text-white font-medium text-[15px] px-6 py-3 transition-colors"
        >
          Erstgespräch anfragen
          <ArrowRight size={15} />
        </Link>
        </div>
      </div>
    </section>
  );
}

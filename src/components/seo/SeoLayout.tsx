/**
 * Rahmen der SEO-Seite · v1.0 (19.11.2026)
 * Eigener Rahmen neben dem der Startseite, damit dort nichts verändert wird.
 * Gleiches weiches Gleiten (useLenis, 0,85 s) und gleiches Sprungverhalten.
 */
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLenis } from "../../lib/useLenis";
import { listenForContactClicks } from "../../lib/seoHooks";
import { seoDe } from "../../content/seo-de";
import { SeoHeader } from "./SeoHeader";
import { SeoFooter } from "./SeoFooter";
import { SeoStickyBar } from "./SeoStickyBar";
import "./seo.css";

export function SeoLayout() {
  useLenis();
  const { pathname, hash } = useLocation();

  // Lead-Tracking: jeder Klick auf tel: oder wa.me geht als Ereignis in window.dataLayer.
  useEffect(() => listenForContactClicks(), []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = hash.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const r1 = requestAnimationFrame(() => requestAnimationFrame(tryScroll));
    return () => cancelAnimationFrame(r1);
  }, [pathname, hash]);

  return (
    <div className="seo-page">
      <a href="#main" className="skip-link">
        {seoDe.header.skipLabel}
      </a>
      <SeoHeader />
      <main id="main">
        <Outlet />
      </main>
      <SeoFooter />
      <SeoStickyBar />
    </div>
  );
}

/* Sprunglink für Tastaturnutzer; nur bei Fokus sichtbar. */

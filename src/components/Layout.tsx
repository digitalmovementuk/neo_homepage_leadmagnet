import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLenis } from "../lib/useLenis";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { SeoAnalyserModal } from "./SeoAnalyserModal";

/**
 * Shared chrome around every route — Nav, Footer, sticky CTA and lead-modal
 * are identical to the homepage so users feel they never left NEO. Routes
 * render into the Outlet between Nav and Footer.
 *
 * Also resets scroll on route change so service-page hops don't dump the
 * user mid-page from the previous route.
 */
export function Layout() {
  useLenis();
  const { pathname, hash } = useLocation();

  // On route change without a hash → jump to top.
  // With a hash (e.g. /#contact) → wait one tick for the new page to mount,
  // then scroll the matching element into view (the homepage Contact id).
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
    // Two-frame delay so the new route has rendered + framer-motion entrances
    // have laid out before we attempt to find the target.
    const r1 = requestAnimationFrame(() =>
      requestAnimationFrame(tryScroll)
    );
    return () => cancelAnimationFrame(r1);
  }, [pathname, hash]);

  return (
    <>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
      <LeadCaptureModal />
      <SeoAnalyserModal />
    </>
  );
}

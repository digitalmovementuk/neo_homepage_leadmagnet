import { useEffect } from "react";
import Lenis from "lenis";

const NAV_OFFSET = 72; // matches md+ nav height; mobile nav is 64 — close enough.

// Module-level handle so other components (notably the SEO analyser modal)
// can stop/start the page-wide smooth scroll while a full-screen overlay is
// open — otherwise Lenis intercepts wheel events on `window` and the user
// can only scroll the modal by grabbing the native scrollbar.
let lenisInstance: Lenis | null = null;
export const getLenis = (): Lenis | null => lenisInstance;

export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      // Wheel feels snappy at ~0.85s; anchor jumps use a slightly longer
      // duration explicitly inside scrollTo() so long jumps don't blur.
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisInstance = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Lenis doesn't intercept hash-anchor clicks by default — without this,
    // <a href="#section"> jumps instantly (browser-native), bypassing the
    // smooth scroll. We hijack the click to route through lenis.scrollTo
    // and offset for the fixed nav so the target lands flush.
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      // Don't hijack if the anchor opens a new tab or has explicit modifier
      if (anchor.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Pure same-page anchor (#section) — Lenis handles smooth scroll.
      // Cross-route anchors like "/#contact" must let the router navigate
      // to "/" first; on the homepage the URL hash gets picked up below.
      if (!href.startsWith("#")) return;

      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.1 });
      if (history.replaceState) history.replaceState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    // When the route changes and the URL has a hash, Lenis should still
    // scroll to that anchor smoothly. Listen for hashchange (cross-route
    // navigation to /#contact lands here once Layout's scrollTo fires).
    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(hash.slice(1));
      if (el) lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.1 });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
}

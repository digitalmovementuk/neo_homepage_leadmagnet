/**
 * useLazyVideoSrc · v1.0 (26.11.2026)
 * Hält die Video-Adresse zurück, bis der Abschnitt des Videos (nächstes <section>)
 * in die Nähe des Bildschirms kommt (Standard 600 px darüber/darunter).
 * Ausgeblendete Varianten (display:none, z. B. Desktop-Video auf dem Handy) laden nie.
 * Grund: ~20 autoplay-Videos (~17 MB) luden sofort beim Seitenaufruf und blockierten
 * auf langsamen Verbindungen alles, was danach kam, u. a. die Logos im Fußbereich.
 */
import { useEffect, useState, type RefObject } from "react";

export function useLazyVideoSrc(
  ref: RefObject<HTMLElement | null>,
  src: string | undefined,
  rootMargin = "600px 0px",
): string | undefined {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load || !src) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }
    const target = (el.closest("section") as HTMLElement | null) ?? el;
    let near = false;
    const check = () => {
      if (near && el.getClientRects().length > 0) setLoad(true);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        check();
      },
      { rootMargin },
    );
    io.observe(target);
    window.addEventListener("resize", check);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [load, src, ref, rootMargin]);

  return load ? src : undefined;
}

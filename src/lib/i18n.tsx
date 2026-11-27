/**
 * Sprachsteuerung · v2.0 (27.11.2026)
 * Deutsch ist die Standardsprache ohne Präfix (/...). Die englische Fassung hat eigene Adressen unter /en/...
 * Die Sprache folgt der Adresse, damit Google je Adresse genau eine Sprache sieht und der erste Browser-Render
 * zum vorgerenderten HTML passt (keine Hydration-Fehler).
 *
 * Changelog
 *   v2.0 (27.11.2026) Sprache aus der Adresse statt aus localStorage; Sprachwechsel führt auf die Gegenadresse.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { translations, type Lang, type Translations } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Seiten, die es nur auf Deutsch gibt (SEO-Seite, Rechtsseiten). /en/... leitet dorthin um. */
export const DE_ONLY_PATHS = ["/seo-agentur", "/impressum", "/datenschutz"];

const isDeOnly = (p: string) => DE_ONLY_PATHS.some((d) => p === d || p.startsWith(`${d}/`));

/** Sprache einer Adresse: /en und /en/... = Englisch, alles andere Deutsch. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

/** Adresse ohne /en-Präfix. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

/** Interne Roh-Links (<a href="/...">) in der passenden Sprache. Router-<Link>s brauchen das nicht (basename). */
export function localizeHref(href: string, lang: Lang): string {
  if (lang !== "en" || !href.startsWith("/") || href.startsWith("/en/") || href === "/en") return href;
  const path = href.split(/[?#]/)[0];
  if (isDeOnly(path)) return href;
  return `/en${href}`;
}

function counterpartUrl(target: Lang): string {
  const { pathname, search, hash } = window.location;
  const bare = stripLangPrefix(pathname);
  if (target === "de") return `${bare}${search}${hash}`;
  // Deutsch-only-Seiten haben kein englisches Gegenstück: dann zur englischen Startseite.
  const enPath = isDeOnly(bare) ? "/en/" : bare === "/" ? "/en/" : `/en${bare}`;
  return `${enPath}${search}${hash}`;
}

export function LanguageProvider({ children, initialLang = "de" }: { children: ReactNode; initialLang?: Lang }) {
  const lang = initialLang;

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang || typeof window === "undefined") return;
      window.location.assign(counterpartUrl(l));
    },
    [lang]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}

/** Convenience hook — returns the current translations table. */
export function useT() {
  return useLang().t;
}

/** Roh-Link in der aktuellen Sprache, z. B. href={useLocalHref()("/#contact")}. */
export function useLocalHref() {
  const { lang } = useLang();
  return useCallback((href: string) => localizeHref(href, lang), [lang]);
}

/** Router-Link, der auf Englisch rein deutsche Seiten (z. B. /seo-agentur/) direkt verlinkt statt über /en/... umzuleiten. */
export function LangLink({ to, ...rest }: LinkProps) {
  const { lang } = useLang();
  if (lang === "en" && typeof to === "string" && to.startsWith("/") && isDeOnly(to.split(/[?#]/)[0].replace(/\/$/, ""))) {
    const { replace: _r, state: _s, reloadDocument: _d, preventScrollReset: _p, relative: _rel, viewTransition: _v, ...aProps } = rest as LinkProps & Record<string, unknown>;
    return <a href={to} {...(aProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <Link to={to} {...rest} />;
}

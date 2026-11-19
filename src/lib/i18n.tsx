import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

/**
 * Sprache · v2.0 (19.11.2026): Die Website ist nur Deutsch, für alle Besucher
 * und für Suchmaschinen. Keine Erkennung über Browser-Sprache oder
 * localStorage mehr, kein Umschalter. Die englischen Texte bleiben im Code
 * (translations.ts), werden aber nie angezeigt: lang ist immer "de".
 */
const LANG: Lang = "de";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Absichtlich ohne Wirkung: Umschalten auf Englisch ist abgeschaltet.
  const setLang = useCallback((_l: Lang) => {}, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = LANG;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang: LANG, setLang, t: translations[LANG] }),
    [setLang]
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

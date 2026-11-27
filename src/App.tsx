import { lazy, Suspense, useEffect, type ComponentType, type ReactElement } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SeoLayout } from "./components/seo/SeoLayout";
import { useLang, langFromPath } from "./lib/i18n";

// Service-page routes are lazy-loaded — they aren't on the homepage critical
// path so they shouldn't bloat the initial JS bundle.
// SEO-Leistungsseite (/seo-agentur/, 19.11.2026): eigener Rahmen, ersetzt /services/seo.
const SeoPage = lazy(() => import("./pages/SeoPage").then((m) => ({ default: m.SeoPage })));
const ServiceGoogleAds = lazy(() =>
  import("./pages/services/google-ads").then((m) => ({ default: m.ServiceGoogleAds })),
);
const ServiceSocialMedia = lazy(() =>
  import("./pages/services/social-media").then((m) => ({ default: m.ServiceSocialMedia })),
);
const ServiceWebsites = lazy(() =>
  import("./pages/services/websites").then((m) => ({ default: m.ServiceWebsites })),
);
const AboutUs = lazy(() => import("./pages/AboutUs").then((m) => ({ default: m.AboutUs })));
const Impressum = lazy(() => import("./pages/Impressum").then((m) => ({ default: m.Impressum })));
const Datenschutz = lazy(() => import("./pages/Datenschutz").then((m) => ({ default: m.Datenschutz })));
const Sitemap = lazy(() => import("./pages/Sitemap").then((m) => ({ default: m.Sitemap })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

export const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

/** Englische Adresse einer Seite, die es nur auf Deutsch gibt: auf die deutsche Adresse wechseln (Server: 308, vercel.json). */
function ToGerman() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.location.replace(`${BASE}${pathname}${search}${hash}`);
  }, [pathname, search, hash]);
  return <RouteFallback />;
}

function RouteFallback() {
  return <div className="min-h-screen bg-surface-1" aria-hidden />;
}

function suspended(Component: ComponentType): ReactElement {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Component />
    </Suspense>
  );
}

/** Alle Routen ohne Router-Hülle, damit der Prerender (src/entry-prerender.tsx) sie mit StaticRouter nutzen kann. */
export function AppRoutes() {
  const { lang } = useLang();
  const isEN = lang === "en";
  return (
    <Routes>
      {isEN ? (
        <>
          <Route path="seo-agentur/*" element={<ToGerman />} />
          <Route path="impressum/*" element={<ToGerman />} />
          <Route path="datenschutz/*" element={<ToGerman />} />
          <Route path="sitemap/*" element={<ToGerman />} />
        </>
      ) : (
        <Route element={<SeoLayout />}>
          <Route path="seo-agentur" element={suspended(SeoPage)} />
        </Route>
      )}
      {/* Alte Adressen leiten auf /seo-agentur/ um (Server: echte 301/308, siehe vercel.json). */}
      <Route path="leistungen/seo" element={<Navigate to="/seo-agentur/" replace />} />
      <Route path="services/seo" element={<Navigate to="/seo-agentur/" replace />} />
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* Flache Adressen = Fokus-Suchbegriff (26.11.2026). Alte Adressen: 301 in vercel.json, hier nur Rückfall im Browser. */}
        <Route path="neo-the-agency" element={suspended(AboutUs)} />
        <Route path="google-ads-agentur" element={suspended(ServiceGoogleAds)} />
        <Route path="social-media-agentur" element={suspended(ServiceSocialMedia)} />
        <Route path="webdesign-agentur" element={suspended(ServiceWebsites)} />
        <Route path="about" element={<Navigate to="/neo-the-agency/" replace />} />
        <Route path="uber-uns" element={<Navigate to="/neo-the-agency/" replace />} />
        <Route path="services/google-ads" element={<Navigate to="/google-ads-agentur/" replace />} />
        <Route path="services/social-media" element={<Navigate to="/social-media-agentur/" replace />} />
        <Route path="services/websites" element={<Navigate to="/webdesign-agentur/" replace />} />
        <Route path="impressum" element={suspended(Impressum)} />
        <Route path="datenschutz" element={suspended(Datenschutz)} />
        <Route path="sitemap" element={suspended(Sitemap)} />
        <Route path="*" element={suspended(NotFound)} />
      </Route>
    </Routes>
  );
}

/** /en/... = englische Fassung: eigener basename, damit alle Router-Links in der Sprache bleiben. */
export function routerBasename(lang: "de" | "en"): string {
  return lang === "en" ? `${BASE}/en` : BASE || "/";
}

export default function App() {
  const lang = langFromPath(window.location.pathname.slice(BASE.length) || "/");
  return (
    <BrowserRouter basename={routerBasename(lang)}>
      <AppRoutes />
    </BrowserRouter>
  );
}

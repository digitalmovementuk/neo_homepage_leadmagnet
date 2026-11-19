import { lazy, Suspense, type ComponentType, type ReactElement } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SeoLayout } from "./components/seo/SeoLayout";

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
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

export const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

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
  return (
    <Routes>
      <Route element={<SeoLayout />}>
        <Route path="seo-agentur" element={suspended(SeoPage)} />
      </Route>
      {/* Alte Adressen leiten auf /seo-agentur/ um (Server: echte 301/308, siehe vercel.json). */}
      <Route path="leistungen/seo" element={<Navigate to="/seo-agentur/" replace />} />
      <Route path="services/seo" element={<Navigate to="/seo-agentur/" replace />} />
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={suspended(AboutUs)} />
        <Route path="uber-uns" element={suspended(AboutUs)} />
        <Route path="services">
          <Route path="google-ads" element={suspended(ServiceGoogleAds)} />
          <Route path="social-media" element={suspended(ServiceSocialMedia)} />
          <Route path="websites" element={suspended(ServiceWebsites)} />
        </Route>
        <Route path="impressum" element={suspended(Impressum)} />
        <Route path="datenschutz" element={suspended(Datenschutz)} />
        <Route path="*" element={suspended(NotFound)} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <AppRoutes />
    </BrowserRouter>
  );
}

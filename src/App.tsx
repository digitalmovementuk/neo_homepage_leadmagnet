import { lazy, Suspense, type ComponentType, type ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";

// Service-page routes are lazy-loaded — they aren't on the homepage critical
// path so they shouldn't bloat the initial JS bundle.
const ServiceSEO = lazy(() => import("./pages/services/seo").then((m) => ({ default: m.ServiceSEO })));
const ServiceGoogleAds = lazy(() =>
  import("./pages/services/google-ads").then((m) => ({ default: m.ServiceGoogleAds })),
);
const ServiceSocialMedia = lazy(() =>
  import("./pages/services/social-media").then((m) => ({ default: m.ServiceSocialMedia })),
);
const ServiceWebsites = lazy(() =>
  import("./pages/services/websites").then((m) => ({ default: m.ServiceWebsites })),
);
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

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

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services">
            <Route path="seo" element={suspended(ServiceSEO)} />
            <Route path="google-ads" element={suspended(ServiceGoogleAds)} />
            <Route path="social-media" element={suspended(ServiceSocialMedia)} />
            <Route path="websites" element={suspended(ServiceWebsites)} />
          </Route>
          <Route path="*" element={suspended(NotFound)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

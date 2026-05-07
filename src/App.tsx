import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ServiceSEO } from "./pages/services/seo";
import { ServiceGoogleAds } from "./pages/services/google-ads";
import { ServiceSocialMedia } from "./pages/services/social-media";
import { ServiceWebsites } from "./pages/services/websites";
import { NotFound } from "./pages/NotFound";

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services">
            <Route path="seo" element={<ServiceSEO />} />
            <Route path="google-ads" element={<ServiceGoogleAds />} />
            <Route path="social-media" element={<ServiceSocialMedia />} />
            <Route path="websites" element={<ServiceWebsites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

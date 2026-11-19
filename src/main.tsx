import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./lib/i18n";
import { LeadModalProvider } from "./lib/leadModal";
import { SeoModalProvider } from "./lib/seoModal";
import { ROUTE_PATHS } from "./content/route-meta";
import "./index.css";

const tree = (
  <StrictMode>
    <LanguageProvider>
      <LeadModalProvider>
        <SeoModalProvider>
          <App />
        </SeoModalProvider>
      </LeadModalProvider>
    </LanguageProvider>
  </StrictMode>
);

// Alle Seiten kommen vorgerendert aus dem Build (scripts/prerender-seo.mjs): dann hydrieren statt neu zeichnen.
const rootEl = document.getElementById("root")!;
const path = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;
const knownRoute = (ROUTE_PATHS as string[]).includes(path);
// Unbekannte Adressen (404) neu zeichnen statt hydrieren: das vorgerenderte HTML gehört dann zu keiner Route.
if (rootEl.firstElementChild && knownRoute) hydrateRoot(rootEl, tree);
else {
  rootEl.textContent = "";
  createRoot(rootEl).render(tree);
}

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./lib/i18n";
import { LeadModalProvider } from "./lib/leadModal";
import { SeoModalProvider } from "./lib/seoModal";
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

// /seo-agentur/ kommt vorgerendert aus dem Build: dann hydrieren statt neu zeichnen.
const rootEl = document.getElementById("root")!;
if (rootEl.firstElementChild) hydrateRoot(rootEl, tree);
else createRoot(rootEl).render(tree);

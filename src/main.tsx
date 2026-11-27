import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { BASE } from "./App";
import { LanguageProvider, langFromPath } from "./lib/i18n";
import { LeadModalProvider } from "./lib/leadModal";
import { SeoModalProvider } from "./lib/seoModal";
import "./index.css";

// Sprache aus der Adresse: /en/... = Englisch, sonst Deutsch (passt zum vorgerenderten HTML).
const initialLang = langFromPath(window.location.pathname.slice(BASE.length) || "/");

const tree = (
  <StrictMode>
    <LanguageProvider initialLang={initialLang}>
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

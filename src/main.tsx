import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./lib/i18n";
import { LeadModalProvider } from "./lib/leadModal";
import { SeoModalProvider } from "./lib/seoModal";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <LeadModalProvider>
        <SeoModalProvider>
          <App />
        </SeoModalProvider>
      </LeadModalProvider>
    </LanguageProvider>
  </StrictMode>,
);

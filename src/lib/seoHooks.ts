/**
 * Übergabepunkte für die Technik · SEO-Seite (/seo-agentur/)
 * v1.1 (19.11.2026) · Engineering-Stand.
 *
 * Changelog
 *   v1.1 (19.11.2026) Honeypot, dataLayer-Tracking (Formular 1/2/3, tel:, wa.me),
 *        Versand hinter EINEM Adapter (submitSeoLead), weiterhin ohne Netzwerk.
 *   v1.0 (19.11.2026) Design-Stand, nur Platzhalter.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ FORM ADAPTER · TODO(engineer) wire later                             │
 * │ submitSeoLead() ist die EINZIGE Stelle, an der der echte Versand      │
 * │ angeschlossen wird. Heute: keine Netzwerkanfrage, 900 ms Wartezeit,  │
 * │ Erfolg. Die Formular-Route der Startseite hier NICHT                 │
 * │ ungeprüft übernehmen; in Tests den Versand abfangen, nie an ein      │
 * │ echtes Postfach.                                                     │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import { seoDe } from "../content/seo-de";

export type SeoFormVariant = "audit" | "short" | "final";

/** Nummer des Formulars für das Tracking: 1 = Audit, 2 = Kurzformular, 3 = Abschluss. */
export const SEO_FORM_ID: Record<SeoFormVariant, 1 | 2 | 3> = { audit: 1, short: 2, final: 3 };

export type SeoLeadPayload = {
  variant: SeoFormVariant;
  website: string;
  email: string;
  /** „Ihre wichtigste Leistung“ (nur Audit-Formular, optional). */
  service?: string;
  /** „Ihr Name“ (Kurzformular und Abschluss-Formular, optional). */
  name?: string;
};

export type SeoLeadResult = { ok: true } | { ok: false; message?: string };

/** Zum Testen des Fehlerzustands im Browser: window.__seoLeadStubFail = true */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __seoLeadStubFail?: boolean;
  }
}

/**
 * FORM ADAPTER (Stub). Sendet nichts.
 * TODO(engineer): hier den echten Versand einsetzen (fetch an den
 * freigegebenen Endpunkt) und bei Fehlern { ok: false } zurückgeben.
 * Das Formular zeigt dann seoDe.forms.errorSend an.
 */
export async function submitSeoLead(payload: SeoLeadPayload): Promise<SeoLeadResult> {
  void payload;
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  if (typeof window !== "undefined" && window.__seoLeadStubFail) return { ok: false };
  return { ok: true };
}

export type SeoEventName = "seo_form_submit" | "seo_click_phone" | "seo_click_whatsapp";

/** Schiebt ein Ereignis in window.dataLayer (Google Tag Manager liest es dort). */
export function trackSeoEvent(name: SeoEventName, detail: Record<string, string | number> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, page_path: seoDe.path, ...detail });
}

function placeOf(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track-place]");
  if (tagged?.dataset.trackPlace) return tagged.dataset.trackPlace;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section[id]");
  return section?.id || "page";
}

/**
 * Ein Klick-Zuhörer für die ganze Seite: jeder Link auf tel: oder wa.me
 * löst genau ein Ereignis aus, egal wo er steht (Kopf, Menü, Leiste,
 * Abschluss, Fußbereich). Gibt die Aufräumfunktion zurück.
 */
export function listenForContactClicks(root: Document = document): () => void {
  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const a = target?.closest?.<HTMLAnchorElement>("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      trackSeoEvent("seo_click_phone", { place: placeOf(a), link_url: href });
    } else if (/^https?:\/\/(api\.)?wa\.me\//i.test(href)) {
      trackSeoEvent("seo_click_whatsapp", { place: placeOf(a), link_url: href });
    }
  };
  root.addEventListener("click", onClick, true);
  return () => root.removeEventListener("click", onClick, true);
}

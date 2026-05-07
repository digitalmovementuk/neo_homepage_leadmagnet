import { useEffect } from "react";

type Lang = "de" | "en";

type Args = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  lang?: Lang;
  /** Optional Schema.org JSON-LD object — stringified into a <script>. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Sets <title>, <meta description>, OpenGraph and canonical for a route,
 * plus an optional JSON-LD block. React 19 hasn't shipped native <head>
 * support yet — this is a tiny imperative shim until then.
 */
export function useDocumentHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  lang,
  jsonLd,
}: Args) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
        if (key && val) el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"]`
      );
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
      return el;
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", ogTitle ?? title);
    setMeta(
      'meta[property="og:description"]',
      "content",
      ogDescription ?? description
    );
    if (ogImage) setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta(
      'meta[property="og:url"]',
      "content",
      canonical ?? window.location.href
    );
    setMeta(
      'meta[property="og:locale"]',
      "content",
      lang === "en" ? "en_GB" : "de_DE"
    );
    setMeta('meta[name="twitter:title"]', "content", ogTitle ?? title);
    setMeta(
      'meta[name="twitter:description"]',
      "content",
      ogDescription ?? description
    );

    if (canonical) setLink("canonical", canonical);
    if (lang) document.documentElement.lang = lang;

    // JSON-LD — replace any previous route-scoped block.
    let script = document.head.querySelector<HTMLScriptElement>(
      'script[data-route-jsonld="true"]'
    );
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.routeJsonld = "true";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      document.title = prevTitle;
      const s = document.head.querySelector(
        'script[data-route-jsonld="true"]'
      );
      if (s) s.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, canonical, lang, jsonLd]);
}

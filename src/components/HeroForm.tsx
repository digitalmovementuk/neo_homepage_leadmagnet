/**
 * HeroForm — „Kostenloses Erstgespräch" im Homepage-Hero · v1.0 (26.11.2026)
 * Quelle: mockups/hero-merge-2026-11-26/neo-hero-merge-v2.html.
 * Weg der Anfrage: WhatsApp-Übergabe wie im Kontaktformular (wa.me mit vorbereiteter Nachricht).
 * Licht: an bei Maus über der Karte; bleibt an, solange ein Feld Text hat oder fokussiert ist.
 * Touch = Licht bei Fokus/Tippen. Reduzierte Bewegung = Licht statisch (kein Folgen der Maus).
 *
 * Changelog
 *   v1.0 (26.11.2026) Erste Fassung.
 */
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { business } from "../content";
import { useLang } from "../lib/i18n";
import "./hero-form.css";

type Status = "form" | "sent" | "blocked";
type Errs = { web: boolean; mail: boolean; consent: boolean };

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function HeroForm() {
  const { lang } = useLang();
  const en = lang === "en";
  const L = en
    ? {
        title: "Free initial consultation",
        sub: "Reply within 24 h",
        web: "Your website",
        webPh: "www.your-company.com",
        webErr: "Please enter your website address.",
        mail: "Email",
        mailPh: "name@your-company.com",
        mailErr: "Please enter a valid email address.",
        int: "What are you interested in? (optional)",
        intPh: "Please choose (optional)",
        consentA: "I have read the ",
        consentLink: "privacy policy",
        consentB: ".",
        consentErr: "Please confirm that you have read the privacy policy.",
        btn: "Send request via WhatsApp",
        fine: "Your details reach us via WhatsApp. No spam, no sales pressure.",
        okTitle: "WhatsApp is open",
        okText: "Please send the prepared message. We reply within 24 hours.",
        okLink: "WhatsApp didn't open? Tap here",
        blockTitle: "WhatsApp could not be opened",
        blockText: "Your browser blocked the new window. Tap the button and send the prepared message.",
        blockLink: "Open WhatsApp",
        again: "Change details",
        hello: "Hello NEO, request for a free initial consultation:",
        source: "Source: homepage hero",
        lWeb: "Website",
        lInt: "Interest",
      }
    : {
        title: "Kostenloses Erstgespräch",
        sub: "Antwort in 24 h",
        web: "Ihre Website",
        webPh: "www.ihre-firma.de",
        webErr: "Bitte geben Sie die Adresse Ihrer Website ein.",
        mail: "E-Mail",
        mailPh: "name@ihre-firma.de",
        mailErr: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        int: "Wofür interessieren Sie sich? (optional)",
        intPh: "Bitte auswählen (optional)",
        consentA: "Ich habe die ",
        consentLink: "Datenschutzerklärung",
        consentB: " zur Kenntnis genommen.",
        consentErr: "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben.",
        btn: "Anfrage per WhatsApp senden",
        fine: "Ihre Angaben gehen per WhatsApp an uns. Kein Spam, kein Verkaufsdruck.",
        okTitle: "WhatsApp ist geöffnet",
        okText: "Bitte senden Sie die vorbereitete Nachricht ab. Wir antworten innerhalb von 24 Stunden.",
        okLink: "WhatsApp nicht geöffnet? Hier tippen",
        blockTitle: "WhatsApp konnte nicht geöffnet werden",
        blockText: "Ihr Browser hat das neue Fenster blockiert. Tippen Sie auf den Knopf und senden Sie die vorbereitete Nachricht ab.",
        blockLink: "WhatsApp öffnen",
        again: "Angaben ändern",
        hello: "Hallo NEO, Anfrage für ein kostenloses Erstgespräch:",
        source: "Quelle: Startseite Hero",
        lWeb: "Website",
        lInt: "Interesse",
      };
  const INTERESTS = ["SEO", "Google Ads", "Social Media", "Websites"];

  const [web, setWeb] = useState("");
  const [mail, setMail] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("form");
  const [waUrl, setWaUrl] = useState<string>(business.whatsappHref);

  const [over, setOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const [shown, setShown] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const okRef = useRef<HTMLDivElement>(null);

  const errs: Errs = {
    web: web.trim().length <= 2,
    mail: !MAIL_RE.test(mail.trim()),
    consent: !consent,
  };
  const show = (k: keyof Errs) => tried && errs[k];

  const filled = status === "form" && (web.trim() !== "" || mail.trim() !== "" || interest !== "");
  const lit = over || focused || filled;

  // Einblenden beim ersten Sichtkontakt (≤ 0,6 s). Ohne IntersectionObserver oder bei reduzierter Bewegung sofort sichtbar.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Licht folgt der Maus (nur echte Maus, nicht bei reduzierter Bewegung).
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && setOver(true);
    const leave = (e: PointerEvent) => e.pointerType === "mouse" && setOver(false);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty("--sx", `${x}px`);
        card.style.setProperty("--sy", `${y}px`);
      });
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    if (!reduce) card.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("pointermove", move);
    };
  }, []);

  useEffect(() => {
    if (status !== "form") okRef.current?.focus();
  }, [status]);

  const syncFocus = () => {
    window.setTimeout(() => {
      const a = document.activeElement;
      const card = cardRef.current;
      setFocused(!!a && !!card && a !== card && card.contains(a) && status === "form");
    }, 0);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    setTried(true);
    if (errs.web) return webRef.current?.focus();
    if (errs.mail) return mailRef.current?.focus();
    if (errs.consent) return consentRef.current?.focus();

    const lines = [
      L.hello,
      `${L.lWeb}: ${web.trim()}`,
      `E-Mail: ${mail.trim()}`,
      interest && `${L.lInt}: ${interest}`,
      L.source,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `${business.whatsappHref}?text=${encodeURIComponent(lines)}`;
    setWaUrl(url);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "hero_form_submit", form: "erstgespraech", interest: interest || "none" });

    // Ohne "noopener" liefert window.open ein Fenster zurück, so lässt sich ein Popup-Blocker erkennen.
    const w = window.open(url, "_blank");
    if (w) {
      try {
        w.opener = null;
      } catch {
        /* egal */
      }
      setStatus("sent");
    } else {
      setStatus("blocked");
    }
    setFocused(false);
  };

  const cls = ["hero-form", "rv", shown ? "in" : "", lit ? "is-lit" : "", status !== "form" ? "is-sent" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={cardRef} id="hero-form" className={cls} onFocus={syncFocus} onBlur={syncFocus}>
      <span className="hf-beam" aria-hidden="true" />
      <span className="hf-spot" aria-hidden="true" />

      {status === "form" ? (
        <form noValidate onSubmit={onSubmit} aria-labelledby="hf-title">
          <div className="hf-head">
            <p id="hf-title" className="hf-title">{L.title}</p>
            <p>{L.sub}</p>
          </div>

          <div className={`field${show("web") ? " err" : ""}`}>
            <label htmlFor="f-web">{L.web}</label>
            <input
              ref={webRef}
              id="f-web"
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder={L.webPh}
              value={web}
              onChange={(e) => setWeb(e.target.value)}
              aria-invalid={show("web") || undefined}
              aria-describedby={show("web") ? "f-web-msg" : undefined}
              required
            />
            <span className="msg" id="f-web-msg" role="alert">
              {show("web") ? L.webErr : ""}
            </span>
          </div>

          <div className={`field${show("mail") ? " err" : ""}`}>
            <label htmlFor="f-mail">{L.mail}</label>
            <input
              ref={mailRef}
              id="f-mail"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={L.mailPh}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              aria-invalid={show("mail") || undefined}
              aria-describedby={show("mail") ? "f-mail-msg" : undefined}
              required
            />
            <span className="msg" id="f-mail-msg" role="alert">
              {show("mail") ? L.mailErr : ""}
            </span>
          </div>

          <div className="field field-opt">
            <label htmlFor="f-int">{L.int}</label>
            <select id="f-int" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
              <option value="">{L.intPh}</option>
              {INTERESTS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="neo-hp" aria-hidden="true">
            <label htmlFor="f-hp">Firma</label>
            <input
              id="f-hp"
              name="firma_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>

          <div className={`field${show("consent") ? " err" : ""}`}>
            <label className="check" htmlFor="f-consent">
              <input
                ref={consentRef}
                id="f-consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={show("consent") || undefined}
                aria-describedby={show("consent") ? "f-consent-msg" : undefined}
                required
              />
              <span>
                {L.consentA}
                <Link to="/datenschutz">{L.consentLink}</Link>
                {L.consentB}
              </span>
            </label>
            <span className="msg" id="f-consent-msg" role="alert">
              {show("consent") ? L.consentErr : ""}
            </span>
          </div>

          <button type="submit" className="nhf-btn">
            <span>{L.btn}</span>
            <span className="nhf-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </button>
          <p className="form-fine">{L.fine}</p>
        </form>
      ) : (
        <div className="form-ok" ref={okRef} tabIndex={-1} role="status" aria-live="polite">
          <div className="ok-ic" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </div>
          <h3>{status === "sent" ? L.okTitle : L.blockTitle}</h3>
          <p>{status === "sent" ? L.okText : L.blockText}</p>
          <a className="nhf-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            {status === "sent" ? L.okLink : L.blockLink}
          </a>
          <button type="button" className="nhf-again" onClick={() => setStatus("form")}>
            {L.again}
          </button>
        </div>
      )}
    </div>
  );
}

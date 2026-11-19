/**
 * Formular der SEO-Seite in drei Fassungen · v1.0 (19.11.2026)
 *   audit  → Abschnitt 3  (Website, E-Mail, wichtigste Leistung)
 *   short  → Abschnitt 14 (Website, E-Mail, Name)
 *   final  → Abschnitt 25 (Website, E-Mail, Name)
 * Pflicht sind nur Website und E-Mail. Aussehen und Zustände (Fehler, Laden,
 * Erfolg) sind fertig; der Versand selbst ist NICHT angeschlossen:
 * submitSeoLead() in lib/seoHooks.ts (FORM ADAPTER) sendet nichts.
 * v1.1 (19.11.2026): Honeypot, Fehlerzustand beim Versand, dataLayer-Ereignis
 * seo_form_submit mit form_id 1/2/3.
 * v1.2 (19.11.2026): freigegebener Fehlertext; E-Mail und Telefon darin als
 * mailto:/tel:-Links, Nummer ohne Umbruch.
 */
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { seoDe } from "../../content/seo-de";
import { SEO_FORM_ID, submitSeoLead, trackSeoEvent, type SeoFormVariant } from "../../lib/seoHooks";

const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9äöüß-]+\.)+[a-zäöü]{2,}([/?#].*)?$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD =
  "w-full min-h-[50px] rounded-2xl border bg-white px-4 py-3 text-[16px] text-ink placeholder:text-ink-faint outline-none transition focus:bg-white focus:ring-4";
const FIELD_OK = "border-ink/[0.14] focus:border-[#0071E3]/[0.65] focus:ring-[#0071E3]/[0.12]";
const FIELD_ERR = "border-[#B02E1F] focus:border-[#B02E1F] focus:ring-[#B02E1F]/[0.12]";
const LABEL = "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted";

type Props = {
  variant: SeoFormVariant;
  button: string;
  note: string;
  success: string;
  /** Drei kurze Zusagen im dunklen Kopf der Karte (nur Audit-Formular). */
  chips?: readonly string[];
  /** Kurze Zeile direkt unter dem Button (nur Abschluss-Formular). */
  underButton?: string;
};

function PrivacyNote({ note }: { note: string }) {
  const { privacyLinkText, privacyHref } = seoDe.forms;
  const at = note.indexOf(privacyLinkText);
  let body: ReactNode = note;
  if (at >= 0) {
    body = (
      <>
        {note.slice(0, at)}
        <Link to={privacyHref} className="-my-[14px] inline-block py-[14px] font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
          {privacyLinkText}
        </Link>
        {note.slice(at + privacyLinkText.length)}
      </>
    );
  }
  return <p className="text-[13px] leading-relaxed text-ink-muted">{body}</p>;
}


/**
 * Fehlertext beim Senden: E-Mail-Adresse und Telefonnummer aus seoDe.contact
 * werden zu Links (mailto:/tel:); die Nummer bricht nicht um.
 */
function SendErrorText({ text }: { text: string }) {
  const { email, emailHref, phone, phoneHref } = seoDe.contact;
  const parts = text.split(new RegExp(`(${[email, phone].map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`));
  return (
    <>
      {parts.map((part, i) =>
        part === email ? (
          <a key={i} href={emailHref} className="underline underline-offset-2">
            {part}
          </a>
        ) : part === phone ? (
          <a key={i} href={phoneHref} className="whitespace-nowrap underline underline-offset-2">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function SeoLeadForm({ variant, button, note, success, chips, underButton }: Props) {
  const { forms } = seoDe;
  const uid = useId();
  const extraField = variant === "audit" ? forms.service : forms.name;
  const [values, setValues] = useState({ website: "", email: "", extra: "" });
  const [touched, setTouched] = useState({ website: false, email: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [sendError, setSendError] = useState(false);
  /** Honeypot: für Menschen unsichtbar; nur Bots füllen es aus. */
  const [trap, setTrap] = useState("");
  const websiteRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors = {
    website: WEBSITE_RE.test(values.website.trim()) ? "" : forms.errorWebsite,
    email: EMAIL_RE.test(values.email.trim()) ? "" : forms.errorEmail,
  };
  const showError = {
    website: touched.website && Boolean(errors.website),
    email: touched.email && Boolean(errors.email),
  };

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setTouched({ website: true, email: true });
    if (errors.website) {
      websiteRef.current?.focus();
      return;
    }
    if (errors.email) {
      emailRef.current?.focus();
      return;
    }
    setSendError(false);
    setStatus("loading");
    if (trap.trim()) {
      // Honeypot gefüllt: so tun, als sei alles gesendet. Kein Versand, kein Tracking.
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      setStatus("success");
      return;
    }
    const extra = values.extra.trim();
    // FORM ADAPTER: submitSeoLead() in lib/seoHooks.ts sendet heute nichts.
    const result = await submitSeoLead({
      variant,
      website: values.website.trim(),
      email: values.email.trim(),
      ...(extra ? (variant === "audit" ? { service: extra } : { name: extra }) : {}),
    });
    if (result.ok) {
      trackSeoEvent("seo_form_submit", { form_id: SEO_FORM_ID[variant], form_variant: variant });
      setStatus("success");
    } else {
      // Formular bleibt bedienbar; Hinweis unter dem Button (TODO(copy) in seo-de.ts).
      setSendError(true);
      setStatus("idle");
    }
  }

  const loading = status === "loading";

  return (
    <div
      data-form={variant}
      data-state={status}
      className="relative z-[1] overflow-hidden rounded-[20px] border border-ink/10 bg-surface-2 text-left sm:rounded-[24px]"
    >

      {status === "success" ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="relative flex min-h-[320px] flex-col items-center justify-center p-7 text-center outline-none sm:p-10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#C2410C] text-white">
            <Check size={26} strokeWidth={2.4} aria-hidden />
          </span>
          <p className="balance mt-6 max-w-[34ch] text-[18px] font-semibold leading-snug tracking-tight text-ink sm:text-[20px]">
            {success}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative space-y-4 p-5 sm:p-7 md:p-8">
          {chips?.length ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 border-b border-ink/10 pb-4">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold leading-tight text-ink sm:text-[14px]"
                >
                  <span aria-hidden className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#FF7A45] text-white">
                    <Check size={9} strokeWidth={3.5} />
                  </span>
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Honeypot: außerhalb des Bildes, für Screenreader und Tastatur ausgeblendet. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor={`${uid}-hp`}>Bitte leer lassen</label>
            <input
              id={`${uid}-hp`}
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-website`} className={LABEL}>
              {forms.website.label}
              <span className="ml-1 text-ink-muted" aria-hidden>
                *
              </span>
            </label>
            <input
              ref={websiteRef}
              id={`${uid}-website`}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-required="true"
              placeholder={forms.website.placeholder}
              value={values.website}
              onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, website: true }))}
              aria-invalid={showError.website || undefined}
              aria-describedby={showError.website ? `${uid}-website-fehler` : undefined}
              className={`${FIELD} ${showError.website ? FIELD_ERR : FIELD_OK}`}
            />
            {showError.website ? (
              <p id={`${uid}-website-fehler`} role="alert" className="mt-1.5 text-[13px] font-semibold text-[#B02E1F]">
                {errors.website}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className={LABEL}>
              {forms.email.label}
              <span className="ml-1 text-ink-muted" aria-hidden>
                *
              </span>
            </label>
            <input
              ref={emailRef}
              id={`${uid}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-required="true"
              placeholder={forms.email.placeholder}
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={showError.email || undefined}
              aria-describedby={showError.email ? `${uid}-email-fehler` : undefined}
              className={`${FIELD} ${showError.email ? FIELD_ERR : FIELD_OK}`}
            />
            {showError.email ? (
              <p id={`${uid}-email-fehler`} role="alert" className="mt-1.5 text-[13px] font-semibold text-[#B02E1F]">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${uid}-extra`} className={LABEL}>
              {extraField.label}
            </label>
            <input
              id={`${uid}-extra`}
              name={variant === "audit" ? "service" : "name"}
              type="text"
              autoComplete={variant === "audit" ? "off" : "name"}
              placeholder={extraField.placeholder}
              value={values.extra}
              onChange={(e) => setValues((v) => ({ ...v, extra: e.target.value }))}
              className={`${FIELD} ${FIELD_OK}`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading || undefined}
            className="seo-btn-blue group !mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 text-[16px] font-semibold text-white hover:bg-[#0077ED] disabled:cursor-progress disabled:opacity-70"
          >
            {loading ? <Loader2 size={17} strokeWidth={2.4} className="seo-spinner" aria-hidden /> : null}
            {button}
            {loading ? null : (
              <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            )}
          </button>
          {sendError ? (
            <p role="alert" className="!mt-3 text-center text-[13px] font-semibold text-[#B02E1F]">
              <SendErrorText text={forms.errorSend} />
            </p>
          ) : null}
          {underButton ? (
            <p className="!mt-3 text-center text-[13px] font-semibold text-ink-soft">{underButton}</p>
          ) : null}

          <div className="space-y-2 pt-1">
            <PrivacyNote note={note} />
            <p className="text-[12px] text-ink-muted">{forms.required}</p>
          </div>
        </form>
      )}
    </div>
  );
}

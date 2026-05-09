import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { business } from "../content";
import { Reveal } from "../lib/Reveal";
import { useT, useLang } from "../lib/i18n";

export function Contact() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  const SERVICES = isEN
    ? ["SEO", "Google Ads", "Social Media", "Website", "Not sure yet"]
    : ["SEO", "Google Ads", "Social Media", "Website", "Noch unsicher"];
  const [submitted, setSubmitted] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" data-surface="light" className="surface-light relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
      <div className="container-v3 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left — editorial copy + contact tiles */}
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow text-ink-muted">{t.contact.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-5 max-w-[14ch] mx-auto lg:mx-0 balance text-ink"
              style={{
                fontSize: "clamp(34px, 6vw, 84px)",
                lineHeight: "1.04",
                letterSpacing: "-0.034em",
                fontWeight: 700,
              }}
            >
              {t.contact.headlinePre}
              <span className="text-ink/55"> {t.contact.headlineSoft}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[460px] mx-auto lg:mx-0 text-[15.5px] sm:text-[17px] text-ink-soft leading-relaxed">
              {t.contact.intro}
            </p>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {[
              {
                icon: <Phone size={18} />,
                label: isEN ? "Call" : "Anrufen",
                value: business.phone,
                caption: isEN ? "Mon–Fri, 9 am–6 pm" : "Mo–Fr, 9–18 Uhr",
                href: business.phoneHref,
              },
              {
                icon: <MessageCircle size={18} />,
                label: "WhatsApp",
                value: isEN ? "Send a message" : "Nachricht schreiben",
                caption: isEN ? "Reply within 1 h" : "Antwort innerhalb 1 h",
                href: business.whatsappHref,
                external: true,
                tone: "whatsapp" as const,
              },
              {
                icon: <Mail size={18} />,
                label: isEN ? "Email" : "E-Mail",
                value: business.email,
                caption: isEN ? "Reply within 24 h" : "Antwort innerhalb 24 h",
                href: business.emailHref,
              },
            ].map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: 0.18 + 0.07 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ContactTile {...tile} />
              </motion.div>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div
          id="contact-form"
          className="relative z-[45] scroll-mt-20 md:scroll-mt-28 overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#0071E3]/25 bg-white shadow-[0_34px_90px_-42px_rgba(0,113,227,0.55),0_18px_46px_-30px_rgba(38,39,47,0.34)]"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #0071E3 0%, #FF7A45 55%, #EC178D 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0071E3]/[0.12] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-[#FF7A45]/10 blur-3xl"
          />
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative space-y-4 p-5 pt-6 sm:p-7 sm:pt-8 md:p-8 md:pt-9"
              >
                <div className="rounded-[22px] bg-ink p-4 sm:p-5 text-white shadow-[0_22px_48px_-30px_rgba(0,0,0,0.65)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                        {isEN ? "Free consultation" : "Kostenloses Erstgespräch"}
                      </p>
                      <h3
                        className="mt-1.5 max-w-[16ch] text-white"
                        style={{
                          fontSize: "clamp(23px, 2.6vw, 30px)",
                          lineHeight: "1.04",
                          letterSpacing: "-0.03em",
                          fontWeight: 700,
                        }}
                      >
                        {isEN ? "Get a clear next step." : "Klarer nächster Schritt."}
                      </h3>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                    {(isEN
                      ? ["2 min", "24 h", "No pressure"]
                      : ["2 Min.", "24 h", "Kein Druck"]
                    ).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.12] bg-white/[0.08] px-2 py-1.5 text-center text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.10em] sm:tracking-[0.12em] text-white/[0.78]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Field label={t.contact.form.name} name="name" required>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className={inputCls}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <Field label={t.contact.form.email} name="email" required>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label={isEN ? "Phone (optional)" : "Telefon (optional)"}
                    name="phone"
                  >
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field
                  label={isEN ? "What do you need?" : "Was brauchen Sie?"}
                  name="service"
                >
                  <select
                    id="service"
                    name="service"
                    defaultValue={SERVICES[4]}
                    className={selectCls}
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label={isEN ? "Tell us briefly" : "Erzählen Sie kurz"}
                  name="message"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder={
                      isEN
                        ? "Where you are today, where you want to go, and what's in the way."
                        : "Wo Sie heute stehen, wo Sie hinwollen, und was im Weg steht."
                    }
                    className={`${inputCls} resize-none min-h-[76px] sm:min-h-[104px]`}
                  />
                </Field>

                {/* Honeypot — leeres Feld, das nur Bots ausfüllen. */}
                <label className="absolute -left-[9999px] opacity-0" aria-hidden>
                  {isEN ? "Please leave empty" : "Bitte leer lassen"}
                  <input
                    type="text"
                    tabIndex={-1}
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    autoComplete="off"
                  />
                </label>

                <button
                  type="submit"
                  className="group w-full mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-[15px] py-2.5 sm:py-3 transition-all duration-300 shadow-[0_18px_38px_-18px_rgba(0,113,227,0.85)] hover:-translate-y-0.5 hover:shadow-[0_24px_46px_-20px_rgba(0,113,227,0.95)]"
                >
                  {isEN ? "Request consultation" : "Erstgespräch anfragen"}{" "}
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <p className="inline-flex items-center gap-2 rounded-2xl bg-[#0071E3]/[0.07] px-3 py-2 text-[11.5px] font-semibold text-ink-soft">
                    <Check size={13} className="text-[#0071E3]" strokeWidth={2.6} />
                    {isEN ? "Founder reply" : "Antwort vom Gründer"}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-2xl bg-[#FF7A45]/[0.10] px-3 py-2 text-[11.5px] font-semibold text-ink-soft">
                    <Clock size={13} className="text-[#FF7A45]" strokeWidth={2.6} />
                    {isEN ? "No jargon" : "Kein Fachchinesisch"}
                  </p>
                </div>

                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {isEN
                    ? "By submitting you agree to be contacted about your enquiry."
                    : "Mit Absenden stimmen Sie zu, zu Ihrer Anfrage kontaktiert zu werden."}
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center p-6 sm:p-8 md:p-10"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
                  <Check size={26} strokeWidth={3} />
                </div>
                <h3 className="mt-5 text-[24px] font-extrabold text-ink">
                  {isEN ? "Enquiry received." : "Anfrage erhalten."}
                </h3>
                <p className="mt-2 text-ink-soft leading-relaxed">
                  {isEN
                    ? "A founder — not a salesperson — replies personally within 24 h on weekdays."
                    : "Ein Gründer — kein Vertriebler — antwortet persönlich innerhalb 24 h werktags."}
                </p>

                <div className="mt-7 rounded-2xl border border-ink/10 bg-surface-2 p-5 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/8 text-ink">
                      <Clock size={15} strokeWidth={2.4} />
                    </span>
                    <div className="text-[13px] text-ink-soft leading-relaxed">
                      <p className="font-bold text-ink">
                        {isEN ? "Reply within 24 h" : "Antwort innerhalb 24 h"}
                      </p>
                      <p>
                        {isEN
                          ? "On weekdays. Audit comes in a 30-minute screen share."
                          : "Werktags. Audit gibt's im 30-Min-Screen-Share."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/8 text-ink">
                      <Phone size={14} strokeWidth={2.4} />
                    </span>
                    <div className="text-[13px] text-ink-soft leading-relaxed">
                      <p className="font-bold text-ink">
                        {isEN ? "Save the number" : "Nummer speichern"}
                      </p>
                      <p>
                        {isEN ? "Callbacks come from " : "Rückrufe kommen von "}
                        <a
                          href={business.phoneHref}
                          className="text-ink underline underline-offset-2 hover:opacity-80"
                        >
                          {business.phone}
                        </a>
                        {isEN
                          ? ". If we call, that's us."
                          : ". Wenn wir anrufen, sind wir das."}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-6 inline-flex"
                >
                  <MessageCircle size={14} />{" "}
                  {isEN ? "Or message on WhatsApp" : "Oder direkt per WhatsApp"}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-2xl border border-ink/[0.12] bg-[#F8FAFC] px-3.5 sm:px-4 py-2.5 sm:py-3.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition focus:border-[#0071E3]/[0.65] focus:bg-white focus:ring-4 focus:ring-[#0071E3]/[0.10]";

const selectCls = `${inputCls} pr-10`;

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="block text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-ink-muted mb-1.5">
        {label}
        {required && <span className="text-ink-faint ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactTile({
  icon,
  label,
  value,
  caption,
  href,
  external,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
  href: string;
  external?: boolean;
  tone?: "whatsapp";
}) {
  const ring = tone === "whatsapp" ? "hover:border-dm-whatsapp/55" : "hover:border-ink/30";
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group flex flex-col items-center text-center gap-3 sm:flex-row sm:text-left sm:gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:p-5 transition hover:bg-surface-2 hover:-translate-y-0.5 shadow-card ${ring}`}
      >
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
            tone === "whatsapp" ? "bg-dm-whatsapp/15 text-dm-whatsapp" : "bg-ink/8 text-ink"
          }`}
        >
          {icon}
        </span>
        <div className="sm:flex-1 sm:min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
            {label}
          </p>
          <p className="text-[16px] sm:text-[17px] font-bold text-ink mt-0.5 sm:truncate">{value}</p>
          <p className="text-[11.5px] text-ink-muted mt-0.5">{caption}</p>
        </div>
      </a>
    </li>
  );
}

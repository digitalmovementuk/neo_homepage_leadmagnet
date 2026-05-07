import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { business } from "../content";
import { useT, useLang } from "../lib/i18n";

function IGIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function FBIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-7.5h2.6l.4-3h-3V9.6c0-.87.27-1.46 1.52-1.46H17V5.4c-.3-.04-1.27-.13-2.4-.13-2.37 0-4 1.45-4 4.1V11.5H8v3h2.6V22h2.9z" />
    </svg>
  );
}

export function Footer() {
  const t = useT();
  const { lang } = useLang();
  const isEN = lang === "en";
  return (
    <footer
      id="footer"
      data-surface="light"
      className="bg-surface-2 text-ink pt-16 sm:pt-20 md:pt-24 pb-10"
    >
      <div className="container-v3">
        {/* Top row: brand + headline ribbon */}
        <div className="flex flex-col items-center lg:items-end lg:flex-row lg:justify-between text-center lg:text-left gap-8 pb-12 sm:pb-16 border-b border-ink/10">
          <div className="max-w-[460px]">
            <img
              src={`${import.meta.env.BASE_URL}brand/logo-color-positive.png`}
              alt="NEO THE AGENCY"
              className="h-8 w-auto mx-auto lg:mx-0"
            />
            <p className="mt-5 text-[14px] sm:text-[15px] text-ink-soft leading-relaxed">
              {t.footer.blurb}
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-ink hover:text-ink-soft transition-colors"
          >
            {isEN ? "Start a project" : "Projekt starten"}{" "}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Sitemap grid */}
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4 pt-12 sm:pt-14 text-center sm:text-left">
          {t.footer.sections.map((section) => (
            <Column key={section.title} heading={section.title}>
              <ul className="space-y-2.5">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Column>
          ))}

          <Column heading={isEN ? "Contact" : "Kontakt"}>
            <ul className="space-y-3 flex flex-col items-center sm:items-start">
              <li>
                <a
                  href={business.phoneHref}
                  className={`${linkCls} inline-flex items-center gap-2`}
                >
                  <Phone
                    size={13}
                    strokeWidth={2.2}
                    className="text-ink-faint"
                  />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className={`${linkCls} inline-flex items-center gap-2 break-all`}
                >
                  <Mail
                    size={13}
                    strokeWidth={2.2}
                    className="text-ink-faint"
                  />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkCls} inline-flex items-center gap-2`}
                >
                  {isEN ? "Message on WhatsApp" : "WhatsApp schreiben"}
                </a>
              </li>
            </ul>
          </Column>

          <Column heading={isEN ? "Office" : "Büro"}>
            <address className="not-italic text-[13.5px] text-ink-soft leading-relaxed flex justify-center sm:justify-start gap-2">
              <MapPin
                size={13}
                strokeWidth={2.2}
                className="mt-1 flex-shrink-0 text-ink-faint"
              />
              <span>
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {isEN ? "Germany" : business.address.country}
              </span>
            </address>

            <div className="mt-6 flex items-center justify-center sm:justify-start gap-3">
              {business.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink-soft hover:text-ink hover:border-ink/45 transition"
                >
                  {s.label === "Instagram" ? (
                    <IGIcon size={15} />
                  ) : (
                    <FBIcon size={15} />
                  )}
                </a>
              ))}
            </div>
          </Column>
        </div>

        {/* Legal strip */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-ink/10 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 text-[12px] text-ink-muted text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {business.name}.{" "}
            {isEN ? "All rights reserved." : "Alle Rechte vorbehalten."}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {t.footer.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-ink">
                {l.label}
              </a>
            ))}
            <span className="text-ink-faint">·</span>
            <span>{isEN ? "Germany" : "Deutschland"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const linkCls = "text-[13.5px] text-ink-soft hover:text-ink transition-colors";

function Column({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10.5px] font-bold uppercase tracking-[0.20em] text-ink-muted mb-4">
        {heading}
      </p>
      {children}
    </div>
  );
}

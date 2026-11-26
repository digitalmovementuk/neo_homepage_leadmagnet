/**
 * Abschnitt 26 · Fußbereich der SEO-Seite · v1.1 (22.11.2026)
 * v1.1: Block „Bewerten Sie uns" (PlatformReviewLinks) mit allen Profilen ersetzt die YouTube/Facebook-Knöpfe.
 * Gleicher Aufbau wie der Fußbereich der Startseite, deutsche Texte.
 */
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { anchors, seoDe } from "../../content/seo-de";
import { asset, SiteLink } from "./ui";
import { PlatformReviewLinks } from "../PlatformReviewLinks";

const COL_HEAD = "mb-3 text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted";
const COL_LINK =
  "inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-ink sm:min-h-[36px]";

export function SeoFooter() {
  const { footer, header, contact } = seoDe;
  return (
    <footer id="footer" data-surface="light" className="bg-surface-2 pb-32 pt-16 text-ink sm:pb-36 sm:pt-20 md:pt-24">
      <div className="container-v3">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <Link to="/" className="inline-flex min-h-[44px] items-center">
              <img
                src={asset("brand/neo-logo-light.svg")}
                alt={footer.logoAlt}
                width={757}
                height={110}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto"
                draggable={false}
              />
            </Link>
            <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft lg:mx-0">{footer.blurb}</p>
          </div>
          <a
            href={`#${anchors.finalCta}`}
            className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-ink"
          >
            {footer.startLink}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid gap-10 pt-12 text-center sm:grid-cols-2 sm:gap-12 sm:pt-14 sm:text-left lg:grid-cols-4">
          <nav aria-label={footer.servicesTitle}>
            <h2 className={COL_HEAD}>{footer.servicesTitle}</h2>
            <ul>
              {header.services.map((item) => (
                <li key={item.label}>
                  <SiteLink to={item.to} hash={item.hash} className={COL_LINK}>
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={footer.agencyTitle}>
            <h2 className={COL_HEAD}>{footer.agencyTitle}</h2>
            <ul>
              {header.links.map((item) => (
                <li key={item.label}>
                  <SiteLink to={item.to} hash={item.hash} className={COL_LINK}>
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={COL_HEAD}>{footer.contactTitle}</h2>
            <ul>
              <li>
                <a href={contact.phoneHref} className={COL_LINK}>
                  <Phone size={13} className="text-ink-faint" aria-hidden />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className={COL_LINK}>
                  <Mail size={13} className="text-ink-faint" aria-hidden />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={COL_LINK}
                >
                  <MessageCircle size={13} className="text-ink-faint" aria-hidden />
                  {footer.whatsappLine}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={COL_HEAD}>{footer.officeTitle}</h2>
            <address className="inline-flex items-start gap-2 text-[14px] not-italic leading-relaxed text-ink-soft">
              <MapPin size={13} className="mt-1.5 text-ink-faint" aria-hidden />
              <span className="text-left">
                {contact.street}
                <br />
                {contact.city}
              </span>
            </address>
          </div>
        </div>

        <PlatformReviewLinks forceDe />

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-[13px] text-ink-muted sm:mt-12 sm:flex-row">
          <p className="text-center sm:text-left">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="inline-flex min-h-[44px] items-center transition-colors hover:text-ink">
              {footer.impressum}
            </Link>
            <Link to="/datenschutz" className="inline-flex min-h-[44px] items-center transition-colors hover:text-ink">
              {footer.datenschutz}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

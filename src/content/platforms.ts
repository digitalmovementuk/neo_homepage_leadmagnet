/**
 * Bewertungs- und Profilplattformen + Social-Profile von NEO THE AGENCY · v1.2 (24.11.2026)
 * Eine Quelle für: Vertrauensleiste im ersten Bildschirm, Bewertungsblock im Fußbereich
 * und Organization.sameAs im strukturierten Datensatz (JSON-LD).
 * Nur geprüfte Adressen. Keine Sterne, Punktzahlen oder Bewertungsanzahlen (es gibt noch keine echten Bewertungen).
 *
 * Changelog
 * - v1.2 (24.11.2026): sameAs nutzt die eigene Canonical-Adresse jedes Profils (sameAsUrl: ProvenExpert /de-de/,
 *   YouTube-Kanal-ID, Hotfrog lange Adresse). LinkedIn-Unternehmensseite (ORG_LINKEDIN, live geprüft: NEO THE AGENCY,
 *   Kolonnenstraße 8, Berlin) ergänzt. Sortlist aus sameAs genommen (inSameAs: false), weil sortlist.com und .de am
 *   24.11.2026 „agency doesn't exist" (404) zeigen. Sichtbare Leisten und Links unverändert.
 * - v1.1 (24.11.2026): DIRECTORY_PROFILES (Hotfrog, live geprüft) ergänzt, fließt nur in sameAs; sichtbare Leisten unverändert.
 * - v1.0 (22.11.2026): Trustpilot, ProvenExpert, Sortlist, wlw + Instagram, Facebook, YouTube; Gründer-LinkedIn.
 */

export const ORG_ID = "https://www.neotheagency.de/#organization";
export const PERSON_ID = "https://www.neotheagency.de/#raoul-mueller";

export type Platform = {
  key: "trustpilot" | "provenexpert" | "sortlist" | "wlw";
  name: string;
  profileUrl: string;
  reviewUrl: string;
  /** true, wenn die Plattform eine eigene Seite zum Bewerten hat */
  hasReviewForm: boolean;
  logo: string;
  logoWhite: string;
  width: number;
  height: number;
  altDe: string;
  altEn: string;
  /** Eigene Canonical-Adresse der Profilseite für sameAs, falls sie vom sichtbaren Link abweicht. */
  sameAsUrl?: string;
  /** false = nicht in sameAs / robots.txt / llms.txt (Profil gerade nicht erreichbar). */
  inSameAs?: boolean;
};

export const PLATFORMS: Platform[] = [
  {
    key: "trustpilot",
    name: "Trustpilot",
    profileUrl: "https://www.trustpilot.com/review/neotheagency.de",
    reviewUrl: "https://www.trustpilot.com/evaluate/neotheagency.de",
    hasReviewForm: true,
    logo: "logos/platforms/trustpilot.svg",
    logoWhite: "logos/platforms/trustpilot-white.svg",
    width: 140,
    height: 34,
    altDe: "Trustpilot Logo",
    altEn: "Trustpilot logo",
  },
  {
    key: "provenexpert",
    name: "ProvenExpert",
    profileUrl: "https://www.provenexpert.com/neo-the-agency/",
    reviewUrl: "https://www.provenexpert.com/neo-the-agency/582u/",
    sameAsUrl: "https://www.provenexpert.com/de-de/neo-the-agency/",
    hasReviewForm: true,
    logo: "logos/platforms/provenexpert.svg",
    logoWhite: "logos/platforms/provenexpert-white.svg",
    width: 168,
    height: 35,
    altDe: "ProvenExpert Logo",
    altEn: "ProvenExpert logo",
  },
  {
    key: "sortlist",
    name: "Sortlist",
    profileUrl: "https://www.sortlist.com/agency/neo-the-agency",
    reviewUrl: "https://www.sortlist.com/agency/neo-the-agency/review",
    // 24.11.2026: sortlist.com und sortlist.de zeigen „agency doesn't exist" (404) → nicht in sameAs, bis das Profil wieder lädt.
    inSameAs: false,
    hasReviewForm: true,
    logo: "logos/platforms/sortlist.svg",
    logoWhite: "logos/platforms/sortlist-white.svg",
    width: 284,
    height: 72,
    altDe: "Sortlist Logo",
    altEn: "Sortlist logo",
  },
  {
    key: "wlw",
    name: "wlw",
    profileUrl: "https://www.wlw.de/de/firma/neo-the-agency-22435144",
    reviewUrl: "https://www.wlw.de/de/firma/neo-the-agency-22435144",
    hasReviewForm: false,
    logo: "logos/platforms/wlw.svg",
    logoWhite: "logos/platforms/wlw-white.svg",
    width: 106,
    height: 40,
    altDe: "wlw (Wer liefert was) Logo",
    altEn: "wlw (Wer liefert was) logo",
  },
];

export type Social = {
  key: "instagram" | "facebook" | "youtube";
  name: string;
  url: string;
  /** Eigene Canonical-Adresse der Profilseite für sameAs, falls sie vom sichtbaren Link abweicht. */
  sameAsUrl?: string;
};

export const SOCIALS: Social[] = [
  { key: "instagram", name: "Instagram", url: "https://www.instagram.com/neotheagency.de/" },
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/p/NEO-The-Agency-61588285349359/" },
  {
    key: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@neotheagency",
    sameAsUrl: "https://www.youtube.com/channel/UC3CeypgZBXXlulyqtEkuiSA",
  },
];

/** LinkedIn des Gründers – gehört an den Person-Knoten, nicht an die Organisation. */
export const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/raoulmueller";

/**
 * LinkedIn-Unternehmensseite von NEO THE AGENCY (live geprüft 24.11.2026: Berlin, Kolonnenstraße 8, Website neotheagency.de).
 * Nur sameAs, robots.txt-Kommentar und llms.txt – wird NICHT sichtbar angezeigt. Nie /company/neotheagency verwenden (das ist Digital Movement UK).
 */
export const ORG_LINKEDIN = "https://www.linkedin.com/company/neo-the-agency/";

/**
 * Branchenverzeichnisse mit live geprüftem NEO-Eintrag (Name, Adresse, Telefon passen).
 * Nur für sameAs, robots.txt-Kommentar und llms.txt – wird NICHT sichtbar angezeigt.
 * Neue Einträge erst nach Live-Prüfung aufnehmen (Liste: NEO-oeffentliche-links-2026-11-24.md).
 */
export const DIRECTORY_PROFILES: string[] = [
  // Canonical-Adresse der Hotfrog-Seite (live geprüft 24.11.2026)
  "https://www.hotfrog.de/company/AaIOiKj7cWG-UnaRBU1CjA/neo-the-agency/berlin/advertising-services",
];

/**
 * Alle Profile der Organisation für schema.org sameAs, jeweils mit der eigenen Canonical-Adresse der Profilseite.
 * Gleiche Liste in index.html, public/robots.txt und public/llms.txt (bei Änderungen alle vier anpassen).
 */
export const ORG_SAME_AS: string[] = [
  ...SOCIALS.map((s) => s.sameAsUrl ?? s.url),
  ORG_LINKEDIN,
  ...PLATFORMS.filter((p) => p.inSameAs !== false).map((p) => p.sameAsUrl ?? p.profileUrl),
  ...DIRECTORY_PROFILES,
];

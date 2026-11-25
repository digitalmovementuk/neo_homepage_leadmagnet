/**
 * Bewertungs- und Profilplattformen + Social-Profile von NEO THE AGENCY · v1.7 (25.11.2026)
 * Eine Quelle für: Vertrauensleiste im ersten Bildschirm, Bewertungsblock im Fußbereich
 * und Organization.sameAs im strukturierten Datensatz (JSON-LD).
 * Nur geprüfte Adressen. Keine Sterne, Punktzahlen oder Bewertungsanzahlen (es gibt noch keine echten Bewertungen).
 *
 * Changelog
 * - v1.7 (25.11.2026): Clutch ergänzt (Bewertungsformular review.clutch.co, provider_id 2778599, nennt NEO THE AGENCY).
 *   Fußbereich + Hero-Band. inSameAs false, weil es noch keine öffentliche Clutch-Profilseite gibt (ein Formular ist kein Profil).
 *   Logo: offizielle Datei von clutch.co. DesignRush noch nicht sichtbar: Profil laut DesignRush-Mail „under review“,
 *   öffentliche Seite zeigt 404; aufnehmen, sobald das Profil freigeschaltet und live geprüft ist.
 * - v1.6 (25.11.2026): Facebook als Bewertungsplattform ergänzt (abgemeldet geprüft: Seite neotheagencyde zeigt
 *   „Not yet rated (0 reviews)“, Bewerten nach kostenloser Anmeldung). Nur Fußbereich: showInHero false, weil im
 *   Hero-Band „As seen on“ nur fremde Plattformen stehen, nie eigene Social-Profile; inSameAs false, weil Facebook
 *   schon über SOCIALS in sameAs steht. Tupalo: Bewerten mit kostenlosem Konto möglich, darum jetzt im Fußbereich.
 * - v1.4 (25.11.2026): Hotfrog, ShowMeLocal, Tupalo und 11880 sichtbar ergänzt (Leiste + Fußbereich, je live geprüft:
 *   Name, Kolonnenstraße 8, Berlin). Hotfrog dafür aus DIRECTORY_PROFILES genommen (sonst doppelt in sameAs).
 *   Tupalo: Bewerten nur nach Anmeldung, darum „Profil ansehen“. Logos: offizielle Dateien der Plattformen
 *   (11880 SVG, Hotfrog PNG, Tupalo SVG von tupalo.de, ShowMeLocal-Bildmarke + Schriftzug).
 * - v1.5 (25.11.2026): Branchenbuch Deutschland ergänzt (live geprüft: Name, Kolonnenstraße 8, 10827 Berlin, Telefon,
 *   Website passen). Keine Bewertungsseite, darum nur Hero-Kacheln und sameAs, nicht im Fußbereich. Logo: offizielle Datei.
 * - v1.3 (25.11.2026): Sortlist-Adresse korrigiert (/agency/neotheagency statt /agency/neo-the-agency, live geprüft:
 *   Profil lädt, Bewertungsseite /review lädt) und wieder in sameAs aufgenommen.
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
  key: "trustpilot" | "provenexpert" | "sortlist" | "wlw" | "hotfrog" | "showmelocal" | "tupalo" | "11880" | "branchenbuchdeutschland" | "clutch" | "facebook";
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
  /** false = nicht in sameAs / robots.txt / llms.txt (Profil gerade nicht erreichbar oder schon über SOCIALS enthalten). */
  inSameAs?: boolean;
  /** false = nicht im Hero-Band „Gesehen auf“ und nicht in der Vertrauensleiste (eigene Social-Profile). */
  showInHero?: boolean;
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
    profileUrl: "https://www.sortlist.com/agency/neotheagency",
    reviewUrl: "https://www.sortlist.com/agency/neotheagency/review",
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
  {
    key: "hotfrog",
    name: "Hotfrog",
    profileUrl: "https://www.hotfrog.de/company/AaIOiKj7cWG-UnaRBU1CjA/neo-the-agency/berlin/advertising-services",
    reviewUrl: "https://www.hotfrog.de/review/AaIOiKj7cWG-UnaRBU1CjA",
    hasReviewForm: true,
    logo: "logos/platforms/hotfrog.svg",
    logoWhite: "logos/platforms/hotfrog-white.svg",
    width: 230,
    height: 63,
    altDe: "Hotfrog Logo",
    altEn: "Hotfrog logo",
  },
  {
    key: "showmelocal",
    name: "ShowMeLocal",
    profileUrl: "https://global.showmelocal.com/40534185-neo-the-agency-advertising-agency-berlin",
    reviewUrl: "https://global.showmelocal.com/postareview.aspx?bid=40534185",
    hasReviewForm: true,
    logo: "logos/platforms/showmelocal.svg",
    logoWhite: "logos/platforms/showmelocal-white.svg",
    width: 218,
    height: 40,
    altDe: "ShowMeLocal Logo",
    altEn: "ShowMeLocal logo",
  },
  {
    key: "tupalo",
    name: "Tupalo",
    profileUrl: "https://www.tupalo.de/berlin/neo-the-agency",
    reviewUrl: "https://www.tupalo.de/berlin/neo-the-agency",
    hasReviewForm: true,
    logo: "logos/platforms/tupalo.svg",
    logoWhite: "logos/platforms/tupalo-white.svg",
    width: 137,
    height: 44,
    altDe: "Tupalo Logo",
    altEn: "Tupalo logo",
  },
  {
    key: "11880",
    name: "11880.com",
    profileUrl: "https://www.11880.com/branchenbuch/berlin/534146917B114308011/neo-the-agency.html",
    reviewUrl: "https://www.11880.com/branchenbuch/berlin/534146917B114308011/neo-the-agency.html#jetzt-bewerten",
    hasReviewForm: true,
    logo: "logos/platforms/11880.svg",
    logoWhite: "logos/platforms/11880-white.svg",
    width: 88,
    height: 40,
    altDe: "11880.com Logo",
    altEn: "11880.com logo",
  },
  {
    key: "branchenbuchdeutschland",
    name: "Branchenbuch Deutschland",
    profileUrl: "https://www.branchenbuchdeutschland.de/branchenbuch/eintrag/neo-the-agency-berlin-103670504.html",
    reviewUrl: "https://www.branchenbuchdeutschland.de/branchenbuch/eintrag/neo-the-agency-berlin-103670504.html",
    hasReviewForm: false,
    logo: "logos/platforms/branchenbuchdeutschland.svg",
    logoWhite: "logos/platforms/branchenbuchdeutschland-white.svg",
    width: 456,
    height: 111,
    altDe: "Branchenbuch Deutschland Logo",
    altEn: "Branchenbuch Deutschland logo",
  },
  {
    key: "clutch",
    name: "Clutch",
    profileUrl: "https://review.clutch.co/review?provider_id=2778599",
    reviewUrl: "https://review.clutch.co/review?provider_id=2778599",
    hasReviewForm: true,
    /** Noch keine öffentliche Profilseite, nur das Bewertungsformular: darum nicht in sameAs. */
    inSameAs: false,
    logo: "logos/platforms/clutch.svg",
    logoWhite: "logos/platforms/clutch-white.svg",
    width: 406,
    height: 115,
    altDe: "Clutch Logo",
    altEn: "Clutch logo",
  },
  {
    key: "facebook",
    name: "Facebook",
    profileUrl: "https://www.facebook.com/p/NEO-The-Agency-61588285349359/",
    reviewUrl: "https://www.facebook.com/neotheagencyde/reviews",
    hasReviewForm: true,
    showInHero: false,
    inSameAs: false,
    logo: "logos/platforms/facebook.svg",
    logoWhite: "logos/platforms/facebook-white.svg",
    width: 886,
    height: 158,
    altDe: "Facebook Logo",
    altEn: "Facebook logo",
  },
];

/** Plattformen für das Hero-Band „Gesehen auf“ und die Vertrauensleiste: nur fremde Plattformen, keine eigenen Social-Profile. */
export const HERO_PLATFORMS: Platform[] = PLATFORMS.filter((p) => p.showInHero !== false);

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
  // Hotfrog ist seit v1.4 eine sichtbare Plattform (PLATFORMS) und steht dort in sameAs.
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

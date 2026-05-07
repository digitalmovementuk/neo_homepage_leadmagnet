/**
 * Country dialing-code list for the contact form's phone-prefix dropdown.
 * Ordered by Neo's likely audience (DACH region first, then UK + major
 * markets), with HKD-related markets included to match the currency list.
 */

export type CountryDial = {
  code: string // ISO 3166-1 alpha-2
  flag: string // emoji flag
  dial: string // E.164 prefix incl. plus sign
  name: { de: string; en: string }
}

export const COUNTRY_DIALS: CountryDial[] = [
  { code: 'DE', flag: '🇩🇪', dial: '+49', name: { de: 'Deutschland', en: 'Germany' } },
  { code: 'AT', flag: '🇦🇹', dial: '+43', name: { de: 'Österreich', en: 'Austria' } },
  { code: 'CH', flag: '🇨🇭', dial: '+41', name: { de: 'Schweiz', en: 'Switzerland' } },
  { code: 'GB', flag: '🇬🇧', dial: '+44', name: { de: 'Vereinigtes Königreich', en: 'United Kingdom' } },
  { code: 'US', flag: '🇺🇸', dial: '+1', name: { de: 'USA', en: 'United States' } },
  { code: 'CA', flag: '🇨🇦', dial: '+1', name: { de: 'Kanada', en: 'Canada' } },
  { code: 'FR', flag: '🇫🇷', dial: '+33', name: { de: 'Frankreich', en: 'France' } },
  { code: 'IT', flag: '🇮🇹', dial: '+39', name: { de: 'Italien', en: 'Italy' } },
  { code: 'ES', flag: '🇪🇸', dial: '+34', name: { de: 'Spanien', en: 'Spain' } },
  { code: 'NL', flag: '🇳🇱', dial: '+31', name: { de: 'Niederlande', en: 'Netherlands' } },
  { code: 'BE', flag: '🇧🇪', dial: '+32', name: { de: 'Belgien', en: 'Belgium' } },
  { code: 'DK', flag: '🇩🇰', dial: '+45', name: { de: 'Dänemark', en: 'Denmark' } },
  { code: 'SE', flag: '🇸🇪', dial: '+46', name: { de: 'Schweden', en: 'Sweden' } },
  { code: 'NO', flag: '🇳🇴', dial: '+47', name: { de: 'Norwegen', en: 'Norway' } },
  { code: 'FI', flag: '🇫🇮', dial: '+358', name: { de: 'Finnland', en: 'Finland' } },
  { code: 'IE', flag: '🇮🇪', dial: '+353', name: { de: 'Irland', en: 'Ireland' } },
  { code: 'PT', flag: '🇵🇹', dial: '+351', name: { de: 'Portugal', en: 'Portugal' } },
  { code: 'PL', flag: '🇵🇱', dial: '+48', name: { de: 'Polen', en: 'Poland' } },
  { code: 'AU', flag: '🇦🇺', dial: '+61', name: { de: 'Australien', en: 'Australia' } },
  { code: 'NZ', flag: '🇳🇿', dial: '+64', name: { de: 'Neuseeland', en: 'New Zealand' } },
  { code: 'JP', flag: '🇯🇵', dial: '+81', name: { de: 'Japan', en: 'Japan' } },
  { code: 'CN', flag: '🇨🇳', dial: '+86', name: { de: 'China', en: 'China' } },
  { code: 'HK', flag: '🇭🇰', dial: '+852', name: { de: 'Hongkong', en: 'Hong Kong' } },
  { code: 'SG', flag: '🇸🇬', dial: '+65', name: { de: 'Singapur', en: 'Singapore' } },
  { code: 'AE', flag: '🇦🇪', dial: '+971', name: { de: 'VAE', en: 'United Arab Emirates' } },
]

export function defaultCountryByLang(lang: 'de' | 'en'): CountryDial {
  return lang === 'de' ? COUNTRY_DIALS[0]! : COUNTRY_DIALS[3]! // DE for German, GB for English
}

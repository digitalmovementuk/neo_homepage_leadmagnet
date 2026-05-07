/**
 * Top-10 currencies offered in the SEO Analyser. The list ordering puts
 * Neo's likely audience first (EUR, GBP) then USD and other major reserve
 * currencies, with HKD explicitly included per product brief.
 */

import type { Lang } from '../../lib/translations'

export type CurrencyOption = {
  code: string
  symbol: string
  name: { de: string; en: string }
  /** Reasonable industry-agnostic AOV prefill in this currency. */
  defaultAov: number
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'EUR', symbol: '€', name: { de: 'Euro', en: 'Euro' }, defaultAov: 100 },
  { code: 'GBP', symbol: '£', name: { de: 'Britisches Pfund', en: 'British Pound' }, defaultAov: 80 },
  { code: 'USD', symbol: '$', name: { de: 'US-Dollar', en: 'US Dollar' }, defaultAov: 100 },
  { code: 'CHF', symbol: 'CHF', name: { de: 'Schweizer Franken', en: 'Swiss Franc' }, defaultAov: 100 },
  { code: 'CAD', symbol: 'CA$', name: { de: 'Kanadischer Dollar', en: 'Canadian Dollar' }, defaultAov: 130 },
  { code: 'AUD', symbol: 'A$', name: { de: 'Australischer Dollar', en: 'Australian Dollar' }, defaultAov: 150 },
  { code: 'JPY', symbol: '¥', name: { de: 'Japanischer Yen', en: 'Japanese Yen' }, defaultAov: 14000 },
  { code: 'CNY', symbol: '¥', name: { de: 'Chinesischer Yuan', en: 'Chinese Yuan' }, defaultAov: 700 },
  { code: 'HKD', symbol: 'HK$', name: { de: 'Hongkong-Dollar', en: 'Hong Kong Dollar' }, defaultAov: 800 },
  { code: 'SGD', symbol: 'S$', name: { de: 'Singapur-Dollar', en: 'Singapore Dollar' }, defaultAov: 130 },
]

export function getCurrency(code: string): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!
}

export function formatMoney(amount: number, currency: string, lang: Lang): string {
  const numLocale = lang === 'de' ? 'de-DE' : 'en-GB'
  try {
    return new Intl.NumberFormat(numLocale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    // Unknown currency code — fall back to symbol + integer
    const cur = getCurrency(currency)
    return `${cur.symbol}${Math.round(amount).toLocaleString(numLocale)}`
  }
}

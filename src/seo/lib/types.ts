export type RankBand = 'top3' | 'page1' | 'page2-3' | 'page4plus' | 'unranked'

export interface KeywordRow {
  keyword: string
  monthlySearches: number
  currentRankBand: RankBand
  estCurrentClicks: number
  estPage1Clicks: number
  /** Money on the table, in the result's currency. */
  estMonthlyValue: number
  intent: 'transactional' | 'commercial' | 'informational' | 'navigational'
}

export interface CompetitorRow {
  domain: string
  reasonTheyWin: string
}

export interface Blocker {
  title: string
  detail: string
  impact: 'high' | 'medium' | 'low'
}

export interface Calculation {
  conversionRateUsed: number
  aovUsed: number
  ctrCurveSource: string
  notes: string
}

export interface PageSpeedSummary {
  performance: number
  seo: number
  lcpMs: number
  cls: number
  inpMs: number | null
}

export interface AnalysisResult {
  domain: string
  /** ISO 4217 code echoed from the request (EUR, GBP, USD, …). */
  currency: string
  inferredIndustry: string
  inferredLocation: string
  /** Total monthly revenue opportunity, in `currency`. */
  monthlyOpportunity: number
  current: {
    estMonthlyTrafficValue: number
    estMonthlyClicks: number
  }
  projected: {
    estMonthlyTrafficValue: number
    estMonthlyClicks: number
    timelineDays: number
  }
  keywords: KeywordRow[]
  competitors: CompetitorRow[]
  blockers: Blocker[]
  calculation: Calculation
  pageSpeed: {
    mobile: PageSpeedSummary
    desktop: PageSpeedSummary
  } | null
  generatedAt: string
}

export interface AnalyseRequest {
  domain: string
  /** ISO 4217 currency code, e.g. "EUR". */
  currency: string
  /** Visitor → customer conversion rate as a fraction (0.03 = 3%). */
  conversionRate: number
  /** Average order/sale/lead value in `currency`. */
  aov: number
  /** Optional free-text industry hint (e.g. "dentist", "B2B SaaS"). */
  industryHint?: string
}

export type AnalyseResponse =
  | { ok: true; result: AnalysisResult }
  | { ok: false; error: string; code: 'invalid_domain' | 'fetch_failed' | 'llm_failed' | 'rate_limited' | 'server_error' }

export type RankBand = 'top3' | 'page1' | 'page2-3' | 'page4plus' | 'unranked'

export interface KeywordRow {
  keyword: string
  monthlySearches: number
  /** Semrush Keyword Difficulty 0–100. */
  keywordDifficulty: number
  currentRankBand: RankBand
  /** Live Semrush organic position (1–100), or null if not in top 100. */
  currentPosition: number | null
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

export interface AnalysisResult {
  domain: string | null
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
  /** Always null — this analyser is Semrush-only, no Lighthouse signals. */
  pageSpeed: null
  generatedAt: string
  /** Always 'semrush' — disclosed for trust. */
  source: 'semrush'
}

export interface AnalyseRequest {
  /** Optional — analyser falls back to MODE B (industry hint only) if missing. */
  domain?: string
  /** ISO 4217 currency code, e.g. "EUR". */
  currency: string
  /** Visitor → customer conversion rate as a fraction (0.03 = 3%). */
  conversionRate: number
  /** Average order/sale/lead value in `currency`. */
  aov: number
  /** Optional free-text industry hint (e.g. "dentist", "B2B SaaS"). */
  industryHint?: string
  /** Optional Semrush database override (us, uk, de, …). Defaults from currency. */
  database?: string
}

export type AnalyseResponse =
  | { ok: true; result: AnalysisResult }
  | { ok: false; error: string; code: 'invalid_domain' | 'fetch_failed' | 'rate_limited' | 'server_error' | 'no_data' }

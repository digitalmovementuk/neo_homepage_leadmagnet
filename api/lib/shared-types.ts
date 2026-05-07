export type RankBand = 'top3' | 'page1' | 'page2-3' | 'page4plus' | 'unranked'

export interface KeywordRow {
  keyword: string
  monthlySearches: number
  currentRankBand: RankBand
  estCurrentClicks: number
  estPage1Clicks: number
  estMonthlyValueGbp: number
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
  industryConversionRate: number
  industryAovGbp: number
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
  inferredIndustry: string
  inferredLocation: string
  monthlyOpportunityGbp: number
  current: {
    estMonthlyTrafficValueGbp: number
    estMonthlyClicks: number
  }
  projected: {
    estMonthlyTrafficValueGbp: number
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
}

export type AnalyseResponse =
  | { ok: true; result: AnalysisResult }
  | { ok: false; error: string; code: 'invalid_domain' | 'fetch_failed' | 'llm_failed' | 'rate_limited' | 'server_error' }

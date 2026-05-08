import type { VercelRequest, VercelResponse } from '@vercel/node'

/* ============================== TYPES ============================== */

type RankBand = 'top3' | 'page1' | 'page2-3' | 'page4plus' | 'unranked'

interface KeywordRow {
  keyword: string
  monthlySearches: number
  /** Semrush Keyword Difficulty Index 0–100. */
  keywordDifficulty: number
  currentRankBand: RankBand
  /** Live Semrush position (1–100), or null if not in top 100. */
  currentPosition: number | null
  estCurrentClicks: number
  estPage1Clicks: number
  estMonthlyValue: number
  intent: 'transactional' | 'commercial' | 'informational' | 'navigational'
}

interface CompetitorRow {
  domain: string
  reasonTheyWin: string
}

interface Blocker {
  title: string
  detail: string
  impact: 'high' | 'medium' | 'low'
}

interface Calculation {
  conversionRateUsed: number
  aovUsed: number
  ctrCurveSource: string
  notes: string
}

interface AnalysisResult {
  domain: string | null
  currency: string
  inferredIndustry: string
  inferredLocation: string
  monthlyOpportunity: number
  current: { estMonthlyTrafficValue: number; estMonthlyClicks: number }
  projected: { estMonthlyTrafficValue: number; estMonthlyClicks: number; timelineDays: number }
  keywords: KeywordRow[]
  competitors: CompetitorRow[]
  blockers: Blocker[]
  calculation: Calculation
  /** Semrush-based audit — no Lighthouse signals. Always null. */
  pageSpeed: null
  generatedAt: string
  source: 'semrush'
}

type AnalyseResponse =
  | { ok: true; result: AnalysisResult }
  | {
      ok: false
      error: string
      code: 'invalid_domain' | 'fetch_failed' | 'rate_limited' | 'server_error' | 'no_data'
    }

/* =========================== CONFIG ============================ */

const SEMRUSH_ENDPOINT = 'https://api.semrush.com/'
const SEMRUSH_TIMEOUT_MS = 12_000
const KEYWORDS_LIMIT = 10
const COMPETITORS_LIMIT = 5
const RATE_LIMIT_PER_DAY = 8
const PROJECTION_TIMELINE_DAYS = 90

const ALLOWED_CURRENCIES = new Set([
  'EUR', 'GBP', 'USD', 'CHF', 'CAD', 'AUD', 'JPY', 'CNY', 'HKD', 'SGD',
])

/** ISO 4217 → preferred Semrush database (regional ranking index). */
const CURRENCY_TO_DB: Record<string, string> = {
  EUR: 'de',
  GBP: 'uk',
  USD: 'us',
  CHF: 'ch',
  CAD: 'ca',
  AUD: 'au',
  JPY: 'jp',
  CNY: 'us',
  HKD: 'hk',
  SGD: 'sg',
}

/** Database → human-readable location label, used for inferredLocation. */
const DB_TO_LOCATION: Record<string, string> = {
  us: 'United States', uk: 'United Kingdom', de: 'Germany', ch: 'Switzerland',
  fr: 'France', es: 'Spain', it: 'Italy', nl: 'Netherlands', be: 'Belgium',
  at: 'Austria', dk: 'Denmark', fi: 'Finland', no: 'Norway', se: 'Sweden',
  pl: 'Poland', tr: 'Turkey', ie: 'Ireland', jp: 'Japan', hk: 'Hong Kong',
  sg: 'Singapore', au: 'Australia', ca: 'Canada', nz: 'New Zealand',
  br: 'Brazil', mx: 'Mexico', ar: 'Argentina', il: 'Israel', in: 'India',
}

/** CTR curve by exact organic position. Backlinko 2024 empirical averages. */
const CTR_BY_POSITION: Record<number, number> = {
  1: 0.275, 2: 0.155, 3: 0.106,
  4: 0.072, 5: 0.052, 6: 0.039, 7: 0.030, 8: 0.022, 9: 0.018, 10: 0.015,
}
const CTR_PAGE_2_3 = 0.012
const CTR_PAGE_4_5 = 0.005
const CTR_BEYOND_50 = 0.002
const CTR_PAGE_1_AVERAGE = 0.06

const ipBuckets = new Map<string, { count: number; resetAt: number }>()

/* ========================= UTILITIES ============================ */

function clientIp(req: VercelRequest): string {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string') return xff.split(',')[0]!.trim()
  if (Array.isArray(xff) && xff.length) return xff[0]!.split(',')[0]!.trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000
  const bucket = ipBuckets.get(ip)
  if (!bucket || bucket.resetAt < now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + day })
    return false
  }
  bucket.count += 1
  return bucket.count > RATE_LIMIT_PER_DAY
}

function normaliseDomain(input: string): string | null {
  let s = input.trim().toLowerCase()
  if (!s) return null
  s = s.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '')
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function ctrForPosition(position: number | null): number {
  if (position == null || position < 1) return 0
  if (position <= 10) return CTR_BY_POSITION[position] ?? 0
  if (position <= 30) return CTR_PAGE_2_3
  if (position <= 50) return CTR_PAGE_4_5
  if (position <= 100) return CTR_BEYOND_50
  return 0
}

function rankBandForPosition(position: number | null): RankBand {
  if (position == null || position < 1) return 'unranked'
  if (position <= 3) return 'top3'
  if (position <= 10) return 'page1'
  if (position <= 30) return 'page2-3'
  return 'page4plus'
}

function intentFromCode(code: string | undefined): KeywordRow['intent'] {
  // Semrush intent codes: 0=informational, 1=navigational, 2=commercial, 3=transactional.
  // Multiple codes may be comma-separated — use the strongest commercial signal.
  if (!code) return 'commercial'
  const codes = code.split(',').map((c) => c.trim())
  if (codes.includes('3')) return 'transactional'
  if (codes.includes('2')) return 'commercial'
  if (codes.includes('1')) return 'navigational'
  if (codes.includes('0')) return 'informational'
  return 'commercial'
}

/** Parse Semrush CSV (semicolon-separated, first row = headers). */
function parseSemrushCsv(body: string): Record<string, string>[] {
  const trimmed = body.trim()
  if (!trimmed) return []
  if (trimmed.startsWith('ERROR')) return []
  const lines = trimmed.split('\n')
  if (lines.length < 2) return []
  const headers = lines[0]!.split(';')
  return lines.slice(1).map((line) => {
    const cells = line.split(';')
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = cells[i] ?? '' })
    return row
  })
}

async function semrush(params: Record<string, string>): Promise<Record<string, string>[]> {
  const apiKey = process.env.SEMRUSH_API_KEY
  if (!apiKey) throw new Error('SEMRUSH_API_KEY not set')
  const qs = new URLSearchParams({ ...params, key: apiKey })
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SEMRUSH_TIMEOUT_MS)
  try {
    const res = await fetch(`${SEMRUSH_ENDPOINT}?${qs.toString()}`, {
      signal: controller.signal,
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Semrush HTTP ${res.status}: ${text.slice(0, 200)}`)
    }
    const body = await res.text()
    return parseSemrushCsv(body)
  } finally {
    clearTimeout(timer)
  }
}

function asInt(s: string | undefined): number {
  if (!s) return 0
  const n = parseInt(s, 10)
  return isFinite(n) ? n : 0
}

function asFloat(s: string | undefined): number {
  if (!s) return 0
  const n = parseFloat(s)
  return isFinite(n) ? n : 0
}

/* ========================== SEMRUSH CALLS ============================ */

interface DomainOrganicRow {
  keyword: string
  position: number
  searchVolume: number
  cpc: number
  trafficShare: number
  keywordDifficulty: number
  intent: KeywordRow['intent']
}

async function fetchDomainOrganic(domain: string, database: string): Promise<DomainOrganicRow[]> {
  const rows = await semrush({
    type: 'domain_organic',
    domain,
    database,
    display_limit: String(KEYWORDS_LIMIT),
    export_columns: 'Ph,Po,Nq,Cp,Tr,Kd,In',
  })
  return rows.map((r) => ({
    keyword: r['Keyword'] ?? '',
    position: asInt(r['Position']),
    searchVolume: asInt(r['Search Volume']),
    cpc: asFloat(r['CPC']),
    trafficShare: asFloat(r['Traffic (%)']),
    keywordDifficulty: asInt(r['Keyword Difficulty']),
    intent: intentFromCode(r['Intents']),
  })).filter((r) => r.keyword)
}

async function fetchDomainCompetitors(domain: string, database: string): Promise<CompetitorRow[]> {
  const rows = await semrush({
    type: 'domain_organic_organic',
    domain,
    database,
    display_limit: String(COMPETITORS_LIMIT),
    export_columns: 'Dn,Cr,Np,Or,Ot',
  })
  return rows.map((r) => {
    const competitorDomain = r['Domain'] ?? ''
    const commonKeywords = asInt(r['Common Keywords'])
    const organicKeywords = asInt(r['Organic Keywords'])
    const organicTraffic = asInt(r['Organic Traffic'])
    return {
      domain: competitorDomain,
      reasonTheyWin: `${commonKeywords.toLocaleString('en-US')} überlappende Keywords · ${organicKeywords.toLocaleString('en-US')} Rankings · ${organicTraffic.toLocaleString('en-US')} organische Besucher/Monat (Semrush)`,
    }
  }).filter((c) => c.domain)
}

interface PhraseRow {
  keyword: string
  searchVolume: number
  cpc: number
  keywordDifficulty: number
}

/**
 * Build progressively shorter seed candidates for Semrush phrase_related,
 * which only returns useful results for short head-terms. Order: most specific
 * (and informative) first, falling back to broader category words.
 */
function buildSeedCandidates(industryHint: string, domain: string | null): string[] {
  const candidates: string[] = []
  const seen = new Set<string>()
  const push = (s: string) => {
    const v = s.trim().toLowerCase()
    if (v.length >= 3 && v.length <= 40 && !seen.has(v)) {
      seen.add(v)
      candidates.push(v)
    }
  }
  if (industryHint) {
    // Split on common separators (·, ,, /, |, -, : and "and"/"&") and filter
    // stopwords/connectors. Keep tokens 3–40 chars.
    const stopwords = /^(in|der|die|das|den|für|für|and|or|und|the|a|an|of|on|in|at|to|with|by|top|service|services|category|industry|business|company|firma|branche|geschäft|geschaeft)$/i
    const segments = industryHint
      .split(/[·,/|:;]+|\s(?:and|und|&)\s/i)
      .map((s) => s.trim())
      .filter(Boolean)
    for (const seg of segments) {
      // Try the segment as-is first (might be 1–2 useful words).
      const words = seg.split(/\s+/).filter((w) => w.length >= 3 && !stopwords.test(w))
      if (words.length >= 1 && words.length <= 3) push(words.join(' '))
      if (words.length >= 1) push(words[0]!)
    }
    // Final fallback: the whole hint, raw (probably won't match — last resort).
    push(industryHint)
  }
  if (domain) {
    push(domain.split('.')[0]!)
  }
  return candidates
}

async function fetchKeywordIdeas(seed: string, database: string): Promise<PhraseRow[]> {
  const rows = await semrush({
    type: 'phrase_related',
    phrase: seed,
    database,
    display_limit: String(KEYWORDS_LIMIT),
    export_columns: 'Ph,Nq,Cp,Kd',
  })
  return rows.map((r) => ({
    keyword: r['Keyword'] ?? '',
    searchVolume: asInt(r['Search Volume']),
    cpc: asFloat(r['CPC']),
    keywordDifficulty: asInt(r['Keyword Difficulty Index']),
  })).filter((r) => r.keyword)
}

/* ========================== ASSEMBLY ============================ */

interface BuildInput {
  domain: string | null
  database: string
  currency: string
  aov: number
  conversionRate: number
  industryHint: string
  organic: DomainOrganicRow[]
  ideas: PhraseRow[]
  competitors: CompetitorRow[]
}

function classifyIntentByKeyword(keyword: string): KeywordRow['intent'] {
  const k = keyword.toLowerCase()
  if (/(kaufen|preis|kosten|buchen|bestellen|angebot|in der nähe|near me|buy|book|order|price|cost|deal|kaufen)/.test(k)) return 'transactional'
  if (/(beste|best|top|vergleich|review|test|empfehlung)/.test(k)) return 'commercial'
  if (/^(was|wie|wo|wer|warum|how|what|why|when|guide|tutorial)/.test(k)) return 'informational'
  return 'commercial'
}

function buildKeywordRows(input: BuildInput): KeywordRow[] {
  const rows: KeywordRow[] = []
  if (input.organic.length > 0) {
    for (const r of input.organic) {
      const ctrCurrent = ctrForPosition(r.position)
      const estCurrentClicks = Math.round(r.searchVolume * ctrCurrent)
      const estPage1Clicks = r.position > 0 && r.position <= 3
        ? estCurrentClicks
        : Math.round(r.searchVolume * CTR_PAGE_1_AVERAGE)
      const upliftClicks = Math.max(0, estPage1Clicks - estCurrentClicks)
      const estMonthlyValue = Math.round(upliftClicks * input.conversionRate * input.aov)
      rows.push({
        keyword: r.keyword,
        monthlySearches: r.searchVolume,
        keywordDifficulty: r.keywordDifficulty,
        currentRankBand: rankBandForPosition(r.position),
        currentPosition: r.position || null,
        estCurrentClicks,
        estPage1Clicks,
        estMonthlyValue,
        intent: r.intent,
      })
    }
    return rows
  }
  for (const r of input.ideas) {
    const estPage1Clicks = Math.round(r.searchVolume * CTR_PAGE_1_AVERAGE)
    const estMonthlyValue = Math.round(estPage1Clicks * input.conversionRate * input.aov)
    rows.push({
      keyword: r.keyword,
      monthlySearches: r.searchVolume,
      keywordDifficulty: r.keywordDifficulty,
      currentRankBand: 'unranked',
      currentPosition: null,
      estCurrentClicks: 0,
      estPage1Clicks,
      estMonthlyValue,
      intent: classifyIntentByKeyword(r.keyword),
    })
  }
  return rows
}

function buildBlockers(input: BuildInput, keywords: KeywordRow[]): Blocker[] {
  const blockers: Blocker[] = []
  if (!input.domain || input.organic.length === 0) {
    blockers.push({
      title: 'Keine messbare organische Sichtbarkeit',
      detail: input.domain
        ? `Semrush findet aktuell keine Top-100-Rankings für ${input.domain}. Die Domain ist entweder zu neu, technisch nicht indexiert oder produziert keine relevanten organischen Treffer.`
        : 'Ohne Domain kann Semrush keine bestehenden Rankings messen. Das gesamte Potenzial ist noch ungenutzt.',
      impact: 'high',
    })
    blockers.push({
      title: 'Top-Keywords haben keine On-Page-Verankerung',
      detail: `${keywords.length} Keywords mit insgesamt ${keywords.reduce((s, k) => s + k.monthlySearches, 0).toLocaleString('en-US')} Suchen/Monat — aktuell holt Ihre Domain davon ${keywords.reduce((s, k) => s + k.estCurrentClicks, 0)} Klicks. Es fehlt eine indexierbare Landingpage je Keyword-Cluster.`,
      impact: 'high',
    })
    blockers.push({
      title: 'Kein Wettbewerbssignal in Semrush',
      detail: 'Wettbewerber-Mapping basiert auf gemeinsam rankenden Keywords. Da keine Rankings existieren, fehlt der direkte Benchmark — der Aufbau startet bei null.',
      impact: 'medium',
    })
    return blockers
  }
  const beyondPage1 = keywords.filter((k) => k.currentRankBand === 'page2-3' || k.currentRankBand === 'page4plus' || k.currentRankBand === 'unranked')
  const beyondPage1Volume = beyondPage1.reduce((s, k) => s + k.monthlySearches, 0)
  if (beyondPage1.length > 0) {
    blockers.push({
      title: `${beyondPage1.length} Keywords stehen jenseits von Page 1`,
      detail: `Zusammen ${beyondPage1Volume.toLocaleString('en-US')} Suchen/Monat (Semrush). Bei Page-2-Rankings fließt 1.2 % statt 6 % der Suchen — der Großteil des Potenzials ist abgehängt.`,
      impact: 'high',
    })
  }
  const highVolumeLow = keywords
    .filter((k) => k.monthlySearches >= 500 && (k.currentPosition ?? 99) > 10)
    .sort((a, b) => b.monthlySearches - a.monthlySearches)
  if (highVolumeLow.length > 0) {
    const top = highVolumeLow[0]!
    blockers.push({
      title: `Hochvolumige Keywords ranken nicht in den Top 10`,
      detail: `"${top.keyword}" hat ${top.monthlySearches.toLocaleString('en-US')} Suchen/Monat — Sie ranken aktuell auf Position ${top.currentPosition}. ${highVolumeLow.length - 1} weitere Keywords mit ≥500 Suchen sind ebenfalls außerhalb Page 1.`,
      impact: 'high',
    })
  }
  if (input.competitors.length > 0) {
    const c = input.competitors[0]!
    blockers.push({
      title: `Wettbewerber rankt für mehr Keywords`,
      detail: `${c.domain} — ${c.reasonTheyWin}. Diese Überlappung ist der schnellste Weg zur Inhalts-Roadmap.`,
      impact: 'medium',
    })
  }
  if (blockers.length < 3) {
    blockers.push({
      title: 'Keyword-Difficulty zu niedrig genutzt',
      detail: `Durchschnittliche Difficulty Ihrer rankenden Keywords: ${Math.round(keywords.reduce((s, k) => s + k.keywordDifficulty, 0) / Math.max(keywords.length, 1))}. Es gibt Spielraum für Keywords mit besserer Volumen/Difficulty-Quote.`,
      impact: 'medium',
    })
  }
  return blockers
}

function buildResult(input: BuildInput): AnalysisResult {
  const keywords = buildKeywordRows(input)
  const totalCurrentClicks = keywords.reduce((s, k) => s + k.estCurrentClicks, 0)
  const totalPage1Clicks = keywords.reduce((s, k) => s + k.estPage1Clicks, 0)
  const currentValue = Math.round(totalCurrentClicks * input.conversionRate * input.aov)
  const projectedValue = Math.round(totalPage1Clicks * input.conversionRate * input.aov)
  const monthlyOpportunity = Math.max(0, projectedValue - currentValue)

  const inferredLocation = DB_TO_LOCATION[input.database] ?? input.database.toUpperCase()
  const inferredIndustry = input.industryHint || (input.domain ? `Domain ${input.domain}` : 'Nicht spezifiziert')

  const competitors = input.competitors
  const blockers = buildBlockers(input, keywords)

  return {
    domain: input.domain,
    currency: input.currency,
    inferredIndustry,
    inferredLocation,
    monthlyOpportunity,
    current: { estMonthlyTrafficValue: currentValue, estMonthlyClicks: totalCurrentClicks },
    projected: {
      estMonthlyTrafficValue: projectedValue,
      estMonthlyClicks: totalPage1Clicks,
      timelineDays: PROJECTION_TIMELINE_DAYS,
    },
    keywords,
    competitors,
    blockers,
    calculation: {
      conversionRateUsed: input.conversionRate,
      aovUsed: input.aov,
      ctrCurveSource: 'Backlinko 2024 organic CTR averages by exact position',
      notes: input.domain && input.organic.length > 0
        ? 'Rankings, Suchvolumen und Keyword-Difficulty stammen live aus der Semrush API. Klicks werden aus Position × CTR-Kurve modelliert. AOV und Conversion-Rate sind Ihre Angaben.'
        : 'Domain hat keine Rankings in Semrush — Keyword-Ideen stammen aus phrase_related (Semrush). Alle Keywords gelten als „unranked", Klicks aktuell = 0. AOV und Conversion-Rate sind Ihre Angaben.',
    },
    pageSpeed: null,
    generatedAt: new Date().toISOString(),
    source: 'semrush',
  }
}

/* ============================ HANDLER =========================== */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    return await handleRequest(req, res)
  } catch (err) {
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('seo-analyse top-level error', detail, err)
    if (!res.headersSent) {
      res.status(500).json({
        ok: false,
        error: `Server error: ${detail}`,
        code: 'server_error',
      } satisfies AnalyseResponse)
    }
    return
  }
}

async function handleRequest(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ ok: false, error: 'Method not allowed', code: 'server_error' } satisfies AnalyseResponse)
    return
  }

  const ip = clientIp(req)
  if (rateLimited(ip)) {
    res.status(429).json({
      ok: false,
      error: `Daily limit reached (${RATE_LIMIT_PER_DAY}/day). Try again tomorrow.`,
      code: 'rate_limited',
    } satisfies AnalyseResponse)
    return
  }

  const body = (req.body ?? {}) as {
    domain?: unknown
    currency?: unknown
    aov?: unknown
    conversionRate?: unknown
    industryHint?: unknown
    database?: unknown
  }

  const domain = normaliseDomain(typeof body.domain === 'string' ? body.domain : '')
  const industryHint = typeof body.industryHint === 'string' ? body.industryHint.trim().slice(0, 240) : ''

  if (!domain && industryHint.length < 3) {
    res.status(400).json({
      ok: false,
      error: 'Please provide either a website domain or describe your industry / top service.',
      code: 'invalid_domain',
    } satisfies AnalyseResponse)
    return
  }

  const currencyRaw = typeof body.currency === 'string' ? body.currency.toUpperCase() : 'EUR'
  const currency = ALLOWED_CURRENCIES.has(currencyRaw) ? currencyRaw : 'EUR'

  const aov = Number(body.aov)
  const conversionRate = Number(body.conversionRate)
  if (!isFinite(aov) || aov <= 0 || !isFinite(conversionRate) || conversionRate <= 0 || conversionRate > 1) {
    res.status(400).json({
      ok: false,
      error: 'Invalid business numbers — AOV must be a positive number, conversion rate between 0 and 1.',
      code: 'invalid_domain',
    } satisfies AnalyseResponse)
    return
  }

  const databaseRaw = typeof body.database === 'string' ? body.database.toLowerCase() : ''
  const database = /^[a-z]{2}$/.test(databaseRaw) ? databaseRaw : (CURRENCY_TO_DB[currency] ?? 'us')

  if (!process.env.SEMRUSH_API_KEY) {
    res.status(500).json({
      ok: false,
      error: 'Server misconfigured: SEMRUSH_API_KEY not set.',
      code: 'server_error',
    } satisfies AnalyseResponse)
    return
  }

  let organic: DomainOrganicRow[] = []
  let competitors: CompetitorRow[] = []
  let ideas: PhraseRow[] = []

  try {
    if (domain) {
      const [organicRes, competitorsRes] = await Promise.allSettled([
        fetchDomainOrganic(domain, database),
        fetchDomainCompetitors(domain, database),
      ])
      if (organicRes.status === 'fulfilled') organic = organicRes.value
      if (competitorsRes.status === 'fulfilled') competitors = competitorsRes.value
    }
    // If no domain rankings found, fall back to keyword ideas from the industry hint
    // (or from the bare domain root-word as a seed if the user provided no hint).
    // Semrush phrase_related needs a short seed — try progressively shorter forms.
    if (organic.length === 0) {
      const seedCandidates = buildSeedCandidates(industryHint, domain)
      for (const seed of seedCandidates) {
        ideas = await fetchKeywordIdeas(seed, database)
        if (ideas.length > 0) break
      }
    }
  } catch (err) {
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('Semrush call failed', detail, err)
    res.status(502).json({
      ok: false,
      error: `Semrush error: ${detail}`,
      code: 'fetch_failed',
    } satisfies AnalyseResponse)
    return
  }

  if (organic.length === 0 && ideas.length === 0) {
    res.status(200).json({
      ok: false,
      error: domain
        ? `Semrush hat für ${domain} keine organischen Rankings und keine verwertbaren Keyword-Ideen gefunden. Bitte ergänzen Sie Ihre Branche / Ihren Top-Service.`
        : 'Semrush hat zu Ihrer Branchenbeschreibung keine Keywords gefunden. Bitte konkretisieren Sie das Angebot.',
      code: 'no_data',
    } satisfies AnalyseResponse)
    return
  }

  const result = buildResult({
    domain,
    database,
    currency,
    aov,
    conversionRate,
    industryHint,
    organic,
    ideas,
    competitors,
  })

  res.status(200).json({ ok: true, result } satisfies AnalyseResponse)
}

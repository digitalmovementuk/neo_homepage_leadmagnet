import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

/* ============================== TYPES ============================== */

type RankBand = 'top3' | 'page1' | 'page2-3' | 'page4plus' | 'unranked'

interface KeywordRow {
  keyword: string
  monthlySearches: number
  currentRankBand: RankBand
  estCurrentClicks: number
  estPage1Clicks: number
  /** In the request's `currency`. */
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

interface PageSpeedSummary {
  performance: number
  seo: number
  lcpMs: number
  cls: number
  inpMs: number | null
}

interface AnalysisResult {
  domain: string
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
  pageSpeed: { mobile: PageSpeedSummary; desktop: PageSpeedSummary } | null
  generatedAt: string
}

type AnalyseResponse =
  | { ok: true; result: AnalysisResult }
  | {
      ok: false
      error: string
      code: 'invalid_domain' | 'fetch_failed' | 'llm_failed' | 'rate_limited' | 'server_error'
    }

/* =========================== CONFIG ============================ */

const FETCH_TIMEOUT_MS = 6_000
const MAX_HTML_BYTES = 8_192
const RATE_LIMIT_PER_DAY = 8
const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

const ALLOWED_CURRENCIES = new Set([
  'EUR', 'GBP', 'USD', 'CHF', 'CAD', 'AUD', 'JPY', 'CNY', 'HKD', 'SGD',
])

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
  s = s.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

async function fetchHomepage(domain: string): Promise<string | null> {
  const tryUrls = [`https://${domain}/`, `https://www.${domain}/`, `http://${domain}/`]
  for (const url of tryUrls) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          'user-agent':
            'Mozilla/5.0 (compatible; NeoSEOBot/1.0; +https://neohomepageleadmagnet.vercel.app/seo-analyse)',
          accept: 'text/html,application/xhtml+xml',
        },
      })
      if (!res.ok) continue
      const html = await res.text()
      return html
    } catch {
      continue
    } finally {
      clearTimeout(timer)
    }
  }
  return null
}

function extractExcerpt(html: string): string {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
  if (stripped.length <= MAX_HTML_BYTES) return stripped
  const head = stripped.indexOf('</head>')
  const headPart = head > -1 ? stripped.slice(0, Math.min(head + 7, MAX_HTML_BYTES / 2)) : ''
  const remaining = MAX_HTML_BYTES - headPart.length
  const bodyStart = stripped.indexOf('<body')
  const bodyPart =
    bodyStart > -1
      ? stripped.slice(bodyStart, bodyStart + remaining)
      : stripped.slice(0, remaining)
  return headPart + bodyPart
}

/* ========================== PAGESPEED ============================ */

interface AuditValue {
  numericValue?: number
  score?: number | null
}

interface RawPageSpeedResponse {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number | null }
      seo?: { score?: number | null }
    }
    audits?: {
      'largest-contentful-paint'?: AuditValue
      'cumulative-layout-shift'?: AuditValue
      'interaction-to-next-paint'?: AuditValue
      'experimental-interaction-to-next-paint'?: AuditValue
    }
  }
}

async function fetchOnePageSpeed(
  url: string,
  strategy: 'mobile' | 'desktop',
  timeoutMs: number,
): Promise<PageSpeedSummary | null> {
  const params = new URLSearchParams({ url, strategy, category: 'performance' })
  params.append('category', 'seo')
  if (process.env.PAGESPEED_API_KEY) params.set('key', process.env.PAGESPEED_API_KEY)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${PAGESPEED_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
    })
    if (!res.ok) return null
    const data = (await res.json()) as RawPageSpeedResponse
    const lr = data.lighthouseResult
    if (!lr) return null
    const lcp = lr.audits?.['largest-contentful-paint']?.numericValue ?? 0
    const cls = lr.audits?.['cumulative-layout-shift']?.numericValue ?? 0
    const inp =
      lr.audits?.['interaction-to-next-paint']?.numericValue ??
      lr.audits?.['experimental-interaction-to-next-paint']?.numericValue ??
      null
    return {
      performance: Math.round((lr.categories?.performance?.score ?? 0) * 100),
      seo: Math.round((lr.categories?.seo?.score ?? 0) * 100),
      lcpMs: Math.round(lcp),
      cls: Math.round(cls * 1000) / 1000,
      inpMs: inp == null ? null : Math.round(inp),
    }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function runPageSpeed(
  url: string,
): Promise<{ mobile: PageSpeedSummary; desktop: PageSpeedSummary } | null> {
  const [mobile, desktop] = await Promise.all([
    fetchOnePageSpeed(url, 'mobile', 18_000),
    fetchOnePageSpeed(url, 'desktop', 18_000),
  ])
  if (!mobile && !desktop) return null
  const fallback: PageSpeedSummary = { performance: 0, seo: 0, lcpMs: 0, cls: 0, inpMs: null }
  return { mobile: mobile ?? fallback, desktop: desktop ?? fallback }
}

/* ========================== ANTHROPIC =========================== */

const SYSTEM_PROMPT = `You are an SEO opportunity estimator for small-to-medium businesses. Given a domain's homepage HTML, PageSpeed signals, and the business's own AOV + conversion rate, you produce a defensible estimate of the monthly revenue the business is leaving on the table from organic search.

Method (apply rigorously, do not invent numbers):

1. Infer industry and primary location from the homepage content (language, currency, addresses, schema, copy). If the user supplied an industry hint, use that hint to anchor the inferred industry — combine it with what the homepage shows.

2. Generate 8–10 plausible high-intent keywords a real customer would type to find this business. Mix transactional (e.g. "pizza lieferung köln"), commercial (e.g. "zahnarzt köln innenstadt"), and 1–2 informational. Use the inferred location and the local language. Keyword phrases must read like real searches, not marketing slogans.

3. Estimate monthlySearches conservatively from local market priors. For a city of ~1M people, a generic transactional keyword in a normal vertical sees 200–2,000 monthly searches; a hyper-niche one sees 50–300. Bigger cities and English-speaking markets scale up. Do NOT hallucinate huge volumes.

4. Estimate currentRankBand from on-page signals + PageSpeed. Heuristic:
   - Strong on-page (title contains target term, meta present, h1 clear, schema, mobile perf >70): "page1" or "top3"
   - OK on-page but weak perf or thin content: "page2-3"
   - Missing meta description, generic title, no schema, weak perf: "page4plus"
   - Brand-new domain, very thin content, or no relevant on-page signal at all: "unranked"

5. CTR by position (Backlinko 2024 averages — use these EXACTLY):
   - top3:     0.27 average
   - page1:    0.06 average (positions 4–10)
   - page2-3:  0.012
   - page4plus:0.004
   - unranked: 0

6. The user has provided their actual business numbers — DO NOT use industry defaults:
   - Currency:        provided as ISO code in the user message
   - AOV (per sale):  provided as a number in that currency
   - Conversion rate: provided as a fraction (e.g. 0.03 = 3%)
   ALL money values you output MUST be in the user's currency, using their AOV and conversion rate verbatim.

7. estCurrentClicks  = round(monthlySearches × CTR_at_currentRankBand)
   estPage1Clicks    = round(monthlySearches × 0.06) for keywords currently below page1; for keywords already top3, projected = same as current.
   estMonthlyValue   = round((estPage1Clicks − estCurrentClicks) × conversionRate × AOV)
   monthlyOpportunity = SUM of estMonthlyValue across all keywords.
   Round monthlyOpportunity to a sensible whole number in the user's currency. Cap at 250 × AOV per month — beyond that the number stops being credible for an SMB; if you cap, explain why in calculation.notes.

8. current.estMonthlyTrafficValue   = SUM(monthlySearches × CTR_at_currentRankBand × conversionRate × AOV) across keywords (rounded).
   current.estMonthlyClicks         = SUM(estCurrentClicks).
   projected.estMonthlyTrafficValue = SUM(monthlySearches × 0.06 × conversionRate × AOV) — assume page1 average for all keywords (rounded).
   projected.estMonthlyClicks       = SUM(estPage1Clicks).
   projected.timelineDays           = 90.

9. Blockers — name 3–5 SPECIFIC issues, each tied to evidence:
   - On-page: cite missing/short meta description, generic title tag, missing h1, no schema markup, no language tag
   - Performance: cite specific Core Web Vitals failures (LCP > 2500ms, CLS > 0.1, mobile perf < 50)
   - Local: cite missing GMB link, no NAP, no local schema
   - Authority: cite thin content, no internal linking signals
   Each blocker must reference observable evidence — never generic advice like "improve SEO".

10. Competitors — list 2–3 plausible local competitors by inferred-from-context name. Mark these as ESTIMATED in calculation.notes.

11. calculation.conversionRateUsed = the user-provided conversion rate.
    calculation.aovUsed            = the user-provided AOV.
    calculation.notes MUST disclose: "Rankings and search volumes are estimated from on-page signals and industry priors, not measured against live SERPs. AOV and conversion rate are user-provided." Be transparent.

You MUST call the submit_analysis tool with the structured result. Never reply in plain text.`

const ANALYSIS_TOOL_INPUT_SCHEMA = {
  type: 'object' as const,
  properties: {
    inferredIndustry: { type: 'string' },
    inferredLocation: { type: 'string' },
    monthlyOpportunity: { type: 'integer' },
    current: {
      type: 'object',
      properties: {
        estMonthlyTrafficValue: { type: 'integer' },
        estMonthlyClicks: { type: 'integer' },
      },
      required: ['estMonthlyTrafficValue', 'estMonthlyClicks'],
    },
    projected: {
      type: 'object',
      properties: {
        estMonthlyTrafficValue: { type: 'integer' },
        estMonthlyClicks: { type: 'integer' },
        timelineDays: { type: 'integer' },
      },
      required: ['estMonthlyTrafficValue', 'estMonthlyClicks', 'timelineDays'],
    },
    keywords: {
      type: 'array',
      minItems: 6,
      maxItems: 12,
      items: {
        type: 'object',
        properties: {
          keyword: { type: 'string' },
          monthlySearches: { type: 'integer' },
          currentRankBand: {
            type: 'string',
            enum: ['top3', 'page1', 'page2-3', 'page4plus', 'unranked'],
          },
          estCurrentClicks: { type: 'integer' },
          estPage1Clicks: { type: 'integer' },
          estMonthlyValue: { type: 'integer' },
          intent: {
            type: 'string',
            enum: ['transactional', 'commercial', 'informational', 'navigational'],
          },
        },
        required: [
          'keyword',
          'monthlySearches',
          'currentRankBand',
          'estCurrentClicks',
          'estPage1Clicks',
          'estMonthlyValue',
          'intent',
        ],
      },
    },
    competitors: {
      type: 'array',
      minItems: 2,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          domain: { type: 'string' },
          reasonTheyWin: { type: 'string' },
        },
        required: ['domain', 'reasonTheyWin'],
      },
    },
    blockers: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          detail: { type: 'string' },
          impact: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['title', 'detail', 'impact'],
      },
    },
    calculation: {
      type: 'object',
      properties: {
        conversionRateUsed: { type: 'number' },
        aovUsed: { type: 'number' },
        ctrCurveSource: { type: 'string' },
        notes: { type: 'string' },
      },
      required: ['conversionRateUsed', 'aovUsed', 'ctrCurveSource', 'notes'],
    },
  },
  required: [
    'inferredIndustry',
    'inferredLocation',
    'monthlyOpportunity',
    'current',
    'projected',
    'keywords',
    'competitors',
    'blockers',
    'calculation',
  ],
}

interface AnthropicInput {
  domain: string
  currency: string
  aov: number
  conversionRate: number
  industryHint: string
  homepageExcerpt: string
  pageSpeed: { mobile: PageSpeedSummary; desktop: PageSpeedSummary } | null
}

function userMessage(input: AnthropicInput): string {
  const psSummary = input.pageSpeed
    ? `PageSpeed (mobile / desktop):
- Performance: ${input.pageSpeed.mobile.performance} / ${input.pageSpeed.desktop.performance}
- SEO: ${input.pageSpeed.mobile.seo} / ${input.pageSpeed.desktop.seo}
- LCP (ms): ${input.pageSpeed.mobile.lcpMs} / ${input.pageSpeed.desktop.lcpMs}
- CLS: ${input.pageSpeed.mobile.cls} / ${input.pageSpeed.desktop.cls}
- INP (ms): ${input.pageSpeed.mobile.inpMs ?? 'n/a'} / ${input.pageSpeed.desktop.inpMs ?? 'n/a'}`
    : 'PageSpeed: unavailable (treat performance as unknown — do not assume good or bad).'

  const hint = input.industryHint
    ? `User-supplied industry hint: "${input.industryHint}" (use this to anchor your inference).`
    : 'No industry hint supplied — infer from the homepage.'

  return `Domain: ${input.domain}

User-provided business numbers (use these verbatim, do NOT use industry defaults):
- Currency:        ${input.currency} (ISO 4217)
- AOV per sale:    ${input.aov} ${input.currency}
- Conversion rate: ${input.conversionRate} (${(input.conversionRate * 100).toFixed(2)}%)
- ${hint}

${psSummary}

Homepage HTML excerpt (first ~8KB after stripping scripts/styles):
"""
${input.homepageExcerpt}
"""

Now call the submit_analysis tool with the JSON analysis. All money values must be integers in ${input.currency}.`
}

type LLMOutput = Omit<AnalysisResult, 'domain' | 'currency' | 'pageSpeed' | 'generatedAt'>

async function runAnthropicAnalysis(input: AnthropicInput): Promise<LLMOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    temperature: 0.3,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [
      {
        name: 'submit_analysis',
        description:
          'Submit the structured SEO opportunity analysis. Call this exactly once with the full result.',
        input_schema: ANALYSIS_TOOL_INPUT_SCHEMA as unknown as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: 'tool', name: 'submit_analysis' },
    messages: [{ role: 'user', content: userMessage(input) }],
  })

  const toolUse = message.content.find((block) => block.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Anthropic did not return a tool_use block')
  }
  return toolUse.input as LLMOutput
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
  }

  const domain = normaliseDomain(typeof body.domain === 'string' ? body.domain : '')
  if (!domain) {
    res.status(400).json({
      ok: false,
      error: 'Please enter a valid domain (e.g. example.com).',
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

  const industryHint = typeof body.industryHint === 'string' ? body.industryHint.trim().slice(0, 120) : ''

  const homepageUrl = `https://${domain}/`
  const [html, pageSpeed] = await Promise.all([fetchHomepage(domain), runPageSpeed(homepageUrl)])

  if (!html) {
    res.status(422).json({
      ok: false,
      error: `Couldn't reach ${domain}. Check the domain is live and reachable from the public internet.`,
      code: 'fetch_failed',
    } satisfies AnalyseResponse)
    return
  }

  const excerpt = extractExcerpt(html)

  let llm: Awaited<ReturnType<typeof runAnthropicAnalysis>>
  try {
    llm = await runAnthropicAnalysis({
      domain,
      currency,
      aov,
      conversionRate,
      industryHint,
      homepageExcerpt: excerpt,
      pageSpeed,
    })
  } catch (err) {
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('LLM analysis failed', detail, err)
    res.status(502).json({
      ok: false,
      error: `LLM error: ${detail}`,
      code: 'llm_failed',
    } satisfies AnalyseResponse)
    return
  }

  res.status(200).json({
    ok: true,
    result: {
      domain,
      currency,
      ...llm,
      pageSpeed,
      generatedAt: new Date().toISOString(),
    },
  } satisfies AnalyseResponse)
}

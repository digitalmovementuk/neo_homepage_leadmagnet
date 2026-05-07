import Anthropic from '@anthropic-ai/sdk'
import type { AnalysisResult, PageSpeedSummary } from './shared-types'

const SYSTEM_PROMPT = `You are an SEO opportunity estimator for small-to-medium businesses. Given a domain's homepage HTML and PageSpeed signals, you produce a defensible, conservative estimate of the monthly revenue the business is leaving on the table from organic search.

Method (apply rigorously, do not invent numbers):

1. Infer industry and primary location from the homepage content (language, currency, addresses, schema, copy).

2. Generate 8–10 plausible high-intent keywords a real customer would type to find this business. Mix transactional ("pizza lieferung köln"), commercial ("zahnarzt köln innenstadt"), and 1–2 informational. Use the inferred location and the local language. Keyword phrases must read like real searches, not marketing slogans.

3. Estimate monthlySearches conservatively from local market priors. For a German city like Cologne (~1M people), a generic transactional keyword in a normal vertical sees 200–2,000 monthly searches; a hyper-niche one sees 50–300. UK and US numbers scale up. Do NOT hallucinate huge volumes.

4. Estimate currentRankBand from on-page signals + PageSpeed. Heuristic:
   - Strong on-page (title contains target term, meta present, h1 clear, schema, mobile perf >70): "page1" or "top3"
   - OK on-page but weak perf or thin content: "page2-3"
   - Missing meta description, generic title, no schema, weak perf: "page4plus"
   - Brand-new domain, very thin content, or no relevant on-page signal at all: "unranked"

5. CTR by position (Backlinko 2024 averages — use these EXACTLY):
   - top3: 0.27 average
   - page1 (positions 4–10 average): 0.06
   - page2-3: 0.012
   - page4plus: 0.004
   - unranked: 0

6. Industry conversion rates and AOV (use these lookup values, pick the closest match):
   - Restaurant / takeaway: convRate 0.04, AOV £35
   - Café / coffee: convRate 0.05, AOV £15
   - Dentist / clinic / aesthetic medicine: convRate 0.06, AOV £180 (first visit)
   - Hairdresser / barber / nails / beauty: convRate 0.08, AOV £55
   - Local trades (plumber, electrician, locksmith): convRate 0.10, AOV £180
   - Lawyer / accountant / consultant: convRate 0.04, AOV £600
   - Auto repair / garage: convRate 0.07, AOV £220
   - Gym / fitness / yoga studio: convRate 0.05, AOV £45 (first month)
   - Hotel / B&B / vacation rental: convRate 0.03, AOV £160
   - Local retail / boutique / shop: convRate 0.02, AOV £55
   - Real estate / estate agent: convRate 0.03, AOV £2000 (deal value × likelihood)
   - B2B SaaS / software: convRate 0.02, AOV £1200 (first-year value)
   - E-commerce: convRate 0.025, AOV £55
   - Default fallback: convRate 0.03, AOV £80

7. estCurrentClicks = monthlySearches × CTR_at_currentRankBand
   estPage1Clicks = monthlySearches × 0.06 (page1 average) for keywords currently below page1; for those already top3, projected = same as current.
   estMonthlyValueGbp = (estPage1Clicks − estCurrentClicks) × convRate × AOV, rounded to nearest £
   monthlyOpportunityGbp = SUM of estMonthlyValueGbp across all keywords. Round to nearest £100. Cap at £25,000/month — beyond that the number stops being credible for an SMB and you should explain the cap in calculation.notes.

8. Blockers — name 3–5 SPECIFIC issues, each tied to evidence:
   - On-page: cite missing/short meta description, generic title tag, missing h1, no schema markup, no language tag
   - Performance: cite specific Core Web Vitals failures (LCP > 2500ms, CLS > 0.1, mobile perf < 50)
   - Local: cite missing GMB link, no NAP, no local schema
   - Authority: cite thin content, no internal linking signals
   Each blocker must reference observable evidence — never generic advice like "improve SEO".

9. Competitors — list 3 plausible local competitors by inferred-from-context name. Mark these as ESTIMATED in calculation.notes.

10. timelineDays: 90.

11. calculation.notes MUST disclose: "Rankings and search volumes in this v1 are estimated from on-page signals and industry priors, not measured against live SERPs." Be transparent.

You MUST call the submit_analysis tool with the structured result. Never reply in plain text.`

const ANALYSIS_TOOL_INPUT_SCHEMA = {
  type: 'object' as const,
  properties: {
    inferredIndustry: { type: 'string' },
    inferredLocation: { type: 'string' },
    monthlyOpportunityGbp: { type: 'integer' },
    current: {
      type: 'object',
      properties: {
        estMonthlyTrafficValueGbp: { type: 'integer' },
        estMonthlyClicks: { type: 'integer' },
      },
      required: ['estMonthlyTrafficValueGbp', 'estMonthlyClicks'],
    },
    projected: {
      type: 'object',
      properties: {
        estMonthlyTrafficValueGbp: { type: 'integer' },
        estMonthlyClicks: { type: 'integer' },
        timelineDays: { type: 'integer' },
      },
      required: ['estMonthlyTrafficValueGbp', 'estMonthlyClicks', 'timelineDays'],
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
          estMonthlyValueGbp: { type: 'integer' },
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
          'estMonthlyValueGbp',
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
        industryConversionRate: { type: 'number' },
        industryAovGbp: { type: 'integer' },
        ctrCurveSource: { type: 'string' },
        notes: { type: 'string' },
      },
      required: ['industryConversionRate', 'industryAovGbp', 'ctrCurveSource', 'notes'],
    },
  },
  required: [
    'inferredIndustry',
    'inferredLocation',
    'monthlyOpportunityGbp',
    'current',
    'projected',
    'keywords',
    'competitors',
    'blockers',
    'calculation',
  ],
}

interface PromptInput {
  domain: string
  homepageExcerpt: string
  pageSpeed: { mobile: PageSpeedSummary; desktop: PageSpeedSummary } | null
}

function userMessage(input: PromptInput): string {
  const psSummary = input.pageSpeed
    ? `PageSpeed (mobile / desktop):
- Performance: ${input.pageSpeed.mobile.performance} / ${input.pageSpeed.desktop.performance}
- SEO: ${input.pageSpeed.mobile.seo} / ${input.pageSpeed.desktop.seo}
- LCP (ms): ${input.pageSpeed.mobile.lcpMs} / ${input.pageSpeed.desktop.lcpMs}
- CLS: ${input.pageSpeed.mobile.cls} / ${input.pageSpeed.desktop.cls}
- INP (ms): ${input.pageSpeed.mobile.inpMs ?? 'n/a'} / ${input.pageSpeed.desktop.inpMs ?? 'n/a'}`
    : 'PageSpeed: unavailable (treat performance as unknown — do not assume good or bad).'

  return `Domain: ${input.domain}

${psSummary}

Homepage HTML excerpt (first ~8KB after stripping scripts/styles):
"""
${input.homepageExcerpt}
"""

Now call the submit_analysis tool with the JSON analysis.`
}

type LLMOutput = Omit<AnalysisResult, 'domain' | 'pageSpeed' | 'generatedAt'>

export async function runAnthropicAnalysis(input: PromptInput): Promise<LLMOutput> {
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

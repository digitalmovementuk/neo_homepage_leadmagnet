import type { PageSpeedSummary } from './shared-types'

const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

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

async function fetchOne(
  url: string,
  strategy: 'mobile' | 'desktop',
  timeoutMs: number,
): Promise<PageSpeedSummary | null> {
  const params = new URLSearchParams({
    url,
    strategy,
    category: 'performance',
  })
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

export async function runPageSpeed(
  url: string,
): Promise<{ mobile: PageSpeedSummary; desktop: PageSpeedSummary } | null> {
  const [mobile, desktop] = await Promise.all([
    fetchOne(url, 'mobile', 18_000),
    fetchOne(url, 'desktop', 18_000),
  ])
  if (!mobile && !desktop) return null
  const fallback: PageSpeedSummary = {
    performance: 0,
    seo: 0,
    lcpMs: 0,
    cls: 0,
    inpMs: null,
  }
  return {
    mobile: mobile ?? fallback,
    desktop: desktop ?? fallback,
  }
}

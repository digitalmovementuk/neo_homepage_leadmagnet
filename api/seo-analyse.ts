import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runPageSpeed } from './lib/pagespeed'
import { runAnthropicAnalysis } from './lib/anthropic-prompt'
import type { AnalyseResponse } from './lib/shared-types'

const FETCH_TIMEOUT_MS = 6_000
const MAX_HTML_BYTES = 8_192
const RATE_LIMIT_PER_DAY = 8

const ipBuckets = new Map<string, { count: number; resetAt: number }>()

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
            'Mozilla/5.0 (compatible; CunosSEOBot/1.0; +https://cunos.co.uk/seo-analyse)',
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
  const bodyPart = bodyStart > -1 ? stripped.slice(bodyStart, bodyStart + remaining) : stripped.slice(0, remaining)
  return headPart + bodyPart
}

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
    res.status(405).json({ ok: false, error: 'Method not allowed', code: 'server_error' } satisfies AnalyseResponse)
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

  const body = (req.body ?? {}) as { domain?: unknown }
  const domainRaw = typeof body.domain === 'string' ? body.domain : ''
  const domain = normaliseDomain(domainRaw)
  if (!domain) {
    res.status(400).json({
      ok: false,
      error: 'Please enter a valid domain (e.g. example.com).',
      code: 'invalid_domain',
    } satisfies AnalyseResponse)
    return
  }

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
    llm = await runAnthropicAnalysis({ domain, homepageExcerpt: excerpt, pageSpeed })
  } catch (err) {
    console.error('LLM analysis failed', err)
    res.status(502).json({
      ok: false,
      error: "Our analysis engine couldn't complete. Please try again in a moment.",
      code: 'llm_failed',
    } satisfies AnalyseResponse)
    return
  }

  res.status(200).json({
    ok: true,
    result: {
      domain,
      ...llm,
      pageSpeed,
      generatedAt: new Date().toISOString(),
    },
  } satisfies AnalyseResponse)
}

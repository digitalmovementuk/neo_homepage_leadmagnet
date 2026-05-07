import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runPageSpeed } from './lib/pagespeed'
import { runAnthropicAnalysis } from './lib/anthropic-prompt'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    pagespeedFn: typeof runPageSpeed,
    anthropicFn: typeof runAnthropicAnalysis,
  })
}

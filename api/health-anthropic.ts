import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      res.status(200).json({ stage: 'env-check', ok: false, error: 'no key' })
      return
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 64,
      messages: [{ role: 'user', content: 'Reply with exactly the word: pong' }],
    })

    const text = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')

    res.status(200).json({
      stage: 'anthropic-call',
      ok: true,
      modelReply: text.trim(),
      usage: message.usage,
    })
  } catch (err) {
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    res.status(200).json({ stage: 'anthropic-call', ok: false, error: detail })
  }
}

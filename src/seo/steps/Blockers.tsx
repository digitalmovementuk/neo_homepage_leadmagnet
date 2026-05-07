import { motion } from 'framer-motion'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import type { AnalysisResult } from '../lib/types'
import { PageShell } from './Rankings'

interface Props {
  result: AnalysisResult
  onBack: () => void
  onNext: () => void
}

const IMPACT_STYLE = {
  high: { bg: '#fef2f2', text: '#b91c1c' },
  medium: { bg: '#fff7ed', text: '#c2410c' },
  low: { bg: '#f0f9ff', text: '#0369a1' },
} as const

export function BlockersPage({ result, onBack, onNext }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  return (
    <PageShell
      step={3}
      total={4}
      eyebrow={c.pageBlockers.eyebrow}
      headline={c.pageBlockers.headline}
      sub={c.pageBlockers.sub}
      result={result}
      onBack={onBack}
      onNext={onNext}
    >
      <ul className="space-y-3">
        {result.blockers.map((b, idx) => {
          const s = IMPACT_STYLE[b.impact]
          return (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-card border border-ink/[0.06] bg-white p-5 shadow-ring"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[15px] font-semibold text-ink">{b.title}</span>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={{ backgroundColor: s.bg, color: s.text }}
                >
                  {c.blockers.impacts[b.impact]}
                </span>
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{b.detail}</p>
            </motion.li>
          )
        })}
      </ul>
    </PageShell>
  )
}

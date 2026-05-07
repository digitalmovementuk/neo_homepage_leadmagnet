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
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <ul className="space-y-3">
          {result.blockers.map((b, idx) => {
            const s = IMPACT_STYLE[b.impact]
            return (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-[22px] border border-ink/[0.07] bg-white p-4 shadow-ring sm:p-5"
              >
                <div className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/[0.04] text-[12px] font-bold text-ink-muted">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span className="text-[15px] font-semibold leading-[1.35] text-ink sm:text-[16px]">{b.title}</span>
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                        style={{ backgroundColor: s.bg, color: s.text }}
                      >
                        {c.blockers.impacts[b.impact]}
                      </span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{b.detail}</p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>

        <aside className="rounded-[24px] border border-ink/[0.08] bg-ink p-5 text-white shadow-card lg:sticky lg:top-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
            {c.summary.takeaways.topBlocker}
          </p>
          <p className="mt-2 text-[18px] font-semibold leading-[1.25]">{result.blockers[0]?.title}</p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/12">
            <div className="h-full w-2/3 rounded-full bg-[#FF7A45]" />
          </div>
          <p className="mt-4 text-[12.5px] leading-[1.55] text-white/68">{c.pageBlockers.sub}</p>
        </aside>
      </div>
    </PageShell>
  )
}

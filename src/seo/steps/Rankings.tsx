import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import { formatMoney } from '../lib/currencies'
import type { AnalysisResult, KeywordRow } from '../lib/types'

const RANK_COLOUR: Record<KeywordRow['currentRankBand'], string> = {
  top3: '#22c55e',
  page1: '#FF7A45',
  'page2-3': '#f59e0b',
  page4plus: '#ef4444',
  unranked: '#8A8791',
}

function rankWidth(band: KeywordRow['currentRankBand']) {
  switch (band) {
    case 'top3':
      return '100%'
    case 'page1':
      return '78%'
    case 'page2-3':
      return '38%'
    case 'page4plus':
      return '12%'
    case 'unranked':
      return '4%'
  }
}

interface Props {
  result: AnalysisResult
  onBack: () => void
  onNext: () => void
}

export function RankingsPage({ result, onBack, onNext }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  return (
    <PageShell
      step={1}
      total={4}
      eyebrow={c.pageRankings.eyebrow}
      headline={c.pageRankings.headline}
      sub={c.pageRankings.sub}
      result={result}
      onBack={onBack}
      onNext={onNext}
    >
      <ul className="space-y-2.5">
        {result.keywords.map((k, idx) => (
          <motion.li
            key={k.keyword}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            className="rounded-card border border-ink/[0.06] bg-white p-4 shadow-ring sm:p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[15px] font-semibold text-ink">{k.keyword}</span>
              <span className="text-[12px] font-medium text-ink-muted">
                {k.monthlySearches.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB')} {c.rankings.searchesPerMo}
                {' · '}
                <span className="font-bold text-[#FF7A45]">
                  {k.estMonthlyValue > 0 ? `+${formatMoney(k.estMonthlyValue, result.currency, lang)}/${c.curve.perMonth}` : '—'}
                </span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.05]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: RANK_COLOUR[k.currentRankBand] }}
                  initial={{ width: 0 }}
                  animate={{ width: rankWidth(k.currentRankBand) }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + idx * 0.04 }}
                />
              </div>
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{ backgroundColor: `${RANK_COLOUR[k.currentRankBand]}1f`, color: RANK_COLOUR[k.currentRankBand] }}
              >
                {c.rankings.bands[k.currentRankBand]}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </PageShell>
  )
}

/* ─────────────────  Shared shell, also exported  ───────────────── */

export function PageShell({
  step,
  total,
  eyebrow,
  headline,
  sub,
  result,
  onBack,
  onNext,
  children,
  nextLabelOverride,
}: {
  step: number
  total: number
  eyebrow: string
  headline: string
  sub: string
  result: AnalysisResult
  onBack: () => void
  onNext: () => void
  children: React.ReactNode
  nextLabelOverride?: string
}) {
  const { lang } = useLang()
  const c = COPY[lang]
  const isLast = step === total - 1 // step before summary
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col bg-surface-1"
    >
      {/* Header — right padding leaves room for the modal's X close button */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] px-5 py-3.5 pr-14 sm:px-8 sm:pr-20">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
            <TrendingUp size={14} strokeWidth={2.4} />
          </span>
          <span className="truncate text-[13px] font-semibold text-ink">{result.domain}</span>
          <span className="hidden md:inline text-[12px] text-ink-muted">·</span>
          <span className="hidden md:inline truncate text-[12px] text-ink-muted">{result.inferredIndustry}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i + 1 === step ? 'w-8 bg-[#FF7A45]' : i + 1 < step ? 'w-4 bg-ink/30' : 'w-4 bg-ink/10'
              }`}
            />
          ))}
          <span className="ml-2 hidden sm:inline text-[11px] font-semibold text-ink-muted">{c.nav.pageOf(step, total)}</span>
        </div>
      </header>

      {/* Page content */}
      <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        <div className="mx-auto w-full max-w-[920px] px-5 py-8 sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">{eyebrow}</p>
          <h2
            className="mt-2 text-ink"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 40px)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.018em',
            }}
          >
            {headline}
          </h2>
          <p className="mt-2 max-w-[640px] text-[14.5px] leading-[1.55] text-ink-soft">{sub}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>

      {/* Footer nav */}
      <footer className="flex items-center justify-between gap-3 border-t border-ink/[0.06] bg-surface-2 px-5 py-3.5 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink"
        >
          <ArrowLeft size={14} strokeWidth={2.4} />
          {c.nav.back}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A45] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#F15F2B] hover:shadow-pop"
        >
          {nextLabelOverride ?? (isLast ? c.nav.finish : c.nav.next)}
          <ArrowRight size={14} strokeWidth={2.4} />
        </button>
      </footer>
    </motion.section>
  )
}

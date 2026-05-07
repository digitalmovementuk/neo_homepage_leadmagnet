import { useEffect, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Loader2, RotateCcw, TrendingUp } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import type { AnalysisResult, KeywordRow } from '../lib/types'
import { COPY, intGbp } from '../lib/copy'

interface Props {
  result: AnalysisResult
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  sending: boolean
  captureError: string | null
  onReset: () => void
}

const RANK_COLOUR: Record<KeywordRow['currentRankBand'], string> = {
  top3: '#22c55e',
  page1: '#FF7A45',
  'page2-3': '#f59e0b',
  page4plus: '#ef4444',
  unranked: '#8A8791',
}

/**
 * Dashboard layout — the full results, capture form and reset all live in
 * the modal viewport at once. No vertical scroll on desktop ≥ md sizes;
 * mobile stacks vertically and may scroll a little but still feels like a
 * single screen.
 *
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ HEADER · domain · industry · location          [Reset]      │
 *   ├──────────────────────────────┬──────────────────────────────┤
 *   │                              │                              │
 *   │   £8,400 / month             │  Top keywords (compact list) │
 *   │   90-day projection (mini)   │  Top blockers (compact list) │
 *   │                              │                              │
 *   ├──────────────────────────────┴──────────────────────────────┤
 *   │ CAPTURE · [Name] [Email]   [Send me the roadmap →]          │
 *   └─────────────────────────────────────────────────────────────┘
 */
export function ResultsStep({ result, onSubmit, sending, captureError, onReset }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  const headlineGbp = intGbp(result.monthlyOpportunityGbp)

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col bg-surface-1"
    >
      {/* Subtle radial glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.18), transparent 65%)',
        }}
      />

      {/* HEADER */}
      <header className="relative z-[1] flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2 min-w-0">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
            <TrendingUp size={14} strokeWidth={2.4} />
          </span>
          <span className="truncate text-[13px] font-semibold text-ink">
            {result.domain}
          </span>
          <span className="hidden sm:inline text-[12px] text-ink-muted">·</span>
          <span className="hidden sm:inline truncate text-[12px] text-ink-muted">
            {result.inferredIndustry}
          </span>
          <span className="hidden md:inline text-[12px] text-ink-muted">·</span>
          <span className="hidden md:inline truncate text-[12px] text-ink-muted">
            {result.inferredLocation}
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink"
        >
          <RotateCcw size={12} strokeWidth={2.4} />
          <span className="hidden sm:inline">{c.reset}</span>
        </button>
      </header>

      {/* MAIN GRID */}
      <div className="relative z-[1] grid flex-1 min-h-0 grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6">
        {/* LEFT — counter + curve */}
        <div className="flex flex-col gap-4 min-h-0">
          <Counter result={result} lang={lang} />
          <CurvePanel
            current={result.current.estMonthlyTrafficValueGbp}
            projected={result.projected.estMonthlyTrafficValueGbp}
            timelineDays={result.projected.timelineDays}
            lang={lang}
          />
        </div>

        {/* RIGHT — top keywords + top blockers */}
        <div className="grid grid-cols-1 gap-4 min-h-0 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
          <KeywordsPanel result={result} lang={lang} />
          <BlockersPanel result={result} lang={lang} />
        </div>
      </div>

      {/* CAPTURE FOOTER — inline form */}
      <footer className="relative z-[1] border-t border-ink/[0.06] bg-surface-2 px-5 py-4 sm:px-8 sm:py-5">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] sm:items-center"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
              {c.capture.eyebrow}
            </span>
            <span className="text-[13px] font-semibold text-ink">
              {c.capture.headline.replace(/\?$/, '')} → {headlineGbp}/{c.curve.perMonth}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder={c.capture.namePlaceholder}
              className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/55 focus:ring-2 focus:ring-ink/10"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={c.capture.emailPlaceholder}
              className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/55 focus:ring-2 focus:ring-ink/10"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {sending ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                {c.capture.submitting}
              </>
            ) : (
              <>
                {c.capture.submit}
                <ArrowRight size={15} strokeWidth={2.4} />
              </>
            )}
          </button>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
        </form>
        {captureError ? (
          <p
            role="alert"
            className="mt-2 text-[12px] text-red-700"
          >
            {captureError}
          </p>
        ) : (
          <p className="mt-2 text-[11px] text-ink-faint">{c.capture.note}</p>
        )}
      </footer>
    </motion.section>
  )
}

/* --------------------------------- COUNTER -------------------------------- */

function Counter({ result, lang }: { result: AnalysisResult; lang: 'de' | 'en' }) {
  const c = COPY[lang]
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? result.monthlyOpportunityGbp : 0)
  const [showMaths, setShowMaths] = useState(false)

  useEffect(() => {
    if (reduce) {
      setDisplay(result.monthlyOpportunityGbp)
      return
    }
    const start = performance.now()
    const duration = 1600
    const target = result.monthlyOpportunityGbp
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [result.monthlyOpportunityGbp, reduce])

  return (
    <div className="rounded-card-lg border border-ink/[0.06] bg-white p-5 shadow-card sm:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        {c.reveal.metricLabel}
      </p>
      <div
        className="mt-2 text-ink"
        style={{
          fontSize: 'clamp(48px, 7.5vw, 96px)',
          lineHeight: 0.95,
          fontWeight: 700,
          letterSpacing: '-0.035em',
          fontFeatureSettings: '"tnum" 1, "lnum" 1',
        }}
      >
        {intGbp(display)}
      </div>
      <p className="mt-1 text-[13px] text-ink-soft">{c.reveal.metricSuffix}</p>

      <button
        type="button"
        onClick={() => setShowMaths((v) => !v)}
        className="mt-3 text-[11px] uppercase tracking-[0.14em] font-bold text-[#FF7A45] transition-colors hover:text-[#F15F2B]"
      >
        {showMaths ? c.reveal.hideMaths : c.reveal.showMaths}
      </button>

      {showMaths && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 rounded-2xl border border-ink/[0.06] bg-surface-2 p-4 text-left text-[12px] leading-[1.5] text-ink-soft"
        >
          <p>{c.reveal.mathsIntro}</p>
          <ul className="mt-2 space-y-1">
            <li>· {c.reveal.mathsCtr}: <span className="text-ink font-semibold">{result.calculation.ctrCurveSource}</span></li>
            <li>· {c.reveal.mathsConv}: <span className="text-ink font-semibold">{(result.calculation.industryConversionRate * 100).toFixed(1)}%</span></li>
            <li>· {c.reveal.mathsAov}: <span className="text-ink font-semibold">{intGbp(result.calculation.industryAovGbp)}</span></li>
          </ul>
          <p className="mt-2 text-ink-muted">{result.calculation.notes}</p>
        </motion.div>
      )}
    </div>
  )
}

/* ----------------------------- 90-DAY CURVE ------------------------------- */

function CurvePanel({
  current,
  projected,
  timelineDays,
  lang,
}: {
  current: number
  projected: number
  timelineDays: number
  lang: 'de' | 'en'
}) {
  const c = COPY[lang]
  const reduce = useReducedMotion()
  const w = 600
  const h = 160
  const padX = 56
  const padY = 24

  const range = Math.max(projected - current, 1)
  const yFor = (v: number) => {
    const minY = padY
    const maxY = h - padY
    const t = (v - current) / range
    return maxY - t * (maxY - minY)
  }
  const xFor = (day: number) => padX + (day / timelineDays) * (w - padX * 2)

  const samples = 24
  const pts: Array<[number, number]> = []
  for (let i = 0; i <= samples; i++) {
    const day = (i / samples) * timelineDays
    const t = i / samples
    const eased = 1 - Math.pow(1 - t, 1.7)
    const v = current + eased * range
    pts.push([xFor(day), yFor(v)])
  }
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${xFor(timelineDays).toFixed(1)},${(h - padY).toFixed(1)} L${xFor(0).toFixed(1)},${(h - padY).toFixed(1)} Z`

  return (
    <div className="flex-1 min-h-0 rounded-card-lg border border-ink/[0.06] bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {c.curve.title}
        </p>
        <p className="text-[11px] text-ink-faint">{c.curve.range(timelineDays)}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full" role="img" aria-label={c.curve.aria}>
        <defs>
          <linearGradient id="curve-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF7A45" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#FF7A45" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((p, i) => (
          <line
            key={i}
            x1={padX}
            x2={w - padX}
            y1={padY + p * (h - padY * 2)}
            y2={padY + p * (h - padY * 2)}
            stroke="rgba(38,39,47,0.06)"
            strokeDasharray="3 5"
          />
        ))}

        <motion.path
          d={areaD}
          fill="url(#curve-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.5 }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#FF7A45"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <circle cx={xFor(0)} cy={yFor(current)} r={4} fill="#26272F" />
        <text
          x={xFor(0) - 8}
          y={yFor(current) + 4}
          textAnchor="end"
          fill="#66636D"
          fontSize="10"
          fontWeight="500"
        >
          {c.curve.todayPrefix}
        </text>

        <motion.g
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 1.5 }}
        >
          <circle cx={xFor(timelineDays)} cy={yFor(projected)} r={5} fill="#FF7A45" />
          <circle cx={xFor(timelineDays)} cy={yFor(projected)} r={10} fill="#FF7A45" fillOpacity="0.25" />
          <text
            x={xFor(timelineDays) - 8}
            y={yFor(projected) - 10}
            textAnchor="end"
            fill="#26272F"
            fontSize="11"
            fontWeight="700"
          >
            {c.curve.daySuffix} {timelineDays} · {intGbp(projected)}/{c.curve.perMonth}
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

/* ---------------------------- KEYWORDS PANEL ----------------------------- */

function KeywordsPanel({ result, lang }: { result: AnalysisResult; lang: 'de' | 'en' }) {
  const c = COPY[lang]
  const top = result.keywords.slice(0, 5)
  return (
    <div className="rounded-card-lg border border-ink/[0.06] bg-white p-4 shadow-card sm:p-5 min-h-0 flex flex-col">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
        {c.breakdown.tabs.rankings}
      </p>
      <ul className="mt-3 space-y-2 flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        {top.map((k, idx) => (
          <motion.li
            key={k.keyword}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="flex items-center gap-3"
          >
            <span className="flex-1 min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{k.keyword}</span>
              <span className="text-[11px] text-ink-muted">
                {k.monthlySearches.toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB')} {c.rankings.searchesPerMo}
                {' · '}
                <span className="font-semibold text-[#FF7A45]">
                  {k.estMonthlyValueGbp > 0 ? `+${intGbp(k.estMonthlyValueGbp)}` : '—'}
                </span>
              </span>
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
              style={{
                backgroundColor: `${RANK_COLOUR[k.currentRankBand]}1f`,
                color: RANK_COLOUR[k.currentRankBand],
              }}
            >
              {c.rankings.bands[k.currentRankBand]}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------- BLOCKERS PANEL ----------------------------- */

function BlockersPanel({ result, lang }: { result: AnalysisResult; lang: 'de' | 'en' }) {
  const c = COPY[lang]
  const impactColour = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#0369a1',
  } as const
  const top = result.blockers.slice(0, 3)
  return (
    <div className="rounded-card-lg border border-ink/[0.06] bg-white p-4 shadow-card sm:p-5 min-h-0 flex flex-col">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
        {c.breakdown.tabs.blockers}
      </p>
      <ul className="mt-3 space-y-2.5 flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        {top.map((b, idx) => (
          <motion.li
            key={b.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="flex gap-3"
          >
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: impactColour[b.impact] }}
              aria-label={c.blockers.impacts[b.impact]}
            />
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-semibold text-ink">{b.title}</span>
              <span className="block text-[11.5px] text-ink-muted leading-[1.5]">{b.detail}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

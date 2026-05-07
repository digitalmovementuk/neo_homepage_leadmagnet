import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Loader2, RotateCcw, TrendingUp } from 'lucide-react'
import type { AnalysisResult, KeywordRow } from '../lib/types'

interface Props {
  result: AnalysisResult
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  sending: boolean
  captureError: string | null
  onReset: () => void
}

const RANK_LABEL: Record<KeywordRow['currentRankBand'], string> = {
  top3: 'Top 3',
  page1: 'Seite 1',
  'page2-3': 'Seite 2–3',
  page4plus: 'Seite 4+',
  unranked: 'Unranked',
}

const RANK_COLOUR: Record<KeywordRow['currentRankBand'], string> = {
  top3: '#22c55e',
  page1: '#FF7A45',
  'page2-3': '#f59e0b',
  page4plus: '#ef4444',
  unranked: '#8A8791',
}

const formatGbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)

export function ResultsStep({ result, onSubmit, sending, captureError, onReset }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <Reveal result={result} />
      <Breakdown result={result} />
      <Capture
        result={result}
        onSubmit={onSubmit}
        sending={sending}
        captureError={captureError}
      />
      <div className="mx-auto flex w-full max-w-[1180px] justify-center px-5 pb-16 sm:px-8">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-muted transition-colors hover:text-ink"
        >
          <RotateCcw size={14} strokeWidth={2.4} />
          Weitere Domain analysieren
        </button>
      </div>
    </motion.section>
  )
}

/* --------------------------------- REVEAL --------------------------------- */

function Reveal({ result }: { result: AnalysisResult }) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? result.monthlyOpportunityGbp : 0)
  const [showMaths, setShowMaths] = useState(false)

  useEffect(() => {
    if (reduce) {
      setDisplay(result.monthlyOpportunityGbp)
      return
    }
    const start = performance.now()
    const duration = 1800
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
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[640px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.22), transparent 65%)',
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[1080px] flex-col items-center px-5 py-14 text-center sm:px-8 sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-ring">
          <TrendingUp size={13} strokeWidth={2.4} className="text-[#FF7A45]" />
          {result.domain} · {result.inferredIndustry} · {result.inferredLocation}
        </span>

        <p className="mt-8 text-[13px] uppercase tracking-[0.16em] text-ink-muted">
          Geschätzter ungenutzter Umsatz pro Monat
        </p>

        <div
          className="mt-3 text-ink"
          style={{
            fontSize: 'clamp(64px, 13vw, 180px)',
            lineHeight: 0.96,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            fontFeatureSettings: '"tnum" 1, "lnum" 1',
          }}
        >
          {formatGbp(display)}
        </div>
        <p className="mt-2 text-[15px] text-ink-soft">/ Monat aus organischer Suche</p>

        <button
          type="button"
          onClick={() => setShowMaths((v) => !v)}
          className="mt-6 text-[12px] uppercase tracking-[0.14em] font-bold text-[#FF7A45] transition-colors hover:text-[#F15F2B]"
        >
          {showMaths ? 'Schließen' : 'So haben wir gerechnet'}
        </button>

        {showMaths && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 max-w-[700px] rounded-2xl border border-ink/[0.06] bg-surface-2 p-6 text-left text-[13px] leading-[1.6] text-ink-soft"
          >
            <p>
              Summe über alle Keywords aus: <em>monatliches Suchvolumen × CTR an Zielposition × Branchen-Conversion-Rate × Branchen-AOV</em>, abzüglich aktuell geschätztem Wert auf aktueller Position.
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>
                · CTR-Kurve: <span className="text-ink font-medium">{result.calculation.ctrCurveSource}</span>
              </li>
              <li>
                · Conversion-Rate (Branche):{' '}
                <span className="text-ink font-medium">
                  {(result.calculation.industryConversionRate * 100).toFixed(1)}%
                </span>
              </li>
              <li>
                · AOV (Branche):{' '}
                <span className="text-ink font-medium">{formatGbp(result.calculation.industryAovGbp)}</span>
              </li>
            </ul>
            <p className="mt-3 text-ink-muted">{result.calculation.notes}</p>
          </motion.div>
        )}

        <div className="mt-12 w-full max-w-[860px]">
          <NinetyDayCurve
            currentValue={result.current.estMonthlyTrafficValueGbp}
            projectedValue={result.projected.estMonthlyTrafficValueGbp}
            timelineDays={result.projected.timelineDays}
          />
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- 90-DAY CURVE ------------------------------- */

function NinetyDayCurve({
  currentValue,
  projectedValue,
  timelineDays,
}: {
  currentValue: number
  projectedValue: number
  timelineDays: number
}) {
  const reduce = useReducedMotion()
  const w = 860
  const h = 240
  const padX = 64
  const padY = 36

  const range = Math.max(projectedValue - currentValue, 1)
  const yFor = (v: number) => {
    const minY = padY
    const maxY = h - padY
    const t = (v - currentValue) / range
    return maxY - t * (maxY - minY)
  }
  const xFor = (day: number) => padX + (day / timelineDays) * (w - padX * 2)

  const samples = 24
  const pts: Array<[number, number]> = []
  for (let i = 0; i <= samples; i++) {
    const day = (i / samples) * timelineDays
    const t = i / samples
    const eased = 1 - Math.pow(1 - t, 1.7)
    const v = currentValue + eased * range
    pts.push([xFor(day), yFor(v)])
  }
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${xFor(timelineDays).toFixed(1)},${(h - padY).toFixed(1)} L${xFor(0).toFixed(1)},${(h - padY).toFixed(1)} Z`

  return (
    <div className="rounded-card-lg border border-ink/[0.06] bg-white p-5 shadow-card sm:p-7">
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          90-Tage-Projektion
        </p>
        <p className="text-[12px] text-ink-muted">Heute → Tag {timelineDays}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full" role="img" aria-label="90-Tage-Projektion">
        <defs>
          <linearGradient id="curve-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF7A45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF7A45" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line
            key={i}
            x1={padX}
            x2={w - padX}
            y1={padY + p * (h - padY * 2)}
            y2={padY + p * (h - padY * 2)}
            stroke="rgba(38,39,47,0.08)"
            strokeDasharray="3 5"
          />
        ))}

        <motion.path
          d={areaD}
          fill="url(#curve-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.6 }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#FF7A45"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <circle cx={xFor(0)} cy={yFor(currentValue)} r={5} fill="#26272F" />
        <text
          x={xFor(0) - 8}
          y={yFor(currentValue) + 22}
          textAnchor="end"
          fill="#66636D"
          fontSize="11"
          fontWeight="500"
        >
          Heute · {formatGbp(currentValue)}/Mo
        </text>

        <motion.g
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 1.7 }}
        >
          <circle cx={xFor(timelineDays)} cy={yFor(projectedValue)} r={6} fill="#FF7A45" />
          <circle cx={xFor(timelineDays)} cy={yFor(projectedValue)} r={12} fill="#FF7A45" fillOpacity="0.25" />
          <text
            x={xFor(timelineDays) - 8}
            y={yFor(projectedValue) - 14}
            textAnchor="end"
            fill="#26272F"
            fontSize="13"
            fontWeight="700"
          >
            Tag {timelineDays} · {formatGbp(projectedValue)}/Mo
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

/* -------------------------------- BREAKDOWN ------------------------------- */

type Tab = 'rankings' | 'money' | 'blockers'

function Breakdown({ result }: { result: AnalysisResult }) {
  const [tab, setTab] = useState<Tab>('rankings')

  return (
    <div className="relative bg-surface-2 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
          Die Aufschlüsselung
        </p>
        <h3
          className="mt-2 max-w-[640px] text-ink"
          style={{
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.018em',
          }}
        >
          Warum diese Zahl nicht erfunden ist.
        </h3>

        <div className="mt-7 inline-flex flex-wrap gap-1.5 rounded-full border border-ink/10 bg-white p-1 shadow-ring">
          <TabButton id="rankings" current={tab} onClick={setTab}>
            Aktuelle Rankings
          </TabButton>
          <TabButton id="money" current={tab} onClick={setTab}>
            Geld auf dem Tisch
          </TabButton>
          <TabButton id="blockers" current={tab} onClick={setTab}>
            Was Sie blockiert
          </TabButton>
        </div>

        <div className="mt-7">
          {tab === 'rankings' && <RankingsView result={result} />}
          {tab === 'money' && <MoneyView result={result} />}
          {tab === 'blockers' && <BlockersView result={result} />}
        </div>
      </div>
    </div>
  )
}

function TabButton({
  id,
  current,
  onClick,
  children,
}: {
  id: Tab
  current: Tab
  onClick: (t: Tab) => void
  children: React.ReactNode
}) {
  const active = id === current
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
        active ? 'bg-[#FF7A45] text-white' : 'text-ink hover:bg-ink/[0.04]'
      }`}
    >
      {children}
    </button>
  )
}

function RankingsView({ result }: { result: AnalysisResult }) {
  return (
    <ul className="space-y-3">
      {result.keywords.map((k, idx) => (
        <motion.li
          key={k.keyword}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="rounded-card border border-ink/[0.06] bg-white p-4 shadow-ring sm:p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[15px] font-semibold text-ink">{k.keyword}</span>
            <span className="text-[12px] font-medium text-ink-muted">
              {k.monthlySearches.toLocaleString('de-DE')} Suchen/Mo
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.05]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: RANK_COLOUR[k.currentRankBand] }}
                initial={{ width: 0 }}
                animate={{ width: rankWidth(k.currentRankBand) }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + idx * 0.05 }}
              />
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{
                backgroundColor: `${RANK_COLOUR[k.currentRankBand]}1f`,
                color: RANK_COLOUR[k.currentRankBand],
              }}
            >
              {RANK_LABEL[k.currentRankBand]}
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  )
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

function MoneyView({ result }: { result: AnalysisResult }) {
  return (
    <div className="overflow-hidden rounded-card border border-ink/[0.06] bg-white shadow-ring">
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-ink/[0.06] bg-surface-2 text-[11px] uppercase tracking-[0.1em] text-ink-muted">
              <th className="px-5 py-3 font-bold">Keyword</th>
              <th className="px-5 py-3 text-right font-bold">Suchen/Mo</th>
              <th className="px-5 py-3 text-right font-bold">Jetzt</th>
              <th className="px-5 py-3 text-right font-bold">Wenn Seite 1</th>
              <th className="px-5 py-3 text-right font-bold">£/Mo</th>
            </tr>
          </thead>
          <tbody>
            {result.keywords.map((k) => (
              <tr key={k.keyword} className="border-b border-ink/[0.04] last:border-b-0">
                <td className="px-5 py-3.5 text-ink">{k.keyword}</td>
                <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                  {k.monthlySearches.toLocaleString('de-DE')}
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                  {k.estCurrentClicks} Klicks
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                  {k.estPage1Clicks} Klicks
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums font-bold text-[#FF7A45]">
                  {formatGbp(k.estMonthlyValueGbp)}
                </td>
              </tr>
            ))}
            <tr className="bg-[#FF7A45]/[0.08]">
              <td colSpan={4} className="px-5 py-3.5 text-right font-bold text-ink">
                Gesamtopportunity pro Monat
              </td>
              <td className="px-5 py-3.5 text-right tabular-nums text-[15px] font-bold text-[#FF7A45]">
                {formatGbp(result.monthlyOpportunityGbp)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BlockersView({ result }: { result: AnalysisResult }) {
  const impactStyle = {
    high: { bg: '#fef2f2', text: '#b91c1c', label: 'Hoher Impact' },
    medium: { bg: '#fff7ed', text: '#c2410c', label: 'Mittlerer Impact' },
    low: { bg: '#f0f9ff', text: '#0369a1', label: 'Niedriger Impact' },
  } as const
  return (
    <ul className="space-y-3">
      {result.blockers.map((b, idx) => {
        const s = impactStyle[b.impact]
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
                {s.label}
              </span>
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{b.detail}</p>
          </motion.li>
        )
      })}
    </ul>
  )
}

/* --------------------------------- CAPTURE -------------------------------- */

function Capture({
  result,
  onSubmit,
  sending,
  captureError,
}: {
  result: AnalysisResult
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  sending: boolean
  captureError: string | null
}) {
  const formRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative bg-white py-16 sm:py-20" ref={formRef} id="capture">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.18), transparent 65%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[680px] px-5 text-center sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
          Die 90-Tage-Roadmap
        </p>
        <h3
          className="mt-3 text-ink"
          style={{
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.018em',
          }}
        >
          Möchten Sie die volle Roadmap?
        </h3>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.55] text-ink-soft">
          Der detaillierte Plan, um diese {formatGbp(result.monthlyOpportunityGbp)}/Monat zu erschließen — Keyword für Keyword, Blocker für Blocker, in 90 Tagen.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 w-full max-w-[460px] rounded-card-lg border border-ink/10 bg-surface-2 p-6 text-left shadow-card"
        >
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
              Name
            </span>
            <input
              name="name"
              required
              placeholder="Ihr vollständiger Name"
              className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/55 focus:ring-2 focus:ring-ink/10"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
              E-Mail
            </span>
            <input
              name="email"
              type="email"
              required
              placeholder="ihre@firma.com"
              className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/55 focus:ring-2 focus:ring-ink/10"
            />
          </label>

          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {captureError && (
            <div
              role="alert"
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
            >
              {captureError}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Wird gesendet…
              </>
            ) : (
              <>
                Roadmap an mich senden
                <ArrowRight size={16} strokeWidth={2.4} />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-faint">
            Kein Spam. Wir senden die Roadmap einmal und hören nur auf Wunsch wieder.
          </p>
        </form>
      </div>
    </div>
  )
}

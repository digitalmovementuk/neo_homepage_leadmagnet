import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2, Shield, Sparkles, TrendingUp } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import { formatMoney } from '../lib/currencies'
import { COUNTRY_DIALS, defaultCountryByLang, type CountryDial } from '../lib/countries'
import type { AnalysisResult } from '../lib/types'

interface Props {
  result: AnalysisResult
  sending: boolean
  captureError: string | null
  onBack: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>, phoneFull: string) => void
  onReset: () => void
}

export function SummaryPage({ result, sending, captureError, onBack, onSubmit, onReset: _onReset }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  const [country, setCountry] = useState<CountryDial>(() => defaultCountryByLang(lang))
  const [phone, setPhone] = useState('')

  // Top 2 wins by est. monthly value
  const topWins = useMemo(
    () => [...result.keywords].sort((a, b) => b.estMonthlyValue - a.estMonthlyValue).slice(0, 2),
    [result.keywords],
  )
  const topBlocker = result.blockers[0]
  const headlineGbp = formatMoney(result.monthlyOpportunity, result.currency, lang)
  const projectedGbp = formatMoney(result.projected.estMonthlyTrafficValue, result.currency, lang)

  const handle = (e: FormEvent<HTMLFormElement>) => {
    const phoneFull = phone.trim() ? `${country.dial} ${phone.trim()}` : ''
    onSubmit(e, phoneFull)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col bg-surface-1"
    >
      {/* Header — right padding leaves room for the modal's X close button */}
      <header className="flex min-h-[58px] flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] px-4 py-3 pr-16 sm:px-8 sm:pr-20">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
            <TrendingUp size={14} strokeWidth={2.4} />
          </span>
          <span className="truncate text-[13px] font-semibold text-ink">{result.domain}</span>
          <span className="hidden md:inline text-[12px] text-ink-muted">·</span>
          <span className="hidden md:inline truncate text-[12px] text-ink-muted">{result.inferredIndustry}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === 4 ? 'w-8 bg-[#FF7A45]' : 'w-4 bg-ink/30'}`}
            />
          ))}
          <span className="ml-2 hidden sm:inline text-[11px] font-semibold text-ink-muted">{c.nav.pageOf(4, 4)}</span>
        </div>
      </header>

      {/* Main 2-col */}
      <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        <div className="mx-auto w-full max-w-[1120px] px-5 py-5 sm:px-8 sm:py-7 lg:py-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-ring">
              <Sparkles size={13} strokeWidth={2.4} className="text-[#FF7A45]" />
              {c.summary.eyebrow}
            </span>
            <h2
              className="mt-4 text-ink"
              style={{
                fontSize: 'clamp(26px, 4vw, 46px)',
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {c.summary.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-[640px] text-[14.5px] leading-[1.55] text-ink-soft sm:text-[15.5px]">
              {c.summary.sub}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-6">
            {/* LEFT — Key takeaways */}
            <div className="contents lg:block lg:space-y-3">
              {/* Headline opportunity card */}
              <div className="order-1 rounded-[24px] border border-ink/[0.07] bg-white p-5 shadow-card sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  {c.summary.takeaways.opportunity}
                </p>
                <div
                  className="mt-1 text-ink"
                  style={{
                    fontSize: 'clamp(40px, 5.6vw, 72px)',
                    lineHeight: 0.95,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    fontFeatureSettings: '"tnum" 1, "lnum" 1',
                  }}
                >
                  {headlineGbp}
                </div>
                <p className="mt-1 text-[13px] text-ink-soft">{c.reveal.metricSuffix}</p>
              </div>

              {/* Top wins */}
              <div className="order-3 rounded-[24px] border border-ink/[0.07] bg-white p-5 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  {c.summary.takeaways.topWins}
                </p>
                <ul className="mt-3 space-y-2">
                  {topWins.map((k) => (
                    <li key={k.keyword} className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-[14px] font-semibold text-ink">{k.keyword}</span>
                      <span className="shrink-0 text-[13px] font-bold text-[#FF7A45]">
                        +{formatMoney(k.estMonthlyValue, result.currency, lang)}/{c.curve.perMonth}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top blocker + 90-day */}
              <div className="order-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {topBlocker && (
                  <div className="rounded-[24px] border border-ink/[0.07] bg-white p-5 shadow-card">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {c.summary.takeaways.topBlocker}
                    </p>
                    <p className="mt-2 text-[13.5px] font-semibold text-ink">{topBlocker.title}</p>
                  </div>
                )}
                <div className="rounded-[24px] border border-ink/[0.07] bg-white p-5 shadow-card">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                    {c.summary.takeaways.timeline}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.45] text-ink">
                    {c.summary.takeaways.timelineBody(result.projected.timelineDays, projectedGbp)}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Contact form */}
            <form
              onSubmit={handle}
              className="order-2 flex flex-col gap-3 rounded-[24px] border border-[#FF7A45]/20 bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-0 lg:order-none"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
                  {c.capture.eyebrow}
                </p>
                <h3
                  className="mt-1 text-ink"
                  style={{
                    fontSize: 'clamp(20px, 2.4vw, 26px)',
                    lineHeight: 1.15,
                    fontWeight: 700,
                    letterSpacing: '-0.014em',
                  }}
                >
                  {c.summary.contactHeadline}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-ink-soft">{c.summary.contactSub}</p>
              </div>

              <input
                name="name"
                required
                placeholder={c.summary.namePlaceholder}
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/45 focus:ring-2 focus:ring-[#FF7A45]/15"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={c.summary.emailPlaceholder}
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/45 focus:ring-2 focus:ring-[#FF7A45]/15"
              />

              <div className="flex items-stretch gap-2">
                <CountryDialPicker
                  value={country}
                  onChange={setCountry}
                  ariaLabel={c.summary.phoneCountryAria}
                  lang={lang}
                />
                <input
                  name="phoneLocal"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={c.summary.phonePlaceholder}
                  className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition focus:border-ink/45 focus:ring-2 focus:ring-[#FF7A45]/15"
                />
              </div>

              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {captureError && (
                <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-[13px] text-red-700">
                  {captureError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {c.summary.submitting}
                  </>
                ) : (
                  <>
                    {c.summary.submit}
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </>
                )}
              </button>

              <ul className="mt-1 space-y-1.5 border-t border-ink/[0.06] pt-3">
                {c.summary.trust.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-[11.5px] text-ink-soft">
                    <Shield size={11} strokeWidth={2.4} className="shrink-0 text-[#FF7A45]" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="text-center text-[10.5px] text-ink-faint">{c.summary.note}</p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer nav (Back only — submit is in form) */}
      <footer className="flex items-center justify-between gap-3 border-t border-ink/[0.06] bg-surface-2 px-5 py-3.5 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink"
        >
          <ArrowLeft size={14} strokeWidth={2.4} />
          {c.nav.back}
        </button>
        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {result.inferredLocation}
        </span>
      </footer>
    </motion.section>
  )
}

/* ─────────────  Country dial picker  ───────────── */

function CountryDialPicker({
  value,
  onChange,
  ariaLabel,
  lang,
}: {
  value: CountryDial
  onChange: (c: CountryDial) => void
  ariaLabel: string
  lang: 'de' | 'en'
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="inline-flex h-full items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
      >
        <span className="text-[16px]" aria-hidden>
          {value.flag}
        </span>
        <span className="tabular-nums">{value.dial}</span>
        <ChevronDown size={13} strokeWidth={2.4} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label={ariaLabel}
            className="absolute left-0 mt-2 max-h-[280px] min-w-[260px] overflow-y-auto rounded-2xl border border-ink/10 bg-white/95 backdrop-blur-xl shadow-[0_30px_60px_-30px_rgba(38,39,47,0.25)] z-[60]"
            data-lenis-prevent
          >
            {COUNTRY_DIALS.map((cd) => {
              const active = cd.code === value.code && cd.dial === value.dial
              return (
                <li key={`${cd.code}-${cd.dial}`} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(cd)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] transition-colors hover:bg-ink/[0.04] ${
                      active ? 'bg-ink/[0.04]' : ''
                    }`}
                  >
                    <span className="w-6 text-[16px]" aria-hidden>
                      {cd.flag}
                    </span>
                    <span className="w-12 shrink-0 font-mono text-[12px] font-semibold tabular-nums text-ink">
                      {cd.dial}
                    </span>
                    <span className="flex-1 truncate text-ink-soft">{cd.name[lang]}</span>
                    {active && <Check size={14} strokeWidth={2.6} className="text-[#FF7A45]" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

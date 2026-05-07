import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import { CURRENCIES, getCurrency } from '../lib/currencies'

export interface InputPayload {
  domain: string
  currency: string
  aov: number
  conversionRate: number // fraction, e.g. 0.03
  industryHint: string
}

interface Props {
  initial: InputPayload
  onAnalyse: (p: InputPayload) => void
  error: string | null
}

export function InputStep({ initial, onAnalyse, error }: Props) {
  const { lang, setLang } = useLang()
  const c = COPY[lang]

  const [domain, setDomain] = useState(initial.domain)
  const [currency, setCurrency] = useState(initial.currency)
  const [aov, setAov] = useState<string>(String(initial.aov))
  const [convRate, setConvRate] = useState<string>(String((initial.conversionRate * 100).toFixed(1)))
  const [industryHint, setIndustryHint] = useState(initial.industryHint)

  const cur = useMemo(() => getCurrency(currency), [currency])

  // Reset AOV prefill when currency changes (only if user hasn't typed a custom value)
  const lastAutoAovRef = useRef(initial.aov)
  useEffect(() => {
    const numericAov = Number(aov)
    if (numericAov === lastAutoAovRef.current) {
      setAov(String(cur.defaultAov))
      lastAutoAovRef.current = cur.defaultAov
    }
  }, [cur, aov])

  const valid = domain.trim().length >= 4 && Number(aov) > 0 && Number(convRate) > 0

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!valid) return
    onAnalyse({
      domain: domain.trim(),
      currency,
      aov: Number(aov),
      conversionRate: Math.min(1, Math.max(0.0001, Number(convRate) / 100)),
      industryHint: industryHint.trim(),
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col items-center overflow-y-auto px-4 pb-7 pt-8 sm:px-8 sm:pb-10 sm:pt-10"
      data-lenis-prevent
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[440px] max-w-[1180px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.16), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[840px]"
      >
        {/* Top row: language pills (left) + currency picker (right) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
          <div
            role="group"
            aria-label={c.langPicker.label}
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1 shadow-ring"
          >
            <LangButton active={lang === 'de'} onClick={() => setLang('de')} label={c.langPicker.de} flag={<FlagDE />} />
            <LangButton active={lang === 'en'} onClick={() => setLang('en')} label={c.langPicker.en} flag={<FlagGB />} />
          </div>
          <CurrencyPicker
            value={currency}
            onChange={setCurrency}
            ariaLabel={c.currencyPicker.label}
            lang={lang}
          />
        </div>

        {/* Eyebrow + Title */}
        <div className="mx-auto mt-7 max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-ring">
            <Sparkles size={13} strokeWidth={2.4} className="text-[#FF7A45]" />
            {c.input.eyebrow}
          </span>

          <h1
            className="mt-5 text-ink"
            style={{
              fontSize: 'clamp(34px, 5vw, 64px)',
              lineHeight: 1.0,
              fontWeight: 700,
              letterSpacing: '-0.022em',
            }}
          >
            {c.input.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[560px] text-[14.5px] leading-[1.55] text-ink-soft sm:text-[16px]">
            {c.input.sub}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handle} className="mx-auto mt-7 max-w-[760px]">
          {/* Domain */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">
              {c.input.domainLabel}
            </span>
            <input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              placeholder={c.input.placeholder}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              aria-label={c.input.domainAria}
              className="w-full rounded-full border border-ink/12 bg-white px-5 py-3.5 text-[16px] text-ink placeholder:text-ink-faint outline-none shadow-soft transition focus:border-ink/40 focus:ring-2 focus:ring-[#FF7A45]/15 sm:text-[17px]"
            />
          </label>

          {/* Refine section */}
          <div className="mt-5 rounded-[24px] border border-ink/[0.06] bg-surface-2 p-4 shadow-ring sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
              {c.input.refineHeading}
            </p>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-ink-muted">
              {c.input.refineSub}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* AOV */}
              <label className="block">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                  {c.input.aovLabel}
                </span>
                <div className="flex items-center rounded-full border border-ink/12 bg-white pl-4 pr-1 shadow-ring focus-within:border-ink/40 focus-within:ring-2 focus-within:ring-[#FF7A45]/15">
                  <span className="text-[14px] font-semibold text-ink-muted">{cur.symbol}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={aov}
                    onChange={(e) => setAov(e.target.value)}
                    className="flex-1 bg-transparent px-2 py-2.5 text-[15px] text-ink outline-none"
                    aria-label={c.input.aovLabel}
                  />
                </div>
                <span className="mt-1 block text-[11px] text-ink-faint">{c.input.aovHint}</span>
              </label>

              {/* Conversion rate */}
              <label className="block">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                  {c.input.conversionRateLabel}
                </span>
                <div className="flex items-center rounded-full border border-ink/12 bg-white pl-4 pr-3 shadow-ring focus-within:border-ink/40 focus-within:ring-2 focus-within:ring-[#FF7A45]/15">
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0.1}
                    max={100}
                    step={0.1}
                    value={convRate}
                    onChange={(e) => setConvRate(e.target.value)}
                    className="flex-1 bg-transparent px-2 py-2.5 text-[15px] text-ink outline-none"
                    aria-label={c.input.conversionRateLabel}
                  />
                  <span className="text-[14px] font-semibold text-ink-muted">%</span>
                </div>
                <span className="mt-1 block text-[11px] text-ink-faint">{c.input.conversionRateHint}</span>
              </label>
            </div>

            <label className="mt-3 block">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                {c.input.industryHintLabel}
              </span>
              <input
                type="text"
                value={industryHint}
                onChange={(e) => setIndustryHint(e.target.value)}
                placeholder={c.input.industryHintPlaceholder}
                className="w-full rounded-full border border-ink/12 bg-white px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-faint outline-none shadow-ring transition focus:border-ink/40 focus:ring-2 focus:ring-[#FF7A45]/15"
              />
              <span className="mt-1 block text-[11px] text-ink-faint">{c.input.industryHintHelp}</span>
            </label>
          </div>

          {/* Submit + footnote */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={!valid}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto sm:min-w-[260px]"
            >
              {c.input.submit}
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>

            {error ? (
              <p
                role="alert"
                className="w-full max-w-[520px] rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] leading-[1.5] text-red-700"
              >
                {error}
              </p>
            ) : (
              <p className="text-center text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {c.input.footnote}
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </motion.section>
  )
}

/* ─────────────────── Sub-components ─────────────────── */

function LangButton({
  active,
  onClick,
  label,
  flag,
}: {
  active: boolean
  onClick: () => void
  label: string
  flag: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-all ${
        active ? 'bg-ink text-white shadow-card' : 'text-ink-soft hover:bg-ink/[0.04]'
      }`}
    >
      <span className="block h-3.5 w-5 overflow-hidden rounded-[2px] ring-1 ring-black/10">{flag}</span>
      {label}
      {active && <Check size={13} strokeWidth={2.6} className="text-[#FF7A45]" />}
    </button>
  )
}

function CurrencyPicker({
  value,
  onChange,
  ariaLabel,
  lang,
}: {
  value: string
  onChange: (code: string) => void
  ariaLabel: string
  lang: 'de' | 'en'
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const cur = getCurrency(value)

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
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-ring transition-colors hover:bg-ink/[0.03]"
      >
        <span className="text-[14px] tabular-nums">{cur.symbol}</span>
        <span>{cur.code}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.4}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
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
            className="absolute right-0 mt-2 max-h-[320px] min-w-[240px] overflow-y-auto rounded-2xl border border-ink/10 bg-white/95 backdrop-blur-xl shadow-[0_30px_60px_-30px_rgba(38,39,47,0.25)] z-[60]"
            data-lenis-prevent
          >
            {CURRENCIES.map((c) => {
              const active = c.code === value
              return (
                <li key={c.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.code)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-[13px] transition-colors hover:bg-ink/[0.04] ${
                      active ? 'bg-ink/[0.04]' : ''
                    }`}
                  >
                    <span className="w-8 shrink-0 text-[14px] font-bold tabular-nums text-ink">{c.symbol}</span>
                    <span className="w-10 shrink-0 font-mono text-[12px] font-semibold text-ink-muted">{c.code}</span>
                    <span className="flex-1 text-ink">{c.name[lang]}</span>
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

/* ──────────────────────  Inline Flag SVGs  ────────────────────── */

function FlagDE() {
  return (
    <svg viewBox="0 0 5 3" className="block h-full w-full" preserveAspectRatio="none">
      <rect width="5" height="1" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  )
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className="block h-full w-full" preserveAspectRatio="none">
      <clipPath id="seo-gb-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="seo-gb-clip2">
        <path d="M30,15 h30 v15 z M30,15 v15 h-30 z M30,15 h-30 v-15 z M30,15 v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#seo-gb-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#seo-gb-clip2)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

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
  const [localError, setLocalError] = useState<string | null>(null)

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

  // The button is enabled as long as the business numbers are valid. The
  // "need at least one anchor (domain OR industry hint)" rule is enforced on
  // submit with a clear inline message — never via a silently disabled button.
  const hasDomain = domain.trim().length >= 4
  const hasHint = industryHint.trim().length >= 3
  const numbersValid = Number(aov) > 0 && Number(convRate) > 0
  const valid = numbersValid

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!numbersValid) return
    if (!hasDomain && !hasHint) {
      setLocalError(
        lang === 'de'
          ? 'Bitte Website angeben — oder Branche bzw. Top-Service beschreiben, damit wir die Analyse anpassen können.'
          : 'Please add a website — or describe your industry / top service so we can tailor the analysis.',
      )
      return
    }
    setLocalError(null)
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
      className="relative flex h-full w-full flex-col items-center overflow-y-auto px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-12"
      data-lenis-prevent
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[720px]"
      >
        {/* Top row: language pills (left) + currency picker (right) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
          <div
            role="group"
            aria-label={c.langPicker.label}
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/65 p-1 backdrop-blur-md"
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
        <div className="mx-auto mt-9 max-w-[640px] text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            <Sparkles size={12} strokeWidth={2.2} className="text-[#FF7A45]" />
            {c.input.eyebrow}
          </span>

          <h1
            className="mt-4 text-ink"
            style={{
              fontSize: 'clamp(30px, 3.6vw, 44px)',
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: '-0.025em',
            }}
          >
            {c.input.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-[14.5px] leading-[1.55] text-ink-muted sm:text-[15.5px]">
            {c.input.sub}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handle} className="mx-auto mt-8 max-w-[560px] space-y-4">
          {/* Domain */}
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-ink-muted">
              {c.input.domainLabel} <span className="font-normal text-ink-faint">optional</span>
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
              className="w-full rounded-[10px] border border-ink/[0.12] bg-white/55 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition hover:border-ink/[0.22] hover:bg-white/70 focus:border-ink focus:bg-white/85"
            />
          </label>

          {/* AOV + Conversion rate */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-ink-muted">
                {c.input.aovLabel}
              </span>
              <div className="flex items-center rounded-[10px] border border-ink/[0.12] bg-white/55 pl-4 transition hover:border-ink/[0.22] hover:bg-white/70 focus-within:border-ink focus-within:bg-white/85">
                <span className="text-[14px] font-medium text-ink-muted">{cur.symbol}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={aov}
                  onChange={(e) => setAov(e.target.value)}
                  className="flex-1 bg-transparent px-2 py-3 text-[14.5px] text-ink outline-none"
                  aria-label={c.input.aovLabel}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-ink-muted">
                {c.input.conversionRateLabel}
              </span>
              <div className="flex items-center rounded-[10px] border border-ink/[0.12] bg-white/55 pr-4 transition hover:border-ink/[0.22] hover:bg-white/70 focus-within:border-ink focus-within:bg-white/85">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={convRate}
                  onChange={(e) => setConvRate(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-[14.5px] text-ink outline-none"
                  aria-label={c.input.conversionRateLabel}
                />
                <span className="text-[14px] font-medium text-ink-muted">%</span>
              </div>
            </label>
          </div>

          {/* Industry hint */}
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-ink-muted">
              {c.input.industryHintLabel} <span className="font-normal text-ink-faint">optional</span>
            </span>
            <input
              type="text"
              value={industryHint}
              onChange={(e) => setIndustryHint(e.target.value)}
              placeholder={c.input.industryHintPlaceholder}
              className="w-full rounded-[10px] border border-ink/[0.12] bg-white/55 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition hover:border-ink/[0.22] hover:bg-white/70 focus:border-ink focus:bg-white/85"
            />
          </label>

          {/* Submit + footnote */}
          <div className="!mt-7 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={!valid}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0037D8] px-6 text-[14px] font-medium tracking-[-0.01em] text-white transition-colors duration-150 hover:bg-[#0029a8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles size={14} strokeWidth={2.4} />
              {c.input.submit}
              <ArrowRight size={14} strokeWidth={2.2} />
            </button>

            {localError || error ? (
              <p
                role="alert"
                className="w-full max-w-[480px] rounded-xl border border-red-200/70 bg-red-50/70 px-4 py-2.5 text-center text-[13px] leading-[1.5] text-red-700 backdrop-blur-sm"
              >
                {localError || error}
              </p>
            ) : (
              <p className="text-center text-[12px] tracking-[-0.01em] text-ink-faint">
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

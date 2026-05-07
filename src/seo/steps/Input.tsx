import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'

interface Props {
  initialDomain: string
  onAnalyse: (domain: string) => void
  error: string | null
}

export function InputStep({ initialDomain, onAnalyse, error }: Props) {
  const { lang, setLang } = useLang()
  const c = COPY[lang]
  const [value, setValue] = useState(initialDomain)

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed.length < 4) return
    onAnalyse(trimmed)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.18), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[920px] text-center"
      >
        {/* Language picker — two big brand-aligned flag buttons */}
        <div
          role="group"
          aria-label={c.langPicker.label}
          className="mx-auto mb-7 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white p-1 shadow-ring"
        >
          <LangButton
            active={lang === 'de'}
            onClick={() => setLang('de')}
            label={c.langPicker.de}
            flag={<FlagDE />}
          />
          <LangButton
            active={lang === 'en'}
            onClick={() => setLang('en')}
            label={c.langPicker.en}
            flag={<FlagGB />}
          />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-ring">
          <Sparkles size={13} strokeWidth={2.4} className="text-[#FF7A45]" />
          {c.input.eyebrow}
        </span>

        <h1
          className="mt-6 text-ink"
          style={{
            fontSize: 'clamp(36px, 5.4vw, 76px)',
            lineHeight: 1.0,
            fontWeight: 700,
            letterSpacing: '-0.022em',
          }}
        >
          {c.input.title}
        </h1>

        <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.55] text-ink-soft sm:text-[17px]">
          {c.input.sub}
        </p>

        <form onSubmit={handle} className="mx-auto mt-8 w-full max-w-[640px]">
          <div className="relative flex w-full flex-col gap-2 rounded-[28px] border border-ink/10 bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:rounded-full">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              placeholder={c.input.placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label={c.input.domainAria}
              className="flex-1 rounded-2xl bg-transparent px-5 py-4 text-[18px] text-ink placeholder:text-ink-faint outline-none sm:rounded-full sm:py-3.5 sm:text-[19px]"
            />
            <button
              type="submit"
              disabled={value.trim().length < 4}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {c.input.submit}
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        </form>

        {error ? (
          <p
            role="alert"
            className="mx-auto mt-5 max-w-[520px] rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-[1.5] text-red-700"
          >
            {error}
          </p>
        ) : (
          <p className="mt-5 text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            {c.input.footnote}
          </p>
        )}
      </motion.div>
    </motion.section>
  )
}

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
      className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all ${
        active
          ? 'bg-ink text-white shadow-card'
          : 'text-ink-soft hover:bg-ink/[0.04]'
      }`}
    >
      <span className="block h-3.5 w-5 overflow-hidden rounded-[2px] ring-1 ring-black/10">
        {flag}
      </span>
      {label}
      {active && <Check size={14} strokeWidth={2.6} className="text-[#FF7A45]" />}
    </button>
  )
}

/* ──────────────────────────  Inline Flag SVGs  ────────────────────────── */

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
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#seo-gb-clip2)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

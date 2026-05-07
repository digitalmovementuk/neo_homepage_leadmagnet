import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

interface Props {
  initialDomain: string
  onAnalyse: (domain: string) => void
  error: string | null
}

export function InputStep({ initialDomain, onAnalyse, error }: Props) {
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
      className="relative flex min-h-full w-full flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-20"
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
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-ring">
          <Sparkles size={13} strokeWidth={2.4} className="text-[#FF7A45]" />
          SEO Potential Analyser
        </span>

        <h1
          className="mt-7 text-ink"
          style={{
            fontSize: 'clamp(40px, 6.6vw, 88px)',
            lineHeight: 1.0,
            fontWeight: 700,
            letterSpacing: '-0.022em',
          }}
        >
          Wo lebt Ihre Website?
        </h1>

        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.55] text-ink-soft sm:text-[17px]">
          Eine Domain. Neunzig Sekunden. Die Summe, die Sie aus organischer Suche aktuell liegen lassen.
        </p>

        <form onSubmit={handle} className="mx-auto mt-10 w-full max-w-[640px]">
          <div className="relative flex w-full flex-col gap-2 rounded-[28px] border border-ink/10 bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:rounded-full">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              placeholder="meinrestaurant-koeln.de"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Website domain"
              className="flex-1 rounded-2xl bg-transparent px-5 py-4 text-[18px] text-ink placeholder:text-ink-faint outline-none sm:rounded-full sm:py-3.5 sm:text-[19px]"
            />
            <button
              type="submit"
              disabled={value.trim().length < 4}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F15F2B] hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Analysieren
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
            Echte PageSpeed-Signale · Branchenübliche CTR-Mathematik · 8 freie Analysen/Tag
          </p>
        )}
      </motion.div>
    </motion.section>
  )
}

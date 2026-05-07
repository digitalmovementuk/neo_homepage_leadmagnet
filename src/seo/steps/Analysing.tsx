import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'

interface Props {
  domain: string
}

export function AnalysingStep({ domain }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  const lines = c.analysing.lines
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const stepDelay = 1100
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i < lines.length - 1 ? i + 1 : i))
    }, stepDelay)
    return () => window.clearInterval(id)
  }, [lines.length])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.16), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[720px] rounded-[28px] border border-ink/[0.06] bg-white/90 p-6 shadow-card backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF7A45]">
              {c.analysing.eyebrow}
            </p>
            <h2
              className="mt-3 break-words text-ink"
              style={{
                fontSize: 'clamp(28px, 4.4vw, 48px)',
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: '-0.018em',
              }}
            >
              {domain}
            </h2>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
            <Loader2 size={20} className="animate-spin" />
          </span>
        </div>

        <ul className="mt-8 space-y-2.5">
          {lines.map((line, idx) => {
            const state: 'done' | 'active' | 'pending' =
              idx < activeIdx ? 'done' : idx === activeIdx ? 'active' : 'pending'
            return (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: state === 'pending' ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 }}
                className="flex items-center gap-3 text-[14px]"
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    state === 'done'
                      ? 'bg-[#FF7A45]/15 text-[#FF7A45]'
                      : state === 'active'
                        ? 'bg-ink/[0.06] text-ink'
                        : 'bg-ink/[0.04] text-ink-faint'
                  }`}
                >
                  {state === 'done' ? (
                    <Check size={14} strokeWidth={2.6} />
                  ) : state === 'active' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={
                    state === 'done'
                      ? 'text-ink-soft'
                      : state === 'active'
                        ? 'text-ink font-semibold'
                        : 'text-ink-faint'
                  }
                >
                  {line}
                </span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </motion.section>
  )
}

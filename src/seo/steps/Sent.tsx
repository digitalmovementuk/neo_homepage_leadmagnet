import { motion } from 'framer-motion'
import { Check, CheckCircle2, RotateCcw } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import { formatMoney } from '../lib/currencies'
import type { AnalysisResult } from '../lib/types'

interface Props {
  result: AnalysisResult
  onReset: () => void
}

export function SentStep({ result, onReset }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,122,69,0.16), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[680px]">
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]"
        >
          <CheckCircle2 size={28} strokeWidth={2} />
        </motion.span>

        <h2
          className="mt-7 text-ink"
          style={{
            fontSize: 'clamp(28px, 4.2vw, 48px)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.022em',
          }}
        >
          {c.sent.headline(result.domain)}
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.55] text-ink-soft sm:text-[16px]">
          {c.sent.body(formatMoney(result.monthlyOpportunity, result.currency, lang))}
        </p>

        <div className="mx-auto mt-7 max-w-[480px] rounded-[24px] border border-ink/[0.07] bg-white p-5 text-left shadow-card sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">
            {c.sent.nextSteps.title}
          </p>
          <ul className="mt-3 space-y-2.5">
            {c.sent.nextSteps.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="text-[13.5px] leading-[1.5] text-ink-soft">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-ink/[0.04]"
        >
          <RotateCcw size={14} strokeWidth={2.4} />
          {c.sent.reset}
        </button>
      </div>
    </motion.section>
  )
}

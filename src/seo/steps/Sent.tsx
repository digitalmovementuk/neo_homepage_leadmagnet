import { motion } from 'framer-motion'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { COPY, intGbp } from '../lib/copy'
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

      <div className="relative w-full max-w-[640px]">
        <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-[#FF7A45]/15 text-[#FF7A45]">
          <CheckCircle2 size={28} strokeWidth={2} />
        </span>

        <h2
          className="mt-7 text-ink"
          style={{
            fontSize: 'clamp(32px, 4.6vw, 56px)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.022em',
          }}
        >
          {c.sent.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.55] text-ink-soft sm:text-[16px]">
          {c.sent.body(intGbp(result.monthlyOpportunityGbp), result.domain)}
        </p>

        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-ink/[0.04]"
        >
          <RotateCcw size={14} strokeWidth={2.4} />
          {c.sent.reset}
        </button>
      </div>
    </motion.section>
  )
}

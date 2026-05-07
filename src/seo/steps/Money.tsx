import { useLang } from '../../lib/i18n'
import { COPY } from '../lib/copy'
import { formatMoney } from '../lib/currencies'
import type { AnalysisResult } from '../lib/types'
import { PageShell } from './Rankings'

interface Props {
  result: AnalysisResult
  onBack: () => void
  onNext: () => void
}

export function MoneyPage({ result, onBack, onNext }: Props) {
  const { lang } = useLang()
  const c = COPY[lang]
  const numLocale = lang === 'de' ? 'de-DE' : 'en-GB'

  return (
    <PageShell
      step={2}
      total={4}
      eyebrow={c.pageMoney.eyebrow}
      headline={c.pageMoney.headline}
      sub={c.pageMoney.sub}
      result={result}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="overflow-hidden rounded-card border border-ink/[0.06] bg-white shadow-ring">
        <div className="overflow-x-auto">
          <table className="min-w-[680px] w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink/[0.06] bg-surface-2 text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                <th className="px-5 py-3 font-bold">{c.money.keyword}</th>
                <th className="px-5 py-3 text-right font-bold">{c.money.searchesPerMo}</th>
                <th className="px-5 py-3 text-right font-bold">{c.money.now}</th>
                <th className="px-5 py-3 text-right font-bold">{c.money.ifPage1}</th>
                <th className="px-5 py-3 text-right font-bold">{c.money.perMo}</th>
              </tr>
            </thead>
            <tbody>
              {result.keywords.map((k) => (
                <tr key={k.keyword} className="border-b border-ink/[0.04] last:border-b-0">
                  <td className="px-5 py-3.5 text-ink">{k.keyword}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                    {k.monthlySearches.toLocaleString(numLocale)}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                    {k.estCurrentClicks} {c.money.clicks}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-ink-muted">
                    {k.estPage1Clicks} {c.money.clicks}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-bold text-[#FF7A45]">
                    {formatMoney(k.estMonthlyValue, result.currency, lang)}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#FF7A45]/[0.08]">
                <td colSpan={4} className="px-5 py-3.5 text-right font-bold text-ink">
                  {c.money.total}
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-[15px] font-bold text-[#FF7A45]">
                  {formatMoney(result.monthlyOpportunity, result.currency, lang)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}

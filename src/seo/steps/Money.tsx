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
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="order-2 hidden overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-ring md:block lg:order-none">
          <table className="w-full text-left text-[13px]">
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

        <ul className="order-2 space-y-3 md:hidden">
          {result.keywords.map((k) => (
            <li key={k.keyword} className="rounded-[22px] border border-ink/[0.07] bg-white p-4 shadow-ring">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 text-[15px] font-semibold leading-[1.35] text-ink">{k.keyword}</p>
                <p className="shrink-0 text-[14px] font-bold text-[#FF7A45]">
                  {formatMoney(k.estMonthlyValue, result.currency, lang)}
                </p>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[12px]">
                <div className="rounded-2xl bg-surface-2 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint">{c.money.searchesPerMo}</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-ink">{k.monthlySearches.toLocaleString(numLocale)}</dd>
                </div>
                <div className="rounded-2xl bg-surface-2 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint">{c.money.now}</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-ink">{k.estCurrentClicks}</dd>
                </div>
                <div className="rounded-2xl bg-surface-2 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint">{c.money.ifPage1}</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-ink">{k.estPage1Clicks}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="order-1 rounded-[24px] border border-[#FF7A45]/15 bg-[#fff7f2] p-5 shadow-ring lg:sticky lg:top-0 lg:order-none">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A45]">{c.money.total}</p>
          <p className="mt-2 text-[34px] font-bold leading-none tracking-[-0.03em] text-ink">
            {formatMoney(result.monthlyOpportunity, result.currency, lang)}
          </p>
          <p className="mt-2 text-[12.5px] leading-[1.5] text-ink-soft">{c.reveal.metricSuffix}</p>
        </div>
      </div>
    </PageShell>
  )
}

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLang } from '../lib/i18n'
import type { AnalyseResponse, AnalysisResult } from './lib/types'
import { COPY } from './lib/copy'
import { formatMoney } from './lib/currencies'
import { InputStep, type InputPayload } from './steps/Input'
import { AnalysingStep } from './steps/Analysing'
import { RankingsPage } from './steps/Rankings'
import { MoneyPage } from './steps/Money'
import { BlockersPage } from './steps/Blockers'
import { SummaryPage } from './steps/Summary'
import { SentStep } from './steps/Sent'

type Step = 'input' | 'analysing' | 'rankings' | 'money' | 'blockers' | 'summary' | 'sent'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@neotheagency.com'

const DEFAULT_INPUT: InputPayload = {
  domain: '',
  currency: 'EUR',
  aov: 100,
  conversionRate: 0.03,
  industryHint: '',
}

export default function SeoAnalyser() {
  const { lang } = useLang()
  const c = COPY[lang]

  const [step, setStep] = useState<Step>('input')
  const [payload, setPayload] = useState<InputPayload>(() => ({
    ...DEFAULT_INPUT,
    currency: lang === 'de' ? 'EUR' : 'GBP',
  }))
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [captureSending, setCaptureSending] = useState(false)
  const [captureError, setCaptureError] = useState<string | null>(null)
  const requestStartRef = useRef<number>(0)

  const handleAnalyse = async (p: InputPayload) => {
    setAnalysisError(null)
    setPayload(p)
    setStep('analysing')
    requestStartRef.current = Date.now()

    try {
      const res = await fetch('/api/seo-analyse', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(p),
      })
      const data = (await res.json()) as AnalyseResponse
      if (!data.ok) {
        setAnalysisError(data.error)
        setStep('input')
        return
      }

      const minDuration = 12_000
      const elapsed = Date.now() - requestStartRef.current
      const wait = Math.max(0, minDuration - elapsed)
      setTimeout(() => {
        setResult(data.result)
        setStep('rankings')
      }, wait)
    } catch (err) {
      console.error(err)
      setAnalysisError(c.errors.network)
      setStep('input')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, phoneFull: string) => {
    e.preventDefault()
    if (!result) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (String(data.get('_honey') ?? '')) return

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    setCaptureError(null)
    setCaptureSending(true)

    const blockerLines = result.blockers
      .map((b, i) => `${i + 1}. [${b.impact.toUpperCase()}] ${b.title} — ${b.detail}`)
      .join('\n')

    const keywordLines = result.keywords
      .map(
        (k) =>
          `· ${k.keyword} (${k.monthlySearches}/mo, ${k.currentRankBand}, est ${formatMoney(k.estMonthlyValue, result.currency, lang)}/mo)`,
      )
      .join('\n')

    const gbp = formatMoney(result.monthlyOpportunity, result.currency, lang)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phoneFull,
          domain: result.domain,
          industry: result.inferredIndustry,
          location: result.inferredLocation,
          currency: result.currency,
          aovUsed: payload.aov,
          conversionRateUsed: `${(payload.conversionRate * 100).toFixed(1)}%`,
          monthlyOpportunity: gbp,
          topBlockers: blockerLines,
          keywords: keywordLines,
          _subject: c.emailSubject(name, email, result.domain, gbp),
          _template: 'table',
          _captcha: 'false',
          _autoresponse: c.emailAutoresponse(
            name,
            result.domain,
            gbp,
            result.inferredIndustry,
            result.inferredLocation,
          ),
        }),
      })
      if (!res.ok) throw new Error(`Form gateway returned ${res.status}`)
      setStep('sent')
    } catch (err) {
      console.error(err)
      setCaptureError(c.errors.captureSend)
    } finally {
      setCaptureSending(false)
    }
  }

  const handleReset = () => {
    setStep('input')
    setResult(null)
    setAnalysisError(null)
    setCaptureError(null)
  }

  useEffect(() => {
    if (step === 'input') document.title = c.documentTitleIdle
    else if (step === 'analysing') document.title = c.documentTitleAnalysing(payload.domain)
    else if (result)
      document.title = c.documentTitleResults(result.domain, formatMoney(result.monthlyOpportunity, result.currency, lang))
    else document.title = c.documentTitleIdle
  }, [step, payload.domain, result, c, lang])

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-1 text-ink">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputStep key="input" initial={payload} onAnalyse={handleAnalyse} error={analysisError} />
        )}
        {step === 'analysing' && <AnalysingStep key="analysing" domain={payload.domain} />}
        {step === 'rankings' && result && (
          <RankingsPage
            key="rankings"
            result={result}
            onBack={() => setStep('input')}
            onNext={() => setStep('money')}
          />
        )}
        {step === 'money' && result && (
          <MoneyPage
            key="money"
            result={result}
            onBack={() => setStep('rankings')}
            onNext={() => setStep('blockers')}
          />
        )}
        {step === 'blockers' && result && (
          <BlockersPage
            key="blockers"
            result={result}
            onBack={() => setStep('money')}
            onNext={() => setStep('summary')}
          />
        )}
        {step === 'summary' && result && (
          <SummaryPage
            key="summary"
            result={result}
            sending={captureSending}
            captureError={captureError}
            onBack={() => setStep('blockers')}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        )}
        {step === 'sent' && result && <SentStep key="sent" result={result} onReset={handleReset} />}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLang } from '../lib/i18n'
import type { AnalyseResponse, AnalysisResult } from './lib/types'
import { COPY, intGbp } from './lib/copy'
import { InputStep } from './steps/Input'
import { AnalysingStep } from './steps/Analysing'
import { ResultsStep } from './steps/Results'
import { SentStep } from './steps/Sent'

type Step = 'input' | 'analysing' | 'results' | 'sent'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@neotheagency.com'

export default function SeoAnalyser() {
  const { lang } = useLang()
  const c = COPY[lang]

  const [step, setStep] = useState<Step>('input')
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [captureSending, setCaptureSending] = useState(false)
  const [captureError, setCaptureError] = useState<string | null>(null)
  const requestStartRef = useRef<number>(0)

  const handleAnalyse = async (rawDomain: string) => {
    setAnalysisError(null)
    setDomain(rawDomain)
    setStep('analysing')
    requestStartRef.current = Date.now()

    try {
      const res = await fetch('/api/seo-analyse', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ domain: rawDomain }),
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
        setStep('results')
      }, wait)
    } catch (err) {
      console.error(err)
      setAnalysisError(c.errors.network)
      setStep('input')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          `· ${k.keyword} (${k.monthlySearches}/mo, currently ${k.currentRankBand}, est £${k.estMonthlyValueGbp}/mo)`,
      )
      .join('\n')

    const gbp = intGbp(result.monthlyOpportunityGbp)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          domain: result.domain,
          industry: result.inferredIndustry,
          location: result.inferredLocation,
          monthlyOpportunityGbp: gbp,
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
    setDomain('')
    setResult(null)
    setAnalysisError(null)
    setCaptureError(null)
  }

  useEffect(() => {
    if (step === 'input') document.title = c.documentTitleIdle
    else if (step === 'analysing') document.title = c.documentTitleAnalysing(domain)
    else if (result) document.title = c.documentTitleResults(result.domain, intGbp(result.monthlyOpportunityGbp))
    else document.title = c.documentTitleIdle
  }, [step, domain, result, c])

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-1 text-ink">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputStep
            key="input"
            initialDomain={domain}
            onAnalyse={handleAnalyse}
            error={analysisError}
          />
        )}
        {step === 'analysing' && <AnalysingStep key="analysing" domain={domain} />}
        {step === 'results' && result && (
          <ResultsStep
            key="results"
            result={result}
            onSubmit={handleSubmit}
            sending={captureSending}
            captureError={captureError}
            onReset={handleReset}
          />
        )}
        {step === 'sent' && result && (
          <SentStep key="sent" result={result} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  )
}

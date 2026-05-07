import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { AnalyseResponse, AnalysisResult } from './lib/types'
import { InputStep } from './steps/Input'
import { AnalysingStep } from './steps/Analysing'
import { ResultsStep } from './steps/Results'
import { SentStep } from './steps/Sent'

type Step = 'input' | 'analysing' | 'results' | 'sent'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@neotheagency.com'

export default function SeoAnalyser() {
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
      setAnalysisError(
        "Couldn't reach the analysis engine. Check your connection and try again.",
      )
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
          monthlyOpportunityGbp: `£${result.monthlyOpportunityGbp.toLocaleString('en-GB')}`,
          topBlockers: blockerLines,
          keywords: keywordLines,
          _subject: `SEO Analyser — ${name || email} — ${result.domain} — £${result.monthlyOpportunityGbp.toLocaleString('en-GB')}/mo opportunity`,
          _template: 'table',
          _captcha: 'false',
          _autoresponse: `Hi ${name},\n\nThanks for running Neo's SEO Potential Analyser on ${result.domain}.\n\nHeadline: we estimate around £${result.monthlyOpportunityGbp.toLocaleString('en-GB')}/month in untapped organic-search opportunity, given your inferred industry (${result.inferredIndustry}) and location (${result.inferredLocation}).\n\nA member of the team will be in touch within one working day with the detailed 90-day roadmap.\n\n— Neo The Agency`,
        }),
      })
      if (!res.ok) throw new Error(`Form gateway returned ${res.status}`)
      setStep('sent')
    } catch (err) {
      console.error(err)
      setCaptureError("Sorry — couldn't send. Please try again or email us directly.")
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
    document.title =
      step === 'input'
        ? 'SEO Potential Analyser — Neo'
        : step === 'analysing'
          ? `Analysing ${domain}…`
          : result
            ? `${result.domain} — £${result.monthlyOpportunityGbp.toLocaleString('en-GB')}/mo opportunity`
            : 'SEO Potential Analyser — Neo'
  }, [step, domain, result])

  return (
    <div className="relative min-h-full w-full overflow-x-hidden bg-surface-1 text-ink">
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

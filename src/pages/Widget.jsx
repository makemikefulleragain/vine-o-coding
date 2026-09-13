import { useEffect, useState } from 'react'
import useDocTitle from '../hooks/useDocTitle.js'
import WidgetShell from '../components/widget/WidgetShell.jsx'
import StepIdea from '../components/widget/StepIdea.jsx'
import StepUsers from '../components/widget/StepUsers.jsx'
import StepBoundaries from '../components/widget/StepBoundaries.jsx'
import StepPriorities from '../components/widget/StepPriorities.jsx'
import StepSetup from '../components/widget/StepSetup.jsx'
import StepReview from '../components/widget/StepReview.jsx'

const INITIAL_DATA = {
  // Step 1
  projectName: '',
  whatItDoes: '',
  whoItsFor: '',
  problemItSolves: '',
  // Step 2
  primaryUserName: '',
  primaryUserSituation: '',
  secondaryUser: '',
  // Step 3
  whatItsNot: '',
  harmConsiderations: '',
  // Step 4
  phase1Goal: '',
  phase2Goal: '',
  phase3Goal: '',
  // Step 5
  deploymentChoice: 'netlify',
  hasDatabase: false,
  techNotes: '',
}

const STORAGE_KEY = 'outcome-vine-widget-draft-v1'

export function canAdvance(step, data) {
  switch (step) {
    case 0:
      return data.projectName.trim() && data.whatItDoes.trim() && data.whoItsFor.trim() && data.problemItSolves.trim()
    case 1:
      return data.primaryUserName.trim() && data.primaryUserSituation.trim()
    case 2:
      return data.whatItsNot.trim()
    case 3:
      return data.phase1Goal.trim()
    case 4:
      return true
    default:
      return true
  }
}

export default function Widget() {
  useDocTitle('Start Building')
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window === 'undefined') return 0
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved).currentStep ?? 0 : 0
    } catch {
      return 0
    }
  })
  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_DATA
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      return saved ? { ...INITIAL_DATA, ...JSON.parse(saved).formData } : INITIAL_DATA
    } catch {
      return INITIAL_DATA
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentStep, formData })
    )
  }, [currentStep, formData])

  const handleNext = () => {
    if (currentStep < 5 && canAdvance(currentStep, formData)) {
      setCurrentStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setFormData(INITIAL_DATA)
    window.localStorage.removeItem(STORAGE_KEY)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps = [
    <StepIdea key={0} data={formData} onChange={setFormData} />,
    <StepUsers key={1} data={formData} onChange={setFormData} />,
    <StepBoundaries key={2} data={formData} onChange={setFormData} />,
    <StepPriorities key={3} data={formData} onChange={setFormData} />,
    <StepSetup key={4} data={formData} onChange={setFormData} />,
    <StepReview key={5} data={formData} />,
  ]

  return (
    <WidgetShell
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      onReset={handleReset}
      canNext={canAdvance(currentStep, formData)}
    >
      {steps[currentStep]}
    </WidgetShell>
  )
}

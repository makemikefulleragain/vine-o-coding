import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './components/Landing'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Toolkit from './components/Toolkit'
import PromptKit from './components/toolkit/PromptKit'
import SafetyChecklist from './components/toolkit/SafetyChecklist'
import AIGuide from './components/toolkit/AIGuide'
import FirstSteps from './components/toolkit/FirstSteps'
import EthicsChecklist from './components/toolkit/EthicsChecklist'
import BoardBriefing from './components/toolkit/BoardBriefing'
import Services from './components/Services'
import PageTitle from './components/PageTitle'

export default function App() {
  const [answers, setAnswers] = useState({})

  function handleQuizComplete(quizAnswers) {
    setAnswers(quizAnswers)
  }

  function handleReset() {
    setAnswers({})
  }

  return (
    <Layout>
      <PageTitle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/quiz"
          element={<Quiz onComplete={handleQuizComplete} />}
        />
        <Route
          path="/results"
          element={<Results answers={answers} onReset={handleReset} />}
        />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/toolkit/prompt-kit" element={<PromptKit />} />
        <Route path="/toolkit/safety-checklist" element={<SafetyChecklist />} />
        <Route path="/toolkit/ai-guide" element={<AIGuide />} />
        <Route path="/toolkit/first-steps" element={<FirstSteps />} />
        <Route path="/toolkit/ethics-checklist" element={<EthicsChecklist />} />
        <Route path="/toolkit/board-briefing" element={<BoardBriefing />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Layout>
  )
}

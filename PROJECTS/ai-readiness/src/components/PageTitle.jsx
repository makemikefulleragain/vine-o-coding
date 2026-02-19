import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/': 'AI Readiness — Kamunity | Free Self-Assessment for Community Organisations',
  '/quiz': 'AI Readiness Quiz — Kamunity',
  '/results': 'Your AI Readiness Results — Kamunity',
  '/toolkit': 'Free AI Toolkit — Kamunity | Guides, Checklists & Prompts',
  '/toolkit/prompt-kit': 'AI Prompt Kit — 20 Prompts for Community Organisations | Kamunity',
  '/toolkit/safety-checklist': 'AI Safety Checklist — Kamunity',
  '/toolkit/ai-guide': 'Plain English AI Guide — Kamunity',
  '/toolkit/first-steps': 'First Steps with AI — Kamunity',
  '/toolkit/ethics-checklist': 'AI Ethics Checklist — Kamunity',
  '/toolkit/board-briefing': 'AI Board Briefing Template — Kamunity',
  '/services': 'AI Readiness Services — Workshops, Strategy & Mapping | Kamunity',
}

const DEFAULT_TITLE = 'AI Readiness — Kamunity'

export default function PageTitle() {
  const location = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || DEFAULT_TITLE
  }, [location.pathname])

  return null
}

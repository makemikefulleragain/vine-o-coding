import { describe, expect, it } from 'vitest'
import {
  GENERATED_DOC_ORDER,
  generateDocs,
  normalizeProjectData,
} from './generateDocs.js'
import { generatePrompt } from './generatePrompt.js'

const communityApp = {
  projectName: 'River Pantry',
  whatItDoes: 'A simple pantry stock and pickup scheduler for a neighborhood mutual aid group.',
  whoItsFor: 'Neighborhood volunteers and residents who share pantry items each week.',
  problemItSolves: 'Stock updates live in scattered group chats, so people duplicate items and miss pickup times.',
  primaryUserName: 'Nadia',
  primaryUserSituation: 'A volunteer coordinator who updates stock after donations arrive and checks pickup requests from her phone.',
  secondaryUser: 'Residents who reserve pickup slots and volunteers who add stock.',
  whatItsNot: 'Not a public marketplace, not a payment system, not eligibility decision software.',
  harmConsiderations: 'May handle names, addresses, food allergies, and vulnerable residents.',
  phase1Goal: 'Show a mobile-friendly pantry stock list with available items, pickup windows, and volunteer contact instructions.',
  phase2Goal: 'Let volunteers update stock quantities and mark items reserved.',
  phase3Goal: 'Add pickup request reminders and a private admin view.',
  deploymentChoice: 'netlify',
  hasDatabase: true,
  techNotes: 'Prefer Google Sheets for inventory at first; may need SMS reminders later.',
}

describe('generateDocs', () => {
  it('generates the approved Core Plus pack in a stable order', () => {
    const docs = generateDocs(communityApp, { date: '2026-08-31' })

    expect(Object.keys(docs)).toEqual(GENERATED_DOC_ORDER)
    expect(GENERATED_DOC_ORDER).toEqual([
      'CONSTITUTION.md',
      'MISSION.md',
      'PRODUCT_BRIEF.md',
      'POC_ACCEPTANCE.md',
      'DATA_MODEL.md',
      'RISK_REGISTER.md',
      'TEST_PLAN.md',
      'RUNNER.md',
      'PHASE_QUEUE.md',
      'SETUP.md',
      'STATE.md',
    ])
  })

  it('keeps the small-community default static first with triggered research escape hatches', () => {
    const docs = generateDocs(communityApp, { date: '2026-08-31' })

    expect(docs['CONSTITUTION.md']).toContain('Static-First by Default')
    expect(docs['RUNNER.md']).toContain('Max three triggered research loops per phase')
    expect(docs['SETUP.md']).toContain('No backend until a written architecture decision says it is needed')
    expect(docs['RISK_REGISTER.md']).toContain('Shared or persistent data')
    expect(docs['RISK_REGISTER.md']).toContain('External integrations or third-party services')
  })

  it('does not reintroduce malformed prose around the audience sentence', () => {
    const docs = generateDocs(communityApp, { date: '2026-08-31' })

    expect(docs['CONSTITUTION.md']).not.toContain('will actually use')
    expect(docs['CONSTITUTION.md']).toContain(
      'The tool is for neighborhood volunteers and residents who share pantry items each week. Every meaningful decision should help Nadia'
    )
  })

  it('normalizes empty data into a usable starter pack', () => {
    const spec = normalizeProjectData({}, { date: '2026-08-31' })
    const docs = generateDocs({}, { date: '2026-08-31' })

    expect(spec.title).toBe('Untitled Community Tool')
    expect(docs['STATE.md']).toContain('Foundation and Core Plus documents generated')
    expect(docs['PHASE_QUEUE.md']).toContain('Phase 1')
    expect(docs['PHASE_QUEUE.md']).not.toContain('Phase 1: Phase 1')
  })

  it('aligns the opening prompt with the Core Plus pack', () => {
    const prompt = generatePrompt(communityApp)

    expect(prompt).toContain('PRODUCT_BRIEF.md')
    expect(prompt).toContain('DATA_MODEL.md')
    expect(prompt).toContain('Max 3 extra triggered research loops per phase')
    expect(prompt).toContain('static-first React/Vite/Tailwind path')
  })
})

import { afterEach, describe, expect, it, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Widget, { canAdvance } from './Widget.jsx'

afterEach(() => {
  cleanup()
})

describe('canAdvance', () => {
  it('requires the core first-step fields', () => {
    expect(canAdvance(0, {
      projectName: '',
      whatItDoes: '',
      whoItsFor: '',
      problemItSolves: '',
    })).toBe('')

    expect(Boolean(canAdvance(0, {
      projectName: 'River Pantry',
      whatItDoes: 'Tracks pantry stock.',
      whoItsFor: 'Volunteers.',
      problemItSolves: 'Stock info is scattered.',
    }))).toBe(true)
  })
})

describe('Widget', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('uses visible labels as accessible field names', () => {
    render(<Widget />)

    expect(screen.getByLabelText('Give your project a name')).toBeInTheDocument()
    expect(screen.getByLabelText('In a sentence or two, what does this tool do?')).toBeInTheDocument()
    expect(screen.getByLabelText('Who will use this? A club, a team, a community?')).toBeInTheDocument()
    expect(screen.getByLabelText("What problem does it fix? What's hard right now without it?")).toBeInTheDocument()
  })

  it('persists and resets a draft', async () => {
    const user = userEvent.setup()
    render(<Widget />)

    await user.type(screen.getByLabelText('Give your project a name'), 'River Pantry')
    expect(window.localStorage.getItem('outcome-vine-widget-draft-v1')).toContain('River Pantry')

    await user.click(screen.getByRole('button', { name: 'Reset draft' }))
    expect(screen.getByLabelText('Give your project a name')).toHaveValue('')
  })
})

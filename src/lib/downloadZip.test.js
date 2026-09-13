import JSZip from 'jszip'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createZipBlob, downloadZip, getZipFilename } from './downloadZip.js'

describe('downloadZip', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('creates a safe project ZIP filename', () => {
    expect(getZipFilename('The Pack Music Co-operative')).toBe('the-pack-music-co-operative-foundation.zip')
    expect(getZipFilename('  !!!  ')).toBe('community-app-foundation.zip')
  })

  it('creates a ZIP blob containing every generated document', async () => {
    const blob = await createZipBlob({
      'MISSION.md': '# Mission',
      'RUNNER.md': '# Runner',
    })

    const zip = await JSZip.loadAsync(await blob.arrayBuffer())

    expect(await zip.file('MISSION.md').async('string')).toBe('# Mission')
    expect(await zip.file('RUNNER.md').async('string')).toBe('# Runner')
  })

  it('downloads the ZIP through a temporary object URL anchor', async () => {
    const createObjectURL = vi.fn(() => 'blob:test-download')
    const revokeObjectURL = vi.fn()
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    })

    await downloadZip({ 'MISSION.md': '# Mission' }, 'The Pack')

    expect(click).toHaveBeenCalledTimes(1)
    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(document.body.querySelector('a[download="the-pack-foundation.zip"]')).toBeNull()

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-download')
  })
})

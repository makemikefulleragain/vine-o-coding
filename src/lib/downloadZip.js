import JSZip from 'jszip'

export function getZipFilename(projectName) {
  const safeName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'community-app'

  return `${safeName}-foundation.zip`
}

export async function createZipBlob(docs) {
  const zip = new JSZip()

  Object.entries(docs).forEach(([filename, content]) => {
    zip.file(filename, content)
  })

  return zip.generateAsync({ type: 'blob', mimeType: 'application/zip' })
}

export async function downloadZip(docs, projectName) {
  const blob = await createZipBlob(docs)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = getZipFilename(projectName)
  anchor.style.display = 'none'

  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export async function downloadZip(docs, projectName) {
  const zip = new JSZip()

  Object.entries(docs).forEach(([filename, content]) => {
    zip.file(filename, content)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  const safeName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  saveAs(blob, `${safeName}-foundation.zip`)
}

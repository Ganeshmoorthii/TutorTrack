import { toPng } from 'html-to-image'

// Renders a DOM node to a PNG blob at 2x scale for crisp WhatsApp previews.
export async function captureNodeAsPngFile(node, filename = 'report.png') {
  if (!node) throw new Error('No node to capture')

  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#F9F7F2',
  })

  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return new File([blob], filename, { type: 'image/png' })
}

export function canShareFiles(file) {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  )
}

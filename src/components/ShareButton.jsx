import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { captureNodeAsPngFile, canShareFiles } from '@/utils/imageExport'
import { Share2, Loader2, Download } from 'lucide-react'

// Captures the report card as a PNG and hands it to the native share sheet
// so the teacher can pick a WhatsApp contact/group directly.
export default function ShareButton({ targetRef, studentName }) {
  const [status, setStatus] = useState('idle') // idle | working | fallback | error
  const [imageUrl, setImageUrl] = useState(null)

  async function handleShare() {
    setStatus('working')
    try {
      const filename = `${(studentName || 'report').replace(/\s+/g, '_')}_report.png`
      const file = await captureNodeAsPngFile(targetRef.current, filename)

      if (canShareFiles(file)) {
        await navigator.share({
          files: [file],
          title: 'Weekly Report',
          text: `Weekly report for ${studentName || 'student'}`,
        })
        setStatus('idle')
      } else {
        // Fallback: show the image so the teacher can long-press to save it.
        setImageUrl(URL.createObjectURL(file))
        setStatus('fallback')
      }
    } catch (err) {
      if (err?.name === 'AbortError') {
        setStatus('idle') // teacher cancelled the share sheet
      } else {
        console.error(err)
        setStatus('error')
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="whatsapp"
        size="lg"
        className="w-full"
        onClick={handleShare}
        disabled={status === 'working'}
      >
        {status === 'working' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Preparing image…
          </>
        ) : (
          <>
            <Share2 className="h-5 w-5" /> Share on WhatsApp
          </>
        )}
      </Button>

      {status === 'error' && (
        <p className="text-sm text-needs text-center">
          Couldn't generate the image. Please try again.
        </p>
      )}

      {status === 'fallback' && imageUrl && (
        <div className="rounded-xl border border-ink/10 bg-white p-3 text-center">
          <img src={imageUrl} alt="Generated report" className="w-full rounded-lg" />
          <p className="mt-2 text-sm text-ink/60 flex items-center justify-center gap-1.5">
            <Download className="h-4 w-4" />
            Long-press the image above to save, then attach it in WhatsApp.
          </p>
        </div>
      )}
    </div>
  )
}

import { memo } from 'react'
import { presets, presetMeta } from '@/data/presets'
import { cn } from '@/lib/utils'

const chipColor = {
  good: 'bg-good/10 text-good border-good/25 hover:bg-good/20',
  average: 'bg-average/15 text-[#8a5a2b] border-average/35 hover:bg-average/25',
  needs: 'bg-needs/10 text-needs border-needs/25 hover:bg-needs/20',
}

const presetGroups = Object.entries(presets)

// Tap-to-append preset chips, grouped by category. Teacher can still
// type freely in the textarea alongside these.
function CommentPresets({ onAppend }) {
  return (
    <div className="flex flex-col gap-2.5">
      {presetGroups.map(([key, phrases]) => {
        const meta = presetMeta[key]
        return (
          <div key={key} className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/45 w-full mb-0.5">
              {meta.label}
            </span>
            {phrases.map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => onAppend(phrase)}
                className={cn(
                  'min-h-11 px-3.5 py-2 rounded-full border text-sm font-medium transition-colors',
                  chipColor[meta.color]
                )}
              >
                {phrase}
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default memo(CommentPresets)

import { memo } from 'react'
import { Switch } from '@/components/ui/switch'

// One compact Mon–Sat row: day label + two toggles.
// When absent, homework is shown as “–” instead of a toggle.
function DayRow({ date, present, homeworkDone, onChange }) {
  const dayLabel = date.toLocaleDateString('en-IN', { weekday: 'short' })

  return (
    <div className="flex items-center gap-2 py-2.5 border-b border-ink/5 last:border-b-0">
      <span className="w-9 shrink-0 text-sm font-semibold text-ink/70">{dayLabel}</span>

      <label className="flex items-center gap-2 shrink-0">
        <Switch
          checked={present}
          onCheckedChange={(v) => onChange({ present: v })}
          checkedClassName="data-[state=checked]:bg-good"
        />
        <span className={`text-sm font-medium w-14 ${present ? 'text-good' : 'text-needs'}`}>
          {present ? 'Present' : 'Absent'}
        </span>
      </label>

      <div className="flex items-center gap-2 ml-auto">
        {present ? (
          <label className="flex items-center gap-2">
            <span className={`text-sm font-medium ${homeworkDone ? 'text-good' : 'text-needs'}`}>
              {homeworkDone ? 'HW done' : 'HW not done'}
            </span>
            <Switch
              checked={homeworkDone}
              onCheckedChange={(v) => onChange({ homeworkDone: v })}
              checkedClassName="data-[state=checked]:bg-good"
            />
          </label>
        ) : (
          <span className="text-sm font-semibold text-ink/30">–</span>
        )}
      </div>
    </div>
  )
}

export default memo(DayRow)

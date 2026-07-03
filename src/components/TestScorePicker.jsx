import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const MAX_OPTIONS = [10, 15, 20, 25, 30]

// Two linked dropdowns: pick max marks, then score obtained (max down to 0).
// No free typing — keeps the teacher tapping instead of typing.
export default function TestScorePicker({ maxMarks, scoreObtained, onChange, disabled = false }) {
  const scoreOptions = Array.from({ length: maxMarks + 1 }, (_, i) => maxMarks - i)

  function handleMaxChange(v) {
    const newMax = Number(v)
    // Keep the score if it still fits, otherwise clamp it down.
    const newScore = scoreObtained > newMax ? newMax : scoreObtained
    onChange({ maxMarks: newMax, scoreObtained: newScore })
  }

  return (
    <div className="flex flex-col gap-3">
      {disabled && (
        <p className="text-sm text-ink/45 -mt-1">
          Marked absent on Saturday — no test recorded.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Max marks</Label>
          <Select value={String(maxMarks)} onValueChange={handleMaxChange} disabled={disabled}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MAX_OPTIONS.map((m) => (
                <SelectItem key={m} value={String(m)}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Score obtained</Label>
          <Select
            value={String(scoreObtained)}
            onValueChange={(v) => onChange({ maxMarks, scoreObtained: Number(v) })}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {scoreOptions.map((s) => (
                <SelectItem key={s} value={String(s)}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

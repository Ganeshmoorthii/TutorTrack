import { forwardRef, memo } from 'react'
import { Check, X } from 'lucide-react'
import { formatRange } from '@/utils/dateHelpers'

const dayShort = (date) => date.toLocaleDateString('en-IN', { weekday: 'short' })

function scoreEmoji(pct) {
  if (pct >= 90) return '🌟'
  if (pct >= 70) return '🎉'
  if (pct >= 40) return '🙂'
  return '📌'
}

// The actual visual output — captured as a PNG for WhatsApp sharing.
// Signature element: a subtle paper-grain texture and a perforated
// tear-line before the notes, evoking a physical report slip.
const ReportPreview = memo(
  forwardRef(function ReportPreview(
    { studentName, studentClass, weekStartDate, days, testDetails, comments },
    ref
  ) {
    const scorePct = testDetails.maxMarks
      ? Math.round((testDetails.scoreObtained / testDetails.maxMarks) * 100)
      : 0

    const scoreColor =
      scorePct >= 70 ? 'var(--color-good)' : scorePct >= 40 ? 'var(--color-average)' : 'var(--color-needs)'

    const saturdayPresent = days[5]?.present ?? true

    return (
      <div
        ref={ref}
        className="paper-grain rounded-2xl bg-paper p-6 sm:p-7 w-full max-w-125 mx-auto"
        style={{ border: '1px solid rgba(43,43,40,0.08)' }}
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
            Weekly Report
          </p>
          <h1 className="text-2xl font-extrabold leading-tight mt-0.5">{studentName || 'Student name'}</h1>
          <p className="text-sm text-ink/55 font-medium mt-0.5">
            {studentClass || 'Class'} · {formatRange(weekStartDate)}
          </p>
        </div>

        <div className="mt-5 rounded-xl bg-white/70 px-4 py-2">
          {days.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 text-sm border-b border-ink/5 last:border-b-0"
            >
              <span className="w-9 font-bold text-ink/60">{dayShort(d.date)}</span>

              <span
                className="flex items-center gap-1 font-semibold"
                style={{ color: d.present ? 'var(--color-good)' : 'var(--color-needs)' }}
              >
                {d.present ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                {d.present ? 'Present' : 'Absent'}
              </span>

              <span
                className="ml-auto flex items-center gap-1 font-semibold"
                style={{ color: d.present && !d.homeworkDone ? 'var(--color-needs)' : 'var(--color-good)' }}
              >
                {!d.present ? (
                  <span className="text-ink/30 font-semibold">–</span>
                ) : (
                  <>
                    {d.homeworkDone ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    {d.homeworkDone ? 'HW done' : 'HW pending'}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-4 rounded-xl px-4 py-3 flex items-center justify-between"
          style={{
            background: saturdayPresent
              ? `color-mix(in srgb, ${scoreColor} 12%, white)`
              : 'color-mix(in srgb, var(--color-ink) 5%, white)',
          }}
        >
          <span className="text-sm font-bold text-ink/70">Saturday Weekly Test</span>
          {saturdayPresent ? (
            <span className="flex items-center gap-2 text-lg font-extrabold" style={{ color: scoreColor }}>
              {testDetails.scoreObtained} / {testDetails.maxMarks}
              <span className="text-xl">{scoreEmoji(scorePct)}</span>
            </span>
          ) : (
            <span className="text-sm font-semibold text-ink/40">–</span>
          )}
        </div>

        <div className="tear-line mt-6 pt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-1.5">
            Feedback
          </p>
          <p className="text-base leading-relaxed text-ink/85 whitespace-pre-wrap min-h-6">
            {comments.trim() || '–'}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span style={{ fontFamily: 'var(--font-hand)' }} className="text-xl text-primary/70">
              Vennila
            </span>
            <span className="text-xs font-medium text-ink/40 whitespace-nowrap">
              | Accountant | Tuition Teacher
            </span>
          </div>
        </div>
      </div>
    )
  })
)

export default ReportPreview

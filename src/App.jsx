import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import StudentSearch from '@/components/StudentSearch'
import DayRow from '@/components/DayRow'
import TestScorePicker from '@/components/TestScorePicker'
import CommentPresets from '@/components/CommentPresets'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { roster } from '@/data/roster'
import { getCurrentWeekMonday, buildWeekDays, formatRange } from '@/utils/dateHelpers'
import { FileText, GraduationCap } from 'lucide-react'

const weekMonday = getCurrentWeekMonday()
const ReportPreviewLazy = lazy(() => import('@/components/ReportPreview'))
const ShareButtonLazy = lazy(() => import('@/components/ShareButton'))

function defaultDays() {
  return buildWeekDays(weekMonday).map((date) => ({
    date,
    present: true,
    homeworkDone: true,
  }))
}

export default function App() {
  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [days, setDays] = useState(defaultDays)
  const [testDetails, setTestDetails] = useState({ maxMarks: 20, scoreObtained: 20 })
  const [comments, setComments] = useState('')
  const [reportGenerated, setReportGenerated] = useState(false)

  const reportRef = useRef(null)
  const canGenerate = studentName.trim().length > 0

  const handleStudentSelect = useCallback(({ name, class: cls }) => {
    setStudentName(name)
    if (cls) setStudentClass(cls)
  }, [])

  const updateDay = useCallback((index, patch) => {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)))
  }, [])

  const appendComment = useCallback((phrase) => {
    setComments((prev) => {
      const bullet = `• ${phrase}`
      return prev.trim() ? `${prev.replace(/\s+$/, '')}\n${bullet}` : bullet
    })
  }, [])

  const handleGenerateReport = useCallback(() => {
    setReportGenerated(true)
  }, [])

  return (
    <div className="min-h-screen pb-28">
      <header className="px-5 pt-6 pb-4 w-full md:max-w-125 mx-auto">
        <div className="flex items-center gap-2 text-primary">
          <GraduationCap className="h-6 w-6" />
          <span className="text-lg font-extrabold tracking-tight">TutorTrack</span>
        </div>
        <p className="text-sm text-ink/50 mt-1">
          Weekly report · {formatRange(weekMonday)}
        </p>
      </header>

      <main className="px-5 w-full md:max-w-125 mx-auto flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Student</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Name</Label>
              <StudentSearch roster={roster} value={studentName} onSelect={handleStudentSelect} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Class</Label>
              <Input
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="e.g. Class 8"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance &amp; homework</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {days.map((d, i) => (
              <DayRow
                key={i}
                date={d.date}
                present={d.present}
                homeworkDone={d.homeworkDone}
                onChange={(patch) => updateDay(i, patch)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saturday test</CardTitle>
          </CardHeader>
          <CardContent>
            <TestScorePicker
              maxMarks={testDetails.maxMarks}
              scoreObtained={testDetails.scoreObtained}
              onChange={setTestDetails}
              disabled={!days[5]?.present}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CommentPresets onAppend={appendComment} />
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add or edit comments…"
              rows={3}
            />
          </CardContent>
        </Card>

        {reportGenerated && (
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-5 bg-ink/2">
              <Suspense fallback={<div className="text-sm text-ink/50">Preparing report…</div>}>
                <ReportPreviewLazy
                  ref={reportRef}
                  studentName={studentName}
                  studentClass={studentClass}
                  weekStartDate={weekMonday}
                  days={days}
                  testDetails={testDetails}
                  comments={comments}
                />
              </Suspense>
            </CardContent>
          </Card>
        )}

        {reportGenerated && (
          <Suspense fallback={null}>
            <ShareButtonLazy targetRef={reportRef} studentName={studentName} />
          </Suspense>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper/95 backdrop-blur border-t border-ink/10 px-5 py-3">
        <div className="w-full md:max-w-125 mx-auto">
          <Button
            size="lg"
            className="w-full"
            disabled={!canGenerate}
            onClick={handleGenerateReport}
          >
            <FileText className="h-5 w-5" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  )
}

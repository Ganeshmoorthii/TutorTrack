import { startOfWeek, addDays, format } from 'date-fns'

// Monday of the current week
export function getCurrentWeekMonday(today = new Date()) {
  return startOfWeek(today, { weekStartsOn: 1 })
}

// Build Mon-Sat array of { date } from a Monday date
export function buildWeekDays(monday) {
  return Array.from({ length: 6 }, (_, i) => addDays(monday, i))
}

export function formatDay(date) {
  return format(date, 'EEE d')
}

export function formatRange(monday) {
  const saturday = addDays(monday, 5)
  const sameMonth = monday.getMonth() === saturday.getMonth()
  const start = format(monday, sameMonth ? 'd' : 'd MMM')
  const end = format(saturday, 'd MMM yyyy')
  return `${start} – ${end}`
}

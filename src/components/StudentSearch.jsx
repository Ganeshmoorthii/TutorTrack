import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Searchable combobox over the roster. Falls back to free-text if the
// typed name isn't found, so the teacher is never blocked.
function StudentSearch({ roster, value, onSelect }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')

  useEffect(() => setQuery(value || ''), [value])

  const filtered = useMemo(() => {
    if (!query.trim()) return roster
    const q = query.toLowerCase()
    return roster.filter((s) => s.name.toLowerCase().includes(q))
  }, [roster, query])

  const pick = useCallback(
    (student) => {
      onSelect({ name: student.name, class: student.class, matched: true })
      setQuery(student.name)
      setOpen(false)
    },
    [onSelect]
  )

  const handleChange = useCallback(
    (v) => {
      setQuery(v)
      onSelect({ name: v, class: undefined, matched: false })
      setOpen(true)
    },
    [onSelect]
  )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 pointer-events-none" />
          <Input
            className="pl-10"
            placeholder="Type a student's name…"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </div>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-50 rounded-xl border border-ink/10 bg-white shadow-lg overflow-hidden"
          style={{ width: 'var(--radix-popper-anchor-width)' }}
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-ink/50">
                No match — “{query}” will be used as a new student.
              </div>
            )}
            {filtered.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => pick(s)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-left text-base',
                  'hover:bg-primary/5 min-h-11'
                )}
              >
                <User className="h-4 w-4 text-primary/60 shrink-0" />
                <span className="font-medium">{s.name}</span>
                <span className="ml-auto text-xs text-ink/45">{s.class}</span>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default memo(StudentSearch)

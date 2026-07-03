import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-28 w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 text-base',
      'placeholder:text-ink/40 outline-none transition-colors resize-none',
      'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }

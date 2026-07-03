import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

// checkedClassName lets callers pick the "on" color per-instance
// (e.g. good-green for present, needs-terracotta for absent state).
const Switch = React.forwardRef(({ className, checkedClassName = 'data-[state=checked]:bg-good', ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-transparent',
      'transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
      'data-[state=unchecked]:bg-ink/15',
      checkedClassName,
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-6 w-6 rounded-full bg-white shadow-md ring-0 transition-transform',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5'
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = 'Switch'

export { Switch }

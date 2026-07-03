import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border',
  {
    variants: {
      variant: {
        neutral: 'bg-ink/5 text-ink border-transparent',
        good: 'bg-good/10 text-good border-good/20',
        average: 'bg-average/15 text-[#8a5a2b] border-average/30',
        needs: 'bg-needs/10 text-needs border-needs/20',
        primary: 'bg-primary/10 text-primary border-primary/20',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }

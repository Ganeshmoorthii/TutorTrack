import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ' +
  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50 min-h-11',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
        outline: 'border-2 border-primary/30 text-primary bg-transparent hover:bg-primary/5 focus-visible:ring-primary',
        ghost: 'bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink/30',
        whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark focus-visible:ring-whatsapp shadow-lg shadow-whatsapp/30',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-11 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }

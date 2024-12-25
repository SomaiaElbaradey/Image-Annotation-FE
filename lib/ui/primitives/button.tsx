import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '../utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-colors hover:opacity-80 focus-visible:outline-none disabled:cursor-not-allowed',
          props.className
        )}
      />
    )
  }
)
Button.displayName = 'Button'

export default Button

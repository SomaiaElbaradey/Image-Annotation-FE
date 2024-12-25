import * as React from 'react'

import { cn } from '../utils'

export type BadgeProps = React.HTMLAttributes<HTMLDivElement>

export default function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        className
      )}
      {...props}
    />
  )
}

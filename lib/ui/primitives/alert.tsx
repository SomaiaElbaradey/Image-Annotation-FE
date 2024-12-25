import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

import Typography from './typography'

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        pending: 'bg-backgroundAccent-warningLight border-0',
        success: 'bg-backgroundAccent-positiveLight border-0',
        error: 'bg-backgroundAccent-dangerLight border-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type AlertVariants = VariantProps<typeof alertVariants>

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AlertVariants
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <Typography.ST1
    className={cn('my-1 leading-none tracking-tight', className)}
    {...props}
  />
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <Typography.P3
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle, type AlertVariants }

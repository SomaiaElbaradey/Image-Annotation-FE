import { cn } from '../utils'

const Typography = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn('text-[2.75rem] font-bold', className)} {...props}>
    {children}
  </h1>
)

const Display = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn('text-[2rem] font-bold', className)} {...props}>
    {children}
  </h1>
)

Typography.displayName = 'Typography'

const Heading1 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn('text-[1.625rem] font-medium', className)} {...props}>
    {children}
  </h1>
)

const Heading2 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-[1.5rem] font-medium', className)} {...props}>
    {children}
  </h2>
)

const Heading3 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-[1.25rem] font-medium', className)} {...props}>
    {children}
  </h3>
)

const Heading4 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className={cn('text-[1.125rem] font-medium', className)} {...props}>
    {children}
  </h4>
)

const Subtitles1 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-base font-medium', className)} {...props}>
    {children}
  </span>
)
const Subtitles2 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-base font-normal', className)} {...props}>
    {children}
  </span>
)
const Subtitles3 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-sm font-medium', className)} {...props}>
    {children}
  </span>
)

const Paragraph1 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-base font-medium', className)} {...props}>
    {children}
  </p>
)
const Paragraph2 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-base font-normal', className)} {...props}>
    {children}
  </p>
)
const Paragraph3 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm font-normal', className)} {...props}>
    {children}
  </p>
)

const Caption1 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-[0.8125rem] font-bold', className)} {...props}>
    {children}
  </span>
)
const Caption2 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-[0.8125rem] font-normal', className)} {...props}>
    {children}
  </span>
)

const Caption3 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-[0.8125rem] font-medium', className)} {...props}>
    {children}
  </span>
)

const Button1 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-[1rem] font-bold', className)} {...props}>
    {children}
  </p>
)
const Button2 = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-[0.875rem] font-bold', className)} {...props}>
    {children}
  </p>
)

Typography.DS = Display
Typography.H1 = Heading1
Typography.H2 = Heading2
Typography.H3 = Heading3
Typography.H4 = Heading4
Typography.ST1 = Subtitles1
Typography.ST2 = Subtitles2
Typography.ST3 = Subtitles3
Typography.P1 = Paragraph1
Typography.P2 = Paragraph2
Typography.P3 = Paragraph3
Typography.CP1 = Caption1
Typography.CP2 = Caption2
Typography.CP3 = Caption3
Typography.BTN1 = Button1
Typography.BTN2 = Button2

export default Typography

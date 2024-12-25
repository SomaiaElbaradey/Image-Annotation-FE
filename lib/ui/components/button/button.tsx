import { Button as ButtonPrimitive } from '../../primitives'
import { cn } from '../../utils'
import Spinner from '../spinner'

import { buttonTypography, buttonVariants, iconClasses } from './config'
import { ButtonProps } from './types'

export default function Button({
  className,
  children,
  loading,
  leadingIcon,
  trailingIcon,
  variant,
  state,
  size,
  classNames,
  type = 'button',
  ...args
}: ButtonProps) {
  const ButtonTypography = buttonTypography[size || 'medium']
  const iconClassNames = `${iconClasses[size || 'medium']} mx-2`

  return (
    <ButtonPrimitive
      {...args}
      type={type}
      className={cn(
        buttonVariants({
          variant,
          state: args.disabled ? 'disabled' : state,
          size,
        }),
        className
      )}
    >
      {loading && (
        <Spinner className="text-visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
      )}
      <>
        {leadingIcon && !loading && (
          <span className={cn(iconClassNames, classNames?.icon)}>
            {leadingIcon}
          </span>
        )}
        <ButtonTypography
          className={cn(loading ? 'invisible' : '', classNames?.text)}
        >
          {children}
        </ButtonTypography>
        {trailingIcon && !loading && (
          <span className={cn(iconClassNames, classNames?.icon)}>
            {trailingIcon}
          </span>
        )}
      </>
    </ButtonPrimitive>
  )
}

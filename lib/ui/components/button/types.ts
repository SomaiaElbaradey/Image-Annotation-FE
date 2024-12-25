import { type ReactNode } from 'react'
import { type VariantProps } from 'class-variance-authority'

import { type ButtonProps as PrimitiveButtonProps } from '../../primitives'

import { buttonVariants } from './config'

export type ButtonVariants = typeof buttonVariants

export interface ButtonProps
  extends PrimitiveButtonProps,
    VariantProps<ButtonVariants> {
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  classNames?: {
    icon?: string
    text?: string
  }
}

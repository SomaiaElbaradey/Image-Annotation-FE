import { type VariantProps } from 'class-variance-authority'

import { Badge as PrimitiveBadge, Typography } from '../../primitives'
import { BadgeProps as PrimitiveBadgeProps } from '../../primitives/badge'

import { badgeVariants } from './config'
import { cn } from '../../utils'

export type BadgeProps = PrimitiveBadgeProps &
    VariantProps<typeof badgeVariants>

export default function Badge({
    className,
    state,
    type,
    size = 'xsmall',
    children,
    ...rest
}: BadgeProps) {
    const wrapperVariants = {
        small: Typography.ST3,
        xsmall: Typography.CP2,
        '2xsmall': Typography.CP3,
    }

    const TextWrapper = (size && wrapperVariants[size]) || Typography.CP2

    return (
        <PrimitiveBadge
            className={cn(badgeVariants({ state, type, size }), className)}
            {...rest}
        >
            <TextWrapper>{children}</TextWrapper>
        </PrimitiveBadge>
    )
}

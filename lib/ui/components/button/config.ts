import { cva } from "class-variance-authority";

import { Typography } from "../../primitives";

export const buttonVariants = cva(
    "rounded-xl relative h-12 py-2.5 px-4 uppercase",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white",
                secondary: "bg-transparent text-primary",
                tertiary: "bg-white text-primary border border-primary",
                text: "text-content-secondary bg-transparent",
            },
            state: {
                danger: "text-danger bg-white",
                enabled: "",
                disabled: "text-content-disabled bg-white",
            },
            size: {
                large: "h-14 py-2.5 px-6 rounded-2xl",
                medium: "h-12 px-4 py-1.5",
                small: "h-10 px-4 py-1.5",
                x_small: "h-8",
            },
        },
        compoundVariants: [
            {
                state: "danger",
                variant: "primary",
                className: "bg-backgroundAccent-dangerLight",
            },
            {
                state: "danger",
                variant: "tertiary",
                className: "border border-danger",
            },
            {
                state: "disabled",
                variant: "tertiary",
                className: "border-none",
            },
            {
                state: "disabled",
                variant: "primary",
                className: "bg-backgroundMain-disabled",
            },
        ],
        defaultVariants: {
            state: "enabled",
            variant: "primary",
            size: "medium",
        },
    }
);

export const buttonTypography = {
    large: Typography.BTN1,
    medium: Typography.BTN1,
    small: Typography.BTN2,
    x_small: Typography.BTN2,
} as const;

export const iconClasses = {
    large: "size-6",
    medium: "size-6",
    small: "size-5",
    x_small: "size-5",
} as const;

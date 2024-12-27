import { cva } from "class-variance-authority";

export const badgeVariants = cva("box-border shadow-none", {
    variants: {
        state: {
            default:
                "bg-backgroundAccent-purpleLight text-purple border-purple",
            danger: "bg-backgroundAccent-dangerLight text-danger border-danger",
            success:
                "bg-backgroundAccent-positiveLight text-positive border-positive",
            pending:
                "bg-backgroundAccent-warningLight text-orange border-orange",
            info: "bg-backgroundMain text-content-secondary border-borderColor",
            inactive: "bg-backgroundMain-disabled text-content-disabled",
        },
        type: {
            primary: "border-transparent",
            secondary: "border",
            solid: "text-white border-transparent",
        },
        size: {
            small: "py-[0.5rem] px-[1rem]",
            xsmall: "py-0.5 px-3 h-7",
            "2xsmall": "py-[0.031rem] px-[0.5rem]",
        },
    },
    compoundVariants: [
        {
            state: "default",
            type: "solid",
            className: "bg-purple",
        },
        {
            state: "danger",
            type: "solid",
            className: "bg-danger",
        },
        {
            state: "success",
            type: "solid",
            className: "bg-primary",
        },
        {
            state: "pending",
            type: "solid",
            className: "bg-orange",
        },
        {
            state: "inactive",
            type: "secondary",
            className: "border-transparent",
        },
        {
            state: "inactive",
            type: "solid",
            className: "text-content-disabled",
        },
        {
            state: "info",
            type: "solid",
            className: "text-content-secondary",
        },
    ],
    defaultVariants: {
        state: "default",
        type: "primary",
        size: "xsmall",
    },
});

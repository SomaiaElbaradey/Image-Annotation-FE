import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0066c0",
                    900: "#001F3F",
                    700: "#00509E",
                },
                white: "#FFFFFF",
                danger: "#e90d00",
                backgroundMain: {
                    disabled: "#E8F0FE",
                    mask: "#0A2742",
                },
                backgroundAccent: {
                    warningLight: "#FFF8E1",
                    dangerLight: "#FFEBEE",
                    positiveLight: "#E8F5E9",
                    purpleLight: "#E9D8FD",
                },
                content: {
                    primary: "#002855",
                    secondary: "#4B6A92",
                    disabled: "#9FB3C8",
                },
                borderColor: {
                    DEFAULT: "#D1D9E6",
                },
                purple: {
                    DEFAULT: "#70359f",
                    light: "#E9D8FD",
                },
                positive: {
                    DEFAULT: "#3d8b40",
                    light: "#E8F5E9",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;

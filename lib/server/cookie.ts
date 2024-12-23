"use server";

import { cookies } from "next/headers";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 * 12;

export const setSessionCookie = async (name: string, value: string) => {
    (await cookies()).set({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        secure: true,
        name,
        value,
    });
};

export const deleteSessionCookie = async (name: string) => {
    (await cookies()).delete({
        name,
    });
};

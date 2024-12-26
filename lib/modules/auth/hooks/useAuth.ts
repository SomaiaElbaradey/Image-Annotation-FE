"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import app from "@/lib/server/firebase/config";
import { LoginInputs, RegisterInputs } from "@/lib/modules/auth/schemas/auth";
import { deleteSessionCookie, setSessionCookie } from "@/lib/server/cookie";

type UnAuthedState = {
    state: "error";
    message: string;
};

type AuthedState = {
    state: "authenticated";
};

type LoadingState = {
    state: "loading";
};

type AuthState = UnAuthedState | AuthedState | LoadingState;

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>();
    const router = useRouter();

    const login = async (data: LoginInputs) => {
        setAuthState({ state: "loading" });

        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, data.email, data.password);

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    await setSessionCookie("user", JSON.stringify(user));
                    router.push("/image-annotation");
                } else {
                    deleteSessionCookie("user");
                    router.push("/login");
                }
            });

            setAuthState({ state: "authenticated" });
        } catch (err) {
            setAuthState({
                state: "error",
                message:
                    (err as Error).message ||
                    "An error occurred during sign in",
            });
        }
    };

    const register = async (data: RegisterInputs) => {
        setAuthState({ state: "loading" });

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            router.push("/login");
        } catch (err) {
            setAuthState({
                state: "error",
                message:
                    (err as Error).message ||
                    "An error occurred during registration",
            });
        }
    };

    const authError = authState?.state === "error" ? authState.message : "";
    const isLoading = authState?.state === "loading";

    return {
        login,
        register,
        error: authError,
        isLoading,
    } as const;
};

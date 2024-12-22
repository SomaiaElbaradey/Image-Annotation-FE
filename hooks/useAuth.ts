import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { setCookie } from "cookies-next";

import app from "@/lib/server/firebase/config";
import { LoginInputs, RegisterInputs } from "@/lib/modules/auth/schemas/auth";

export const useAuth = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (data: LoginInputs) => {
        setIsLoading(true);
        setError("");

        try {
            const auth = getAuth(app);
            const credential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const idToken = await credential.user.getIdToken();
            const userData = JSON.stringify({
                uid: credential.user.uid,
                email: credential.user.email,
            });

            localStorage.setItem("token", idToken);
            localStorage.setItem("userData", userData);

            setCookie("token", idToken, { maxAge: 60 * 60 * 24 });
            setCookie("userData", userData, { maxAge: 60 * 60 * 24 });

            router.push("/tasks");
        } catch (err) {
            setError(
                (err as Error).message || "An error occurred during sign in"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterInputs) => {
        setIsLoading(true);
        setError("");

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            router.push("/login");
        } catch (err) {
            setError(
                (err as Error).message ||
                    "An error occurred during registration"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { login, register, error, isLoading };
};

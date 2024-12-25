import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(false);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return { user, isLoading } as const;
};

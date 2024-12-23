"use client";

import { useAuth } from "@/lib/modules/auth/hooks";

export default function HomePage() {
    const { logout } = useAuth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-xl mb-4">Home page</h1>
            <button
                onClick={logout}
                className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
            >
                Logout
            </button>
        </main>
    );
}
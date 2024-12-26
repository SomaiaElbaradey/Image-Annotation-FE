'use client';

import { useRouter } from 'next/navigation'

import { Button, Typography } from '@/lib/ui';
import { deleteSessionCookie } from '@/lib/server/cookie';
import { auth } from '@/lib/server/firebase';

import { signOut } from 'firebase/auth';
import { useState } from 'react';

export function TopBar() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            await signOut(auth);
            deleteSessionCookie("user");
            router.push("/login");
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm h-auto mb-4">
            <div className="flex justify-between items-center py-1">
                <div className="flex-shrink-0">
                    <Typography.H3>Image Annotation</Typography.H3>
                </div>
                <div>
                    <Button
                        onClick={handleLogout}
                        variant='text'
                        loading={isLoading}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}


"use client"
import { logout } from '@/lib/action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const LogoutPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            logout();
        } else if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );

}

export default LogoutPage

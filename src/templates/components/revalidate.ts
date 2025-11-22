export default function revalidateJsx() {
    return `'use client';

import { revalidate } from "@/lib/auth";
import { useSplash } from "@infinityfx/splash";
import { useEffect } from "react";
import { LuTriangleAlert } from "react-icons/lu";

export default function Revalidate() {
    const splash = useSplash();

    useEffect(() => {
        const ctrl = new AbortController();

        function revalidateUser() {
            const user = revalidate();

            if (!user) splash.splash({
                title: 'You have been signed out',
                color: 'orange',
                icon: <LuTriangleAlert />
            });
        }

        window.addEventListener('focus', revalidateUser, { signal: ctrl.signal });

        revalidateUser();

        return () => ctrl.abort();
    }, []);

    return null;
}`;
}
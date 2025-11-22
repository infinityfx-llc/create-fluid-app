export default function signInJsx(domainName: string) {
    return `import styles from './page.module.css';

import type { Metadata } from 'next';
import { getUser } from "@/lib/auth";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Sign in',
    alternates: {
        canonical: 'https://${domainName}/sign-in'
    }
};

export default async function SignIn() {
    const user = await getUser();
    if (user) redirect('/');

    return <main className="page">
        <section className={styles.container}>
            Your sign in page here
        </section>
    </main>;
}`;
}
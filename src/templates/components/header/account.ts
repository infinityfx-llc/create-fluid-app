export default function accountJsx() {
    return `import styles from './styles.module.css';

import { getUser } from "@/lib/auth";
import { Button } from "@infinityfx/fluid";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default async function Account() {
    const user = await getUser();

    if (user) return null;

    return <Link href="/sign-in" tabIndex={-1}>
        <Button className={styles.account}>
            <LuLogIn />
            Sign in
        </Button>
    </Link>;
}`;
}
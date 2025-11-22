export default function navigationJsx() {
    return `'use client';

import styles from './styles.module.css';

import { NavigationMenu } from "@infinityfx/fluid";
import Link from "next/link";

export default function Navigation() {

    return <NavigationMenu.Root className={styles.navigation}>
        <NavigationMenu.Group label="Home" href="/" Link={Link} />
    </NavigationMenu.Root>;
}`;
}
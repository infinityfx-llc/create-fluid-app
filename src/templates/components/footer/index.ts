export default function footerJsx(projectName: string) {
    return `import styles from './footer.module.css';

export default function Footer() {

    return <footer className={styles.footer}>
        <p>
            ©Copyright2025-{new Date().getFullYear()} ${projectName}. All rights reserved.
        </p>
    </footer>;
}`;
}
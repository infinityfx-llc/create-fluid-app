import { CliOptions } from "../../../utils";

export default function headerJsx(options: CliOptions) {
    return `import styles from './styles.module.css';

import Navigation from './navigation';
${options.auth ? `import Account from './account';
import { Suspense } from 'react';` : '#'}

export default function Header() {

    return <header className={styles.header}>
        <Navigation />

        ${options.auth ? `<Suspense>
            <Account />
        </Suspense>` : ''}
    </header>;
}`.replace(/^\s*\#[\r\n]/gm, '');
}
export default function pageJsx() {
    return `import Link from 'next/link';
import { Button } from '@infinityfx/fluid';

export default function Page() {

    return <main className="main">
        <Link href="https://fluid.infinityfx.dev/docs/get-started" tabIndex={-1}>
            <Button>
                Get started
            </Button>
        </Link>
    </main>;
}`;
}
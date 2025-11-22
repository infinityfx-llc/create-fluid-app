import { ProjectConfig } from "../../core";
import { CliOptions } from "../../utils";

export default function layoutJsx(config: ProjectConfig, options: CliOptions) {
    return `import './globals.css';
import '../fluid.css';

import { Inter } from "next/font/google";
import { FluidProvider } from "@infinityfx/fluid";
import { Splash } from "@infinityfx/splash";
import type { Metadata } from "next";
${options.auth ? `import Revalidate from "@/components/revalidate";
import { Suspense } from "react";` : '#'}
${options.shell ? `import Footer from "@/components/footer";
import Header from "@/components/header";` : '#'}

const interFont = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    fallback: ['system-ui', "Segoe UI", 'Roboto', 'Helvetica', 'sans-serif']
});

export const metadata: Metadata = {
    title: {
        default: '${config.name}',
        template: '%s | ${config.name}'
    },
    metadataBase: new URL('https://${config.domain}')
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {

    return <html className={interFont.variable}>
        <FluidProvider>
            <body>
                <Splash>
                    ${options.shell ? '<Header />' : '#'}

                    {children}

                    ${options.shell ? '<Footer />' : '#'}

                    ${options.auth ? `<Suspense>
                        <Revalidate />
                    </Suspense>` : '#'}
                </Splash>
            </body>
        </FluidProvider>
    </html>;
}`.replace(/^\s*\#[\r\n]/gm, '');
}
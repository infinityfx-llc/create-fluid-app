export function tsConfig() {
    return `{
    "compilerOptions": {
        "baseUrl": ".",
        "target": "es2022",
        "lib": [
            "dom",
            "dom.iterable",
            "es2022"
        ],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
            {
                "name": "next"
            }
        ],
        "paths": {
			"@/*": [
				"./*"
			]
        }
    },
    "include": [
		"next-env.d.ts",
		"**/*.ts",
		"**/*.tsx",
		".next/types/**/*.ts",
		".next/dev/types/**/*.ts"
    ],
    "exclude": [
		"node_modules"
    ]
}`;
}

export function nextConfig() {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true
};

module.exports = nextConfig;`;
}

export function fluidConfig() {
    return `/** @type {import('@infinityfx/fluid').FluidConfig} */
module.exports = {
    theme: {
        font: {
            family: 'var(--font-inter)'
        }
    },
    cssOutput: 'manual'
}`;
}

export function eslintJson() {
    return `{
  "extends": "next/core-web-vitals"
}`;
}

export function prismaConfig() {
    return `import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations'
    },
    datasource: {
        url: env('DATABASE_URL')
    }
});`;
}
import { CliOptions } from "../utils";
import { dbAdapters, DBEngine } from "./lib/db";

export default function packageJson(name: string, dbEngine: DBEngine | null, options: CliOptions) {
    const db = options.auth || options.database;

    return `{
    "name": "${name}",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "dev": "npx fluid compile -d && next dev",
        "prebuild": "npx fluid compile${db ? ' && npx prisma generate' : ''}",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "@infinityfx/fluid": "^1.4.17",
        "@infinityfx/lively": "^4.0.10",
        "@infinityfx/splash": "^0.1.4",
        ${options.auth ? '"nano-auth": "^0.2.0",' : ''}
        ${db ? '"@prisma/client": "^7.0.0",' : ''}
        ${dbEngine ? `"@prisma/${dbAdapters[dbEngine][1]}": "^7.0.0",` : ''}
        ${dbEngine === 'postgresql' ? `"pg": "^8.16.3",` : ''}
        "eslint": "^9.39.1",
        "next": "^16.0.3",
        "react": "^19.2.0",
        "react-dom": "^19.2.0",
        "react-icons": "^5.5.0",
        "sharp": "^0.34.5",
        "typescript": "^5.9.3"
    },
    "devDependencies": {
        ${db ? '"prisma": "^7.0.0",' : ''}
        ${dbEngine === 'sqlite' ? '"@types/better-sqlite3": "^7.6.13",' : ''}
        ${dbEngine === 'postgresql' ? '"@types/pg": "^8.15.6",' : ''}
        "@types/node": "^24.10.1",
        "@types/react": "^19.2.6",
        "@types/react-dom": "^19.2.3",
        "eslint-config-next": "^16.0.3"
    }
}`.replace(/^\s*[\r\n]/gm, '');
}
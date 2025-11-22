export type DBEngine = 'postgresql' | 'mysql' | 'sqlite';

export const dbAdapters = {
    postgresql: ['PrismaPg', 'adapter-pg'],
    mysql: ['PrismaMariaDb', 'adapter-mariadb'],
    sqlite: ['PrismaBetterSqlite3', 'adapter-better-sqlite3']
};

export default function dbLib(dbEngine: DBEngine) {
    const [name, path] = dbAdapters[dbEngine];

    return `import { PrismaClient } from '@/prisma/generated/client';
import { ${name} } from '@prisma/${path}';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const connectionString = process.env.DATABASE_URL as string;
${dbEngine === 'mysql' ? `const [user, password, host, port, database] = connectionString
    .replace(\/^mysql\\:\\/\\/\/, '')
    .replace(\/\\/|\\?\/g, ':')
    .split(\/:|@\/g);` : '#'}

const adapter = new ${name}({
    ${dbEngine === 'sqlite' ? 'url: connectionString' : '#'}
    ${dbEngine === 'postgresql' ? 'connectionString' : '#'}
    ${dbEngine === 'mysql' ? `host,
    user,
    password,
    database,
    port: parseInt(port),
    connectionLimit: 5` : '#'}
});

const db = globalForPrisma.prisma || new PrismaClient({
    adapter
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export default db;`.replace(/^\s*\#[\r\n]/gm, '');
}
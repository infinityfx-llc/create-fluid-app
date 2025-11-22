import { spawnSync } from "child_process";
import authRoute from "./templates/app/authenticate/route";
import globalCss from "./templates/app/globals.css";
import layoutJsx from "./templates/app/layout";
import pageJsx from "./templates/app/page";
import { eslintJson, fluidConfig, nextConfig, prismaConfig, tsConfig } from "./templates/configs";
import envConfig from "./templates/env";
import gitIgnore from "./templates/gitignore";
import authLib from "./templates/lib/auth";
import dbLib, { DBEngine } from "./templates/lib/db";
import packageJson from "./templates/package.json";
import prismaSchema from "./templates/prisma/schema.prisma";
import { CliOptions, promptUser, createFile, strToKebab } from "./utils";

export function showHelp() {
    console.log(`create-fluid-app v0.0.1`);
    console.log();
    console.log('Usage: npx create-fluid-app <options>');
    console.log();

    // todo
}

export type ProjectConfig = {
    name: string;
    domain: string;
    dbEngine: DBEngine | null;
}

export async function createConfigurationFiles(options: CliOptions) {
    const name = await promptUser('What would you like to name your project?');
    const url = await promptUser('What is your website domain?');
    const dbEngine = options.auth || options.database ? await promptUser('Pick a database', ['postgresql', 'mysql', 'sqlite']) as DBEngine : null;

    const pckg = packageJson(strToKebab(name), dbEngine, options);
    createFile('./package.json', pckg);

    createFile('./.gitignore', gitIgnore());
    createFile('./tsconfig.json', tsConfig());
    createFile('./next.config.js', nextConfig());
    createFile('./fluid.config.js', fluidConfig());
    createFile('./.eslintrc.json', eslintJson());
    createFile('./.env', envConfig(options));

    console.log();

    return {
        name,
        domain: url.replace(/^https?\:\/\//, '').replace(/\/$/, ''),
        dbEngine
    };
}

export async function createProjectStructure(config: ProjectConfig, options: CliOptions) {
    const layout = layoutJsx(config, options);
    createFile('./app/layout.tsx', layout);

    const globals = globalCss();
    createFile('./app/globals.css', globals);

    // favicon

    const page = pageJsx();
    createFile('./app/page.tsx', page);

    if ((options.auth || options.database) && config.dbEngine) {
        const dbConfig = prismaConfig();
        createFile('./prisma.config.ts', dbConfig);

        const db = dbLib(config.dbEngine);
        createFile('./lib/db.ts', db);

        const schema = prismaSchema(config.dbEngine);
        createFile('./prisma/schema.prisma', schema);
    }

    if (options.auth) {
        const auth = authLib(config.domain);
        createFile('./lib/auth.ts', auth);

        const route = authRoute();
        createFile('./app/authenticate/route.ts', route);
    }

    console.log();
}

export function runSetupCommands() {
    console.log('$ npm install');
    spawnSync('npm install', {
        stdio: 'inherit',
        shell: true
    });

    console.log();
}
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
import loadingJsx from "./templates/app/loading";
import footerJsx from "./templates/components/footer";
import footerCss from "./templates/components/footer/styles.module.css";
import headerJsx from "./templates/components/header";
import headerCss from "./templates/components/header/styles.module.css";
import navigationJsx from "./templates/components/header/navigation";
import accountJsx from "./templates/components/header/account";
import signInJsx from "./templates/app/sign-in/page";
import signInCss from "./templates/app/sign-in/page.module.css";
import revalidateJsx from "./templates/components/revalidate";

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

export function createProjectStructure(config: ProjectConfig, options: CliOptions) {
    const layout = layoutJsx(config, options);
    createFile('./app/layout.tsx', layout);

    const globals = globalCss();
    createFile('./app/globals.css', globals);

    const loading = loadingJsx();
    createFile('./app/loading.tsx', loading);

    const page = pageJsx();
    createFile('./app/page.tsx', page);

    // favicon

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

        const revalidate = revalidateJsx();
        createFile('./components/revalidate.tsx', revalidate);
    }
}

export function createShellApp(config: ProjectConfig, options: CliOptions) {
    const header = headerJsx(options);
    createFile('./components/header/index.tsx', header);
    const headerStyles = headerCss();
    createFile('./components/header/styles.module.css', headerStyles);
    const navigation = navigationJsx();
    createFile('./components/header/navigation.tsx', navigation);

    const footer = footerJsx(config.name);
    createFile('./components/footer/index.tsx', footer);
    const footerStyles = footerCss();
    createFile('./components/footer/styles.module.css', footerStyles);

    if (options.auth) {
        const account = accountJsx();
        createFile('./components/header/account.tsx', account);

        const signIn = signInJsx(config.domain);
        createFile('./app/sign-in/page.tsx', signIn);
        const signInStyles = signInCss();
        createFile('./app/sign-in/page.module.css', signInStyles);
    }
}

export function runSetupCommands() {
    console.log('$ npm install'); // detect npm/yarn/pnpm/bun
    spawnSync('npm install', {
        stdio: 'inherit',
        shell: true
    });

    console.log('$ npx prisma generate');
    spawnSync('npx prisma generate', {
        stdio: 'inherit',
        shell: true
    });

    console.log('$ npx fluid compile -d');
    spawnSync('npx fluid compile -d', {
        stdio: 'inherit',
        shell: true
    });
}
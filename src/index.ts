#! /usr/bin/env node

import { createConfigurationFiles, createProjectStructure, createShellApp, runSetupCommands, showHelp } from './core';
import { isFolderEmpty, parseOptions } from './utils';

const options = parseOptions(process.argv.slice(2));

async function main() {
    console.log();

    if (options.help) return showHelp();

    if (!isFolderEmpty()) return console.log('Target directory is not empty');

    const start = performance.now();
    const config = await createConfigurationFiles(options);
    createProjectStructure(config, options);

    if (options.shell) createShellApp(config, options);

    runSetupCommands(options);

    console.log(`Created Fluid UI app in ${((performance.now() - start) / 1000).toFixed(2)}s`);
}

main();


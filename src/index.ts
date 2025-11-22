#! /usr/bin/env node

import { createConfigurationFiles, createProjectStructure, runSetupCommands, showHelp } from './core';
import { isFolderEmpty, parseOptions } from './utils';

const options = parseOptions(process.argv.slice(2));

async function main() {
    console.log();

    if (options.help) return showHelp();

    if (!isFolderEmpty()) return console.log('Target directory is not empty');

    const config = await createConfigurationFiles(options);
    await createProjectStructure(config, options);

    if (options.shell) {}

    runSetupCommands();
}

main();


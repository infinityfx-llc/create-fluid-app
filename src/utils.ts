import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import prompts from 'prompts';
import path from "path";

export type CliOptions = {
    [key in 'help' | 'auth' | 'database' | 'shell']?: boolean;
};

export function parseOptions(options: string[]) {
    const result: CliOptions = {};

    options.forEach(option => {
        switch (option) {
            case '--help':
            case '-h':
                return result.help = true;
            case '--auth':
            case '-a':
                return result.auth = true;
            case '--database':
            case '-db':
                return result.database = true;
            case '--shell':
            case '-sh':
                return result.shell = true;
        }
    });

    return result;
}

export function isFolderEmpty() {
    return !readdirSync(process.cwd()).length;
}

export async function promptUser(question: string, choices: string[] = []): Promise<string> {
    const { value } = await prompts({
        type: choices.length ? 'select' : 'text',
        name: 'value',
        message: question,
        choices: choices.map(value => ({ title: value, value })),
        instructions: false
    });

    return value;
}

export function strToKebab(str: string) {
    return str.replace(/\s+|([a-z])([A-Z])/g, '$1-$2').toLowerCase().trim();
}

export function createFile(file: string, data: string) {
    const fullPath = path.join(process.cwd(), file);

    mkdirSync(path.dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, data);
}
import { CliOptions } from "../utils";

export default function envConfig(options: CliOptions) {
    const vars = [];

    if (options.auth || options.database) vars.push('DATABASE_URL=""');
    if (options.auth) vars.push('SECRET_KEY=""');
    
    return vars.join('\n');
}
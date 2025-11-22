import { CliOptions } from "../utils";

export default function envConfig(options: CliOptions) {
    const vars = [];

    if (options.auth || options.database) vars.push('DATABASE_URL="your_database_url_here"');
    if (options.auth) vars.push('SECRET_KEY="your_secret_key_here"');
    
    return vars.join('\n');
}
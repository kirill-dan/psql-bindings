import fs from 'fs';
import path from 'path';

/**
 * Get values from the environment file (by default .env)
 *
 * @param fileName {string} environment file name (by default .env)
 */
export const getEnv = (fileName = '.env') => {
    let envFile = '';
    let envArray = [];
    // Get root project directory
    const appDir = process.cwd();
    const env = {};

    console.log(`Found .env file in ${appDir}`);

    try {
        // Read the file
        envFile = fs.readFileSync(path.join(appDir, fileName), 'utf8');
    } catch (error) {
        console.error(`Can't find .env file in ${appDir}`, error);

        return null;
    }

    if (envFile?.length) envArray = envFile?.split('\n').filter((line) => line?.trim()?.[0] !== '#' && line?.trim() !== '');

    for (const line of envArray) {
        const [key, value] = line.split('=');

        if (key && value) env[key.trim()] = value.trim();
    }

    return Object.keys(env)?.length ? env : null;
};

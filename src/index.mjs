import Pool from 'pg-pool';
import camelcaseKeys from 'camelcase-keys';

import { getEnv } from "./helper.mjs";

// Make global env
if (!global.env?.DB_NAME) global.env = getEnv();

const env = global.env;

const config = {
    user: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    timezone: env.TIMEZONE,
    max: 600,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
};

const pool = new Pool(config);

/**
 * Execute SQL raw query for PostgreSQL with bindings
 *
 * Example:
 *   const user = await DB.query('SELECT u.name, u.email FROM public.users u WHERE u.id = :id', { bindings: { id: 15 } });
 *
 * @param sql {string} SQL raw string
 * @param options {object: { bindings }} SQL options with bindings in format {key: value}
 * @returns {Promise<any[]>} The query result as an array of objects in camel case
 */
const query = async (sql, options = {}) => {
    const { bindings = {} } = options;
    const bindingsArray = [];
    let query = sql;
    let bindIndex = 1;

    if (Object.keys(bindings).length) {
        for (const [key, value] of Object.entries(bindings)) {
            const regex = new RegExp(`(?<!:):${key}(?=\\b)`, 'g');
            query = query.replace(regex, `$${bindIndex}`);
            bindIndex += 1;
            bindingsArray.push(value);
        }
    }

    try {
        const result = await pool.query(query, bindingsArray);

        return result?.rows?.length ? camelcaseKeys(result.rows, { deep: true }) : [];
    } catch (error) {
        console.error('Database query error: ', error);
        throw new Error(error.message);
    }
};

/**
 * DB service for SQL raw postgres query
 */
const DB = {
    query
};

export default DB;

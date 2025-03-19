import { Pool, QueryResult } from 'pg';
import 'dotenv/config';

// NOTE: issues making queries to DB when using env variable
const PG_URI = process.env.DATABASE_URI;

const pool = new Pool({
    connectionString: PG_URI,
});

const query = (text: string, params: any[]) => {
    console.log("Executed query", text);
    return pool.query(text, params);
}

export default { pool, query };
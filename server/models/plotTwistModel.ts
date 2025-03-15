const { Pool } = require("pg");

const PG_URI = process.env.DATABASE_URI

const pool = new Pool({
    connectionString: PG_URI,
});

module.exports = {
    query: (text: string, params: any, callback: Function) => {
        console.log("Executed query", text);
        return pool.query(text, params, callback);
    }
};
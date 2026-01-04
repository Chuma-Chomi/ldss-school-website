const { Client } = require('pg');
const fs = require('fs');

async function runSchema() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'admin123',
        port: 5432,
        database: 'ldss_db',
    });

    try {
        const sql = fs.readFileSync('schema.sql', 'utf8');
        await client.connect();
        console.log('Connected to ldss_db');

        // Execute the whole block as one query
        await client.query(sql);
        console.log('Schema executed successfully');
    } catch (err) {
        console.error('Error executing schema:', err);
    } finally {
        await client.end();
    }
}

runSchema();

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

        // Split by semicolon and run each command
        // Note: This is a simple split, doesn't handle semicolons inside quotes
        const commands = sql.split(';').filter(cmd => cmd.trim().length > 0);
        for (const cmd of commands) {
            await client.query(cmd);
        }
        console.log('Schema executed successfully');
    } catch (err) {
        console.error('Error executing schema:', err);
    } finally {
        await client.end();
    }
}

runSchema();

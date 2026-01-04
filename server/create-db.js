const { Client } = require('pg');

async function createDatabase() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'admin123',
        port: 5432,
        database: 'postgres', // Connect to default DB first
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        const res = await client.query("SELECT 1 FROM pg_database WHERE datname='ldss_db'");
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE ldss_db');
            console.log('Database ldss_db created successfully');
        } else {
            console.log('Database ldss_db already exists');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDatabase();

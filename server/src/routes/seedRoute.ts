import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const router = express.Router();
const prisma = new PrismaClient();

router.get('/debug-db', (req, res) => {
    const url = process.env.DATABASE_URL || 'NOT_SET';
    const safeUrl = url.replace(/:([^:@]+)@/, ':****@');
    res.json({
        message: 'Debug Info',
        url: safeUrl,
        env_node_env: process.env.NODE_ENV
    });
});

router.get('/run-seed', async (req, res) => {
    try {
        console.log('🔄 Running Database Push (Migration)...');
        // This runs the CLI command using the server's environment variables
        // which we confirmed are correct (Pooler port 6543)
        const { stdout, stderr } = await execPromise('npx prisma db push --accept-data-loss');
        console.log('Push Output:', stdout);
        if (stderr) console.error('Push Error:', stderr);

        console.log('🌱 Seeding database via API...');

        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Admin
        await prisma.user.upsert({
            where: { email: 'admin@ldss.edu.zm' },
            update: {},
            create: {
                email: 'admin@ldss.edu.zm',
                password: hashedPassword,
                name: 'John Mwale',
                role: 'ADMIN'
            }
        });

        // Create Staff
        await prisma.user.upsert({
            where: { email: 'teacher@ldss.edu.zm' },
            update: {},
            create: {
                email: 'teacher@ldss.edu.zm',
                password: hashedPassword,
                name: 'Mary Banda',
                role: 'STAFF'
            }
        });

        // Create Learner
        await prisma.user.upsert({
            where: { email: 'student@ldss.edu.zm' },
            update: {},
            create: {
                email: 'student@ldss.edu.zm',
                password: hashedPassword,
                name: 'David Phiri',
                role: 'LEARNER'
            }
        });

        res.json({ message: 'Seeding completed successfully! Tables created and Users inserted.' });
    } catch (error: any) {
        console.error('❌ Seeding/Migration failed:', error);
        res.status(500).json({ error: error.message, details: error.toString() });
    }
});

export default router;

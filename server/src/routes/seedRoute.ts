import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient(); // Render will use its own env vars

router.get('/run-seed', async (req, res) => {
    try {
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

        res.json({ message: 'Seeding completed successfully!' });
    } catch (error: any) {
        console.error('❌ Seeding failed:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;

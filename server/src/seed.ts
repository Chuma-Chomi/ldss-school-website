import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log('🌱 Seeding database with test users...\n');

    // Hash password for all test users
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@ldss.edu.zm' },
        update: {},
        create: {
            email: 'admin@ldss.edu.zm',
            password: hashedPassword,
            name: 'John Mwale',
            role: 'ADMIN'
        }
    });
    console.log('✅ Admin User Created:', admin.email);

    // Create Staff User
    const staff = await prisma.user.upsert({
        where: { email: 'teacher@ldss.edu.zm' },
        update: {},
        create: {
            email: 'teacher@ldss.edu.zm',
            password: hashedPassword,
            name: 'Mary Banda',
            role: 'STAFF'
        }
    });
    console.log('✅ Staff User Created:', staff.email);

    // Create Learner User
    const learner = await prisma.user.upsert({
        where: { email: 'student@ldss.edu.zm' },
        update: {},
        create: {
            email: 'student@ldss.edu.zm',
            password: hashedPassword,
            name: 'David Phiri',
            role: 'LEARNER'
        }
    });
    console.log('✅ Learner User Created:', learner.email);

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('\nStaff:');
    console.log('  Email: teacher@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('\nLearner:');
    console.log('  Email: student@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

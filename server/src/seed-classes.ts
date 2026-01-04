import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const classes = [
    { name: 'Grade 8A' }, { name: 'Grade 8B' }, { name: 'Grade 8C' },
    { name: 'Grade 9A' }, { name: 'Grade 9B' }, { name: 'Grade 9C' },
    { name: 'Grade 10A' }, { name: 'Grade 10B' }, { name: 'Grade 10C' },
    { name: 'Grade 11A' }, { name: 'Grade 11B' }, { name: 'Grade 11C' },
    { name: 'Grade 12A' }, { name: 'Grade 12B' }, { name: 'Grade 12C' },
];

async function main() {
    console.log('🌱 Seeding classes...');

    for (const cls of classes) {
        await prisma.class.upsert({
            where: { name: cls.name },
            update: {},
            create: { name: cls.name }
        });
    }

    console.log(`✅ Created ${classes.length} classes`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding classes:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

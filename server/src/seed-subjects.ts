import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const subjects = [
    { name: 'Mathematics', code: 'MATH' },
    { name: 'English Language', code: 'ENG' },
    { name: 'Integrated Science', code: 'SCI' },
    { name: 'Social Studies', code: 'SS' },
    { name: 'Business Studies', code: 'BST' },
    { name: 'Computer Studies', code: 'CTS' },
    { name: 'Religious Education', code: 'RE' },
    { name: 'Geography', code: 'GEO' },
    { name: 'History', code: 'HIST' },
    { name: 'Agricultural Science', code: 'AGRI' },
];

async function main() {
    console.log('🌱 Seeding subjects...');

    for (const sub of subjects) {
        await prisma.subject.upsert({
            where: { code: sub.code },
            update: {},
            create: { name: sub.name, code: sub.code }
        });
    }

    console.log(`✅ Created ${subjects.length} subjects`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding subjects:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

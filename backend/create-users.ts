import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function createUsers() {
  try {
    console.log('🔧 Creating all users from scratch...');
    
    // Clear existing data
    await prisma.announcement.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.class.deleteMany();
    await prisma.student.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ Cleared existing data');
    
    // 1. Create Admin user
    const adminPassword = await bcrypt.hash('LDSSadmin123', 10);
    const adminUser = await prisma.user.create({
      data: {
        id: '202501',
        email: 'admin@ldss.edu.zm',
        password: adminPassword,
        role: 'ADMIN',
        profile: {
          create: {
            firstName: 'Muma',
            lastName: 'Abraham',
            phone: '+260123456789',
            type: 'STAFF',
            staff: {
              create: {
                tsNumber: '202501',
                position: 'ADMIN'
              },
            },
          },
        },
      },
      include: { profile: { include: { staff: true } } },
    });
    console.log('✅ Created Admin:', adminUser.id);

    // 2. Create Staff user
    const staffPassword = await bcrypt.hash('LDSSstaff123', 10);
    const staffUser = await prisma.user.create({
      data: {
        id: '2025001',
        email: 'staff@ldss.edu.zm',
        password: staffPassword,
        role: 'TEACHER',
        profile: {
          create: {
            firstName: 'Kataka',
            lastName: 'Gift',
            phone: '+260987654321',
            type: 'STAFF',
            staff: {
              create: {
                tsNumber: '2025001',
                position: 'TEACHER',
                subjects: ['Mathematics', 'English']
              },
            },
          },
        },
      },
      include: { profile: { include: { staff: true } } },
    });
    console.log('✅ Created Staff:', staffUser.id);

    // 3. Create Student user
    const studentUser = await prisma.user.create({
      data: {
        id: '202500123456',
        email: 'learner@ldss.edu.zm',
        password: 'LDSS2025', // Plain text for student
        role: 'STUDENT',
        profile: {
          create: {
            firstName: 'John',
            lastName: 'Banda',
            phone: '+260555555555',
            type: 'STUDENT',
            student: {
              create: {
                learnerId: '202500123456',
                grade: 'FORM2',
                section: 'A',
                guardians: [{ name: 'Mr. Banda', phone: '+260955123456' }]
              },
            },
          },
        },
      },
      include: { profile: { include: { student: true } } },
    });
    console.log('✅ Created Student:', studentUser.id);

    // 4. Create sample class
    const sampleClass = await prisma.class.create({
      data: {
        name: 'Form 2A Mathematics',
        grade: 'FORM2',
        section: 'A',
        capacity: 40,
        instructorId: staffUser.profile?.staff?.id,
      },
      include: { instructor: { include: { profile: true } } },
    });
    console.log('✅ Created Class:', sampleClass.name);

    // 5. Enroll student in class
    await prisma.enrollment.create({
      data: {
        studentId: studentUser.profile?.student?.id!,
        classId: sampleClass.id,
      },
    });
    console.log('✅ Enrolled student in class');

    // 6. Create announcement
    await prisma.announcement.create({
      data: {
        title: 'Welcome to LDSS Portal',
        body: 'The unified school management system is now live. Please log in with your credentials.',
        audience: 'ALL',
        published: true,
        staffId: adminUser.profile?.staff?.id!,
      },
    });
    console.log('✅ Created welcome announcement');

    // 7. Verify all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, role: true, profile: { select: { firstName: true, lastName: true } } }
    });
    
    console.log('\n🎉 All users created successfully!');
    console.log('📊 User Summary:');
    console.table(allUsers);
    
    console.log('\n🔑 Login Credentials:');
    console.log('👨‍💼 Admin: 202501 / LDSSadmin123');
    console.log('👩‍🏫 Staff: 2025001 / LDSSstaff123');  
    console.log('👨‍🎓 Student: 202500123456 / LDSS2025');
    
  } catch (error: any) {
    console.error('❌ Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();

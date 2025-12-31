import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function createSimpleUsers() {
  try {
    console.log('🔧 Creating users without profiles first...');
    
    // Clear existing users only
    await prisma.user.deleteMany();
    console.log('✅ Cleared existing users');
    
    // 1. Create Admin user
    const adminPassword = await bcrypt.hash('LDSSadmin123', 10);
    const adminUser = await prisma.user.create({
      data: {
        id: '202501',
        email: 'admin@ldss.edu.zm',
        password: adminPassword,
        role: 'ADMIN',
      },
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
      },
    });
    console.log('✅ Created Staff:', staffUser.id);

    // 3. Create Student user
    const studentUser = await prisma.user.create({
      data: {
        id: '202500123456',
        email: 'learner@ldss.edu.zm',
        password: 'LDSS2025', // Plain text for student
        role: 'STUDENT',
      },
    });
    console.log('✅ Created Student:', studentUser.id);

    // 4. Verify all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, role: true, email: true }
    });
    
    console.log('\n🎉 All users created successfully!');
    console.log('📊 User Summary:');
    console.table(allUsers);
    
    console.log('\n🔑 Login Credentials:');
    console.log('👨‍💼 Admin: 202501 / LDSSadmin123');
    console.log('👩‍🏫 Staff: 2025001 / LDSSstaff123');  
    console.log('👨‍🎓 Student: 202500123456 / LDSS2025');
    
    // 5. Test login for admin
    console.log('\n🧪 Testing admin login...');
    const isValidPassword = await bcrypt.compare('LDSSadmin123', adminUser.password);
    console.log('Admin password test:', isValidPassword ? '✅ PASS' : '❌ FAIL');
    
  } catch (error: any) {
    console.error('❌ Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSimpleUsers();

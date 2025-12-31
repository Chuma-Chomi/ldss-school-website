import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function addUsers() {
  try {
    console.log('🔧 Adding users to database...');
    
    // 1. Create Admin user (if not exists)
    const adminPassword = await bcrypt.hash('LDSSadmin123', 10);
    const adminUser = await prisma.user.upsert({
      where: { id: '202501' },
      update: { password: adminPassword },
      create: {
        id: '202501',
        email: 'admin@ldss.edu.zm',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin ready:', adminUser.id);

    // 2. Create Staff user (if not exists)
    const staffPassword = await bcrypt.hash('LDSSstaff123', 10);
    const staffUser = await prisma.user.upsert({
      where: { id: '2025001' },
      update: { password: staffPassword },
      create: {
        id: '2025001',
        email: 'staff@ldss.edu.zm',
        password: staffPassword,
        role: 'TEACHER',
      },
    });
    console.log('✅ Staff ready:', staffUser.id);

    // 3. Create Student user (if not exists)
    const studentUser = await prisma.user.upsert({
      where: { id: '202500123456' },
      update: { password: 'LDSS2025' },
      create: {
        id: '202500123456',
        email: 'learner@ldss.edu.zm',
        password: 'LDSS2025',
        role: 'STUDENT',
      },
    });
    console.log('✅ Student ready:', studentUser.id);

    // 4. Verify all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, role: true, email: true }
    });
    
    console.log('\n🎉 All users ready!');
    console.log('📊 Users in database:');
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
    console.error('❌ Error adding users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUsers();

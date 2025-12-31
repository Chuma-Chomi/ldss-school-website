import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { Role, StaffRole, GradeLevel, Audience, ProfileType } from '@prisma/client';

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    console.log('Starting database seeding...');

    await prisma.announcement.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.class.deleteMany();
    await prisma.student.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin user
    const adminPassword = await bcrypt.hash('LDSSadmin123', 10);
    const adminUser = await prisma.user.create({
      data: {
        id: '202501',
        email: 'admin@ldss.edu.zm',
        password: adminPassword,
        role: Role.ADMIN,
        profile: {
          create: {
            firstName: 'Muma',
            lastName: 'Abraham',
            phone: '+260123456789',
            type: ProfileType.STAFF,
            staff: {
              create: {
                tsNumber: '202501',
                position: StaffRole.ADMIN
              },
            },
          },
        },
      },
      include: { profile: { include: { staff: true } } },
    });

    // Create Staff user
    const staffPassword = await bcrypt.hash('LDSSstaff123', 10);
    const staffUser = await prisma.user.create({
      data: {
        id: '2025001',
        email: 'staff@ldss.edu.zm',
        password: staffPassword,
        role: Role.TEACHER,
        profile: {
          create: {
            firstName: 'Mukisi',
            lastName: 'Desmond',
            phone: '+260987654321',
            type: ProfileType.STAFF,
            staff: {
              create: {
                tsNumber: '2025001',
                position: StaffRole.DEPUTY,
                subjects: ['Mathematics', 'English']
              },
            },
          },
        },
      },
      include: { profile: { include: { staff: true } } },
    });

    // Create Learner user
    const learnerPassword = await bcrypt.hash('LDSS2025', 10);
    const learnerUser = await prisma.user.create({
      data: {
        id: '202500123456',
        email: 'learner@ldss.edu.zm',
        password: learnerPassword,
        role: Role.STUDENT,
        profile: {
          create: {
            firstName: 'John',
            lastName: 'Banda',
            phone: '+260555555555',
            type: ProfileType.STUDENT,
            student: {
              create: {
                learnerId: '202500123456',
                grade: GradeLevel.FORM2,
                section: 'A',
                guardians: [{ name: 'Mr. Banda', phone: '+260955123456' }]
              },
            },
          },
        },
      },
      include: { profile: { include: { student: true } } },
    });

    // Create sample class
    const sampleClass = await prisma.class.create({
      data: {
        name: 'Form 2A Mathematics',
        grade: GradeLevel.FORM2,
        section: 'A',
        capacity: 40,
        instructorId: staffUser.profile?.staff?.id,
      },
      include: { instructor: { include: { profile: true } } },
    });

    // Enroll student in class
    await prisma.enrollment.create({
      data: {
        studentId: learnerUser.profile?.student?.id!,
        classId: sampleClass.id,
      },
    });

    // Create announcement
    await prisma.announcement.create({
      data: {
        title: 'Welcome to LDSS Portal',
        body: 'The unified school management system is now live. Please log in with your credentials.',
        audience: Audience.ALL,
        published: true,
        staffId: adminUser.profile?.staff?.id!,
      },
    });

    console.log('Database seeded successfully!');
    
    res.json({
      success: true,
      message: 'Database seeded successfully',
      users: {
        admin: { id: '202501', password: 'LDSSadmin123' },
        staff: { id: '2025001', password: 'LDSSstaff123' },
        student: { id: '202500123456', password: 'LDSS2025' }
      }
    });

  } catch (error: any) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: 'Seeding failed',
      error: error.message
    });
  }
};

export const seedStatus = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        role: true,
        email: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            type: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    console.error('Seed status error:', error);
    res.status(500).json({
      success: false,
      message: 'Seed status failed',
      error: error.message,
    });
  }
};

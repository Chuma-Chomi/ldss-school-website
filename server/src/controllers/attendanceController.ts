import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Get students with their attendance status for a specific date
export const getClassAttendance = async (req: AuthRequest, res: Response) => {
    const { classId } = req.params;
    const { date } = req.query; // Expects ISO date string YYYY-MM-DD

    if (!date) {
        return res.status(400).json({ message: 'Date is required' });
    }

    try {
        const targetDate = new Date(date as string);

        // Fetch all students in the class
        const students = await prisma.studentProfile.findMany({
            where: { classId },
            include: {
                user: {
                    select: { name: true, email: true }
                },
                // Fetch attendance ONLY for this specific date
                attendance: {
                    where: {
                        date: targetDate
                    }
                }
            },
            orderBy: { admissionNo: 'asc' }
        });

        res.json(students);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Submit attendance
export const submitAttendance = async (req: AuthRequest, res: Response) => {
    const { classId, date, records } = req.body;
    // records: [{ studentId: "...", status: "PRESENT" }, ...]

    try {
        const targetDate = new Date(date);

        // Process each record
        for (const record of records) {
            await prisma.attendance.upsert({
                where: {
                    studentId_date: {
                        studentId: record.studentId,
                        date: targetDate
                    }
                },
                update: { status: record.status },
                create: {
                    studentId: record.studentId,
                    date: targetDate,
                    status: record.status
                }
            });
        }

        res.json({ message: 'Attendance submitted successfully' });
    } catch (error: any) {
        console.error('Attendance error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get learner's own attendance stats
export const getMyAttendance = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const student = await prisma.studentProfile.findUnique({
            where: { userId },
            include: {
                attendance: {
                    orderBy: { date: 'desc' },
                    take: 50 // Last 50 records
                }
            }
        });

        if (!student) return res.status(404).json({ message: 'Student profile not found' });

        // Calculate stats
        const total = await prisma.attendance.count({
            where: { studentId: student.id }
        });
        const present = await prisma.attendance.count({
            where: { studentId: student.id, status: 'PRESENT' }
        });

        const rate = total > 0 ? Math.round((present / total) * 100) : 100;

        res.json({
            records: student.attendance,
            stats: { total, present, rate }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

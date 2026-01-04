import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Get all subjects
export const getAllSubjects = async (req: AuthRequest, res: Response) => {
    try {
        // Fetch all subjects
        const subjects = await prisma.subject.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(subjects);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get students by class ID (for grading view)
export const getStudentsByClass = async (req: AuthRequest, res: Response) => {
    const { classId } = req.params;
    try {
        const students = await prisma.studentProfile.findMany({
            where: { classId },
            include: {
                user: {
                    select: { name: true, email: true }
                },
                grades: true // Include existing grades
            },
            orderBy: { admissionNo: 'asc' }
        });
        res.json(students);
    } catch (error: any) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: error.message });
    }
};

// Submit grades (bulk)
export const submitGrades = async (req: AuthRequest, res: Response) => {
    const { grades, subjectId, term, year } = req.body;
    // Expects grades: [{ studentId: "...", score: 85 }, ...]

    try {
        // Process each grade
        for (const g of grades) {
            // Upsert ensures we update if exists, or create new
            await prisma.grade.upsert({
                where: {
                    studentId_subjectId_term_year: {
                        studentId: g.studentId,
                        subjectId,
                        term,
                        year: parseInt(year)
                    }
                },
                update: { score: parseFloat(g.score) },
                create: {
                    studentId: g.studentId,
                    subjectId,
                    score: parseFloat(g.score),
                    term,
                    year: parseInt(year)
                }
            });
        }

        res.json({ message: 'Grades submitted successfully' });
    } catch (error: any) {
        console.error('Error submitting grades:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get grades for the logged-in learner
export const getStudentGrades = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find linked student profile
        const student = await prisma.studentProfile.findUnique({
            where: { userId },
            include: {
                class: true,
                grades: {
                    include: {
                        subject: true
                    },
                    orderBy: {
                        subject: { name: 'asc' }
                    }
                }
            }
        });

        if (!student) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.json(student);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

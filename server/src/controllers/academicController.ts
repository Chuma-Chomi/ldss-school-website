import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Get all subjects
export const getAllSubjects = async (req: AuthRequest, res: Response) => {
    try {
        const subjects = await prisma.subject.findMany({
            include: {
                teachers: {
                    include: {
                        user: { select: { name: true } }
                    }
                }
            },
            orderBy: { name: 'asc' }
        });
        res.json(subjects);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Create Subject
export const createSubject = async (req: AuthRequest, res: Response) => {
    const { name, code } = req.body;
    try {
        const subject = await prisma.subject.create({
            data: { name, code }
        });
        res.status(201).json(subject);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Subject
export const deleteSubject = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.subject.delete({ where: { id } });
        res.json({ message: 'Subject deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Assign/Remove Teachers from Subject
export const assignSubjectTeachers = async (req: AuthRequest, res: Response) => {
    const { id } = req.params; // Subject ID
    const { teacherIds } = req.body; // Array of StaffProfile IDs

    try {
        // First disconnect all existing, then connect new selection (simplest way to sync)
        // Or better: update with set
        const subject = await prisma.subject.update({
            where: { id },
            data: {
                teachers: {
                    set: teacherIds.map((tid: string) => ({ id: tid }))
                }
            },
            include: {
                teachers: {
                    include: { user: { select: { name: true } } }
                }
            }
        });
        res.json(subject);
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
    // Expects grades: [{ studentId: "...", test1: 20, test2: 20, exam: 60 }, ...]

    try {
        // Process each grade
        for (const g of grades) {
            const test1 = g.test1 ? parseFloat(g.test1) : 0;
            const test2 = g.test2 ? parseFloat(g.test2) : 0;
            const exam = g.exam ? parseFloat(g.exam) : 0;
            const total = test1 + test2 + exam;

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
                update: {
                    test1,
                    test2,
                    exam,
                    total
                },
                create: {
                    studentId: g.studentId,
                    subjectId,
                    test1,
                    test2,
                    exam,
                    total,
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

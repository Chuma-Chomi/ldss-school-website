import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAllStudents = async (req: AuthRequest, res: Response) => {
    try {
        const students = await prisma.studentProfile.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                class: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.json(students);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getStudentById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        const student = await prisma.studentProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                class: true,
                grades: true,
            },
        });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Create a student profile for an existing user
export const createStudentProfile = async (req: AuthRequest, res: Response) => {
    const { userId, admissionNo, classId } = req.body;

    try {
        // Check if user exists and is a learner
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.role !== 'LEARNER') {
            return res.status(400).json({ message: 'Invalid user ID or user is not a learner' });
        }

        const student = await prisma.studentProfile.create({
            data: {
                userId,
                admissionNo,
                classId,
            },
            include: {
                user: true,
                class: true,
            },
        });
        res.status(201).json(student);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Create a new assignment
export const createAssignment = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, subjectId, classId, deadline } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                subjectId,
                classId,
                deadline: new Date(deadline),
                fileUrl
            }
        });

        res.status(201).json(assignment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get assignments
export const getAssignments = async (req: AuthRequest, res: Response) => {
    try {
        const { classId, subjectId } = req.query;

        // If learner, can only see their class (could enforce this, but relying on query param for now)
        const whereClause: any = {};
        if (classId) whereClause.classId = classId as string;
        if (subjectId) whereClause.subjectId = subjectId as string;

        const assignments = await prisma.assignment.findMany({
            where: whereClause,
            include: {
                subject: { select: { name: true } },
                class: { select: { name: true } }
            },
            orderBy: { deadline: 'asc' }
        });

        res.json(assignments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Submit an assignment
export const submitAssignment = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Submission file is required' });
        }

        const { assignmentId } = req.body;
        const studentId = req.user?.studentProfile?.id; // Assuming middleware attaches studentProfile or I fetch it

        // We need to fetch studentId if it's not in req.user (middleware usually just has role/id)
        if (!studentId) {
            const student = await prisma.studentProfile.findUnique({ where: { userId: req.user!.id } });
            if (!student) return res.status(404).json({ message: 'Student profile not found' });

            await prisma.assignmentSubmission.upsert({
                where: {
                    assignmentId_studentId: {
                        assignmentId,
                        studentId: student.id
                    }
                },
                update: {
                    fileUrl: `/uploads/${req.file.filename}`,
                    submittedAt: new Date(),
                    status: 'SUBMITTED'
                },
                create: {
                    assignmentId,
                    studentId: student.id,
                    fileUrl: `/uploads/${req.file.filename}`,
                    status: 'SUBMITTED'
                }
            });
            return res.json({ message: 'Assignment submitted' });
        }

        // If we had studentId in context (we likely don't, so the above block runs)
        res.status(500).json({ error: 'Unexpected auth state' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get submissions for an assignment (Teacher view)
export const getSubmissions = async (req: AuthRequest, res: Response) => {
    try {
        const { assignmentId } = req.params;

        const submissions = await prisma.assignmentSubmission.findMany({
            where: { assignmentId },
            include: {
                student: {
                    include: {
                        user: { select: { name: true } }
                    }
                }
            }
        });

        res.json(submissions);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Grade a submission
export const gradeSubmission = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params; // Submission ID
        const { grade, feedback } = req.body;

        const submission = await prisma.assignmentSubmission.update({
            where: { id },
            data: {
                grade: parseFloat(grade),
                feedback,
                status: 'GRADED'
            }
        });

        res.json(submission);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

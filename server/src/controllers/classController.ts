import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAllClasses = async (req: AuthRequest, res: Response) => {
    try {
        const classes = await prisma.class.findMany({
            include: {
                classTeacher: {
                    include: {
                        user: { select: { name: true } }
                    }
                }
            },
            orderBy: { name: 'asc' }
        });
        res.json(classes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createClass = async (req: AuthRequest, res: Response) => {
    const { name } = req.body;
    try {
        const newClass = await prisma.class.create({
            data: { name }
        });
        res.status(201).json(newClass);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateClass = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, classTeacherId } = req.body;
    try {
        const updatedClass = await prisma.class.update({
            where: { id },
            data: {
                name,
                classTeacherId: classTeacherId || null
            }
        });
        res.json(updatedClass);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.class.delete({ where: { id } });
        res.json({ message: 'Class deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

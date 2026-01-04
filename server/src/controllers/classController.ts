import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAllClasses = async (req: AuthRequest, res: Response) => {
    try {
        const classes = await prisma.class.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(classes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

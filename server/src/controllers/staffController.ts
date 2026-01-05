import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAllStaff = async (req: AuthRequest, res: Response) => {
    try {
        const staff = await prisma.staffProfile.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
            orderBy: {
                user: { name: 'asc' }
            }
        });
        res.json(staff);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

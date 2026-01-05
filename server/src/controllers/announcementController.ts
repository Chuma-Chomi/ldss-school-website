import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAnnouncements = async (req: AuthRequest, res: Response) => {
    const userRole = req.user?.role;

    try {
        const announcements = await prisma.announcement.findMany({
            where: {
                OR: [
                    { target: 'ALL' },
                    { target: userRole }
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        res.json(announcements);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createAnnouncement = async (req: AuthRequest, res: Response) => {
    const { title, content, category, target } = req.body;
    const authorId = req.user?.id;

    if (!authorId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const announcement = await prisma.announcement.create({
            data: {
                title,
                content,
                category,
                target,
                authorId
            }
        });
        res.status(201).json(announcement);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.announcement.delete({ where: { id } });
        res.json({ message: 'Announcement deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

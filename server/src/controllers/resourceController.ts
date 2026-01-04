import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const uploadResource = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description, subjectId, classId } = req.body;
        const fileUrl = `/uploads/${req.file.filename}`;
        const fileType = req.file.mimetype.split('/')[1].toUpperCase();

        const resource = await prisma.resource.create({
            data: {
                title,
                description,
                fileUrl,
                fileType,
                subjectId,
                classId: classId || null,
                uploadedBy: req.user!.id
            }
        });

        res.status(201).json(resource);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getResources = async (req: AuthRequest, res: Response) => {
    try {
        const { subjectId, classId } = req.query;

        const resources = await prisma.resource.findMany({
            where: {
                // If subjectId provided, filter by it
                ...(subjectId ? { subjectId: subjectId as string } : {}),
                // If classId provided, filter by it OR items with no class (global)
                ...(classId ? {
                    OR: [
                        { classId: classId as string },
                        { classId: null }
                    ]
                } : {})
            },
            include: {
                subject: { select: { name: true } },
                class: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(resources);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getEvents = async (req: AuthRequest, res: Response) => {
    try {
        // Fetch all events sorted by start date
        // Ideally filter by query params ?start=...&end=...
        const events = await prisma.event.findMany({
            orderBy: { startDate: 'asc' }
        });
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
    const { title, description, startDate, endDate, type } = req.body;
    const authorId = req.user?.id;

    if (!authorId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const event = await prisma.event.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                authorId
            }
        });
        res.status(201).json(event);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.event.delete({ where: { id } });
        res.json({ message: 'Event deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

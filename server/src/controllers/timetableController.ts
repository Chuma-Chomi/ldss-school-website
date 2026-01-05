import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Get Timetable for a Class
export const getClassTimetable = async (req: AuthRequest, res: Response) => {
    const { classId } = req.params;
    try {
        const periods = await prisma.timetablePeriod.findMany({
            where: { classId },
            include: {
                subject: { select: { name: true, code: true } },
                teacher: {
                    include: { user: { select: { name: true } } }
                }
            },
            orderBy: [{ day: 'asc' }, { startTime: 'asc' }] // Simplistic sorting, ideally custom sort for days
        });
        res.json(periods);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Update/Save Timetable Period
export const saveTimetablePeriod = async (req: AuthRequest, res: Response) => {
    const { classId, day, startTime, endTime, subjectId, teacherId } = req.body;

    try {
        // Check if collision exists for this class/time? 
        // For MVP, we'll assume the frontend grid manages slots or we replace overlaps.

        // We can find if a period exists at this exact slot (Day + StartTime + Class) and update it, 
        // or just create new.
        // Schema doesn't enforce unique constraint on day/time/class yet, but it should ideally.

        // Let's checks if one exists
        const existing = await prisma.timetablePeriod.findFirst({
            where: { classId, day, startTime }
        });

        if (existing) {
            const updated = await prisma.timetablePeriod.update({
                where: { id: existing.id },
                data: { subjectId, teacherId, endTime }
            });
            return res.json(updated);
        }

        const newPeriod = await prisma.timetablePeriod.create({
            data: { classId, day, startTime, endTime, subjectId, teacherId }
        });
        res.status(201).json(newPeriod);

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Period (Clear Slot)
export const deleteTimetablePeriod = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.timetablePeriod.delete({ where: { id } });
        res.json({ message: 'Period cleared' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

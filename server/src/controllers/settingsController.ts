import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getSettings = async (req: AuthRequest, res: Response) => {
    try {
        const settings = await prisma.systemSetting.findMany();
        // Convert to object
        const settingsObj = settings.reduce((acc: any, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(settingsObj);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSettings = async (req: AuthRequest, res: Response) => {
    const settings = req.body; // Expect { key: value, ... }
    try {
        const updates = Object.entries(settings).map(([key, value]) =>
            prisma.systemSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            })
        );
        await prisma.$transaction(updates);
        res.json({ message: 'Settings updated' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

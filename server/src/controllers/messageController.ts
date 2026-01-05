import type { Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Send a message
export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { receiverId, subject, content } = req.body;
        const senderId = req.user?.id;

        if (!senderId) return res.status(401).json({ message: 'Unauthorized' });

        const message = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                subject,
                content
            }
        });

        res.status(201).json(message);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get Inbox
export const getInbox = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const messages = await prisma.message.findMany({
            where: { receiverId: userId },
            include: {
                sender: { select: { name: true, email: true, role: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get Sent Items
export const getSent = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const messages = await prisma.message.findMany({
            where: { senderId: userId },
            include: {
                receiver: { select: { name: true, email: true, role: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Mark as Read
export const markRead = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Ensure user owns the message as receiver
        const message = await prisma.message.findFirst({
            where: { id, receiverId: userId }
        });

        if (!message) return res.status(404).json({ message: 'Message not found' });

        await prisma.message.update({
            where: { id },
            data: { isRead: true }
        });

        res.json({ message: 'Marked as read' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Search Recipients
export const searchRecipients = async (req: AuthRequest, res: Response) => {
    try {
        const { q } = req.query; // Search query
        const userRole = req.user?.role;

        // Logic: 
        // Learners can search Staff.
        // Staff/Admin can search Everyone.

        let roleFilter: any = {};
        if (userRole === 'LEARNER') {
            roleFilter = { role: { in: ['STAFF', 'ADMIN'] } };
        }

        const users = await prisma.user.findMany({
            where: {
                ...roleFilter,
                OR: [
                    { name: { contains: q as string, mode: 'insensitive' } },
                    { email: { contains: q as string, mode: 'insensitive' } }
                ]
            },
            take: 10,
            select: { id: true, name: true, email: true, role: true }
        });

        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

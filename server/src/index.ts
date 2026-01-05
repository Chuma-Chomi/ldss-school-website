import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import classRoutes from './routes/classRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import seedRoute from './routes/seedRoute.js';

dotenv.config();

const app = express();
// const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Serve Client Static Files (Production)
const clientPath = path.join(process.cwd(), '../client/dist');
app.use(express.static(clientPath));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api', seedRoute);

app.use('/api', seedRoute);

// Handle SPA Routing (Send index.html for non-API routes)
app.get('*', (req: Request, res: Response) => {
    // If requesting API that doesn't exist, return 404 JSON instead of HTML
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }

    // Check if client build exists
    if (!require('fs').existsSync(path.join(clientPath, 'index.html'))) {
        return res.send('API Running. Client build not found. Run "npm run build" in client/ directory.');
    }

    res.sendFile(path.join(clientPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

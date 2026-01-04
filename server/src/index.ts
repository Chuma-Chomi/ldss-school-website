import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import classRoutes from './routes/classRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import seedRoute from './routes/seedRoute.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api', seedRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('LDSS Backend API Running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

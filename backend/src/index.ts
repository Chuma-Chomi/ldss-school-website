import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import staffRoutes from './routes/staff';
import seedRoutes from './routes/seed';
import { errorHandler } from './utils/errors';

dotenv.config();

const app = express();
app.use(cors({
  origin: function(origin, callback) {
    console.log('CORS request from origin:', origin);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }
    
    // Allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'https://lukuludaysecondaryschool.netlify.app',
      'https://ldss-website.onrender.com'
    ];
    
    // Check if origin is in allowed list (always check, regardless of NODE_ENV)
    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      return callback(null, true);
    }
    
    // Also allow all localhost and netlify preview URLs
    if (origin.includes('localhost') || origin.includes('netlify.app')) {
      console.log('Localhost/Netlify origin allowed:', origin);
      return callback(null, true);
    }
    
    console.log('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'LDSS API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/seed', seedRoutes);
// Add other routes if needed
// app.use('/api/students', studentRoutes);
// app.use('/api/classes', classRoutes);
// app.use('/api/announcements', announcementRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/grades', gradeRoutes);
// app.use('/api/timetable', timetableRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`LDSS API listening on port ${port}`);
});

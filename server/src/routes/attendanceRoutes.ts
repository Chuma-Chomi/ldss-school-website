import express from 'express';
import { getClassAttendance, submitAttendance, getMyAttendance } from '../controllers/attendanceController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/class/:classId', authorizeRole(['ADMIN', 'STAFF']), getClassAttendance);
router.post('/submit', authorizeRole(['ADMIN', 'STAFF']), submitAttendance);
router.get('/my-stats', authorizeRole(['LEARNER']), getMyAttendance);

export default router;

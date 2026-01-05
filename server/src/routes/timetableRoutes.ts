import express from 'express';
import { getClassTimetable, saveTimetablePeriod, deleteTimetablePeriod } from '../controllers/timetableController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/class/:classId', getClassTimetable); // Accessible by Learners too (if they know classId, or filtered) - we'll restrict if needed
router.post('/', authorizeRole(['ADMIN', 'STAFF']), saveTimetablePeriod);
router.delete('/:id', authorizeRole(['ADMIN', 'STAFF']), deleteTimetablePeriod);

export default router;

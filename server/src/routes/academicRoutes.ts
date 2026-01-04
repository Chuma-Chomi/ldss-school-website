import express from 'express';
import { getAllSubjects, getStudentsByClass, submitGrades, getStudentGrades } from '../controllers/academicController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/my-results', authorizeRole(['LEARNER']), getStudentGrades);
router.get('/subjects', authorizeRole(['ADMIN', 'STAFF']), getAllSubjects);
router.get('/class/:classId/students', authorizeRole(['ADMIN', 'STAFF']), getStudentsByClass);
router.post('/grades', authorizeRole(['ADMIN', 'STAFF']), submitGrades);

export default router;

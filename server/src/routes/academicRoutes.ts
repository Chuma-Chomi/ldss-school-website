import express from 'express';
import { getAllSubjects, getStudentsByClass, submitGrades, getStudentGrades, createSubject, deleteSubject, assignSubjectTeachers } from '../controllers/academicController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/my-results', authorizeRole(['LEARNER']), getStudentGrades);
router.get('/subjects', authorizeRole(['ADMIN', 'STAFF']), getAllSubjects);
router.post('/subjects', authorizeRole(['ADMIN']), createSubject);
router.put('/subjects/:id/teachers', authorizeRole(['ADMIN']), assignSubjectTeachers);
router.delete('/subjects/:id', authorizeRole(['ADMIN']), deleteSubject);
router.get('/class/:classId/students', authorizeRole(['ADMIN', 'STAFF']), getStudentsByClass);
router.post('/grades', authorizeRole(['ADMIN', 'STAFF']), submitGrades);

export default router;

import express from 'express';
import { createAssignment, getAssignments, submitAssignment, getSubmissions, gradeSubmission } from '../controllers/assignmentController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

// Create assignment (Staff)
router.post('/', authorizeRole(['ADMIN', 'STAFF']), upload.single('file'), createAssignment);

// Get assignments (All)
router.get('/', getAssignments);

// Submit assignment (Learner)
router.post('/submit', authorizeRole(['LEARNER']), upload.single('file'), submitAssignment);

// Get submissions (Staff)
router.get('/:assignmentId/submissions', authorizeRole(['ADMIN', 'STAFF']), getSubmissions);

// Grade submission (Staff)
router.post('/submissions/:id/grade', authorizeRole(['ADMIN', 'STAFF']), gradeSubmission);

export default router;

import express from 'express';
import { getAllStudents, getStudentById, createStudentProfile } from '../controllers/studentController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

// Both Admin and Staff can view students
router.get('/', authorizeRole(['ADMIN', 'STAFF']), getAllStudents);
router.get('/:id', authorizeRole(['ADMIN', 'STAFF']), getStudentById);

// Only Admin (and maybe Staff?) can create profiles
router.post('/', authorizeRole(['ADMIN', 'STAFF']), createStudentProfile);

export default router;

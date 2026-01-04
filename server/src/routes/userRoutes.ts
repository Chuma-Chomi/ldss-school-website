import express from 'express';
import { getAllUsers, createUser, deleteUser, getUnenrolledLearners } from '../controllers/userController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticateJWT);

router.get('/unenrolled', authorizeRole(['ADMIN', 'STAFF']), getUnenrolledLearners);

// Only Admin can access these routes
router.get('/', authorizeRole(['ADMIN']), getAllUsers);
router.post('/', authorizeRole(['ADMIN']), createUser);
router.delete('/:id', authorizeRole(['ADMIN']), deleteUser);

export default router;

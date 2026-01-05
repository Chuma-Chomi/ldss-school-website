import express from 'express';
import { getAllClasses, createClass, deleteClass, updateClass } from '../controllers/classController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);
router.get('/', authorizeRole(['ADMIN', 'STAFF']), getAllClasses);
router.post('/', authorizeRole(['ADMIN']), createClass);
router.put('/:id', authorizeRole(['ADMIN']), updateClass);
router.delete('/:id', authorizeRole(['ADMIN']), deleteClass);

export default router;

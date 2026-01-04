import express from 'express';
import { getAllClasses } from '../controllers/classController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);
router.get('/', authorizeRole(['ADMIN', 'STAFF']), getAllClasses);

export default router;

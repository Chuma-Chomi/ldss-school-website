import express from 'express';
import { getAllStaff } from '../controllers/staffController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', authorizeRole(['ADMIN', 'STAFF']), getAllStaff);

export default router;

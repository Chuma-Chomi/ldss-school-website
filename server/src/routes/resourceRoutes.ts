import express from 'express';
import { uploadResource, getResources } from '../controllers/resourceController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

// Get resources (accessible by everyone authenticated)
router.get('/', getResources);

// Upload resource (Admin/Staff only)
router.post('/upload', authorizeRole(['ADMIN', 'STAFF']), upload.single('file'), uploadResource);

export default router;

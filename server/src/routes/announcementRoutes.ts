import express from 'express';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', getAnnouncements);
router.post('/', authorizeRole(['ADMIN', 'STAFF']), createAnnouncement);
router.delete('/:id', authorizeRole(['ADMIN']), deleteAnnouncement);

export default router;

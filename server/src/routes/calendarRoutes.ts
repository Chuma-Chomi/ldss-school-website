import express from 'express';
import { getEvents, createEvent, deleteEvent } from '../controllers/calendarController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', getEvents);
router.post('/', authorizeRole(['ADMIN', 'STAFF']), createEvent);
router.delete('/:id', authorizeRole(['ADMIN', 'STAFF']), deleteEvent);

export default router;

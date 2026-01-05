import express from 'express';
import { sendMessage, getInbox, getSent, markRead, searchRecipients } from '../controllers/messageController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/', sendMessage);
router.get('/inbox', getInbox);
router.get('/sent', getSent);
router.put('/:id/read', markRead);
router.get('/recipients', searchRecipients);

export default router;

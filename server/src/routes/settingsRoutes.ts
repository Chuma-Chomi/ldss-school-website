import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', getSettings); // Public to auth users? Or anyone? Auth is fine.
router.put('/', authorizeRole(['ADMIN']), updateSettings);

export default router;

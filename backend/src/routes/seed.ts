import { Router } from 'express';
import { seedDatabase, seedStatus } from '../controllers/seedController';
import { runMigrations } from '../controllers/migrationController';

const router = Router();

// POST /api/seed/migrate - Run database migrations
router.post('/migrate', runMigrations);

// GET /api/seed/status - Check if demo users exist
router.get('/status', seedStatus);

// POST /api/seed - Seed the database
router.post('/', seedDatabase);

export default router;

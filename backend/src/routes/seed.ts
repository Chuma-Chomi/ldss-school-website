import { Router } from 'express';
import { seedDatabase } from '../controllers/seedController';
import { runMigrations } from '../controllers/migrationController';

const router = Router();

// POST /api/seed/migrate - Run database migrations
router.post('/migrate', runMigrations);

// POST /api/seed - Seed the database
router.post('/', seedDatabase);

export default router;

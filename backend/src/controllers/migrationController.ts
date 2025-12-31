import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const runMigrations = async (req: Request, res: Response) => {
  try {
    console.log('Running database migrations...');
    
    // Run Prisma migrations
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    
    console.log('Migration output:', stdout);
    
    if (stderr) {
      console.log('Migration warnings:', stderr);
    }
    
    res.json({
      success: true,
      message: 'Database migrations completed successfully',
      output: stdout
    });
    
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      message: 'Migration failed',
      error: error.message
    });
  }
};

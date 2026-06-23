import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  let dbStatus = 'disconnected';
  if (dbState === 1) dbStatus = 'connected';
  if (dbState === 2) dbStatus = 'connecting';
  
  res.json({
    status: dbStatus === 'connected' ? 'online' : 'degraded',
    service: 'SiteBuilder Engine API',
    database: dbStatus,
    builderEngine: 'ready',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

export default router;

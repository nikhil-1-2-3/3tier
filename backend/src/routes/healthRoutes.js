import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    // Quick database ping
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      database: 'CONNECTED',
      service: 'Logicwind Portal API',
      version: '1.0.0',
    });
  } catch (error) {
    return res.status(503).json({
      status: 'DEGRADED',
      timestamp: new Date().toISOString(),
      database: 'DISCONNECTED',
      error: error.message,
    });
  }
});

export default router;

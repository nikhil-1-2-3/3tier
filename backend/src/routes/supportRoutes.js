import express from 'express';
import { submitSupportEnquiry } from '../controllers/supportController.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', submissionLimiter, submitSupportEnquiry);

export default router;

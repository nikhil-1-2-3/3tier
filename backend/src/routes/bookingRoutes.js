import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', submissionLimiter, optionalAuthenticate, createBooking);
router.get('/mine', authenticate, getMyBookings);
router.get('/:id', optionalAuthenticate, getBookingById);
router.patch('/:id/cancel', authenticate, cancelBooking);

export default router;

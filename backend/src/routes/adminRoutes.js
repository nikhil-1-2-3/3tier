import express from 'express';
import {
  getAdminStats,
  getAllBookings,
  updateBookingStatus,
  getAllEnquiries,
  updateEnquiryStatus,
  createService,
  updateService,
  getAllUsers,
} from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply auth and admin check to all admin routes
router.use(authenticate, requireAdmin);

router.get('/stats', getAdminStats);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);
router.get('/enquiries', getAllEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.get('/users', getAllUsers);

export default router;

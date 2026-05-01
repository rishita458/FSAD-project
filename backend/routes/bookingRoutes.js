import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingsForProfessional,
  getBookingById,
  updateBookingStatus,
  updatePaymentStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (all require authentication)
router.post('/', authenticate, createBooking);
router.get('/', authenticate, getMyBookings);
router.get('/professional', authenticate, getBookingsForProfessional);
router.get('/:id', authenticate, getBookingById);
router.put('/:id/status', authenticate, updateBookingStatus);
router.put('/:id/payment', authenticate, updatePaymentStatus);
router.put('/:id/cancel', authenticate, cancelBooking);

export default router;

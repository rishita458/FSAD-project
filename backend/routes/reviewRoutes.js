import express from 'express';
import {
  createReview,
  createProfessionalReview,
  getReviewsForProfessional,
  getMyReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/professional/:professionalId', getReviewsForProfessional);

// Protected routes
router.post('/', authenticate, createReview);
router.post('/professional', authenticate, createProfessionalReview);
router.get('/', authenticate, getMyReviews);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;

import express from 'express';
import {
  createProfessionalProfile,
  getProfessionalProfile_endpoint,
  getProfessionalById,
  updateProfessionalProfile,
  getAllProfessionals,
} from '../controllers/professionalController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProfessionals);
router.get('/profile/:id', getProfessionalById);

// Protected routes
router.post('/profile', authenticate, createProfessionalProfile);
router.get('/profile', authenticate, getProfessionalProfile_endpoint);
router.put('/profile', authenticate, updateProfessionalProfile);

export default router;

import express from 'express';
import {
  registerUser,
  loginUser,
  getUser_endpoint,
  updateUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authenticate, getUser_endpoint);
router.put('/profile', authenticate, updateUser);

export default router;
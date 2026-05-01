import express from 'express';
import {
  approveProfessional,
  rejectProfessional,
  getPendingProfessionals,
  getDashboardStats,
  getAdminLogs,
  suspendUser,
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin privileges
router.get('/dashboard/stats', authenticate, authorize('admin'), getDashboardStats);
router.get('/dashboard/logs', authenticate, authorize('admin'), getAdminLogs);
router.get('/professionals/pending', authenticate, authorize('admin'), getPendingProfessionals);
router.post('/professionals/approve', authenticate, authorize('admin'), approveProfessional);
router.post('/professionals/reject', authenticate, authorize('admin'), rejectProfessional);
router.post('/users/suspend', authenticate, authorize('admin'), suspendUser);

export default router;

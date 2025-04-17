import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin only routes
router.use(authorize('admin'));

export default router; 
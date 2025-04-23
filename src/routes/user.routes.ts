import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import { updateProfile } from '../controllers/user.controller';

const router = express.Router();

// All routes are protected
router.use(protect);

// Update user profile
router.put('/profile', updateProfile);

// Admin only routes
router.use(authorize('admin'));

export default router; 
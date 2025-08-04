import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getUserProfile, 
  updateEmail, 
  updateUsername, 
  updatePassword, 
  updateAvatar, 
  getDashboard 
} from '../controllers/User-controller.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user email
// @route   PUT /api/user/email
// @access  Private
router.put('/email', protect, updateEmail);

// @desc    Update username
// @route   PUT /api/user/username
// @access  Private
router.put('/username', protect, updateUsername);

// @desc    Update password
// @route   PUT /api/user/password
// @access  Private
router.put('/password', protect, updatePassword);

// @desc    Update user avatar
// @route   PUT /api/user/avatar
// @access  Private
router.put('/avatar', protect, updateAvatar);

// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private
router.get('/dashboard', protect, getDashboard);

export default router;

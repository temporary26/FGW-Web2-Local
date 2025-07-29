import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { sanitizeInput, validateEmail, validatePassword, validateUsername } from '../utils/validation.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update user email
// @route   PUT /api/user/email
// @access  Private
router.put('/email', protect, async (req, res) => {
  try {
    const { newEmail, currentPassword } = req.body;

    // Validate input
    if (!newEmail || !currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'New email and current password are required'
      });
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(newEmail.toLowerCase());
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // For GitHub users, don't require password verification
    if (!user.githubId) {
      // Verify current password
      const isPasswordCorrect = await user.matchPassword(currentPassword);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }

    // Check if email is already taken
    const existingUser = await User.findOne({ 
      email: sanitizedEmail,
      _id: { $ne: user._id }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    // Update email
    user.email = sanitizedEmail;
    user.isEmailVerified = false; // Reset email verification
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email updated successfully',
      data: {
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Update email error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update username
// @route   PUT /api/user/username
// @access  Private
router.put('/username', protect, async (req, res) => {
  try {
    const { newUsername, currentPassword } = req.body;

    // Validate input
    if (!newUsername || !currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'New username and current password are required'
      });
    }

    // Sanitize and validate username
    const sanitizedUsername = sanitizeInput(newUsername);
    if (!validateUsername(sanitizedUsername)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-30 characters long and contain only letters, numbers, and underscores'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // For GitHub users, don't require password verification
    if (!user.githubId) {
      // Verify current password
      const isPasswordCorrect = await user.matchPassword(currentPassword);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ 
      username: sanitizedUsername,
      _id: { $ne: user._id }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    // Update username
    user.username = sanitizedUsername;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Username updated successfully',
      data: {
        username: user.username
      }
    });
  } catch (error) {
    console.error('Update username error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update password
// @route   PUT /api/user/password
// @access  Private
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password, new password, and confirmation are required'
      });
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }

    // Validate new password
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // GitHub users cannot change password
    if (user.githubId) {
      return res.status(400).json({
        success: false,
        message: 'GitHub users cannot change password. Please manage your password through GitHub.'
      });
    }

    // Verify current password
    const isPasswordCorrect = await user.matchPassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Check if new password is different from current
    const isSamePassword = await user.matchPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }

    // Update password (will be hashed by the pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update user avatar
// @route   PUT /api/user/avatar
// @access  Private
router.put('/avatar', protect, async (req, res) => {
  try {
    const { avatar } = req.body;

    // Validate input
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    // Basic URL validation
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(avatar)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid avatar URL'
      });
    }

    // Get user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update avatar
    user.avatar = sanitizeInput(avatar);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Prepare dashboard data
    const dashboardData = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        isGithubUser: !!user.githubId,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      },
      stats: {
        accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)), // days
        lastLoginFormatted: user.lastLogin.toLocaleDateString()
      }
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;

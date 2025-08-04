import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { getCvData, saveOrUpdateCv, deleteCv } from '../controllers/CV-controller.js';

const router = express.Router();

// @desc    Get user's CV data
// @route   GET /api/cv
// @access  Private
router.get('/', protect, getCvData);

// @desc    Create or update user's CV data
// @route   POST /api/cv
// @access  Private
router.post('/', protect, [
  body('personalDetails.fullName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full name must be less than 100 characters'),
  body('personalDetails.phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be less than 20 characters'),
  body('personalDetails.email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('personalDetails.address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must be less than 200 characters'),
  body('about.profile')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Profile must be less than 1000 characters'),
  body('education')
    .optional()
    .isArray()
    .withMessage('Education must be an array'),
  body('workExperience')
    .optional()
    .isArray()
    .withMessage('Work experience must be an array'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('projects')
    .optional()
    .isArray()
    .withMessage('Projects must be an array')
], saveOrUpdateCv);

// @desc    Delete user's CV data
// @route   DELETE /api/cv
// @access  Private
router.delete('/', protect, deleteCv);

export default router;

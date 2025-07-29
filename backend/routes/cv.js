import express from 'express';
import { body, validationResult } from 'express-validator';
import CV from '../models/CV.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user's CV data
// @route   GET /api/cv
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cv = await CV.findOne({ user: req.user.id });
    
    // If no CV exists, create a default one
    if (!cv) {
      cv = await CV.create({
        user: req.user.id,
        personalDetails: {
          fullName: '',
          phone: '',
          email: '',
          address: ''
        },
        about: {
          profile: ''
        },
        education: [{
          institution: '',
          qualification: '',
          time: ''
        }],
        workExperience: [{
          company: '',
          position: '',
          time: ''
        }],
        skills: [],
        interests: [],
        projects: [{
          name: '',
          description: '',
          languages: ''
        }]
      });
    }

    res.status(200).json({
      success: true,
      data: cv
    });
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching CV data'
    });
  }
});

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
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      personalDetails,
      about,
      education,
      workExperience,
      skills,
      interests,
      projects
    } = req.body;

    // Find existing CV or create new one
    let cv = await CV.findOne({ user: req.user.id });

    if (cv) {
      // Update existing CV
      cv.personalDetails = personalDetails || cv.personalDetails;
      cv.about = about || cv.about;
      cv.education = education || cv.education;
      cv.workExperience = workExperience || cv.workExperience;
      cv.skills = skills || cv.skills;
      cv.interests = interests || cv.interests;
      cv.projects = projects || cv.projects;
      
      await cv.save();
    } else {
      // Create new CV
      cv = await CV.create({
        user: req.user.id,
        personalDetails: personalDetails || {
          fullName: '',
          phone: '',
          email: '',
          address: ''
        },
        about: about || {
          profile: ''
        },
        education: education || [{
          institution: '',
          qualification: '',
          time: ''
        }],
        workExperience: workExperience || [{
          company: '',
          position: '',
          time: ''
        }],
        skills: skills || [],
        interests: interests || [],
        projects: projects || [{
          name: '',
          description: '',
          languages: ''
        }]
      });
    }

    res.status(200).json({
      success: true,
      message: 'CV saved successfully',
      data: cv
    });
  } catch (error) {
    console.error('Save CV error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving CV data'
    });
  }
});

// @desc    Delete user's CV data
// @route   DELETE /api/cv
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const cv = await CV.findOne({ user: req.user.id });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV not found'
      });
    }

    await CV.findByIdAndDelete(cv._id);

    res.status(200).json({
      success: true,
      message: 'CV deleted successfully'
    });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting CV data'
    });
  }
});

export default router;

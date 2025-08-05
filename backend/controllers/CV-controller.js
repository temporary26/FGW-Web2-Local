import { validationResult } from 'express-validator';
import CV from '../models/CV.js';

// lấy dữ liệu cv của user
export const getCvData = async (req, res) => {
  try {
    // tìm cv theo user id
    let cv = await CV.findOne({ user: req.user.id });
    
    // nếu chưa có cv thì tạo cv mặc định với dữ liệu trống
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
};

// tạo mới hoặc cập nhật cv của user
export const saveOrUpdateCv = async (req, res) => {
  try {
    // kiểm tra validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // extract dữ liệu từ request body
    const {
      personalDetails,
      about,
      education,
      workExperience,
      skills,
      interests,
      projects
    } = req.body;

    // tìm cv hiện tại của user
    let cv = await CV.findOne({ user: req.user.id });

    if (cv) {
      // cập nhật cv hiện có - chỉ update field nào có dữ liệu
      cv.personalDetails = personalDetails || cv.personalDetails;
      cv.about = about || cv.about;
      cv.education = education || cv.education;
      cv.workExperience = workExperience || cv.workExperience;
      cv.skills = skills || cv.skills;
      cv.interests = interests || cv.interests;
      cv.projects = projects || cv.projects;
      
      await cv.save();
    } else {
      // tạo cv mới với dữ liệu được gửi lên
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
};

// xóa cv của user
export const deleteCv = async (req, res) => {
  try {
    // tìm cv của user hiện tại
    const cv = await CV.findOne({ user: req.user.id });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV not found'
      });
    }

    // xóa cv khỏi database
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
};

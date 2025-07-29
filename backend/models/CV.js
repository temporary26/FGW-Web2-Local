import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  }
});

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  }
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  languages: {
    type: String,
    required: true,
    trim: true
  }
});

const cvSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  personalDetails: {
    fullName: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    address: {
      type: String,
      trim: true,
      default: ''
    }
  },
  about: {
    profile: {
      type: String,
      trim: true,
      default: ''
    }
  },
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  projects: [projectSchema]
}, {
  timestamps: true
});

// Ensure default empty arrays and objects
cvSchema.pre('save', function(next) {
  if (!this.education || this.education.length === 0) {
    this.education = [{
      institution: '',
      qualification: '',
      time: ''
    }];
  }
  
  if (!this.workExperience || this.workExperience.length === 0) {
    this.workExperience = [{
      company: '',
      position: '',
      time: ''
    }];
  }
  
  if (!this.projects || this.projects.length === 0) {
    this.projects = [{
      name: '',
      description: '',
      languages: ''
    }];
  }
  
  next();
});

const CV = mongoose.model('CV', cvSchema);

export default CV;

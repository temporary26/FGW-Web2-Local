<template>
  <div class="cv-builder">
    <div class="cv-builder-header">
      <h1 class="cv-title">CV Builder</h1>
      <p class="cv-subtitle">Create your professional resume</p>
    </div>

    <div class="cv-builder-content">
      <!-- Personal Details Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">👤</span>
          Personal Details
        </h2>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input
              v-model="cvData.personalDetails.fullName"
              type="text"
              class="form-input"
              placeholder="Enter your full name"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input
              v-model="cvData.personalDetails.phone"
              type="tel"
              class="form-input"
              placeholder="Enter your phone number"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="cvData.personalDetails.email"
              type="email"
              class="form-input"
              placeholder="Enter your email address"
            />
          </div>
          <div class="form-group full-width">
            <label class="form-label">Address</label>
            <input
              v-model="cvData.personalDetails.address"
              type="text"
              class="form-input"
              placeholder="Enter your address"
            />
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">📝</span>
          About
        </h2>
        <div class="form-group">
          <label class="form-label">Profile (Short Introduction)</label>
          <textarea
            v-model="cvData.about.profile"
            class="form-textarea"
            rows="4"
            placeholder="Write a brief introduction about yourself..."
          ></textarea>
        </div>
      </div>

      <!-- Education Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">🎓</span>
          Education
        </h2>
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="education-item"
        >
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Institution</label>
              <input
                v-model="education.institution"
                type="text"
                class="form-input"
                placeholder="Enter institution name"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Qualification</label>
              <input
                v-model="education.qualification"
                type="text"
                class="form-input"
                placeholder="Enter qualification"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Time Period</label>
              <input
                v-model="education.time"
                type="text"
                class="form-input"
                placeholder="e.g., 2020-2024"
              />
            </div>
          </div>
          <button
            v-if="cvData.education.length > 1"
            @click="removeEducation(index)"
            class="remove-button"
          >
            Remove
          </button>
        </div>
        <button @click="addEducation" class="add-button">
          + Add Education
        </button>
      </div>

      <!-- Work Experience Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">💼</span>
          Work Experience
        </h2>
        <div
          v-for="(experience, index) in cvData.workExperience"
          :key="index"
          class="experience-item"
        >
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Company</label>
              <input
                v-model="experience.company"
                type="text"
                class="form-input"
                placeholder="Enter company name"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Position</label>
              <input
                v-model="experience.position"
                type="text"
                class="form-input"
                placeholder="Enter position title"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Time Period</label>
              <input
                v-model="experience.time"
                type="text"
                class="form-input"
                placeholder="e.g., Jan 2022 - Present"
              />
            </div>
          </div>
          <button
            v-if="cvData.workExperience.length > 1"
            @click="removeWorkExperience(index)"
            class="remove-button"
          >
            Remove
          </button>
        </div>
        <button @click="addWorkExperience" class="add-button">
          + Add Work Experience
        </button>
      </div>

      <!-- Skills Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">⚡</span>
          Skills
        </h2>
        <div class="form-group">
          <label class="form-label">Skills</label>
          <textarea
            v-model="skillsText"
            @input="updateSkills"
            class="form-textarea"
            rows="4"
            placeholder="e.g., JavaScript, Vue.js, Node.js, MongoDB..."
          ></textarea>
        </div>
        <div v-if="cvData.skills.length > 0" class="skills-display">
          <span
            v-for="skill in cvData.skills"
            :key="skill"
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Interests Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">🎯</span>
          Interests
        </h2>
        <div class="form-group">
          <label class="form-label">Interests</label>
          <textarea
            v-model="interestsText"
            @input="updateInterests"
            class="form-textarea"
            rows="4"
            placeholder="e.g., Photography, Travel, Reading, Coding..."
          ></textarea>
        </div>
        <div v-if="cvData.interests.length > 0" class="interests-display">
          <span
            v-for="interest in cvData.interests"
            :key="interest"
            class="interest-tag"
          >
            {{ interest }}
          </span>
        </div>
      </div>

      <!-- Projects Section -->
      <div class="cv-section">
        <h2 class="section-title">
          <span class="section-icon">🚀</span>
          Projects
        </h2>
        <div
          v-for="(project, index) in cvData.projects"
          :key="index"
          class="project-item"
        >
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Project Name</label>
              <input
                v-model="project.name"
                type="text"
                class="form-input"
                placeholder="Enter project name"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Languages/Technologies</label>
              <input
                v-model="project.languages"
                type="text"
                class="form-input"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Description</label>
              <textarea
                v-model="project.description"
                class="form-textarea"
                rows="3"
                placeholder="Describe your project..."
              ></textarea>
            </div>
          </div>
          <button
            v-if="cvData.projects.length > 1"
            @click="removeProject(index)"
            class="remove-button"
          >
            Remove
          </button>
        </div>
        <button @click="addProject" class="add-button">
          + Add Project
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="cv-actions">
        <button @click="saveCV" class="save-button" :disabled="isLoading">
          <span v-if="!isLoading">Save CV</span>
          <span v-else>Saving...</span>
        </button>
        <button @click="previewCV" class="preview-button">
          Preview CV
        </button>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { cvService } from '../services/cvService.js'

// Define emits
const emit = defineEmits(['preview-cv'])

// Reactive CV data
const cvData = reactive({
  personalDetails: {
    fullName: '',
    phone: '',
    email: '',
    address: ''
  },
  about: {
    profile: ''
  },
  education: [
    {
      institution: '',
      qualification: '',
      time: ''
    }
  ],
  workExperience: [
    {
      company: '',
      position: '',
      time: ''
    }
  ],
  skills: [],
  interests: [],
  projects: [
    {
      name: '',
      description: '',
      languages: ''
    }
  ]
})

// UI state
const isLoading = ref(false)
const message = ref('')
const messageType = ref('')
const skillsText = ref('')
const interestsText = ref('')

// Education methods
const addEducation = () => {
  cvData.education.push({
    institution: '',
    qualification: '',
    time: ''
  })
}

const removeEducation = (index) => {
  cvData.education.splice(index, 1)
}

// Work Experience methods
const addWorkExperience = () => {
  cvData.workExperience.push({
    company: '',
    position: '',
    time: ''
  })
}

const removeWorkExperience = (index) => {
  cvData.workExperience.splice(index, 1)
}

// Project methods
const addProject = () => {
  cvData.projects.push({
    name: '',
    description: '',
    languages: ''
  })
}

const removeProject = (index) => {
  cvData.projects.splice(index, 1)
}

// Skills and Interests handling
const updateSkills = () => {
  cvData.skills = skillsText.value
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0)
}

const updateInterests = () => {
  cvData.interests = interestsText.value
    .split(',')
    .map(interest => interest.trim())
    .filter(interest => interest.length > 0)
}

// CV Actions
const saveCV = async () => {
  isLoading.value = true
  message.value = ''
  
  try {
    // Save CV data to database
    const response = await cvService.saveCVData(cvData)
    
    message.value = 'CV saved successfully!'
    messageType.value = 'success'
    
  } catch (error) {
    console.error('Save CV error:', error)
    message.value = error.message || 'Failed to save CV. Please try again.'
    messageType.value = 'error'
  } finally {
    isLoading.value = false
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

// Auto-save functionality with debouncing
let autoSaveTimeout = null
const autoSaveCV = async () => {
  // Clear previous timeout
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  
  // Set new timeout for auto-save (2 seconds after user stops typing)
  autoSaveTimeout = setTimeout(async () => {
    try {
      await cvService.saveCVData(cvData)
      // Silently save without showing message for auto-save
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }, 2000)
}

const previewCV = async () => {
  try {
    // Save current CV data before preview
    await cvService.saveCVData(cvData)
    
    // Emit event to navigate to profile showcase
    emit('preview-cv')
    
  } catch (error) {
    console.error('Failed to save CV before preview:', error)
    message.value = 'Failed to save CV. Please try again.'
    messageType.value = 'error'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

// Load CV data from database on mount
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await cvService.getCVData()
    
    if (response.success && response.data) {
      // Update cvData with loaded data
      Object.assign(cvData, response.data)
      
      // Restore skills and interests text for display
      skillsText.value = cvData.skills.join(', ')
      interestsText.value = cvData.interests.join(', ')
    }
  } catch (error) {
    console.error('Failed to load CV data:', error)
    message.value = 'Failed to load CV data. Starting with a blank CV.'
    messageType.value = 'error'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } finally {
    isLoading.value = false
  }
})

// Watch for changes in CV data and auto-save
watch(
  cvData,
  () => {
    autoSaveCV()
  },
  { deep: true }
)

// Watch for changes in skills and interests text
watch(skillsText, () => {
  updateSkills()
  autoSaveCV()
})

watch(interestsText, () => {
  updateInterests()  
  autoSaveCV()
})
</script>

<style scoped>
.cv-builder {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 2rem;
}

.cv-builder-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cv-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cv-subtitle {
  font-size: 1.1rem;
  color: #a0a0a0;
}

.cv-builder-content {
  max-width: 800px;
  margin: 0 auto;
}

.cv-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.section-icon {
  font-size: 1.2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e0e0e0;
}

.form-input, .form-textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #ffffff;
  font-family: inherit;
  transition: all 0.3s ease;
  resize: vertical;
}

.form-input::placeholder, .form-textarea::placeholder {
  color: #666666;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.education-item, .experience-item, .project-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
}

.add-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.add-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.remove-button {
  background: rgba(255, 59, 48, 0.2);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 6px;
  color: #ff6b5a;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-family: inherit;
}

.remove-button:hover {
  background: rgba(255, 59, 48, 0.3);
  border-color: rgba(255, 59, 48, 0.5);
}

.skills-display, .interests-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.skill-tag, .interest-tag {
  background: rgba(52, 199, 89, 0.2);
  border: 1px solid rgba(52, 199, 89, 0.3);
  color: #64d274;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.cv-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 3rem 0 2rem;
  flex-wrap: wrap;
}

.save-button, .preview-button {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  border: none;
}

.save-button {
  background: linear-gradient(135deg, #52d273 0%, #4ade80 100%);
  color: #000000;
}

.save-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(82, 210, 115, 0.3);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.preview-button {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

.preview-button:hover {
  background: rgba(59, 130, 246, 0.3);
  border-color: rgba(59, 130, 246, 0.5);
}

.message {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 500;
}

.message.success {
  background: rgba(52, 199, 89, 0.1);
  border: 1px solid rgba(52, 199, 89, 0.3);
  color: #64d274;
}

.message.error {
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #ff6b5a;
}

.message.info {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cv-builder {
    padding: 1rem;
  }
  
  .cv-title {
    font-size: 2rem;
  }
  
  .cv-section {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .cv-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .save-button, .preview-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>

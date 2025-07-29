<template>
  <div class="cv-preview">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading CV preview...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Failed to load CV</h3>
      <p>{{ error }}</p>
      <button @click="loadCVData" class="retry-button">Try Again</button>
    </div>

    <div v-else class="cv-document">
      <!-- CV Header -->
      <div class="cv-header">
        <div class="personal-info">
          <h1 class="full-name">{{ cvData.personalDetails?.fullName || 'Your Name' }}</h1>
          <div class="contact-details">
            <div v-if="cvData.personalDetails?.email" class="contact-item">
              <span class="contact-icon">📧</span>
              <span>{{ cvData.personalDetails.email }}</span>
            </div>
            <div v-if="cvData.personalDetails?.phone" class="contact-item">
              <span class="contact-icon">📱</span>
              <span>{{ cvData.personalDetails.phone }}</span>
            </div>
            <div v-if="cvData.personalDetails?.address" class="contact-item">
              <span class="contact-icon">📍</span>
              <span>{{ cvData.personalDetails.address }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div v-if="cvData.about?.profile" class="cv-section">
        <h2 class="section-title">About</h2>
        <div class="section-content">
          <p class="profile-text">{{ cvData.about.profile }}</p>
        </div>
      </div>

      <!-- Education Section -->
      <div v-if="hasEducation" class="cv-section">
        <h2 class="section-title">Education</h2>
        <div class="section-content">
          <div 
            v-for="(edu, index) in filteredEducation" 
            :key="index" 
            class="education-item"
          >
            <div class="education-header">
              <h3 class="institution">{{ edu.institution }}</h3>
              <span class="time-period">{{ edu.time }}</span>
            </div>
            <p class="qualification">{{ edu.qualification }}</p>
          </div>
        </div>
      </div>

      <!-- Work Experience Section -->
      <div v-if="hasWorkExperience" class="cv-section">
        <h2 class="section-title">Work Experience</h2>
        <div class="section-content">
          <div 
            v-for="(work, index) in filteredWorkExperience" 
            :key="index" 
            class="work-item"
          >
            <div class="work-header">
              <h3 class="company">{{ work.company }}</h3>
              <span class="time-period">{{ work.time }}</span>
            </div>
            <p class="position">{{ work.position }}</p>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div v-if="hasSkills" class="cv-section">
        <h2 class="section-title">Skills</h2>
        <div class="section-content">
          <div class="skills-grid">
            <span 
              v-for="skill in cvData.skills" 
              :key="skill" 
              class="skill-item"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div v-if="hasProjects" class="cv-section">
        <h2 class="section-title">Projects</h2>
        <div class="section-content">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="index" 
            class="project-item"
          >
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <span class="project-languages">{{ project.languages }}</span>
            </div>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Interests Section -->
      <div v-if="hasInterests" class="cv-section">
        <h2 class="section-title">Interests</h2>
        <div class="section-content">
          <div class="interests-grid">
            <span 
              v-for="interest in cvData.interests" 
              :key="interest" 
              class="interest-item"
            >
              {{ interest }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="preview-actions">
      <button @click="editCV" class="edit-button">
      Edit CV
      </button>
      <button @click="downloadPDF" class="download-button" :disabled="isDownloading">
        {{ isDownloading ? '� Generating PDF...' : ' Download PDF' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { cvService } from '../services/cvService.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Define emits
const emit = defineEmits(['edit-cv'])

// Reactive data
const isLoading = ref(true)
const error = ref('')
const isDownloading = ref(false)
const cvData = ref({
  personalDetails: {
    fullName: '',
    phone: '',
    email: '',
    address: ''
  },
  about: {
    profile: ''
  },
  education: [],
  workExperience: [],
  skills: [],
  interests: [],
  projects: []
})

// Computed properties to filter empty data
const filteredEducation = computed(() => {
  return cvData.value.education?.filter(edu => 
    edu.institution || edu.qualification || edu.time
  ) || []
})

const filteredWorkExperience = computed(() => {
  return cvData.value.workExperience?.filter(work => 
    work.company || work.position || work.time
  ) || []
})

const filteredProjects = computed(() => {
  return cvData.value.projects?.filter(project => 
    project.name || project.description || project.languages
  ) || []
})

const hasEducation = computed(() => filteredEducation.value.length > 0)
const hasWorkExperience = computed(() => filteredWorkExperience.value.length > 0)
const hasSkills = computed(() => cvData.value.skills?.length > 0)
const hasInterests = computed(() => cvData.value.interests?.length > 0)
const hasProjects = computed(() => filteredProjects.value.length > 0)

// Methods
const loadCVData = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    const response = await cvService.getCVData()
    
    if (response.success && response.data) {
      cvData.value = response.data
    }
  } catch (err) {
    console.error('Failed to load CV data:', err)
    error.value = err.message || 'Failed to load CV data'
  } finally {
    isLoading.value = false
  }
}

const editCV = () => {
  emit('edit-cv')
}

const downloadPDF = async () => {
  try {
    // Set loading state
    isDownloading.value = true

    // Get the CV document element
    const cvElement = document.querySelector('.cv-document')
    if (!cvElement) {
      throw new Error('CV content not found')
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(cvElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#000000', // Match the dark theme
      width: cvElement.offsetWidth,
      height: cvElement.offsetHeight
    })

    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate dimensions to fit the canvas in PDF
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight)
    
    const imgWidth = canvasWidth * ratio
    const imgHeight = canvasHeight * ratio
    
    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2
    const y = (pdfHeight - imgHeight) / 2

    // Add the image to PDF
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0]
    const fileName = `CV_${cvData.value.personalDetails?.fullName?.replace(/\s+/g, '_') || 'Resume'}_${currentDate}.pdf`

    // Download the PDF
    pdf.save(fileName)

  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    // Reset loading state
    isDownloading.value = false
  }
}

// Load CV data on mount
onMounted(() => {
  loadCVData()
})
</script>

<style scoped>
.cv-preview {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #ffffff;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.retry-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.cv-document {
  background: #000000;
  color: #ffffff;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  border: 1px solid #333333;
}

/* Header Styles */
.cv-header {
  border-bottom: 2px solid #333333;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.full-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #cccccc;
  font-size: 0.95rem;
}

.contact-icon {
  font-size: 1rem;
}

/* Section Styles */
.cv-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333333;
  letter-spacing: -0.01em;
}

.section-content {
  padding-left: 0.5rem;
}

.profile-text {
  color: #cccccc;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
}

/* Education & Work Experience Styles */
.education-item, .work-item, .project-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333333;
}

.education-item:last-child, 
.work-item:last-child, 
.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.education-header, .work-header, .project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.institution, .company, .project-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.time-period {
  color: #999999;
  font-size: 0.9rem;
  font-weight: 500;
  background: #222222;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  white-space: nowrap;
}

.qualification, .position, .project-description {
  color: #cccccc;
  margin: 0;
  font-size: 0.95rem;
}

.project-languages {
  color: #66ccff;
  font-size: 0.85rem;
  font-weight: 500;
  background: #1a2633;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

/* Skills & Interests Grid */
.skills-grid, .interests-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-item, .interest-item {
  background: #222222;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #333333;
}

.skill-item {
  background: #1a3326;
  border-color: #2d5540;
  color: #66ff99;
}

.interest-item {
  background: #332a1a;
  border-color: #5c4d33;
  color: #ffcc66;
}

/* Action Buttons */
.preview-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.edit-button, .download-button {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.edit-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.edit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.download-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.download-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cv-preview {
    padding: 1rem;
  }
  
  .cv-document {
    padding: 2rem 1.5rem;
  }
  
  .full-name {
    font-size: 2rem;
  }
  
  .contact-details {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .education-header, .work-header, .project-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .preview-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .edit-button, .download-button {
    width: 100%;
    max-width: 300px;
  }
}

@media print {
  .cv-preview {
    background: black;
    padding: 0;
  }
  
  .preview-actions {
    display: none;
  }
  
  .cv-document {
    box-shadow: none;
    margin: 0;
    background: black !important;
    color: white !important;
  }
}
</style>

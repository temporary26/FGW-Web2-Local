<template>
  <div class="homepage-container">
    <!-- Top Sidebar -->
    <header class="top-sidebar">
      <div class="top-sidebar-content">
        <div class="top-logo">
          <span class="logo-icon">📄</span>
          <span class="logo-text">QuickCV</span>
        </div>
        
        <div class="top-buttons">
          <button class="top-button" title="GitHub">
            <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          
          <button class="top-button" @click="toggleTheme" title="Toggle theme">
            <svg v-if="isDarkMode" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-content">
        <nav class="sidebar-nav">
          <a href="#" @click="setActiveSection('home')" :class="{ active: activeSection === 'home' }" class="nav-item">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="nav-text">Home</span>
          </a>
          
          <a href="#" @click="setActiveSection('cv-builder')" :class="{ active: activeSection === 'cv-builder' }" class="nav-item">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <span class="nav-text">CV Builder</span>
          </a>
          
          <a href="#" @click="setActiveSection('profile-showcase')" :class="{ active: activeSection === 'profile-showcase' }" class="nav-item">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span class="nav-text">Profile Showcase</span>
          </a>
          
          <a href="#" @click="setActiveSection('dashboard')" :class="{ active: activeSection === 'dashboard' }" class="nav-item">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span class="nav-text">User Settings</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <button @click="handleLogout" class="logout-btn">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="nav-text">Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Home Section -->
      <div v-if="activeSection === 'home'" class="content-section">
        <div class="content-wrapper">
          <div class="hero-section">
            <h1 class="main-title">Welcome to QuickCV</h1>
            <p class="main-subtitle">
              Build beautiful CVs using modern templates and powerful tools.
            </p>
            <p class="description">
              QuickCV is a collection of reusable, professional CV templates powered by modern design principles — crafted to help you ship faster and better.
            </p>
            <p class="sub-description">
              Whether you're starting a new career or refining a current one, this is the place to begin.
            </p>
          </div>

          <div class="quick-links-section">
            <h2 class="section-title">Quick Links</h2>
            
            <div class="quick-links-grid">
              <!-- CV Builder Link -->
              <div class="quick-link-card" @click="setActiveSection('cv-builder')">
                <div class="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h3 class="card-title">CV Builder</h3>
                  <p class="card-description">Create and edit your CV with our powerful builder tools and modern templates.</p>
                </div>
                <div class="card-arrow">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <!-- Profile Showcase Link -->
              <div class="quick-link-card" @click="setActiveSection('profile-showcase')">
                <div class="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h3 class="card-title">Profile Showcase</h3>
                  <p class="card-description">View and manage your professional profile display with beautiful layouts.</p>
                </div>
                <div class="card-arrow">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <!-- User Dashboard Link -->
              <div class="quick-link-card" @click="setActiveSection('dashboard')">
                <div class="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h3 class="card-title">User Dashboard</h3>
                  <p class="card-description">Manage your account settings and review security options.</p>
                </div>
                <div class="card-arrow">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      <!-- CV Builder Section -->
      <div v-else-if="activeSection === 'cv-builder'" class="content-section">
        <CVBuilder @preview-cv="handlePreviewCV" />
      </div>

      <!-- Profile Showcase Section -->
      <div v-else-if="activeSection === 'profile-showcase'" class="content-section">
        <CVPreview @edit-cv="handleEditCV" />
      </div>

      <!-- Dashboard Section -->
      <div v-else-if="activeSection === 'dashboard'" class="content-section">
        <div class="content-wrapper">
          <h1 class="page-title">User Settings</h1>
          <p class="page-description">Manage your account and review your security options.</p>

          <!-- Dashboard Tabs -->
          <div class="dashboard-tabs">
            <button 
              @click="setDashboardTab('general')" 
              :class="{ active: dashboardTab === 'general' }" 
              class="tab-button"
            >
              <span class="tab-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </span>
              General
            </button>
            <button 
              @click="setDashboardTab('security')" 
              :class="{ active: dashboardTab === 'security' }" 
              class="tab-button"
            >
              <span class="tab-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a6 6 0 01-6 6 6 6 0 01-6-6v-2c0-1.657 1.343-3 3-3s3 1.343 3 3z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11V7m0 0a4 4 0 018 0v4"/>
                </svg>
              </span>
              Security
            </button>
          </div>

          <!-- General Tab Content -->
          <div v-if="dashboardTab === 'general'" class="tab-content">
            <!-- Success/Error Messages -->
            <div v-if="successMessage" class="message success-message">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="message error-message">
              {{ errorMessage }}
            </div>
            
            <div class="profile-section">
              <h2 class="section-header">Profile</h2>
              <p class="section-description">These informations will be displayed publicly.</p>
              
              <div class="form-group">
                <label class="form-label">
                  Email <span class="required">*</span>
                </label>
                <p class="form-helper">Used to sign in, for email receipts and product updates.</p>
                <input 
                  v-model="userProfile.email" 
                  type="email" 
                  class="form-input"
                  :disabled="isLoading || isProfileLoading"
                  placeholder="your@email.com"
                />
              </div>

              <div class="form-group">
                <label class="form-label">
                  Username <span class="required">*</span>
                </label>
                <p class="form-helper">Your unique username for logging in and your profile URL.</p>
                <input 
                  v-model="userProfile.username" 
                  type="text" 
                  class="form-input"
                  :disabled="isLoading || isProfileLoading"
                  placeholder="username"
                />
              </div>

              <button 
                @click="handleSaveProfile" 
                :disabled="isProfileLoading" 
                class="save-button"
              >
                {{ isProfileLoading ? 'Saving...' : 'Save changes' }}
              </button>
            </div>
          </div>

          <!-- Security Tab Content -->
          <div v-if="dashboardTab === 'security'" class="tab-content">
            <!-- Password Section -->
            <div class="security-section">
              <h2 class="section-header">Password</h2>
              <p class="section-description">Confirm your current password before setting a new one.</p>
              
              <!-- Password Success/Error Messages -->
              <div v-if="passwordSuccess" class="message success-message">
                {{ passwordSuccess }}
              </div>
              <div v-if="passwordError" class="message error-message">
                {{ passwordError }}
              </div>
              
              <div class="form-group">
                <input 
                  v-model="passwordForm.currentPassword" 
                  type="password" 
                  class="form-input"
                  :disabled="isPasswordLoading"
                  placeholder="Current password"
                />
              </div>

              <div class="form-group">
                <input 
                  v-model="passwordForm.newPassword" 
                  type="password" 
                  class="form-input"
                  :disabled="isPasswordLoading"
                  placeholder="New password"
                />
              </div>

              <div class="form-group">
                <input 
                  v-model="passwordForm.confirmPassword" 
                  type="password" 
                  class="form-input"
                  :disabled="isPasswordLoading"
                  placeholder="Confirm new password"
                />
              </div>

              <button 
                @click="handleUpdatePassword" 
                :disabled="isPasswordLoading" 
                class="update-button"
              >
                {{ isPasswordLoading ? 'Updating...' : 'Update password' }}
              </button>
            </div>

            <!-- Account Section -->
            <div class="security-section">
              <h2 class="section-header">Account</h2>
              <p class="section-description">
                No longer want to use our service? You can delete your account here. This action is not 
                reversible. All information related to this account will be deleted permanently.
              </p>
              
              <button class="delete-button" disabled>Delete account (Coming Soon)</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { userService } from '../services/userService.js'
import CVBuilder from './CVBuilder.vue'
import CVPreview from './CVPreview.vue'

const authStore = useAuthStore()
const activeSection = ref('home')
const dashboardTab = ref('general')
const isDarkMode = ref(true)

// Loading states
const isLoading = ref(false)
const isProfileLoading = ref(false)
const isPasswordLoading = ref(false)

// User profile data
const userProfile = ref({
  email: '',
  username: '',
  originalEmail: '',
  originalUsername: ''
})

// Password form data
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Error and success messages
const errorMessage = ref('')
const successMessage = ref('')
const passwordError = ref('')
const passwordSuccess = ref('')

// Load user profile data when component mounts
onMounted(async () => {
  await loadUserProfile()
})

const loadUserProfile = async () => {
  try {
    isLoading.value = true
    const response = await userService.getProfile()
    
    if (response.success) {
      userProfile.value = {
        email: response.data.email,
        username: response.data.username,
        originalEmail: response.data.email,
        originalUsername: response.data.username
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
    errorMessage.value = error.message || 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}

const setActiveSection = (section) => {
  activeSection.value = section
  // Clear messages when switching sections
  clearMessages()
}

const setDashboardTab = (tab) => {
  dashboardTab.value = tab
  // Clear messages when switching tabs
  clearMessages()
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
  passwordError.value = ''
  passwordSuccess.value = ''
}

// Handle profile updates (email and username)
const handleSaveProfile = async () => {
  if (isProfileLoading.value) return
  
  try {
    isProfileLoading.value = true
    clearMessages()
    
    const emailChanged = userProfile.value.email !== userProfile.value.originalEmail
    const usernameChanged = userProfile.value.username !== userProfile.value.originalUsername
    
    if (!emailChanged && !usernameChanged) {
      successMessage.value = 'No changes to save'
      return
    }
    
    // Get current password for verification
    const currentPassword = prompt('Please enter your current password to confirm changes:')
    if (!currentPassword) {
      return // User cancelled
    }
    
    // Update email if changed
    if (emailChanged) {
      await userService.updateEmail(userProfile.value.email, currentPassword)
      userProfile.value.originalEmail = userProfile.value.email
    }
    
    // Update username if changed
    if (usernameChanged) {
      await userService.updateUsername(userProfile.value.username, currentPassword)
      userProfile.value.originalUsername = userProfile.value.username
    }
    
    successMessage.value = 'Profile updated successfully!'
    
    // Reload user data to ensure consistency
    await loadUserProfile()
    
  } catch (error) {
    console.error('Profile update failed:', error)
    errorMessage.value = error.message || 'Failed to update profile'
    
    // Reset to original values on error
    userProfile.value.email = userProfile.value.originalEmail
    userProfile.value.username = userProfile.value.originalUsername
  } finally {
    isProfileLoading.value = false
  }
}

// Handle password update
const handleUpdatePassword = async () => {
  if (isPasswordLoading.value) return
  
  try {
    isPasswordLoading.value = true
    passwordError.value = ''
    passwordSuccess.value = ''
    
    // Validate form
    if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
      passwordError.value = 'All password fields are required'
      return
    }
    
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      passwordError.value = 'New passwords do not match'
      return
    }
    
    if (passwordForm.value.newPassword.length < 6) {
      passwordError.value = 'New password must be at least 6 characters long'
      return
    }
    
    // Update password
    await userService.updatePassword(
      passwordForm.value.currentPassword,
      passwordForm.value.newPassword,
      passwordForm.value.confirmPassword
    )
    
    passwordSuccess.value = 'Password updated successfully!'
    
    // Clear form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
  } catch (error) {
    console.error('Password update failed:', error)
    passwordError.value = error.message || 'Failed to update password'
  } finally {
    isPasswordLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const handlePreviewCV = () => {
  setActiveSection('profile-showcase')
}

const handleEditCV = () => {
  setActiveSection('cv-builder')
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // You can add theme switching logic here
  console.log('Theme toggled to:', isDarkMode.value ? 'dark' : 'light')
}
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

/* Top Sidebar Styles */
.top-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #000000;
  border-bottom: 1px solid #1a1a1a;
  z-index: 100;
}

.top-sidebar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1.5rem;
}

.top-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.top-logo .logo-icon {
  font-size: 1.25rem;
}

.top-logo .logo-text {
  font-size: 1.125rem;
  color: #ffffff;
}

.top-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: #a1a1aa;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
}

.top-button:hover {
  background-color: #18181b;
  color: #ffffff;
}

/* Sidebar Styles */
.sidebar {
  width: 240px;
  background-color: #000000;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem 2rem;
}

.sidebar-header {
  padding: 1.25rem 0;
  border-bottom: 1px solid #1e1e1e;
  margin-right: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.125rem;
}

.logo-text {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.nav-item:hover {
  background-color: #18181b;
  color: #ffffff;
}

.nav-item.active {
  background-color: #18181b;
  color: #ffffff;
}

.nav-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.nav-text {
  font-weight: 500;
}

.sidebar-footer {
  padding: 0.75rem 0;
  border-top: 1px solid #1e1e1e;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #a1a1aa;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: #18181b;
  color: #ffffff;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 240px;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

.content-section {
  min-height: calc(100vh - 60px);
  padding: 2rem;
}

.content-wrapper {
  max-width: 1024px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  margin-bottom: 3rem;
}

.main-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.main-subtitle {
  font-size: 1.125rem;
  color: #a1a1aa;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.description {
  color: #71717a;
  margin-bottom: 0.75rem;
  line-height: 1.6;
  font-size: 1rem;
}

.sub-description {
  color: #71717a;
  line-height: 1.6;
  font-size: 1rem;
}

/* Quick Links Section */
.quick-links-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.quick-link-card {
  background-color: #111111;
  border: 1px solid #1e1e1e;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.quick-link-card:hover {
  background-color: #18181b;
  border-color: #27272a;
}

.card-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #18181b;
  border-radius: 0.375rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.card-icon svg {
  width: 16px;
  height: 16px;
  color: #a1a1aa;
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #ffffff;
  line-height: 1.4;
}

.card-description {
  color: #a1a1aa;
  font-size: 0.75rem;
  line-height: 1.4;
}

.card-arrow {
  width: 16px;
  height: 16px;
  color: #52525b;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.card-arrow svg {
  width: 100%;
  height: 100%;
}

/* Page Styles for other sections */
.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.page-description {
  font-size: 1.125rem;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .content-section {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.875rem;
  }
  
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
  
  .top-sidebar-content {
    padding: 0 1rem;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .sidebar {
    width: 200px;
  }
  
  .main-content {
    margin-left: 200px;
  }
}

/* Scrollbar Styling */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}

/* Dashboard Styles */
.dashboard-tabs {
  display: flex;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #a1a1aa;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #ffffff;
}

.tab-button.active {
  color: #10b981;
  border-bottom-color: #10b981;
}

.tab-icon {
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-top: 2px;
}

.tab-content {
  max-width: 600px;
}

.profile-section,
.security-section {
  margin-bottom: 3rem;
}

.section-header {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #a1a1aa;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.required {
  color: #ef4444;
}

.form-helper {
  color: #a1a1aa;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.form-input {
  width: 100%;
  background-color: #111111;
  border: 1px solid #27272a;
  border-radius: 0.375rem;
  padding: 0.75rem;
  color: #ffffff;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 1px #10b981;
}

.form-input::placeholder {
  color: #71717a;
}

.save-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-button:hover {
  background-color: #f1f5f9;
}

.update-button {
  background-color: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.update-button:hover {
  background-color: #059669;
}

.delete-button {
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #dc2626;
}

/* Message Styles */
.message {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.success-message {
  background-color: #065f46;
  color: #10b981;
  border: 1px solid #10b981;
}

.error-message {
  background-color: #7f1d1d;
  color: #ef4444;
  border: 1px solid #ef4444;
}

/* Disabled button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: inherit;
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

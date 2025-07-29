<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/authStore.js'
import HomePage from './components/HomePage.vue'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const username = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const isSignUp = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Initialize auth state on mount
onMounted(() => {
  authStore.initializeAuth()
})

const handleLogin = async () => {
  isLoading.value = true
  // Don't clear error message immediately - let it persist until success
  successMessage.value = ''
  
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    
    // Clear error message only on successful login
    errorMessage.value = ''
    successMessage.value = 'Login successful! Welcome back.'
    
    // Clear form only on successful login
    email.value = ''
    password.value = ''
    
  } catch (error) {
    // Keep form data and show error
    errorMessage.value = error.message || 'Login failed. Please try again.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }
  
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    successMessage.value = 'Account created successfully! Welcome!'
    
    // Clear form
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    successMessage.value = 'Logged out successfully!'
    
    // Clear any remaining form data
    clearForm()
    
  } catch (error) {
    errorMessage.value = 'Logout failed.'
  }
}

const handleGithubAuth = () => {
  errorMessage.value = 'GitHub authentication is not implemented yet.'
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  clearForm()
  clearMessages()
}

const clearForm = () => {
  email.value = ''
  password.value = ''
  username.value = ''
  confirmPassword.value = ''
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

// Clear error messages when user starts typing
const onInputChange = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>

<template>
  <div class="app-container">
    <!-- Show homepage if authenticated -->
    <HomePage v-if="authStore.isAuthenticated" />

    <!-- Show login page if not authenticated -->
    <div v-else class="login-page">
      <!-- Header -->
      <header class="header">
        <div class="logo">
          <span class="logo-icon">📄</span>
          <span class="logo-text">QuickCV</span>
        </div>
        
        <button class="menu-button">
          <div class="hamburger"></div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>
        </button>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="login-container">
        <div class="login-card">
          <h1 class="login-title">{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h1>
          <p class="login-subtitle">
            {{ isSignUp ? 'Create a new account to get started.' : 'Enter your credentials to access your account.' }}
          </p>

          <!-- Error Message -->
          <div v-if="errorMessage" class="message error-message">
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="message success-message">
            {{ successMessage }}
          </div>
          
          <!-- Sign In Form -->
          <form v-if="!isSignUp" @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder="your-email@example.com"
                @input="onInputChange"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-input"
                placeholder="Enter your password"
                @input="onInputChange"
                required
              />
            </div>
            
            <button 
              type="submit" 
              class="login-button"
              :disabled="isLoading"
              :class="{ loading: isLoading }"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else>Signing In...</span>
            </button>
          </form>

          <!-- Sign Up Form -->
          <form v-else @submit.prevent="handleSignUp" class="login-form">
            <div class="form-group">
              <label for="signup-username" class="form-label">Username</label>
              <input
                id="signup-username"
                v-model="username"
                type="text"
                class="form-input"
                placeholder="Choose a username"
                required
              />
            </div>

            <div class="form-group">
              <label for="signup-email" class="form-label">Email Address</label>
              <input
                id="signup-email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder="your-email@example.com"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="signup-password" class="form-label">Password</label>
              <input
                id="signup-password"
                v-model="password"
                type="password"
                class="form-input"
                placeholder="Create a password"
                required
              />
            </div>

            <div class="form-group">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                class="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              class="login-button"
              :disabled="isLoading"
              :class="{ loading: isLoading }"
            >
              <span v-if="!isLoading">Sign Up</span>
              <span v-else>Creating Account...</span>
            </button>
          </form>

          <!-- GitHub Sign In Button -->
          <div class="divider">
            <span>or</span>
          </div>

          <button @click="handleGithubAuth" class="github-button">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <!-- Toggle between Sign In/Sign Up -->
          <div class="toggle-mode">
            <span>{{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}</span>
            <button @click="toggleMode" class="toggle-button">
              {{ isSignUp ? 'Sign In' : 'Sign Up' }}
            </button>
          </div>
        </div>
      </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-logo">
            <span class="logo-icon">📄</span>
            <span class="logo-text">QuickCV</span>
          </div>
          
          <div class="footer-links">
            <div class="footer-section">
              <h3>Pages</h3>
              <a href="#">Free Templates</a>
              <a href="#">All Templates</a>
            </div>
            
            <div class="footer-section">
              <h3>Follow us on</h3>
              <a href="#">X (formerly Twitter)</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© Copyright QuickCV 2025. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger {
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.menu-button:hover .hamburger {
  background: #cccccc;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Messages */
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.error-message {
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #ff6b5a;
}

.success-message {
  background: rgba(52, 199, 89, 0.1);
  border: 1px solid rgba(52, 199, 89, 0.3);
  color: #64d274;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  color: #a0a0a0;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.form-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #ffffff;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: #666666;
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.login-button {
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-button.loading {
  background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider span {
  background: rgba(255, 255, 255, 0.08);
  color: #a0a0a0;
  padding: 0 1rem;
  font-size: 0.9rem;
}

/* GitHub Button */
.github-button {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.github-icon {
  width: 20px;
  height: 20px;
}

/* Toggle Mode */
.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
  color: #a0a0a0;
  font-size: 0.9rem;
}

.toggle-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  margin-left: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.toggle-button:hover {
  color: #e0e0e0;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #e0e0e0;
}

.footer-section a {
  display: block;
  color: #a0a0a0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #ffffff;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: #808080;
  font-size: 0.85rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-links {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem;
  }
  
  .login-card {
    padding: 1.5rem;
  }
  
  .login-title {
    font-size: 1.75rem;
  }
}
</style>

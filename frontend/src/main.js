import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

try {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  
  // Global error handler
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue error:', err, info)
  }

  app.mount('#app')
} catch (error) {
  console.error('App initialization error:', error)
  // Fallback error display
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; color: red;">
      <h2>Application Error</h2>
      <p>Failed to initialize the application. Please refresh the page.</p>
      <details>
        <summary>Error Details</summary>
        <pre>${error.message}</pre>
      </details>
    </div>
  `
}

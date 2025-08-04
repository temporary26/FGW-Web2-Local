# Complete Render Setup Guide

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Make sure your ENTIRE project is pushed to GitHub (including both frontend and backend)
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

**Important:** Yes, push the whole project to GitHub! You'll specify which directory to deploy later.

### 1.2 Verify Files
Ensure these files exist in your backend directory:
- ✅ `render.yaml` - Render configuration
- ✅ `package.json` - Updated with correct scripts
- ✅ `.env.production` - Environment variables template

## Step 2: MongoDB Atlas Setup

### 2.1 Create Database
1. Go to https://cloud.mongodb.com/
2. Create free account / login
3. **Create New Project** → Name: "QuickCV"
4. **Build Database** → M0 FREE cluster
5. **Choose Region** → Closest to your location
6. **Cluster Name** → "cv-cluster"

### 2.2 Configure Access
```bash
# Database Access:
1. Database Access → Add New Database User
   - Username: cvapp-user
   - Password: Generate secure password (SAVE IT!)
   - Database User Privileges: Read and write to any database

# Network Access:
2. Network Access → Add IP Address
   - IP Address: 0.0.0.0/0 (Allow access from anywhere)
   - Comment: "Allow all IPs for production"
```

### 2.3 Get Connection String
```bash
# 1. Databases → Connect → Connect your application
# 2. Driver: Node.js, Version: 4.1 or later
# 3. Copy connection string:
# mongodb+srv://cvapp-user:<password>@cv-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 3: Deploy to Render

### 3.1 Create Render Account
1. Go to https://render.com/
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### 3.2 Create Web Service

**Updated Render Configuration (Current Interface):**

1. **Dashboard → New → Web Service**
2. **Connect Repository → Select your CV project** (the whole repository)
3. **Configure the following fields:**

```bash
Name: quickcv-backend
Project: (leave default or create new)
Language: Change from "Docker" to "Node" ⚠️ IMPORTANT!
Region: Oregon (US West) 
Root Directory: backend
Dockerfile Path: (leave empty or delete)
```

4. **In Advanced section, add:**
```bash
Build Command: npm install
Start Command: npm start
```

5. **If you don't see Build/Start Command fields:**
   - Look in the **Advanced** section
   - Or they might be auto-detected after you set Language to "Node"

**🔥 Important Notes:**
- Choose "Node" not "Node.js" 
- Build/Start commands might be in the Advanced section
- Make sure Root Directory is set to "backend"

**Alternative: If you still don't see Build/Start commands:**
1. Just set Language to "Node" and Root Directory to "backend"
2. Click "Create Web Service" 
3. Render will auto-detect from your package.json
4. You can edit build/start commands later in Settings → Build & Deploy

### 3.3 Configure Environment Variables
In Render dashboard, add these environment variables:

```bash
# Required Variables:
MONGODB_URI=mongodb+srv://cvapp-user:YOUR_PASSWORD@cv-cluster.xxxxx.mongodb.net/quickcv?retryWrites=true&w=majority
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-32-character-jwt-secret-key
JWT_EXPIRE=30d
CLIENT_URL=https://your-vercel-app.vercel.app
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

### 3.4 Deploy Backend
```bash
# 1. Click "Create Web Service"
# 2. Wait for deployment (5-10 minutes)
# 3. Copy your Render URL: https://quickcv-backend-xxxx.onrender.com
# 4. Test health endpoint: https://your-render-url.onrender.com/health
```

## Step 4: Deploy Frontend to Vercel

### 4.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 4.2 Deploy Frontend
```bash
cd frontend
vercel login
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N
# - Project name: quickcv-frontend
# - In which directory is your code located? ./
```

### 4.3 Configure Vercel Environment Variables
```bash
# In Vercel dashboard:
# Project → Settings → Environment Variables
# Add:
VITE_API_URL=https://your-render-app.onrender.com
```

## Step 5: Connect Services

### 5.1 Update Render with Vercel URL
```bash
# In Render dashboard, update CLIENT_URL:
CLIENT_URL=https://your-vercel-app.vercel.app
```

### 5.2 Redeploy Services
```bash
# Render: Manual Deploy → Deploy latest commit
# Vercel: Automatically redeploys when environment variables change
```

## Step 6: Verify Deployment

### 6.1 Test Backend
```bash
# Test these endpoints:
curl https://your-render-app.onrender.com/health
curl https://your-render-app.onrender.com/api/cv
```

### 6.2 Test Frontend
```bash
# 1. Visit your Vercel URL
# 2. Open browser developer tools
# 3. Check Network tab for API calls
# 4. Verify no CORS errors in console
```

### 6.3 Test Full Flow
```bash
# 1. Visit frontend URL
# 2. Try to register/login
# 3. Check if CV data loads/saves
# 4. Verify data persists in MongoDB Atlas
```

## Step 7: Monitor and Troubleshoot

### 7.1 Check Logs
```bash
# Render: Service → Logs tab
# Vercel: Project → Functions → View Function Logs
# MongoDB: Atlas → Monitoring
```

### 7.2 Common Issues
```bash
# Missing Build/Start Command Fields:
- Language should be "Node" not "Docker" 
- Check the Advanced section for these fields
- Or let Render auto-detect from package.json

# Build/Start Commands Not Showing:
- Create the service first, then edit in Settings → Build & Deploy
- Render will auto-detect: Build="npm install", Start="npm start"

# CORS Errors:
- Update CLIENT_URL in Render
- Check VITE_API_URL in Vercel

# 500 Errors:
- Check MongoDB connection string
- Verify environment variables
- Check Render logs

# Build Failures:
- Check package.json scripts
- Verify Node.js version compatibility
- Ensure Root Directory is set to "backend"

# Dockerfile Detected Error:
- Change Language from "Docker" to "Node"
- Clear Dockerfile Path field
```

## Final URLs

After successful deployment:
```bash
# Backend (Render): https://quickcv-backend-xxxx.onrender.com
# Frontend (Vercel): https://quickcv-frontend-xxxx.vercel.app
# Database (Atlas): Connected via environment variables
# Health Check: https://your-render-url.onrender.com/health
```

## Cost Summary

All services are FREE:
- ✅ Render: 750 hours/month free (enough for 24/7)
- ✅ Vercel: Unlimited static deployments
- ✅ MongoDB Atlas: 512MB storage free
- ✅ Total cost: $0/month

## Support

If you encounter issues:
1. Check service logs first
2. Verify environment variables
3. Test each service independently
4. Check MongoDB Atlas metrics

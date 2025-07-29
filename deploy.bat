@echo off
echo 🚀 Deploying QuickCV to Render and Vercel...

REM Deploy Backend to Render
echo 📦 Setting up Render Backend Deployment...
echo 1. Go to https://render.com and sign in
echo 2. Connect your GitHub repository
echo 3. Create new Web Service
echo 4. Select backend directory
echo 5. Configure environment variables
echo.

REM Deploy Frontend to Vercel  
echo 🎨 Deploying Frontend to Vercel...
cd frontend
call vercel --prod
echo ✅ Frontend deployed to Vercel!

echo 🎉 Deployment setup complete!
echo.
echo 📋 Next steps:
echo 1. Complete Render backend setup at render.com
echo 2. Copy your Render app URL
echo 3. Update VITE_API_URL in Vercel environment variables
echo 4. Update CLIENT_URL in Render environment variables
echo 5. Configure MongoDB Atlas connection string

pause

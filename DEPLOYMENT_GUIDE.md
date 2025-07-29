# Environment Variables Configuration Guide

## MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/quickcv

## Render Environment Variables
Set these in Render Dashboard -> Your Service -> Environment:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickcv?retryWrites=true&w=majority
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-jwt-secret-key-32-characters-long
JWT_EXPIRE=30d
CLIENT_URL=https://your-vercel-app.vercel.app
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

## Vercel Environment Variables  
Set these in Vercel Dashboard -> Your Project -> Settings -> Environment Variables:

```
VITE_API_URL=https://your-render-app.onrender.com
VITE_APP_NAME=QuickCV
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false
```

## Local Development (.env files)
Keep your existing .env files for local development.

## Security Notes
- Use strong, unique JWT secrets (32+ characters)
- Never commit .env files to git
- Use different secrets for development and production
- Enable HTTPS in production
- Configure CORS properly for your domains

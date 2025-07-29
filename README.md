# QuickCV - MEVN Stack Authentication

A full-stack web application built with MongoDB, Express.js, Vue.js, and Node.js featuring user authentication.

## Features

- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In) 
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Protected Routes
- ✅ User Dashboard
- ✅ Responsive Design
- ✅ Input Validation
- ✅ Error Handling

## Tech Stack

**Frontend:**
- Vue.js 3 (Composition API)
- Pinia (State Management)
- Axios (HTTP Client)
- Vite (Build Tool)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password Hashing)

## Prerequisites

- Node.js (v20.19.0 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/quickcv
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### 5. Run the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Health Check
- `GET /api/health` - Check server status

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your email and password
3. **Dashboard**: View your profile information after authentication
4. **Logout**: Sign out and return to login screen

## Project Structure

```
Project/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── jwt.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── services/
    │   │   ├── api.js
    │   │   └── authService.js
    │   ├── stores/
    │   │   └── authStore.js
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── package.json
    └── vite.config.js
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies support
- CORS protection
- Rate limiting
- Input validation
- Protected routes middleware
- Helmet.js security headers

## Deployment

### Production Deployment (Vercel + Render + MongoDB Atlas)

**Prerequisites:**
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)

**1. MongoDB Atlas Setup:**
```bash
# 1. Go to https://cloud.mongodb.com/
# 2. Create free M0 cluster
# 3. Create database user
# 4. Whitelist IP: 0.0.0.0/0
# 5. Get connection string
```

**2. Deploy Backend to Render:**
```bash
# 1. Go to https://render.com
# 2. Connect GitHub repository
# 3. Create new Web Service
# 4. Select backend directory
# 5. Configure environment variables
```

**3. Deploy Frontend to Vercel:**
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

**4. Configure Environment Variables:**
- See `DEPLOYMENT_GUIDE.md` for complete environment variables setup
- Update Render with MongoDB connection string
- Update Vercel with Render API URL

**Quick Deploy:**
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

## Development

- Backend uses nodemon for auto-restart during development
- Frontend uses Vite for fast development and hot reloading
- ESLint and Prettier recommended for code formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License

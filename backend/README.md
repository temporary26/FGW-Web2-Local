# QuickCV Backend API

## Authentication API Endpoints

### Base URL
```
http://localhost:5000/api/auth
```

### Endpoints

#### 1. Register User
- **URL:** `POST /api/auth/register`
- **Description:** Register a new user account
- **Body:**
```json
{
  "username": "string (3-30 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email",
    "avatar": "",
    "isEmailVerified": false
  }
}
```

#### 2. Login User
- **URL:** `POST /api/auth/login`
- **Description:** Login with existing credentials
- **Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:** Same as register

#### 3. Get Current User
- **URL:** `GET /api/auth/me`
- **Description:** Get current logged-in user info
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email",
    "avatar": "",
    "isEmailVerified": false,
    "lastLogin": "2025-07-29T00:00:00.000Z",
    "createdAt": "2025-07-29T00:00:00.000Z"
  }
}
```

#### 4. Update Profile
- **URL:** `PUT /api/auth/profile`
- **Description:** Update user profile information
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "username": "string (optional)",
  "email": "string (optional)"
}
```

#### 5. Change Password
- **URL:** `PUT /api/auth/change-password`
- **Description:** Change user password
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string (min 6 chars)"
}
```

#### 6. Logout
- **URL:** `POST /api/auth/logout`
- **Description:** Logout user (clears auth cookie)
- **Headers:** `Authorization: Bearer <token>`

#### 7. Delete Account
- **URL:** `DELETE /api/auth/account`
- **Description:** Permanently delete user account
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "password": "string"
}
```

#### 8. Health Check
- **URL:** `GET /api/health`
- **Description:** Check server status
- **Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-07-29T00:00:00.000Z",
  "environment": "development",
  "database": "Connected",
  "auth": "Ready"
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Array of validation errors (if applicable)
}
```

## Rate Limiting

- **General Auth Routes:** 5 requests per 15 minutes per IP
- **Login Route:** 3 requests per 15 minutes per IP
- **Password Change:** 3 requests per hour per IP

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Rate limiting on sensitive endpoints
- ✅ Input validation and sanitization
- ✅ NoSQL injection protection
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Cookie-based token storage (httpOnly)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickcv
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

3. Start the server:
```bash
npm run dev
```

4. Test the API:
```bash
npm run test:auth
```

## Development Commands

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run test:auth` - Run authentication tests
- `npm run server` - Start server directly (bypass checks)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Environment (development/production) |
| `PORT` | Yes | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for JWT tokens |
| `JWT_EXPIRE` | Yes | JWT token expiration time |
| `CLIENT_URL` | Yes | Frontend URL for CORS |

## Project Structure

```
backend/
├── config/
│   ├── database.js     # MongoDB connection
│   └── jwt.js          # JWT utilities
├── middleware/
│   ├── auth.js         # Authentication middleware
│   └── rateLimiter.js  # Rate limiting middleware
├── models/
│   └── User.js         # User model
├── routes/
│   └── auth.js         # Authentication routes
├── test/
│   └── auth.test.js    # Authentication tests
├── utils/
│   └── validation.js   # Input validation utilities
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── server.js           # Main server file
└── start.js            # Development startup script
```

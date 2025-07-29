import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../server.js';
import User from '../models/User.js';

describe('User Routes', () => {
  let authToken;
  let userId;
  let testUser;

  beforeAll(async () => {
    // Connect to test database
    const DB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/auth-app-test';
    await mongoose.connect(DB_URI);
  });

  beforeEach(async () => {
    // Clear users collection
    await User.deleteMany({});

    // Create a test user
    testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    userId = testUser._id;

    // Generate auth token
    authToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/user/profile', () => {
    it('should get user profile successfully', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.username).toBe('testuser');
      expect(response.body.data.password).toBeUndefined();
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/user/email', () => {
    it('should update email successfully', async () => {
      const response = await request(app)
        .put('/api/user/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newEmail: 'newemail@example.com',
          currentPassword: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('newemail@example.com');
      expect(response.body.data.isEmailVerified).toBe(false);
    });

    it('should fail with incorrect password', async () => {
      const response = await request(app)
        .put('/api/user/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newEmail: 'newemail@example.com',
          currentPassword: 'wrongpassword'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Current password is incorrect');
    });

    it('should fail with invalid email format', async () => {
      const response = await request(app)
        .put('/api/user/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newEmail: 'invalidemail',
          currentPassword: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Please provide a valid email address');
    });

    it('should fail with duplicate email', async () => {
      // Create another user with email we want to use
      await User.create({
        username: 'anotheruser',
        email: 'taken@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .put('/api/user/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newEmail: 'taken@example.com',
          currentPassword: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email is already registered');
    });
  });

  describe('PUT /api/user/username', () => {
    it('should update username successfully', async () => {
      const response = await request(app)
        .put('/api/user/username')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newUsername: 'newusername',
          currentPassword: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.username).toBe('newusername');
    });

    it('should fail with incorrect password', async () => {
      const response = await request(app)
        .put('/api/user/username')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newUsername: 'newusername',
          currentPassword: 'wrongpassword'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Current password is incorrect');
    });

    it('should fail with invalid username format', async () => {
      const response = await request(app)
        .put('/api/user/username')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newUsername: 'a', // Too short
          currentPassword: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Username must be 3-30 characters');
    });

    it('should fail with duplicate username', async () => {
      // Create another user with username we want to use
      await User.create({
        username: 'takenusername',
        email: 'another@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .put('/api/user/username')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newUsername: 'takenusername',
          currentPassword: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username is already taken');
    });
  });

  describe('PUT /api/user/password', () => {
    it('should update password successfully', async () => {
      const response = await request(app)
        .put('/api/user/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Password updated successfully');
    });

    it('should fail with incorrect current password', async () => {
      const response = await request(app)
        .put('/api/user/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Current password is incorrect');
    });

    it('should fail when new passwords do not match', async () => {
      const response = await request(app)
        .put('/api/user/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123',
          confirmPassword: 'differentpassword'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('New passwords do not match');
    });

    it('should fail with same password as current', async () => {
      const response = await request(app)
        .put('/api/user/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'password123',
          confirmPassword: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('New password must be different from current password');
    });

    it('should fail for GitHub users', async () => {
      // Update user to be a GitHub user
      await User.findByIdAndUpdate(userId, { githubId: 'github123' });

      const response = await request(app)
        .put('/api/user/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('GitHub users cannot change password');
    });
  });

  describe('GET /api/user/dashboard', () => {
    it('should get dashboard data successfully', async () => {
      const response = await request(app)
        .get('/api/user/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.username).toBe('testuser');
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.user.isGithubUser).toBe(false);
      expect(response.body.data.stats.accountAge).toBeGreaterThanOrEqual(0);
    });
  });

  describe('PUT /api/user/avatar', () => {
    it('should update avatar successfully', async () => {
      const avatarUrl = 'https://example.com/avatar.jpg';
      
      const response = await request(app)
        .put('/api/user/avatar')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          avatar: avatarUrl
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.avatar).toBe(avatarUrl);
    });

    it('should fail with invalid URL', async () => {
      const response = await request(app)
        .put('/api/user/avatar')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          avatar: 'invalid-url'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Please provide a valid avatar URL');
    });
  });
});

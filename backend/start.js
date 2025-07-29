#!/usr/bin/env node

/**
 * Development startup script for the backend
 * This script checks for required environment variables and dependencies
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Starting QuickCV Backend...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.error('❌ .env file not found!');
  console.log('Please create a .env file with the required environment variables.');
  console.log('See .env.example for reference.');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.error('❌ node_modules not found!');
  console.log('Please run: npm install');
  process.exit(1);
}

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Check required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
  'PORT'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nPlease check your .env file.');
  process.exit(1);
}

// Security check for JWT_SECRET
if (process.env.JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
  console.warn('⚠️  WARNING: You are using the default JWT_SECRET!');
  console.warn('   Please change it to a secure random string in production.');
  console.log('');
}

console.log('✅ Environment variables loaded');
console.log('✅ Dependencies found');
console.log(`✅ Starting server on port ${process.env.PORT || 5000}...`);
console.log('');

// Start the actual server
import('./server.js').catch(error => {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
});

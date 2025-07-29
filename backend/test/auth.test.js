// Simple test script for authentication endpoints
// Run with: node test/auth.test.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/auth';

// Test data
const testUser = {
  username: 'testuser123',
  email: 'test@example.com',
  password: 'password123'
};

let authToken = '';

async function testRegister() {
  console.log('\n🧪 Testing Registration...');
  
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful');
      authToken = data.token;
      return true;
    } else {
      console.log('❌ Registration failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n🧪 Testing Login...');
  
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful');
      authToken = data.token;
      return true;
    } else {
      console.log('❌ Login failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return false;
  }
}

async function testGetProfile() {
  console.log('\n🧪 Testing Get Profile...');
  
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Get profile successful');
      console.log('   User:', data.user.username, data.user.email);
      return true;
    } else {
      console.log('❌ Get profile failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Get profile error:', error.message);
    return false;
  }
}

async function testChangePassword() {
  console.log('\n🧪 Testing Change Password...');
  
  try {
    const response = await fetch(`${BASE_URL}/change-password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: testUser.password,
        newPassword: 'newpassword123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Change password successful');
      testUser.password = 'newpassword123'; // Update for future tests
      return true;
    } else {
      console.log('❌ Change password failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Change password error:', error.message);
    return false;
  }
}

async function testLogout() {
  console.log('\n🧪 Testing Logout...');
  
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Logout successful');
      return true;
    } else {
      console.log('❌ Logout failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Logout error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Authentication Tests...');
  console.log('Make sure your server is running on http://localhost:5000');
  
  // Wait a moment for any confirmation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const tests = [
    testRegister,
    testLogin,
    testGetProfile,
    testChangePassword,
    testLogout
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${(passed / (passed + failed) * 100).toFixed(1)}%`);
}

// Run the tests
runTests().catch(console.error);

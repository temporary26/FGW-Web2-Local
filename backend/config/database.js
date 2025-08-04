import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Use local MongoDB if MONGODB_URI is not set or if explicitly using local
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quickcv';
    
    const conn = await mongoose.connect(mongoURI, {
      // These options help with local MongoDB connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Make sure MongoDB is running locally on port 27017');
    process.exit(1);
  }
};

export default connectDB;

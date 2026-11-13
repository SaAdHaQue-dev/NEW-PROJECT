import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedAdminUser } from './seedAdmin.js';

dotenv.config();

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.log('ℹ️ MONGO_URI not found in .env. Running with JSON fallback mode.');
    return;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`🍃 MongoDB Connected Successfully: ${conn.connection.host}`);
    // Seed initial admin user if needed
    await seedAdminUser();
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      console.log('👉 Tip: MongoDB Atlas me user ka password check karein.');
    }
  }
}

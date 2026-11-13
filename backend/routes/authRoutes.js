import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to generate JWT Token
function generateToken(id, username) {
  return jwt.sign(
    { id, username, role: 'admin' },
    process.env.JWT_SECRET || 'spaciaz_secret_jwt_key_2026_super_secure',
    { expiresIn: '7d' }
  );
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const cleanUsername = username.trim().toLowerCase();
    const envAdminUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

    // 1. Check in MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const admin = await Admin.findOne({ username: cleanUsername });

      if (admin) {
        const isMatch = await admin.matchPassword(password);
        if (isMatch) {
          const token = generateToken(admin._id, admin.username);
          return res.status(200).json({
            success: true,
            message: 'Admin login successful',
            token,
            admin: {
              username: admin.username,
              role: admin.role
            }
          });
        }
      }
    }

    // 2. Fallback to ENV Credentials verification
    if (cleanUsername === envAdminUser && password === envAdminPass) {
      const token = generateToken('env-admin-id', envAdminUser);
      return res.status(200).json({
        success: true,
        message: 'Admin login successful',
        token,
        admin: {
          username: envAdminUser,
          role: 'admin'
        }
      });
    }

    // Invalid credentials
    return res.status(401).json({
      success: false,
      message: 'Invalid admin username or password'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login processing error',
      error: error.message
    });
  }
});

// GET /api/auth/me (Verify token)
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin
  });
});

// PUT /api/auth/change-password (Protected)
router.put('/change-password', protect, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await Admin.findOneAndUpdate(
        { username: req.admin.username },
        { password: hashedPassword },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update password',
      error: error.message
    });
  }
});

export default router;


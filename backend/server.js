import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors({
  origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Welcome & Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Spaciaz Backend API'
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Spaciaz Backend API Server',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/login, GET /api/auth/me, PUT /api/auth/change-password',
      siteContent: 'GET /api/site, PUT /api/site (Admin Only)',
      projects: 'GET /api/projects, GET /api/projects/:id, POST /api/projects (Admin), PUT /api/projects/:id (Admin), DELETE /api/projects/:id (Admin)',
      inquiries: 'POST /api/inquiries, GET /api/inquiries (Admin Only)'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server with Port In Use Error Handling
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Spaciaz Backend Server is running!`);
  console.log(`🌐 Base URL:   http://localhost:${PORT}`);
  console.log(`🩺 Health API: http://localhost:${PORT}/api/health`);
  console.log(`🏢 Client App: ${CLIENT_ORIGIN}`);
  console.log(`===============================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️ Port ${PORT} already use ho raha hai!`);
  } else {
    console.error('Server error:', err);
  }
});

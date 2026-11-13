import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inquiriesFilePath = path.join(__dirname, '../data/inquiries.json');

// Helper to read JSON inquiries
async function readInquiriesFile() {
  try {
    const data = await fs.readFile(inquiriesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write JSON inquiries
async function writeInquiriesFile(inquiries) {
  await fs.writeFile(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf-8');
}

// POST /api/inquiries
export async function submitInquiry(req, res) {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields.'
      });
    }

    // 1. If MongoDB is connected, save into MongoDB collection
    if (mongoose.connection.readyState === 1) {
      const newInquiry = await Inquiry.create({
        name,
        email,
        phone,
        projectType,
        budget,
        message
      });

      return res.status(201).json({
        success: true,
        message: 'Inquiry saved to MongoDB database',
        data: newInquiry
      });
    }

    // 2. Fallback to JSON storage
    const inquiries = await readInquiriesFile();
    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      projectType: projectType || 'General Consultation',
      budget: budget || 'Undisclosed',
      message: message || '',
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    inquiries.unshift(newInquiry);
    await writeInquiriesFile(inquiries);

    res.status(201).json({
      success: true,
      message: 'Inquiry saved to local JSON storage',
      data: newInquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process inquiry', error: error.message });
  }
}

// GET /api/inquiries
export async function getAllInquiries(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: inquiries.length,
        data: inquiries
      });
    }

    const inquiries = await readInquiriesFile();
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries', error: error.message });
  }
}

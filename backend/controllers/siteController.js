import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/siteContent.json');

// Helper to read JSON file
async function readSiteData() {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

// Helper to write JSON file
async function writeSiteData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/site
export async function getSiteContent(req, res) {
  try {
    const siteData = await readSiteData();
    res.status(200).json({
      success: true,
      data: siteData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve site content',
      error: error.message
    });
  }
}

// PUT /api/site
export async function updateSiteContent(req, res) {
  try {
    const currentData = await readSiteData();
    const updatedData = { ...currentData, ...req.body };
    await writeSiteData(updatedData);
    
    res.status(200).json({
      success: true,
      message: 'Site content updated successfully',
      data: updatedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update site content',
      error: error.message
    });
  }
}


import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Project from '../models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, '../data/projects.json');

// Helper to read JSON projects
async function readProjectsFile() {
  const data = await fs.readFile(projectsFilePath, 'utf-8');
  return JSON.parse(data);
}

// Helper to write JSON projects
async function writeProjectsFile(projects) {
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), 'utf-8');
}

// GET /api/projects
export async function getAllProjects(req, res) {
  try {
    const { category } = req.query;

    // 1. If MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (category && category !== 'All Projects') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      const projects = await Project.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        source: 'mongodb',
        count: projects.length,
        data: projects
      });
    }

    // 2. Fallback to JSON file
    const projects = await readProjectsFile();
    if (category && category !== 'All Projects') {
      const filtered = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
      return res.status(200).json({ success: true, source: 'json', count: filtered.length, data: filtered });
    }

    res.status(200).json({
      success: true,
      source: 'json',
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects', error: error.message });
  }
}

// GET /api/projects/:id
export async function getProjectById(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, source: 'mongodb', data: project });
    }

    const projects = await readProjectsFile();
    const project = projects.find(p => p.id === parseInt(req.params.id) || p.id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, source: 'json', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving project', error: error.message });
  }
}

// POST /api/projects (Admin: Create project)
export async function createProject(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const newProject = await Project.create(req.body);
      return res.status(201).json({
        success: true,
        source: 'mongodb',
        message: 'Project created successfully in MongoDB',
        data: newProject
      });
    }

    const projects = await readProjectsFile();
    const newProject = {
      id: Date.now(),
      ...req.body
    };
    projects.push(newProject);
    await writeProjectsFile(projects);

    res.status(201).json({
      success: true,
      source: 'json',
      message: 'Project created successfully in JSON',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create project', error: error.message });
  }
}

// PUT /api/projects/:id (Admin: Update project)
export async function updateProject(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({
        success: true,
        source: 'mongodb',
        message: 'Project updated in MongoDB',
        data: updated
      });
    }

    const projects = await readProjectsFile();
    const index = projects.findIndex(p => p.id === parseInt(req.params.id) || p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    projects[index] = { ...projects[index], ...req.body };
    await writeProjectsFile(projects);

    res.status(200).json({
      success: true,
      source: 'json',
      message: 'Project updated successfully in JSON',
      data: projects[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project', error: error.message });
  }
}

// DELETE /api/projects/:id (Admin: Delete project)
export async function deleteProject(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const deleted = await Project.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({
        success: true,
        source: 'mongodb',
        message: 'Project deleted from MongoDB'
      });
    }

    let projects = await readProjectsFile();
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== parseInt(req.params.id) && p.id !== req.params.id);

    if (projects.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await writeProjectsFile(projects);
    res.status(200).json({
      success: true,
      source: 'json',
      message: 'Project deleted successfully from JSON'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project', error: error.message });
  }
}

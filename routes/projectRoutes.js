import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/', getProjects);

// GET a single project by ID
router.get('/:id', getProject);

// POST a new project
router.post('/', protect, createProject);

// PUT update a project by ID
router.put('/:id', protect, updateProject);

// DELETE a project by ID
router.delete('/:id', protect, deleteProject);

export default router;
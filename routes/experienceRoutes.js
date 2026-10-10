import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import
{ getAllExperiences, 
  getExperienceById, 
  createExperience, 
  updateExperience, 
  deleteExperience }
  from '../controllers/experienceController.js';

const router = express.Router();

// GET all experiences
router.get('/', getAllExperiences);
// GET a single experience by ID
router.get('/:id', getExperienceById);
// POST a new experience
router.post('/', protect, createExperience);
// PUT (update) an experience by ID
router.put('/:id', protect, updateExperience);
// DELETE an experience by ID
router.delete('/:id', protect, deleteExperience);

export default router;
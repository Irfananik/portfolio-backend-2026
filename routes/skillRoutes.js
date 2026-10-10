import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import
{ getAllSkills, 
  getSkillById, 
  createSkill, 
  updateSkill, 
  deleteSkill } 
  from '../controllers/skillsController.js';

const router = express.Router();

// GET all skills
router.get('/', getAllSkills);
// GET a single skill by ID
router.get('/:id', getSkillById);
// POST a new skill
router.post('/', protect, createSkill);
// PUT (update) a skill by ID
router.put('/:id', protect, updateSkill);
// DELETE a skill by ID
router.delete('/:id', protect, deleteSkill);

export default router;
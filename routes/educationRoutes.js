import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import
{ getAllEducation, 
  getEducationById, 
  createEducation, 
  updateEducation, 
  deleteEducation }
  from '../controllers/educationController.js';

const router = express.Router();

// GET all education & training records
router.get('/', getAllEducation);
// GET a single education / training record by ID
router.get('/:id', getEducationById);
// POST a new education / training record
router.post('/', protect, createEducation);
// PUT (update) an education / training record by ID
router.put('/:id', protect, updateEducation);
// DELETE an education / training record by ID
router.delete('/:id', protect, deleteEducation);

export default router;
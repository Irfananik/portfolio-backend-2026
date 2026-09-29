import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

// GET all experiences sorted chronologically
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    next(error);
  }
});

// POST a new experience
router.post('/', async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) 
      ? await Experience.insertMany(req.body) 
      : await Experience.create(req.body);
      
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT (update) an experience by ID
router.put('/:id', async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
});

// DELETE an experience by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
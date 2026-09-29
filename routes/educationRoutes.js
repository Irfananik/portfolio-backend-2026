import express from 'express';
import Education from '../models/Education.js';

const router = express.Router();

// GET all education & training records
router.get('/', async (req, res, next) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: education.length, data: education });
  } catch (error) {
    next(error);
  }
});

// POST a new education / training record
router.post('/', async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) 
      ? await Education.insertMany(req.body) 
      : await Education.create(req.body);
      
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT (update) an education / training record by ID
router.put('/:id', async (req, res, next) => {
  try {
    const record = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
});

// DELETE an education / training record by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const record = await Education.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.status(200).json({ success: true, message: 'Education record deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
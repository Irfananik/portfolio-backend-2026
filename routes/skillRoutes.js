import express from 'express';
import Skill from '../models/Skills.js';

const router = express.Router();

// GET all skills
router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
});

// POST a new skill
router.post('/', async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) 
      ? await Skill.insertMany(req.body) 
      : await Skill.create(req.body);
      
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT (update) a skill by ID
router.put('/:id', async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// DELETE a skill by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
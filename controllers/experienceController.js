import Experience from '../models/Experience.js';
import { sendRouteError } from '../utils/routeError.js';

// GET all experiences sorted chronologically
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    sendRouteError(error, res, 'Failed to fetch experiences.');
  }
};

// GET a single experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    sendRouteError(error, res, 'Failed to fetch experience.');
  }
};

// POST a new experience
export const createExperience = async (req, res) => {
  try {
    const data = Array.isArray(req.body)
      ? await Experience.insertMany(req.body)
      : await Experience.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    sendRouteError(error, res, 'Failed to create experience.');
  }
};

// PUT (update) an experience by ID
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    sendRouteError(error, res, 'Failed to update experience.');
  }
};

// DELETE an experience by ID
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    sendRouteError(error, res, 'Failed to delete experience.');
  }
};

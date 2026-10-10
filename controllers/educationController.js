import educationModel from "../models/Education.js";
import { sendRouteError } from "../utils/routeError.js";

// GET all education & training records
export const getAllEducation = async (req, res) => {
  try {
    const education = await educationModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: education.length, data: education });
  } catch (error) {
    sendRouteError(error, res, 'Failed to fetch education records.');
  }
};

// GET a single education / training record by ID
export const getEducationById = async (req, res) => {
  try {
    const education = await educationModel.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found',
      });
    }

    res.status(200).json({ success: true, data: education });
  } catch (error) {
    sendRouteError(error, res, 'Failed to fetch education record.');
  }
};

// POST a new education / training record
export const createEducation = async (req, res) => {
  try {
    const data = Array.isArray(req.body) 
      ? await educationModel.insertMany(req.body) 
      : await educationModel.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    sendRouteError(error, res, 'Failed to create education record.');
  }
};

// PUT (update) an education / training record by ID
export const updateEducation = async (req, res) => {
  try {
    const record = await educationModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    sendRouteError(error, res, 'Failed to update education record.');
  }
};

// DELETE an education / training record by ID
export const deleteEducation = async (req, res) => {
  try {
    const record = await educationModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    res.status(200).json({ success: true, message: 'Education record deleted' });
  } catch (error) {
    sendRouteError(error, res, 'Failed to delete education record.');
  }
};
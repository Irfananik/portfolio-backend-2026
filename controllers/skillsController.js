import Skills from "../models/Skills.js";
import { sendRouteError } from "../utils/routeError.js";

// GET all skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (error) {
    sendRouteError(res, error);
  }
};

// GET a single skill by ID
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    sendRouteError(res, error);
  }
};

// POST a new skill
export const createSkill = async (req, res) => {
  try {
    const skill = new Skills(req.body);
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    sendRouteError(res, error);
  }
};

// PUT (update) a skill by ID
export const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(updatedSkill);
  } catch (error) {
    sendRouteError(res, error);
  }
};

// DELETE a skill by ID
export const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skills.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    sendRouteError(res, error);
  }
};
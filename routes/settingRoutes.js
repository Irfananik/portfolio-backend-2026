import express from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/settings/cv
// @desc    Get active CV URLs (Public)
router.get('/cv', async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: 'cv_links' });

    // Default fallback paths if not yet saved in MongoDB
    if (!setting) {
      return res.json({
        en: '/resume_en.pdf',
        ja: '/resume_ja.pdf',
      });
    }

    res.json(setting.value);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/settings/cv
// @desc    Update CV URLs (Protected - Admin Only)
router.post('/cv', protect, async (req, res, next) => {
  try {
    const { en, ja } = req.body;

    if (!en || !ja) {
      res.status(400);
      throw new Error('Both English and Japanese CV URLs are required.');
    }

    // Create 'cv_links' document if it doesn't exist, otherwise update it
    const setting = await Setting.findOneAndUpdate(
      { key: 'cv_links' },
      { value: { en, ja } },
      { new: true, upsert: true }
    );

    res.json({
      message: 'CV URLs updated successfully',
      data: setting.value,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
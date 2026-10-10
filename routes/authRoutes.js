import express from 'express';
import {
  loginUser,
  registerUser,
} from '../controllers/authController.js';

const router = express.Router();

// Keep the base auth endpoint working for existing clients.
router.post('/', loginUser);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
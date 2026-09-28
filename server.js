import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// R  outes
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('MERN Portfolio API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
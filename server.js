import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Allow oringins list
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:3000', // React CRA / Next.js default port
   process.env.CLIENT_URL,  // My live deployed frontend domain (when deployed)
].filter(Boolean); // Filter out any undefined values (in case CLIENT_URL is not set)

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, curl, or server-to-server calls)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies or authorization headers if needed later
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('MERN Portfolio API is running...');
});

// 404 Route Handler (Triggers for undefined endpoints)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  // If the response status code is still 200, set it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(err);
  res.status(statusCode);
  res.json({
    message: err.message || 'Internal server error.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
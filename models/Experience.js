import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true }, // e.g., "Front-end Web Developer"
    company: { type: String, required: true },
    location: { type: String }, // e.g., "Kyoto, Japan" or "Remote"
    type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], default: 'Full-time' },
    startDate: { type: String, required: true }, // e.g., "2023-01" or "Jan 2023"
    endDate: { type: String, default: 'Present' },
    isCurrent: { type: Boolean, default: false },
    highlights: [{ type: String, required: true }], // Array of bullet points describing responsibilities
    techStack: [{ type: String }], // Array of technologies used in this role
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
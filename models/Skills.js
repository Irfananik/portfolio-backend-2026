import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Tools & AI', 'Other'],
    },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Advanced' },
    icon: { type: String }, // e.g., "react", "nodejs", "mongodb" for rendering icons on React
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);